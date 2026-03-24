# 09 — "Heretick" Tick Pun Implementation

## Context

The domain is `areyouaheretick.com` — the Old English "heretick" spelling hides a visual pun: **heretic + tick (✓)**. The joke is that the answer to "Are you a heretic?" is always "Yes" — so a gold checkmark appears after the question mark, like a verdict already rendered.

This is a **subtle, delightful** easter egg — not a redesign. The tick is clean and modern, matching the playful tone of the site. People who notice the domain spelling will get the joke. Everyone else just sees a satisfying gold mark.

## Assets Already Created

Two SVG files have been added to `/public/`:

- **`/public/tick.svg`** — Clean gold checkmark on a transparent background (1024×1024 viewBox). Uses a gold gradient (`#F7E7B5` → `#E0B45C` → `#A86B1F`) with a highlight overlay. **Already has CSS `stroke-dashoffset` draw-on animation built in** — the tick "draws itself" over 0.5s after a 0.8s delay. Respects `prefers-reduced-motion`. This is the inline tick that appears after titles.

- **`/public/favicon-tick.svg`** — Same animated checkmark inside a dark circular background (`#1a1a2e`/`#252547`) with a thin gold ring. Designed to work as a favicon at small sizes.

## Implementation Tasks

### 1. Replace the favicon

In `src/layouts/BaseLayout.astro`, update the favicon reference:

```html
<!-- Replace this: -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<!-- With this: -->
<link rel="icon" type="image/svg+xml" href="/favicon-tick.svg" />
```

Keep the old `favicon.svg` in `/public/` for now (don't delete it).

### 2. Create an inline `HereticTick` component

Create a new Astro component at `src/components/ui/HereticTick.astro` that renders the tick inline after text. It should:

- Use an `<img src="/tick.svg">` tag — **not** an inline embed. The SVG already has its draw-on animation self-contained, so an `<img>` tag is correct here and keeps components simple.
- Size it relative to the surrounding text. The component accepts an optional `size` prop (`"sm" | "md" | "lg"`):
  - `sm`: `0.5em` wide × `0.5em` tall — for the header nav and footer
  - `md`: `0.65em` wide × `0.65em` tall — default, for section headings
  - `lg`: `0.8em` wide × `0.8em` tall — for the hero h1
- Add `alt="✓"` for accessibility
- Vertically align slightly above the baseline: `style="vertical-align: 0.15em"` (adjust if needed per context)
- Add `aria-hidden="true"` since it's decorative — the tick is a pun, not meaningful content

The component should look like:

```astro
---
interface Props {
  size?: 'sm' | 'md' | 'lg';
}
const { size = 'md' } = Astro.props;
const dims = { sm: '0.5em', md: '0.65em', lg: '0.8em' };
const dim = dims[size];
---
<img
  src="/tick.svg"
  alt="✓"
  aria-hidden="true"
  style={`display: inline-block; width: ${dim}; height: ${dim}; vertical-align: 0.15em; margin-left: 0.05em;`}
/>
```

The animation (0.8s delay, 0.5s draw-on, respects `prefers-reduced-motion`) is already embedded in the SVG — no additional CSS needed in the component.

### 3. Add the tick to these locations

**Hero Section** (`src/components/ui/HeroSection.astro`):
After the `?` in the main h1 — this is the primary placement:

```html
<!-- Current: -->
Are You a <span class="text-gold">Heretic</span>?

<!-- Updated: -->
Are You a <span class="text-gold">Heretic</span>?<HereticTick size="lg" />
```

**Header** (`src/components/layout/Header.astro`):
After the nav brand text:

```html
<!-- Current: -->
Are You a Heretic?

<!-- Updated: -->
Are You a Heretic?<HereticTick size="sm" />
```

**Footer** (`src/components/layout/Footer.astro`):
After the footer site name:

```html
<!-- Current: -->
Are You a Heretic?

<!-- Updated: -->
Are You a Heretic?<HereticTick size="sm" />
```

### 4. Add a tick to the quiz results heading

In the `HeresyProfileCard.tsx` React component, add a small gold tick after the results title/verdict. Since the animation is embedded in the SVG, the React component is simple — just an `<img>` tag:

```tsx
// Inline in HeresyProfileCard.tsx where the verdict heading is rendered:
<img
  src="/tick.svg"
  alt="✓"
  aria-hidden={true}
  style={{ display: 'inline-block', width: '0.65em', height: '0.65em', verticalAlign: '0.15em', marginLeft: '0.05em' }}
/>
```

No separate React component needed. Add it after whatever heading text announces the verdict (e.g., after "Your Heresy Profile" or the main result title). The SVG's own animation handles the draw-on effect.

## Design Constraints

- **Do NOT change any text content.** The title stays "Are You a Heretic?" — we're only adding a visual tick after it.
- **Do NOT change the domain references** in SEO meta, schema.org, or sitemap.
- **Subtle is the goal.** The tick should feel like a cheeky annotation, not a loud badge. It's gold, small, and slightly translucent — like a scribe's mark in the margin.
- **Keep the existing flame favicon.ico** as fallback for browsers that don't support SVG favicons. Only swap the SVG favicon.
- The animation delay (0.8s) is deliberate — it gives people time to read the question before the "answer" appears. This is the comedic timing of the pun.

## Testing

After implementation:
1. Run `npm run build` to confirm no errors
2. Check the hero section — tick should appear after "Are You a Heretic?" with a delayed fade-in
3. Check the header and footer — smaller tick, same animation
4. Check with browser devtools → "Prefers reduced motion" enabled — tick should appear immediately without animation
5. Check the favicon in the browser tab — should show the gold tick on dark seal
6. Check mobile layout — tick should scale proportionally and not break text flow
