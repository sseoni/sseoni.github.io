This repository contains the source code for my technical blog, built with Jekyll.
It is hosted via GitHub Pages.

## 🛠️ Prerequisites
To run this project locally, you need:

- Ruby (v2.7 or higher recommended)

- Jekyll (Global installation)

If Jekyll is not installed, install it globally:

```
gem install jekyll bundler
```

## 🚀 Quick Start (How to Run Locally)
Since this project does not use a Gemfile for local dependency management, you can run Jekyll directly.

1. Run the Server

The ```--livereload``` option automatically refreshes the browser when you make changes.

```
jekyll serve --livereload
```

Local Address: http://localhost:4000

## 📝 Command Reference
Action | Command | Description
:--|:--|:--
Basic Run | jekyll serve | Standard way to run the local server
Live Reload | jekyll serve --livereload | Auto-refreshes browser on file save (Recommended)
View Drafts | jekyll serve --drafts | Includes posts in _drafts folder
Change Port | jekyll serve --port 4001 | Use if port 4000 is busy

## 📂 Project Structure
_posts/: Blog posts (YYYY-MM-DD-title.md)

_layouts/: Page templates (default, post, blog, etc.)

_includes/: Reusable components (header, footer, sidebar, etc.)

_sass/ & assets/css/: Stylesheets

_config.yml: Global configuration