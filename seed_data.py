import os
import django
import sys
from datetime import date

# Setup django
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import Program, News, Media, Partner

def seed():
    # 1. Seed Programs (from ProgramsPreview.tsx)
    programs_data = [
        {
            "title": "Humanitarian Response & Disaster Relief",
            "slug": "humanitarian-response-disaster-relief",
            "subtitle": "Emergency response and relief.",
            "description": "Providing immediate assistance, food, and shelter to communities affected by natural disasters and crises.",
            "activities": "Food distribution\nEmergency shelter\nMedical aid",
            "status": "active",
        },
        {
            "title": "Expanding Health Coverage",
            "slug": "expanding-health-coverage",
            "subtitle": "Access to quality healthcare.",
            "description": "Ensuring underserved communities have access to essential health services and medical professionals.",
            "activities": "Mobile clinics\nHealth camps\nMaternal care",
            "status": "active",
        },
        {
            "title": "Climate Change & Environment",
            "slug": "climate-change-environment",
            "subtitle": "Protecting our planet.",
            "description": "Implementing sustainable practices and educating communities on climate resilience and environmental protection.",
            "activities": "Tree planting\nClean energy\nAwareness campaigns",
            "status": "active",
        },
        {
            "title": "Mental Health & Wellbeing",
            "slug": "mental-health-wellbeing",
            "subtitle": "Support for mental wellness.",
            "description": "Breaking stigmas and providing counseling and support systems for mental health in vulnerable populations.",
            "activities": "Counseling sessions\nAwareness workshops\nSupport groups",
            "status": "active",
        },
        {
            "title": "Disability Inclusion",
            "slug": "disability-inclusion",
            "subtitle": "Empowering the disabled.",
            "description": "Creating accessible environments and providing resources for individuals with disabilities to thrive.",
            "activities": "Mobility aids\nInclusive education\nVocational training",
            "status": "active",
        },
        {
            "title": "Social Enterprise & Education",
            "slug": "social-enterprise-education",
            "subtitle": "Empowering through education.",
            "description": "Fostering entrepreneurial skills and providing educational opportunities to break the cycle of poverty.",
            "activities": "Microfinance\nSkill training\nScholarships",
            "status": "active",
        }
    ]
    
    for p_data in programs_data:
        Program.objects.get_or_create(slug=p_data['slug'], defaults=p_data)

    # 2. Seed News (from MediaNews.tsx)
    news_data = [
        {
            "title": "WOLT Foundation Launches 40+ Mobile Healthcare Units Across Sunamganj & Sylhet",
            "slug": "wolt-mobile-healthcare",
            "category": "Emergency Healthcare",
            "short_description": "In direct response to severe floodings, emergency rescue boats and fully stocked mobile clinics have provided immediate care...",
            "content": "In direct response to severe floodings, emergency rescue boats and fully stocked mobile clinics have provided immediate care to over 45,000 isolated families across the floodplains.",
            "published_date": date(2024, 10, 24),
            "published": True,
            "featured": True
        },
        {
            "title": "WOLT Relief Program: Serving with Compassion in Bangladesh",
            "slug": "wolt-relief-program",
            "category": "Relief Program",
            "short_description": "Serving with Compassion in Bangladesh.",
            "content": "Serving with Compassion in Bangladesh.",
            "published_date": date(2024, 10, 22),
            "published": True,
            "featured": False
        },
        {
            "title": "WOLT Education Program: Class 1 to 5 Education Provided",
            "slug": "wolt-education-program",
            "category": "Education",
            "short_description": "Class 1 to 5 Education Provided.",
            "content": "Class 1 to 5 Education Provided.",
            "published_date": date(2024, 10, 18),
            "published": True,
            "featured": False
        },
        {
            "title": "WOLT Health Program: Free Medical Camps in 64 Districts",
            "slug": "wolt-health-program",
            "category": "Healthcare",
            "short_description": "Free Medical Camps in 64 Districts.",
            "content": "Free Medical Camps in 64 Districts.",
            "published_date": date(2024, 10, 12),
            "published": True,
            "featured": False
        },
        {
            "title": "WOLT Housing Project: Homes for the Homeless in Bangladesh",
            "slug": "wolt-housing-project",
            "category": "Housing",
            "short_description": "Homes for the Homeless in Bangladesh.",
            "content": "Homes for the Homeless in Bangladesh.",
            "published_date": date(2024, 10, 5),
            "published": True,
            "featured": False
        }
    ]
    
    for n_data in news_data:
        News.objects.get_or_create(slug=n_data['slug'], defaults=n_data)

    # 3. Seed Media (from MediaNews.tsx)
    media_data = [
        {
            "title": "Documentary: Voices of the Coastline",
            "description": "12:40 | 24K views",
            "category": "Documentary",
            "status": "published"
        },
        {
            "title": "Special Report: Frontline Mobile Clinics in Action",
            "description": "05:15 | 18K views",
            "category": "Report",
            "status": "published"
        }
    ]
    
    for m_data in media_data:
        Media.objects.get_or_create(title=m_data['title'], defaults=m_data)

    # 4. Seed Partners (from InvestorsMarquee.tsx)
    partners_data = [
        {"organization_name": "EBF", "display_order": 1, "active": True},
        {"organization_name": "Baptist Union of Scotland", "display_order": 2, "active": True},
        {"organization_name": "Eglise Baptiste du Calvaire", "display_order": 3, "active": True},
        {"organization_name": "Baptist Gottingen", "display_order": 4, "active": True}
    ]
    
    for part_data in partners_data:
        Partner.objects.get_or_create(organization_name=part_data['organization_name'], defaults=part_data)

    print("Successfully seeded database with frontend dummy data.")

if __name__ == '__main__':
    seed()
