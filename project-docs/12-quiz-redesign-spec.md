# 12 — Quiz Redesign Spec

## Overview
Major redesign of the quiz: cut from 18 to 10 questions, add Option 5 to every question, replace the "gotcha" reveal tone with impartial historical reporting, and simplify the severity system to two labels.

## Design Principles

1. **If there's a real condemnation, name it.** Council, date, what happened. No embellishment.
2. **If there isn't a real condemnation, say "debated."** Name who disagrees and why. Never fabricate or stretch a condemnation.
3. **Never editorialize in reveal titles.** No "That's X!" gotchas. State what the position is called and who took issue with it.
4. **Every reveal ends with the counter-argument or the tension.** The quiz presents both sides; the user decides.
5. **No answer is labelled "orthodox."** The entire thesis of the site is that orthodoxy is not a stable or helpful concept. Every position has been condemned or contested by someone.
6. **Option 5 is the panoramic view.** All positions on that topic, all tensions, why it matters, why it's unresolved.
7. **Be honest, be impartial.** The quiz's power comes from the historical record speaking for itself. It doesn't need to push a position.

## Severity System (replaces old 4-tier system)

Only two labels:

- **`condemned`** — formally condemned by a named council, synod, or confession. The reveal must include: who condemned it, when, and what happened.
- **`debated`** — seriously contested between major traditions. No single formal condemnation, but significant named opposition. The reveal must include: which traditions oppose it and why.

Every answer gets one of these two. No answer gets a pass. No answer is labelled "orthodox," "technically orthodox," or "suspicious."

The old `technically-orthodox-but` and `suspicious` severities are eliminated. Answers previously tagged `technically-orthodox-but` (which often had `condemnedByCount: 0` and empty `councilIds`) must be re-evaluated — either a real condemnation exists, or the answer is `debated`.

## Questions Cut (8 removed)

| Old # | Topic | Reason for cutting |
|-------|-------|--------------------|
| Q2 | Christology (pre-existence) | Overlaps Q1 — both cover homoousios/Nicene debate |
| Q10 | Baptism (who/how) | Denominational preference, not heresy |
| Q11 | Eschatology (end times) | Intramural debate, no strong condemnations |
| Q13 | Perseverance of saints | Overlaps Q14, Calvinist/Arminian intramural |
| Q14 | Predestination/election | Dort-centric, Calvinist/Arminian intramural |
| Q15 | Final authority | Overlaps Q6 |
| Q16 | Prophecy/Spirit gifts | Intramural debate |
| Q18 | EFS/eternal submission | Culture-war adjacent, pushes a bent |

## Questions Kept (10 total)

New numbering below. Old question number in parentheses.

### Strong Core — keep, fix reveals to match new principles

1. **(Q1) Trinity** — "How would you describe the relationship between Father, Son, and Holy Spirit?"
   - Fix: Q1d ("I'm not sure") should NOT map to modalism. Remap to its own category or create an honest "Trinitarian agnosticism" label.
   - Fix: All reveal titles — remove gotcha phrasing.
   - Note: Q1b (Nicene position condemned by 11 councils) is the gold standard reveal. Other reveals should match this quality.

2. **(Q3) Christology** — "When Jesus wept at Lazarus's tomb, what was happening?"
   - Fix: Q3b ("a genuine human being grieving") — the Nestorianism mapping is a stretch. The reveal adds implications the answer doesn't contain. Either reword the answer to make the Nestorian lean clearer, or change the reveal to be honest about the stretch.
   - Fix: Remove all `technically-orthodox-but` severities → reassign as `condemned` or `debated`.

3. **(Q7) Scripture** — "How do you relate to the God of the Old Testament?"
   - Mostly solid. Minor tonal fixes to reveal titles.

4. **(Q8) Worship/Icons** — "Is it appropriate to have paintings or statues of Jesus in a church?"
   - Solid. Minor tonal fixes only.

5. **(Q9) Sacraments/Communion** — "What's happening with the bread and wine?"
   - Fix: Q9d ("honest but doctrinally insufficient") — soften the preachy tone. Reframe as `debated`.

