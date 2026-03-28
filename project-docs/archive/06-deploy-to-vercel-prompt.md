# "Are You a Heretic?" — Deploy to Vercel via GitHub

## Overview

This prompt takes the fully built Astro project and publishes it live. It handles: git initialization, GitHub repo creation, Vercel deployment, and build verification.

**Project location:** `/Users/paulrobson/projects/are-you-a-heretic`
**GitHub username:** `akahungryy`
**Target domain:** `areyouaheretick.com` (to be purchased on Namecheap — Vercel subdomain used initially)

---

## PRE-FLIGHT: Run These Yourself First

Before feeding the prompt below to Claude Code, make sure these CLI tools are available. Run each command in your terminal:

```bash
# 1. Check Node.js (need v22+)
node --version

# 2. Check if GitHub CLI is installed
gh --version

# If not installed:
# brew install gh

# 3. Authenticate with GitHub (one-time setup)
gh auth status
# If not logged in:
# gh auth login
# → Choose GitHub.com → HTTPS → Login with browser

# 4. Check if Vercel CLI is installed
vercel --version

# If not installed:
npm install -g vercel

# 5. Authenticate with Vercel (one-time setup)
vercel whoami
# If not logged in:
# vercel login
# → It will open your browser to authenticate
```

Once `gh auth status` and `vercel whoami` both show you're logged in, you're ready.

---

## CLAUDE CODE PROMPT

```
I need you to deploy the Astro project at /Users/paulrobson/projects/are-you-a-heretic to Vercel via GitHub. The site is already fully built (dist/ exists). Here's what to do, step by step:

STEP 1: VERIFY THE BUILD
- cd into /Users/paulrobson/projects/are-you-a-heretic
- Run `npm run build` and confirm it completes without errors
- Run `npm run preview` briefly to sanity check (kill it after confirming it starts)
- If there are build errors, fix them before proceeding

STEP 2: INITIALIZE GIT
- The project has no git repo yet. Initialize one:
  git init
  git add .
  git commit -m "Initial commit: Are You a Heretic? quiz site"
- The .gitignore is already configured correctly (excludes dist/, node_modules/, .env, .DS_Store)

STEP 3: CREATE GITHUB REPO AND PUSH
- Use the GitHub CLI to create a public repo and push:
  gh repo create are-you-a-heretic --public --source=. --remote=origin --push
- Verify the push worked:
  gh repo view akahungryy/are-you-a-heretic --web
- If the above fails, do it manually:
  git remote add origin https://github.com/akahungryy/are-you-a-heretic.git
  git branch -M main
  git push -u origin main

STEP 4: DEPLOY TO VERCEL
- Use the Vercel CLI to link and deploy:
  vercel link --yes
  vercel --prod
- When prompted during `vercel link`:
  - Scope: select your personal account
  - Link to existing project? No → create new
  - Project name: are-you-a-heretic
  - Directory: ./
  - Framework: Astro (it should auto-detect)
  - Override settings? No (defaults are correct for Astro)
- Alternatively, if prompts are tricky, use:
  vercel deploy --prod --yes

STEP 5: CONNECT GITHUB FOR AUTO-DEPLOYS
- After the initial deploy, connect the GitHub repo for automatic deployments:
  vercel git connect
- This means every push to `main` will automatically redeploy the site

STEP 6: VERIFY DEPLOYMENT
- Run `vercel ls` to see your deployment URL
- The URL will be something like: are-you-a-heretic.vercel.app
- Open the URL and verify:
  - Landing page loads with the hero section
  - Quiz starts and works (click through a couple questions)
  - /explore page shows the heresy timeline
  - /articles page shows the SEO articles
  - /about page loads
  - Check that the sitemap exists at /sitemap-index.xml
- Report the live URL back to me

IMPORTANT NOTES:
- The astro.config.mjs currently has `site: 'https://areyouaheretick.com'` — UPDATE this to `site: 'https://areyouaheretick.com'` before building. This is used for sitemap generation and canonical URLs.
- Do NOT modify any source code. This is a deployment task only.
- If `vercel` commands fail with auth errors, tell me — I may need to run `vercel login` manually.
- If the build fails, diagnose and fix the issue, then retry.
```

---

## AFTER DEPLOYMENT: Custom Domain Setup

Once the site is live on Vercel's subdomain, the custom domain can be added. See the domain buying guidance below.

### Adding a Custom Domain to Vercel

Once you've purchased `areyouaheretick.com` (or whichever domain), here's the Claude Code prompt to connect it:

```
Add the custom domain areyouaheretick.com to my Vercel project. Run:

vercel domains add areyouaheretick.com

Then follow the DNS configuration instructions Vercel provides. Typically this means:
1. Adding an A record pointing to 76.76.21.21
2. Adding a CNAME record for www pointing to cname.vercel-dns.com

After DNS propagation (can take up to 48 hours, usually much faster), verify:
- https://areyouaheretick.com loads the site
- https://www.areyouaheretick.com redirects to the apex domain
- SSL certificate is active (should be automatic via Vercel)

Also verify the sitemap at https://areyouaheretick.com/sitemap-index.xml is accessible.
```

---

## TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| `gh: command not found` | `brew install gh` then `gh auth login` |
| `vercel: command not found` | `npm install -g vercel` then `vercel login` |
| Build fails | Check the error output — likely a missing dependency or TypeScript error |
| Vercel deploy fails | Try `vercel deploy --prod --yes` or check `vercel logs` |
| GitHub push rejected | Make sure `gh auth status` shows you're authenticated |
| DNS not propagating | Wait up to 48h; use `dig areyouaheretick.com` to check |
