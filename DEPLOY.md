# Deploy guide

It's a single static file (`index.html`), so it deploys anywhere that serves HTML — no build, no server, no config.

## GitHub Pages (simplest — free public URL)

1. Push this repo (already done if you're reading it here).
2. On GitHub: **Settings → Pages → Build and deployment → Source: "Deploy from a branch" → Branch: `main` / `/ (root)` → Save.**
3. Wait ~1 minute. Your demo is live at:
   `https://chrismccarthy-ship-it.github.io/A4S-Guided-FINS-Demo/`

Or enable it from the CLI:
```bash
gh api -X POST repos/chrismccarthy-ship-it/A4S-Guided-FINS-Demo/pages \
  -f source.branch=main -f source.path=/
```

Re-deploy after edits with a normal `git push` — Pages rebuilds automatically.

## Anywhere else

- **Netlify / Vercel / Cloudflare Pages / S3 / any static host** — drop `index.html` in and you're done. No build command needed.
- **Local** — just open `index.html`, or `python -m http.server 8000`.

## Per-prospect branding at demo time

No redeploy needed. On the landing placemat:
- Type the **customer name** (brands the console header org name), and
- Paste a **brand hex color** (themes the org accent).

Or pass them in the URL: `?org=Acme%20Bank&hex=%23e01a2b`.

## Note on the Claude artifact vs. this repo

The demo was authored as a Claude **artifact** (rendered on claude.ai). This repo wraps that same content in a standard `<!doctype html>` skeleton so it works as a **standalone** file on any static host. Keep them in sync by copying the artifact's HTML body into `index.html` between the `<body>` tags (everything else in `index.html` is just the wrapper).
