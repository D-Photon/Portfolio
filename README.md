# Toyeeb A. Abd’Azeez — Data Science Portfolio

A responsive, recruiter-focused portfolio built with HTML, CSS, vanilla JavaScript, and a small Flask server for Render. Portfolio content is stored in `site/content.json`.

## Personalize before publishing

- Replace the bracketed GitHub, demo, CV, LinkedIn, and Kaggle placeholders in `site/content.json` with real links.
- Add a professional headshot by setting the `photo` value to an image URL or path.
- Review each project description to ensure it matches the work you want to present.

The interface labels unfilled destinations as placeholders and does not link them to invented profiles or files. Project cards open a detailed view with the idea, approach, tools, result, and access links.

## Run locally

```bash
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Open http://localhost:5000. To serve the static site, use `site/` as the web root. The page loads `content.json` at runtime, so use a local web server rather than opening `index.html` directly.

## Deploy to Render

Push this folder to a Git repository and create a Render Blueprint from `render.yaml`, or configure a Python web service with:

- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn app:app`

## Deploy to Cloudflare Pages

Use `site` as the build output directory and leave the build command empty.
