from django.test import TestCase
from rest_framework.test import APIClient
from django.contrib.auth import get_user_model
from django.urls import reverse
from .models import NewsletterSubscriber, VolunteerApplication, Donation

User = get_user_model()

class EngagementApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_newsletter_subscribe(self):
        response = self.client.post('/api/newsletter/', {'email': 'test@wolt.org'})
        self.assertEqual(response.status_code, 201)
        self.assertTrue(NewsletterSubscriber.objects.filter(email='test@wolt.org').exists())

    def test_volunteer_application(self):
        data = {
            'name': 'Volunteer Test',
            'email': 'vol@wolt.org',
            'phone': '1234567890',
            'interests': 'Teaching',
            'motivation': 'Help others'
        }
        response = self.client.post('/api/volunteer/', data)
        self.assertEqual(response.status_code, 201)
        self.assertTrue(VolunteerApplication.objects.filter(email='vol@wolt.org').exists())

    def test_donation(self):
        data = {
            'donor_name': 'Donor Test',
            'email': 'donor@wolt.org',
            'amount': '1000.00'
        }
        response = self.client.post('/api/donations/', data)
        self.assertEqual(response.status_code, 201)
        # Mock view automatically sets payment_status to 'successful'
        donation = Donation.objects.get(email='donor@wolt.org')
        self.assertEqual(donation.payment_status, 'successful')
        self.assertIsNotNone(donation.transaction_id)

class EngagementPermissionsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin = User.objects.create_superuser('admin', 'admin@wolt.org', 'password')
        
    def test_anonymous_cannot_get_donations(self):
        response = self.client.get('/api/donations/')
        self.assertEqual(response.status_code, 401)
        
    def test_admin_can_get_donations(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.get('/api/donations/')
        self.assertEqual(response.status_code, 200)
