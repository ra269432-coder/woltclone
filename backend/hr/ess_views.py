from django.views.generic import TemplateView, ListView, CreateView, UpdateView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.urls import reverse_lazy, reverse
from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages
from django.utils import timezone
from .models import Employee, Leave, Attendance, Payroll, ExpenseClaim, Training, EmployeeDocument, Task
from .forms import ESSLeaveForm, ESSExpenseForm, ESSTaskUpdateForm, ESSProfileUpdateForm

class ESSRequiredMixin(LoginRequiredMixin, UserPassesTestMixin):
    def test_func(self):
        return hasattr(self.request.user, 'employee_profile')

    def get_employee(self):
        return self.request.user.employee_profile

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['employee'] = self.get_employee()
        return context

class ESSDashboardView(ESSRequiredMixin, TemplateView):
    template_name = 'ess/dashboard.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        emp = self.get_employee()
        context['employee'] = emp
        context['recent_leaves'] = Leave.objects.filter(employee=emp).order_by('-start_date')[:5]
        context['recent_payslips'] = Payroll.objects.filter(employee=emp).order_by('-month')[:3]
        context['today_attendance'] = Attendance.objects.filter(employee=emp, date=timezone.now().date()).first()
        context['upcoming_trainings'] = emp.trainings.filter(start_date__gte=timezone.now().date()).order_by('start_date')[:3]
        
        # Calculate real leave balances for current year
        approved_leaves = Leave.objects.filter(employee=emp, status='approved', start_date__year=timezone.now().year)
        used_leave_days = sum((l.end_date - l.start_date).days + 1 for l in approved_leaves)
        context['used_leave_days'] = used_leave_days
        context['total_leave_days'] = 20
        context['remaining_leave_days'] = max(20 - used_leave_days, 0)
        
        return context

class ESSProfileUpdateView(ESSRequiredMixin, UpdateView):
    model = Employee
    template_name = 'core/form.html'
    form_class = ESSProfileUpdateForm
    success_url = reverse_lazy('ess_dashboard')

    def get_object(self):
        return self.get_employee()
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Update Profile"
        return context
        
    def form_valid(self, form):
        messages.success(self.request, "Profile updated successfully.")
        return super().form_valid(form)

# --- LEAVE ---
class ESSLeaveListView(ESSRequiredMixin, ListView):
    model = Leave
    template_name = 'ess/generic_list.html'
    
    def get_queryset(self):
        return Leave.objects.filter(employee=self.get_employee())
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "My Leave Requests"
        context['create_url'] = reverse_lazy('ess_leave_create')
        context['columns'] = ['Type', 'Start Date', 'End Date', 'Reason', 'Status']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'columns': [
                    obj.leave_type,
                    obj.start_date.strftime("%b %d, %Y"),
                    obj.end_date.strftime("%b %d, %Y"),
                    obj.reason[:30] + "..." if len(obj.reason) > 30 else obj.reason,
                    obj.get_status_display()
                ]
            })
        context['rows'] = rows
        return context

class ESSLeaveCreateView(ESSRequiredMixin, CreateView):
    model = Leave
    template_name = 'core/form.html'
    form_class = ESSLeaveForm
    success_url = reverse_lazy('ess_leave_list')

    def form_valid(self, form):
        form.instance.employee = self.get_employee()
        form.instance.status = 'pending'
        messages.success(self.request, "Leave request submitted successfully.")
        return super().form_valid(form)
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Request Leave"
        return context

# --- PAYROLL ---
class ESSPayslipListView(ESSRequiredMixin, ListView):
    model = Payroll
    template_name = 'ess/generic_list.html'
    
    def get_queryset(self):
        return Payroll.objects.filter(employee=self.get_employee(), payment_status='paid')
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "My Payslips"
        context['page_subtitle'] = "View and download your official monthly payslips."
        context['create_url'] = reverse_lazy('ess_payslip_request_create')
        context['create_button_text'] = "Request Payslip"
        context['columns'] = ['Month', 'Gross Salary', 'Net Salary', 'Payment Date', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'columns': [
                    obj.month.strftime("%B %Y"),
                    f"${obj.gross_salary}",
                    f"${obj.net_salary}",
                    obj.payment_date.strftime("%b %d, %Y") if obj.payment_date else "-"
                ],
                'extra_actions': [
                    {'url': reverse_lazy('ess_download_payslip', kwargs={'payslip_id': obj.id}), 'label': 'Download PDF', 'target': '_blank'}
                ]
            })
        context['rows'] = rows
        return context

