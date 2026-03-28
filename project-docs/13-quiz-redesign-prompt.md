# 13 — Quiz Redesign: Claude Code Implementation Prompt

## Context
Read `project-docs/12-quiz-redesign-spec.md` fully before starting. It contains the complete design spec for this work, including design principles, the list of questions to cut, fixes needed for each kept question, the Option 5 mechanic, and the new severity system.

Read the existing `src/data/questions.ts`, `src/data/types.ts`, and `src/data/heresies.ts` to understand current data structures.

Read `src/components/quiz/RevealCard.tsx`, `src/components/quiz/QuizContainer.tsx`, and `src/pages/results.astro` to understand the current quiz flow.

## Task Summary
1. Cut the quiz from 18 to 10 questions
2. Add a 5th answer option to every question
3. Replace the severity system (4 tiers → 2: `condemned` / `debated`)
4. Rewrite reveal titles and text to be impartial
5. Update all affected components and pages

## Step 1: Update types (`src/data/types.ts`)

### Severity enum
Replace the current severity values with exactly two:
- `condemned` — formally condemned by a named council/synod/confession
- `debated` — contested between major traditions, no single formal condemnation

Remove: `technically-orthodox-but`, `suspicious`, and any other severity values.

### Answer type
No structural changes needed to individual answers — they keep `heresyTriggered`, `revealTitle`, `revealText`, `severity`, `councilIds`, `condemnedByCount`.

### Question type
Add an `option5Reveal` field to `QuizQuestion`:
```typescript
option5Reveal: {
  title: string;       // e.g. "The Trinity: an unfinished argument"
  text: string;        // panoramic view of all positions on this topic
}
```

## Step 2: Rewrite questions data (`src/data/questions.ts`)

### Questions to DELETE entirely
Remove questions with these old IDs: 2, 10, 11, 13, 14, 15, 16, 18.

### Questions to KEEP (renumber 1–10)
Keep old IDs: 1, 3, 7, 8, 9, 12, 4, 5, 6, 17 (in that order).

### For EVERY kept question, apply these fixes:

**Severity fixes:**
- Every answer must be either `condemned` or `debated`. No other value.
- `condemned`: must have at least one real council/synod in `councilIds` and a non-zero `condemnedByCount`.
- `debated`: should have empty `councilIds` and `condemnedByCount: 0`. The opposition is described in the reveal text, not via council references.

**Semi-Pelagianism cleanup:**
- Remove `semi-pelagianism` as `heresyTriggered` from ANY answer where it is not genuinely Semi-Pelagian.
- Semi-Pelagianism means: the human will initiates the first step toward salvation, and grace follows. It was condemned at Orange (529).
- If an answer is not about initiation of salvation, it is NOT Semi-Pelagian. Find the correct heresy label or use a descriptive label for the actual position (e.g. `penal-substitution`, `christus-victor`, `moral-influence`, `recapitulation`, `calvinism`, `synergism`, `exclusivism`, `inclusivism`, etc.).

**Reveal title fixes:**
- No exclamation marks in reveal titles.
- No "That's X!" phrasing.
- No editorial adjectives ("dangerous", "insufficient", "suspicious").
- Good pattern: "[Position name] — condemned at [Council] ([year])" or "[Position name] — debated between [Tradition A] and [Tradition B]".

**Reveal text fixes:**
- State the historical facts: what the position is, who held it, who condemned or opposed it, when, and why.
- End with the counter-argument or ongoing tension — but present it neutrally, not as the quiz's opinion.
- Never imply one answer is more correct than another.
- Never use the word "orthodox" to describe any position as correct. You may reference "the Orthodox Church" or "Eastern Orthodox tradition" as a proper noun referring to the denomination.

**Specific question fixes (refer to 12-quiz-redesign-spec.md for details):**
- Old Q1, answer d: remap from `modalism` to an honest label (e.g. `trinitarian-agnosticism`)
- Old Q3, answer b: either reword the answer to make the Nestorian lean explicit, or make the reveal honest about the stretch
- Old Q4: remove ALL semi-pelagianism labels; most answers become `debated`
- Old Q5, answers b and c: remove fabricated condemnations, label as `debated`
- Old Q6, answer a: tone down "thousands of denominations" editorializing
- Old Q9, answer d: soften preachy tone
- Old Q12, answer a: remove editorial reveal title
- Old Q17, answers a and b: remove semi-pelagianism labels

### Option 5 for every question
Add an `option5Reveal` to each question with:
- A **title** that names the topic (e.g. "The Trinity: an unfinished argument")
- A **text** that gives the panoramic view: all major positions, who fought whom, when, and why it was never fully settled. Educational tone. No gotcha.

## Step 3: Clean up heresies data (`src/data/heresies.ts`)

- Add any new heresy entries needed for labels introduced in Step 2 (e.g. `trinitarian-agnosticism`, `penal-substitution`, `christus-victor`, `recapitulation`, `exclusivism`, `inclusivism`, `calvinism`, `synergism`).
- These don't need full MDX deep-dive pages yet — just data entries with name, description, and relevant metadata.
- Do NOT remove existing heresy entries that are still referenced by kept questions.

## Step 4: Update quiz components

### `RevealCard.tsx`
- Update severity styling: only two states (`condemned` and `debated`).
- `condemned`: keep the strong visual treatment (the position was formally condemned).
- `debated`: use a distinct but less severe visual treatment (ongoing disagreement, not a formal ruling).
- Add rendering for Option 5 reveals: this should be visually distinct from standard reveals — it's a panoramic/educational view, not a single-position condemnation. Consider a wider layout or different header treatment.

### `QuizContainer.tsx`
- Add Option 5 as a selectable answer for every question.
- Option 5 text: "None of these quite fit what I believe." (or similar — use your judgment on exact wording that fits the site's tone).
- When Option 5 is selected, show the `option5Reveal` content instead of a standard answer reveal.
- Option 5 does not map to a specific heresy — handle this in state management.

### `ProgressBar.tsx`
- Should still work with 10 questions. Verify it handles the reduced count correctly.

## Step 5: Update results page (`src/pages/results.astro` and related components)

- Handle Option 5 selections: if a user picked Option 5 for a question, the results should acknowledge it meaningfully (e.g. "You didn't commit to a position on [topic] — but here's what the church fought about").
- Remove any language that implies an "orthodox" position exists.
- Ensure the results page works gracefully whether the user picked Option 5 for zero questions or all ten.
- Update any heresy counting/display logic to handle the reduced question count and the possibility of Option 5 (no heresy assigned) answers.

## Step 6: Verify and test

- Run `npm run build` and fix any TypeScript errors.
- Run `npm run dev` and manually verify:
  - All 10 questions display correctly with 5 options each.
  - Every reveal (Options 1–4 and Option 5) displays with correct content and styling.
  - The results page handles all combinations correctly.
  - No references to removed questions remain in the codebase.
- Search the codebase for any remaining references to `technically-orthodox-but`, `suspicious`, or the word "orthodox" used to mean "correct" (as opposed to the denomination name).

## Important notes
- Do NOT modify any MDX content files (articles or heresy deep-dives) in this pass. Content review will happen separately.
- Do NOT change the landing page, about page, or site layout.
- Preserve all existing animations and transitions.
- The quiz should still use sessionStorage for state persistence.
