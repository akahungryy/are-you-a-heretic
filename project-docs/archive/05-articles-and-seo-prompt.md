# Claude Code Prompt: Articles Section & SEO Content Strategy

## Context

Feed this prompt to Claude Code AFTER the core build and anti-Nicene fix (Prompts 1-5 + Prompt 04). It adds an articles/blog section to capture organic search traffic from people Googling theological questions, and places "Am I a Heretic?" prominently to capture that search variant alongside the main "Are You a Heretic?" branding.

---

## THE PROMPT

```
I need to add an articles section and improve SEO discoverability for the "Are You a Heretic?" site at /Users/paulrobson/Projects/are-you-a-heretic. Read the research database at project-docs/01-research-database.md for historical content.

There are THREE things to do: add the "Am I a Heretic?" phrasing in key places, build the articles section, and wire up the internal linking.

### 1. Add "Am I a Heretic?" to the Landing Page and Quiz

The site is called "Are You a Heretic?" but people also search "Am I a heretic?" — we need both phrasings visible to Google.

ON THE LANDING PAGE (src/pages/index.astro):
- The hero title stays: "Are You a Heretic?"
- Below the subtitle, add a short intro paragraph that naturally includes "Am I a heretic?" as a question the visitor is asking themselves. Something like:

  "If you've ever wondered 'Am I a heretic?' — yes. You are. So is everyone else. The question isn't whether you hold views that were condemned by a church council. The question is how many councils, and which ones."

- The CTA button text should be: "Am I a Heretic? Take the Quiz"
  (This captures the first-person search variant right on the clickable element)

- Add a secondary section below the CTA with the heading "Every Christian Is a Heretic According to Someone" — a 3-4 sentence explanation of the site's thesis. This text should naturally include phrases like "heresy quiz," "Christian theology quiz," "which heresy am I," and "church councils" for SEO without sounding stuffed. Write it for humans first, search engines second.

ON THE QUIZ PAGE (src/pages/quiz.astro):
- The page <title> tag should be: "Am I a Heretic? Take the Quiz — Are You a Heretic?"
- The meta description should be: "Find out which church councils would condemn your beliefs. Every answer triggers a historical condemnation — there is no safe option. A theology quiz 2000 years in the making."

### 2. Build the Articles Section

ARCHITECTURE:
Articles use Astro Content Collections, just like the heresy deep dives. They're static, pre-rendered, zero-JS pages — perfect for SEO. They live in a separate collection from the heresy deep dives.

FILE STRUCTURE — add these:
src/
  content/
    articles/                         # New content collection
      when-orthodox-was-heretical.mdx
      council-of-rimini.mdx
      what-is-arianism-simple.mdx
      trinity-heresy-explained.mdx
      is-universalism-heresy.mdx
      nicene-creed-explained.mdx
      christian-denomination-differences.mdx
      what-did-early-christians-believe.mdx
  pages/
    articles/
      index.astro                     # Articles listing page
      [slug].astro                    # Dynamic article pages

CONTENT COLLECTION CONFIG — update src/content/config.ts:

Add a new collection alongside the existing heresies collection:

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),           // Used for meta description
    publishDate: z.date(),
    category: z.enum(['history', 'theology', 'explainer', 'controversy']),
    tags: z.array(z.string()),         // SEO keywords
    relatedQuestions: z.array(z.number()).optional(),  // Quiz question IDs
    relatedHeresies: z.array(z.string()).optional(),   // Heresy IDs
    featuredImage: z.string().optional(),
  }),
});

export const collections = { heresies, articles };

ARTICLE PAGE TEMPLATE (src/pages/articles/[slug].astro):
- Use ContentLayout.astro (same as deep dive pages)
- Render the MDX content
- Add structured data (JSON-LD Article schema) in the <head>:
  * headline, datePublished, author ("Are You a Heretic?"), description
- At the bottom of every article, add a CTA box:
  "Think you'd escape condemnation? Take the quiz and find out."
  [Am I a Heretic? Take the Quiz →] (links to /quiz)
- Related articles sidebar/section
- Related heresy deep dive links (from frontmatter relatedHeresies)
- If the article has relatedQuestions, show a teaser: "This article relates to Question X of the quiz — want to see what the councils would say about YOUR answer?"

ARTICLES INDEX (src/pages/articles/index.astro):
- Grid/list of all articles, sorted by publishDate
- Each card shows: title, description, category badge, publish date
- Category filter (static — one page per category, or a simple CSS-only filter)
- Page title: "Articles — Are You a Heretic?"
- Meta description: "Deep dives into Christian heresies, church councils, and the messy history of orthodoxy. From Arianism to universalism, explore 2000 years of theological controversy."

### 3. Write the Articles

Generate FULL content for all 8 articles. Each should be 800-1500 words, written in an engaging, accessible style — like a great history podcast episode in written form. The tone should match the quiz: intellectually serious but not dry, slightly irreverent but never mocking.

ARTICLE 1: "The 20 Years When Orthodox Christianity Was Heretical"
- Filename: when-orthodox-was-heretical.mdx
- Category: history
- Tags: ["anti-Nicene councils", "Arian controversy", "4th century Christianity", "homoousios", "Constantius II", "was orthodoxy always orthodox"]
- Target search phrases: "was the trinity always orthodox", "when was arianism dominant", "anti-nicene councils"
- Content: The narrative arc from Nicaea (325) through the anti-Nicene dominance (341-360) to Constantinople (381). Lead with the hook: the belief most Christians consider the most basic — "three persons, one God" — was officially heretical across the Roman Empire for 20 years. Tell the Rimini story. Use Jerome's quote. End with the Cappadocian resolution.
- relatedQuestions: [1, 2]
- relatedHeresies: ["nicene-trinitarianism", "arianism", "subordinationism", "homoianism"]

ARTICLE 2: "The Council of Rimini: When 400 Bishops Were Bullied Into Heresy"
- Filename: council-of-rimini.mdx
- Category: history
- Tags: ["Council of Rimini", "359 AD", "Constantius II", "church council coercion", "Arian controversy"]
- Target search phrases: "council of rimini", "were church councils coerced", "how were heresies decided"
- Content: Focus entirely on this dramatic episode. 400 Western bishops arrive, vote FOR Nicaea. Imperial envoys arrive. Bishops are detained, delayed, threatened. They eventually sign a homoian formula rejecting the very creed they'd just affirmed. This is the most vivid illustration of how "orthodoxy" was decided by political power, not theological consensus.
- relatedQuestions: [1, 2]
- relatedHeresies: ["homoianism", "nicene-trinitarianism"]

ARTICLE 3: "What Is Arianism? A Simple Explanation"
- Filename: what-is-arianism-simple.mdx
- Category: explainer
- Tags: ["Arianism", "Arius", "Council of Nicaea", "what is Arianism", "is Arianism heresy"]
- Target search phrases: "what is arianism", "what did arius believe", "arianism explained simply", "is arianism a heresy"
- Content: Plain-English explainer. Who was Arius, what did he actually argue, why did it matter, what happened at Nicaea, what happened after. Include the famous slogan: "There was a time when the Son was not." Note that Arius's core concern — preserving God's uniqueness — was genuine, not silly. End with why it matters today (JW parallels, casual subordinationism in everyday Christianity).
- relatedQuestions: [2]
- relatedHeresies: ["arianism"]

ARTICLE 4: "Every Way to Be Wrong About the Trinity (And Why You Probably Are)"
- Filename: trinity-heresy-explained.mdx
- Category: explainer
- Tags: ["Trinity", "modalism", "tritheism", "subordinationism", "trinity heresies explained", "is the trinity biblical"]
- Target search phrases: "trinity heresies", "is the trinity in the bible", "modalism vs tritheism", "how to explain the trinity", "trinity heresy chart"
- Content: Map out ALL the ways to get the Trinity "wrong" according to various councils: modalism (one God in three modes), tritheism (three gods), subordinationism (hierarchy within the Godhead), Pneumatomachianism (denying the Spirit's divinity). For each, explain which council condemned it, who held it, and why someone might accidentally believe it. The punchline: the "correct" formulation (one ousia, three hypostaseis) took the Cappadocian Fathers decades to work out, uses categories from Greek philosophy that aren't in the Bible, and was only settled 350 years after Jesus.
- relatedQuestions: [1, 2, 18]
- relatedHeresies: ["modalism", "subordinationism", "arianism", "nicene-trinitarianism"]

ARTICLE 5: "Is Universalism a Heresy?"
- Filename: is-universalism-heresy.mdx
- Category: controversy
- Tags: ["universalism", "is universalism heresy", "will everyone be saved", "apokatastasis", "Origen", "hell"]
- Target search phrases: "is universalism heresy", "is universalism biblical", "did the church condemn universalism", "will everyone be saved"
- Content: This is one of the most-Googled theological questions. Cover: Origen's apokatastasis, the Fifth Ecumenical Council (553) and what it actually condemned (it's more complicated than people think), Gregory of Nyssa (a saint who held universalist views), the modern debate (Rob Bell, David Bentley Hart). Be fair to all sides. Note that the boundaries are fuzzier than most people assume.
- relatedQuestions: [12]
- relatedHeresies: ["universalism"]

ARTICLE 6: "The Nicene Creed: What It Actually Says and Why It Matters"
- Filename: nicene-creed-explained.mdx
- Category: explainer
- Tags: ["Nicene Creed", "what does the Nicene Creed mean", "homoousios", "Nicene Creed explained", "filioque"]
- Target search phrases: "nicene creed explained", "what does the nicene creed mean", "nicene creed simple explanation", "why is the nicene creed important"
- Content: Go through the Creed line by line and explain what each phrase was designed to exclude. "Begotten not made" = anti-Arian. "Of one substance with the Father" = homoousios, the most controversial word in Christian history. "Who proceeds from the Father [and the Son]" = the filioque clause that split East and West. Show that the Creed is not a generic statement of faith — it's a series of very specific anti-heresy weapons.
- relatedQuestions: [1, 2, 3]
- relatedHeresies: ["arianism", "modalism", "nicene-trinitarianism"]

ARTICLE 7: "Why Are There So Many Christian Denominations?"
- Filename: christian-denomination-differences.mdx
- Category: explainer
- Tags: ["Christian denominations", "why so many denominations", "denomination differences", "Catholic vs Protestant vs Orthodox"]
- Target search phrases: "why are there so many christian denominations", "difference between christian denominations", "how many christian denominations are there"
- Content: This is a high-volume search term. Frame it through the lens of heresy: every denomination split happened because one group considered another group's beliefs unacceptable. Start with the East-West Schism (1054), move through the Reformation, then the Protestant fragmentation. The thesis: denominations exist because "heresy" is always relative to your own tradition. Connect back to the quiz: the quiz doesn't pick a winner, it shows everyone is condemned by someone.
- relatedQuestions: [6, 9, 10, 13, 14, 15]
- relatedHeresies: []

ARTICLE 8: "What Did Early Christians Actually Believe?"
- Filename: what-did-early-christians-believe.mdx
- Category: history
- Tags: ["early Christianity", "what did early Christians believe", "early church beliefs", "pre-Nicene Christianity", "primitive Christianity"]
- Target search phrases: "what did early christians believe", "early christian beliefs", "did early christians believe in the trinity", "pre-nicene christianity"
- Content: This is the sleeper hit. Tons of people Google this. Cover: the diversity of belief in the first three centuries, the fact that "orthodoxy" wasn't settled until the 4th century (and even then was contested), the range of views on Christ's divinity before Nicaea, how the canon of Scripture was still being debated. Gently challenge the assumption that there was ever a single, unified "early church" that everyone agreed with. Reference Bart Ehrman's work on early Christian diversity alongside more traditional scholarship.
- relatedQuestions: [1, 2, 6, 15]
- relatedHeresies: ["arianism", "adoptionism", "modalism", "docetism"]

WRITING GUIDELINES FOR ALL ARTICLES:
- Open with a hook — a surprising fact, a provocative question, or a story
- Use subheadings (## ) every 200-300 words for scannability and SEO
- Include at least one blockquote from a primary source (council canon, church father, creed) per article
- End every article with a "Think you'd survive the councils?" CTA linking to the quiz
- Write for an intelligent non-specialist audience — no jargon without explanation
- Be historically rigorous. Cite specific councils, dates, and figures. Don't hand-wave.
- The tone is the site's tone: fascinated by history, respectful of belief, allergic to simplification

### 4. Internal Linking Strategy

This is critical for SEO. The site needs a web of internal links so Google understands the relationship between content.

LINK FROM ARTICLES → QUIZ:
- Every article ends with a quiz CTA (handled above)
- Inline links within article text: when an article mentions a specific heresy that maps to a quiz question, link to /quiz with anchor text like "find out what the councils would say about your view"

LINK FROM ARTICLES → DEEP DIVES:
- When an article mentions a heresy that has a deep dive page, link to /explore/[slug]
- Use the heresy name as anchor text (e.g., "Arianism" links to /explore/arianism)

LINK FROM DEEP DIVES → ARTICLES:
- At the bottom of each heresy deep dive page (src/pages/explore/[slug].astro), add a "Further Reading" section that links to any articles whose relatedHeresies includes that heresy's ID
- This requires querying the articles collection in the [slug].astro template

LINK FROM QUIZ REVEAL CARDS → ARTICLES:
- In RevealCard.tsx, if there's a relevant article for the heresy just revealed, show a small "Read more about this" link below the existing "Learn More" deep dive link
- This means the quiz data (questions.ts) may need an optional `relatedArticleSlug` field on answers, OR the component can look up articles by matching heresy IDs at build time

LINK FROM LANDING PAGE → ARTICLES:
- Add a "Featured Articles" section on the landing page (below the quiz CTA, above the footer)
- Show 3 article cards: the most recent or most compelling
- Heading: "Explore the History" or "From the Archives"

NAVIGATION:
- Add "Articles" to the site header navigation (Header.astro), between "Explore" and "About"
- The nav order should be: Quiz | Explore | Articles | About

### 5. SEO Metadata for Articles

Each article page should have in its <head>:
- <title>{article.title} — Are You a Heretic?</title>
- <meta name="description" content="{article.description}" />
- <meta property="og:title" content="{article.title}" />
- <meta property="og:description" content="{article.description}" />
- <meta property="og:type" content="article" />
- <link rel="canonical" href="https://areyouaheretic.com/articles/{slug}" />
- JSON-LD Article structured data:
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.publishDate,
    "author": { "@type": "Organization", "name": "Are You a Heretic?" },
    "publisher": { "@type": "Organization", "name": "Are You a Heretic?" }
  }

The articles index should have:
- <title>Articles on Christian Heresies & Church History — Are You a Heretic?</title>
- JSON-LD CollectionPage structured data

### 6. Sitemap Update

The @astrojs/sitemap integration should already be generating a sitemap. Verify that the new article pages appear in the generated sitemap.xml. If the articles collection isn't being picked up automatically, configure it in astro.config.mjs.

### 7. After all changes, verify:
- `npm run build` succeeds with no errors
- All 8 article pages render correctly at /articles/[slug]
- The articles index at /articles/ lists all articles
- "Am I a Heretic?" appears on the landing page CTA and quiz page title
- Every article has a quiz CTA at the bottom
- Internal links between articles ↔ deep dives ↔ quiz all work
- JSON-LD structured data renders in page source
- The sitemap includes all article URLs
- Navigation header includes "Articles" link
```

