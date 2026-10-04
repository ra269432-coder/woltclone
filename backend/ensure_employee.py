import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from accounts.models import User
from hr.models import Employee

u = User.objects.filter(username='hr_admin').first()
print('User:', u)
if u:
    if not hasattr(u, 'employee_profile'):
        print('Creating employee profile for hr_admin...')
        emp = Employee.objects.create(
            user=u,
            name='HR Admin',
            email='hr_admin@wolt.org',
            employee_id='EMP-HR-01',
            department='HR',
            designation='HR Manager',
            employment_status='active',
            join_date='2026-01-01'
        )
        print('Created Employee:', emp)
        
u2 = User.objects.filter(username='admin').first()
if u2:
    if not hasattr(u2, 'employee_profile'):
        print('Creating employee profile for admin...')
        emp2 = Employee.objects.create(
            user=u2,
            name='System Admin',
            email='sysadmin@wolt.org',
            employee_id='EMP-ADM-01',
            department='Admin',
            designation='System Administrator',
            employment_status='active',
            join_date='2026-01-01'
        )
        print('Created Employee:', emp2)
