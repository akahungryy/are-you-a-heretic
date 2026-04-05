# Are You a Heretic?

Interactive theological quiz — everyone holds at least one historically condemned view by some council's standards. Educational, impartial tone.

## Tech Stack
- **Astro 6** + **React 19** (quiz is a client-side island), TypeScript (strict)
- **Tailwind CSS 4**, Framer Motion, MDX content collections
- No database — all data in TypeScript files

## Domain
**areyouaheretick.com** — intentional "heretick" spelling (heretic + tick ✓).

## Running
```bash
npm install
npm run dev     # localhost:4321
npm run build   # production build
```

## Key Conventions
- **Every answer is condemned or debated** — no answer is "orthodox"
- **Impartial reveals** — RevealCard shows historical controversy without editorialising
- **Option 5** on every question — panoramic view of all positions on that topic
- **sessionStorage** for quiz state (survives refresh, not new sessions)
- **React island architecture** — only the quiz is interactive; rest is static HTML

## Known Issues
- Semi-arianism slug mismatch: `homoiousian` in heresies.ts vs `semi-arianism` in MDX/links
- 2 factual inaccuracies flagged in `project-docs/08-fact-check-report.md`
- 3 overstated claims (Rimini detention, Liberius torture, TULIP acronym origin)

## Workflow
- Prompts live in `project-docs/`, completed prompts archived to `project-docs/archive/`
- **Pending (14a–14f):** Site intent audit implementation — execute in order. See `project-docs/prompt-14*.md`

## Project Docs
Key reference documents in `project-docs/`:
- 01: Research database (councils + heresies)
- 08: Fact-check report
- 12: Quiz redesign spec (10 questions, Option 5, severity overhaul)
- 14: Site intent audit (2026-04-05) — comprehensive audit of site vs. unity intent
