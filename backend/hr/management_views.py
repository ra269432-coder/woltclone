from .models import PayslipRequest
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy, reverse
from django.contrib.auth.mixins import LoginRequiredMixin
from .mixins import HRRequiredMixin
from .models import Employee, Attendance, Leave, Payroll, Performance, Training, EmployeeDocument, ExpenseClaim, Task, ESSNotification
from .forms import (
    EmployeeForm, AttendanceForm, LeaveForm, PayrollForm, 
    PerformanceForm, TrainingForm, EmployeeDocumentForm, ExpenseClaimForm, TaskForm
)
from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages

class HRCRUDMixin(LoginRequiredMixin, HRRequiredMixin):
    template_name = 'core/form.html'
    
class HRListMixin(LoginRequiredMixin, HRRequiredMixin):
    template_name = 'hr_dashboard/generic_list.html'
    paginate_by = 20

class HRDeleteMixin(LoginRequiredMixin, HRRequiredMixin):
    template_name = 'components/confirm_delete.html'

# === EMPLOYEES ===
class EmployeeListView(HRListMixin, ListView):
    model = Employee
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Employees"
        context['create_url'] = reverse_lazy('employee_create')
        context['columns'] = ['ID', 'Name', 'Department', 'Designation', 'Status', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'edit_url': reverse_lazy('employee_edit', kwargs={'pk': obj.pk}),
                'delete_url': reverse_lazy('employee_delete', kwargs={'pk': obj.pk}),
                'columns': [
                    obj.employee_id,
                    obj.name,
                    obj.department,
                    obj.designation,
                    obj.get_employment_status_display()
                ]
            })
        context['rows'] = rows
        return context

class EmployeeCreateView(HRCRUDMixin, CreateView):
    model = Employee
    form_class = EmployeeForm
    success_url = reverse_lazy('employee_list')

class EmployeeUpdateView(HRCRUDMixin, UpdateView):
    model = Employee
    form_class = EmployeeForm
    success_url = reverse_lazy('employee_list')

class EmployeeDeleteView(HRDeleteMixin, DeleteView):
    model = Employee
    success_url = reverse_lazy('employee_list')


# === ATTENDANCE ===
class AttendanceListView(HRListMixin, ListView):
    model = Attendance
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Attendance"
        context['create_url'] = reverse_lazy('attendance_create')
        context['columns'] = ['Employee', 'Date', 'Check In', 'Check Out', 'Status', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'edit_url': reverse_lazy('attendance_edit', kwargs={'pk': obj.pk}),
                'delete_url': reverse_lazy('attendance_delete', kwargs={'pk': obj.pk}),
                'columns': [
                    obj.employee.name,
                    obj.date.strftime("%b %d, %Y"),
                    obj.check_in.strftime("%I:%M %p") if obj.check_in else "-",
                    obj.check_out.strftime("%I:%M %p") if obj.check_out else "-",
                    obj.get_status_display()
                ]
            })
        context['rows'] = rows
        return context

class AttendanceCreateView(HRCRUDMixin, CreateView):
    model = Attendance
    form_class = AttendanceForm
    success_url = reverse_lazy('attendance_list')

class AttendanceUpdateView(HRCRUDMixin, UpdateView):
    model = Attendance
    form_class = AttendanceForm
    success_url = reverse_lazy('attendance_list')

class AttendanceDeleteView(HRDeleteMixin, DeleteView):
    model = Attendance
    success_url = reverse_lazy('attendance_list')


