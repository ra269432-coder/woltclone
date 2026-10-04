from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.urls import reverse
from .models import Leave, ExpenseClaim, HRNotification, ESSNotification, Task

@receiver(pre_save, sender=Leave)
def capture_old_leave_status(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = Leave.objects.get(pk=instance.pk)
            instance._old_status = old_instance.status
        except Leave.DoesNotExist:
            instance._old_status = None
    else:
        instance._old_status = None

@receiver(post_save, sender=Leave)
def create_leave_notification(sender, instance, created, **kwargs):
    if created and instance.status == 'pending':
        HRNotification.objects.create(
            message=f"New leave request submitted by {instance.employee.name}.",
            link=reverse('leave_list')
        )
    elif not created and hasattr(instance, '_old_status') and instance.status != instance._old_status:
        if instance.status in ['approved', 'rejected']:
            ESSNotification.objects.create(
                employee=instance.employee,
                message=f"Your leave request has been {instance.status}.",
                link=reverse('ess_leave_list')
            )

@receiver(pre_save, sender=ExpenseClaim)
def capture_old_expense_status(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = ExpenseClaim.objects.get(pk=instance.pk)
            instance._old_status = old_instance.status
        except ExpenseClaim.DoesNotExist:
            instance._old_status = None
    else:
        instance._old_status = None

@receiver(post_save, sender=ExpenseClaim)
def create_expense_notification(sender, instance, created, **kwargs):
    if created and instance.status == 'pending':
        HRNotification.objects.create(
            message=f"New expense claim submitted by {instance.employee.name} for ${instance.amount}.",
            link=reverse('expense_list')
        )
    elif not created and hasattr(instance, '_old_status') and instance.status != instance._old_status:
        if instance.status in ['approved', 'rejected']:
            ESSNotification.objects.create(
                employee=instance.employee,
                message=f"Your expense claim for ${instance.amount} has been {instance.status}.",
                link=reverse('ess_expense_list')
            )

@receiver(pre_save, sender=Task)
def capture_old_task_status(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = Task.objects.get(pk=instance.pk)
            instance._old_status = old_instance.status
        except Task.DoesNotExist:
            instance._old_status = None
    else:
        instance._old_status = None

@receiver(post_save, sender=Task)
def create_task_notification(sender, instance, created, **kwargs):
    if created:
        ESSNotification.objects.create(
            employee=instance.employee,
            message=f"New task assigned: {instance.title}.",
            link=reverse('ess_task_detail', args=[instance.pk])
        )
    elif not created and hasattr(instance, '_old_status') and instance.status != instance._old_status:
        if instance.status == 'submitted':
            HRNotification.objects.create(
                message=f"Task '{instance.title}' submitted for review by {instance.employee.name}.",
                link=reverse('task_edit', args=[instance.pk])
            )
        elif instance.status in ['revision_required', 'approved', 'completed']:
            action = instance.status.replace('_', ' ')
            ESSNotification.objects.create(
                employee=instance.employee,
                message=f"Task '{instance.title}' status updated to {action}.",
                link=reverse('ess_task_detail', args=[instance.pk])
            )

from .models import PayslipRequest

@receiver(pre_save, sender=PayslipRequest)
def capture_old_paysliprequest_status(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = PayslipRequest.objects.get(pk=instance.pk)
            instance._old_status = old_instance.status
        except PayslipRequest.DoesNotExist:
            instance._old_status = None
    else:
        instance._old_status = None

@receiver(post_save, sender=PayslipRequest)
def create_paysliprequest_notification(sender, instance, created, **kwargs):
    if created and instance.status == 'pending':
        HRNotification.objects.create(
            message=f"New payslip request from {instance.employee.name} for {instance.month.strftime('%B %Y')}.",
            link=reverse('paysliprequest_list')
        )
    elif not created and hasattr(instance, '_old_status') and instance.status != instance._old_status:
        if instance.status in ['approved', 'rejected', 'generated']:
            ESSNotification.objects.create(
                employee=instance.employee,
                message=f"Your payslip request for {instance.month.strftime('%B %Y')} is now {instance.status}.",
                link=reverse('ess_payslip_request_list')
            )
