# "Are You a Heretic?" — Claude Code Build Prompts

## Overview

These prompts are designed to be fed to Claude Code sequentially. Each prompt builds on the previous one. They're written to give Claude Code maximum context so it can work efficiently without constant clarification.

**Project location:** `/Users/paulrobson/Projects/are-you-a-heretic`

**Tech stack rationale:** We're using Astro with React islands. Astro gives us fast, pre-rendered static pages for the deep dive content and landing page (great for SEO, zero JS shipped by default), while React handles the interactive quiz as a client-side "island" of interactivity. This is the right tool for a site that's mostly content with one rich interactive feature.

---

## PROMPT 1: Project Scaffolding & Data Layer

```
Create a new Astro project called "are-you-a-heretic" at /Users/paulrobson/Projects/are-you-a-heretic with the following setup:

TECH STACK:
- Astro 4+ with TypeScript
- React integration (@astrojs/react) for interactive components (the quiz)
- Tailwind CSS for styling
- Framer Motion for animations within React islands
- No database needed — all quiz data lives in TypeScript files
- Astro Content Collections for the deep dive pages

PROJECT STRUCTURE:
src/
  pages/
    index.astro                   # Landing page (static, zero JS)
    quiz.astro                    # Quiz page (hosts the React quiz island)
    results.astro                 # Results page (hosts React results island)
    explore/
      index.astro                 # Heresy timeline / explore index
      [slug].astro                # Dynamic deep dive pages (static, generated at build)
    about.astro                   # About the project (static)
    404.astro                     # Custom 404
  layouts/
    BaseLayout.astro              # Shared HTML shell, head, fonts, global styles
    ContentLayout.astro           # Layout for long-form reading (deep dives, about)
  components/
    quiz/
      QuizContainer.tsx           # Main quiz state machine (React, client:load)
      QuestionCard.tsx            # Individual question display
      AnswerOption.tsx            # Clickable answer option
      RevealCard.tsx              # The "gotcha" reveal after answering
      ProgressBar.tsx             # Visual progress through quiz
      HeresyProfileCard.tsx       # Final results summary card
      ShareButton.tsx             # Social sharing functionality
      AnimatedCounter.tsx         # For counting up condemnation stats
    layout/
      Header.astro                # Static header
      Footer.astro                # Static footer
    ui/
      Button.astro                # Static button (for landing page CTAs etc.)
      Badge.astro                 # Static heresy badge
      HeroSection.astro           # Landing page hero
  data/
    questions.ts                  # All 18 quiz questions with answers
    heresies.ts                   # Full heresy database
    councils.ts                   # Council information
    types.ts                      # TypeScript types
  content/
    heresies/                     # Markdown/MDX files for deep dive content
      arianism.mdx
      modalism.mdx
      pelagianism.mdx
      ... (one per heresy)
    config.ts                     # Astro Content Collection schema
  lib/
    scoring.ts                    # Quiz scoring logic
    sharing.ts                    # Social share text generation
  styles/
    globals.css

IMPORTANT ARCHITECTURE DECISIONS:

1. ASTRO PAGES ARE STATIC BY DEFAULT. The landing page, deep dive pages, about page, and explore index ship ZERO JavaScript. They're pre-rendered HTML + CSS. This means blazing fast load times and perfect SEO.

2. THE QUIZ IS A REACT ISLAND. The quiz page (quiz.astro) contains a single React component (<QuizContainer client:load />) that handles all quiz interactivity. This is the only page that ships significant JavaScript.

3. THE RESULTS PAGE IS ALSO A REACT ISLAND. Results.astro hosts <HeresyProfileCard client:load /> which reads quiz results from sessionStorage and renders the animated profile.

4. DEEP DIVE PAGES USE CONTENT COLLECTIONS. Each heresy's deep dive content lives in a .mdx file in src/content/heresies/. Astro generates static pages from these at build time. This keeps content separate from code and makes it easy to edit.

5. THE DATA LAYER (src/data/) is shared between Astro pages and React components. TypeScript files with quiz questions, heresy definitions, and council data are imported by both.

DESIGN DECISIONS:
- The quiz is a PROGRESSIVE REVEAL format: user answers a question, then immediately sees which historical council/authority condemned that view.
- The tone starts PLAYFUL and becomes INCREASINGLY SUBSTANTIVE.
- CRITICAL: Every single answer option triggers GENUINE condemnation from specific named councils — there is NO "safe" answer, not even the "orthodox" ones. The Nicene/Trinitarian answers are condemned by the anti-Nicene councils (341–360). The anti-Nicene answers are condemned by Nicaea (325) and Constantinople (381). This is the whole thesis of the site.
- The severity level 'contested-consensus' should be used sparingly — most answers should be 'condemned' with specific councils cited.
- The site should feel modern, slightly irreverent, and intellectually serious.

SETUP STEPS:
1. Initialize with `npm create astro@latest are-you-a-heretic -- --template minimal --typescript strict`
2. Add integrations: `npx astro add react tailwind`
3. Install: `npm install framer-motion`
4. Create the full file structure with placeholder content
5. Configure Astro Content Collections for the heresies

For the data layer, create the TypeScript types in src/data/types.ts:

export type Council = {
  id: string;
  name: string;
  year: number;
  yearEnd?: number;
  location: string;
  type: 'ecumenical' | 'anti-nicene' | 'regional' | 'denominational' | 'synod' | 'confession';
  description: string;
  slug: string;
  imperialBacking?: string;          // Which emperor backed it
  theologicalPosition?: string;       // homoousian | homoiousian | homoian | anomoean | etc.
  coerced?: boolean;                  // Was the outcome forced by imperial power?
}

export type Heresy = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;       // One-liner for badges/cards
  fullDescription: string;         // Paragraph explanation
  condemnedBy: string[];           // Council IDs
  condemnedFigures: string[];      // Historical people condemned
  modernHolders: string[];         // Who holds this today
  yearCondemned: number;
  plainLanguage: string;           // "In plain English, this means..."
  whyYouMightAgree: string;        // Why ordinary Christians accidentally hold this
  ntPerspective: string;           // What the NT actually says about this topic
}

export type QuizQuestion = {
  id: number;
  category: string;               // e.g., "Trinity", "Christology", "Salvation"
  question: string;
  tone: 'playful' | 'substantive' | 'provocative';
  answers: QuizAnswer[];
}

export type QuizAnswer = {
  id: string;                     // e.g., "q1a", "q1b"
  text: string;
  heresyTriggered: string;        // Heresy ID
  revealTitle: string;            // e.g., "Congratulations, you're a Sabellian!"
  revealText: string;             // The historical explanation
  severity: 'condemned' | 'suspicious' | 'contested-consensus';
  councilIds: string[];           // ALL councils that condemned this (plural!)
  condemnedByCount?: number;      // How many councils condemned this view
}

export type QuizResult = {
  answers: Record<number, string>;  // questionId -> answerId
  heresies: string[];               // Heresy IDs triggered
  councilsAgainst: number;          // Count of ALL councils (ecumenical + anti-Nicene + regional)
  ecumenicalCouncilsAgainst: number; // Count of the 7 ecumenical councils
  antiNiceneCouncilsAgainst: number; // Count of anti-Nicene councils (341-360)
  confessionsAgainst: number;       // Count of confessions/synods
  estimatedCondemnors: string;      // e.g., "~1.5 billion Christians"
}

Also set up the Content Collection schema in src/content/config.ts for the heresy deep dive pages:

import { defineCollection, z } from 'astro:content';

const heresies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    shortDescription: z.string(),
    condemnedBy: z.array(z.string()),
    yearCondemned: z.number(),
    category: z.string(),
    relatedHeresies: z.array(z.string()),
  }),
});

export const collections = { heresies };

Set up the project with all dependencies installed, the file structure created, and placeholder content in each file. Don't build the full UI yet — just the skeleton. Make sure `npm run dev` starts without errors.
```

