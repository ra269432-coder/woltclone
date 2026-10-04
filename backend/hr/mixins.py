from django.contrib.auth.mixins import UserPassesTestMixin

class HRRequiredMixin(UserPassesTestMixin):
    """
    Mixin to require that a user is a superuser, or belongs to the 'HR' group.
    """
    def test_func(self):
        return self.request.user.is_authenticated and (
            self.request.user.is_superuser or 
            self.request.user.groups.filter(name='HR').exists()
        )
