from django.core.management.base import BaseCommand
from core.models import Program, News, Media, Story
from careers.models import Job
from django.utils import timezone
import datetime

class Command(BaseCommand):
    help = 'Seed the database with initial demo data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Seeding programs...')
        
        programs = [
            {
                "title": "Humanitarian Relief & Disaster Response",
                "slug": "relief",
                "subtitle": "Rapid response to crises and essential support for vulnerable communities.",
                "description": "In times of natural disasters and economic crises, WOLT Foundation provides immediate life-saving support.",
                "activities": [
                    "Emergency food package distribution",
                    "Crisis management and rapid response teams",
                    "Winter clothing and blanket drives",
                    "Rehabilitation support for disaster-affected families"
                ]
            },
            {
                "title": "Healthcare Access & Medical Camps",
                "slug": "health",
                "subtitle": "Bringing essential healthcare services directly to underserved populations.",
                "description": "Access to quality healthcare is a fundamental right. Our health program focuses on preventive care.",
                "activities": [
                    "Free medical camps in remote villages",
                    "Distribution of essential medicines",
                    "Maternal and child health awareness programs",
                    "Specialized check-ups (eye care, dental, etc.)"
                ]
            },
            {
                "title": "Education & Youth Empowerment",
                "slug": "education",
                "subtitle": "Building the foundation for a sustainable future through quality learning.",
                "description": "We believe that education is the most powerful tool for breaking the cycle of poverty.",
                "activities": [
                    "Providing school supplies and textbooks",
                    "Tuition support for underprivileged students",
                    "Establishing community learning centers",
                    "Youth skills development and mentorship"
                ]
            }
        ]

        for p_data in programs:
            Program.objects.get_or_create(slug=p_data['slug'], defaults=p_data)

        self.stdout.write('Seeding news...')
        now = timezone.now().date()
        news_items = [
            {
                "title": "WOLT Foundation Launches 40+ Mobile Healthcare Units Across Sunamganj & Sylhet",
                "slug": "wolt-foundation-launches-mobile-healthcare",
                "category": "Emergency Healthcare",
                "short_description": "In direct response to severe floodings, emergency rescue boats and fully stocked mobile clinics have provided immediate care to over 45,000 isolated families across the floodplains.",
                "content": "In direct response to severe floodings, emergency rescue boats and fully stocked mobile clinics have provided immediate care to over 45,000 isolated families across the floodplains.",
                "published_date": now - datetime.timedelta(days=2),
                "featured": True
            },
            {
                "title": "WOLT Relief Program: Serving with Compassion in Bangladesh",
                "slug": "wolt-relief-program-compassion-bangladesh",
                "category": "Relief Program",
                "short_description": "Serving with Compassion in Bangladesh",
                "content": "Serving with Compassion in Bangladesh",
                "published_date": now - datetime.timedelta(days=4),
                "featured": False
            },
            {
                "title": "WOLT Education Program: Class 1 to 5 Education Provided",
                "slug": "wolt-education-program-class-1-5",
                "category": "Education",
                "short_description": "Class 1 to 5 Education Provided",
                "content": "Class 1 to 5 Education Provided",
                "published_date": now - datetime.timedelta(days=8),
                "featured": False
            },
            {
                "title": "WOLT Health Program: Free Medical Camps in 64 Districts",
                "slug": "wolt-health-program-free-medical-camps",
                "category": "Healthcare",
                "short_description": "Free Medical Camps in 64 Districts",
                "content": "Free Medical Camps in 64 Districts",
                "published_date": now - datetime.timedelta(days=14),
                "featured": False
            },
            {
                "title": "WOLT Housing Project: Homes for the Homeless in Bangladesh",
                "slug": "wolt-housing-project-homes-homeless",
                "category": "Housing",
                "short_description": "Homes for the Homeless in Bangladesh",
                "content": "Homes for the Homeless in Bangladesh",
                "published_date": now - datetime.timedelta(days=21),
                "featured": False
            }
        ]

        for n_data in news_items:
            News.objects.get_or_create(slug=n_data['slug'], defaults=n_data)

        self.stdout.write('Seeding jobs...')
        jobs = [
            { 
                "title": "Senior Program Manager - Health", 
                "slug": "senior-program-manager-health",
                "location": "Dhaka HQ", 
                "employment_type": "Full-Time", 
                "department": "Programs" 
            },
            { 
                "title": "M&E Specialist", 
                "slug": "m-e-specialist",
                "location": "Sylhet Regional Office", 
                "employment_type": "Full-Time", 
                "department": "Research & Evaluation" 
            },
            { 
                "title": "Field Coordinator", 
                "slug": "field-coordinator",
                "location": "Kurigram", 
                "employment_type": "Contract", 
                "department": "Humanitarian Response" 
            },
            { 
                "title": "Communications Officer", 
                "slug": "communications-officer",
                "location": "Dhaka HQ", 
                "employment_type": "Full-Time", 
                "department": "External Affairs" 
            }
        ]

        for j_data in jobs:
            Job.objects.get_or_create(slug=j_data['slug'], defaults=j_data)

        self.stdout.write('Seeding stories...')
        stories = [
            {
                "title": "Rahima Begum",
                "slug": "rahima-begum",
                "content": "Rahima was devastated when river erosion took her home. Through our Bashundhara social enterprise, she received a micro-loan to purchase a sewing machine. Today, she runs a successful tailoring business.",
                "author": "Kurigram District",
                "published_date": now - datetime.timedelta(days=30)
            },
            {
                "title": "Abdul Karim",
                "slug": "abdul-karim",
                "content": "Abdul is a third-generation farmer who almost lost his livelihood to climate change. Our climate-resilient agriculture training provided him with saline-tolerant seeds, restoring his farm's yield by 150%.",
                "author": "Khulna Coast",
                "published_date": now - datetime.timedelta(days=60)
            },
            {
                "title": "Sumi Akter",
                "slug": "sumi-akter",
                "content": "Growing up in a slum, Sumi had to work to support her family. Our inclusive education program recognized her brilliant academic potential and provided a full scholarship. She is now studying engineering.",
                "author": "Dhaka Slums",
                "published_date": now - datetime.timedelta(days=90)
            },
            {
                "title": "Hasan Ali",
                "slug": "hasan-ali",
                "content": "After a tragic accident, Hasan fell into severe depression. We provided him with a customized wheelchair and vocational IT training. He now works as a freelance graphic designer, fully supporting his family.",
                "author": "Sylhet",
                "published_date": now - datetime.timedelta(days=120)
            }
        ]

        for s_data in stories:
            Story.objects.get_or_create(slug=s_data['slug'], defaults=s_data)

        self.stdout.write(self.style.SUCCESS('Successfully seeded database!'))