---

## PROMPT 2: Quiz Data — Questions & Answers

```
I'm building the "Are You a Heretic?" quiz using Astro + React. Read the quiz design document at /Users/paulrobson/Projects/are-you-a-heretic/project-docs/02-quiz-design.md.

Now populate src/data/questions.ts with ALL 18 quiz questions. The full question content, answer options, reveal text, and heresy mappings are specified in the design doc. Here's a summary of the 18 questions:

Q1: Trinity — Father/Son/Spirit relationship (Modalism vs Nicene vs Subordinationism vs Agnosticism)
Q2: Did Jesus always exist? (Arianism vs Nicene vs Adoptionism vs Subordinationism)
Q3: Did Jesus really suffer? (Docetism vs full humanity)
Q4: What did the cross accomplish? (Atonement theories)
Q5: How does someone get saved? (Pelagian spectrum)
Q6: Where does Christian authority come from? (Sola Scriptura vs Tradition)
Q7: How do you relate to the OT God? (Marcionism)
Q8: Images in church? (Iconoclasm)
Q9: What happens at communion? (Transubstantiation vs Memorial)
Q10: Who should be baptized? (Paedobaptism vs Credobaptism)
Q11: End times? (Pre/A/Postmillennialism)
Q12: What is hell? (ECT vs Annihilationism vs Universalism)
Q13: Can you lose salvation? (Perseverance vs Apostasy)
Q14: Did God choose who's saved? (Predestination)
Q15: Who has final authority? (Pope vs Bible vs Councils)
Q16: Does God speak directly today? (Cessationism vs Continuationism)
Q17: Can non-Christians be saved? (Exclusivism vs Inclusivism)
Q18: Does the Son eternally submit to the Father? (EFS debate)

For EACH question, implement the full answer data including:
- The answer text (conversational, accessible)
- Which heresy it triggers (by ID)
- A punchy reveal title (e.g., "Welcome to Arianism! Population: you.")
- A 2-3 paragraph reveal explanation with historical context, who was condemned, what happened to them, and why the user's answer maps to that position
- Severity level (condemned / suspicious / contested-consensus)
- ALL relevant council IDs (plural! — many answers are condemned by multiple councils)
- A condemnedByCount showing how many councils condemned this specific view

CRITICAL: NO ANSWER IS SAFE. Every single answer option — including the "Nicene" ones — must trigger condemnations from specific historical councils. For Q1 and Q2 in particular:
- The Nicene/Trinitarian answer ("three persons, one substance") must be flagged as condemned by the anti-Nicene councils: Antioch (341), Arles (353), Milan (355), Sirmium II-V (351-359), Rimini (359), Seleucia (359), and Constantinople (360). These councils rejected homoousios. The reveal should explain that for most of the 4th century, this was the LOSING position.
- The subordinationist answer must be flagged as condemned by Nicaea (325) and Constantinople (381).
- Every answer path must result in condemnation from at least one council.

Also populate src/data/heresies.ts with the full heresy database and src/data/councils.ts with ALL councils referenced — including the anti-Nicene councils (Tyre 335, Antioch 341, Sardica 343, Arles 353, Milan 355, Sirmium I-V, Rimini 359, Seleucia 359, Constantinople 360). Use the research database at project-docs/01-research-database.md (especially SECTION 1B) for all historical details.

The councils.ts file should include the anti-Nicene councils with type: 'anti-nicene', their imperial backing info, theological position, and coercion flags.

Make the reveal text ENGAGING — first 5 questions should be witty and slightly tongue-in-cheek. Questions 6-12 should be informative and interesting. Questions 13-18 should be genuinely thought-provoking. Every reveal should teach the user something they didn't know.

Keep the tone consistent: we're not mocking anyone's faith. We're showing that the history of doctrine is far messier and more fascinating than most people realize.

IMPORTANT: These data files in src/data/ are plain TypeScript — they're shared between Astro pages (for static rendering) and React components (for the interactive quiz). Make sure all exports use `export const` so they work in both contexts.
```