6. **(Q12) Eschatology/Hell** — "What is hell?"
   - Fix: Q12a ("but is it biblical?") — the reveal title editorializes. Reframe neutrally.

### Rework Needed — good topic, reveals need surgery

7. **(Q4) Soteriology/Atonement** — "What did Jesus's death on the cross actually accomplish?"
   - Major fix: Remove all `semi-pelagianism` labels (none of these are Semi-Pelagian).
   - Most answers should be `debated` — these are inter-traditional disagreements, not formal condemnations.
   - Q4c (Moral Influence → Pelagianism) is the closest to a real mapping but still a stretch. Be honest about the degree of stretch.
   - Rewrite all reveal text to present which traditions reject each view and why, without editorializing.

8. **(Q5) Soteriology/Conversion** — "How does someone become a Christian?"
   - Fix: Q5a (Semi-Pelagianism, Orange 529) is genuinely strong — keep.
   - Fix: Q5d (Pelagianism, Carthage/Ephesus) is genuinely strong — keep.
   - Fix: Q5b and Q5c — remove fabricated condemnations. These are `debated`, not `condemned`. Be honest.

9. **(Q6) Authority** — "Where does authoritative Christian teaching come from?"
   - Fix: Q6a (Sola Scriptura, Trent) — real condemnation, keep. Tone down "thousands of denominations" editorializing.
   - Fix: Q6d (Montanism) — real condemnation, keep.
   - Fix: Q6b and Q6c — `debated`, not `suspicious`. Rename severity label throughout.

10. **(Q17) Soteriology/Unevangelized** — "Can someone who has never heard of Jesus be saved?"
    - Fix: Remove all `semi-pelagianism` labels (none are Semi-Pelagian).
    - Q17c (Pluralism → Pelagianism, Carthage/Ephesus) and Q17d (Universalism, Constantinople II) have real condemnations.
    - Q17a (Exclusivism) and Q17b (Inclusivism) are `debated`.

## Option 5: "Other — don't worry, there's no right answer."

### Mechanic
Every question gets a 5th option with the text: **"None of these quite fit what I believe."** (or similar — exact wording TBD).

### Reveal behaviour
Option 5 reveals a **panoramic view** of the entire theological battlefield for that topic:
- Briefly describes all major positions the church has taken
- Names who fought whom and when
- Explains why it was never fully settled (or was settled differently by different traditions)
- Tone: educational, wide-angle, no gotcha

### How it differs from Options 1–4
- Options 1–4 reveals are **narrow and specific**: here's what you said, here's who condemned or contested it, here's the history.
- Option 5 reveal is **wide and honest**: here are all the positions, here's the full landscape, here's why this topic is still alive.

### Scoring / Results
TBD — options include:
- No heresy assigned, results note "you dodged this one"
- Assign the most commonly held modern "heresy" for that topic
- Flag as "undecided" in results

This decision should be made during implementation based on what works best for the results page flow.

## Impact on Other Content

### Heresy data (`heresies.ts`)
- Remove `semi-pelagianism` as a catch-all. Only use it where genuinely applicable.
- May need new heresy entries for positions that were previously mislabelled.

### Types (`types.ts`)
- Replace severity enum: remove `technically-orthodox-but` and `suspicious`, replace with `condemned` and `debated`.
- Add Option 5 data structure to QuizQuestion type.

### Reveal components (`RevealCard.tsx`)
- Update to handle two severity types with appropriate styling.
- Add Option 5 panoramic reveal layout (likely wider/different from standard reveals).

### Results page
- Handle Option 5 selections gracefully (no gaps, meaningful messaging).
- Remove any language that implies an "orthodox" position exists.

### Articles and heresy deep-dive pages
- Review for consistency with new reveal text after quiz content is finalised.
- Remove any editorial language that contradicts the new impartial approach.

## Implementation Order
1. Update `types.ts` (new severity enum, Option 5 type)
2. Rewrite `questions.ts` (cut to 10, add Option 5, rewrite reveals, fix severities)
3. Update `heresies.ts` (clean up semi-pelagianism misuse)
4. Update quiz components (RevealCard, QuizContainer, results handling)
5. Update results page
6. Review articles/heresies MDX for consistency
