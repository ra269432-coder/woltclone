from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.contrib import messages
from django.conf import settings
from .models import OTPCode
import random

User = get_user_model()

def request_otp_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        try:
            user = User.objects.get(email=email)
            # Generate 6-digit code
            code = f"{random.randint(100000, 999999)}"
            # Save it
            OTPCode.objects.filter(user=user).delete()
            OTPCode.objects.create(user=user, code=code)
            
            # Send Email
            send_mail(
                'Password Reset Code',
                f'Your password reset code is {code}. It is valid for 10 minutes.',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            
            request.session['reset_email'] = email
            return redirect('password_reset_verify')
            
        except User.DoesNotExist:
            # Don't reveal if user exists or not, but go to verify page anyway
            request.session['reset_email'] = email
            return redirect('password_reset_verify')
            
    return render(request, 'registration/password_reset_form_otp.html')

def verify_otp_view(request):
    email = request.session.get('reset_email')
    if not email:
        return redirect('password_reset')
        
    if request.method == 'POST':
        code = request.POST.get('code')
        try:
            user = User.objects.get(email=email)
            otp = OTPCode.objects.filter(user=user, code=code).last()
            if otp and otp.is_valid():
                request.session['reset_verified'] = True
                return redirect('password_reset_set')
            else:
                messages.error(request, 'Invalid or expired code.')
        except User.DoesNotExist:
            messages.error(request, 'Invalid or expired code.')
            
    return render(request, 'registration/password_reset_verify_otp.html', {'email': email})

def set_new_password_view(request):
    if not request.session.get('reset_verified'):
        return redirect('password_reset')
        
    email = request.session.get('reset_email')
    
    if request.method == 'POST':
        pass1 = request.POST.get('new_password1')
        pass2 = request.POST.get('new_password2')
        
        if pass1 and pass2 and pass1 == pass2:
            try:
                user = User.objects.get(email=email)
                user.set_password(pass1)
                user.save()
                
                # Clean up session
                del request.session['reset_email']
                del request.session['reset_verified']
                
                # Delete old OTPs
                OTPCode.objects.filter(user=user).delete()
                
                return redirect('password_reset_complete')
            except User.DoesNotExist:
                pass
        else:
            messages.error(request, 'Passwords do not match.')
            
    return render(request, 'registration/password_reset_confirm_otp.html')
