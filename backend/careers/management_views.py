from django.views.generic import ListView, CreateView, UpdateView, DeleteView, DetailView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from core.mixins import AdminRequiredMixin, AdminOrHRRequiredMixin
from .models import Job, CareerApplication, Internship, InternshipApplication
from .forms import JobForm, CareerApplicationAdminForm, InternshipForm, InternshipApplicationAdminForm

class AdminOrHRCRUDMixin(LoginRequiredMixin, AdminOrHRRequiredMixin):
    template_name = 'core/form.html'
    
class AdminOrHRListMixin(LoginRequiredMixin, AdminOrHRRequiredMixin):
    template_name = 'core/generic_list.html'
    paginate_by = 20

class AdminOrHRDeleteMixin(LoginRequiredMixin, AdminOrHRRequiredMixin):
    template_name = 'components/confirm_delete.html'

# === JOBS ===
class JobListView(AdminOrHRListMixin, ListView):
    model = Job
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Manage Jobs"
        context['create_url'] = reverse_lazy('job_create')
        context['columns'] = ['Title', 'Department', 'Location', 'Status', 'Actions']
        
        # Prepare rows
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'edit_url': reverse_lazy('job_edit', kwargs={'pk': obj.pk}),
                'delete_url': reverse_lazy('job_delete', kwargs={'pk': obj.pk}),
                'columns': [
                    obj.title,
                    obj.department,
                    obj.location,
                    obj.get_status_display()
                ]
            })
        context['rows'] = rows
        return context

class JobCreateView(AdminOrHRCRUDMixin, CreateView):
    model = Job
    form_class = JobForm
    success_url = reverse_lazy('job_list')

class JobUpdateView(AdminOrHRCRUDMixin, UpdateView):
    model = Job
    form_class = JobForm
    success_url = reverse_lazy('job_list')

class JobDeleteView(AdminOrHRDeleteMixin, DeleteView):
    model = Job
    success_url = reverse_lazy('job_list')


# === INTERNSHIPS ===
class InternshipListView(AdminOrHRListMixin, ListView):
    model = Internship
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Manage Internships"
        context['create_url'] = reverse_lazy('internship_create')
        context['columns'] = ['Title', 'Department', 'Duration', 'Status', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'edit_url': reverse_lazy('internship_edit', kwargs={'pk': obj.pk}),
                'delete_url': reverse_lazy('internship_delete', kwargs={'pk': obj.pk}),
                'columns': [
                    obj.title,
                    obj.department,
                    obj.duration,
                    obj.get_status_display()
                ]
            })
        context['rows'] = rows
        return context

class InternshipCreateView(AdminOrHRCRUDMixin, CreateView):
    model = Internship
    form_class = InternshipForm
    success_url = reverse_lazy('internship_list')

class InternshipUpdateView(AdminOrHRCRUDMixin, UpdateView):
    model = Internship
    form_class = InternshipForm
    success_url = reverse_lazy('internship_list')

class InternshipDeleteView(AdminOrHRDeleteMixin, DeleteView):
    model = Internship
    success_url = reverse_lazy('internship_list')


# === CAREER APPLICATIONS ===
class CareerApplicationListView(AdminOrHRListMixin, ListView):
    model = CareerApplication
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Career Applications"
        context['columns'] = ['Applicant Name', 'Job', 'Email', 'Status', 'Applied On', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'edit_url': reverse_lazy('career_application_edit', kwargs={'pk': obj.pk}),
                'delete_url': None, # Do not allow direct deletion typically
                'columns': [
                    obj.applicant_name,
                    obj.job.title,
                    obj.email,
                    obj.get_status_display(),
                    obj.created_at.strftime("%b %d, %Y")
                ],
                'extra_actions': [
                    {'url': obj.cv.url if obj.cv else '#', 'label': 'View CV', 'target': '_blank'}
                ]
            })
        context['rows'] = rows
        return context

class CareerApplicationUpdateView(AdminOrHRCRUDMixin, UpdateView):
    model = CareerApplication
    form_class = CareerApplicationAdminForm
    success_url = reverse_lazy('career_application_list')
    template_name = 'core/form.html'


# === INTERNSHIP APPLICATIONS ===
class InternshipApplicationListView(AdminOrHRListMixin, ListView):
    model = InternshipApplication
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Internship Applications"
        context['columns'] = ['Applicant Name', 'Internship', 'Email', 'Status', 'Applied On', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'edit_url': reverse_lazy('internship_application_edit', kwargs={'pk': obj.pk}),
                'delete_url': None, 
                'columns': [
                    obj.applicant_name,
                    obj.internship.title,
                    obj.email,
                    obj.get_status_display(),
                    obj.created_at.strftime("%b %d, %Y")
                ],
                'extra_actions': [
                    {'url': obj.cv.url if obj.cv else '#', 'label': 'View CV', 'target': '_blank'}
                ]
            })
        context['rows'] = rows
        return context

class InternshipApplicationUpdateView(AdminOrHRCRUDMixin, UpdateView):
    model = InternshipApplication
    form_class = InternshipApplicationAdminForm
    success_url = reverse_lazy('internship_application_list')
