from rest_framework import viewsets, permissions
from .models import Job, CareerApplication, Internship, InternshipApplication
from .serializers import JobSerializer, CareerApplicationSerializer, InternshipSerializer, InternshipApplicationSerializer

def is_admin_or_hr(user):
    return user.is_authenticated and (
        user.is_superuser or 
        user.groups.filter(name__in=['Admin', 'HR']).exists()
    )

class ReadOnlyOrAdminHRPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return is_admin_or_hr(request.user)

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [ReadOnlyOrAdminHRPermission]
    lookup_field = 'slug'

    def get_queryset(self):
        if not is_admin_or_hr(self.request.user):
            return Job.objects.filter(status='active')
        return super().get_queryset()

class InternshipViewSet(viewsets.ModelViewSet):
    queryset = Internship.objects.all()
    serializer_class = InternshipSerializer
    permission_classes = [ReadOnlyOrAdminHRPermission]
    lookup_field = 'slug'

    def get_queryset(self):
        if not is_admin_or_hr(self.request.user):
            return Internship.objects.filter(status='active')
        return super().get_queryset()

class ApplicationPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if is_admin_or_hr(request.user):
            return True
        return obj.user == request.user

class CareerApplicationViewSet(viewsets.ModelViewSet):
    queryset = CareerApplication.objects.all()
    serializer_class = CareerApplicationSerializer
    permission_classes = [ApplicationPermission]

    def get_queryset(self):
        if is_admin_or_hr(self.request.user):
            return super().get_queryset()
        elif self.request.user.is_authenticated:
            return CareerApplication.objects.filter(user=self.request.user)
        return CareerApplication.objects.none()

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save()

class InternshipApplicationViewSet(viewsets.ModelViewSet):
    queryset = InternshipApplication.objects.all()
    serializer_class = InternshipApplicationSerializer
    permission_classes = [ApplicationPermission]

    def get_queryset(self):
        if is_admin_or_hr(self.request.user):
            return super().get_queryset()
        elif self.request.user.is_authenticated:
            return InternshipApplication.objects.filter(user=self.request.user)
        return InternshipApplication.objects.none()

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            serializer.save()
