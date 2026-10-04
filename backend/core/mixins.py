from django.contrib.auth.mixins import UserPassesTestMixin

class AdminRequiredMixin(UserPassesTestMixin):
    """
    Mixin to require that a user is either a superuser or belongs to the 'Admin' group.
    """
    def test_func(self):
        return self.request.user.is_authenticated and (
            self.request.user.is_superuser or 
            self.request.user.groups.filter(name='Admin').exists()
        )

class AdminOrHRRequiredMixin(UserPassesTestMixin):
    """
    Mixin to require that a user is a superuser, or belongs to the 'Admin' or 'HR' group.
    """
    def test_func(self):
        return self.request.user.is_authenticated and (
            self.request.user.is_superuser or 
            self.request.user.groups.filter(name__in=['Admin', 'HR']).exists()
        )