# --- EXPENSES ---
class ESSExpenseListView(ESSRequiredMixin, ListView):
    model = ExpenseClaim
    template_name = 'ess/generic_list.html'
    
    def get_queryset(self):
        return ExpenseClaim.objects.filter(employee=self.get_employee())
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "My Expense Claims"
        context['create_url'] = reverse_lazy('ess_expense_create')
        context['columns'] = ['Date', 'Amount', 'Description', 'Status']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'columns': [
                    obj.date.strftime("%b %d, %Y"),
                    f"${obj.amount}",
                    obj.description[:30] + "..." if len(obj.description) > 30 else obj.description,
                    obj.get_status_display()
                ],
                'extra_actions': [
                    {'url': obj.receipt_file.url if obj.receipt_file else '#', 'label': 'View Receipt', 'target': '_blank'}
                ] if obj.receipt_file else []
            })
        context['rows'] = rows
        return context

class ESSExpenseCreateView(ESSRequiredMixin, CreateView):
    model = ExpenseClaim
    template_name = 'core/form.html'
    form_class = ESSExpenseForm
    success_url = reverse_lazy('ess_expense_list')

    def form_valid(self, form):
        form.instance.employee = self.get_employee()
        form.instance.status = 'pending'
        messages.success(self.request, "Expense claim submitted successfully.")
        return super().form_valid(form)
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Submit Expense Claim"
        return context


# --- TASKS ---
class ESSTaskListView(ESSRequiredMixin, ListView):
    model = Task
    template_name = 'ess/tasks.html'
    
    def get_queryset(self):
        return Task.objects.filter(employee=self.get_employee())
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        qs = self.get_queryset()
        context['page_title'] = "My Tasks"
        
        # Calculate stats
        now = timezone.now().date()
        context['total_tasks'] = qs.count()
        context['pending_tasks'] = qs.filter(status='not_started').count()
        context['in_progress'] = qs.filter(status='in_progress').count()
        context['submitted'] = qs.filter(status='submitted').count()
        context['completed'] = qs.filter(status='completed').count()
        context['overdue'] = qs.filter(deadline__lt=now).exclude(status__in=['completed', 'approved', 'submitted']).count()
        
        return context

class ESSTaskUpdateView(ESSRequiredMixin, UpdateView):
    model = Task
    form_class = ESSTaskUpdateForm
    template_name = 'ess/task_detail.html'
    success_url = reverse_lazy('ess_task_list')

    def get_queryset(self):
        return Task.objects.filter(employee=self.get_employee())

    def form_valid(self, form):
        submit_for_review = form.cleaned_data.get('submit_for_review')
        if submit_for_review:
            form.instance.status = 'submitted'
            messages.success(self.request, "Task submitted for review successfully.")
        elif form.cleaned_data.get('employee_requirements') and form.instance.status == 'assigned':
            form.instance.status = 'requirements_submitted'
            messages.success(self.request, "Task requirements submitted successfully.")
            
        response = super().form_valid(form)
        
        from .models import HRNotification
        if submit_for_review:
            HRNotification.objects.create(
                message=f"Task Submitted for Review by {self.request.user.employee_profile.name}: {form.instance.title}",
                link=reverse('task_edit', kwargs={'pk': form.instance.pk})
            )
        elif form.instance.status == 'requirements_submitted':
            HRNotification.objects.create(
                message=f"Requirements submitted by {self.request.user.employee_profile.name} for task: {form.instance.title}",
                link=reverse('task_edit', kwargs={'pk': form.instance.pk})
            )
            
        return response
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Task Details"
        context['cancel_url'] = reverse_lazy('ess_task_list')
        return context

from django.views.decorators.http import require_POST
@require_POST
def ess_task_mark_part(request, pk):
    from django.http import JsonResponse
    if not request.user.is_authenticated or not hasattr(request.user, 'employee_profile'):
        return JsonResponse({'status': 'unauthorized'}, status=401)
        
    task = get_object_or_404(Task, pk=pk, employee=request.user.employee_profile)
    part_name = request.POST.get('part_name')
    
    if not part_name:
        return JsonResponse({'status': 'error', 'message': 'part_name is required'}, status=400)
        
    # Update the JSON breakdown
    updated_breakdown = list(task.breakdown)
    updated = False
    for item in updated_breakdown:
        if item.get('name') == part_name:
            item['completed'] = True
            updated = True
            break
            
    if updated:
        task.breakdown = updated_breakdown
        task.status = 'in_progress' # Move to in_progress if not already
        task.save()
        
        # Notify the assigner
        from .models import HRNotification
        assigner_name = task.assigned_by.get_full_name() or task.assigned_by.username
        HRNotification.objects.create(
            message=f"{task.employee.name} has completed the '{part_name}' part of task: {task.title}",
            link=reverse('task_edit', kwargs={'pk': task.pk})
        )
        return JsonResponse({'status': 'success'})
    else:
        return JsonResponse({'status': 'error', 'message': 'part not found'}, status=404)

