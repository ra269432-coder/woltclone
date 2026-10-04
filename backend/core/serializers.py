from rest_framework import serializers
from .models import Program, News, Story, Campaign, Media, Notice, Research, Partner
from hr.models import Employee

class ProgramSerializer(serializers.ModelSerializer):
    activities_list = serializers.SerializerMethodField()
    
    class Meta:
        model = Program
        fields = '__all__'

    def get_activities_list(self, obj):
        import ast
        try:
            return ast.literal_eval(obj.activities) if obj.activities else []
        except:
            return [act.strip() for act in obj.activities.split(',') if act.strip()]

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'

class StorySerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Story
        fields = '__all__'

    def get_image(self, obj):
        if not obj.image:
            return None
        url = str(obj.image)
        if url.startswith('http') or url.startswith('/images/'):
            return url
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.image.url)
        return obj.image.url

class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = '__all__'

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'

class NoticeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notice
        fields = '__all__'

class ResearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Research
        fields = '__all__'

class PartnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partner
        fields = '__all__'

class EmployeeSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Employee
        fields = ['id', 'name', 'designation', 'department', 'image']

    def get_image(self, obj):
        if not obj.profile_photo:
            return None
        url = str(obj.profile_photo)
        if url.startswith('http') or url.startswith('/images/'):
            return url
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.profile_photo.url)
        return obj.profile_photo.url
