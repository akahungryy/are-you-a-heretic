# Prompt 14b — Unity Article + Unity Notes on Reveal Texts

## Context
Read `project-docs/14-site-intent-audit.md` for full audit context. This prompt addresses Issue 2a (Unity article) and Issue 4 (unity messaging throughout reveal texts).

## Task 1: Create Unity Article

Create a new MDX article at `src/content/articles/unity-in-christ.mdx`.

### Frontmatter
```yaml
---
title: "Unity in Christ: Why Your Heresy Doesn't Define You"
description: "If every Christian is someone else's heretic, maybe the labels were never the point. A case for holding our theology humbly and our fellow believers tightly."
publishDate: 2026-04-05
author: "Probably Theology"
category: "Unity"
relatedArticles: ["what-did-early-christians-believe", "when-orthodox-was-heretical", "trinity-heresy-explained"]
---
```

### Content structure and tone

The article should draw **directly** from the unity section of the Christos project about page (christosproject.com/about). The voice should be warm, personal, and convicted — not academic. Use "we" language throughout. British English spelling (recognise, favour, etc.).

**Section 1: The Point of This Site**
Open with the observation: if you took the quiz, you were condemned by someone. So was every other person who took it. This isn't a trick — it's a reflection of 2,000 years of Christians disagreeing with each other, sometimes violently.

But the purpose of showing you this isn't to make you feel bad about your beliefs. It's to make you think twice before calling someone else a heretic.

**Section 2: Truth Is the Means, Not the End**
Adapt directly from the Christos about page:
- "We must not mistake the means for the end. Truth is the means — God himself is the end."
- Our pursuit of doctrinal accuracy is vital, but it serves a deeper purpose: knowing and loving the God who revealed himself through Jesus of Nazareth.
- "If our theology becomes an end in itself, we have lost the plot."

**Section 3: Judge Not**
- Jesus commanded his followers not to judge one another.
- Romans 14:4: "Who are you to judge someone else's servant? To their own master, servants stand or fall."
- We are not saved by *something* (a doctrine, a formula, a creed) but by *someone*.
- What we believe matters enormously — it shapes our conception of God. But everything ultimately comes down to a heart issue: our orientation toward God and our willingness to follow where he leads.
- If Christ is the head of the church, he gets to decide who is in and who is out — not us.

**Section 4: Theological Triage**
Present the full spectrum from the Christos about page:

| Category | Description |
|---|---|
| **Essential** | Clearly and explicitly taught as necessary |
| **Unambiguously right** | Clearly taught, though not tied to salvation |
| **Ambiguously right** | Reasonable inference, but room for disagreement |
| **Silent** | Scripture does not address the question |
| **Ambiguously wrong** | Appears to contradict scripture, but arguably |
| **Unambiguously wrong** | Clearly contradicts scripture |
| **Fatal** | Explicitly identified as destructive to faith |

Explain: the categories are determined not by our opinions but by reading scripture — by what it *actually says* about what is essential, what is commanded, what is warned against, and what is condemned.

"We must assume that God, through the Holy Spirit, through the apostles and NT authors, is at least a moderately good communicator. If something is truly essential for salvation, why would he not include it clearly in the text?"

**Section 5: What Scripture Calls Essential**
- 1 Cor 15:3–4 (gospel summary)
- Romans 10:9 (confession of faith)
- Acts 2:38 (repent and be baptised)
- Acts 16:31 (believe in the Lord Jesus)

**Section 6: What Scripture Calls Fatal**
- 1 John 4:3 (denying Jesus came in the flesh)
- Galatians 1:9 (preaching a different gospel)
- 1 Cor 15:17 (denying the resurrection)

**Section 7: The Call to Unity**
Present the unity scriptures beautifully (as the Christos about page does, in blockquote format):
- 1 Corinthians 1:10
- Ephesians 4:3–6
- John 17:20–21
- Philippians 2:3
- Colossians 3:13–14
- Romans 15:7
- 1 Peter 3:8

Close with (adapted from Christos):
"If we profess to follow Jesus as our Lord, let us put aside our arguments, our arrogance, and our judgment. Let God be our judge by his Messiah Jesus. And let us seek truth with gentleness and humility, in love and unity, as fellow followers of Christ our Saviour and Lord."

