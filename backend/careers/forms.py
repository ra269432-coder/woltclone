from django import forms
from .models import Job, CareerApplication, Internship, InternshipApplication
from core.forms import TailwindModelForm

class JobForm(TailwindModelForm):
    class Meta:
        model = Job
        fields = ['title', 'slug', 'department', 'location', 'employment_type', 'description', 'responsibilities', 'requirements', 'deadline', 'status']
        widgets = {
            'deadline': forms.DateInput(attrs={'type': 'date'}),
        }

class CareerApplicationAdminForm(TailwindModelForm):
    class Meta:
        model = CareerApplication
        fields = ['applicant_name', 'email', 'phone', 'education', 'cover_letter', 'cv', 'status', 'admin_notes']
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in ['applicant_name', 'email', 'phone', 'education', 'cover_letter', 'cv']:
            if field in self.fields:
                self.fields[field].disabled = True

class InternshipForm(TailwindModelForm):
    class Meta:
        model = Internship
        fields = ['title', 'slug', 'department', 'description', 'requirements', 'duration', 'location', 'allowance', 'deadline', 'status']
        widgets = {
            'deadline': forms.DateInput(attrs={'type': 'date'}),
        }

class InternshipApplicationAdminForm(TailwindModelForm):
    class Meta:
        model = InternshipApplication
        fields = ['applicant_name', 'email', 'phone', 'education', 'cover_letter', 'cv', 'status', 'admin_notes']
        
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in ['applicant_name', 'email', 'phone', 'education', 'cover_letter', 'cv']:
            if field in self.fields:
                self.fields[field].disabled = True
