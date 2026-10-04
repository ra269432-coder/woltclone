from django.contrib import admin
from .models import Job, CareerApplication, Internship, InternshipApplication

admin.site.register(Job)
admin.site.register(CareerApplication)
admin.site.register(Internship)
admin.site.register(InternshipApplication)
