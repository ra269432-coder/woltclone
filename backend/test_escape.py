import os
import django
from django.conf import settings
settings.configure(TEMPLATES=[{'BACKEND': 'django.template.backends.django.DjangoTemplates'}])
django.setup()
from django.template import Template, Context
t = Template("{{ val|escapejs }}")
print(t.render(Context({"val": '[{"name": "test", "completed": true}]'})))
