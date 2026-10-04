from django.test import TestCase, Client
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.urls import reverse
from .models import Job, CareerApplication
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.exceptions import ValidationError

User = get_user_model()

class CareersPermissionTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.superuser = User.objects.create_superuser('admin', 'admin@wolt.org', 'password')
        self.admin_group = Group.objects.create(name='Admin')
        self.hr_group = Group.objects.create(name='HR')
        
        self.admin_user = User.objects.create_user('admin_user', 'admin_content@wolt.org', 'password')
        self.admin_user.groups.add(self.admin_group)
        
        self.hr_user = User.objects.create_user('hr_user', 'hr@wolt.org', 'password')
        self.hr_user.groups.add(self.hr_group)
        
        self.normal_user = User.objects.create_user('normal', 'normal@wolt.org', 'password')
        
        self.job = Job.objects.create(
            title="Test Job", slug="test-job", department="IT", location="Remote", status="active"
        )
        self.job_list_url = reverse('job_list')

    def test_anonymous_access_denied(self):
        response = self.client.get(self.job_list_url)
        self.assertEqual(response.status_code, 302) # Redirect to login
        
    def test_normal_user_denied(self):
        self.client.login(username='normal', password='password')
        response = self.client.get(self.job_list_url)
        self.assertEqual(response.status_code, 403) # Forbidden
        
    def test_admin_user_granted(self):
        self.client.login(username='admin_user', password='password')
        response = self.client.get(self.job_list_url)
        self.assertEqual(response.status_code, 200)

    def test_hr_user_granted(self):
        self.client.login(username='hr_user', password='password')
        response = self.client.get(self.job_list_url)
        self.assertEqual(response.status_code, 200)

    def test_superuser_granted(self):
        self.client.login(username='admin', password='password')
        response = self.client.get(self.job_list_url)
        self.assertEqual(response.status_code, 200)

class CareersApiTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.active_job = Job.objects.create(
            title="Active Job", slug="act-job", status="active"
        )
        self.closed_job = Job.objects.create(
            title="Closed Job", slug="cls-job", status="closed"
        )

    def test_public_api_only_active_jobs(self):
        response = self.client.get('/api/jobs/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['title'], "Active Job")

    def test_public_api_post_job_denied(self):
        response = self.client.post('/api/jobs/', {"title": "New Job", "slug": "new-job"})
        self.assertEqual(response.status_code, 401) # ReadOnlyOrAdminHRPermission blocks POST for non-admin/HR

class CareersValidationTests(TestCase):
    def test_cv_pdf_validation(self):
        from core.validators import validate_pdf_extension
        class MockFile:
            def __init__(self, name):
                self.name = name
                
        valid_cv = MockFile("resume.pdf")
        validate_pdf_extension(valid_cv) # Should not raise
        
        invalid_cv = MockFile("resume.docx")
        with self.assertRaises(ValidationError):
            validate_pdf_extension(invalid_cv)
