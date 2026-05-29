# Background systems

Editorial mode is **not** "a flat paper color with a faint grid." It's a layered atmosphere — paper grain + paper wash + (on hero pages) atmospheric radial overlay. Without the layers, the cards read as flat infographic templates regardless of typography, palette, or recipe choices on top.

Swiss mode is the opposite: deliberately flat. Paper grain and paper wash are disabled. Swiss identity comes from grid precision, single accent, and weight discipline — atmosphere would dilute it.

## Layer model

Editorial pages compose 3–4 layers under the content. They live on the framework's `.reader-page--social-card` element via pseudo-elements (no extra DOM):

```
.reader-page--social-card                               ← paper base color
  ├─ ::before              z-index 1   ← grain (dot pattern, multiply blend)
  ├─ ::after               z-index 1   ← paper wash (vertical ink tint)
  │   (when :has(.with-ink-wash))      ← atmospheric overlay replaces the
  │                                       plain wash on hero pages
  └─ .page-body            z-index 2   ← content
       └─ recipe section
            └─ SectionDivider::before  ← built-in atmosphere for dividers
```

The grain + wash layers ship in every social-card page. Recipes opt into the atmospheric overlay by rendering `.with-ink-wash` somewhere inside the page — the `:has(.with-ink-wash)::after` selector swaps the plain wash for the heavier composition.

## What each layer does

### Layer 1 — paper grain (`::before`)

A 3 px dot pattern at low opacity, multiply-blended onto the paper base. Reads as newsprint / book paper texture, not monitor glow.

Implementation: `background-image: radial-gradient(rgba(var(--openpress-ink-rgb), 0.045) 1px, transparent 1px); background-size: 3px 3px;`.

Tokens:
- `--social-card-grain-opacity` — overall layer opacity (default 0.35; Midnight Ink lower; Swiss 0)
- `--social-card-grain-blend` — `multiply` for light themes, `screen` for Midnight Ink, `normal` doesn't matter for Swiss because opacity is 0

### Layer 2 — paper wash (`::after`)

A vertical ink tint that gets stronger toward the bottom of the card. Creates "depth from the page bottom" — a magazine reading feel rather than a flat poster surface.

Implementation: `linear-gradient(180deg, rgba(ink-rgb, 0.02), rgba(ink-rgb, 0.045) 60%, rgba(ink-rgb, 0.065))`.

Tokens:
- `--social-card-paper-wash-opacity` — overall layer opacity (default ~0.85 on light themes; tuned per palette)

Swiss override: opacity 0. Flat surfaces are part of the Swiss system.

### Layer 3 — atmospheric ink-wash (`:has(.with-ink-wash)::after`)

For hero pages (covers, pull quotes, dividers), the `::after` selector is upgraded via `:has(.with-ink-wash)` to a heavier composition: two radial gradients (warm accent top-left, cool ink bottom-right) layered above the vertical wash.

This is the one place where atmospheric whitespace is the point — covers and dividers benefit from soft warm gradients that pull the eye toward the focal point.

When to enable: pass `inkWash` prop to `EditorialCover`, `PullQuote`, or wrap the relevant section in any container with class `with-ink-wash`. `SectionDivider` ships with its own atmospheric `::before`, so it doesn't need the page-level overlay.

Don't apply `.with-ink-wash` to evidence pages, tall ledgers, or dense essays — the atmosphere will compete with the content.

## RGB triplet tokens

The wash layers use stacked `rgba()` rules at varying opacity. CSS can't extract `rgb()` channels from a hex value, so every palette exposes both:

- Hex tokens for direct color use: `--openpress-color-ink`, `--openpress-color-document`, `--openpress-accent`
- RGB triplets for opacity composition: `--openpress-ink-rgb`, `--openpress-paper-rgb`, `--openpress-accent-rgb`

When adding a custom palette, define both forms — components using `rgba(var(--openpress-ink-rgb), 0.X)` will fail silently if the RGB form is missing.

## Per-theme overrides

The default tokens work for the five light Editorial palettes. The dark Midnight Ink palette and the Swiss palettes override the background-system tokens:

| Palette | Grain opacity | Grain blend | Paper wash | Notes |
| --- | --- | --- | --- | --- |
| Ink Classic / Indigo Porcelain / Forest Ink / Kraft Paper / Dune | 0.35 | multiply | vertical ink tint | The standard Editorial atmosphere. |
| Midnight Ink | 0.26 | screen | gilt-tinted vignette | Dark themes need warm specks (screen blend) and a cinematic vignette instead of vertical tint — light-paper math doesn't carry over. |
| IKB Blue / Cinnabar | 0 | — | disabled | Swiss surfaces are deliberately flat. |

## WebGL — explicitly not ported

The upstream guizang skill uses a WebGL canvas (`assets/magazine-bg-webgl.js`) for the deepest atmospheric layer — a frozen ink-flow background that gives covers / dividers / pull quotes their strongest identity.

This skill does **not** ship a WebGL background:

- It's skill-local runtime, which violates the OpenPress two-layer split.
- It requires a JS dependency in every workspace; the substrate boundary says skills don't bring runtime.
- Per the upstream's own "2D Fallback" guidance, the CSS gradient + paper-grain + paper-wash combination gives ≈ 90 % of the visual identity with 0 % of the runtime cost.

The CSS atmosphere layers documented above are the OpenPress-native fallback. If the WebGL feel becomes critical for a future recipe, the right answer is to put the fluid renderer in OpenPress (e.g. `openpress preview` could render a canvas) — **not** to ship a Playwright script from this skill.

## Anti-patterns

- **Flat paper page** — paper color with nothing on top. Fails the Editorial identity test even if the typography and recipe choices are right.
- **Grid / dot-matrix / drafting-paper backgrounds** that act as page-wide drafting paper. The 3 px grain is small enough to read as texture; anything visible at thumbnail size reads as a graph paper template.
- **Decorative blobs** with no relationship to the layout — ovals, drops, circles. The atmosphere layers use radial gradients, not visible shapes.
- **Strong background marks behind body text** — even the grain + wash combo shouldn't lower body readability. If a recipe needs darker ink wash, the body text needs higher contrast (use a different theme, not a manual override).
- **Atmosphere on every page** — `.with-ink-wash` is for hero pages only. Applying it to evidence walls or tall ledgers competes with the content.

## When the validator hook ships

The `editorial-identity` rule in `validator-rules.md` is expected to check:

- Paper grain is rendered (`.reader-page--social-card::before` has visible opacity > 0)
- Paper wash is rendered (`.reader-page--social-card::after` exists)
- Display title uses a serif family
- At least one of: large photo well, serif pull quote, marginalia column, true ledger

The first two conditions verify the background system is intact — without them, the page reads as "Swiss-with-a-serif" no matter what type + recipe choices are on top.