# --- ATTENDANCE CLOCK IN/OUT ---
def ess_clock_action(request):
    if not request.user.is_authenticated or not hasattr(request.user, 'employee_profile'):
        return redirect('login')
        
    emp = request.user.employee_profile
    now = timezone.localtime(timezone.now())
    today = now.date()
    now_time = now.time()
    
    attendance, created = Attendance.objects.get_or_create(employee=emp, date=today)
    
    if request.method == "POST":
        action = request.POST.get('action')
        if action == 'clock_in' and not attendance.check_in:
            attendance.check_in = now_time
            messages.success(request, f"Clocked in at {now_time.strftime('%I:%M %p')}")
        elif action == 'clock_out' and attendance.check_in and not attendance.check_out:
            attendance.check_out = now_time
            messages.success(request, f"Clocked out at {now_time.strftime('%I:%M %p')}")
        attendance.save()
        
    next_url = request.POST.get('next') or request.GET.get('next') or 'ess_dashboard'
    return redirect(next_url)
def download_payslip_pdf(request, payslip_id):
    from django.http import HttpResponse, Http404
    from django.shortcuts import get_object_or_404
    try:
        from reportlab.lib import colors
        from reportlab.lib.pagesizes import letter
        from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
        from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
        from reportlab.lib.units import inch
        from django.conf import settings
        import os
    except ImportError as e:
        return HttpResponse(f'Error importing ReportLab: {e}', status=500)

    if not hasattr(request.user, 'employee_profile'):
        raise Http404("Employee profile not found.")
        
    emp = request.user.employee_profile
    payslip = get_object_or_404(Payroll, id=payslip_id, employee=emp)

    response = HttpResponse(content_type='application/pdf')
    filename = f"Payslip_{payslip.month.strftime('%Y_%m')}.pdf"
    response['Content-Disposition'] = f'attachment; filename="{filename}"'

    doc = SimpleDocTemplate(response, pagesize=letter, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
    elements = []
    styles = getSampleStyleSheet()
    
    # Custom Styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=20,
        textColor=colors.HexColor('#0f172a'),
        alignment=1, # Center
        spaceAfter=6
    )
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Normal'],
        fontSize=12,
        textColor=colors.HexColor('#475569'),
        alignment=1, # Center
        spaceAfter=20
    )
    section_header = ParagraphStyle(
        'SectionHeader',
        parent=styles['Heading3'],
        fontSize=12,
        textColor=colors.HexColor('#0f172a'),
        spaceAfter=10,
        spaceBefore=15
    )

    # 1. Header & Logo
    logo_path = os.path.join(settings.BASE_DIR, 'static', 'logo.png')
    
    logo_added = False
    if os.path.exists(logo_path):
        try:
            im = Image(logo_path, width=1.2*inch, height=1.2*inch)
            im.hAlign = 'CENTER'
            elements.append(im)
            elements.append(Spacer(1, 0.1*inch))
            logo_added = True
        except:
            pass
            
    if not logo_added:
        elements.append(Paragraph("<b>Way of Light Trust</b>", title_style))
        
    elements.append(Paragraph("Payslip Document", subtitle_style))
            
    elements.append(Spacer(1, 0.2*inch))
    
    # 2. Payslip Title
    elements.append(Paragraph(f"<b>PAYSLIP FOR THE MONTH OF {payslip.month.strftime('%B %Y').upper()}</b>", title_style))
    elements.append(Spacer(1, 0.3*inch))

    payment_date_str = payslip.payment_date.strftime('%d-%b-%Y') if payslip.payment_date else 'N/A'
    emp_details = [
        ['Employee Name:', emp.name, 'Employee ID:', emp.employee_id],
        ['Designation:', emp.designation, 'Department:', emp.department],
        ['Salary Month:', payslip.month.strftime('%B %Y'), 'Payment Status:', payslip.get_payment_status_display()],
        ['Payment Date:', payment_date_str, 'Bank A/C No:', emp.bank_account_number or 'N/A']
    ]
    
    emp_table = Table(emp_details, colWidths=[1.5*inch, 2*inch, 1.5*inch, 2*inch])
    emp_table.setStyle(TableStyle([
        ('FONTNAME', (0,0), (-1,-1), 'Helvetica'),
        ('FONTNAME', (0,0), (0,-1), 'Helvetica-Bold'),
        ('FONTNAME', (2,0), (2,-1), 'Helvetica-Bold'),
        ('TEXTCOLOR', (0,0), (-1,-1), colors.HexColor('#334155')),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#cbd5e1')),
        ('PADDING', (0,0), (-1,-1), 6),
        ('BACKGROUND', (0,0), (0,-1), colors.HexColor('#f8fafc')),
        ('BACKGROUND', (2,0), (2,-1), colors.HexColor('#f8fafc')),
    ]))
    elements.append(emp_table)
    elements.append(Spacer(1, 0.4*inch))

    # 4. Salary Details (Earnings vs Deductions)
    elements.append(Paragraph("<b>Salary Details</b>", section_header))
    
    salary_data = [
        ['Earnings', 'Amount ($)', 'Deductions', 'Amount ($)'],
        ['Basic Salary', f"{payslip.basic_salary}", 'Taxes & Deductions', f"{payslip.deductions}"],
        ['Allowances', f"{payslip.allowances}", '', ''],
        ['', '', '', ''], # Blank row
        ['Total Earnings', f"{payslip.gross_salary}", 'Total Deductions', f"{payslip.deductions}"]
    ]
    
    salary_table = Table(salary_data, colWidths=[2.5*inch, 1*inch, 2.5*inch, 1*inch])
    salary_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#0f172a')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('ALIGN', (1, 0), (1, -1), 'RIGHT'),
        ('ALIGN', (3, 0), (3, -1), 'RIGHT'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('PADDING', (0,0), (-1,-1), 8),
        # Totals Row
        ('FONTNAME', (0, -1), (-1, -1), 'Helvetica-Bold'),
        ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#f1f5f9')),
    ]))
    elements.append(salary_table)
    elements.append(Spacer(1, 0.4*inch))
    
    # 5. Net Salary
    net_pay_data = [[f"NET PAY: ${payslip.net_salary}"]]
    net_pay_table = Table(net_pay_data, colWidths=[7*inch])
    net_pay_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), colors.HexColor('#0284c7')), # Light blue
        ('TEXTCOLOR', (0,0), (0,0), colors.white),
        ('ALIGN', (0,0), (0,0), 'CENTER'),
        ('FONTNAME', (0,0), (0,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (0,0), 14),
        ('PADDING', (0,0), (0,0), 12),
    ]))
    elements.append(net_pay_table)
    elements.append(Spacer(1, 0.8*inch))
    
    # 6. Footer Disclaimer
    elements.append(Paragraph("<i>This is a computer-generated document. No signature is required.</i>", ParagraphStyle('Footer', parent=styles['Normal'], alignment=1, textColor=colors.gray)))

    doc.build(elements)
    return response

