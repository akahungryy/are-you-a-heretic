# 14 — Site Intent Audit: "Are You a Heretic?"

**Date:** 2026-04-05
**Status:** Active — findings and recommendations

## The Core Problem

The site's *stated* intent (results page payoff message) is about unity, humility, and recognising that doctrinal labels are historically contingent. But the *experience* of taking the quiz doesn't reinforce that intent — it leans into the "gotcha" of being condemned, with the unity message arriving only at the very end, after the user has absorbed 10 rounds of "you're a heretic." The tone needs to shift so the unity message is woven through the entire experience, not tacked on as a twist ending.

---

## Issue 1: No way to clear/change quiz answers

**Current state:** Users can navigate backward with the "Back" button, which shows the previous question in its `revealing` state (answer + RevealCard visible). However, there is no explicit "change my answer" button. The user sees the locked-in reveal but would need to understand they can re-select an answer — and the `disabled` prop on `QuestionCard` actually prevents this.

**Recommendation:** When a user navigates back to a previous question, show a "Change Answer" button (or make the answers re-selectable). Tapping it should:
1. Clear the current answer for that question
2. Return to `answering` state for that question
3. Recalculate the heresy count

**Implementation:** Modify `QuizContainer.tsx` — when in `revealing` state on a revisited question, add a "Change my answer" button that resets that question's state. The `handleBack` function already navigates correctly; we just need a `handleClearAnswer` that sets `state` back to `'answering'` and removes that question's answer from `answers`.

---

## Issue 2: Unity article + persistent section below quiz

**Current state:** The only unity messaging is in the results page payoff (lines 248–331 of `HeresyProfileCard.tsx`). The quiz itself has zero unity content. There are 8 articles, none about unity.

**Recommendation (two parts):**

### 2a. New standalone article: "Unity in Christ: Why Your Heresy Doesn't Define You"

Create a 9th article as MDX in `src/content/articles/`. Draw directly from the Christos about page unity section:

- **Theological triage spectrum** — Essential → Unambiguously right → Ambiguously right → Silent → Ambiguously wrong → Unambiguously wrong → Fatal
- **What scripture calls essential** — 1 Cor 15:3–4, Romans 10:9, Acts 2:38, Acts 16:31
- **What scripture calls fatal** — 1 John 4:3, Galatians 1:9, 1 Corinthians 15:17
- **The call to unity** — 1 Cor 1:10, Eph 4:3–6, John 17:20–21, Phil 2:3, Col 3:13–14, Romans 15:7, 1 Peter 3:8
- **The key insight** — "We must not mistake the means for the end. Truth is the means — God himself is the end."
- **Closing** — "If we profess to follow Jesus as our Lord, let us put aside our arguments, our arrogance, and our judgment."

This article should be the most linked-to page on the site.

### 2b. Persistent "Unity in Christ" section below the quiz

A full section visible below every question (not just after the first reveal), containing:
- A condensed version of the unity message (2–3 sentences)
- 2–3 key scriptures (John 17:20–21, Eph 4:3–6, Phil 2:3)
- A prominent link to the full Unity article
- Styled to feel like a grounding anchor, not a footnote

**Placement:** Below `QuizContainer` in `quiz.astro`, outside the React island (static HTML). This keeps it always visible regardless of quiz state.

---

## Issue 3: Cross-links to Christos project

**Current state:** Zero links to christosproject.com anywhere on the site.

**Recommendation:** Add "Explore this further" links to the heresy deep-dive pages (MDX files in `src/content/heresies/`) and to the RevealCard article map. The mapping:

| Heresy (areyouaheretick.com) | Christos Page (christosproject.com) |
|---|---|
| **Modalism** | `/concepts/trinitarian-development` |
| **Nicene Trinitarianism** | `/concepts/trinitarian-development`, `/concepts/councils` |
| **Subordinationism** | `/passages/john-14-28`, `/concepts/pre-existence`, `/concepts/unitarianism-history` |
| **Arianism** | `/passages/col-1-15`, `/concepts/pre-existence`, `/passages/john-1-1` |
| **Adoptionism** | `/concepts/son-of-god`, `/passages/acts-2-22`, `/concepts/unitarianism-history` |
| **Docetism** | `/concepts/two-natures` |
| **Eutychianism** | `/concepts/two-natures` |
| **Nestorianism** | `/concepts/two-natures` |
| **Anomoeanism** | `/concepts/trinitarian-development` |
| **Homoianism** | `/concepts/councils`, `/concepts/trinitarian-development` |
| **Semi-Arianism** | `/concepts/trinitarian-development` |
| **EFS** | `/passages/1-cor-15-24`, `/passages/john-14-28` |