**Section 8: Take the Quiz Again (CTA)**
"Now that you know the point — take the quiz again. This time, when you see a 'condemned' label, ask yourself: does this label define my brother or sister in Christ? Or does it tell us more about the labellers than the labelled?"

Link back to `/quiz`.

### Article length
Aim for approximately 1,200–1,500 words. Not too long — the scriptures should do the heavy lifting.

## Task 2: Add `unityNote` Field to All Quiz Answers

In `src/data/questions.ts`, add a `unityNote` string field to each answer (Options 1–4). Update the `QuizAnswer` type in `src/data/types.ts` to include `unityNote?: string`.

### Unity notes for each answer

**Q1 (Trinity):**
- q1a (Modalism): "Oneness Pentecostals who hold this view love Jesus just as passionately as Trinitarians do. The question is how we describe God — not whether we worship him."
- q1b (Nicene Trinitarianism): "This was the heretical position for twenty years. The Christians who held it during that time were no less faithful for being out of step with the councils of their day."
- q1c (Subordinationism): "This was the majority view of the church for decades — held by sincere believers who read the same scriptures. The line moved; their faith didn't."
- q1d (Trinitarian agnosticism): "Honest uncertainty about the Trinity may be more faithful than confident assertions about things the biblical authors never systematised."

**Q2 (Christology):**
- q2a (Docetism): "The instinct to protect Jesus's dignity is understandable — many early Christians felt the same way. The question matters, but the instinct isn't wicked."
- q2b (Adoptionism): "Biblical Unitarians who emphasise Jesus's humanity do so because they take the text seriously. Disagreement on Christology doesn't mean disagreement on devotion to Christ."
- q2c (Eutychianism): "This is the 'safe' answer — and even it opens a minefield. If the most careful answer is still contested, perhaps we should extend more grace to those who answer differently."
- q2d (Docetism): "The tension between Jesus's humanity and divinity is real. Christians have wrestled with this for two millennia without fully resolving it."

**Q3 (Scripture) — these will be updated when Q3 is redesigned in prompt 14c. For now, add placeholder unity notes:**
- q3a: "Wrestling with difficult biblical texts is honest — and honesty is a form of faithfulness."
- q3b: "Many thoughtful Christians navigate the OT/NT relationship differently. The conversation itself honours the text."
- q3c: "Affirming continuity still means grappling with genuinely difficult passages. No one has this fully figured out."
- q3d: "The church fought to keep the OT in the canon for good reason — but the reason deserves to be discovered, not imposed."

**Q4 (Worship/Icons):**
- q4a (Iconoclasm): "Protestants and Orthodox Christians have disagreed about images for over a millennium — both sides acting out of genuine devotion."
- q4b (Iconodulism): "An ecumenical council vindicated this view. But the Christians who disagree aren't less devoted — they're reading the second commandment differently."
- q4c (Selective iconoclasm): "Landing in the middle of this debate puts you in good company — many thoughtful Christians hold exactly this nuanced position."
- q4d (Adiaphorism): "Not every theological question requires a strong opinion. Sometimes wisdom looks like saying 'I don't think this one matters as much as we think.'"

**Q5 (Communion):**
- q5a (Transubstantiation): "Catholics have believed this for over a thousand years. Protestants reject it. Both groups break bread together in remembrance of Jesus."
- q5b (Spiritual presence): "Calvin, Luther, and Zwingli agreed on almost everything — except this. If the Reformers couldn't resolve it, we can probably extend each other some grace."
- q5c (Memorialism): "Most churchgoers hold this view without knowing it was condemned. Their communion is no less meaningful for being 'heretical' by historical standards."
- q5d (Eucharistic agnosticism): "Millions of Christians take communion every week sensing something sacred without committing to a metaphysical explanation. That's not weakness — it might be wisdom."

