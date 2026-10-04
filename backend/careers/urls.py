from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, CareerApplicationViewSet, InternshipViewSet, InternshipApplicationViewSet

router = DefaultRouter()
router.register(r'jobs', JobViewSet)
router.register(r'internships', InternshipViewSet)
router.register(r'applications/jobs', CareerApplicationViewSet, basename='career-applications')
router.register(r'applications/internships', InternshipApplicationViewSet, basename='internship-applications')

urlpatterns = [
    path('', include(router.urls)),
]
