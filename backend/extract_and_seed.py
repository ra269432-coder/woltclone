import os
import re
import json
import django
import sys

sys.path.append(os.path.dirname(__file__))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from core.models import Program

def extract_jsx_prop(content, prop_name):
    # This tries to extract the content inside a prop, like prop={...}
    # We find the start of the prop
    start_idx = content.find(f'{prop_name}=')
    if start_idx == -1: return ""
    
    # We find the matching brace if it starts with {
    val_start = content.find('{', start_idx)
    if val_start == -1: return ""
    
    brace_count = 0
    for i in range(val_start, len(content)):
        if content[i] == '{': brace_count += 1
        elif content[i] == '}': brace_count -= 1
        
        if brace_count == 0:
            return content[val_start+1:i]
    return ""

def clean_html(text):
    text = re.sub(r'</?>', '', text)
    text = re.sub(r'<p>', '', text)
    text = re.sub(r'</p>', '\n\n', text)
    return text.strip()

def parse_stats(stats_str):
    if not stats_str: return []
    stats = []
    for match in re.finditer(r'value:\s*"([^"]+)",\s*label:\s*"([^"]+)"', stats_str):
        stats.append({"value": match.group(1), "label": match.group(2)})
    return stats

def parse_interventions(interv_str):
    if not interv_str: return []
    interv = []
    for match in re.finditer(r'title:\s*"([^"]+)",\s*description:\s*"([^"]+)"', interv_str):
        interv.append({"title": match.group(1), "description": match.group(2)})
    return interv

def parse_quote(quote_str):
    if not quote_str: return "", ""
    text_match = re.search(r'text:\s*"([^"]+)"', quote_str)
    author_match = re.search(r'author:\s*"([^"]+)"', quote_str)
    return text_match.group(1) if text_match else "", author_match.group(1) if author_match else ""

def main():
    programs_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'src', 'app', '(public)', 'programs')
    
    for folder in os.listdir(programs_dir):
        folder_path = os.path.join(programs_dir, folder)
        if os.path.isdir(folder_path):
            page_path = os.path.join(folder_path, 'page.tsx')
            if os.path.exists(page_path):
                with open(page_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                title_match = re.search(r'title="([^"]+)"', content)
                subtitle_match = re.search(r'subtitle="([^"]+)"', content)
                
                if not title_match: continue
                title = title_match.group(1)
                subtitle = subtitle_match.group(1) if subtitle_match else ""
                
                stats_str = extract_jsx_prop(content, 'stats')
                stats = parse_stats(stats_str)
                
                challenge_str = extract_jsx_prop(content, 'challengeText')
                challenge = clean_html(challenge_str)
                
                approach_str = extract_jsx_prop(content, 'approachText')
                approach = clean_html(approach_str)
                
                interventions_str = extract_jsx_prop(content, 'interventions')
                interventions = parse_interventions(interventions_str)
                
                quote_str = extract_jsx_prop(content, 'quote')
                quote_text, quote_author = parse_quote(quote_str)
                
                slug = folder
                
                program, created = Program.objects.get_or_create(slug=slug, defaults={'title': title})
                program.title = title
                program.subtitle = subtitle
                program.challenge_text = challenge
                program.approach_text = approach
                program.quote_text = quote_text
                program.quote_author = quote_author
                program.stats = stats
                program.interventions = interventions
                program.save()
                
                print(f"Updated program: {title} ({slug})")

if __name__ == '__main__':
    main()
