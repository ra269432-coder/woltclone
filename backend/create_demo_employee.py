import os
import django
import datetime
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from hr.models import Employee, Attendance, Leave, Payroll, ExpenseClaim

User = get_user_model()

# Create Demo User
username = 'demo_employee'
email = 'demo_employee@wayoflight.org'
password = 'DemoPassword123!'

user, created = User.objects.get_or_create(username=username, defaults={
    'email': email,
    'first_name': 'Sarah',
    'last_name': 'Jenkins'
})

if not created:
    user.set_password(password)
    user.save()
else:
    user.set_password(password)
    user.save()

# Create Employee Profile
emp, emp_created = Employee.objects.get_or_create(user=user, defaults={
    'employee_id': 'EMP-1042',
    'name': 'Sarah Jenkins',
    'email': email,
    'phone': '+1 (555) 123-4567',
    'department': 'Programs',
    'designation': 'Senior Program Officer',
    'join_date': datetime.date(2023, 5, 15),
    'employment_status': 'active',
    'address': '123 Charity Lane, NGO District',
    'bank_name': 'Global Trust Bank',
    'bank_account_number': 'GTB-9008273645',
    'emergency_contact_name': 'Michael Jenkins',
    'emergency_contact_phone': '+1 (555) 987-6543'
})

if not emp_created:
    print("Employee already exists, skipping dummy data creation.")
else:
    print(f"Created demo employee: {emp.name}")
    
    # Create Dummy Attendance (Last 5 days)
    today = datetime.date.today()
    for i in range(1, 6):
        date = today - datetime.timedelta(days=i)
        # Skip weekends
        if date.weekday() >= 5:
            continue
        
        Attendance.objects.create(
            employee=emp,
            date=date,
            check_in=datetime.time(9, 0),
            check_out=datetime.time(17, 30),
            status='present',
            working_hours=Decimal('8.5')
        )
    print("Created attendance records.")

    # Create Dummy Leaves
    Leave.objects.create(
        employee=emp,
        leave_type='Annual Leave',
        start_date=today + datetime.timedelta(days=10),
        end_date=today + datetime.timedelta(days=12),
        reason='Family vacation',
        status='approved'
    )
    Leave.objects.create(
        employee=emp,
        leave_type='Sick Leave',
        start_date=today - datetime.timedelta(days=15),
        end_date=today - datetime.timedelta(days=14),
        reason='Fever and flu',
        status='approved'
    )
    print("Created leave records.")

    # Create Dummy Payslips
    first_day_last_month = (today.replace(day=1) - datetime.timedelta(days=1)).replace(day=1)
    first_day_two_months_ago = (first_day_last_month - datetime.timedelta(days=1)).replace(day=1)
    
    Payroll.objects.create(
        employee=emp,
        month=first_day_last_month,
        basic_salary=Decimal('4500.00'),
        allowances=Decimal('500.00'),
        deductions=Decimal('350.00'),
        payment_status='paid',
        payment_date=first_day_last_month + datetime.timedelta(days=25)
    )
    Payroll.objects.create(
        employee=emp,
        month=first_day_two_months_ago,
        basic_salary=Decimal('4500.00'),
        allowances=Decimal('500.00'),
        deductions=Decimal('350.00'),
        payment_status='paid',
        payment_date=first_day_two_months_ago + datetime.timedelta(days=25)
    )
    print("Created payroll records.")

    # Create Dummy Expenses
    ExpenseClaim.objects.create(
        employee=emp,
        date=today - datetime.timedelta(days=5),
        amount=Decimal('125.50'),
        description='Client meeting lunch',
        status='approved'
    )
    ExpenseClaim.objects.create(
        employee=emp,
        date=today - datetime.timedelta(days=2),
        amount=Decimal('45.00'),
        description='Office supplies (Notebooks, pens)',
        status='pending'
    )
    print("Created expense claims.")

print("Demo account creation complete!")