---

## PROMPT 3: Quiz UI — The Interactive React Island

```
Now build the interactive quiz UI for "Are You a Heretic?" at /Users/paulrobson/Projects/are-you-a-heretic.

ARCHITECTURE REMINDER: This is an Astro site. The quiz lives inside React components that are mounted as client-side islands. The Astro page (src/pages/quiz.astro) provides the page shell, and the React component (<QuizContainer client:load />) handles all interactivity.

THE QUIZ FLOW:

1. LANDING PAGE (src/pages/index.astro):
   This is a STATIC Astro page — no React needed, no JavaScript shipped.
   - Bold, provocative hero: "Are You a Heretic?"
   - Subtitle: "Every Christian is — according to someone. Take the quiz to find out which councils would condemn you."
   - A big "Take the Quiz" CTA button (plain <a> tag linking to /quiz)
   - Brief explanation of what the quiz is (2-3 sentences)
   - Design: Dark background, slightly dramatic, with a hint of medieval manuscript aesthetic mixed with modern minimalism. Think old parchment textures meets clean typography.
   - Use the BaseLayout.astro wrapper for shared head/fonts/styles.

2. QUIZ PAGE (src/pages/quiz.astro → QuizContainer.tsx):
   quiz.astro is a thin Astro wrapper that imports and renders the React quiz island:

   ---
   import BaseLayout from '../layouts/BaseLayout.astro';
   import QuizContainer from '../components/quiz/QuizContainer';
   ---
   <BaseLayout title="Take the Quiz — Are You a Heretic?">
     <QuizContainer client:load />
   </BaseLayout>

   The QuizContainer React component handles everything from here:

   For each question:
   a) Show the question number, category badge, and question text
   b) Show 4 answer options as clickable cards
   c) When user clicks an answer:
      - The selected answer highlights
      - Other answers grey out
      - A REVEAL CARD animates in below (slide down + fade in, using Framer Motion)
      - The reveal card shows:
        * A provocative title (e.g., "Congratulations, you're a Sabellian!")
        * A heresy badge with the name and year condemned
        * The reveal explanation text (2-3 paragraphs)
        * A small "Learn More" link to the deep dive page (this is a regular <a> tag — it navigates to the Astro-rendered static page at /explore/[slug])
        * A "Next Question →" button
   d) Progress bar at the top showing question X of 18
   e) Running "condemnation counter" in the corner that ticks up as heresies accumulate

   IMPORTANT UX DETAILS:
   - The reveal card is the KEY moment — it should feel like a dramatic unveiling. Use animation timing to create a brief pause before the reveal (300ms delay, then slide in).
   - On mobile, the reveal should push content down smoothly, not overlay.
   - The answer cards should have a subtle hover effect and a satisfying click animation.
   - Use scroll-into-view to ensure the reveal card is visible after it appears.

   After Q18, save results to sessionStorage and navigate to /results using window.location.href (standard navigation, not React Router — we're navigating between Astro pages).

3. RESULTS PAGE (src/pages/results.astro → HeresyProfileCard.tsx):
   results.astro is another thin Astro wrapper hosting a React island:

   <HeresyProfileCard client:load />

   The React component reads results from sessionStorage and renders:
   a) "Your Heresy Profile" card:
      - List of all heresies triggered, each with the council/authority and year
      - Stats: "X councils would condemn you" (total across all types — ecumenical, anti-Nicene, regional, denominational)
      - Stats: "Including Y out of 7 ecumenical councils"
      - Stats: "And Z anti-Nicene councils (341–360 AD)" — this is new and important
      - Stats: "W confessions reject your views"
      - Stats: "Approximately V billion Christians would consider you a heretic"
      - These stats should animate/count up using Framer Motion
      - NOTE: Even someone who picks "orthodox" answers on Q1/Q2 should see anti-Nicene councils in their condemnation count. The whole point is that NO combination of answers escapes condemnation.
   b) The payoff message (full text in quiz design doc under "The Payoff Message")
   c) "Explore Your Heresies" section — cards linking to /explore/[slug] deep dive pages
   d) Share button (ShareButton.tsx component)
   e) "Retake Quiz" button (clears sessionStorage, navigates to /quiz)

COLOR PALETTE & DESIGN LANGUAGE:
- Background: Deep charcoal (#1a1a2e) with subtle parchment texture overlay
- Primary accent: Warm amber/gold (#d4a373) — like illuminated manuscript gold
- Secondary accent: Deep crimson (#8b0000) — for "condemned" badges
- Text: Warm white (#f5f0e8) for body, bright white for headers
- Cards: Slightly lighter charcoal (#252547) with subtle border glow on hover
- "Heresy badges": Small pill-shaped badges with crimson background and gold text
- Typography: Use a serif font for headings (Playfair Display or Crimson Text from Google Fonts, loaded in BaseLayout.astro <head>) and a clean sans-serif for body (Inter)
- The overall vibe: scholarly but accessible, like a beautiful history book that doesn't take itself too seriously

Define the color palette in tailwind.config.mjs so it's available everywhere:
  theme: {
    extend: {
      colors: {
        charcoal: '#1a1a2e',
        'charcoal-light': '#252547',
        gold: '#d4a373',
        crimson: '#8b0000',
        parchment: '#f5f0e8',
      }
    }
  }

ANIMATIONS (Framer Motion — only inside React components):
- Answer selection: Scale down slightly on click, highlight color change
- Reveal card: SlideDown + FadeIn with 300ms delay after answer click
- Stats counter on results page: Count up from 0 to final number
- Progress bar: Smooth width transition

CSS TRANSITIONS (for Astro static pages, no JS needed):
- Hover effects on cards and buttons
- Subtle transitions on focus states

Make sure the quiz state persists if the user refreshes mid-quiz (use sessionStorage).
Build this mobile-first — the quiz should work beautifully on phones.
```

