from django.urls import path
from .views import (
    ProgramListView, ProgramCreateView, ProgramUpdateView, ProgramDeleteView,
    NewsListView, NewsCreateView, NewsUpdateView, NewsDeleteView,
    StoryListView, StoryCreateView, StoryUpdateView, StoryDeleteView,
    CampaignListView, CampaignCreateView, CampaignUpdateView, CampaignDeleteView,
    MediaListView, MediaCreateView, MediaUpdateView, MediaDeleteView,
    NoticeListView, NoticeCreateView, NoticeUpdateView, NoticeDeleteView,
    ResearchListView, ResearchCreateView, ResearchUpdateView, ResearchDeleteView,
    PartnerListView, PartnerCreateView, PartnerUpdateView, PartnerDeleteView
)

urlpatterns = [
    # Programs
    path('programs/', ProgramListView.as_view(), name='program_list'),
    path('programs/create/', ProgramCreateView.as_view(), name='program_create'),
    path('programs/<int:pk>/edit/', ProgramUpdateView.as_view(), name='program_update'),
    path('programs/<int:pk>/delete/', ProgramDeleteView.as_view(), name='program_delete'),

    # News
    path('news/', NewsListView.as_view(), name='news_list'),
    path('news/create/', NewsCreateView.as_view(), name='news_create'),
    path('news/<int:pk>/edit/', NewsUpdateView.as_view(), name='news_update'),
    path('news/<int:pk>/delete/', NewsDeleteView.as_view(), name='news_delete'),

    # Stories
    path('stories/', StoryListView.as_view(), name='story_list'),
    path('stories/create/', StoryCreateView.as_view(), name='story_create'),
    path('stories/<int:pk>/edit/', StoryUpdateView.as_view(), name='story_update'),
    path('stories/<int:pk>/delete/', StoryDeleteView.as_view(), name='story_delete'),

    # Campaigns
    path('campaigns/', CampaignListView.as_view(), name='campaign_list'),
    path('campaigns/create/', CampaignCreateView.as_view(), name='campaign_create'),
    path('campaigns/<int:pk>/edit/', CampaignUpdateView.as_view(), name='campaign_update'),
    path('campaigns/<int:pk>/delete/', CampaignDeleteView.as_view(), name='campaign_delete'),

    # Media
    path('media/', MediaListView.as_view(), name='media_list'),
    path('media/create/', MediaCreateView.as_view(), name='media_create'),
    path('media/<int:pk>/edit/', MediaUpdateView.as_view(), name='media_update'),
    path('media/<int:pk>/delete/', MediaDeleteView.as_view(), name='media_delete'),

    # Notices
    path('notices/', NoticeListView.as_view(), name='notice_list'),
    path('notices/create/', NoticeCreateView.as_view(), name='notice_create'),
    path('notices/<int:pk>/edit/', NoticeUpdateView.as_view(), name='notice_update'),
    path('notices/<int:pk>/delete/', NoticeDeleteView.as_view(), name='notice_delete'),

    # Research
    path('research/', ResearchListView.as_view(), name='research_list'),
    path('research/create/', ResearchCreateView.as_view(), name='research_create'),
    path('research/<int:pk>/edit/', ResearchUpdateView.as_view(), name='research_update'),
    path('research/<int:pk>/delete/', ResearchDeleteView.as_view(), name='research_delete'),

    # Partners
    path('partners/', PartnerListView.as_view(), name='partner_list'),
    path('partners/create/', PartnerCreateView.as_view(), name='partner_create'),
    path('partners/<int:pk>/edit/', PartnerUpdateView.as_view(), name='partner_update'),
    path('partners/<int:pk>/delete/', PartnerDeleteView.as_view(), name='partner_delete'),
]
