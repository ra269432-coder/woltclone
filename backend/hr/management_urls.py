from django.urls import path
from . import management_views as views

urlpatterns = [
    # Employees
    path('employees/', views.EmployeeListView.as_view(), name='employee_list'),
    path('employees/create/', views.EmployeeCreateView.as_view(), name='employee_create'),
    path('employees/<int:pk>/edit/', views.EmployeeUpdateView.as_view(), name='employee_edit'),
    path('employees/<int:pk>/delete/', views.EmployeeDeleteView.as_view(), name='employee_delete'),
    
    # Attendance
    path('attendance/', views.AttendanceListView.as_view(), name='attendance_list'),
    path('attendance/create/', views.AttendanceCreateView.as_view(), name='attendance_create'),
    path('attendance/<int:pk>/edit/', views.AttendanceUpdateView.as_view(), name='attendance_edit'),
    path('attendance/<int:pk>/delete/', views.AttendanceDeleteView.as_view(), name='attendance_delete'),
    
    # Leave
    path('leave/', views.LeaveListView.as_view(), name='leave_list'),
    path('leave/create/', views.LeaveCreateView.as_view(), name='leave_create'),
    path('leave/<int:pk>/edit/', views.LeaveUpdateView.as_view(), name='leave_edit'),
    path('leave/<int:pk>/delete/', views.LeaveDeleteView.as_view(), name='leave_delete'),
    
    # Payroll
    path('payroll/', views.PayrollListView.as_view(), name='payroll_list'),
    path('payroll/create/', views.PayrollCreateView.as_view(), name='payroll_create'),
    path('payroll/<int:pk>/edit/', views.PayrollUpdateView.as_view(), name='payroll_edit'),
    path('payroll/<int:pk>/delete/', views.PayrollDeleteView.as_view(), name='payroll_delete'),
    
    # Payslip Requests
    path('payslip-requests/', views.PayslipRequestListView.as_view(), name='paysliprequest_list'),
    path('payslip-requests/<int:pk>/edit/', views.PayslipRequestUpdateView.as_view(), name='paysliprequest_edit'),
    path('payslip-requests/<int:pk>/delete/', views.PayslipRequestDeleteView.as_view(), name='paysliprequest_delete'),
    
    # Performance
    path('performance/', views.PerformanceListView.as_view(), name='performance_list'),
    path('performance/create/', views.PerformanceCreateView.as_view(), name='performance_create'),
    path('performance/<int:pk>/edit/', views.PerformanceUpdateView.as_view(), name='performance_edit'),
    path('performance/<int:pk>/delete/', views.PerformanceDeleteView.as_view(), name='performance_delete'),
    
    # Training
    path('training/', views.TrainingListView.as_view(), name='training_list'),
    path('training/create/', views.TrainingCreateView.as_view(), name='training_create'),
    path('training/<int:pk>/edit/', views.TrainingUpdateView.as_view(), name='training_edit'),
    path('training/<int:pk>/delete/', views.TrainingDeleteView.as_view(), name='training_delete'),
    
    # Employee Documents
    path('documents/', views.EmployeeDocumentListView.as_view(), name='document_list'),
    path('documents/create/', views.EmployeeDocumentCreateView.as_view(), name='document_create'),
    path('documents/<int:pk>/edit/', views.EmployeeDocumentUpdateView.as_view(), name='document_edit'),
    path('documents/<int:pk>/delete/', views.EmployeeDocumentDeleteView.as_view(), name='document_delete'),
    
    # Expense Claims
    path('expenses/', views.ExpenseClaimListView.as_view(), name='expense_list'),
    path('expenses/create/', views.ExpenseClaimCreateView.as_view(), name='expense_create'),
    path('expenses/<int:pk>/edit/', views.ExpenseClaimUpdateView.as_view(), name='expense_edit'),
    path('expenses/<int:pk>/delete/', views.ExpenseClaimDeleteView.as_view(), name='expense_delete'),
    
    
    # Tasks
    path('tasks/', views.TaskListView.as_view(), name='task_list'),
    path('tasks/create/', views.TaskCreateView.as_view(), name='task_create'),
    path('tasks/<int:pk>/edit/', views.TaskUpdateView.as_view(), name='task_edit'),
    path('tasks/<int:pk>/delete/', views.TaskDeleteView.as_view(), name='task_delete'),

    # HR Quick Actions
    path('leaves/<int:pk>/action/<str:action>/', views.hr_action_leave, name='hr_action_leave'),
    path('expenses/<int:pk>/action/<str:action>/', views.hr_action_expense, name='hr_action_expense'),
    
    # Notifications
    path('notification/<int:pk>/read/', views.read_notification, name='read_notification'),
    path('notifications/mark-all-read/', views.mark_all_hr_notifications_read, name='mark_all_hr_notifications_read'),
    
    # Reports
    path('reports/download/', views.download_pdf_report, name='download_pdf_report'),
    path('reports/', views.HRReportsView.as_view(), name='hr_reports'),
]
