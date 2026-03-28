# Are You a Heretic? — Project Context

## What Is This?
An interactive theological quiz site that shows everyone holds at least one historically condemned or contested view — by the standards of some church council. Users answer 10 questions about core Christian beliefs. Every answer reveals the historical controversy around that position. The tone is impartial and educational — the historical record speaks for itself.

The site also serves as an educational resource with 31 heresy deep-dive pages and 8 SEO articles covering early church history, councils, and doctrinal controversies.

## Domain
**areyouaheretick.com** — intentional misspelling. "Heretick" = heretic + tick (✓). The gold checkmark branding plays on the old English spelling.

## Tech Stack
- **Astro 6** (static site generation, MDX content collections)
- **React 19** (interactive quiz as a client-side island via `@astrojs/react`)
- **TypeScript** (strict mode)
- **Tailwind CSS 4** (with `@tailwindcss/vite`)
- **Framer Motion** (animations)
- **@astrojs/sitemap** (automatic sitemap at site URL)
- **@astrojs/mdx** (content collections for heresy pages and articles)
- No database — all data in TypeScript files

## Project Structure
```
src/
├── pages/
│   ├── index.astro          # Landing page
│   ├── quiz.astro           # 10-question interactive quiz (React island)
│   ├── results.astro        # Quiz results with heresy profile
│   ├── about.astro          # About the project
│   ├── 404.astro            # Custom 404
│   ├── articles/            # 8 SEO articles (MDX content collection)
│   │   ├── index.astro      # Article listing
│   │   └── [slug].astro     # Dynamic article pages
│   └── explore/             # 31 heresy deep-dive pages (MDX)
│       ├── index.astro      # Browse all heresies
│       └── [slug].astro     # Individual heresy pages
├── components/
│   ├── Header.astro, Footer.astro          # Layout
│   ├── HeroSection.astro, Button.astro     # UI
│   ├── Badge.astro, HereticTick.astro      # Branding
│   └── quiz/                               # React components
│       ├── QuizContainer.tsx    # Main quiz state (sessionStorage)
│       ├── QuestionCard.tsx     # Question display
│       ├── RevealCard.tsx       # Post-answer reveal (heresy + councils)
│       ├── ProgressBar.tsx      # Quiz progress
│       └── ...                  # Results, sharing, animation components
├── content/
│   ├── articles/            # 8 MDX articles
│   └── heresies/            # 31 MDX heresy deep-dives
├── data/
│   ├── heresies.ts          # 29 heresy records with metadata
│   ├── questions.ts         # 10 quiz questions, 5 answers each (Option 5 = panoramic reveal)
│   ├── councils.ts          # 20+ councils (ecumenical, anti-Nicene, regional)
│   └── types.ts             # TypeScript interfaces
└── layouts/
    └── BaseLayout.astro     # Shared layout
```

## Content Inventory
- **Quiz**: 10 questions, 5 answers each (Options 1–4 + Option 5 panoramic reveal)
- **Heresy pages**: 31 MDX files (arianism, nestorianism, docetism, modalism, pelagianism, etc.)
- **Articles**: 8 SEO-targeted articles (trinity explained, denomination differences, early church beliefs, etc.)
- **Councils**: 20+ councils including 13 anti-Nicene councils (335-380 AD)

## Key Design Decisions
1. **Every answer is condemned or debated** — only two severity labels; no answer is "orthodox"
2. **Impartial reveals** — after each answer, a RevealCard shows the historical controversy. No gotchas, no editorializing. The historical record speaks for itself.
3. **Option 5** — every question has a 5th option ("None of these quite fit") that reveals a panoramic view of all positions on that topic
4. **sessionStorage persistence** — quiz state survives page refreshes but not new sessions
5. **React island architecture** — only the quiz is interactive; everything else is static HTML
6. **Gold checkmark (✓) branding** — plays on "heretick" domain spelling

## Known Issues
- Semi-arianism slug mismatch: `homoiousian` in heresies.ts vs `semi-arianism` in MDX/links
- 2 factual inaccuracies flagged in 08-fact-check-report.md (ETS 2016 date, Marcionism/Constantinople I)
- 3 overstated claims (Rimini detention, Liberius torture, TULIP acronym origin)

## Running
```bash
npm install
npm run dev     # localhost:4321
npm run build   # production build to dist/
```

## Project Docs
Spec and reference documents are in `project-docs/`:
- 01: Research database (councils + heresies reference)
- 02: Quiz design and tone progression
- 08: Fact-check report (historical accuracy audit)
- 11: Biblical Unitarian audit report (content bias analysis from BU perspective)
- 12: Quiz redesign spec (cut to 10 questions, Option 5, severity overhaul, impartial reveals)

Completed prompts are archived in `project-docs/archive/`.
