# Swiss primitives

Swiss International is **not** "an Editorial layout with a blue accent." It's a complete design primitive system — type roles, layout primitives, card fills, decorative mats, and chrome — that compose into recipes (S01–S12 family).

This reference documents the primitive layer that lives in `theme/base/swiss.css`. Recipe components (`SwissAccentCover`, `SwissTwoSignals`, `SwissFileCard`, `SwissLedger`, `SwissStatement`) compose these primitives. MDX cards typically don't touch the primitives directly — but agents extending the skill should.

## Type roles

Calibrated for 1080×1440 (the only board in v1). Sizes step down from upstream's wide-board defaults because 1440 px of vertical budget needs lighter weight at the top of the scale. The non-negotiable rule: **the larger, the lighter**.

| Class | Size | Weight | Tracking | Used for |
| --- | --- | --- | --- | --- |
| `.swiss-h-hero` | 168 px | 200 | −0.02em | Hero statement, single sentence cover |
| `.swiss-h-statement` | 124 px | 200 | −0.015em | Cover title, page title for impact pages |
| `.swiss-h-xl` | 96 px | 300 | −0.01em | Page title, headline |
| `.swiss-h-md` | 56 px | 400 | 0 | Module title, card title |
| `.swiss-lead` | 30 px | 400 | 0 | Body intro, subtitle |
| `.swiss-body` | 26 px | 400 | 0 | Body copy |
| `.swiss-t-cat` | 22 px | 600 | +0.08em uppercase | Kicker / category — **accent colour** |
| `.swiss-t-meta` | 20 px | 500 | +0.14em uppercase mono | Footer metadata, file labels |
| `.swiss-num-mega` | 168 px | 200 | −0.03em | Big stat number |
| `.swiss-num-xl` | 120 px | 200 | −0.02em | Mid-size stat number |

Hard rule: **never override `.swiss-h-*` weight with inline `font-weight`**. A 90 px h1 at weight 700+ collapses Swiss into generic landing-page editorial. The typed classes bake in the right weight; bypassing them is the most common Swiss identity failure.

## Layout primitives

Drop-in utility classes for Swiss recipe internals. All prefixed `.swiss-` to keep the namespace clean.

| Class | Purpose |
| --- | --- |
| `.swiss-stack` | `display: flex; flex-direction: column` |
| `.swiss-row` | `display: flex; flex-direction: row` |
| `.swiss-gap-3..-10` | Gap from 8 px (`-3`) to 64 px (`-10`) using the spacing scale |
| `.swiss-grow` | `flex: 1` |
| `.swiss-grid-12` | 12-column grid, gap 32 px |
| `.swiss-grid-2` | Two equal columns, gap 48 px |
| `.swiss-grid-3` | Three equal columns, gap 32 px |
| `.swiss-grid-4` | Four equal columns, gap 24 px |
| `.swiss-span-2/-3/-4/-6/-8/-9/-12` | Grid column spans |
| `.swiss-center` / `.swiss-right` | Text alignment |
| `.swiss-uppercase` | Text transform |
| `.swiss-hr-hairline` | 1 px grey-2 rule |
| `.swiss-hr-accent` | 3 px accent rule, 96 px wide |

Spacing scale (used by `gap` classes and exposed as `--social-card-sp-3` through `--social-card-sp-13`): `8 / 12 / 16 / 24 / 32 / 40 / 48 / 64 / 80 / 96 / 160`.

## Card fills — mutually exclusive

Pick exactly one variant per card. Mixing on the same node is an anti-pattern; multi-card grids must use the same variant for visual coherence.

| Class | Background | Foreground |
| --- | --- | --- |
| `.swiss-card-ink` | `--openpress-color-ink` | `--openpress-color-document` (with accent kept on `.swiss-t-cat`) |
| `.swiss-card-accent` | `--openpress-accent` | `--openpress-accent-on` (white on dark accents, ink on light) |
| `.swiss-card-fill` | `--openpress-grey-1` | `--openpress-color-ink` |
| `.swiss-card-outlined` | transparent | `--openpress-color-ink`, 1 px `--openpress-grey-2` border |