class ESSPayslipRequestCreateView(ESSRequiredMixin, CreateView):
    from .models import PayslipRequest
    model = PayslipRequest
    template_name = 'core/form.html'
    from .forms import PayslipRequestForm
    form_class = PayslipRequestForm
    success_url = reverse_lazy('ess_payslip_list')

    def form_valid(self, form):
        form.instance.employee = self.get_employee()
        form.instance.status = 'pending'
        messages.success(self.request, "Payslip request submitted successfully.")
        return super().form_valid(form)
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Request Payslip"
        return context

class ESSPayslipRequestListView(ESSRequiredMixin, ListView):
    from .models import PayslipRequest
    model = PayslipRequest
    template_name = 'ess/generic_list.html'
    
    def get_queryset(self):
        from .models import PayslipRequest
        return PayslipRequest.objects.filter(employee=self.get_employee())
        
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "My Payslip Requests"
        context['page_subtitle'] = "Track the status of your payslip requests."
        context['create_url'] = reverse_lazy('ess_payslip_request_create')
        context['create_button_text'] = "New Request"
        context['columns'] = ['Month', 'Reason', 'Status', 'Submitted On', 'Actions']
        
        from .models import Payroll
        rows = []
        for obj in context['object_list']:
            extra_actions = []
            if obj.status in ['approved', 'generated']:
                payroll = Payroll.objects.filter(employee=obj.employee, month=obj.month).first()
                if payroll:
                    extra_actions.append({
                        'url': reverse('ess_download_payslip', kwargs={'payslip_id': payroll.id}),
                        'label': 'Download PDF',
                        'target': '_blank'
                    })
                    
            rows.append({
                'item': obj,
                'columns': [
                    obj.month.strftime("%B %Y"),
                    obj.reason[:30] + "..." if len(obj.reason) > 30 else (obj.reason or '-'),
                    obj.get_status_display(),
                    obj.created_at.strftime("%b %d, %Y")
                ],
                'extra_actions': extra_actions
            })
        context['rows'] = rows
        return context

def read_notification(request, pk):
    from .models import ESSNotification
    notification = get_object_or_404(ESSNotification, pk=pk)
    if hasattr(request.user, 'employee_profile') and notification.employee == request.user.employee_profile:
        notification.is_read = True
        notification.save()
        return redirect(notification.link)
    return redirect('ess_dashboard')

from django.http import JsonResponse
def mark_all_ess_notifications_read(request):
    if request.user.is_authenticated and hasattr(request.user, 'employee_profile'):
        from .models import ESSNotification
        ESSNotification.objects.filter(employee=request.user.employee_profile, is_read=False).update(is_read=True)
        return JsonResponse({'status': 'success'})
    return JsonResponse({'status': 'unauthorized'}, status=401)
