from django.test import TestCase, Client
from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
User = get_user_model()
from django.urls import reverse
from .models import Program, News, Partner
from django.core.files.uploadedfile import SimpleUploadedFile
from .validators import validate_file_size, validate_image_extension, validate_no_executable
from django.core.exceptions import ValidationError

class CorePermissionTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.superuser = User.objects.create_superuser('admin', 'admin@wolt.org', 'password')
        self.admin_group = Group.objects.create(name='Admin')
        self.hr_group = Group.objects.create(name='HR')
        
        self.admin_user = User.objects.create_user('content_admin', 'content@wolt.org', 'password')
        self.admin_user.groups.add(self.admin_group)
        
        self.hr_user = User.objects.create_user('hr_user', 'hr@wolt.org', 'password')
        self.hr_user.groups.add(self.hr_group)
        
        self.normal_user = User.objects.create_user('normal', 'normal@wolt.org', 'password')
        
        self.program = Program.objects.create(
            title="Test Program", slug="test-program", description="Description", status="active"
        )
        self.list_url = reverse('program_list')

    def test_anonymous_access_denied(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, 302)
        
    def test_normal_user_denied(self):
        self.client.login(username='normal', password='password')
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, 403)
        
    def test_hr_user_denied_admin_content(self):
        self.client.login(username='hr_user', password='password')
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, 403)
        
    def test_admin_user_granted(self):
        self.client.login(username='content_admin', password='password')
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, 200)

    def test_superuser_granted(self):
        self.client.login(username='admin', password='password')
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, 200)

class CoreApiTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.published_news = News.objects.create(
            title="Published News", slug="pub-news", content="content", published=True
        )
        self.draft_news = News.objects.create(
            title="Draft News", slug="draft-news", content="content", published=False
        )

    def test_api_read_only_and_filters_published(self):
        response = self.client.get('/api/news/')
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(len(data), 1)
        self.assertEqual(data[0]['title'], "Published News")
        
    def test_api_post_denied(self):
        response = self.client.post('/api/news/', {"title": "New", "slug": "new"})
        self.assertEqual(response.status_code, 405) # Method Not Allowed

class CoreValidatorTests(TestCase):
    def test_file_size_validator(self):
        class MockFile:
            def __init__(self, size):
                self.size = size
        
        # 4MB file should pass
        valid_file = MockFile(4 * 1024 * 1024)
        validate_file_size(valid_file)
        
        # 6MB file should fail
        invalid_file = MockFile(6 * 1024 * 1024)
        with self.assertRaises(ValidationError):
            validate_file_size(invalid_file)

    def test_image_extension_validator(self):
        class MockFile:
            def __init__(self, name):
                self.name = name
                
        valid_file = MockFile("image.jpg")
        validate_image_extension(valid_file)
        
        invalid_file = MockFile("script.js")
        with self.assertRaises(ValidationError):
            validate_image_extension(invalid_file)

    def test_executable_validator(self):
        class MockFile:
            def __init__(self, name):
                self.name = name
                
        invalid_file = MockFile("virus.exe")
        with self.assertRaises(ValidationError):
            validate_no_executable(invalid_file)