**Q6 (Hell):**
- q6a (Eternal torment): "This is the majority view — and many who hold it do so with great pastoral anguish. The question of hell weighs heavily on those who take it seriously."
- q6b (Annihilationism): "John Stott — one of the most respected evangelicals in history — held this view. If he's a heretic, the word has lost its meaning."
- q6c (Universalism): "Gregory of Nyssa helped define the Trinity and held universalist views. If a Cappadocian Father could hold this, it's not as fringe as it sounds."
- q6d (Metaphorical hell): "C.S. Lewis described hell in ways closer to this than to literal fire. The diversity of biblical metaphors for hell suggests none is meant as physics."

**Q7 (Atonement):**
- q7a (Penal substitution): "No ecumenical council has ever defined an official atonement theory. Every tradition captures part of the truth; none captures all of it."
- q7b (Christus Victor): "This was the dominant view for over a thousand years. It's not a liberal innovation — it's the oldest Christian understanding of the cross."
- q7c (Moral influence): "Abelard never denied other dimensions of the atonement. The 'moral influence only' version is somewhat a straw man of his actual position."
- q7d (Recapitulation): "The Eastern Orthodox have always been more comfortable with mystery here than the West. Not every truth needs to be systematised to be true."

**Q8 (Conversion):**
- q8a (Semi-Pelagianism): "The vast majority of evangelicals talk exactly this way — 'I accepted Jesus.' Their faith is no less real for being technically 'heretical' by 529 AD standards."
- q8b (Calvinism): "Over a billion Christians consider this a serious error — and over 500 million consider it essential truth. We can probably worship together either way."
- q8c (Synergism): "Catholics, Orthodox, Arminians, and Wesleyans hold this view. That's most of global Christianity. The 'heresy' label here reveals more about the labellers."
- q8d (Pelagianism): "Pelagius had a point about human responsibility that the church never fully dismissed. The tension between grace and effort runs through the entire NT."

**Q9 (Authority):**
- q9a (Sola Scriptura): "The Reformers and the Council of Trent disagreed — and both sides produced communities of faithful believers. The question of authority is genuine, not settled."
- q9b (Sacred tradition): "Catholics and Orthodox have preserved the faith for two millennia using this approach. Protestants have a different view — but respect is owed to both."
- q9c (Wesleyan quadrilateral): "All Christians actually use these four sources whether they admit it or not. The question is whether you're honest about it."
- q9d (Montanism): "The boundary between legitimate prophetic speech and Montanist excess has never been clearly drawn. The NT itself assumes ongoing prophecy."

**Q10 (Unevangelized):**
- q10a (Exclusivism): "This is held with great pastoral seriousness by many believers who wrestle with its implications. The question of the unevangelised weighs on them, too."
- q10b (Inclusivism): "C.S. Lewis, Karl Rahner, and Vatican II all leave room for this. If you hold it, you're in thoughtful company."
- q10c (Pluralism): "This raises the genuine question: is a just God going to condemn billions for being born in the wrong geography? The question deserves a real answer, not just a label."
- q10d (Universalism): "Origen, Gregory of Nyssa, Clement of Alexandria — some of the greatest minds in church history held this hope. The argument refuses to die because the love of God refuses to shrink."

## Task 3: Render Unity Notes in RevealCard

In `src/components/quiz/RevealCard.tsx`, render the `unityNote` field at the bottom of the standard answer reveal, above the action links. Style it distinctly:

```tsx
{answer.unityNote && (
  <p className="text-sm text-gold/80 italic leading-relaxed mb-4 border-l-2 border-gold/30 pl-3">
    {answer.unityNote}
  </p>
)}
```

Pass `unityNote` through as part of the `QuizAnswer` type from the answer prop.

## Task 4: Add Unity Article to Article Links

In `RevealCard.tsx`, consider adding a link to the unity article as a third action link on every reveal:
```tsx
<a
  href="/articles/unity-in-christ"
  className="text-sm text-gold/70 hover:text-gold underline underline-offset-2"
>
  Read: Unity in Christ
</a>
```

This should appear as the last link, after the heresy deep-dive and existing article links.

## Verification
- Build the site (`npm run build`) and confirm no TypeScript errors
- Verify the new article renders at `/articles/unity-in-christ`
- Verify unity notes appear on all 40 answer reveals (10 questions × 4 answers)
- Verify the unity article link appears on all RevealCards
- Read through 3–4 reveals to confirm the unity notes feel warm and grounding, not preachy
