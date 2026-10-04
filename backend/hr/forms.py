from django import forms
from core.forms import TailwindModelForm
from .models import Employee, Attendance, Leave, Payroll, Performance, Training, EmployeeDocument, ExpenseClaim, Task
from django.contrib.auth import get_user_model

User = get_user_model()

class EmployeeForm(TailwindModelForm):
    create_user_account = forms.BooleanField(required=False, label="Create ESS Account?", help_text="Check this to generate a login account for this employee.")
    username = forms.CharField(required=False, max_length=150)
    password = forms.CharField(required=False, widget=forms.PasswordInput)

    class Meta:
        model = Employee
        fields = ['employee_id', 'name', 'email', 'phone', 'department', 'designation', 'join_date', 'employment_status', 'address', 'date_of_birth', 'gender', 'marital_status', 'cv_file', 'profile_photo']
        widgets = {
            'join_date': forms.DateInput(attrs={'type': 'date'}),
            'date_of_birth': forms.DateInput(attrs={'type': 'date'}),
        }

    def clean(self):
        cleaned_data = super().clean()
        create_user = cleaned_data.get('create_user_account')
        username = cleaned_data.get('username')
        password = cleaned_data.get('password')

        if create_user:
            if not username or not password:
                raise forms.ValidationError("Username and password are required to create an ESS account.")
            if not self.instance.user and User.objects.filter(username=username).exists():
                self.add_error('username', 'This username is already taken.')
        return cleaned_data

    def save(self, commit=True):
        employee = super().save(commit=False)
        create_user = self.cleaned_data.get('create_user_account')
        if create_user and not employee.user:
            username = self.cleaned_data.get('username')
            password = self.cleaned_data.get('password')
            user = User.objects.create_user(username=username, password=password, email=employee.email)
            employee.user = user
        if commit:
            employee.save()
        return employee

class AttendanceForm(TailwindModelForm):
    class Meta:
        model = Attendance
        fields = ['employee', 'date', 'check_in', 'check_out', 'status', 'working_hours', 'remarks']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),
            'check_in': forms.TimeInput(attrs={'type': 'time'}),
            'check_out': forms.TimeInput(attrs={'type': 'time'}),
        }

REASON_CHOICES = [
    ('Personal work', 'Personal work'),
    ('Family matter', 'Family matter'),
    ('Medical appointment', 'Medical appointment'),
    ('Illness', 'Illness'),
    ('Urgent personal matter', 'Urgent personal matter'),
    ('Family emergency', 'Family emergency'),
    ('Personal appointment', 'Personal appointment'),
    ('Travel', 'Travel'),
]

class LeaveForm(TailwindModelForm):
    class Meta:
        model = Leave
        fields = ['employee', 'leave_type', 'start_date', 'end_date', 'reason', 'status', 'approved_by']
        widgets = {
            'start_date': forms.DateInput(attrs={'type': 'date'}),
            'end_date': forms.DateInput(attrs={'type': 'date'}),
            'reason': forms.Select(choices=REASON_CHOICES),
        }

class ESSLeaveForm(TailwindModelForm):
    class Meta:
        model = Leave
        fields = ['leave_type', 'start_date', 'end_date', 'reason']
        widgets = {
            'start_date': forms.DateInput(attrs={'type': 'date'}),
            'end_date': forms.DateInput(attrs={'type': 'date'}),
            'reason': forms.Select(choices=REASON_CHOICES),
        }

class ESSExpenseForm(TailwindModelForm):
    class Meta:
        model = ExpenseClaim
        fields = ['date', 'amount', 'description', 'receipt_file']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),
        }

class PayrollForm(TailwindModelForm):
    class Meta:
        model = Payroll
        fields = ['employee', 'month', 'basic_salary', 'allowances', 'deductions', 'payment_status', 'payment_date']
        widgets = {
            'month': forms.DateInput(attrs={'type': 'date'}),
            'payment_date': forms.DateInput(attrs={'type': 'date'}),
        }

class PerformanceForm(TailwindModelForm):
    class Meta:
        model = Performance
        fields = ['employee', 'review_period', 'rating', 'goals', 'achievements', 'comments', 'reviewer', 'status']

class TrainingForm(TailwindModelForm):
    class Meta:
        model = Training
        fields = ['title', 'description', 'trainer', 'start_date', 'end_date', 'location', 'participants', 'status']
        widgets = {
            'start_date': forms.DateInput(attrs={'type': 'date'}),
            'end_date': forms.DateInput(attrs={'type': 'date'}),
        }

class EmployeeDocumentForm(TailwindModelForm):
    class Meta:
        model = EmployeeDocument
        fields = ['employee', 'document_type', 'file', 'expiry_date', 'status']
        widgets = {
            'expiry_date': forms.DateInput(attrs={'type': 'date'}),
        }

class ExpenseClaimForm(TailwindModelForm):
    class Meta:
        model = ExpenseClaim
        fields = ['employee', 'date', 'amount', 'description', 'receipt_file', 'status']
        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),
        }

class TaskForm(TailwindModelForm):
    breakdown_json = forms.CharField(widget=forms.HiddenInput(), required=False)

    class Meta:
        model = Task
        fields = ['employee', 'title', 'description', 'deadline', 'assigned_file', 'status', 'hr_comments', 'rating']
        widgets = {
            'deadline': forms.DateInput(attrs={'type': 'date'}),
        }
        
    def clean_breakdown_json(self):
        import json
        data = self.cleaned_data.get('breakdown_json', '[]')
        try:
            return json.loads(data)
        except json.JSONDecodeError:
            return []
            
    def save(self, commit=True):
        instance = super().save(commit=False)
        instance.breakdown = self.cleaned_data.get('breakdown_json', [])
        if commit:
            instance.save()
        return instance

class ESSTaskUpdateForm(TailwindModelForm):
    submit_for_review = forms.BooleanField(required=False, label="Submit Task for HR Review", help_text="Check this box if you have completed the task and want HR to review and rate it.")

    class Meta:
        model = Task
        fields = ['employee_requirements', 'submitted_file', 'employee_comments']
        widgets = {
            'employee_requirements': forms.Textarea(attrs={'rows': 4, 'placeholder': 'What do you need to complete this task? (e.g. database access, docs, etc.)'}),
            'employee_comments': forms.Textarea(attrs={'rows': 3}),
        }

class ESSProfileUpdateForm(TailwindModelForm):
    class Meta:
        model = Employee
        fields = [
            'profile_photo', 'cv_file', 'address', 'phone', 
            'date_of_birth', 'gender', 'marital_status',
            'emergency_contact_name', 'emergency_contact_phone', 
            'bank_name', 'bank_account_number'
        ]
        widgets = {
            'date_of_birth': forms.DateInput(attrs={'type': 'date'}),
        }

from .models import PayslipRequest
class PayslipRequestForm(TailwindModelForm):
    month = forms.DateField(
        input_formats=['%Y-%m', '%Y-%m-%d'],
        widget=forms.DateInput(attrs={'type': 'month'}),
        help_text="The month/year requested"
    )
    class Meta:
        model = PayslipRequest
        fields = ['month', 'reason', 'attachment']
        widgets = {
            'reason': forms.Textarea(attrs={'rows': 3}),
            'attachment': forms.FileInput(),
        }

    def clean_month(self):
        month = self.cleaned_data.get('month')
        if isinstance(month, str):
            from datetime import datetime
            return datetime.strptime(month + '-01', '%Y-%m-%d').date()
        elif hasattr(month, 'replace'):
            return month.replace(day=1)
        return month
