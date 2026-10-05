from django.contrib import admin
from .models import (
    Employee, Attendance, Leave, Payroll, Performance, 
    Training, EmployeeDocument, ExpenseClaim, HRNotification,
    Task, TaskRequirement, TaskAttachment, TaskActivity, 
    ESSNotification, PayslipRequest
)

# --- INLINES ---

class AttendanceInline(admin.TabularInline):
    model = Attendance
    extra = 0

class LeaveInline(admin.TabularInline):
    model = Leave
    extra = 0
    fk_name = 'employee'

class PayrollInline(admin.TabularInline):
    model = Payroll
    extra = 0

class PayslipRequestInline(admin.TabularInline):
    model = PayslipRequest
    extra = 0

class ExpenseClaimInline(admin.TabularInline):
    model = ExpenseClaim
    extra = 0

class TaskInline(admin.TabularInline):
    model = Task
    extra = 0
    fk_name = 'employee'

class EmployeeDocumentInline(admin.TabularInline):
    model = EmployeeDocument
    extra = 0

class TaskRequirementInline(admin.TabularInline):
    model = TaskRequirement
    extra = 0

class TaskAttachmentInline(admin.TabularInline):
    model = TaskAttachment
    extra = 0

class TaskActivityInline(admin.TabularInline):
    model = TaskActivity
    extra = 0

# --- MODEL ADMINS ---

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('employee_id', 'name', 'department', 'designation', 'employment_status')
    search_fields = ('employee_id', 'name', 'email')
    list_filter = ('department', 'employment_status')
    inlines = [
        AttendanceInline,
        LeaveInline,
        PayrollInline,
        PayslipRequestInline,
        ExpenseClaimInline,
        TaskInline,
        EmployeeDocumentInline
    ]

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'employee', 'status', 'priority', 'deadline')
    list_filter = ('status', 'priority')
    search_fields = ('title', 'employee__name')
    inlines = [
        TaskRequirementInline, 
        TaskAttachmentInline, 
        TaskActivityInline
    ]

# --- REGISTRATION ---

admin.site.register(Employee, EmployeeAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(Attendance)
admin.site.register(Leave)
admin.site.register(Payroll)
admin.site.register(Performance)
admin.site.register(Training)
admin.site.register(EmployeeDocument)
admin.site.register(ExpenseClaim)
admin.site.register(HRNotification)
admin.site.register(TaskRequirement)
admin.site.register(TaskAttachment)
admin.site.register(TaskActivity)
admin.site.register(ESSNotification)
admin.site.register(PayslipRequest)
