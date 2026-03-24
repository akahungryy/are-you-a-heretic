# Claude Code Prompt: Anti-Nicene Councils Fix

## Context

Feed this prompt to Claude Code AFTER the initial build (Prompts 1-5) has been completed. It fixes a critical historical gap: the quiz previously treated "three persons in one God" as a safe/orthodox answer. In reality, this formula was condemned by MORE councils than affirmed it in the 4th century. This prompt adds the anti-Nicene councils and fixes the quiz so that NO answer escapes condemnation.

---

## THE PROMPT

```
I need to fix a major historical gap in the "Are You a Heretic?" quiz at /Users/paulrobson/Projects/are-you-a-heretic. Read the updated design docs first:

- project-docs/01-research-database.md (especially the new SECTION 1B: Anti-Nicene Councils)
- project-docs/02-quiz-design.md (updated Q1 and Q2, updated results section)
- project-docs/03-claude-code-prompts.md (updated types and data instructions)

THE PROBLEM:
The quiz currently treats the Nicene Trinitarian answer ("three persons, one substance") as basically safe — like picking the "orthodox" option gets you a pass. This is historically wrong and undermines the entire thesis of the site. Between the Council of Nicaea (325) and the First Council of Constantinople (381), the ANTI-Nicene faction dominated the church. At least 10 councils in this period explicitly rejected homoousios ("of one substance"). For 20 years (360-380), the official imperial doctrine was that the Son is merely "like" the Father with no shared substance. The Nicene position was the persecuted minority.

THE FIX — DO ALL OF THESE:

### 1. Update src/data/councils.ts — Add Anti-Nicene Councils

Add these councils to the councils database with type: 'anti-nicene':

| ID | Name | Year | Location | Theological Position | Imperial Backing | Coerced? |
|---|---|---|---|---|---|---|
| tyre-335 | Council of Tyre | 335 | Tyre | Anti-Nicene | Constantine I | No |
| antioch-341 | Council of Antioch (Dedication) | 341 | Antioch | Homoian/Semi-Arian | Constantius I | No |
| sardica-east-343 | Council of Sardica (Eastern) | 343 | Sardica/Philippopolis | Anti-Nicene | Constantius II | No |
| arles-353 | Council of Arles | 353 | Arles | Anti-Nicene | Constantius II | Yes |
| milan-355 | Council of Milan | 355 | Milan | Anti-Nicene | Constantius II | Yes |
| sirmium-i-347 | First Council of Sirmium | 347 | Sirmium | Anti-Nicene | Constantius II | No |
| sirmium-ii-351 | Second Council of Sirmium | 351 | Sirmium | Homoian | Constantius II | No |
| sirmium-iii-357 | Third Council of Sirmium ("Blasphemy of Sirmium") | 357 | Sirmium | Anomoean | Constantius II | No |
| ancyra-358 | Council of Ancyra (also called Sirmium IV) | 358 | Ancyra | Homoiousian | Constantius II | No |
| sirmium-v-359 | Fifth Council of Sirmium | 359 | Sirmium | Homoian | Constantius II | No |
| rimini-359 | Council of Rimini | 359 | Rimini | Homoian (coerced) | Constantius II | Yes |
| seleucia-359 | Council of Seleucia | 359 | Seleucia | Homoiousian→Homoian | Constantius II | Partially |
| constantinople-360 | Council of Constantinople (360) | 360 | Constantinople | Homoian (empire-wide) | Constantius II | Yes |

Also add these heresies to src/data/heresies.ts:

| ID | Name | Description |
|---|---|---|
| subordinationism | Subordinationism | The Son is divine but subordinate to the Father in nature, power, or authority |
| homoianism | Homoianism | The Son is "like" the Father but without shared substance — the official imperial faith 360-380 AD |
| homoiousian | Semi-Arianism (Homoiousian) | The Son has a "similar" substance to the Father, but not an identical one |
| anomoeanism | Anomoeanism | The Son is fundamentally unlike the Father — radical Arianism |
| nicene-trinitarianism | Nicene Trinitarianism (condemned 341-380) | Three persons sharing one substance — affirmed at Nicaea (325) but condemned by the majority of 4th-century councils |

IMPORTANT: The heresy "nicene-trinitarianism" is a special case. It's the position that eventually won (Constantinople 381), but it was genuinely condemned by multiple councils between 341 and 380. The quiz needs this to work.

### 2. Update src/data/questions.ts — Fix Q1 and Q2

REPLACE the current Q1 and Q2 with the updated versions from project-docs/02-quiz-design.md.

Key changes:
- Q1 is now about the Father/Son/Spirit RELATIONSHIP (not analogies). Options: Modalism, Nicene Trinitarianism, Subordinationism, Agnosticism.
- Q2 now has a subordinationist option D instead of the old "just a teacher" option.
- EVERY answer on Q1 and Q2 triggers condemnation from specific named councils.
- The Nicene answer (Q1B, Q2B) must trigger: antioch-341, sardica-east-343, arles-353, milan-355, sirmium-ii-351, sirmium-iii-357, ancyra-358, sirmium-v-359, rimini-359, seleucia-359, constantinople-360 (11 councils total — all rejected homoousios in some form)
- The subordinationist answer (Q1C, Q2D) must trigger: nicaea-i, constantinople-i. The heresyTriggered should be 'subordinationism' (the broader category). The reveal text should note that this encompasses homoiousians (similar substance) and homoians (just "like") — both are forms of subordinationism condemned at Constantinople 381.
- Answer severity for Q1B and Q2B should be 'condemned' (not 'contested-consensus')

For the reveal text on the Nicene answers, emphasize:
- This view was condemned by MORE councils than affirmed it in the 4th century
- The Council of Rimini (359) had 400 bishops initially vote FOR Nicaea, then were physically coerced by imperial guards into signing an anti-Nicene formula
- Athanasius was exiled FIVE TIMES for defending this position
- Pope Liberius was exiled and tortured
- Jerome's quote: "The whole world groaned and was astonished to find itself Arian"
- The formula "three persons, one substance" was only stabilized at Constantinople (381) after the Cappadocian Fathers resolved the ousia/hypostasis confusion

For the reveal text on the subordinationist answers, emphasize:
- This was the MAJORITY position for most of the 4th century
- The homoian formula ("the Son is like the Father") was the official state religion 360-380
- Condemned at Nicaea (325) and Constantinople (381)
- The user would have been in the comfortable majority in 360 AD but condemned by the council that eventually won

### 3. Update src/data/types.ts

Update the types to match the new structure:
- Council type gains: 'anti-nicene' option, imperialBacking, theologicalPosition, coerced fields
- QuizAnswer: councilId becomes councilIds (array), add condemnedByCount
- QuizResult: councilsAgainst becomes total count, add ecumenicalCouncilsAgainst and antiNiceneCouncilsAgainst

### 4. Update src/lib/scoring.ts

The scoring logic needs to:
- Count anti-Nicene councils separately from ecumenical councils
- Show BOTH counts on the results page
- Calculate total councils against (ecumenical + anti-Nicene + regional + denominational)
- EVERY user should see at least some anti-Nicene councils in their condemnation tally (because Q1 and Q2 always trigger condemnations from either the anti-Nicene councils OR from Nicaea/Constantinople)

### 5. Update HeresyProfileCard.tsx (Results Page)

The results card should now show:
- Total councils against (the big number)
- Broken down: "X ecumenical councils, Y anti-Nicene councils (341-360 AD), Z regional/denominational"
- If the user picked Nicene answers on Q1/Q2, show something like: "Your Trinitarian beliefs are now considered orthodox — but 10+ councils between 341-360 AD condemned them as heretical. For 20 years, YOU would have been the heretic."
- If the user picked subordinationist answers on Q1/Q2, show something like: "Your view of the Trinity was the official position of the Roman Empire from 360-380 AD. Then Constantinople (381) happened, and you became a heretic overnight."

### 6. Update the RevealCard.tsx

When showing condemnation counts for an answer, display ALL condemning councils, not just one. For the Nicene answer on Q1, for example:
- "Condemned by: Council of Antioch (341), Council of Arles (353), Council of Milan (355), Councils of Sirmium (351, 357, 359), Council of Rimini (359), Council of Seleucia (359), Council of Constantinople (360)"
- Style these as a scrollable list of crimson badges if there are too many to fit

### 7. Update the Deep Dive Pages

Add new MDX content files in src/content/heresies/ for:
- homoianism.mdx — The homoian compromise: how "the Son is like the Father" became the empire's official faith
- subordinationism.mdx — The 4th-century majority view
- anti-nicene-period.mdx — Overview: "When the Heretics Won (341-381)"

For homoianism.mdx, this is the KEY deep dive page. Include:
- The narrative arc: Nicaea (325) → anti-Nicene reaction → Constantius II's enforcement → the Cappadocian resolution → Constantinople (381)
- The Council of Rimini story (400 bishops coerced — the most dramatic episode)
- Jerome's quote and its context
- The theological spectrum (homoousios → homoiousios → homoios → anomoios)
- How the hypostasis/ousia confusion was resolved by the Cappadocians
- Why this matters for the quiz: "orthodoxy" was decided by which emperor happened to be in power

### 8. Update the Explore Index

Add the anti-Nicene councils to the timeline visualization. They should be visually distinct (maybe a different color or a "contested" marker) to show that this was a period of theological upheaval, not a stable "orthodoxy."

### 9. After all changes, verify:
- Run `npm run build` — no TypeScript errors
- Every Q1 answer triggers condemnation from specific councils
- Every Q2 answer triggers condemnation from specific councils
- The results page never shows "0 councils against" for the Trinity/Christology section
- The payoff message on the results page references the anti-Nicene period
- All council IDs in questions.ts match councils in councils.ts
- All heresy IDs in questions.ts match heresies in heresies.ts
```

---

## WHY THIS MATTERS

The original quiz had a blind spot: it treated Nicaea (325) as if its authority was immediate and undisputed. In reality, Nicaea's key term (homoousios) was contested for 56 years and spent 20 of those years as officially heretical across the Roman Empire. The quiz's thesis — "everyone is a heretic according to someone" — ONLY works if even the most "orthodox" answer triggers condemnation. The anti-Nicene councils provide exactly that.

## HISTORICAL TERMS FOR REFERENCE

When Claude Code encounters these terms in the research database, here's what they mean:

- **homoousios** (ὁμοούσιος) = "same substance" — the Nicene position
- **homoiousios** (ὁμοιούσιος) = "similar substance" — the Semi-Arian middle ground
- **homoios** (ὅμοιος) = "like" — the homoian compromise (no substance language)
- **anomoios** (ἀνόμοιος) = "unlike" — radical Arianism
- **ousia** (οὐσία) = essence, substance, being
- **hypostasis** (ὑπόστασις) = subsistence, person (after the Cappadocian clarification)
- **Cappadocian formula** = "one ousia, three hypostaseis" — the resolution that Constantinople (381) adopted
