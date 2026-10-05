from django.urls import path, reverse_lazy
from django.contrib.auth import views as auth_views
from . import ess_views

urlpatterns = [
    path('password_change/', auth_views.PasswordChangeView.as_view(
        template_name='ess/password_change.html', 
        success_url=reverse_lazy('ess_dashboard')
    ), name='ess_password_change'),
    path('', ess_views.ESSDashboardView.as_view(), name='ess_dashboard'),
    path('profile/', ess_views.ESSProfileUpdateView.as_view(), name='ess_profile_update'),
    
    # Leave
    path('leave/', ess_views.ESSLeaveListView.as_view(), name='ess_leave_list'),
    path('leave/request/', ess_views.ESSLeaveCreateView.as_view(), name='ess_leave_create'),
    
    # Payroll
    path('payslips/', ess_views.ESSPayslipListView.as_view(), name='ess_payslip_list'),
    path('payslips/requests/', ess_views.ESSPayslipRequestListView.as_view(), name='ess_payslip_request_list'),
    path('payslips/request/', ess_views.ESSPayslipRequestCreateView.as_view(), name='ess_payslip_request_create'),
    path('payslips/<int:payslip_id>/download/', ess_views.download_payslip_pdf, name='ess_download_payslip'),
    
    # Expenses
    path('expenses/', ess_views.ESSExpenseListView.as_view(), name='ess_expense_list'),
    path('expenses/submit/', ess_views.ESSExpenseCreateView.as_view(), name='ess_expense_create'),
    
    
    # Tasks
    path('tasks/', ess_views.ESSTaskListView.as_view(), name='ess_task_list'),
    path('tasks/<int:pk>/', ess_views.ESSTaskUpdateView.as_view(), name='ess_task_detail'),
    path('tasks/<int:pk>/mark-part/', ess_views.ess_task_mark_part, name='ess_task_mark_part'),

    # Attendance Action
    path('attendance/clock/', ess_views.ess_clock_action, name='ess_clock_action'),

    # Notifications
    path('notification/<int:pk>/read/', ess_views.read_notification, name='ess_read_notification'),
    path('notifications/mark-all-read/', ess_views.mark_all_ess_notifications_read, name='ess_mark_all_notifications_read'),
]