# === LEAVE ===
class LeaveListView(HRListMixin, ListView):
    model = Leave
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Leave Requests"
        context['create_url'] = reverse_lazy('leave_create')
        context['columns'] = ['Employee', 'Type', 'Start', 'End', 'Status', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            actions = []
            if obj.status == 'pending':
                actions.append({
                    'url': reverse_lazy('hr_action_leave', kwargs={'pk': obj.pk, 'action': 'approve'}),
                    'label': 'Approve',
                    'icon': 'approve'
                })
                actions.append({
                    'url': reverse_lazy('hr_action_leave', kwargs={'pk': obj.pk, 'action': 'reject'}),
                    'label': 'Reject',
                    'icon': 'reject'
                })
                
            rows.append({
                'item': obj,
                'edit_url': reverse_lazy('leave_edit', kwargs={'pk': obj.pk}),
                'delete_url': reverse_lazy('leave_delete', kwargs={'pk': obj.pk}),
                'columns': [
                    obj.employee.name,
                    obj.leave_type,
                    obj.start_date.strftime("%b %d, %Y"),
                    obj.end_date.strftime("%b %d, %Y"),
                    obj.get_status_display()
                ],
                'extra_actions': actions
            })
        context['rows'] = rows
        return context

class LeaveCreateView(HRCRUDMixin, CreateView):
    model = Leave
    form_class = LeaveForm
    success_url = reverse_lazy('leave_list')

class LeaveUpdateView(HRCRUDMixin, UpdateView):
    model = Leave
    form_class = LeaveForm
    success_url = reverse_lazy('leave_list')

class LeaveDeleteView(HRDeleteMixin, DeleteView):
    model = Leave
    success_url = reverse_lazy('leave_list')


# === PAYROLL ===
class PayrollListView(HRListMixin, ListView):
    model = Payroll
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Payroll"
        context['create_url'] = reverse_lazy('payroll_create')
        context['columns'] = ['Employee', 'Month', 'Gross', 'Net', 'Status', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'edit_url': reverse_lazy('payroll_edit', kwargs={'pk': obj.pk}),
                'delete_url': reverse_lazy('payroll_delete', kwargs={'pk': obj.pk}),
                'columns': [
                    obj.employee.name,
                    obj.month.strftime("%b %Y"),
                    f"${obj.gross_salary}" if obj.gross_salary else "-",
                    f"${obj.net_salary}" if obj.net_salary else "-",
                    obj.get_payment_status_display()
                ]
            })
        context['rows'] = rows
        return context

class PayrollCreateView(HRCRUDMixin, CreateView):
    model = Payroll
    form_class = PayrollForm
    success_url = reverse_lazy('payroll_list')

class PayrollUpdateView(HRCRUDMixin, UpdateView):
    model = Payroll
    form_class = PayrollForm
    success_url = reverse_lazy('payroll_list')

class PayrollDeleteView(HRDeleteMixin, DeleteView):
    model = Payroll
    success_url = reverse_lazy('payroll_list')


# === PERFORMANCE ===
class PerformanceListView(HRListMixin, ListView):
    model = Performance
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Performance Reviews"
        context['create_url'] = reverse_lazy('performance_create')
        context['columns'] = ['Employee', 'Period', 'Rating', 'Status', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'edit_url': reverse_lazy('performance_edit', kwargs={'pk': obj.pk}),
                'delete_url': reverse_lazy('performance_delete', kwargs={'pk': obj.pk}),
                'columns': [
                    obj.employee.name,
                    obj.review_period,
                    f"{obj.rating}/10" if obj.rating > 5 else f"{obj.rating}/5",
                    obj.get_status_display()
                ]
            })
        context['rows'] = rows
        return context

class PerformanceCreateView(HRCRUDMixin, CreateView):
    model = Performance
    form_class = PerformanceForm
    success_url = reverse_lazy('performance_list')

class PerformanceUpdateView(HRCRUDMixin, UpdateView):
    model = Performance
    form_class = PerformanceForm
    success_url = reverse_lazy('performance_list')

class PerformanceDeleteView(HRDeleteMixin, DeleteView):
    model = Performance
    success_url = reverse_lazy('performance_list')


# === TRAINING ===
class TrainingListView(HRListMixin, ListView):
    model = Training
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Trainings"
        context['create_url'] = reverse_lazy('training_create')
        context['columns'] = ['Title', 'Trainer', 'Start', 'Status', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'edit_url': reverse_lazy('training_edit', kwargs={'pk': obj.pk}),
                'delete_url': reverse_lazy('training_delete', kwargs={'pk': obj.pk}),
                'columns': [
                    obj.title,
                    obj.trainer,
                    obj.start_date.strftime("%b %d, %Y"),
                    obj.get_status_display()
                ]
            })
        context['rows'] = rows
        return context

class TrainingCreateView(HRCRUDMixin, CreateView):
    model = Training
    form_class = TrainingForm
    success_url = reverse_lazy('training_list')

class TrainingUpdateView(HRCRUDMixin, UpdateView):
    model = Training
    form_class = TrainingForm
    success_url = reverse_lazy('training_list')

