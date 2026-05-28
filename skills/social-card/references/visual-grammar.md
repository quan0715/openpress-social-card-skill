# Visual grammar

This is the OpenPress-native magazine grammar the skill ships. It's adapted in clean-room form from the design language of `guizang-social-card-skill` — no source code, CSS, HTML, or assets were copied; what was studied is the public design language (taste, type rules, recipe taxonomy, identity tests).

The skill's job is to bring **a magazine-grade visual vocabulary** into an OpenPress workspace. OpenPress's job is everything else (runtime, preview, render, validation, export).

## What was ported

| From guizang | To this skill | Form |
| --- | --- | --- |
| Editorial × E-ink visual mode | `[data-style="editorial"]` (default) — paper, serif, atmosphere | CSS + components |
| Swiss International visual mode | `[data-style="swiss"]` alternate — sans, flat, accent | CSS + components |
| 6 Editorial palettes | `[data-theme="ink-classic"]` (default) + 5 others | `theme/tokens.css` |
| Type scale (display / headline / subhead / body / kicker / micro) with "the larger, the lighter" rule | `--social-card-display` / `--social-card-headline` / etc., display weight 500 + wide tracking, kicker weight 500 + very wide tracking | `theme/tokens.css` |
| Paper grain atmosphere | SVG turbulence noise rendered as a CSS data-URI overlay (no WebGL, no canvas, no JS) | `theme/social-card.css` |
| Optional ink-wash for covers / quotes | `.with-ink-wash` modifier on the page-frame, soft radial gradient | `theme/social-card.css` |
| Recipe library (M01, M02, M04, M07, M08, M10) | Semantic React components: `EditorialCover`, `FieldNotePhoto`, `PullQuote`, `ClosingLedger`, `TallLedger`, `EvidenceFeature` | `press/components/` |
| Editorial / Swiss identity tests | Documented in `validator-rules.md`, expected to plug into `openpress validate` when it ships | `references/validator-rules.md` |
| 4-band density check | Same as above | `references/validator-rules.md` |

## What was deliberately not ported

| From guizang | Why not |
| --- | --- |
| Seed HTML templates | The starter is an OpenPress workspace, not a template file. JSX + auto-discovered components do the same job. |
| WebGL ink-flow background | Skill-local runtime — violates the two-layer split. Replaced by CSS radial gradient + SVG noise overlay, which gets ≈90% of the atmosphere with 0% of the runtime cost. |
| Playwright PNG export | Owned by OpenPress (`openpress export png`, expected). Skill stops and reports a substrate gap if missing — never ships a stopgap. |
| Density validator runtime | Owned by OpenPress (`openpress validate`, expected). Rule definitions are kept here as structured specs ready to register when the validator-hook contract lands. |
| 1080×1440 (Xiaohongshu 3:4) geometry | This skill targets IG / FB / Threads 1080×1350 (4:5). The density / floor numbers are adapted accordingly. |

## Recipe naming map

The skill uses **semantic names** for components — the M-series numbering survives only as a reference back to the upstream taxonomy for design auditing.

| Semantic name | Upstream reference | Best for |
| --- | --- | --- |
| `EditorialCover` | M01 Cover | Carousel page 1. Title + optional photo well + big-number anchor. |
| `FieldNotePhoto` | M02 Field Note Photo | Documentary photo as evidence + narrow caption column. |
| `PullQuote` | M04 Pull Quote / Thesis | A core sentence as the whole page. Required: kicker + source. |
| `ClosingLedger` | M07 Closing Note | Final-page ledger (4–6 rows + sub-lines) + closing block. |
| `TallLedger` | M08 Tall Ledger | Detail-heavy enumeration. 4–6 full-width rows with index + consequence. |
| `EvidenceFeature` | M10 Evidence Feature | Large image (45–65 % vertical) + headline + takeaways. |

Additional recipes from upstream (M03, M05, M06, M09, M11, M12, M13) are documented but not implemented in v1. They can be added later by following the same Component + CSS class + recipe contract pattern.

## Token contract

```
--openpress-color-document   primary page background ("paper")
--openpress-color-paper-2    secondary surface (photo wells, strip bg)
--openpress-color-ink        primary type
--openpress-color-muted      secondary type, captions, kickers
--openpress-color-line       hairline rules
--openpress-accent           single accent — sparing use
--openpress-accent-soft      light tint of accent (washes, backgrounds)

--social-card-display        cover headline (≈112px)
--social-card-headline       page headline (≈64px)
--social-card-subhead        serif italic subhead (≈38px)
--social-card-body-l/body/body-s   body sizes (34 / 30 / 26 px)
--social-card-caption        24px
--social-card-micro          22px — floor for any small text
--social-card-kicker         22px uppercase mono runner
--social-card-bignum         192px — cover anchor number

--social-card-grain-opacity  paper grain intensity (0 disables for Swiss)
--social-card-grain-blend    multiply (light themes) / screen (Midnight Ink)
```

The token names use the `--openpress-` prefix where they integrate with the framework's `.reader-page` defaults, and `--social-card-` for skill-specific scale tokens.

## Style identity contract

The skill ships two visual stances. Each one has hard identity rules — see `validator-rules.md` for the structured versions.

### Editorial

- At least one atmosphere layer beyond a flat fill — paper grain is always on, and `.with-ink-wash` may add a radial gradient.
- Display titles use the serif family.
- The page contains at least one of: a large photo well, a serif pull quote, a marginalia column, or a true ledger.
- A flat solid paper background with serif title + mono labels everywhere = **Swiss-with-a-serif**, not Editorial.

### Swiss

- Display titles ≥ 72 px use weight ≤ 300.
- No serif family loaded in the page.
- Section separators are hairline rules or grid gutters, not card borders.
- Exactly one accent across the whole carousel.

## "The larger, the lighter"

A non-negotiable typography rule that prevents both modes from collapsing into generic landing-page editorial. Specifically:

- Display weight is **500**, never 700–900.
- Body / paragraph weight is **400**.
- Small text (kicker, meta, label) is weight **500** with wide tracking (≈ 0.22em).
- A 90 px h1 at weight 700+ is the most common identity failure — it's enforced by the typed component classes (`.editorial-cover__title`, `.editorial-tall-ledger__title`, etc.); don't override with inline styles.