Padding for all four: `--social-card-sp-8` (40 px). Override only by wrapping in a non-card recipe section.

## Decorative mats

Background pattern layers — pure CSS, no images, no JS. Apply as absolutely-positioned siblings before the content.

| Class | Pattern | Default opacity |
| --- | --- | --- |
| `.swiss-dot-mat` | 1.5 px dots at 24 px intervals | 0.08 |
| `.swiss-ring-mat` | 5 px rings at 32 px intervals | 0.08 |
| `.swiss-cross-mat` | 14 px crosshatch | 0.06 |

Use sparingly. One mat per page. Never on dense content pages where text needs to read.

## Chrome

`.swiss-chrome-min` — minimal single-row top strip with `space-between` justification. Used by Swiss recipes that don't need the full `PageChrome` wrapper (typically covers and statement pages).

## Where the recipes use these

| Recipe | Primitives used |
| --- | --- |
| `SwissAccentCover` | `.swiss-h-xl`, `.swiss-lead`, `.swiss-t-cat`, optional mat, optional `--accent` / `--ink` background |
| `SwissTwoSignals` | `.swiss-h-xl`, `.swiss-t-cat`, `.swiss-card-{ink,outlined,accent,fill}` × 2 in a 2-column grid |
| `SwissFileCard` | `.swiss-h-xl`, `.swiss-t-cat`, `.swiss-card-{fill,outlined}`, mono labels |
| `SwissLedger` | `.swiss-h-xl`, `.swiss-t-cat`, 3-row grid with accent-coloured numbers, optional `--ink` full-card background |
| `SwissStatement` (legacy) | Built-in display, eyebrow, CTA strip — predates the primitive system |
| `SwissBrowserMock` | `.swiss-h-xl`, `.swiss-device-browser` (CSS chrome), `.swiss-card-fill` × N modules, `.swiss-t-meta` |
| `SwissTrapRows` | `.swiss-h-xl`, `.swiss-t-cat`, 3 hairline-bordered rows with accent-coloured mono labels |
| `SwissPipeline` | `.swiss-h-xl`, `.swiss-card-outlined` × 3 steps, accent-coloured numbers, mono step labels |
| `SwissImageHero` | `.swiss-h-statement` in overlay, `.swiss-t-cat`, 3 stat blocks under image |
| `SwissKPITower` | `.swiss-h-xl`, accent-bar with inline `style="height:..."` per column, mono labels |
| `SwissHBarChart` | `.swiss-h-xl`, hairline rows with grey-1 track + accent fill, mono values |
| `SwissStackedLedger` | `.swiss-h-xl`, 4–6 hairline rows with weight-300 big number + label + optional icon |
| `SwissMatrix` | `.swiss-h-xl`, 2×4 outlined cell grid (max 1 `--accent` cell), bottom hero stat with `.swiss-h-xl` num-mega |

## Extending Swiss

To add a new Swiss recipe component:

1. Compose primitives — don't write new typography. If the type role you need isn't in the table above, the recipe is probably not Swiss.
2. Use exactly one card fill variant per card. Don't combine.
3. Apply the spacing scale (`--social-card-sp-N`) for all gaps and padding. Inline `gap: 28px` is a smell.
4. Add a `data-style="swiss"` attribute on the recipe section so identity tests can scope.
5. Document the recipe in `layout-recipes.md` with its content shape and minimum density.

## Anti-patterns

- **Bold huge titles** (weight 700+ at 90 px+). Even if it compiles, it's not Swiss.
- **Serif fonts loaded into a Swiss page**. The identity test fails.
- **Mixed accents across the carousel**. One accent per package — IKB pages don't share a deck with Safety Orange pages.
- **Card variants mixed within one grid**. Two `.swiss-card-ink` or two `.swiss-card-outlined` together; never one of each in adjacent slots unless the recipe explicitly calls for tension (e.g. `SwissTwoSignals` opposing the two cards).
- **Mats on dense content**. The dot / ring / cross layers compete with body text. Reserve for covers and quotes.
