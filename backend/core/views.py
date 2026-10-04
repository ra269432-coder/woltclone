from django.views.generic import TemplateView, ListView, CreateView, UpdateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.contrib import messages
from django.db.models import Sum
from .mixins import AdminRequiredMixin
from .models import Program, News, Story, Campaign, Media, Notice, Research, Partner
from careers.models import Job, Internship, CareerApplication, InternshipApplication
from engagement.models import NewsletterSubscriber, VolunteerApplication, Donation
from .forms import (
    ProgramForm, NewsForm, StoryForm, CampaignForm, 
    MediaForm, NoticeForm, ResearchForm, PartnerForm
)
from django.shortcuts import redirect

def root_redirect_view(request):
    if request.user.is_authenticated:
        if request.user.is_superuser or request.user.groups.filter(name='Admin').exists():
            return redirect('admin_dashboard')
        elif request.user.groups.filter(name='HR').exists():
            return redirect('hr_dashboard')
        elif hasattr(request.user, 'employee_profile'):
            return redirect('ess_dashboard')
    return redirect('login')


class AdminDashboardView(LoginRequiredMixin, AdminRequiredMixin, TemplateView):
    template_name = 'admin_dashboard/dashboard.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['program_count'] = Program.objects.count()
        context['news_count'] = News.objects.filter(published=True).count()
        context['story_count'] = Story.objects.filter(published=True).count()
        context['campaign_count'] = Campaign.objects.filter(status='active').count()
        context['media_count'] = Media.objects.count()
        context['notice_count'] = Notice.objects.filter(published=True).count()
        context['research_count'] = Research.objects.filter(published=True).count()
        context['partner_count'] = Partner.objects.filter(active=True).count()
        context['job_count'] = Job.objects.filter(status='active').count()
        context['internship_count'] = Internship.objects.filter(status='active').count()
        context['career_app_count'] = CareerApplication.objects.count()
        context['intern_app_count'] = InternshipApplication.objects.count()
        
        context['newsletter_count'] = NewsletterSubscriber.objects.filter(subscribed=True).count()
        context['volunteer_app_count'] = VolunteerApplication.objects.filter(status='pending').count()
        donations = Donation.objects.filter(payment_status='successful').aggregate(Sum('amount'))
        context['donation_total'] = donations['amount__sum'] or 0
        
        return context

# --- Base Generic Mixin for Admin CRUD ---
class AdminCRUDMixin(LoginRequiredMixin, AdminRequiredMixin):
    # This mixin assumes template names like core/program_list.html
    # We will define template names explicitly or rely on django defaults.
    
    def form_valid(self, form):
        messages.success(self.request, f"{self.model._meta.verbose_name.title()} successfully saved.")
        return super().form_valid(form)

class AdminDeleteMixin(LoginRequiredMixin, AdminRequiredMixin):
    template_name = 'components/confirm_delete.html'
    
    def delete(self, request, *args, **kwargs):
        messages.success(self.request, f"{self.model._meta.verbose_name.title()} successfully deleted.")
        return super().delete(request, *args, **kwargs)

# --- Program Views ---
class ProgramListView(AdminCRUDMixin, ListView):
    model = Program
    template_name = 'core/generic_list.html'
    context_object_name = 'programs'

class ProgramCreateView(AdminCRUDMixin, CreateView):
    model = Program
    form_class = ProgramForm
    template_name = 'core/form.html'
    success_url = reverse_lazy('program_list')

class ProgramUpdateView(AdminCRUDMixin, UpdateView):
    model = Program
    form_class = ProgramForm
    template_name = 'core/form.html'
    success_url = reverse_lazy('program_list')

class ProgramDeleteView(AdminDeleteMixin, DeleteView):
    model = Program
    success_url = reverse_lazy('program_list')

# --- News Views ---
class NewsListView(AdminCRUDMixin, ListView):
    model = News
    template_name = 'core/generic_list.html'
    context_object_name = 'news_items'

class NewsCreateView(AdminCRUDMixin, CreateView):
    model = News
    form_class = NewsForm
    template_name = 'core/form.html'
    success_url = reverse_lazy('news_list')

class NewsUpdateView(AdminCRUDMixin, UpdateView):
    model = News
    form_class = NewsForm
    template_name = 'core/form.html'
    success_url = reverse_lazy('news_list')

