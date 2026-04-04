# Prompt 14a — Quiz UX: Clear/Change Answers, Opening Frame, Persistent Unity Section

## Context
Read `project-docs/14-site-intent-audit.md` for full audit context. This prompt addresses Issues 1, 2b, and 4 (partial).

## Task 1: Clear/Change Answer Mechanism

In `src/components/quiz/QuizContainer.tsx`:

### Current behavior
When a user navigates back (via the Back button), `handleBack` sets the state to `'revealing'` for the previous question — showing the locked answer + RevealCard. The `QuestionCard` renders with `disabled` prop, preventing re-selection.

### Required changes

1. Add a `handleChangeAnswer` function:
```typescript
const handleChangeAnswer = () => {
  // Remove current question's answer
  const newAnswers = { ...answers };
  delete newAnswers[currentQuestion.id];
  setAnswers(newAnswers);
  setSelectedAnswer(null);
  setState('answering');

  // Recalculate heresy count
  const uniqueHeresies = new Set<string>();
  for (const aid of Object.values(newAnswers)) {
    if (aid === OPTION5_ID) continue;
    for (const q of questions) {
      const a = q.answers.find((ans) => ans.id === aid);
      if (a) uniqueHeresies.add(a.heresyTriggered);
    }
  }
  setHeresyCount(uniqueHeresies.size);

  // Save updated state
  saveState(currentIndex, newAnswers);
};
```

2. In the `revealing` state JSX, add a "Change my answer" button. Place it **above** the RevealCard, next to or below the displayed question:
```tsx
{state === 'revealing' && (
  <div>
    <QuestionCard
      question={currentQuestion}
      onAnswer={() => {}}
      onOption5={() => {}}
      selectedId={selectedAnswer}
      disabled
    />

    {/* Change answer button */}
    <div className="flex justify-center mt-3 mb-2">
      <button
        onClick={handleChangeAnswer}
        className="text-sm text-charcoal/50 hover:text-charcoal underline underline-offset-2 transition-colors cursor-pointer"
      >
        Change my answer
      </button>
    </div>

    <div className="mt-4">
      {/* existing RevealCard rendering */}
    </div>
  </div>
)}
```

The button should be subtle (not competing with the reveal) — small text, underlined, muted color.

## Task 2: Opening Framing Paragraph

In `src/pages/quiz.astro`, add a framing paragraph above the `QuizContainer` React island. This should be static HTML (not inside the React component):

```html
<div class="max-w-2xl mx-auto px-4 pt-8 pb-2">
  <p class="text-charcoal/70 text-sm leading-relaxed text-center italic">
    This quiz will show you what 2,000 years of church councils, confessions, and creeds
    make of your beliefs. But here's the thing — everyone who takes it gets flagged.
    The point isn't to condemn. It's to remind us that if every Christian is someone
    else's heretic, maybe we should hold our labels more lightly and hold each other
    more tightly.
  </p>
</div>
```

Place this **before** the `<QuizContainer client:load />` element.

## Task 3: Persistent Unity Section Below Quiz

In `src/pages/quiz.astro`, add a static HTML section **after** the `QuizContainer` React island. This section should always be visible regardless of quiz state.

```html
<section class="max-w-2xl mx-auto px-4 py-8 mt-4 border-t border-charcoal/10">
  <div class="bg-gold/5 border border-gold/20 rounded-xl p-6 md:p-8">
    <h2 class="text-lg font-bold text-charcoal mb-3 font-display">Unity in Christ</h2>

    <p class="text-charcoal/70 text-sm leading-relaxed mb-4">
      We must not mistake the means for the end. Truth is the means — God himself is the end.
      If every answer on this quiz has been condemned by <em>someone</em>, perhaps the labels
      were never the point. What the New Testament cares about most isn't getting the
      metaphysics exactly right — it's this:
    </p>

    <blockquote class="border-l-4 border-gold/40 pl-4 mb-4 space-y-2">
      <p class="text-charcoal/60 text-sm leading-relaxed italic">
        "Make every effort to keep the unity of the Spirit through the bond of peace.
        There is one body and one Spirit, just as you were called to one hope when you
        were called; one Lord, one faith, one baptism; one God and Father of all."
        <span class="not-italic text-charcoal/40">— Ephesians 4:3–6</span>
      </p>
      <p class="text-charcoal/60 text-sm leading-relaxed italic">
        "Do nothing out of selfish ambition or vain conceit. Rather, in humility
        value others above yourselves."
        <span class="not-italic text-charcoal/40">— Philippians 2:3</span>
      </p>
      <p class="text-charcoal/60 text-sm leading-relaxed italic">
        "My prayer is not for them alone. I pray also for those who will believe in me
        through their message, that all of them may be one."
        <span class="not-italic text-charcoal/40">— John 17:20–21</span>
      </p>
    </blockquote>

    <a
      href="/articles/unity-in-christ"
      class="inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold-light transition-colors"
    >
      Read: Unity in Christ — Why Your Heresy Doesn't Define You →
    </a>
  </div>
</section>
```

Use the site's existing color tokens (gold, charcoal, parchment). The section should feel warm and grounding — like a foundation beneath the quiz, not an afterthought.

## Verification
- Build the site (`npm run build`) and confirm no errors
- Test quiz flow: answer a question, go back, click "Change my answer", select a new answer
- Confirm heresy counter updates correctly when answers are changed
- Confirm the framing paragraph and unity section render on the quiz page
- Confirm the unity section is visible at all quiz states (answering, revealing, on question 1, on question 10)
