from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from careers.models import Job, CareerApplication, InternshipApplication
from .models import Employee, Attendance, Leave
from datetime import date
from django.utils import timezone
class HRDashboardView(LoginRequiredMixin, UserPassesTestMixin, TemplateView):
    template_name = 'hr_dashboard/dashboard.html'

    def test_func(self):
        return self.request.user.is_superuser or self.request.user.groups.filter(name='HR').exists()

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['open_jobs'] = Job.objects.filter(status='active').count()
        context['career_apps'] = CareerApplication.objects.count()
        context['intern_apps'] = InternshipApplication.objects.count()
        
        context['total_employees'] = Employee.objects.count()
        context['active_employees'] = Employee.objects.filter(employment_status='active').count()
        
        today = date.today()
        context['today_present'] = Attendance.objects.filter(date=today, status='present').count()
        context['today_absent'] = Attendance.objects.filter(date=today, status='absent').count()
        context['pending_leaves'] = Leave.objects.filter(status='pending').count()
        
        from .models import PayslipRequest
        context['pending_payslip_requests'] = PayslipRequest.objects.filter(status='pending').count()
        
        if hasattr(self.request.user, 'employee_profile'):
            emp = self.request.user.employee_profile
            context['employee'] = emp
            context['today_attendance'] = Attendance.objects.filter(employee=emp, date=timezone.now().date()).first()
            
            approved_leaves = Leave.objects.filter(employee=emp, status='approved', start_date__year=timezone.now().year)
            used_leave_days = sum((l.end_date - l.start_date).days + 1 for l in approved_leaves)
            context['used_leave_days'] = used_leave_days
            context['total_leave_days'] = 20
            context['remaining_leave_days'] = max(20 - used_leave_days, 0)
            
            # Additional ess things if needed
            context['recent_leaves'] = Leave.objects.filter(employee=emp).order_by('-start_date')[:5]
            
        return context
