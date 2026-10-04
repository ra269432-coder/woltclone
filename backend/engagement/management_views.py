from django.views.generic import ListView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from core.mixins import AdminRequiredMixin
from .models import NewsletterSubscriber, ContactMessage, Donation, VolunteerApplication
from .forms import NewsletterSubscriberForm, ContactMessageForm, VolunteerApplicationForm, DonationForm

class AdminCRUDMixin(LoginRequiredMixin, AdminRequiredMixin):
    template_name = 'core/form.html'
    
class AdminListMixin(LoginRequiredMixin, AdminRequiredMixin):
    template_name = 'core/generic_list.html'
    paginate_by = 20

class AdminDeleteMixin(LoginRequiredMixin, AdminRequiredMixin):
    template_name = 'components/confirm_delete.html'

# === NEWSLETTER ===
class NewsletterListView(AdminListMixin, ListView):
    model = NewsletterSubscriber
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Newsletter Subscribers"
        context['columns'] = ['Email', 'Subscribed', 'Date', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'edit_url': reverse_lazy('newsletter_edit', kwargs={'pk': obj.pk}),
                'delete_url': reverse_lazy('newsletter_delete', kwargs={'pk': obj.pk}),
                'columns': [
                    obj.email,
                    "Yes" if obj.subscribed else "No",
                    obj.created_at.strftime("%b %d, %Y")
                ]
            })
        context['rows'] = rows
        return context

class NewsletterUpdateView(AdminCRUDMixin, UpdateView):
    model = NewsletterSubscriber
    form_class = NewsletterSubscriberForm
    success_url = reverse_lazy('newsletter_list')

class NewsletterDeleteView(AdminDeleteMixin, DeleteView):
    model = NewsletterSubscriber
    success_url = reverse_lazy('newsletter_list')


# === CONTACT MESSAGES ===
class ContactMessageListView(AdminListMixin, ListView):
    model = ContactMessage
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Contact Messages"
        context['columns'] = ['Name', 'Subject', 'Status', 'Date', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'edit_url': reverse_lazy('contact_edit', kwargs={'pk': obj.pk}),
                'delete_url': reverse_lazy('contact_delete', kwargs={'pk': obj.pk}),
                'columns': [
                    obj.name,
                    obj.subject,
                    obj.get_status_display(),
                    obj.created_at.strftime("%b %d, %Y")
                ]
            })
        context['rows'] = rows
        return context

class ContactMessageUpdateView(AdminCRUDMixin, UpdateView):
    model = ContactMessage
    form_class = ContactMessageForm
    success_url = reverse_lazy('contact_list')

class ContactMessageDeleteView(AdminDeleteMixin, DeleteView):
    model = ContactMessage
    success_url = reverse_lazy('contact_list')


# === VOLUNTEER APPLICATIONS ===
class VolunteerApplicationListView(AdminListMixin, ListView):
    model = VolunteerApplication
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Volunteer Applications"
        context['columns'] = ['Name', 'Email', 'Phone', 'Status', 'Date', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'edit_url': reverse_lazy('volunteer_edit', kwargs={'pk': obj.pk}),
                'delete_url': reverse_lazy('volunteer_delete', kwargs={'pk': obj.pk}),
                'columns': [
                    obj.name,
                    obj.email,
                    obj.phone,
                    obj.get_status_display(),
                    obj.applied_at.strftime("%b %d, %Y")
                ]
            })
        context['rows'] = rows
        return context

class VolunteerApplicationUpdateView(AdminCRUDMixin, UpdateView):
    model = VolunteerApplication
    form_class = VolunteerApplicationForm
    success_url = reverse_lazy('volunteer_list')

class VolunteerApplicationDeleteView(AdminDeleteMixin, DeleteView):
    model = VolunteerApplication
    success_url = reverse_lazy('volunteer_list')


# === DONATIONS ===
class DonationListView(AdminListMixin, ListView):
    model = Donation
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['page_title'] = "Donations"
        context['columns'] = ['Donor', 'Amount', 'Status', 'Date', 'Actions']
        
        rows = []
        for obj in context['object_list']:
            rows.append({
                'item': obj,
                'edit_url': reverse_lazy('donation_edit', kwargs={'pk': obj.pk}),
                'delete_url': reverse_lazy('donation_delete', kwargs={'pk': obj.pk}),
                'columns': [
                    obj.donor_name or 'Anonymous',
                    f"{obj.amount} {obj.currency}",
                    obj.get_payment_status_display(),
                    obj.created_at.strftime("%b %d, %Y")
                ]
            })
        context['rows'] = rows
        return context

class DonationUpdateView(AdminCRUDMixin, UpdateView):
    model = Donation
    form_class = DonationForm
    success_url = reverse_lazy('donation_list')

class DonationDeleteView(AdminDeleteMixin, DeleteView):
    model = Donation
    success_url = reverse_lazy('donation_list')