class TrainingDeleteView(HRDeleteMixin, DeleteView):
    model = Training
    success_url = reverse_lazy('training_list')


# === EMPLOYEE DOCUMENTS ===
class EmployeeDocumentListView(HRListMixin, ListView):
    model = EmployeeDocument
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Employee Documents"
        context['create_url'] = reverse_lazy('document_create')
        context['columns'] = ['Employee', 'Type', 'Upload Date', 'Status', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'edit_url': reverse_lazy('document_edit', kwargs={'pk': obj.pk}),
                'delete_url': reverse_lazy('document_delete', kwargs={'pk': obj.pk}),
                'columns': [
                    obj.employee.name,
                    obj.document_type,
                    obj.upload_date.strftime("%b %d, %Y"),
                    obj.get_status_display()
                ],
                'extra_actions': [
                    {'url': obj.file.url if obj.file else '#', 'label': 'View', 'target': '_blank'}
                ]
            })
        context['rows'] = rows
        return context

class EmployeeDocumentCreateView(HRCRUDMixin, CreateView):
    model = EmployeeDocument
    form_class = EmployeeDocumentForm
    success_url = reverse_lazy('document_list')

class EmployeeDocumentUpdateView(HRCRUDMixin, UpdateView):
    model = EmployeeDocument
    form_class = EmployeeDocumentForm
    success_url = reverse_lazy('document_list')

class EmployeeDocumentDeleteView(HRDeleteMixin, DeleteView):
    model = EmployeeDocument
    success_url = reverse_lazy('document_list')

# === EXPENSE CLAIMS ===
class ExpenseClaimListView(HRListMixin, ListView):
    model = ExpenseClaim
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Expense Claims"
        context['create_url'] = reverse_lazy('expense_create')
        context['columns'] = ['Employee', 'Date', 'Amount', 'Status', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            actions = []
            if obj.receipt_file:
                actions.append({'url': obj.receipt_file.url, 'label': 'View Receipt', 'target': '_blank'})
            if obj.status == 'pending':
                actions.append({'url': reverse_lazy('hr_action_expense', kwargs={'pk': obj.pk, 'action': 'approve'}), 'label': 'Approve', 'icon': 'approve'})
                actions.append({'url': reverse_lazy('hr_action_expense', kwargs={'pk': obj.pk, 'action': 'reject'}), 'label': 'Reject', 'icon': 'reject'})
                
            rows.append({
                'item': obj,
                'edit_url': reverse_lazy('expense_edit', kwargs={'pk': obj.pk}),
                'delete_url': reverse_lazy('expense_delete', kwargs={'pk': obj.pk}),
                'columns': [
                    obj.employee.name,
                    obj.date.strftime("%b %d, %Y"),
                    f"${obj.amount}",
                    obj.get_status_display()
                ],
                'extra_actions': actions
            })
        context['rows'] = rows
        return context

class ExpenseClaimCreateView(HRCRUDMixin, CreateView):
    model = ExpenseClaim
    form_class = ExpenseClaimForm
    success_url = reverse_lazy('expense_list')

class ExpenseClaimUpdateView(HRCRUDMixin, UpdateView):
    model = ExpenseClaim
    form_class = ExpenseClaimForm
    success_url = reverse_lazy('expense_list')

class ExpenseClaimDeleteView(HRDeleteMixin, DeleteView):
    model = ExpenseClaim
    success_url = reverse_lazy('expense_list')

# === HR QUICK ACTIONS ===
def hr_action_leave(request, pk, action):
    leave = get_object_or_404(Leave, pk=pk)
    if action == 'approve':
        leave.status = 'approved'
        if hasattr(request.user, 'employee_profile'):
            leave.approved_by = request.user.employee_profile
        messages.success(request, f"Leave for {leave.employee.name} approved.")
    elif action == 'reject':
        leave.status = 'rejected'
        messages.success(request, f"Leave for {leave.employee.name} rejected.")
    leave.save()
    return redirect('leave_list')

def hr_action_expense(request, pk, action):
    expense = get_object_or_404(ExpenseClaim, pk=pk)
    if action == 'approve':
        expense.status = 'approved'
        messages.success(request, f"Expense claim for {expense.employee.name} approved.")
    elif action == 'reject':
        expense.status = 'rejected'
        messages.success(request, f"Expense claim for {expense.employee.name} rejected.")
    expense.save()
    return redirect('expense_list')

def read_notification(request, pk):
    from .models import HRNotification
    notification = get_object_or_404(HRNotification, pk=pk)
    notification.is_read = True
    notification.save()
    return redirect(notification.link)

from django.http import JsonResponse
def mark_all_hr_notifications_read(request):
    if request.user.is_authenticated and (request.user.is_superuser or request.user.groups.filter(name='HR').exists()):
        from .models import HRNotification
        HRNotification.objects.filter(is_read=False).update(is_read=True)
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'unauthorized'}, status=401)

