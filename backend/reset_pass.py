import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model

User = get_user_model()
users = User.objects.filter(username__icontains='tanjil') | User.objects.filter(first_name__icontains='tanjil') | User.objects.filter(email__icontains='tanjil')

if users.exists():
    for u in users:
        u.set_password('password123')
        u.save()
        print(f"Password reset for user: {u.username}")
else:
    print("No user found with the name 'tanjil'.")
