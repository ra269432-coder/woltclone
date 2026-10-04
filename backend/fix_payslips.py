import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from hr.models import PayslipRequest, Payroll
from django.utils import timezone

print("Fixing old approved requests...")
for request in PayslipRequest.objects.filter(status='approved'):
    payroll, created = Payroll.objects.get_or_create(
        employee=request.employee,
        month=request.month,
        defaults={
            'basic_salary': 20000.00,
            'payment_status': 'paid',
            'payment_date': timezone.now().date()
        }
    )
    if created:
        print(f"Created Payroll for {request.employee.name} - {request.month}")
    request.status = 'generated'
    request.save()
    print(f"Updated request {request.id} status to generated")
print("Done!")
