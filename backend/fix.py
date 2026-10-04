import re

with open('core/views.py', 'r') as f:
    content = f.read()

content = re.sub(r"template_name = 'core/.*?_list\.html'", "template_name = 'core/generic_list.html'", content)

with open('core/views.py', 'w') as f:
    f.write(content)
