# Layout recipes — v1

Three OpenPress-native layouts ship with this skill. Each one expects a
specific content shape; matching the shape is the agent's job during the
story-plan step.

## EditorialCover

**Use as:** carousel page 1 in an Editorial project (IG / FB / Threads).

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `eyebrow` | recommended | Short uppercase tag (12 chars max). Series, date, or category. |
| `title` | yes | 2–9 Chinese characters or ≤32 Latin chars. Renders at display size. |
| `subtitle` | optional | One short sentence. Renders muted below the title. |
| `anchorNumber` + `anchorLabel` | optional pair | The "big number" anchor at the bottom. Use a single 1–3 digit number with a short uppercase label. |
| `anchorCaption` | optional | One-line explanation under the number. |
| `children` | optional | Custom content in the middle band when you have an asset, pull quote, or sub-headline. |

**Don't:** Try to fit five bullets here. If you have more than the anchor
plus a sentence, switch to `EditorialEvidence` or split into two cards.

## EditorialEvidence

**Use as:** mid-carousel evidence pages in an Editorial project.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `imageSrc` + `imageAlt` | yes | Image becomes the top half. Use a photo, screenshot, or chart with text-light composition. |
| `imageCaption` | optional | Inline figcaption. |
| `title` | yes | One short sentence. The point this evidence makes. |
| `bullets` | yes | 2–4 items. Each ≤24 Chinese chars or ≤80 Latin chars. |
| `sourceCredit` | recommended | Provenance label. Required for web-sourced images. |

**Don't:** Put six bullets. Hide the source credit. Use a logo as the
image (logos are too low-density for the top-half image well).

## SwissStatement

**Use as:** any high-impact statement card — closing CTA, big stat,
campaign slogan. Works as page 1 in a Swiss project or as the final card
in mixed-content carousels.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `eyebrow` | recommended | Small accent-colored tag at top. |
| `children` | yes | The statement itself. Wrap inline emphasis with `<em>` — the theme will recolor it with `--openpress-accent`. Keep total length ≤24 Chinese chars or ≤80 Latin chars across two visual lines. |
| `cta` | optional | Bottom-left CTA. URL, handle, or one-line action. |
| `meta` | optional | Bottom-right meta. Date, edition, or campaign code. |

**Don't:** Pad with three sentences. Use it for a paragraph. Pair it with
a body image — Swiss statements are type-only by design.

## Choosing between recipes

If the page should be read → Editorial.
If the page should be felt → Swiss.

If the page needs an image as evidence → `EditorialEvidence`.
If the page needs an image for atmosphere → use `ImageWell` inside an
`EditorialCover` `children` slot, not its own layout.

If the page has a number that is the point → `EditorialCover` with anchor.
If the page has a sentence that is the point → `SwissStatement`.

## Recipes deferred to later versions

The guizang workflow includes additional recipes (tall ledger, pull quote,
closing note; Swiss KPI tower, matrix, h-bar chart, screenshot explainer).
These ship in later slices once the three v1 layouts are validated against
real content. See design spec § 6.2.