class NewsDeleteView(AdminDeleteMixin, DeleteView):
    model = News
    success_url = reverse_lazy('news_list')

# --- Story Views ---
class StoryListView(AdminCRUDMixin, ListView):
    model = Story
    template_name = 'core/generic_list.html'
    context_object_name = 'stories'

class StoryCreateView(AdminCRUDMixin, CreateView):
    model = Story
    form_class = StoryForm
    template_name = 'core/form.html'
    success_url = reverse_lazy('story_list')

class StoryUpdateView(AdminCRUDMixin, UpdateView):
    model = Story
    form_class = StoryForm
    template_name = 'core/form.html'
    success_url = reverse_lazy('story_list')

class StoryDeleteView(AdminDeleteMixin, DeleteView):
    model = Story
    success_url = reverse_lazy('story_list')

# --- Campaign Views ---
class CampaignListView(AdminCRUDMixin, ListView):
    model = Campaign
    template_name = 'core/generic_list.html'
    context_object_name = 'campaigns'

class CampaignCreateView(AdminCRUDMixin, CreateView):
    model = Campaign
    form_class = CampaignForm
    template_name = 'core/form.html'
    success_url = reverse_lazy('campaign_list')

class CampaignUpdateView(AdminCRUDMixin, UpdateView):
    model = Campaign
    form_class = CampaignForm
    template_name = 'core/form.html'
    success_url = reverse_lazy('campaign_list')

class CampaignDeleteView(AdminDeleteMixin, DeleteView):
    model = Campaign
    success_url = reverse_lazy('campaign_list')

# --- Media Views ---
class MediaListView(AdminCRUDMixin, ListView):
    model = Media
    template_name = 'core/generic_list.html'
    context_object_name = 'media_items'

class MediaCreateView(AdminCRUDMixin, CreateView):
    model = Media
    form_class = MediaForm
    template_name = 'core/form.html'
    success_url = reverse_lazy('media_list')

class MediaUpdateView(AdminCRUDMixin, UpdateView):
    model = Media
    form_class = MediaForm
    template_name = 'core/form.html'
    success_url = reverse_lazy('media_list')

class MediaDeleteView(AdminDeleteMixin, DeleteView):
    model = Media
    success_url = reverse_lazy('media_list')

# --- Notice Views ---
class NoticeListView(AdminCRUDMixin, ListView):
    model = Notice
    template_name = 'core/generic_list.html'
    context_object_name = 'notices'

class NoticeCreateView(AdminCRUDMixin, CreateView):
    model = Notice
    form_class = NoticeForm
    template_name = 'core/form.html'
    success_url = reverse_lazy('notice_list')

class NoticeUpdateView(AdminCRUDMixin, UpdateView):
    model = Notice
    form_class = NoticeForm
    template_name = 'core/form.html'
    success_url = reverse_lazy('notice_list')

class NoticeDeleteView(AdminDeleteMixin, DeleteView):
    model = Notice
    success_url = reverse_lazy('notice_list')

# --- Research Views ---
class ResearchListView(AdminCRUDMixin, ListView):
    model = Research
    template_name = 'core/generic_list.html'
    context_object_name = 'research_items'

class ResearchCreateView(AdminCRUDMixin, CreateView):
    model = Research
    form_class = ResearchForm
    template_name = 'core/form.html'
    success_url = reverse_lazy('research_list')

class ResearchUpdateView(AdminCRUDMixin, UpdateView):
    model = Research
    form_class = ResearchForm
    template_name = 'core/form.html'
    success_url = reverse_lazy('research_list')

class ResearchDeleteView(AdminDeleteMixin, DeleteView):
    model = Research
    success_url = reverse_lazy('research_list')

# --- Partner Views ---
class PartnerListView(AdminCRUDMixin, ListView):
    model = Partner
    template_name = 'core/generic_list.html'
    context_object_name = 'partners'

class PartnerCreateView(AdminCRUDMixin, CreateView):
    model = Partner
    form_class = PartnerForm
    template_name = 'core/form.html'
    success_url = reverse_lazy('partner_list')

class PartnerUpdateView(AdminCRUDMixin, UpdateView):
    model = Partner
    form_class = PartnerForm
    template_name = 'core/form.html'
    success_url = reverse_lazy('partner_list')

class PartnerDeleteView(AdminDeleteMixin, DeleteView):
    model = Partner
    success_url = reverse_lazy('partner_list')
