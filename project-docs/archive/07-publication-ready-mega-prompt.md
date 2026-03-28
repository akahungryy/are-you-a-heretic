# Claude Code Mega-Prompt: Build All Pages to Publication Quality

## Context

This is a comprehensive prompt for Claude Code to take the existing "Are You a Heretic?" Astro + React site and bring **every page** to publication-ready quality. The site exists at `/Users/paulrobson/Projects/are-you-a-heretic`. The project scaffolding, data layer, and basic components have been built via earlier prompts. This prompt audits everything, fills gaps, fixes issues, and polishes every page to a standard ready for public launch — including the advanced features (timeline, Venn diagram, comparison mode, quiz variants).

Read the design docs in `project-docs/` first:
- `01-research-database.md` — canonical historical data (including SECTION 1B: anti-Nicene councils)
- `02-quiz-design.md` — all 18 questions, reveals, results page design, payoff message
- `reference-anti-nicene-councils-research.md` — detailed anti-Nicene council research

---

## PHASE 1: AUDIT & FIX FOUNDATIONS

Before building anything new, audit and fix the existing codebase. Run `npm run build` and `npm run dev` first to see what's broken.

### 1.1 Data Integrity Check

Verify all data files in `src/data/`:

**councils.ts** must contain ALL of these councils (check each one exists, has correct data):
- 7 ecumenical councils: nicaea-i (325), constantinople-i (381), ephesus (431), chalcedon (451), constantinople-ii (553), constantinople-iii (680), nicaea-ii (787)
- 13 anti-Nicene councils (type: 'anti-nicene'): tyre-335, antioch-341, sardica-east-343, arles-353, milan-355, sirmium-i-347, sirmium-ii-351, sirmium-iii-357, ancyra-358, sirmium-v-359, rimini-359, seleucia-359, constantinople-360
- Each anti-Nicene council must have: imperialBacking, theologicalPosition, coerced fields
- Regional/denominational councils: orange-529, carthage-418, trent, dort-1618, lateran-iv-1215, constantinople-553-origen, vatican-i-1870, frankfurt-794, etc. (any council referenced by a quiz answer must exist here)

**questions.ts** must contain ALL 18 questions with:
- Every answer having: text, heresyTriggered, revealTitle, revealText, severity, councilIds (array — plural!), condemnedByCount
- Q1 and Q2 specifically: the Nicene answer (B) must trigger condemnation from 11 anti-Nicene councils. The subordinationist answer must trigger nicaea-i and constantinople-i. NO ANSWER IS SAFE.
- Every councilId referenced must exist in councils.ts
- Every heresyTriggered ID must exist in heresies.ts
- Reveal text quality check: Q1-5 should be witty/playful, Q6-12 informative/historically rich, Q13-18 thought-provoking. Every reveal should teach something surprising.

**heresies.ts** must contain entries for every heresy triggered by any quiz answer, including:
- nicene-trinitarianism (the special case — condemned 341-380)
- subordinationism, homoianism, homoiousian, anomoeanism
- All standard heresies: arianism, modalism, docetism, nestorianism, pelagianism, semi-pelagianism, marcionism, iconoclasm, etc.

**types.ts** must have the updated types:
- Council type includes: 'ecumenical' | 'anti-nicene' | 'regional' | 'denominational' | 'synod' | 'confession'
- Council has: imperialBacking?, theologicalPosition?, coerced?
- QuizAnswer has: councilIds (string array), condemnedByCount?
- QuizResult has: councilsAgainst, ecumenicalCouncilsAgainst, antiNiceneCouncilsAgainst, confessionsAgainst

**scoring.ts** must:
- Count anti-Nicene councils separately from ecumenical councils
- Calculate total = ecumenical + anti-Nicene + regional + denominational
- Ensure EVERY user sees at least some anti-Nicene councils (Q1/Q2 guarantee this)
- Calculate estimatedCondemnors string (e.g., "~1.5 billion Christians")

Fix any mismatches, missing data, or broken references before moving on.

### 1.2 Content Collections Check

Verify `src/content/config.ts` has both collections defined:
- `heresies` collection (for deep dive pages)
- `articles` collection (for the articles section)

