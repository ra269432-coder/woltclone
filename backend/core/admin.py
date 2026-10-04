from django.contrib import admin
from .models import Program, News, Story, Campaign, Media, Notice, Research, Partner

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'featured', 'created_at')
    list_filter = ('status', 'featured')
    search_fields = ('title', 'subtitle', 'description')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'published', 'featured', 'published_date')
    list_filter = ('published', 'featured', 'category')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Story)
class StoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published', 'published_date')
    list_filter = ('published',)
    search_fields = ('title', 'content', 'author')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ('title', 'status', 'target_amount', 'raised_amount', 'end_date', 'featured')
    list_filter = ('status', 'featured')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'status', 'published_date')
    list_filter = ('status', 'category')
    search_fields = ('title', 'description')

@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ('title', 'notice_type', 'reference_number', 'published', 'published_date')
    list_filter = ('published', 'notice_type')
    search_fields = ('title', 'content', 'reference_number')
    prepopulated_fields = {'slug': ('title',)}

@admin.register(Research)
class ResearchAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'published', 'published_date')
    list_filter = ('published', 'category')
    search_fields = ('title', 'description')

@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('organization_name', 'active', 'display_order')
    list_filter = ('active',)
    search_fields = ('organization_name', 'description')
    ordering = ('display_order',)
