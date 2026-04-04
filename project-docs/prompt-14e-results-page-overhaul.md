# Prompt 14e — Results Page Overhaul: Reflection + Theological Triage

## Context
Read `project-docs/14-site-intent-audit.md` (Issue 5) for full context. The results page needs a restructured payoff message (reflection with scriptures) followed by an optional theological triage widget.

## Task 1: Restructure the Payoff Message in HeresyProfileCard

In `src/components/quiz/HeresyProfileCard.tsx`, replace the current payoff message section (the `<motion.div>` block with "Everyone who took this quiz got flagged by someone") with a restructured version:

### New payoff structure

```tsx
{/* THE PAYOFF — Reflection */}
<motion.div
  {...fadeIn}
  transition={{ delay: 0.8, duration: 0.6 }}
  className="bg-charcoal text-parchment rounded-xl p-6 md:p-10 border border-gold/10"
>
  <div className="max-w-lg mx-auto space-y-5 text-base leading-relaxed font-content">
    {/* Hook */}
    <p className="text-gold font-bold text-lg font-display">
      Everyone who took this quiz got flagged by someone.
    </p>
    <p className="text-parchment/80">
      That's not a bug — it's the point.
    </p>

    {/* The reframe */}
    <p className="text-parchment/70">
      Every answer on every question has been condemned or contested by
      some council, confession, or authoritative body. There is no
      combination of answers that escapes scrutiny. The labels "heretical"
      and "condemned" don't describe fixed truths handed down from heaven —
      they describe the consensus of a particular community at a particular
      time and place.
    </p>

    {/* Scripture anchor */}
    <div className="border-l-2 border-gold/30 pl-4 space-y-3 my-4">
      <p className="text-parchment/60 text-sm italic leading-relaxed">
        "Make every effort to keep the unity of the Spirit through the
        bond of peace. There is one body and one Spirit, just as you were
        called to one hope; one Lord, one faith, one baptism; one God
        and Father of all."
        <span className="not-italic text-parchment/40 block mt-1">— Ephesians 4:3–6</span>
      </p>
      <p className="text-parchment/60 text-sm italic leading-relaxed">
        "My prayer is not for them alone. I pray also for those who will
        believe in me through their message, that all of them may be one,
        Father, just as you are in me and I am in you."
        <span className="not-italic text-parchment/40 block mt-1">— John 17:20–21</span>
      </p>
      <p className="text-parchment/60 text-sm italic leading-relaxed">
        "Do nothing out of selfish ambition or vain conceit. Rather, in
        humility value others above yourselves."
        <span className="not-italic text-parchment/40 block mt-1">— Philippians 2:3</span>
      </p>
      <p className="text-parchment/60 text-sm italic leading-relaxed">
        "Accept one another, then, just as Christ accepted you, in order
        to bring praise to God."
        <span className="not-italic text-parchment/40 block mt-1">— Romans 15:7</span>
      </p>
    </div>

    {/* The reflective question */}
    <p className="text-gold/90 font-semibold">
      Which of your fellow Christians hold the views you were just
      "condemned" for?
    </p>
    <p className="text-parchment/70">
      Could you worship alongside them? Could you call them brother or
      sister? If Christ is the head of the church, he gets to decide who
      is in and who is out — not us. And not the councils.
    </p>

    {/* The invitation */}
    <p className="text-parchment/70">
      If we profess to follow Jesus as our Lord, let us put aside our
      arguments, our arrogance, and our judgment. Let us seek truth with
      gentleness and humility, in love and unity, as fellow followers of
      Christ our Saviour and Lord.
    </p>

    <p className="text-gold/80 font-semibold text-sm">
      The truth has nothing to fear.
    </p>

    {/* Link to unity article */}
    <a
      href="/articles/unity-in-christ"
      className="inline-flex items-center gap-1.5 text-sm text-gold hover:text-gold-light transition-colors font-semibold"
    >
      Read: Unity in Christ — Why Your Heresy Doesn't Define You →
    </a>
  </div>
</motion.div>
```

## Task 2: Theological Triage Widget

Create a new React component: `src/components/quiz/TheologicalTriage.tsx`

This is an optional "bonus round" that appears below the payoff message. The user can rate each heresy they triggered.

### Component structure

```tsx
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { QuizResult } from '../../data/types';
import { heresies } from '../../data/heresies';

type TriageLevel = 'essential' | 'important' | 'secondary' | 'unsure';

interface TriageRating {
  heresyId: string;
  level: TriageLevel;
}

export default function TheologicalTriage({ result }: { result: QuizResult }) {
  const [isOpen, setIsOpen] = useState(false);
  const [ratings, setRatings] = useState<TriageRating[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const triggeredHeresies = result.heresies
    .map((id) => heresies.find((h) => h.id === id))
    .filter(Boolean);

  // ... implementation
}
```

### UI flow

**Collapsed state (default):**
Show a visually distinct invitation card:
```
┌──────────────────────────────────────────────┐
│  🎯 Bonus: Where do your "heresies" fall?   │
│                                               │
│  Not all disagreements carry the same weight. │
│  Rate each of your "heresies" on the          │
│  theological triage spectrum.                 │
│                                               │
│  [Try Theological Triage]                     │
└──────────────────────────────────────────────┘
```

**Expanded state:**
For each heresy the user triggered, show a card with four radio-button-style options:

```
┌──────────────────────────────────────────────┐
│  Modalism (Sabellianism)                     │
│  "God is one person who wears three masks"   │
│                                               │
│  How important is this issue?                │
│  ○ Essential — core to salvation             │
│  ○ Important — significant but not salvific  │
│  ○ Secondary — reasonable Christians disagree│
│  ○ I'm not sure                              │
└──────────────────────────────────────────────┘
```

Style the options with the site's color palette:
- Essential: crimson border when selected
- Important: amber border when selected
- Secondary: gold border when selected
- I'm not sure: charcoal/muted border when selected

Once ALL heresies have been rated, show a "See My Triage Results" button.

**Summary state:**
Count how many heresies fell into each category. Display:

```
┌──────────────────────────────────────────────┐
│  Your Theological Triage                     │
│                                               │
│  Essential:  1                                │
│  Important:  2                                │
│  Secondary:  4                                │
│  Not sure:   1                                │
│                                               │
│  [X] of your [Y] "heresies" fall in the      │
│  secondary category — positions where         │
│  reasonable Christians disagree.              │
│                                               │
│  If most of what got you "condemned" is       │
│  secondary disagreement, perhaps the councils │
│  were fighting over things that aren't worth  │
│  dividing over.                               │
│                                               │
│  The truth has nothing to fear from honest    │
│  disagreement.                                │
│                                               │
│  [Read: Unity in Christ →]                    │
└──────────────────────────────────────────────┘
```

### Integration

In `HeresyProfileCard.tsx`, import and render the `TheologicalTriage` component after the payoff message and before the action buttons:

```tsx
{/* Theological Triage bonus */}
{result && (
  <TheologicalTriage result={result} />
)}

{/* Actions */}
<div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
  ...
</div>
```

## Task 3: Export QuizResult Type

Ensure `QuizResult` type in `src/data/types.ts` is properly exported and includes the `heresies` array and `option5Questions` array so the TheologicalTriage component can use it.

## Verification
- Build (`npm run build`) — no errors
- Test the full flow: complete quiz → results page → payoff message with scriptures → theological triage widget
- Verify the triage widget starts collapsed and expands on click
- Verify all triggered heresies appear in the triage widget
- Verify the summary calculates correctly
- Verify the unity article link works from both the payoff message and the triage summary
- Verify the reflective questions and scriptures render beautifully on mobile
