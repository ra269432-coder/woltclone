import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

User = get_user_model()

def create_users():
    # Ensure groups exist
    hr_group, _ = Group.objects.get_or_create(name='HR')
    admin_group, _ = Group.objects.get_or_create(name='Admin')

    # Create HR user
    hr_user, hr_created = User.objects.get_or_create(username='hr_admin', defaults={
        'email': 'hr@wayoflight.org',
        'is_staff': True,
        'is_superuser': False,
    })
    hr_user.set_password('hrpassword123')
    hr_user.save()
    hr_user.groups.add(hr_group)
    print("Created HR User: username='hr_admin', password='hrpassword123'")

    # Create Admin user
    admin_user, admin_created = User.objects.get_or_create(username='content_admin', defaults={
        'email': 'admin@wayoflight.org',
        'is_staff': True,
        'is_superuser': False,
    })
    admin_user.set_password('adminpassword123')
    admin_user.save()
    admin_user.groups.add(admin_group)
    print("Created Admin User: username='content_admin', password='adminpassword123'")

if __name__ == '__main__':
    create_users()
