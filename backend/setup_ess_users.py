import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from hr.models import Employee

User = get_user_model()

for emp in Employee.objects.filter(user__isnull=True):
    # Try to find existing user by email
    user = User.objects.filter(email=emp.email).first()
    if not user:
        # Create a new user
        username = emp.email.split('@')[0]
        # Ensure username is unique
        base_username = username
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1
            
        user = User.objects.create_user(
            username=username,
            email=emp.email,
            password='Password123!',
            first_name=emp.name.split()[0],
            last_name=' '.join(emp.name.split()[1:]) if len(emp.name.split()) > 1 else ''
        )
    
    emp.user = user
    emp.save()
    print(f"Linked {emp.name} to user {user.username}")
print("Done.")