---

## PROMPT 4: Deep Dive Pages & Content (Astro Content Collections)

```
Build the deep dive / "explore" pages for the "Are You a Heretic?" site at /Users/paulrobson/Projects/are-you-a-heretic.

These pages use ASTRO CONTENT COLLECTIONS — they're static, pre-rendered at build time, and ship zero JavaScript. This is perfect for SEO-friendly long-form content.

STEP 1: Create MDX content files in src/content/heresies/ — one per heresy in the database. Each file has YAML frontmatter matching the Content Collection schema and MDX body content.

The frontmatter for each file:
---
title: "Arianism"
shortDescription: "Jesus was God's first creation — divine-ish, but not eternal"
condemnedBy: ["nicaea-i"]
yearCondemned: 325
category: "Christology"
relatedHeresies: ["subordinationism", "adoptionism", "efs"]
---

STEP 2: The MDX body for EACH heresy should include these sections:

## The Story
2-4 paragraphs, narrative style. Who was involved? What was the political context? What happened at the council? Who got exiled/executed/rehabilitated? Make it read like a fascinating history article.

## What the Council Actually Said
Key quotes from the canons, creeds, or anathemas — in a blockquote with source.

## Why You Might Accidentally Believe This
1-2 paragraphs on how this heresy shows up in modern churches, worship songs, sermons, or casual theology.

## The Strongest Case For This View
Present the heresy's own argument fairly. What genuine theological concern were they addressing?

## The Strongest Case Against
Why the council rejected it. What theological problem does it create?

## What the New Testament Actually Says
Relevant NT passages. Note where the NT is silent or ambiguous on the specific formulation. Gently highlight the gap between NT language and conciliar philosophical categories.

STEP 3: Build the dynamic route page at src/pages/explore/[slug].astro:

---
import { getCollection, getEntry } from 'astro:content';
import ContentLayout from '../../layouts/ContentLayout.astro';
import Badge from '../../components/ui/Badge.astro';

export async function getStaticPaths() {
  const heresies = await getCollection('heresies');
  return heresies.map(heresy => ({
    params: { slug: heresy.slug },
    props: { heresy },
  }));
}

const { heresy } = Astro.props;
const { Content } = await heresy.render();
---

This page should render:
- Hero section with heresy name, plain-English description, condemned-by badges, year
- The rendered MDX content (using <Content />)
- A sidebar (desktop) or collapsible nav (mobile) for jumping between sections
- Related heresies as linked cards at the bottom
- "Back to Quiz" and "Back to Results" navigation

STEP 4: Build the explore index at src/pages/explore/index.astro:
- List all heresies grouped by category (Christology, Trinity, Soteriology, etc.)
- Each heresy links to its deep dive page
- Visual timeline showing chronological placement of councils and condemnations
- This is a static Astro page — no React, no JS

STEP 5: Build the about page at src/pages/about.astro:
- What this site is (an interactive exploration of Christian doctrinal history)
- What it's NOT (an attack on faith — an invitation to intellectual humility)
- The core argument (orthodoxy is contextual and shifting)
- Credits and sources

DESIGN:
- Same color palette as the quiz (defined in Tailwind config)
- Long-form reading layout — max-width ~720px, generous line height
- Serif font for body text in content pages (Crimson Text or similar)
- Rich blockquote styling for historical quotes
- Static pages = pure CSS for all hover/transition effects

Generate all content from the research database (project-docs/01-research-database.md). Write engagingly — like a great history podcast in written form.
```

