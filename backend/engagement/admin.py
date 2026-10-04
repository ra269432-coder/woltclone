from django.contrib import admin
from .models import NewsletterSubscriber, ContactMessage, Donation, VolunteerApplication

admin.site.register(NewsletterSubscriber)
admin.site.register(ContactMessage)
admin.site.register(Donation)
admin.site.register(VolunteerApplication)
