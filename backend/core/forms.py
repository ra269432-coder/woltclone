from django import forms
from .models import Program, News, Story, Campaign, Media, Notice, Research, Partner

class TailwindModelForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field_name, field in self.fields.items():
            if isinstance(field.widget, forms.CheckboxInput):
                field.widget.attrs['class'] = 'h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
            elif isinstance(field.widget, forms.FileInput):
                field.widget.attrs['class'] = 'mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100'
            else:
                field.widget.attrs['class'] = 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                
class ProgramForm(TailwindModelForm):
    class Meta:
        model = Program
        fields = ['title', 'slug', 'subtitle', 'description', 'activities', 'image', 'status', 'featured']

class NewsForm(TailwindModelForm):
    class Meta:
        model = News
        fields = ['title', 'slug', 'category', 'short_description', 'content', 'image', 'author', 'published_date', 'published', 'featured']
        widgets = {
            'published_date': forms.DateInput(attrs={'type': 'date'}),
        }

class StoryForm(TailwindModelForm):
    class Meta:
        model = Story
        fields = ['title', 'slug', 'content', 'image', 'author', 'published_date', 'published']
        widgets = {
            'published_date': forms.DateInput(attrs={'type': 'date'}),
        }

class CampaignForm(TailwindModelForm):
    class Meta:
        model = Campaign
        fields = ['title', 'slug', 'description', 'image', 'target_amount', 'status', 'start_date', 'end_date', 'featured']
        widgets = {
            'start_date': forms.DateInput(attrs={'type': 'date'}),
            'end_date': forms.DateInput(attrs={'type': 'date'}),
        }

    def clean(self):
        cleaned_data = super().clean()
        start_date = cleaned_data.get('start_date')
        end_date = cleaned_data.get('end_date')

        if start_date and end_date and end_date < start_date:
            self.add_error('end_date', 'End date cannot be before start date.')
            
        return cleaned_data

class MediaForm(TailwindModelForm):
    class Meta:
        model = Media
        fields = ['title', 'description', 'file', 'category', 'published_date', 'status']
        widgets = {
            'published_date': forms.DateInput(attrs={'type': 'date'}),
        }

class NoticeForm(TailwindModelForm):
    class Meta:
        model = Notice
        fields = ['title', 'slug', 'content', 'published_date', 'attachment', 'reference_number', 'notice_type', 'published']
        widgets = {
            'published_date': forms.DateInput(attrs={'type': 'date'}),
        }

class ResearchForm(TailwindModelForm):
    class Meta:
        model = Research
        fields = ['title', 'description', 'published_date', 'document', 'category', 'published']
        widgets = {
            'published_date': forms.DateInput(attrs={'type': 'date'}),
        }

class PartnerForm(TailwindModelForm):
    class Meta:
        model = Partner
        fields = ['organization_name', 'logo', 'description', 'website', 'display_order', 'active']