---

## SEO RATIONALE

This prompt implements a **content hub strategy** (sometimes called a "hub and spoke" model in SEO). Here's how it works:

- **The hub** = the quiz itself (high engagement, shareable, generates social traffic)
- **The spokes** = deep dive pages + articles (each targeting specific long-tail search queries)
- **The links** = every spoke links back to the hub (quiz CTA) and to other spokes (related articles/deep dives)

Google rewards sites that demonstrate **topical authority** — deep, interlinked coverage of a subject from multiple angles. A site with a quiz, 18+ heresy deep dives, AND 8 articles covering the same territory from different angles signals to Google that this is an authoritative resource on Christian heresies and church councils.

The articles specifically target three audience pipelines:

| Pipeline | Example Searches | Article Targeting It |
|---|---|---|
| Quiz seekers | "heresy quiz," "which heresy am I," "am I a heretic" | Landing page + CTA phrasing |
| Question-askers | "is universalism heresy," "what is arianism," "is the trinity biblical" | Articles 3, 4, 5, 6, 8 |
| History nerds | "council of rimini," "anti-nicene councils," "early christian beliefs" | Articles 1, 2, 8 |
| Denomination shoppers | "why so many denominations," "denomination differences" | Article 7 |

## "AM I A HERETIC?" PLACEMENT SUMMARY

| Location | Phrasing | Why |
|---|---|---|
| Landing page intro paragraph | "If you've ever wondered 'Am I a heretic?'..." | Captures first-person search variant in body text |
| Landing page CTA button | "Am I a Heretic? Take the Quiz" | First-person phrasing on the most prominent clickable element |
| Quiz page `<title>` tag | "Am I a Heretic? Take the Quiz — Are You a Heretic?" | Both phrasings in the page title for Google |
| Quiz page meta description | "Find out which church councils would condemn your beliefs..." | Supporting description for the title |
| Article CTAs | "Am I a Heretic? Take the Quiz →" | Consistent CTA phrasing across all article endpoints |

The site brand stays "Are You a Heretic?" (second person, more provocative, better for sharing). But "Am I a Heretic?" (first person, how people actually search) appears in the places Google looks hardest: title tags, CTA buttons, and body text.
