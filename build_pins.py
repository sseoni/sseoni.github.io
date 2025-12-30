import os
import json
import frontmatter
import glob

BLOG_DIR = 'blog'
OUTPUT_FILE = 'assets/pinned.json'

pinned_posts = []

files = glob.glob(os.path.join(BLOG_DIR, "**/*.md"), recursive=True)

for file_path in files:
    try:
        post = frontmatter.load(file_path)
        if post.get('tags') and 'highlight' in post['tags']:
            
            pinned_posts.append({
                "title": post.get('title', 'No Title'),
                "summary": post.get('summary', 'No summary available.'),
                "link": "/" + file_path.replace(".md", ".html").replace("\\", "/"), 
                "date": str(post.get('date', ''))
            })
            
    except Exception as e:
        print(f"Error parsing {file_path}: {e}")

with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    json.dump(pinned_posts, f, ensure_ascii=False, indent=2)