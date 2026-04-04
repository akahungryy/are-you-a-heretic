# Prompt 14d — Christos Project Cross-Links

## Context
Read `project-docs/14-site-intent-audit.md` (Issue 3) for full context. Heresies related to Christology, the Trinity, Modalism, Logos theology, Subordinationism, and pre-existence should link to the relevant pages on christosproject.com.

## Task 1: Add Christos Links to Heresy Deep-Dive Pages

For each heresy MDX file listed below, add a new section at the bottom (before any existing "Related Heresies" section if present) titled "## Explore Further on Christos". The section should contain 1–3 links to relevant christosproject.com pages with a brief description of what the user will find there.

Format:
```markdown
## Explore Further on Christos

The [Christos Project](https://christosproject.com) explores New Testament Christology through multiple theological lenses — Trinitarian, Biblical Unitarian, and Logos Theology — with scholarly sources and primary texts.

- [Trinitarian Development](https://christosproject.com/concepts/trinitarian-development) — How the doctrine of the Trinity developed from the NT period through the ecumenical councils
- [Councils](https://christosproject.com/concepts/councils) — The ecumenical councils that shaped orthodox Christology
```

### Cross-link mapping

**`src/content/heresies/modalism.mdx`:**
- [Trinitarian Development](https://christosproject.com/concepts/trinitarian-development) — How the doctrine of the Trinity developed from the NT period through the ecumenical councils
- [The Shema and Monotheism](https://christosproject.com/concepts/shema) — How "the Lord our God is one" shapes the Trinity debate

**`src/content/heresies/nicene-trinitarianism.mdx`:**
- [Trinitarian Development](https://christosproject.com/concepts/trinitarian-development) — The full story of how Nicene Trinitarianism became the orthodox position
- [Councils](https://christosproject.com/concepts/councils) — The ecumenical and anti-Nicene councils that fought over this formula
- [The Shema and Monotheism](https://christosproject.com/concepts/shema) — The tension between "God is one" and "three persons"

**`src/content/heresies/subordinationism.mdx`:**
- [John 14:28 — "The Father is greater than I"](https://christosproject.com/passages/john-14-28) — Three traditions' readings of the key subordinationist proof-text
- [Pre-existence](https://christosproject.com/concepts/pre-existence) — Did the Son exist before the incarnation? Three perspectives
- [Unitarianism History](https://christosproject.com/concepts/unitarianism-history) — The history of subordinationist and unitarian theology from Paul of Samosata to today

**`src/content/heresies/arianism.mdx`:**
- [Colossians 1:15 — "Firstborn of all creation"](https://christosproject.com/passages/col-1-15) — Three traditions' readings of the passage Arians cite most
- [John 1:1 — "The Word was God"](https://christosproject.com/passages/john-1-1) — The passage that defines the Arian debate
- [Pre-existence](https://christosproject.com/concepts/pre-existence) — Was the Son created, eternally generated, or a concept?

**`src/content/heresies/adoptionism.mdx`:**
- [Son of God](https://christosproject.com/concepts/son-of-god) — What "Son of God" meant in Jewish and Greco-Roman context
- [Acts 2:22 — "A man attested by God"](https://christosproject.com/passages/acts-2-22) — Peter's earliest Christological proclamation
- [Unitarianism History](https://christosproject.com/concepts/unitarianism-history) — The connection between adoptionism and Biblical Unitarianism

**`src/content/heresies/docetism.mdx`:**
- [Two Natures](https://christosproject.com/concepts/two-natures) — The Chalcedonian definition and why the church insisted on real humanity
- [Philippians 2:5–11](https://christosproject.com/passages/phil-2-5) — The kenosis passage and what it means for Christ's humanity

**`src/content/heresies/eutychianism.mdx`:**
- [Two Natures](https://christosproject.com/concepts/two-natures) — How Chalcedon navigated between Eutychianism and Nestorianism

**`src/content/heresies/nestorianism.mdx`:**
- [Two Natures](https://christosproject.com/concepts/two-natures) — The Chalcedonian solution to the Nestorian controversy

**`src/content/heresies/anomoeanism.mdx`:**
- [Trinitarian Development](https://christosproject.com/concepts/trinitarian-development) — The spectrum from Anomoeanism to Nicene orthodoxy

**`src/content/heresies/homoianism.mdx`:**
- [Councils](https://christosproject.com/concepts/councils) — The anti-Nicene councils that imposed Homoian theology as imperial policy
- [Trinitarian Development](https://christosproject.com/concepts/trinitarian-development) — Where Homoianism sits on the Trinitarian spectrum

**`src/content/heresies/semi-arianism.mdx`:**
- [Trinitarian Development](https://christosproject.com/concepts/trinitarian-development) — The "one iota" difference between Homoiousian and Nicene positions

**`src/content/heresies/efs.mdx`:**
- [1 Corinthians 15:24–28](https://christosproject.com/passages/1-cor-15-24) — "Then the Son himself will be made subject" — three perspectives
- [John 14:28 — "The Father is greater than I"](https://christosproject.com/passages/john-14-28) — The passage at the heart of the EFS debate

## Task 2: Add Christos Links to RevealCard

In `src/components/quiz/RevealCard.tsx`, create a new static map for Christos Project links (similar to the existing `heresyArticleMap`):

```typescript
const christosLinkMap: Record<string, { url: string; title: string }> = {
  modalism: { url: 'https://christosproject.com/concepts/trinitarian-development', title: 'Explore the Trinity debate on Christos' },
  'nicene-trinitarianism': { url: 'https://christosproject.com/concepts/trinitarian-development', title: 'How Trinitarian theology developed' },
  subordinationism: { url: 'https://christosproject.com/passages/john-14-28', title: '"The Father is greater than I" — three views' },
  arianism: { url: 'https://christosproject.com/passages/john-1-1', title: '"The Word was God" — three traditions' },
  adoptionism: { url: 'https://christosproject.com/concepts/son-of-god', title: 'What "Son of God" meant in context' },
  docetism: { url: 'https://christosproject.com/concepts/two-natures', title: 'The two natures of Christ' },
  eutychianism: { url: 'https://christosproject.com/concepts/two-natures', title: 'How Chalcedon defined the two natures' },
};
```

Render as an additional link in the action area, styled to be visually distinct (different color/icon to indicate external site):

```tsx
{answer.heresyTriggered && christosLinkMap[answer.heresyTriggered] && (
  <a
    href={christosLinkMap[answer.heresyTriggered].url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm text-teal-700 hover:text-teal-600 underline underline-offset-2 flex items-center gap-1"
  >
    {christosLinkMap[answer.heresyTriggered].title}
    <span className="text-xs">↗</span>
  </a>
)}
```

Use a teal-ish color to match the Christos project branding (their primary color is teal).

## Verification
- Build (`npm run build`) — no errors
- Verify Christos links appear on the 12 heresy deep-dive pages listed above
- Verify Christos links appear in RevealCards for relevant quiz answers (Q1 answers a/b/c, Q2 answers a/b/c/d)
- Verify all links point to valid christosproject.com pages (the pages exist per the Christos CLAUDE.md)
- Verify external links open in new tab (`target="_blank"`)
