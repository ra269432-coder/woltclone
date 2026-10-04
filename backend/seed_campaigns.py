import os
import django
import sys
from datetime import date, timedelta

sys.path.append(os.path.dirname(__file__))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import Campaign

def seed():
    campaigns_data = [
        {
            "title": "Winter Relief for Northern Bangladesh",
            "slug": "winter-relief-northern-bangladesh",
            "description": "Severe cold waves are threatening the lives of the ultra-poor. Help us distribute 50,000 blankets and warm clothing kits before January.",
            "target_amount": 100000,
            "raised_amount": 75000,
            "donors_count": 1240,
            "status": "urgent",
            "end_date": date.today() + timedelta(days=14)
        },
        {
            "title": "Build 5 Rural Schools",
            "slug": "build-5-rural-schools",
            "description": "Education is the key to breaking poverty. We are raising funds to construct 5 primary schools in remote char areas to serve 2,000 children.",
            "target_amount": 500000,
            "raised_amount": 200000,
            "donors_count": 350,
            "status": "active",
            "end_date": date.today() + timedelta(days=45)
        },
        {
            "title": "Emergency Medical Camp Deployment",
            "slug": "emergency-medical-camp-deployment",
            "description": "Fund our mobile clinics for a month to provide free health checkups and medicines to flood-affected victims in Sylhet.",
            "target_amount": 50000,
            "raised_amount": 45000,
            "donors_count": 890,
            "status": "active",
            "end_date": date.today() + timedelta(days=3)
        }
    ]
    
    for c_data in campaigns_data:
        Campaign.objects.get_or_create(slug=c_data['slug'], defaults=c_data)
    
    print("Campaigns seeded.")

if __name__ == '__main__':
    seed()