**Implementation:** Two places:
1. Add a `christosLinks` field to the heresy MDX frontmatter (or a static map in the `[slug].astro` page), rendered as "Explore on Christos Project" links at the bottom of each heresy page.
2. Add relevant Christos links to the `heresyArticleMap` in `RevealCard.tsx` (or a new `heresyCristosMap`) so they appear in reveals.

---

## Issue 4: Unity messaging up front and throughout

**Current state:** The reveal texts lean into the historical condemnation. Phrases like "Every creedal tradition considers it heretical," "you would have been the heretic," and "condemned as early as the 3rd century" dominate. The tone is informative but implicitly says "look how wrong you are." The unity message only appears at the results page.

**Recommendation:** Add a brief unity-oriented closing line to each RevealCard reveal. Not preachy — just a sentence that reframes the condemnation in terms of the bigger picture. Examples:

- After Modalism reveal: *"Christians who hold this view and Christians who reject it have worshipped side by side for centuries. The question is whether the label matters more than the relationship."*
- After Subordinationism reveal: *"The position that was mainstream one decade was condemned the next. If the line keeps moving, perhaps the line was never the point."*
- After Semi-Pelagianism reveal: *"Most evangelicals unknowingly hold a view condemned in 529 AD — and still love Jesus faithfully. The label hasn't changed their heart."*