---

## PROMPT 5: Social Sharing, SEO & Polish

```
Add social sharing, SEO optimization, and final polish to the "Are You a Heretic?" Astro site at /Users/paulrobson/Projects/are-you-a-heretic.

1. SOCIAL SHARING (src/lib/sharing.ts + ShareButton.tsx React component):
   - Generate shareable text based on quiz results:
     "I took the 'Are You a Heretic?' quiz — I'm condemned by [X] ecumenical councils and [Y] confessions. [Top heresy name] is my biggest offense. Everyone's a heretic according to someone. areyouaheretic.com"
   - Copy-to-clipboard button
   - Native Web Share API (navigator.share) on mobile
   - Twitter/X share link with pre-filled text
   - Generate a results image using canvas or SVG — a "heresy profile card" that looks good when shared:
     * Dark background with the gold/crimson color scheme
     * User's top 3 heresies listed
     * Council condemnation count
     * Site URL

   NOTE ON OG IMAGES: Since Astro is static, we can't generate dynamic OG images server-side without an edge function. Two options:
   - Option A (simpler): Create a single compelling OG image for the site and use it everywhere. For results sharing, rely on the canvas-generated image + copy-to-clipboard.
   - Option B (if we want dynamic): Add a Vercel/Netlify edge function endpoint (src/pages/api/og.ts with Astro's server mode for just that route, or use @vercel/og as a standalone edge function) that generates dynamic OG images.
   - Implement Option A first. We can add Option B later if needed.

2. SEO & METADATA (in BaseLayout.astro and per-page):
   - <head> meta tags: title, description, og:title, og:description, og:image, twitter:card
   - Each deep dive page gets its own meta description (from frontmatter shortDescription)
   - JSON-LD structured data on deep dive pages (Article schema)
   - Auto-generate sitemap using @astrojs/sitemap integration (`npx astro add sitemap`)
   - robots.txt via a static file in public/

3. ACCESSIBILITY:
   - Full keyboard navigation through the quiz (React components)
   - Proper ARIA labels on interactive elements
   - Focus management (focus moves to reveal card after answer, to results after final question)
   - Screen reader announcements for quiz state changes (aria-live regions)
   - Reduced motion preferences respected (prefers-reduced-motion media query in CSS, and check in Framer Motion with useReducedMotion hook)
   - Color contrast meeting WCAG AA for all text/background combinations

4. PERFORMANCE:
   - Astro already gives us zero-JS static pages — verify with Lighthouse
   - Optimize any images/textures (use Astro's built-in image optimization if using images)
   - Ensure the React quiz bundle is reasonable (<100KB gzipped)
   - Prefetch deep dive page links from the results page using Astro's prefetch

5. FINAL POLISH:
   - 404 page (src/pages/404.astro): "This page has been condemned by the Council of HTTP (404 AD)" — with a link back to the quiz. Make it funny.
   - Smooth scroll behavior (CSS scroll-behavior: smooth on html)
   - Favicon — create a simple SVG flame icon in public/favicon.svg
   - Print stylesheet for results page
   - View Transitions: Add Astro View Transitions (<ViewTransitions />) in BaseLayout.astro for smooth page-to-page navigation. This gives us SPA-like transitions between the static pages without a JS framework.

6. DEPLOYMENT PREP:
   - Verify `npm run build` succeeds and `npm run preview` works
   - Default Astro output is 'static' — verify all pages pre-render correctly
   - Add a site URL in astro.config.mjs for sitemap generation:
     site: 'https://areyouaheretic.com'
   - Add a README.md with:
     * Project description
     * Setup: npm install && npm run dev
     * Build: npm run build
     * Architecture: Astro static + React islands
     * Deployment: any static host (Vercel, Netlify, Cloudflare Pages)
```