Verify the articles collection schema includes: title, subtitle?, description, publishDate, category (enum), tags, relatedQuestions?, relatedHeresies?, featuredImage?

### 1.3 Build Check

Run `npm run build`. Fix ALL TypeScript errors and warnings. The site must build clean before proceeding.

---

## PHASE 2: EVERY PAGE TO PUBLICATION QUALITY

### 2.1 Landing Page (`src/pages/index.astro`)

This is STATIC — zero JavaScript shipped. It must be visually striking and SEO-optimized.

**Content requirements:**
- Hero title: "Are You a Heretic?"
- Subtitle: "Every Christian is — according to someone. Take the quiz to find out which councils would condemn you."
- Intro paragraph that naturally includes "Am I a heretic?" — e.g.: *"If you've ever wondered 'Am I a heretic?' — yes. You are. So is everyone else. The question isn't whether you hold views that were condemned by a church council. The question is how many councils, and which ones."*
- CTA button: "Am I a Heretic? Take the Quiz" (links to /quiz)
- Secondary section: "Every Christian Is a Heretic According to Someone" — 3-4 sentences explaining the thesis. Naturally include SEO phrases: "heresy quiz," "Christian theology quiz," "which heresy am I," "church councils"
- "Featured Articles" section — 3 article cards (most compelling, not just most recent)
- Footer with navigation

