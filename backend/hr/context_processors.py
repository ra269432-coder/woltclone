from .models import HRNotification, ESSNotification

def hr_notifications(request):
    if request.user.is_authenticated and (request.user.is_superuser or request.user.groups.filter(name='HR').exists()):
        unread_notifications = HRNotification.objects.filter(is_read=False)
        return {
            'hr_notifications': unread_notifications[:5],
            'hr_notifications_count': unread_notifications.count()
        }
    return {}

def ess_notifications(request):
    if request.user.is_authenticated and hasattr(request.user, 'employee_profile'):
        unread_notifications = ESSNotification.objects.filter(employee=request.user.employee_profile, is_read=False)
        return {
            'ess_notifications': unread_notifications[:5],
            'ess_notifications_count': unread_notifications.count(),
            'has_employee_profile': True,
        }
    return {
        'has_employee_profile': False,
    }
