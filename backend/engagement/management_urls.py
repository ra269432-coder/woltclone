from django.urls import path
from . import management_views as views

urlpatterns = [
    # Newsletter
    path('newsletter/', views.NewsletterListView.as_view(), name='newsletter_list'),
    path('newsletter/<int:pk>/edit/', views.NewsletterUpdateView.as_view(), name='newsletter_edit'),
    path('newsletter/<int:pk>/delete/', views.NewsletterDeleteView.as_view(), name='newsletter_delete'),
    
    # Contact Messages
    path('contact/', views.ContactMessageListView.as_view(), name='contact_list'),
    path('contact/<int:pk>/edit/', views.ContactMessageUpdateView.as_view(), name='contact_edit'),
    path('contact/<int:pk>/delete/', views.ContactMessageDeleteView.as_view(), name='contact_delete'),
    
    # Volunteer Applications
    path('volunteer/', views.VolunteerApplicationListView.as_view(), name='volunteer_list'),
    path('volunteer/<int:pk>/edit/', views.VolunteerApplicationUpdateView.as_view(), name='volunteer_edit'),
    path('volunteer/<int:pk>/delete/', views.VolunteerApplicationDeleteView.as_view(), name='volunteer_delete'),
    
    # Donations
    path('donations/', views.DonationListView.as_view(), name='donation_list'),
    path('donations/<int:pk>/edit/', views.DonationUpdateView.as_view(), name='donation_edit'),
    path('donations/<int:pk>/delete/', views.DonationDeleteView.as_view(), name='donation_delete'),
]
