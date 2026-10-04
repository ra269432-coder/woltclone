from django.urls import path
from . import management_views as views

urlpatterns = [
    # Jobs
    path('careers/jobs/', views.JobListView.as_view(), name='job_list'),
    path('careers/jobs/create/', views.JobCreateView.as_view(), name='job_create'),
    path('careers/jobs/<int:pk>/edit/', views.JobUpdateView.as_view(), name='job_edit'),
    path('careers/jobs/<int:pk>/delete/', views.JobDeleteView.as_view(), name='job_delete'),
    
    # Career Applications
    path('careers/applications/', views.CareerApplicationListView.as_view(), name='career_application_list'),
    path('careers/applications/<int:pk>/edit/', views.CareerApplicationUpdateView.as_view(), name='career_application_edit'),

    # Internships
    path('internships/', views.InternshipListView.as_view(), name='internship_list'),
    path('internships/create/', views.InternshipCreateView.as_view(), name='internship_create'),
    path('internships/<int:pk>/edit/', views.InternshipUpdateView.as_view(), name='internship_edit'),
    path('internships/<int:pk>/delete/', views.InternshipDeleteView.as_view(), name='internship_delete'),
    
    # Internship Applications
    path('internships/applications/', views.InternshipApplicationListView.as_view(), name='internship_application_list'),
    path('internships/applications/<int:pk>/edit/', views.InternshipApplicationUpdateView.as_view(), name='internship_application_edit'),
]
