from django.db import models
from django.conf import settings
from core.validators import validate_file_size, validate_pdf_extension

class Employee(models.Model):
    employee_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    department = models.CharField(max_length=255)
    designation = models.CharField(max_length=255)
    join_date = models.DateField()
    employment_status = models.CharField(max_length=50, choices=(
        ('active', 'Active'),
        ('on_leave', 'On Leave'),
        ('terminated', 'Terminated'),
        ('resigned', 'Resigned'),
    ), default='active')
    address = models.TextField(blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=20, choices=(
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ), blank=True)
    marital_status = models.CharField(max_length=20, choices=(
        ('single', 'Single'),
        ('married', 'Married'),
        ('divorced', 'Divorced'),
        ('widowed', 'Widowed'),
    ), blank=True)
    cv_file = models.FileField(upload_to='hr/cvs/', validators=[validate_pdf_extension, validate_file_size], blank=True, null=True)
    
    # ESS Fields
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='employee_profile', null=True, blank=True)
    bank_account_number = models.CharField(max_length=100, blank=True)
    bank_name = models.CharField(max_length=255, blank=True)
    emergency_contact_name = models.CharField(max_length=255, blank=True)
    emergency_contact_phone = models.CharField(max_length=20, blank=True)

    profile_photo = models.ImageField(upload_to='hr/photos/', blank=True, null=True, validators=[validate_file_size])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.employee_id} - {self.name}"

class Attendance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='attendances')
    date = models.DateField()
    check_in = models.TimeField(null=True, blank=True)
    check_out = models.TimeField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=(
        ('present', 'Present'),
        ('absent', 'Absent'),
        ('late', 'Late'),
        ('leave', 'Leave'),
        ('half_day', 'Half Day'),
    ), default='present')
    working_hours = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    remarks = models.TextField(blank=True)

    class Meta:
        ordering = ['-date']
        unique_together = ('employee', 'date')

    def __str__(self):
        return f"{self.employee.name} - {self.date}"

class Leave(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='leaves')
    leave_type = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=50, choices=(
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('cancelled', 'Cancelled'),
    ), default='pending')
    approved_by = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, blank=True, related_name='approved_leaves')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return f"{self.employee.name} - {self.leave_type}"

class Payroll(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='payrolls')
    month = models.DateField(help_text="Set to the first day of the month for which payroll is generated")
    basic_salary = models.DecimalField(max_digits=10, decimal_places=2)
    allowances = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    gross_salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    net_salary = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    payment_status = models.CharField(max_length=50, choices=(
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
    ), default='pending')
    payment_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-month']
        unique_together = ('employee', 'month')

    def save(self, *args, **kwargs):
        self.gross_salary = self.basic_salary + self.allowances
        self.net_salary = self.gross_salary - self.deductions
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.employee.name} - {self.month.strftime('%B %Y')}"

class Performance(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='performances')
    review_period = models.CharField(max_length=100)
    rating = models.PositiveIntegerField(help_text="Rating out of 5 or 10")
    goals = models.TextField()
    achievements = models.TextField()
    comments = models.TextField(blank=True)
    reviewer = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, related_name='reviewed_performances')
    status = models.CharField(max_length=50, choices=(
        ('draft', 'Draft'),
        ('finalized', 'Finalized'),
    ), default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.employee.name} - {self.review_period}"

class Training(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    trainer = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    location = models.CharField(max_length=255)
    participants = models.ManyToManyField(Employee, related_name='trainings', blank=True)
    status = models.CharField(max_length=50, choices=(
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ), default='upcoming')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-start_date']

    def __str__(self):
        return self.title

class EmployeeDocument(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='documents')
    document_type = models.CharField(max_length=100)
    file = models.FileField(upload_to='hr/documents/', validators=[validate_pdf_extension, validate_file_size])
    upload_date = models.DateField(auto_now_add=True)
    expiry_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=50, choices=(
        ('active', 'Active'),
        ('expired', 'Expired'),
    ), default='active')

    class Meta:
        ordering = ['-upload_date']

    def __str__(self):
        return f"{self.employee.name} - {self.document_type}"

class ExpenseClaim(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='expense_claims')
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    receipt_file = models.FileField(upload_to='hr/expenses/', validators=[validate_pdf_extension, validate_file_size], null=True, blank=True)
    status = models.CharField(max_length=50, choices=(
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ), default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.employee.name} - ${self.amount} - {self.get_status_display()}"

class HRNotification(models.Model):
    message = models.CharField(max_length=255)
    link = models.CharField(max_length=255)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.message

class Task(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='tasks')
    assigned_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='assigned_tasks')
    title = models.CharField(max_length=255)
    description = models.TextField()
    deadline = models.DateField()
    breakdown = models.JSONField(default=list, blank=True, help_text="List of categories and percentages e.g. [{'name': 'Frontend', 'percentage': 25}]")
    priority = models.CharField(max_length=50, choices=(
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ), default='medium')
    status = models.CharField(max_length=50, choices=(
        ('not_started', 'Not Started'),
        ('in_progress', 'In Progress'),
        ('submitted', 'Submitted for Review'),
        ('under_review', 'Under Review'),
        ('revision_required', 'Revision Required'),
        ('approved', 'Approved'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ), default='not_started')
    employee_requirements = models.TextField(blank=True, help_text="Employee's requirements/notes for completing the task")
    employee_comments = models.TextField(blank=True)
    hr_comments = models.TextField(blank=True)
    assigned_file = models.FileField(upload_to='tasks/assigned/', null=True, blank=True, help_text="File uploaded by HR/Manager")
    submitted_file = models.FileField(upload_to='tasks/submitted/', null=True, blank=True, help_text="File uploaded by Employee")
    rating = models.PositiveIntegerField(null=True, blank=True, help_text="Overall Rating out of 5")
    rating_categories = models.JSONField(default=dict, blank=True, help_text="e.g. {'quality': 5, 'accuracy': 4}")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.employee.name}"

class TaskRequirement(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='requirements')
    description = models.CharField(max_length=255)
    is_completed = models.BooleanField(default=False)
    
class TaskAttachment(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='attachments')
    file = models.FileField(upload_to='task_attachments/')
    filename = models.CharField(max_length=255, blank=True)
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
class TaskActivity(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='activities')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    message = models.TextField()
    activity_type = models.CharField(max_length=50, choices=(
        ('status_change', 'Status Change'),
        ('comment', 'Comment'),
        ('file_upload', 'File Upload'),
        ('revision_request', 'Revision Request'),
        ('review', 'Review'),
    ), default='comment')
    created_at = models.DateTimeField(auto_now_add=True)

class ESSNotification(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='notifications')
    message = models.CharField(max_length=255)
    link = models.CharField(max_length=255)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.employee.name} - {self.message}"
class PayslipRequest(models.Model):
    employee = models.ForeignKey('Employee', on_delete=models.CASCADE, related_name='payslip_requests')
    month = models.DateField(help_text='The month/year requested (select 1st of month)')
    reason = models.TextField(blank=True, help_text='Reason for requesting this payslip')
    attachment = models.FileField(upload_to='payslip_requests/', blank=True, null=True, help_text='Optional supporting document')
    status = models.CharField(max_length=50, choices=(
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('generated', 'Generated'),
    ), default='pending')
    rejection_reason = models.TextField(blank=True, help_text='Reason for rejection (if applicable)')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.employee.name} - {self.month.strftime('%B %Y')}"
