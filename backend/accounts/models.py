from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # AbstractUser provides username, password, email, first_name, last_name, is_staff, is_superuser, is_active, etc.
    # Normal users will have is_staff=False, is_superuser=False.
    # Admins will have is_staff=True, is_superuser=False, and belong to the 'Admin' group.
    # HR will have is_staff=True, is_superuser=False, and belong to the 'HR' group.
    # Superusers will have is_staff=True, is_superuser=True.
    
    phone_number = models.CharField(max_length=20, blank=True)
    
    def __str__(self):
        return self.username

class OTPCode(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_valid(self):
        from django.utils import timezone
        from datetime import timedelta
        return self.created_at >= timezone.now() - timedelta(minutes=10)
