# Prompt 10: Full UI Redesign — Typography, Spacing, Alignment & Visual Polish

## Context

This is an Astro 6 + React islands site (TypeScript, Tailwind CSS v4, Framer Motion). The site is fully built and functional. This prompt is a **UI-only redesign** — no changes to data, logic, routing, scoring, content, or state management. Every change is visual/CSS/markup.

The goal: make the site look professionally designed by fixing systemic typography, spacing, and alignment issues, and applying modern UI best practices consistently across every page and component.

**CRITICAL RULES:**
- Do NOT change any TypeScript types, quiz logic, scoring functions, data files, or content text
- Do NOT change routing, page structure, or component architecture
- Do NOT remove any existing functionality (animations, accessibility, SEO, sessionStorage, etc.)
- Do NOT change the color palette (charcoal/gold/crimson/parchment) — only refine how colors are applied
- DO preserve all Framer Motion animations and `prefers-reduced-motion` support
- DO preserve all ARIA attributes and semantic HTML
- Run `npm run build` after all changes to verify zero build errors

---

## Issue 1: Redundant Inline Font Declarations (HIGH PRIORITY)

### Problem
`style={{ fontFamily: "'Playfair Display', Georgia, serif" }}` and `style="font-family: 'Playfair Display', Georgia, serif;"` are scattered across almost every component as inline styles, even though `global.css` already declares:

```css
h1, h2, h3 {
  font-family: var(--font-family-display);
}
```

This causes several problems:
- Inline styles have highest specificity, making the design system unoverridable
- The font-family string is duplicated 15+ times across files — if we ever change fonts, we'd miss some
- Some components use slightly different strings (e.g., `'Playfair Display', serif` vs `'Playfair Display', Georgia, serif`)
- React components can't use CSS custom properties in inline styles without extra work

### Fix
1. **Remove ALL inline `fontFamily` / `font-family` declarations** from these files:
   - `src/components/ui/HeroSection.astro` (lines 9, 25, 44)
   - `src/components/layout/Header.astro` (line 19)
   - `src/components/layout/Footer.astro` (line 9)
   - `src/components/quiz/QuestionCard.tsx` (line 27)
   - `src/components/quiz/RevealCard.tsx` (lines 55, 110)
   - `src/components/quiz/HeresyProfileCard.tsx` (lines 60, 100, 118, 148, 197)
   - `src/pages/index.astro` (lines 33, 38, 43, 62, 75)

2. **Add Tailwind utility classes** in `global.css` so the design system handles fonts:
   ```css
   /* Add to @theme block */
   --font-display: 'Playfair Display', Georgia, serif;
   --font-body: 'Inter', system-ui, sans-serif;
   --font-content: 'Crimson Text', Georgia, serif;
   ```

3. **For elements that aren't h1-h3 but need display font** (buttons, number badges, special paragraphs), add a utility class:
   ```css
   .font-display {
     font-family: var(--font-family-display);
   }
   .font-content {
     font-family: var(--font-family-content);
   }
   ```
   Then replace inline styles with `class="font-display"` or `className="font-display"`.

4. **In React components**, replace `style={{ fontFamily: "..." }}` with `className="font-display"` using the utility class.

---

## Issue 2: HereticTick Alignment (HIGH PRIORITY)

### Problem
The `HereticTick.astro` component uses `vertical-align: 0.1em` which doesn't properly center-align the tick with adjacent text at different font sizes. Additionally, the `HeresyProfileCard.tsx` uses an `<img>` tag for the tick instead of the Astro component (because it's a React island), with *different* alignment values (`verticalAlign: '0.15em'`). This inconsistency means the tick looks different on the results page vs everywhere else.

### Fix

**A) Fix HereticTick.astro alignment:**
Replace the current inline style:
```
style={`display: inline-block; vertical-align: 0.1em; margin-left: 0.08em;`}
```
With:
```
style={`display: inline-block; vertical-align: middle; margin-left: 0.1em; transform: translateY(-0.05em);`}
```

The `vertical-align: middle` + small `translateY` correction is more robust across font sizes than a fixed em offset. Test this at all three sizes (sm, md, lg) in the header, hero, and footer.