# === REPORTS ===
from django.views.generic import TemplateView

class HRReportsView(LoginRequiredMixin, HRRequiredMixin, TemplateView):
    template_name = 'hr_dashboard/reports.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "HR Analytics & Reports"
        from hr.models import Employee
        context['employees'] = Employee.objects.filter(employment_status='active')
        return context

from django.http import HttpResponse



# --- TASKS ---
class TaskListView(HRRequiredMixin, ListView):
    model = Task
    template_name = 'hr_dashboard/generic_list.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Task Assignments"
        context['create_url'] = reverse_lazy('task_create')
        context['columns'] = ['Title', 'Employee', 'Deadline', 'Status', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'columns': [
                    obj.title,
                    obj.employee.name,
                    obj.deadline.strftime("%b %d, %Y"),
                    obj.get_status_display()
                ],
                'edit_url': reverse_lazy('task_edit', kwargs={'pk': obj.pk}),
                'delete_url': reverse_lazy('task_delete', kwargs={'pk': obj.pk}),
            })
        context['rows'] = rows
        return context

class TaskCreateView(HRRequiredMixin, CreateView):
    model = Task
    form_class = TaskForm
    template_name = 'hr_dashboard/task_form.html' # Custom template for Alpine JS logic
    success_url = reverse_lazy('task_list')

    def form_valid(self, form):
        form.instance.assigned_by = self.request.user
        messages.success(self.request, "Task assigned successfully.")
        
        response = super().form_valid(form)
        
        ESSNotification.objects.create(
            employee=form.instance.employee,
            message=f"You have been assigned a new task: {form.instance.title}",
            link=reverse('ess_task_detail', kwargs={'pk': form.instance.pk})
        )
        
        return response
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Assign New Task"
        context['cancel_url'] = reverse_lazy('task_list')
        return context

class TaskUpdateView(HRRequiredMixin, UpdateView):
    model = Task
    form_class = TaskForm
    template_name = 'hr_dashboard/task_form.html'
    success_url = reverse_lazy('task_list')

    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, "Task updated successfully.")
        
        # Check if HR added/modified comments or rating
        changed = form.changed_data
        if 'hr_comments' in changed or 'rating' in changed or 'status' in changed:
            from .models import ESSNotification
            msg_parts = []
            if 'status' in changed:
                msg_parts.append(f"status changed to {form.instance.get_status_display()}")
            if 'rating' in changed and form.instance.rating:
                msg_parts.append(f"rated {form.instance.rating}/5")
            if 'hr_comments' in changed and form.instance.hr_comments:
                msg_parts.append("new comments added")
                
            if msg_parts:
                message = f"HR updated your task '{form.instance.title}': " + ", ".join(msg_parts)
                ESSNotification.objects.create(
                    employee=form.instance.employee,
                    message=message,
                    link=reverse('ess_task_detail', kwargs={'pk': form.instance.pk})
                )
                
        return response
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Update Task"
        context['cancel_url'] = reverse_lazy('task_list')
        import json
        context['existing_breakdown'] = json.dumps(self.object.breakdown)
        return context

class TaskDeleteView(HRRequiredMixin, DeleteView):
    model = Task
    template_name = 'core/confirm_delete.html'
    success_url = reverse_lazy('task_list')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Delete Task"
        context['cancel_url'] = reverse_lazy('task_list')
        return context

