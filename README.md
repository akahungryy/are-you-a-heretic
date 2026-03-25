# Are You a Heretic?

An interactive theological quiz that proves everyone is a heretic — at least by the standards of some church council.

Answer 18 questions about core Christian beliefs. Every answer triggers a historical condemnation. Explore 31 heresy deep-dives and 8 articles on early church history.

## Quick Start

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # Production build → dist/
```

Requires Node.js ≥ 22.12.0.

## Tech Stack

Astro 6, React 19 (quiz island), TypeScript, Tailwind CSS 4, Framer Motion, MDX content collections.

## Structure

- `/src/pages/quiz.astro` — Interactive 18-question quiz (React island)
- `/src/pages/explore/` — 31 heresy deep-dive pages (MDX)
- `/src/pages/articles/` — 8 SEO articles (MDX)
- `/src/data/` — Quiz questions, heresy records, council data
- `/project-docs/` — Spec docs, build prompts, fact-check report

## Domain

**areyouaheretick.com** — intentional old English spelling. "Heretick" = heretic + tick (✓).

## Related Projects

- [Probably Theology](https://probablytheology.com) — Hub blog
- [Christos](https://christosproject.com) — Christology explorer
- [OpenScripture](https://openscripture.io) — Bible reader app