These should be added as a new field on each answer (e.g., `unityNote`) and rendered at the bottom of the RevealCard, styled distinctly (perhaps in gold/warm tone to match the site's branding).

Additionally, the quiz page itself should open with a brief framing paragraph:

> *"This quiz will show you what 2,000 years of church councils, confessions, and creeds make of your beliefs. But here's the thing: everyone who takes it gets flagged. The point isn't to condemn — it's to remind us that we're all in this together. If every Christian is someone else's heretic, maybe we should hold our labels more lightly and hold each other more tightly."*

---

## Issue 5: Results page — reflection + theological triage

**Chosen approach:** Combination — reflection/scripture moment first, then theological triage widget.

### 5a. Reflection section (replaces/enhances current payoff)

The current payoff message is decent but too philosophical and too long. Restructure it:

1. **Opening hook** (keep): "Everyone who took this quiz got flagged by someone. That's not a bug — it's the point."
2. **The reframe** (tighten): 2–3 sentences on labels being historically contingent.
3. **Scripture anchor** (new): Pull the unity scriptures from the Christos about page — John 17:20–21, Eph 4:3–6, Phil 2:3, Col 3:13–14. Present them beautifully, as the Christos about page does (blockquote format).
4. **The invitation** (new): A reflective question — *"Which of your fellow Christians hold the views you were just 'condemned' for? Could you worship alongside them? Could you call them brother or sister?"*
5. **Closing** (adapted from Christos): *"If we profess to follow Jesus as our Lord, let us put aside our arguments, our arrogance, and our judgment. Let us seek truth with gentleness and humility, in love and unity, as fellow followers of Christ."*
6. **Link** to the full Unity in Christ article.

### 5b. Theological Triage bonus widget

After the reflection, offer an optional "Bonus: Where do your 'heresies' actually fall?" interactive section. For each heresy the user triggered, present a simple choice:

> **[Heresy Name]** — Where does this fall on the spectrum?
> - Essential (core to salvation)
> - Important (significant but not salvific)
> - Secondary (reasonable Christians disagree)
> - I'm not sure

After they rate all their heresies, show a summary:
- How many of their "condemned" positions they themselves rated as secondary disagreements
- A closing line: *"If most of what got you 'condemned' falls in the 'secondary' category — and it probably does — then maybe the councils were arguing about things that aren't worth dividing over. The truth has nothing to fear from honest disagreement."*

Link the theological triage concept to the full Unity article.

---

## Issue 6: Marcionism catch-all — redesign Q3

**Current state:** Q3 ("How do you relate to the God of the OT?") triggers Marcionism for answers A, B, and D. Only answer C (continuity theology) avoids it. This makes the question feel rigged — 3 out of 4 answers give you the same heresy.

**The real problem:** The question is designed to surface OT skepticism, and all OT skepticism roads lead to Marcion. But there are other genuinely distinct heresies in the Scripture/canon space that could be surfaced instead.

**Recommended redesign — new Q3: "How should Christians read the Bible?"**

This question can surface a wider range of heresies about Scripture, canon, and interpretation:

| Answer | Heresy Triggered | Severity |
|---|---|---|
| A: "Every word is directly dictated by God — inerrant, literal, and equally authoritative from Genesis to Revelation." | **Biblicism / Radical literalism** — debated. Ignores genre, context, and the human dimension of Scripture. The early church never read Genesis 1 as a science textbook (Origen, Augustine both warned against it). | Debated |
| B: "The NT supersedes the OT — the Old Testament was for a different time and people." | **Functional Marcionism** — condemned since 144 AD. Marcion was expelled for exactly this instinct. Yet many churches practically operate this way. Jesus himself said he came to fulfil the law, not abolish it (Matt 5:17). | Condemned |
| C: "The Bible is inspired but must be interpreted — some parts are culturally conditioned, and we need wisdom to know which." | **Progressive hermeneutics** — debated across traditions. Conservative evangelicals say this opens the door to discarding anything inconvenient. But the church has always interpreted (Jesus reinterpreted "an eye for an eye" in the Sermon on the Mount). The question is where interpretation becomes revision. | Debated |
| D: "The Bible is a human document — inspired in places, but not fundamentally different from other great spiritual literature." | **Liberal theology / Schleiermacher's legacy** — debated. Friedrich Schleiermacher (19th century) reframed Christianity around religious experience rather than doctrinal authority. This undermines biblical authority as every major tradition understands it. Yet critical scholarship has shown the Bible is genuinely a collection of human writings with human fingerprints. The tension between "inspired" and "human" is real. | Debated |

**Benefits of the redesign:**
- 4 genuinely distinct positions (not 3 flavours of the same heresy)
- Surfaces a wider range of real theological debates
- Removes the "rigged" feeling
- Still educational and surprising
- Old Marcionism content preserved on the explore page

---

## Cross-cutting: Tone audit of reveal texts

Several reveal texts use language that contradicts the unity intent:

- **Q2a/Q2d (Docetism):** "his humanity isn't real — it's a costume" — accurate but could add a unity note
- **Q3d (Practical Marcionism):** "Marcion would recognise" — slightly judgmental framing
- **Q8a (Semi-Pelagianism):** The reveal is good — already notes most evangelicals hold this unknowingly
- **Q1d (Trinitarian agnosticism):** "Historically, uncertainty alone was enough to put you on the wrong side" — could soften with "but many great theologians have argued that mystery is more faithful than false confidence" (which it already does — this one is good)

**Recommendation:** Add `unityNote` fields as described in Issue 4, and during implementation do a line-by-line tone pass on all reveal texts to ensure they inform rather than condemn.

---

## Christos Cross-Link Map (for reference)

**christosproject.com pages relevant to quiz heresies:**

| Christos Page | URL Path | Relevant Heresies |
|---|---|---|
| Trinitarian Development | `/concepts/trinitarian-development` | modalism, nicene-trinitarianism, subordinationism, arianism, homoianism, anomoeanism, semi-arianism |
| Councils | `/concepts/councils` | nicene-trinitarianism, homoianism, all condemned heresies |
| Pre-existence | `/concepts/pre-existence` | arianism, subordinationism |
| Two Natures | `/concepts/two-natures` | docetism, eutychianism, nestorianism |
| Son of God | `/concepts/son-of-god` | adoptionism, arianism |
| Unitarianism History | `/concepts/unitarianism-history` | subordinationism, adoptionism, arianism |
| Kyrios | `/concepts/kyrios` | modalism, subordinationism |
| Shema | `/concepts/shema` | modalism, nicene-trinitarianism |
| John 1:1 | `/passages/john-1-1` | arianism |
| John 14:28 | `/passages/john-14-28` | subordinationism, EFS |
| Col 1:15 | `/passages/col-1-15` | arianism |
| Phil 2:5 | `/passages/phil-2-5` | docetism, eutychianism |
| Acts 2:22 | `/passages/acts-2-22` | adoptionism |
| 1 Cor 15:24 | `/passages/1-cor-15-24` | subordinationism, EFS |

---

## Implementation Plan

This audit requires **multiple Claude Code prompts** due to scope:

1. **Prompt 14a** — Quiz UX: Clear/change answers, opening framing paragraph, persistent unity section below quiz
2. **Prompt 14b** — Unity article (MDX) + unity notes on all reveal texts
3. **Prompt 14c** — Q3 redesign (new question, new heresies data, new heresy MDX pages for biblicism and liberal theology)
4. **Prompt 14d** — Christos cross-links (heresy pages + RevealCard)
5. **Prompt 14e** — Results page overhaul: reflection section + theological triage widget
6. **Prompt 14f** — Tone audit pass on all reveal texts

Prompts should be executed in order (14a–14f) as later prompts depend on earlier structural changes.
