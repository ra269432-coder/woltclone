from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.urls import reverse
from .models import Employee, Attendance, Payroll
from datetime import date, timedelta
from decimal import Decimal

User = get_user_model()

class HRModuleTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.superuser = User.objects.create_superuser('admin', 'admin@wolt.org', 'password')
        self.hr_group = Group.objects.create(name='HR')
        
        self.hr_user = User.objects.create_user('hr_user', 'hr@wolt.org', 'password')
        self.hr_user.groups.add(self.hr_group)
        
        self.normal_user = User.objects.create_user('normal', 'normal@wolt.org', 'password')
        
        self.employee = Employee.objects.create(
            employee_id="EMP-001",
            name="John Doe",
            email="john@wolt.org",
            department="Engineering",
            designation="Developer",
            join_date=date.today() - timedelta(days=365)
        )
        self.employee_list_url = reverse('employee_list')

    def test_hr_user_granted(self):
        self.client.login(username='hr_user', password='password')
        response = self.client.get(self.employee_list_url)
        self.assertEqual(response.status_code, 200)
        
    def test_superuser_granted(self):
        self.client.login(username='admin', password='password')
        response = self.client.get(self.employee_list_url)
        self.assertEqual(response.status_code, 200)

    def test_normal_user_denied(self):
        self.client.login(username='normal', password='password')
        response = self.client.get(self.employee_list_url)
        self.assertEqual(response.status_code, 403)

    def test_anonymous_access_denied(self):
        response = self.client.get(self.employee_list_url)
        self.assertEqual(response.status_code, 302)

class HRPayrollLogicTests(TestCase):
    def test_payroll_gross_and_net_calculation(self):
        emp = Employee.objects.create(
            employee_id="EMP-002",
            name="Jane Doe",
            email="jane@wolt.org",
            department="Engineering",
            designation="Manager",
            join_date=date.today()
        )
        payroll = Payroll.objects.create(
            employee=emp,
            month=date(2023, 10, 1),
            basic_salary=Decimal('5000.00'),
            allowances=Decimal('1000.00'),
            deductions=Decimal('500.00')
        )
        self.assertEqual(payroll.gross_salary, Decimal('6000.00'))
        self.assertEqual(payroll.net_salary, Decimal('5500.00'))