def download_pdf_report(request):
    try:
        from reportlab.lib import colors
        from reportlab.lib.pagesizes import letter, landscape
        from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import inch
        from django.utils import timezone
        import os
        from django.conf import settings
        from hr.models import Employee, Attendance, Leave, Payroll, Performance, Training, EmployeeDocument, ExpenseClaim
    except ImportError as e:
        return HttpResponse(f'Error importing libraries: {e}', status=500)

    report_type = request.GET.get('report', 'HR Report')
    employee_id = request.GET.get('employee', 'all')

    response = HttpResponse(content_type='application/pdf')
    filename = f"{report_type.replace(' ', '_')}_{timezone.now().strftime('%Y%m%d')}.pdf"
    response['Content-Disposition'] = f'attachment; filename="{filename}"'

    # Set up Document
    doc = SimpleDocTemplate(response, pagesize=landscape(letter), rightMargin=30, leftMargin=30, topMargin=30, bottomMargin=30)
    elements = []
    styles = getSampleStyleSheet()
    
    # Custom Styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#1e3a8a'), # Blue-900
        alignment=1, # Center
        spaceAfter=12
    )
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Normal'],
        fontSize=12,
        textColor=colors.HexColor('#475569'), # Slate-600
        alignment=1, # Center
        spaceAfter=20
    )

    # 1. Header & Logo
    logo_path = os.path.join(settings.BASE_DIR, 'static', 'logo.png')
    logo_added = False
    if os.path.exists(logo_path):
        try:
            im = Image(logo_path, width=1.5*inch, height=1.5*inch)
            im.hAlign = 'CENTER'
            elements.append(im)
            elements.append(Spacer(1, 0.1*inch))
            logo_added = True
        except Exception:
            pass
            
    if not logo_added:
        elements.append(Paragraph("<b>Way of Light Trust</b>", title_style))
        
    elements.append(Paragraph(f"{report_type} - Generated: {timezone.now().strftime('%B %d, %Y')}", subtitle_style))

    elements.append(Spacer(1, 0.25*inch))

    # 2. Employee Info
    selected_emp = None
    if employee_id != 'all':
        try:
            selected_emp = Employee.objects.get(id=employee_id)
            emp_info = f"<b>Report For:</b> {selected_emp.name} (ID: {selected_emp.employee_id}) <br/>"
            emp_info += f"<b>Department:</b> {selected_emp.department} | <b>Designation:</b> {selected_emp.designation}"
            elements.append(Paragraph(emp_info, styles['Normal']))
            elements.append(Spacer(1, 0.25*inch))
        except Employee.DoesNotExist:
            pass

    # 3. Data Gathering & Table Construction
    data = []
    
    if report_type == 'Employee Report':
        data.append(['Photo', 'ID', 'Name', 'Department', 'Designation', 'Status', 'Join Date'])
        qs = Employee.objects.all()
        if selected_emp: qs = qs.filter(id=selected_emp.id)
        for emp in qs:
            photo = '-'
            if emp.profile_photo and hasattr(emp.profile_photo, 'path') and os.path.exists(emp.profile_photo.path):
                photo = Image(emp.profile_photo.path, width=0.5*inch, height=0.5*inch)
            data.append([photo, emp.employee_id, emp.name, emp.department, emp.designation, emp.employment_status.title(), emp.join_date.strftime('%b %d, %Y')])
            
    elif report_type == 'Attendance Report':
        data.append(['Employee', 'Date', 'Check In', 'Check Out'])
        qs = Attendance.objects.select_related('employee').all()
        if selected_emp: qs = qs.filter(employee=selected_emp)
        for att in qs:
            cin = att.check_in.strftime('%I:%M %p') if att.check_in else '-'
            cout = att.check_out.strftime('%I:%M %p') if att.check_out else '-'
            data.append([att.employee.name, att.date.strftime('%Y-%m-%d'), cin, cout])
            
    elif report_type == 'Leave Report':
        data.append(['Employee', 'Type', 'Start Date', 'End Date', 'Status', 'Reason'])
        qs = Leave.objects.select_related('employee').all()
        if selected_emp: qs = qs.filter(employee=selected_emp)
        for l in qs:
            data.append([l.employee.name, l.leave_type, l.start_date.strftime('%Y-%m-%d'), l.end_date.strftime('%Y-%m-%d'), l.status.title(), l.reason[:30]+'...'])

    elif report_type == 'Payroll Report':
        data.append(['Employee', 'Month', 'Basic', 'Allowances', 'Deductions', 'Net Salary', 'Status'])
        qs = Payroll.objects.select_related('employee').all()
        if selected_emp: qs = qs.filter(employee=selected_emp)
        for p in qs:
            data.append([p.employee.name, p.month.strftime('%b %Y'), f"{p.basic_salary}", f"{p.allowances}", f"{p.deductions}", f"{p.net_salary}", p.payment_status.title()])

    elif report_type == 'Performance Report':
        data.append(['Employee', 'Period', 'Rating', 'Status', 'Goals'])
        qs = Performance.objects.select_related('employee').all()
        if selected_emp: qs = qs.filter(employee=selected_emp)
        for p in qs:
            data.append([p.employee.name, p.review_period, str(p.rating), p.status.title(), p.goals[:30]+'...'])

    elif report_type == 'Training Report':
        data.append(['Title', 'Date', 'Trainer', 'Status'])
        qs = Training.objects.all()
        if selected_emp: qs = qs.filter(participants=selected_emp)
        for t in qs:
            data.append([t.title, t.date.strftime('%Y-%m-%d'), t.trainer, t.status.title()])

    elif report_type == 'Contract Expiry Report':
        data.append(['Employee', 'Document', 'Upload Date'])
        qs = EmployeeDocument.objects.select_related('employee').all()
        if selected_emp: qs = qs.filter(employee=selected_emp)
        for d in qs:
            data.append([d.employee.name, d.document_type, d.uploaded_at.strftime('%Y-%m-%d')])
            
    elif report_type == 'Expense Claims':
        data.append(['Employee', 'Date', 'Amount', 'Category', 'Status'])
        qs = ExpenseClaim.objects.select_related('employee').all()
        if selected_emp: qs = qs.filter(employee=selected_emp)
        for e in qs:
            data.append([e.employee.name, e.date.strftime('%Y-%m-%d'), f"{e.amount}", e.category, e.status.title()])
            
    elif report_type == 'Appointment Letter':
        name = request.GET.get('name', 'Candidate')
        address = request.GET.get('address', '')
        mobile = request.GET.get('mobile', '')
        email = request.GET.get('email', '')
        date = request.GET.get('date', timezone.now().strftime('%B %d, %Y'))
        position = request.GET.get('position', 'Associate Web Developer (Full Stack)')
        salary = request.GET.get('salary', 'BDT 20,000')
        probation_salary = request.GET.get('probation_salary', 'BDT 25,000')
        
        # Styles
        styles = getSampleStyleSheet()
        normal = styles['Normal']
        normal.fontSize = 10
        normal.leading = 14
        
        bold_style = ParagraphStyle('BoldText', parent=normal, fontName='Helvetica-Bold')
        
        # We need a new SimpleDocTemplate with portrait and smaller margins
        doc = SimpleDocTemplate(response, pagesize=letter, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
        elements = []
        
        # Ref & Date
        ref_date_data = [[f"<b>Ref:</b> WOLT/HR/{timezone.now().strftime('%Y-%m')}/AL-005", f"<b>Date:</b> {date}"]]
        ref_table = Table(ref_date_data, colWidths=[3*inch, 3*inch])
        ref_table.setStyle(TableStyle([('ALIGN', (0,0), (0,0), 'LEFT'), ('ALIGN', (1,0), (1,0), 'RIGHT')]))
        elements.append(ref_table)
        elements.append(Spacer(1, 0.2*inch))
        
        # Recipient Info
        elements.append(Paragraph("To", normal))
        elements.append(Paragraph(f"<b>{name}</b>", normal))
        if address: elements.append(Paragraph(address, normal))
        if mobile: elements.append(Paragraph(f"Mobile: {mobile}", normal))
        if email: elements.append(Paragraph(f"Email: {email}", normal))
        
        elements.append(Spacer(1, 0.2*inch))
        elements.append(Paragraph("<b>Subject: <u>Appointment Letter</u></b>", normal))
        elements.append(Spacer(1, 0.2*inch))
        
        # First name for salutation
        first_name = name.split()[0] if name else ""
        if "Mr." in name or "Ms." in name:
            first_name = name.split()[1] if len(name.split()) > 1 else name
        elements.append(Paragraph(f"<b>Dear {first_name},</b>", normal))
        elements.append(Spacer(1, 0.1*inch))
        
        elements.append(Paragraph(f"We are pleased to formally appoint you as <b>{position}</b> at WOLT, Gulshan Corporate Office, and effective <b>{date}</b>.", normal))
        elements.append(Spacer(1, 0.1*inch))
        elements.append(Paragraph("The terms and conditions of your appointment are as follows:", normal))
        
        # Body list items
        list_style = ParagraphStyle('ListStyle', parent=normal, leftIndent=20, leading=14)
        sublist_style = ParagraphStyle('SubListStyle', parent=normal, leftIndent=40, leading=14)
        subsublist_style = ParagraphStyle('SubSubListStyle', parent=normal, leftIndent=60, leading=14)
        
        elements.append(Paragraph(f"1. <b>Position:</b> {position}", list_style))
        elements.append(Paragraph(f"2. <b>Date of Joining:</b> {date}", list_style))
        elements.append(Paragraph("3. <b>Probationary Terms & Conditions:</b>", list_style))
        elements.append(Paragraph("<b>3.1 Probation Period:</b> 3 months. During this period, your performance will be reviewed.", sublist_style))
        elements.append(Paragraph("<b>3.2 Working Hours:</b> 10:00 AM – 7:00 PM", sublist_style))
        elements.append(Paragraph("<b>3.3 Working Days:</b> Saturday to Thursday (<b>Friday</b> will be the weekly holiday)", sublist_style))
        elements.append(Paragraph("<b>3.4 Dismissal During Probation:</b>", sublist_style))
        elements.append(Paragraph("<b>3.4.1</b> The Company reserves the right to terminate your employment at any time during the probation period.", subsublist_style))
        elements.append(Paragraph("<b>3.4.2</b> Such termination may be effected without prior notice, warning, or compensation if your performance, conduct, or compliance is found unsatisfactory or inconsistent with company policies.", subsublist_style))
        
        elements.append(Paragraph("4. <b>Monthly Consolidated Salary:</b>", list_style))
        elements.append(Paragraph(f"i. During probation: <b>{salary}</b>", sublist_style))
        elements.append(Paragraph(f"ii. Upon successful completion of probation and confirmation of your employment, your salary will be revised to <b>{probation_salary}</b>, subject to performance.", sublist_style))
        
        elements.append(Paragraph("5. <b>Festival Bonus:</b> Half of one month's gross salary, effective after confirmation of employment.", list_style))
        elements.append(Paragraph("6. <b>Other benefits:</b> You will be entitled to other perks and benefits as per WOLT's policy after confirmation of your employment.", list_style))
        elements.append(Paragraph("7. <b>Documents required:</b> Your joining will be effective upon submission of the following documents:", list_style))
        elements.append(Paragraph("a. All educational & experience certificates (Original & Photocopies)", sublist_style))
        elements.append(Paragraph("b. Release/Clearance letter (from last employer)", sublist_style))
        elements.append(Paragraph("c. National ID card/ Smart Card photocopy (Own & Nominee)", sublist_style))
        elements.append(Paragraph("d. Recent color photo (02 copies)", sublist_style))
        elements.append(Paragraph("e. Any kind of professional certificate, training certificate (if any)", sublist_style))
        elements.append(Paragraph("f. Visiting card (if any which is used in previous company)", sublist_style))
        elements.append(Paragraph("g. Pay slip from last employer", sublist_style))
        
        elements.append(Spacer(1, 0.1*inch))
        elements.append(Paragraph("Your employment will be governed by the standing rules and policies of the company.", normal))
        elements.append(Spacer(1, 0.1*inch))
        elements.append(Paragraph("Please sign and return a copy of this letter as acknowledgment and acceptance of your appointment.", normal))
        
        elements.append(Spacer(1, 0.2*inch))
        elements.append(Paragraph("<b>Thanking you,</b>", normal))
        elements.append(Spacer(1, 0.4*inch))
        elements.append(Paragraph("<b>Chairman</b><br/>Way of Light Trust", normal))
        
        elements.append(Spacer(1, 0.3*inch))
        elements.append(Paragraph("<b>Acknowledgement & Acceptance</b>", bold_style))
        elements.append(Spacer(1, 0.1*inch))
        elements.append(Paragraph(f"I hereby acknowledge and accept my appointment as <b>{position}</b> at WOLT, effective from the mentioned date of joining, with the compensation and benefits as stated above.", normal))
        
        elements.append(Spacer(1, 0.2*inch))
        elements.append(Paragraph("<b>Signature:</b> _________________________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <b>Date:</b> _________________", normal))
        elements.append(Spacer(1, 0.1*inch))
        elements.append(Paragraph("<b>Full Name:</b> ________________________________________________________", normal))
        elements.append(Spacer(1, 0.1*inch))
        elements.append(Paragraph("<b>Address:</b> __________________________________________________________", normal))
        elements.append(Spacer(1, 0.1*inch))
        elements.append(Paragraph("<b>NID No:</b> ___________________________________________________________", normal))
        
        # Build document early without table
        doc.build(elements)
        return response
        
    else:
        # Fallback generic data
        data.append(['Notice'])
        data.append([f"No specific database schema defined for {report_type} yet."])

    # If no data found (except header)
    if len(data) == 1:
        data.append(['No records found.'] + [''] * (len(data[0]) - 1))

    # Table Formatting
    if report_type == 'Employee Report':
        table = Table(data, repeatRows=1, colWidths=[0.8*inch, 1*inch, 2*inch, 1.8*inch, 1.8*inch, 1*inch, 1.2*inch])
    else:
        table = Table(data, repeatRows=1)
        
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0f172a')), # Slate-900 Header
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), # Ensure images are vertically centered
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('TOPPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#f8fafc')), # Slate-50 Row
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#e2e8f0')), # Slate-200 border
        ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('PADDING', (0,0), (-1,-1), 8),
    ]))
    
    # Alternating row colors
    for i in range(1, len(data)):
        if i % 2 == 0:
            table.setStyle(TableStyle([('BACKGROUND', (0, i), (-1, i), colors.HexColor('#f1f5f9'))])) # Slate-100

    elements.append(table)
    
    # Generate PDF
    doc.build(elements)
    
    return response