**Design requirements:**
- Background: Deep charcoal (#1a1a2e) with subtle parchment texture overlay (CSS-only — use a repeating subtle noise/grain pattern or a CSS gradient that evokes parchment, NOT an image file)
- Gold accent (#d4a373) for the CTA and headings
- Typography: Playfair Display (or Crimson Text) for headings, Inter for body — loaded via Google Fonts in BaseLayout.astro `<head>`
- The hero should feel dramatic — like opening a forbidden manuscript. Use generous whitespace, large type, subtle text-shadow.
- Mobile-first: the hero must look great on a phone screen

**SEO:**
- `<title>`: "Are You a Heretic? — Every Christian Is, According to Someone"
- Meta description: "Take the heresy quiz and discover which church councils would condemn your beliefs. 18 questions, 2000 years of controversy, zero safe answers."
- og:title, og:description, og:image (use a static OG image — create a simple one in public/og-image.png or generate via SVG)

### 2.2 Quiz Page (`src/pages/quiz.astro` → `QuizContainer.tsx`)

The Astro page is a thin shell. The React island handles everything.

**QuizContainer.tsx** — the main state machine:
- State: currentQuestion (0-17), answers (Record<number, string>), showReveal (boolean), isComplete (boolean)
- On mount: check sessionStorage for in-progress quiz state, restore if present
- On each answer selection: save state to sessionStorage
- After Q18: calculate results via scoring.ts, save to sessionStorage, navigate to /results via window.location.href

**QuestionCard.tsx:**
- Question number and total ("Question 3 of 18")
- Category badge (e.g., "Trinity", "Soteriology") — styled as a small pill with gold text on charcoal-light background
- Question text — large, readable, serif font
- Clean, spacious layout

**AnswerOption.tsx:**
- 4 clickable cards per question
- Subtle hover effect (slight scale + border glow)
- Click animation (scale down briefly)
- After selection: selected answer highlights with gold border, other answers grey out (reduced opacity)
- Disabled state after selection — no double-clicking

**RevealCard.tsx** — THE key moment:
- 300ms delay after answer selection, then slide-down + fade-in (Framer Motion)
- Provocative title (from revealTitle): large, crimson text
- Heresy badge: pill-shaped, crimson background, gold text, shows heresy name + year
- ALL condemning councils listed — if many (e.g., the 11 anti-Nicene councils for the Nicene answer), display as a scrollable row of crimson badges or a compact list
- Reveal explanation text: 2-3 paragraphs, well-formatted, engaging
- "Learn More" link → /explore/[slug] (the deep dive page)
- If a relevant article exists, "Read the full story" link → /articles/[slug]
- "Next Question →" button (gold background, prominent)
- Auto scroll-into-view so the reveal card is visible on mobile

**ProgressBar.tsx:**
- Thin bar at top of quiz area
- Smooth width transition (CSS transition or Framer Motion)
- Shows fraction: "3/18"

**AnimatedCounter.tsx:**
- Small persistent element (top-right corner or below progress bar)
- Shows running condemnation count that ticks up as heresies accumulate
- Framer Motion count-up animation

**UX details:**
- Mobile-first: quiz must work beautifully on phones. Cards should be full-width on mobile, comfortable tap targets.
- Keyboard accessible: Tab through answers, Enter to select, focus management moves to reveal card after selection
- ARIA: aria-live region for quiz state changes, proper labels on all interactive elements
- prefers-reduced-motion: check with Framer Motion's useReducedMotion hook — skip animations if preferred
- Session persistence: quiz state survives page refresh via sessionStorage

**Quiz page SEO:**
- `<title>`: "Am I a Heretic? Take the Quiz — Are You a Heretic?"
- Meta description: "Find out which church councils would condemn your beliefs. Every answer triggers a historical condemnation — there is no safe option. A theology quiz 2000 years in the making."

### 2.3 Results Page (`src/pages/results.astro` → `HeresyProfileCard.tsx`)

Another thin Astro shell with a React island.

**HeresyProfileCard.tsx:**
- Reads quiz results from sessionStorage
- If no results found: show message + link back to /quiz
- "YOUR HERESY PROFILE" header

**Stats section** (animated count-up with Framer Motion):
- Total councils against (the big number)
- Breakdown: "X ecumenical councils" / "Y anti-Nicene councils (341-360 AD)" / "Z confessions & regional councils"
- "Approximately N billion Christians would consider you a heretic"
- Each stat animates from 0 to final number on mount

**Contextual commentary for Q1/Q2 results:**
- If user picked Nicene (Q1B/Q2B): "Your Trinitarian beliefs are now considered orthodox — but 10+ councils between 341-360 AD condemned them as heretical. For 20 years, YOU would have been the heretic."
- If user picked subordinationist (Q1C/Q2D): "Your view of the Trinity was the official position of the Roman Empire from 360-380 AD. Then Constantinople (381) happened, and you became a heretic overnight."

**Heresy list:**
- Each heresy triggered, shown as a card with: heresy name, short description, condemning council(s), year
- Styled with the crimson/gold badge aesthetic

**The Payoff Message** — this is CRITICAL, it's the rhetorical climax. Use the exact text from the quiz design doc (02-quiz-design.md, "The Payoff Message" section). Style it as a beautiful, spacious blockquote area with serif font, generous line-height. This should feel like reading a manifesto.

**Explore Your Heresies section:**
- Cards linking to /explore/[slug] for each heresy the user triggered
- Styled as a grid of clickable cards

**Share functionality (ShareButton.tsx):**
- Generate shareable text: "I took the 'Are You a Heretic?' quiz — I'm condemned by [X] councils and [Y] confessions. [Top heresy] is my biggest offense. Everyone's a heretic according to someone. areyouaheretic.com"
- Copy-to-clipboard button (with "Copied!" feedback)
- Native Web Share API on mobile (navigator.share)
- Twitter/X share link with pre-filled text
- Canvas-generated "heresy profile card" image:
  - Dark background (#1a1a2e), gold (#d4a373) and crimson (#8b0000) accents
  - User's top 3 heresies
  - Council condemnation count
  - Site URL
  - Downloadable as PNG

**"Retake Quiz" button** — clears sessionStorage, navigates to /quiz

### 2.4 Deep Dive / Explore Pages

#### Explore Index (`src/pages/explore/index.astro`) — STATIC
- All heresies grouped by category: Trinity, Christology, Soteriology, Ecclesiology, Sacraments, Eschatology, Authority, Modern Controversies
- Each heresy links to its deep dive page
- Visual timeline showing councils and condemnations chronologically (more on this in Phase 3)
- Anti-Nicene councils should be visually distinct (different color or "contested" marker)

#### Deep Dive Pages (`src/pages/explore/[slug].astro`) — STATIC
- Generated from MDX files in src/content/heresies/
- Every heresy in the database must have an MDX file

**Each MDX file must have these sections (all well-written, 800-1500 words total):**

1. **## The Story** — 2-4 paragraphs, narrative style. Who, what, when, political context, what happened at the council, who got exiled/executed/rehabilitated.
2. **## What the Council Actually Said** — Key quotes from canons/creeds/anathemas in blockquotes with source attribution.
3. **## Why You Might Accidentally Believe This** — 1-2 paragraphs on how this heresy shows up in modern churches, worship songs, sermons, casual theology.
4. **## The Strongest Case For This View** — Fair presentation of the heresy's own argument. What genuine theological concern were they addressing?
5. **## The Strongest Case Against** — Why the council rejected it. What theological problem does it create?
6. **## What the New Testament Actually Says** — Relevant NT passages. Note where the NT is silent or ambiguous on the specific formulation. Highlight the gap between NT language and conciliar philosophical categories.
7. **## Further Reading** — Links to related articles (query the articles collection for matching relatedHeresies)

**Ensure MDX content exists for ALL heresies, including the anti-Nicene additions:**
- arianism.mdx
- modalism.mdx (Sabellianism)
- subordinationism.mdx
- homoianism.mdx (KEY deep dive — the 20-year imperial faith)
- homoiousian.mdx (Semi-Arianism)
- nicene-trinitarianism.mdx (the special case: "when orthodoxy was heresy")
- docetism.mdx
- nestorianism.mdx
- monophysitism.mdx
- apollinarianism.mdx
- pelagianism.mdx
- semi-pelagianism.mdx
- adoptionism.mdx
- marcionism.mdx
- iconoclasm.mdx
- universalism.mdx (apokatastasis)
- annihilationism.mdx
- monothelitism.mdx
- montanism.mdx
- efs.mdx (Eternal Functional Subordination)
- Any other heresy triggered by quiz answers

**For homoianism.mdx specifically** — this is the most important deep dive. Include:
- The narrative arc: Nicaea (325) → anti-Nicene reaction → Constantius II's enforcement → the Cappadocian resolution → Constantinople (381)
- The Council of Rimini story (400 bishops coerced)
- Jerome's quote and its context
- The theological spectrum (homoousios → homoiousios → homoios → anomoios)
- How the hypostasis/ousia confusion was resolved by the Cappadocians
- Why this matters: "orthodoxy" was decided by which emperor was in power

**Design for deep dive pages:**
- ContentLayout.astro: max-width ~720px, generous line height (1.8), serif font for body
- Hero section with heresy name, plain-English description, condemned-by badges, year
- Rendered MDX content via `<Content />`
- Sidebar (desktop) or collapsible nav (mobile) for jumping between sections
- Related heresies as linked cards at the bottom
- "Back to Quiz" and "Back to Results" navigation
- Rich blockquote styling for historical quotes (left gold border, slightly inset, italic)

### 2.5 Articles Section

#### Articles Index (`src/pages/articles/index.astro`) — STATIC
- Grid/list of all articles, sorted by publishDate
- Each card: title, description, category badge, publish date
- Page title: "Articles on Christian Heresies & Church History — Are You a Heretic?"

#### Article Pages (`src/pages/articles/[slug].astro`) — STATIC
- Same ContentLayout as deep dives
- JSON-LD Article structured data in `<head>`
- Quiz CTA at the bottom of every article: "Think you'd escape condemnation? [Am I a Heretic? Take the Quiz →](/quiz)"
- Related articles section
- Related heresy deep dive links (from frontmatter relatedHeresies)
- If relatedQuestions exists: "This article relates to Question X of the quiz"

#### Write ALL 8 Articles (800-1500 words each, engaging, accessible, historically rigorous):

**Article 1: "The 20 Years When Orthodox Christianity Was Heretical"**
- Filename: when-orthodox-was-heretical.mdx
- Category: history
- Tags: ["anti-Nicene councils", "Arian controversy", "4th century Christianity", "homoousios"]
- The narrative: Nicaea (325) → anti-Nicene dominance (341-360) → Constantinople (381). The Rimini story. Jerome's quote. The Cappadocian resolution. Hook: the belief most Christians consider most basic was officially heretical for 20 years.
- relatedQuestions: [1, 2], relatedHeresies: ["nicene-trinitarianism", "arianism", "subordinationism", "homoianism"]

**Article 2: "The Council of Rimini: When 400 Bishops Were Bullied Into Heresy"**
- Filename: council-of-rimini.mdx
- Category: history
- Tags: ["Council of Rimini", "359 AD", "Constantius II", "church council coercion"]
- Focus: 400 Western bishops arrive, vote FOR Nicaea. Imperial envoys arrive. Bishops detained, delayed, threatened. They sign an anti-Nicene formula.
- relatedQuestions: [1, 2], relatedHeresies: ["homoianism", "nicene-trinitarianism"]

**Article 3: "What Is Arianism? A Simple Explanation"**
- Filename: what-is-arianism-simple.mdx
- Category: explainer
- Tags: ["Arianism", "Arius", "Council of Nicaea", "what is Arianism"]
- Plain-English explainer. Arius's argument, Nicaea's response, what happened after. "There was a time when the Son was not." JW parallels, casual subordinationism today.
- relatedQuestions: [2], relatedHeresies: ["arianism"]

**Article 4: "Every Way to Be Wrong About the Trinity (And Why You Probably Are)"**
- Filename: trinity-heresy-explained.mdx
- Category: explainer
- Tags: ["Trinity", "modalism", "tritheism", "subordinationism", "trinity heresies"]
- Map ALL ways to get the Trinity "wrong": modalism, tritheism, subordinationism, Pneumatomachianism. Punchline: the "correct" formulation uses Greek philosophical categories not found in the Bible and took 350 years to settle.
- relatedQuestions: [1, 2, 18], relatedHeresies: ["modalism", "subordinationism", "arianism", "nicene-trinitarianism"]

**Article 5: "Is Universalism a Heresy?"**
- Filename: is-universalism-heresy.mdx
- Category: controversy
- Tags: ["universalism", "apokatastasis", "Origen", "hell", "will everyone be saved"]
- Origen, Constantinople II (553), Gregory of Nyssa, Rob Bell, David Bentley Hart. Fair to all sides.
- relatedQuestions: [12], relatedHeresies: ["universalism"]

**Article 6: "The Nicene Creed: What It Actually Says and Why It Matters"**
- Filename: nicene-creed-explained.mdx
- Category: explainer
- Tags: ["Nicene Creed", "homoousios", "filioque", "Nicene Creed explained"]
- Line-by-line breakdown. Each phrase as an anti-heresy weapon. The filioque split.
- relatedQuestions: [1, 2, 3], relatedHeresies: ["arianism", "modalism", "nicene-trinitarianism"]

**Article 7: "Why Are There So Many Christian Denominations?"**
- Filename: christian-denomination-differences.mdx
- Category: explainer
- Tags: ["Christian denominations", "denomination differences", "Catholic vs Protestant vs Orthodox"]
- Frame through the lens of heresy. East-West Schism, Reformation, Protestant fragmentation.
- relatedQuestions: [6, 9, 10, 13, 14, 15], relatedHeresies: []

**Article 8: "What Did Early Christians Actually Believe?"**
- Filename: what-did-early-christians-believe.mdx
- Category: history
- Tags: ["early Christianity", "early church beliefs", "pre-Nicene Christianity"]
- First-three-centuries diversity. "Orthodoxy" wasn't settled until the 4th century. Range of views on Christ's divinity. Canon still being debated.
- relatedQuestions: [1, 2, 6, 15], relatedHeresies: ["arianism", "adoptionism", "modalism", "docetism"]

**Writing guidelines for ALL articles:**
- Open with a hook — surprising fact, provocative question, or story
- Subheadings (##) every 200-300 words
- At least one blockquote from a primary source per article
- End with quiz CTA
- Intelligent non-specialist audience
- Historically rigorous — specific councils, dates, figures
- Tone: fascinated by history, respectful of belief, allergic to simplification

### 2.6 About Page (`src/pages/about.astro`) — STATIC

Content:
- What this site is: an interactive exploration of Christian doctrinal history
- What it's NOT: an attack on faith — an invitation to intellectual humility
- The core argument: orthodoxy is contextual and shifting; "heresy" describes the consensus of a particular community at a particular time
- How the quiz works: every answer triggers genuine condemnation from historical councils
- Credits and sources: list the major scholarly sources consulted
- Contact or feedback mechanism (even if just a mailto link)

### 2.7 404 Page (`src/pages/404.astro`) — STATIC

Make it funny: "This page has been condemned by the Council of HTTP (404 AD). It was found guilty of Not Existing and has been anathematized."
- Link back to the quiz, the explore index, and the landing page
- Same design language as rest of site

---

## PHASE 3: ADVANCED FEATURES

### 3.1 Interactive Timeline (`src/pages/explore/index.astro` or React island)

Build a chronological timeline visualization on the explore index page showing ALL heresies and councils.

**If interactive (recommended — build as a React island):**
- Each point = a council or major event (condemnation, schism, confession)
- Click a point → show summary card with: council name, year, what was condemned, link to deep dive
- Color-code by category (Christology = blue, Soteriology = green, Trinity = purple, etc.)
- Anti-Nicene councils (341-360) should be visually distinct — highlighted band or different color
- Lines/connections between related heresies (e.g., Arianism → Subordinationism → EFS)
- If user has quiz results in sessionStorage, highlight THEIR personal heresies on the timeline with a gold marker
- Responsive: horizontal scroll on desktop, vertical scroll on mobile
- Use SVG or canvas for the visualization

### 3.2 Heresy Venn Diagram (React island)

Build an interactive visualization showing how Christian traditions overlap and diverge.

**Location:** New page at `src/pages/explore/traditions.astro` (or embedded on the explore index)

**The diagram:**
- Overlapping circles: Catholic, Eastern Orthodox, Reformed/Calvinist, Arminian/Wesleyan, Anabaptist/Baptist
- Each circle lists the heresies that tradition condemns
- Overlapping regions show shared condemnations (e.g., everyone condemns Arianism)
- Non-overlapping regions show where they diverge (e.g., Catholics condemn Sola Scriptura, Protestants condemn Transubstantiation)
- The user's quiz results plotted as a dot showing which tradition they're CLOSEST to (and which condemns the fewest of their views)
- Use SVG for the visualization — Framer Motion for hover/click animations
- Clicking a circle or overlap region shows detail about those condemnations

### 3.3 Compare With a Friend (React island)

**On the results page**, add a "Compare With a Friend" feature:
- After completing the quiz, generate a shareable link: `/results#compare=<base64-encoded-answers>`
- The URL hash contains the full set of answers encoded in base64
- "Share Your Results" button that copies this comparison URL
- When a friend completes the quiz and visits `/results#compare=<encoded>`, show BOTH profiles side by side:
  - Your heresies vs. their heresies
  - Where you agree and where you diverge
  - Which traditions would accept one but condemn the other
  - A fun "heresy compatibility score"
- No server needed — all state lives in URL hash + sessionStorage
- Responsive: side-by-side on desktop, stacked on mobile

### 3.4 Quiz Variants

**Quick Mode (8 questions):**
- Create `src/data/questions-quick.ts` — 8 questions hitting major categories: Trinity (Q1), Christology (Q2), Atonement (Q4), Salvation (Q5), Bible (Q6), Communion (Q9), Hell (Q12), Predestination (Q14)
- These use the same data structure and heresy mappings as the full quiz

**Scholar Mode (25+ questions):**
- Create `src/data/questions-scholar.ts` — the 18 base questions PLUS 7+ additional nuanced questions:
  - Filioque clause (does the Spirit proceed from the Father alone, or Father AND Son?)
  - Monothelitism (did Jesus have one will or two?)
  - Nestorianism vs Monophysitism (how exactly are the two natures united?)
  - Justification (forensic declaration vs. transformative process?)
  - Original sin (inherited guilt vs. inherited tendency?)
  - Predestination of the reprobate (supralapsarianism vs. infralapsarianism?)
  - Mary (perpetual virginity, immaculate conception, assumption?)

**Denomination Mode:**
- After quiz completion, an additional results section: "Based on your answers, you'd be most at home in [denomination]"
- Calculate by counting which tradition condemns the FEWEST of the user's views
- Show a ranked list: "1. Eastern Orthodox (3 condemnations) 2. Anglican (5 condemnations) 3. Reformed (7 condemnations)..."

**Mode selection:**
- Quiz start page (before Q1) shows mode selector: Quick (8 Qs, ~3 min) | Standard (18 Qs, ~10 min) | Scholar (25+ Qs, ~15 min)
- Default to Standard
- Store selected mode in quiz state

---

## PHASE 4: SEO, ACCESSIBILITY & POLISH

### 4.1 SEO

**Per-page metadata** (every page needs title, description, og:title, og:description, og:image, twitter:card):
- Implement via props in BaseLayout.astro: `<BaseLayout title="..." description="..." ogImage="...">`
- Each deep dive page: title = heresy name, description = shortDescription from frontmatter
- Each article: title from frontmatter, description from frontmatter

**JSON-LD structured data:**
- Deep dive pages: Article schema
- Article pages: Article schema with datePublished
- Quiz page: WebApplication schema
- Landing page: WebSite schema with SearchAction

**Sitemap:** Verify @astrojs/sitemap is installed and generating sitemap.xml including ALL pages (deep dives, articles, explore, quiz, results, about)

**robots.txt** in public/: allow all, point to sitemap

**Canonical URLs:** Every page gets `<link rel="canonical">` pointing to `https://areyouaheretic.com/[path]`

**Internal linking web:**
- Articles → quiz CTA at bottom of every article
- Articles → deep dives (inline links when mentioning a heresy)
- Deep dives → articles (Further Reading section, query articles collection for matches)
- Deep dives → quiz ("Back to Quiz")
- Quiz reveal cards → deep dives ("Learn More") AND relevant articles ("Read the full story")
- Landing page → featured articles
- All pages → header navigation: Quiz | Explore | Articles | About

### 4.2 Accessibility

- Full keyboard navigation through the quiz (Tab, Enter, arrow keys)
- ARIA labels on all interactive elements
- Focus management: focus moves to reveal card after answer selection, to results summary after final question
- Screen reader announcements: aria-live regions for quiz state changes
- prefers-reduced-motion: respected in both CSS transitions and Framer Motion (useReducedMotion hook)
- Color contrast: WCAG AA for ALL text/background combinations — verify gold (#d4a373) on charcoal (#1a1a2e) meets 4.5:1 ratio; if not, lighten the gold slightly
- Alt text on any images/SVGs

### 4.3 Performance

- Astro static pages = zero JS by default — verify with Lighthouse
- React quiz bundle should be < 100KB gzipped — check with `npm run build` output
- Prefetch deep dive links from results page: use Astro's `<link rel="prefetch">` or the prefetch integration
- Google Fonts: use `display=swap` to prevent FOIT
- No unnecessary dependencies

### 4.4 Visual Polish

**Color palette** (defined in tailwind.config.mjs):
```
colors: {
  charcoal: '#1a1a2e',
  'charcoal-light': '#252547',
  gold: '#d4a373',
  'gold-light': '#e8c9a0',
  crimson: '#8b0000',
  'crimson-light': '#b22222',
  parchment: '#f5f0e8',
  'parchment-dark': '#d4cfc4',
}
```

**Typography:**
- Headings: Playfair Display (serif) — loaded from Google Fonts
- Body: Inter (sans-serif) — loaded from Google Fonts
- Content pages (deep dives, articles): Crimson Text or Playfair Display for body text (serif for readability of long-form content)

**Animations (React components only — Framer Motion):**
- Answer selection: scale(0.98) on click, gold border highlight
- Reveal card: slideDown + fadeIn, 300ms delay
- Results stats: count up from 0
- Progress bar: smooth width transition

**CSS transitions (Astro static pages — no JS):**
- Hover effects: cards scale slightly, border glow
- Button hover: subtle brightness change
- Focus: visible focus ring in gold

**Favicon:** Create `public/favicon.svg` — a simple stylized flame icon in crimson/gold

**View Transitions:** Add `<ViewTransitions />` from `astro:transitions` in BaseLayout.astro for smooth SPA-like page-to-page navigation

**Smooth scroll:** `html { scroll-behavior: smooth; }` in global CSS

**Print stylesheet:** Basic print styles for the results page

### 4.5 Navigation

**Header.astro:**
- Site name/logo: "Are You a Heretic?" — links to /
- Nav items: Quiz | Explore | Articles | About
- Mobile: hamburger menu or collapsible nav
- Sticky header on scroll (CSS only — `position: sticky`)

**Footer.astro:**
- Navigation links
- "Built with historical sass and intellectual humility" or similar
- Copyright

### 4.6 Deployment Prep

- `astro.config.mjs`: set `site: 'https://areyouaheretic.com'`
- `npm run build` succeeds with zero errors
- `npm run preview` serves the site correctly
- All pages render, all links work, all data references resolve
- README.md with: project description, setup (npm install && npm run dev), build (npm run build), architecture notes, deployment instructions

---

## PHASE 5: FINAL VERIFICATION CHECKLIST

After all work is done, verify each of these:

- [ ] `npm run build` — zero errors
- [ ] `npm run preview` — site loads, all pages accessible
- [ ] Landing page: hero renders, CTA works, "Am I a heretic?" phrasing present, featured articles show
- [ ] Quiz: all 18 questions present, every answer triggers reveal with correct heresy/councils
- [ ] Quiz Q1B: Nicene answer shows 11 anti-Nicene council condemnations
- [ ] Quiz Q2B: Nicene answer shows anti-Nicene condemnations
- [ ] Quiz: session persistence works (refresh mid-quiz, state preserved)
- [ ] Quiz: mobile layout works (test at 375px width)
- [ ] Results: stats animate, all heresies listed, payoff message present, share button works
- [ ] Results: anti-Nicene commentary appears for Q1/Q2 choices
- [ ] Results: compare-with-friend URL generation works
- [ ] Deep dives: every heresy has a page, content is substantive (800+ words), all sections present
- [ ] Deep dives: homoianism.mdx is the flagship page with full narrative
- [ ] Articles: all 8 articles present, well-written, quiz CTA at bottom of each
- [ ] Articles index: lists all articles with metadata
- [ ] Explore index: timeline visualization works, councils displayed
- [ ] Venn diagram: traditions visualization renders, user results plotted
- [ ] Quiz variants: Quick/Standard/Scholar mode selector works, each mode has correct questions
- [ ] Denomination mode: shows tradition ranking on results page
- [ ] About page: renders with correct content
- [ ] 404 page: renders with humor
- [ ] Navigation: header links work on all pages, mobile menu works
- [ ] Internal links: articles ↔ deep dives ↔ quiz all connected
- [ ] SEO: every page has title, description, og tags, canonical URL
- [ ] SEO: JSON-LD on deep dives and articles
- [ ] SEO: sitemap.xml includes all pages
- [ ] Accessibility: keyboard navigation through quiz, ARIA labels, focus management
- [ ] Accessibility: color contrast passes WCAG AA
- [ ] Performance: static pages ship zero JS, quiz bundle < 100KB gzipped
- [ ] View Transitions: smooth page-to-page navigation
- [ ] Favicon: renders in browser tab

---

## CRITICAL DESIGN PRINCIPLES — NEVER VIOLATE THESE

1. **NO ANSWER IS SAFE.** Every quiz answer triggers condemnation from specific, named historical councils. The Nicene "orthodox" answers are condemned by anti-Nicene councils. This is the entire thesis.

2. **NEVER frame any answer as "orthodox."** Always attribute to historical source/date. Say "The Nicene position (325/381)" not "the orthodox view." Orthodoxy is contextual — that's the point.

3. **HISTORICALLY RIGOROUS.** Every condemnation, every council, every date must be accurate. Don't hand-wave. Cite specifics.

4. **ENGAGING, NOT ACADEMIC.** Write like a great history podcast, not a textbook. Witty where appropriate, always accessible, never condescending.

5. **RESPECTFUL OF FAITH.** We're not mocking anyone's beliefs. We're showing that the history of doctrine is far messier and more fascinating than most people realize. The goal is intellectual humility, not cynicism.

6. **ASTRO STATIC + REACT ISLANDS.** Static pages ship zero JS. Only the quiz and results pages ship React. Don't break this architecture.
