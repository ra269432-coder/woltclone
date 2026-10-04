from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
from django.views.generic import RedirectView
from core import views as core_views
from hr import views as hr_views
from accounts import auth_views as accounts_auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/', include('core.urls')),
    path('api/', include('careers.urls')),
    path('api/', include('engagement.urls')),
    
    # Auth Views for internal dashboard
    path('accounts/login/', auth_views.LoginView.as_view(), name='login'),
    path('accounts/logout/', auth_views.LogoutView.as_view(), name='logout'),
    
    # Custom OTP Password Reset
    path('accounts/password_reset/', accounts_auth_views.request_otp_view, name='password_reset'),
    path('accounts/password_reset/verify/', accounts_auth_views.verify_otp_view, name='password_reset_verify'),
    path('accounts/password_reset/set/', accounts_auth_views.set_new_password_view, name='password_reset_set'),
    path('accounts/password_reset/done/', auth_views.PasswordResetCompleteView.as_view(template_name='registration/password_reset_complete.html'), name='password_reset_complete'),
    
    # Internal Dashboard Routes
    path('management/admin/', core_views.AdminDashboardView.as_view(), name='admin_dashboard'),
    path('management/hr/', hr_views.HRDashboardView.as_view(), name='hr_dashboard'),
    # ESS Portal
    path('ess/', include('hr.ess_urls')),
    
    path('management/', include('core.management_urls')),
    path('management/', include('careers.management_urls')),
    path('management/hr/', include('hr.management_urls')),
    path('management/', include('engagement.management_urls')),
    
    # Default management route
    path('management/', core_views.root_redirect_view, name='management_redirect'),
    
    # Default root route redirecting to dashboard
    path('', core_views.root_redirect_view, name='root_redirect'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
