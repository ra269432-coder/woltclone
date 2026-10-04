from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NewsletterSubscriberViewSet, ContactMessageViewSet, DonationViewSet, VolunteerApplicationViewSet

router = DefaultRouter()
router.register(r'newsletter', NewsletterSubscriberViewSet, basename='newsletter')
router.register(r'contact', ContactMessageViewSet, basename='contact')
router.register(r'donations', DonationViewSet, basename='donations')
router.register(r'volunteer', VolunteerApplicationViewSet, basename='volunteer')

urlpatterns = [
    path('', include(router.urls)),
]