class PayslipRequestListView(HRRequiredMixin, ListView):

    model = PayslipRequest
    template_name = 'hr_dashboard/generic_list.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Payslip Requests"
        context['columns'] = ['Employee', 'Month', 'Status', 'Actions']
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj, 
                'columns': [obj.employee.name, obj.month.strftime("%B %Y"), obj.get_status_display()],
                'edit_url': reverse_lazy('paysliprequest_edit', kwargs={'pk': obj.pk}),
                'delete_url': reverse_lazy('paysliprequest_delete', kwargs={'pk': obj.pk})
            })
        context['rows'] = rows
        context['hide_create'] = True
        return context

class PayslipRequestUpdateView(HRRequiredMixin, UpdateView):
    model = PayslipRequest
    fields = ['status', 'rejection_reason']
    template_name = 'hr_dashboard/payslip_request_detail.html'
    success_url = reverse_lazy('paysliprequest_list')
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Review Payslip Request"
        return context
    
    def form_valid(self, form):
        response = super().form_valid(form)
        
        from .models import ESSNotification, Payroll
        from django.urls import reverse
        from django.utils import timezone
        
        status_display = form.instance.get_status_display()
        
        if form.instance.status == 'approved':
            # Automatically generate Payroll record if it doesn't exist
            payroll, created = Payroll.objects.get_or_create(
                employee=form.instance.employee,
                month=form.instance.month,
                defaults={
                    'basic_salary': 20000.00, # Default value, can be updated by HR later
                    'payment_status': 'paid',
                    'payment_date': timezone.now().date()
                }
            )
            form.instance.status = 'generated'
            form.instance.save()
            status_display = 'Generated'
            message = f"Your payslip request for {form.instance.month.strftime('%B %Y')} has been generated and is ready to download."
        else:
            message = f"Your payslip request for {form.instance.month.strftime('%B %Y')} has been {status_display.lower()}."
        
        # Send notification to the employee about the status update
        ESSNotification.objects.create(
            employee=form.instance.employee,
            message=message,
            link=reverse('ess_payslip_request_list')
        )
        
        messages.success(self.request, f"Payslip request for {form.instance.employee.name} updated successfully.")
        return response

class PayslipRequestDeleteView(HRRequiredMixin, DeleteView):

    model = PayslipRequest
    template_name = 'core/confirm_delete.html'
    success_url = reverse_lazy('paysliprequest_list')
