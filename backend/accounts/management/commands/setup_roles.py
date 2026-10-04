from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

class Command(BaseCommand):
    help = 'Creates the Admin and HR groups and assigns base permissions'

    def handle(self, *args, **options):
        # Create Groups
        admin_group, created_admin = Group.objects.get_or_create(name='Admin')
        hr_group, created_hr = Group.objects.get_or_create(name='HR')

        if created_admin:
            self.stdout.write(self.style.SUCCESS('Successfully created Admin group'))
        else:
            self.stdout.write(self.style.WARNING('Admin group already exists'))

        if created_hr:
            self.stdout.write(self.style.SUCCESS('Successfully created HR group'))
        else:
            self.stdout.write(self.style.WARNING('HR group already exists'))

        # Here we will later add specific permissions to the groups once the models are created.
        # For Phase 1, we just ensure the groups exist.
        
        self.stdout.write(self.style.SUCCESS('Role setup complete.'))
