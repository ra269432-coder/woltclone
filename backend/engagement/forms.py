from django import forms
from core.forms import TailwindModelForm
from .models import NewsletterSubscriber, ContactMessage, Donation, VolunteerApplication

class NewsletterSubscriberForm(TailwindModelForm):
    class Meta:
        model = NewsletterSubscriber
        fields = ['email', 'subscribed']

class ContactMessageForm(TailwindModelForm):
    class Meta:
        model = ContactMessage
        fields = ['status']

class VolunteerApplicationForm(TailwindModelForm):
    class Meta:
        model = VolunteerApplication
        fields = ['status']

class DonationForm(TailwindModelForm):
    class Meta:
        model = Donation
        fields = ['payment_status']
