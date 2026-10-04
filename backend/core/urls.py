from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import (
    ProgramViewSet, NewsViewSet, StoryViewSet,
    CampaignViewSet, MediaViewSet, NoticeViewSet,
    ResearchViewSet, PartnerViewSet, EmployeeViewSet
)

router = DefaultRouter()
router.register(r'programs', ProgramViewSet)
router.register(r'news', NewsViewSet)
router.register(r'stories', StoryViewSet)
router.register(r'campaigns', CampaignViewSet)
router.register(r'media', MediaViewSet)
router.register(r'notices', NoticeViewSet)
router.register(r'research', ResearchViewSet)
router.register(r'partners', PartnerViewSet)
router.register(r'employees', EmployeeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
