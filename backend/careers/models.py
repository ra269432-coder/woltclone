from django.db import models
from django.conf import settings
from core.validators import validate_pdf_extension, validate_file_size

class Job(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    department = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    employment_type = models.CharField(max_length=100)
    description = models.TextField()
    responsibilities = models.TextField(blank=True)
    requirements = models.TextField(blank=True)
    deadline = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=50, choices=(('active', 'Active'), ('closed', 'Closed')), default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class CareerApplication(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    applicant_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    education = models.TextField(blank=True)
    cover_letter = models.TextField(blank=True)
    cv = models.FileField(upload_to='cvs/careers/', validators=[validate_pdf_extension, validate_file_size])
    status = models.CharField(max_length=50, choices=(
        ('submitted', 'Submitted'),
        ('under_review', 'Under Review'),
        ('shortlisted', 'Shortlisted'),
        ('interview', 'Interview'),
        ('selected', 'Selected'),
        ('rejected', 'Rejected')
    ), default='submitted')
    admin_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.applicant_name} - {self.job.title}"

class Internship(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    department = models.CharField(max_length=255)
    description = models.TextField()
    requirements = models.TextField(blank=True)
    duration = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=255)
    allowance = models.CharField(max_length=255, blank=True)
    deadline = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=50, choices=(('active', 'Active'), ('closed', 'Closed')), default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class InternshipApplication(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    applicant_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    internship = models.ForeignKey(Internship, on_delete=models.CASCADE, related_name='applications')
    education = models.TextField(blank=True)
    cover_letter = models.TextField(blank=True)
    cv = models.FileField(upload_to='cvs/internships/', validators=[validate_pdf_extension, validate_file_size])
    status = models.CharField(max_length=50, choices=(
        ('submitted', 'Submitted'),
        ('under_review', 'Under Review'),
        ('shortlisted', 'Shortlisted'),
        ('interview', 'Interview'),
        ('selected', 'Selected'),
        ('rejected', 'Rejected')
    ), default='submitted')
    admin_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.applicant_name} - {self.internship.title}"
