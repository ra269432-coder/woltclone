from django.db import models
from .validators import (
    validate_file_size,
    validate_research_file_size,
    validate_image_extension,
    validate_pdf_extension,
    validate_no_executable
)

class Program(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    challenge_text = models.TextField(blank=True, help_text="Text for 'The Challenge' section")
    approach_text = models.TextField(blank=True, help_text="Text for 'Our Approach' section")
    quote_text = models.TextField(blank=True, help_text="Inspirational quote text")
    quote_author = models.CharField(max_length=255, blank=True, help_text="Author of the quote")
    stats = models.JSONField(default=list, blank=True, help_text="List of stats e.g. [{'value': '1.2M', 'label': 'Trees'}]")
    interventions = models.JSONField(default=list, blank=True, help_text="List of interventions e.g. [{'title': '...', 'description': '...'}]")
    activities = models.TextField(blank=True, help_text="Detailed activities")
    image = models.ImageField(upload_to='programs/', validators=[validate_image_extension, validate_file_size])
    status = models.CharField(max_length=50, choices=[('active', 'Active'), ('completed', 'Completed')], default='active')
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class News(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    category = models.CharField(max_length=100)
    short_description = models.TextField(blank=True)
    content = models.TextField()
    image = models.ImageField(upload_to='news/', validators=[validate_image_extension, validate_file_size], blank=True, null=True)
    author = models.CharField(max_length=100, blank=True)
    published_date = models.DateField(blank=True, null=True)
    published = models.BooleanField(default=False)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
        
    class Meta:
        verbose_name_plural = "News"

class Story(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to='stories/', validators=[validate_image_extension, validate_file_size], blank=True, null=True)
    author = models.CharField(max_length=100, blank=True)
    published_date = models.DateField(blank=True, null=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
        
    class Meta:
        verbose_name_plural = "Stories"

class Campaign(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='campaigns/', validators=[validate_image_extension, validate_file_size], blank=True, null=True)
    target_amount = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    raised_amount = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    donors_count = models.IntegerField(default=0)
    status = models.CharField(max_length=50, choices=[('urgent', 'Urgent'), ('active', 'Active'), ('completed', 'Completed')], default='active')
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Media(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='media/', validators=[validate_no_executable, validate_file_size])
    category = models.CharField(max_length=100, blank=True)
    published_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=50, choices=[('published', 'Published'), ('draft', 'Draft')], default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
        
    class Meta:
        verbose_name_plural = "Media"

class Notice(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    content = models.TextField(blank=True)
    published_date = models.DateField(blank=True, null=True)
    attachment = models.FileField(upload_to='notices/', validators=[validate_pdf_extension, validate_file_size], blank=True, null=True)
    reference_number = models.CharField(max_length=100, blank=True)
    notice_type = models.CharField(max_length=100, blank=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Research(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    published_date = models.DateField(blank=True, null=True)
    document = models.FileField(upload_to='research/', validators=[validate_pdf_extension, validate_research_file_size])
    category = models.CharField(max_length=100, blank=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
        
    class Meta:
        verbose_name_plural = "Research"

class Partner(models.Model):
    organization_name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='partners/', validators=[validate_image_extension, validate_file_size])
    description = models.TextField(blank=True)
    website = models.URLField(max_length=500, blank=True)
    display_order = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.organization_name
    
    class Meta:
        ordering = ['display_order']


