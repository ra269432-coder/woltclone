from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Program, News, Story, Campaign, Media, Notice, Research, Partner
from hr.models import Employee
from .serializers import (
    ProgramSerializer, NewsSerializer, StorySerializer, 
    CampaignSerializer, MediaSerializer, NoticeSerializer, 
    ResearchSerializer, PartnerSerializer, EmployeeSerializer
)

class ProgramViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ProgramSerializer
    permission_classes = [AllowAny]
    queryset = Program.objects.filter(status='active')
    lookup_field = 'slug'

class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]
    queryset = News.objects.filter(published=True)
    lookup_field = 'slug'

class StoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = StorySerializer
    permission_classes = [AllowAny]
    queryset = Story.objects.filter(published=True)
    lookup_field = 'slug'

class CampaignViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CampaignSerializer
    permission_classes = [AllowAny]
    queryset = Campaign.objects.filter(status__in=['active', 'urgent'])

class MediaViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = MediaSerializer
    permission_classes = [AllowAny]
    queryset = Media.objects.filter(status='published')

class NoticeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NoticeSerializer
    permission_classes = [AllowAny]
    queryset = Notice.objects.filter(published=True)

class ResearchViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ResearchSerializer
    permission_classes = [AllowAny]
    queryset = Research.objects.filter(published=True)

class PartnerViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PartnerSerializer
    permission_classes = [AllowAny]
    queryset = Partner.objects.filter(active=True)

class EmployeeViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = EmployeeSerializer
    permission_classes = [AllowAny]
    queryset = Employee.objects.filter(employment_status='active')