**B) Create a React version of the tick for use in React islands:**
Create `src/components/quiz/HereticTickReact.tsx`:
```tsx
interface Props {
  size?: 'sm' | 'md' | 'lg';
}

const dims = { sm: '0.7em', md: '0.85em', lg: '1.1em' };

export default function HereticTickReact({ size = 'md' }: Props) {
  const dim = dims[size];
  const id = `tick-${Math.random().toString(36).slice(2, 8)}`;

  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        marginLeft: '0.1em',
        transform: 'translateY(-0.05em)',
      }}
      className="heretic-tick"
    >
      <defs>
        <linearGradient id={`gs-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7E7B5"/>
          <stop offset="40%" stopColor="#E0B45C"/>
          <stop offset="100%" stopColor="#C8922A"/>
        </linearGradient>
        <filter id={`gl-${id}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="22" result="blur"/>
          <feColorMatrix in="blur" type="matrix"
            values="1 0.7 0 0 0.15 0.8 0.55 0 0 0.08 0 0 0 0 0 0 0 0 0.6 0" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <g filter={`url(#gl-${id})`}>
        <path
          className="tick-main"
          d="M180 470 L380 740 L860 185"
          fill="none"
          stroke={`url(#gs-${id})`}
          strokeWidth="72"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="tick-shine"
          d="M180 470 L380 740 L860 185"
          fill="none"
          stroke="#FFF6D5"
          strokeOpacity="0.35"
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
```

Then in `HeresyProfileCard.tsx`, replace the `<img src="/tick.svg" ...>` with `<HereticTickReact />` so alignment is identical everywhere.

---

## Issue 3: Establish a Type Scale (MEDIUM PRIORITY)

### Problem
Font sizes are ad-hoc across components. There's no consistent typographic hierarchy. Sizes like `text-5xl md:text-7xl lg:text-8xl`, `text-2xl md:text-3xl`, `text-xl`, `text-lg`, `text-base`, `text-sm`, `text-xs` are used without a clear system.

### Fix
Define and apply a consistent type scale in `global.css`. Use this hierarchy:

| Role | Mobile | Desktop | Tailwind | Usage |
|------|--------|---------|----------|-------|
| Display | 2.5rem (40px) | 4rem (64px) | `text-4xl md:text-6xl` | Hero h1 only |
| Page title | 2rem (32px) | 2.5rem (40px) | `text-3xl md:text-4xl` | Page h1s (quiz results, explore, about) |
| Section heading | 1.5rem (24px) | 1.875rem (30px) | `text-2xl md:text-3xl` | Section h2s |
| Card heading | 1.25rem (20px) | 1.25rem (20px) | `text-xl` | Card h3s, reveal titles |
| Body large | 1.125rem (18px) | 1.125rem (18px) | `text-lg` | Lead paragraphs, quiz answers |
| Body | 1rem (16px) | 1rem (16px) | `text-base` | Default body text |
| Small | 0.875rem (14px) | 0.875rem (14px) | `text-sm` | Secondary text, metadata |
| Micro | 0.75rem (12px) | 0.75rem (12px) | `text-xs` | Labels, badges, captions |

Apply these changes:
1. **Hero h1**: Change from `text-5xl md:text-7xl lg:text-8xl` to `text-4xl md:text-6xl`. The current sizes are too large and cause the title to feel cramped on tablets.
2. **HeresyProfileCard h1** ("Your Heresy Profile"): Change from `text-4xl md:text-5xl` to `text-3xl md:text-4xl`.
3. **QuestionCard h2**: Keep `text-2xl md:text-3xl` (already correct).
4. **RevealCard h3**: Keep `text-xl` (already correct).
5. **"How It Works" numbers**: Change from `text-4xl` to `text-3xl` — they currently overpower the heading above them.

### Line Height
Add consistent line-heights to `global.css`:
```css
h1, h2, h3 {
  font-family: var(--font-family-display);
  line-height: 1.2; /* Tight for headings */
}

body {
  line-height: 1.6; /* Comfortable for body text */
}
```
Currently there's no global line-height set, causing each component to inherit browser defaults (typically 1.2 for body, which is too tight for reading).

---

## Issue 4: Spacing System (MEDIUM PRIORITY)

### Problem
Spacing values are inconsistent: `py-24 md:py-32`, `py-16`, `py-8`, `mb-6`, `mb-4`, `mb-3`, `mb-2`, `gap-3`, `gap-6`, `gap-8`, `space-y-6`, `space-y-3`, `space-y-4`, `space-y-8`. There's no rhythm.

### Fix
Establish an 8px-based spacing scale and apply it consistently:

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Micro gaps (icon + label) |
| `space-2` | 8px | Tight spacing (badge padding, list items) |
| `space-3` | 12px | Small gaps (between related elements) |
| `space-4` | 16px | Standard gap (between paragraphs, form fields) |
| `space-6` | 24px | Medium gap (between card sections) |
| `space-8` | 32px | Large gap (between page sections) |
| `space-12` | 48px | Section padding |
| `space-16` | 64px | Page section vertical padding |
| `space-20` | 80px | Hero section vertical padding |

Apply these specific fixes:

1. **Hero section**: Change `py-24 md:py-32` to `py-16 md:py-24` — the current padding is excessive, pushing the CTA below the fold on many screens.
2. **"How It Works" section**: Change `py-16` to `py-12 md:py-16` for mobile breathing room.
3. **Featured Articles section**: Change `py-16` to `py-12 md:py-16`.
4. **QuizContainer**: Change `py-8` to `py-6 md:py-10` — more breathing room on desktop.
5. **Between hero subtitle and CTA buttons**: Change `mb-10` to `mb-8` — tighten the gap slightly.
6. **Article cards grid**: Change `gap-6` to `gap-6 md:gap-8` for desktop.
7. **Stats grid in HeresyProfileCard**: Change `gap-3` to `gap-4` — the current gap is too tight.

---

## Issue 5: Answer Option Touch Targets & Hover States (MEDIUM PRIORITY)

### Problem
Answer option buttons (`AnswerOption.tsx`) have `p-4` padding which gives a 16px touch target padding, but the actual tap area may be smaller than 44px for short answer text. The hover state uses `hover:border-crimson hover:bg-crimson/5` which feels aggressive — crimson suggests "wrong answer" or "danger."

### Fix
1. **Increase padding**: Change `p-4` to `p-4 md:p-5` (add desktop breathing room).
2. **Add minimum height**: Add `min-h-[52px]` to ensure consistent touch targets.
3. **Soften hover state**: Change `hover:border-crimson hover:bg-crimson/5` to `hover:border-gold/60 hover:bg-gold/5`. Gold is the site's interactive/accent color and doesn't carry "danger" connotations. Reserve crimson for post-selection reveals.
4. **Improve selected state**: The current `border-gold bg-gold/10 shadow-md` is good, but add a subtle left-border accent: change to `border-gold bg-gold/8 shadow-md border-l-4 border-l-gold`.
5. **Add focus-visible ring**: Add `focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2` for keyboard navigation.
6. **Improve the faded/other state**: Change `opacity-50` to `opacity-60` — 50% is too faded and hard to read.

---

## Issue 6: Card & Container Consistency (MEDIUM PRIORITY)

### Problem
Different border-radius values across components: `rounded-lg`, `rounded-xl`, some with no rounding. Border styles vary: `border-2`, `border`, `border-charcoal/10`, `border-charcoal/15`.

### Fix
Standardise on two card styles used site-wide:

**Card (default):**
```
rounded-xl border border-charcoal/10 bg-white
```
Used for: article cards, heresy list items, "How It Works" steps, stats grid items.

**Card (elevated/interactive):**
```
rounded-xl border border-charcoal/10 bg-white shadow-sm hover:shadow-md hover:border-gold/30 transition-all
```
Used for: clickable article cards, heresy links, answer options (pre-selection).

**Card (reveal/alert):**
```
rounded-xl border-2 [severity-border-color] [severity-bg-color]
```
Used for: RevealCard, anti-Nicene commentary, special callouts. Keep `border-2` here for emphasis.

Apply changes:
1. **Answer options**: Change `rounded-lg border-2` to `rounded-xl border` (softer, less aggressive).
2. **Selected answer**: Keep `border-2` only for the selected state (visual emphasis on selection).
3. **RevealCard**: Keep `rounded-xl border-2` (already correct for alert pattern).
4. **Article cards on index.astro**: Already use `rounded-xl border` — correct.
5. **Stats grid items in HeresyProfileCard**: Change `rounded-xl` to `rounded-xl` (already correct), but add consistent padding: change `p-4` to `p-4 md:p-5`.
6. **"How It Works" steps**: Wrap each step in a card: `rounded-xl border border-charcoal/5 bg-white/60 p-6 md:p-8`. Currently they're just `p-6` divs floating in space.

---

## Issue 7: Button Design System (MEDIUM PRIORITY)

### Problem
Buttons are styled differently everywhere:
- Hero CTA: `px-8 py-4 bg-gold text-charcoal font-bold rounded-lg text-lg`
- RevealCard next: `px-6 py-3 bg-gold text-charcoal rounded-lg font-bold`
- Results retake: `px-6 py-3 border-2 border-charcoal/20 text-charcoal rounded-lg font-semibold`
- No results CTA: `px-6 py-3 bg-gold text-charcoal font-bold rounded-lg`

Inconsistent padding, border-radius, and font-weight.

### Fix
Define two button styles applied globally:

**Primary button:**
```
px-6 py-3 bg-gold text-charcoal font-bold rounded-xl text-base hover:bg-gold-light transition-colors shadow-sm hover:shadow-md font-display
```

**Secondary/outline button:**
```
px-6 py-3 border border-charcoal/20 text-charcoal font-semibold rounded-xl text-base hover:border-gold hover:text-gold transition-colors
```

**Ghost/link button:**
```
px-4 py-2 text-crimson font-medium text-sm hover:text-crimson-light underline underline-offset-2 transition-colors
```

Apply changes:
1. **Hero primary CTA**: Change from `px-8 py-4 ... rounded-lg text-lg` to `px-8 py-4 ... rounded-xl text-lg` (keep larger sizing for hero, but unify border-radius).
2. **Hero secondary CTA**: Change `border-2 border-parchment/30` to `border border-parchment/30` and add `rounded-xl`.
3. **RevealCard "Next Question" button**: Apply primary button pattern with `rounded-xl`.
4. **"Take the Quiz" fallback buttons**: Apply primary button pattern.
5. **"Retake Quiz" button**: Apply secondary button pattern with `rounded-xl`.
6. Note: The existing `Button.astro` component already exists but isn't used consistently. Consider using it more broadly, or at minimum make the Tailwind classes match across all buttons.

---

## Issue 8: Header & Navigation Polish (LOW PRIORITY)

### Fix
1. **Header height**: Add explicit `h-16` to the nav for consistent height.
2. **Logo text**: The header logo is currently just text + tick. Add `tracking-tight` to tighten the letter-spacing.
3. **Nav link hover**: Add `hover:underline underline-offset-4 decoration-2 decoration-crimson` for a more polished hover indicator instead of just color change.
4. **Mobile menu**: Add a subtle entrance animation — `transition-all duration-200` on the mobile menu div, and toggle between `max-h-0 overflow-hidden` and `max-h-48` instead of `hidden`. This gives a smooth slide-down rather than abrupt appear/disappear.
5. **Active page indicator**: Currently uses `text-crimson` for active. Add `font-semibold` to the active state for more visual weight.

---

## Issue 9: Footer Polish (LOW PRIORITY)

### Fix
1. **Footer text hierarchy**: The tagline "Built with historical sass..." should use `font-content` (Crimson Text) instead of the default Inter, to feel warmer.
2. **Footer links**: Add `hover:underline underline-offset-4` for consistency with header.
3. **Add slight top padding**: Change `py-10` to `py-12` for more breathing room.
4. **Disclaimer text**: Change `text-parchment/40` to `text-parchment/50` — 40% opacity is below WCAG minimum contrast.

---

## Issue 10: ProgressBar Polish (LOW PRIORITY)

### Fix
1. **Track height**: Change `h-1.5` to `h-2` for more visual presence.
2. **Add subtle background**: Change `bg-charcoal/10` to `bg-charcoal/8` (lighter track).
3. **Gold bar**: Add `shadow-sm shadow-gold/20` for a subtle glow effect matching the tick's gold aesthetic.
4. **Text**: Change `text-charcoal/40` (percentage) to `text-charcoal/50` for readability.

---

## Issue 11: Results Page Payoff Message (LOW PRIORITY)

### Fix
The payoff message box (`bg-charcoal text-parchment rounded-xl p-8 md:p-10`) is good but could be elevated:
1. **Add subtle border**: Add `border border-gold/10` for definition.
2. **The list of values** (Love, Justice, Unity, Humility, Relationship): These currently use `<ul>` with `<li>` elements. Add `list-none` and style each item with a gold dash or bullet: prefix each with `<span className="text-gold mr-2">—</span>` instead of default list bullets, to match the medieval aesthetic.
3. **Final italic paragraph**: Change from `text-parchment/60` to `text-parchment/50` — just slightly more visible.

---

## Issue 12: Global CSS Additions

Add these to `global.css`:

```css
/* Utility classes for font families */
.font-display {
  font-family: var(--font-family-display);
}
.font-content {
  font-family: var(--font-family-content);
}

/* Smooth consistent line-heights */
body {
  font-family: var(--font-family-body);
  color: var(--color-charcoal);
  background-color: var(--color-parchment);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3 {
  font-family: var(--font-family-display);
  line-height: 1.2;
  letter-spacing: -0.01em;
}

/* Improve text rendering */
h1 {
  letter-spacing: -0.02em;
}
```

---

## Issue 13: Responsive & Mobile Fixes

### Fix
1. **Hero title on small phones** (< 375px): `text-4xl` can still overflow. Add `text-3xl sm:text-4xl md:text-6xl` for a 3-tier breakpoint scale.
2. **Stats grid**: Change `grid-cols-2 md:grid-cols-4` to `grid-cols-2 lg:grid-cols-4` — on tablets (768-1024px), 4 columns are too cramped.
3. **Answer options**: Ensure `text-base` (16px) minimum on mobile — never smaller.
4. **Article cards**: On mobile, stack to single column: change `grid md:grid-cols-3` to `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.
5. **Payoff message padding**: Change `p-8 md:p-10` to `p-6 md:p-10` — 32px padding on a 375px screen leaves very little content width.

---

## Issue 14: Accessibility Improvements

### Fix
1. **Color contrast**: Check that `text-charcoal/60` on `bg-parchment` meets WCAG AA (4.5:1). If not, bump to `text-charcoal/70`.
2. **Answer buttons**: Add `role="radio"` and `aria-checked` instead of `aria-pressed` (since answers are mutually exclusive, they're radio behavior not toggle behavior).
3. **Council badges overflow**: The `max-h-28 overflow-y-auto` scrollable area in RevealCard needs `tabindex="0"` and `role="region"` with `aria-label="Condemning councils"` so keyboard users can scroll it.
4. **Mobile menu button**: Add `aria-controls="mobile-menu"` to link button to menu.
5. **Skip to content link**: Add a visually-hidden skip link in `BaseLayout.astro`:
   ```html
   <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-charcoal focus:rounded-lg">
     Skip to content
   </a>
   ```
   And add `id="main-content"` to the `<main>` element.

---

## Execution Order

Work through these issues in this order to minimise conflicts:
1. **Issue 12** — Global CSS additions (foundation for everything else)
2. **Issue 1** — Remove inline font declarations (cleanup before other changes)
3. **Issue 3** — Type scale (establishes hierarchy)
4. **Issue 2** — Tick alignment + React tick component
5. **Issue 4** — Spacing system
6. **Issue 5** — Answer options
7. **Issue 6** — Card consistency
8. **Issue 7** — Button system
9. **Issue 8** — Header
10. **Issue 9** — Footer
11. **Issue 10** — Progress bar
12. **Issue 11** — Payoff message
13. **Issue 13** — Responsive fixes
14. **Issue 14** — Accessibility

After all changes, run:
```bash
npm run build
```
Verify zero errors. If the build produces warnings about unused CSS or other non-blocking issues, note them but don't chase them.

---

## Files to Modify (Complete List)

### CSS
- `src/styles/global.css`

### Layouts
- `src/layouts/BaseLayout.astro`

### Components (Astro)
- `src/components/ui/HereticTick.astro`
- `src/components/ui/HeroSection.astro`
- `src/components/layout/Header.astro`
- `src/components/layout/Footer.astro`

### Components (React) — modify
- `src/components/quiz/QuestionCard.tsx`
- `src/components/quiz/AnswerOption.tsx`
- `src/components/quiz/RevealCard.tsx`
- `src/components/quiz/HeresyProfileCard.tsx`
- `src/components/quiz/ProgressBar.tsx`
- `src/components/quiz/QuizContainer.tsx`

### Components (React) — create
- `src/components/quiz/HereticTickReact.tsx`

### Pages
- `src/pages/index.astro`
- `src/pages/quiz.astro`
- `src/pages/results.astro`

### DO NOT MODIFY
- `src/data/*` (all data files)
- `src/lib/*` (scoring, sharing)
- `src/content/*` (MDX content)
- `src/data/types.ts`
- `astro.config.mjs`
- `package.json`
- `tsconfig.json`
