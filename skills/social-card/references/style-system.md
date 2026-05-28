# Style system

Two visual stances ship in v1: **Editorial** (paper, serif, atmosphere) and **Swiss** (graphic, sans, flat surfaces). Pick one per carousel — mixing them inside a single package is a soft anti-pattern that requires explicit user opt-in.

The full design vocabulary, recipe taxonomy, and porting decisions live in `references/visual-grammar.md`. This file is the **quick reference** for picking a mode and applying its tokens correctly.

## Shared rules (both modes)

- **Content shape decides layout.** Don't pick a pretty recipe and fill content to match. Story plan first, then map each card to a recipe.
- **Hierarchy is mandatory.** Title → hook → evidence → caption → metadata. Every page has a clear focal point.
- **One accent per carousel.** Across all pages, one `--openpress-accent` value. Mixed accents read as a stock-template generator.
- **No decorative shapes.** No SVG blobs, ovals, drops, ornamental stickers, or gradient backgrounds outside the sanctioned ink-wash atmosphere.
- **Real images as evidence,** not decoration. If the photo isn't carrying meaning, switch to a typographic recipe.

## Editorial mode

**Use when** the content wants a slow magazine-feature pace: essays, reflective writing, product retrospectives, AI think-pieces, outdoor field notes, cultural pieces. Topic is decoupled from mode — any topic can render Editorial; the question is the editorial intent.

### Visual anchors

- Serif display (Source Serif / Noto Serif / Songti) for title and body.
- Mono (IBM Plex Mono) for kickers, meta strips, footer labels.
- Warm paper background with a paper-grain atmosphere layer.
- One accent used sparingly: anchor number, page kicker, pull-quote rule, or one inline emphasis.
- Generous whitespace anchored by hairline rules.

### Type stance — "the larger, the lighter"

This is non-negotiable for Editorial:

- Display weight **500**, wide tracking (`+0.03em` to `+0.04em`).
- Body weight **400**, serif family.
- Kicker / meta / labels weight **500**, mono, wide tracking (`+0.20em` to `+0.22em`).

The component classes (`.editorial-cover__title`, `.editorial-tall-ledger__title`, etc.) bake these in. Don't override with inline styles — overriding is how Editorial collapses into generic landing-page editorial.

### Background

Flat paper color alone is not enough for Editorial. The paper grain overlay is always on (`.reader-page--social-card::before`). Covers and pull quotes can additionally enable the ink-wash atmosphere via the `inkWash` prop / `.with-ink-wash` modifier.

### Palettes

Use one of the 5 light palettes or Midnight Ink. See `theme-presets.md`. Do not improvise warm paper colors.

## Swiss mode

**Use when** the content wants engineered / quantified pacing: release notes, comparison posts, product updates, software explainers, data summaries, campaign moments. Topic is decoupled from mode — any topic can render Swiss; the question is the visual intent.

### Visual anchors

- Inter / Noto Sans family throughout. No serif loaded.
- Very light display weights (`≤ 300`) on huge type; stronger weights (`500–650`) on small labels.
- Strict left alignment, asymmetric whitespace.
- White / off-white paper with refined greys and exactly one high-saturation accent.
- Straight modules, hairline rules; no rounded cards, no shadows, no glassmorphism.

### Type guidance

| Role | Size | Weight |
| --- | --- | --- |
| Cover statement | 84 – 128 px | 200 – 400 |
| Page title | 52 – 82 px | 300 – 500 |
| Body | 28 – 42 px | 400 – 500 |
| Captions / meta | 20 – 28 px | 500 – 650 |

The `SwissStatement` component bakes these in. Chinese display titles are visually dense — shorten content first; do not solve overflow by shrinking body text below the readable floor.

### Palettes

Use one of the 2 Swiss palettes (IKB Blue, Cinnabar). See `theme-presets.md`. One package, one accent.

## Mode identity tests

A poster compiles cleanly long before its style identity is right. Both identity tests have structured rule specs in `references/validator-rules.md`. The narrative versions:

### Editorial identity

A page is Editorial only if **all three** hold:

1. At least one atmosphere layer beyond a flat fill — paper grain (always on) or ink-wash.
2. Display title uses a serif family.
3. The page contains at least one of: large photo well, serif pull quote, marginalia column, or true ledger.

A flat paper background + serif title + mono labels everywhere = **Swiss-with-a-serif**, not Editorial.

### Swiss identity

A page is Swiss only if **all four** hold:

1. Display title (≥ 72 px) uses a typed class with computed weight ≤ 300.
2. No serif family loaded in the document.
3. Section separators are hairline rules or grid gutters, not card borders + drop shadows.
4. Exactly one accent palette across the whole carousel.

A bold 90 px headline, a serif fallback, or mixed accents instantly downgrades Swiss to generic landing-page editorial.

## Anti-patterns

These all render without errors but fail the identity tests:

- **Thick big title in Swiss.** Inline 700–800 weight on a huge title. Always use the typed `.swiss-statement__display` class; don't bypass with inline `font-weight`.
- **Editorial without atmosphere.** Flat paper background + serif title + mono labels everywhere. Fix by enabling `inkWash` on covers, adding a large image well, or switching to Swiss honestly.
- **Footer collision.** Absolutely-positioned footer crashed by overflowing content above. The recipes use flex / grid patterns; don't introduce `position: absolute; bottom: ...`.
- **Full-bleed photo with title crossing subject.** Looks dramatic at 100 % zoom, unreadable at thumbnail. Map the subject before placing the title; document the safe zone as a comment near the `<img>`.

## Where the tokens live

`press/theme/tokens.css` is the single source of truth for palette + type scale + grain settings. Override via `[data-theme="..."]` (for palette swaps) or by editing the file directly (for brand customization).

`press/theme/social-card.css` defines the recipe layout classes. Don't paste inline `style={}` into MDX cards — if a brand needs a token that doesn't exist, add it to `tokens.css` with the `--social-card-` prefix.