---

## PROMPT 6 (Optional): Advanced Features

```
Add these advanced features to the "Are You a Heretic?" Astro site at /Users/paulrobson/Projects/are-you-a-heretic:

1. HERESY MAP / TIMELINE (src/pages/explore/index.astro or a React island):
   Create an interactive timeline visualization showing ALL heresies and councils chronologically.
   - If the timeline is read-only/static, build it as a pure Astro/CSS component (no JS)
   - If it needs interactivity (click to expand, filter, highlight user's results), build as a React island
   - Each point on the timeline is a council or major event
   - Clicking a point shows a summary card or links to the deep dive
   - Lines connect related heresies (e.g., Arianism → Subordinationism → EFS)
   - Color-code by category (Christology = blue, Soteriology = green, etc.)
   - If the user has quiz results in sessionStorage, highlight their personal heresies on the timeline

2. "HERESY VENN DIAGRAM" (React island):
   An interactive visualization showing how different Christian traditions overlap and diverge:
   - Catholic circle, Orthodox circle, Reformed circle, Arminian circle, Anabaptist circle
   - Show which heresies each tradition condemns
   - Show where they overlap (everyone condemns Arianism) and diverge (Catholic/Protestant on justification)
   - The user's position is plotted based on their quiz answers
   - Use SVG or canvas for the visualization

3. "COMPARE WITH A FRIEND" (React island + URL encoding):
   - After completing the quiz, generate a unique shareable link with base64-encoded results in the URL hash
   - When a friend completes the quiz and visits /results#compare=<encoded>, show both heresy profiles side by side
   - No server needed — all state is in the URL and sessionStorage
   - Highlight where they agree and diverge
   - Show which traditions would accept one but condemn the other

4. QUIZ VARIANTS:
   - "Quick Mode" — 8 questions hitting the major categories (separate question set in src/data/questions-quick.ts)
   - "Scholar Mode" — 25+ questions with more nuanced options (src/data/questions-scholar.ts)
   - "Denomination Mode" — after the quiz, map results to "You'd be most at home in [denomination]" based on which tradition condemns the fewest of your views
   - Mode selection on the quiz start page or landing page
```

---

## BUILD ORDER

Feed these prompts to Claude Code in order:
1. **Prompt 1** → Astro project scaffolding, React integration, types, content collections (foundation)
2. **Prompt 2** → All quiz content data (the substance)
3. **Prompt 3** → Landing page (Astro static) + interactive quiz UI (React island) + results page (React island)
4. **Prompt 4** → Deep dive content in MDX + explore pages + about page (all Astro static)
5. **Prompt 5** → Sharing, SEO, View Transitions, polish (the reach)
6. **Prompt 6** → Advanced features (the extras — optional)

Then apply these fix/enhancement prompts (in project-docs/):
7. **04-anti-nicene-fix-prompt.md** → Add anti-Nicene councils, fix Q1/Q2 so no answer is safe
8. **05-articles-and-seo-prompt.md** → Add articles section, "Am I a Heretic?" phrasing, internal linking, content hub SEO strategy

After each prompt, review what Claude Code built, test it, and note any adjustments before moving to the next prompt.

## TIPS FOR WORKING WITH CLAUDE CODE

- If a prompt is too long for a single message, split it at natural boundaries (e.g., separate the data population from the UI build).
- After Prompt 2 (data), verify all 18 questions are present and the reveal text is engaging. This is the hardest part to get right and may need iteration.
- After Prompt 3 (UI), test on mobile immediately. The quiz UX is everything.
- If Claude Code makes assumptions you don't like, correct them in the next prompt rather than re-doing the whole step.
- Keep the project-docs folder in the project root so Claude Code can reference them.
- **Astro-specific tip:** If you see hydration errors, make sure React components that need browser APIs (sessionStorage, window) have `client:load` or `client:only="react"` directives. Data-only imports from src/data/ work fine in both Astro and React contexts.
- **Content tip:** If the MDX files are too long for a single prompt, ask Claude Code to generate them in batches (e.g., "Generate the MDX content for the first 8 heresies").

## KEY ARCHITECTURE REFERENCE

| What | Technology | Ships JS? |
|------|-----------|-----------|
| Landing page | Astro (.astro) | No |
| Quiz page | Astro shell + React island | Yes (quiz bundle) |
| Results page | Astro shell + React island | Yes (results bundle) |
| Deep dive pages | Astro + MDX Content Collections | No |
| Article pages | Astro + MDX Content Collections | No |
| Articles index | Astro (.astro) | No |
| Explore index | Astro (.astro) | No (unless timeline is interactive) |
| About page | Astro (.astro) | No |
| 404 page | Astro (.astro) | No |
| Shared data | TypeScript (.ts) | Bundled where needed |
| Animations | Framer Motion (React) + CSS transitions (Astro) | Only in React islands |
