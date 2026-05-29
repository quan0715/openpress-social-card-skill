# Visual grammar

This is the OpenPress-native magazine grammar the skill ships. It's adapted in clean-room form from the design language of `guizang-social-card-skill`: the upstream HTML/CSS was used as a measurement reference for page geometry, typography roles, spacing, and recipe proportions, but no source files or assets are copied into this MIT skill.

The skill's job is to bring **a magazine-grade visual vocabulary** into an OpenPress workspace. OpenPress's job is everything else (runtime, preview, render, validation, export).

## What was ported

| From guizang | To this skill | Form |
| --- | --- | --- |
| Editorial × E-ink visual mode | `[data-style="editorial"]` (default) — paper, serif, atmosphere | CSS + components |
| Swiss International visual mode | `[data-style="swiss"]` alternate — sans, flat, accent | CSS + components |
| 6 Editorial palettes | `[data-theme="ink-classic"]` (default) + 5 others | `theme/tokens.css` |
| Type scale (display / headline / subhead / body / kicker / micro) with "the larger, the lighter" rule | `--social-card-display` / `--social-card-headline` / etc., display weight 500 + wide tracking, kicker weight 500 + very wide tracking | `theme/tokens.css` |
| 1080×1440 editorial card geometry | `page.width = 1080px`, `page.height = 1440px`, padding 96px / 88px | `press/index.tsx` + `theme/tokens.css` |
| Layered background system (paper grain + paper wash + atmospheric ink-wash) | Three CSS layers via `::before` (grain dot pattern, multiply) + `::after` (paper wash vertical ink tint, upgraded by `:has(.with-ink-wash)::after` for atmospheric pages). See `references/background-systems.md`. | `theme/base/typography.css` |
| RGB-triplet color tokens for stacked alpha composition | `--openpress-ink-rgb` / `--openpress-paper-rgb` / `--openpress-accent-rgb` exposed on every theme | `theme/tokens.css` |
| Optional ink-wash for covers / quotes | `.with-ink-wash` modifier detected by the page frame, soft localized gradient | `theme/base/typography.css` |
| Recipe library (M01, M02, M03, M04, M07, M08, M10) | Semantic React components: `EditorialCover`, `FieldNotePhoto`, `EditorialNoteRows`, `PullQuote`, `ClosingLedger`, `TallLedger`, `EvidenceFeature` | `press/components/` |
| Fixed page chrome | `PageChrome` wraps recipe content and pins issue-strip headers / footers outside the content flow | `press/components/PageChrome.tsx` |
| Editorial / Swiss identity tests | Documented in `validator-rules.md`, expected to plug into `openpress validate` when it ships | `references/validator-rules.md` |
| 4-band density check | Same as above | `references/validator-rules.md` |

## What was deliberately not ported

| From guizang | Why not |
| --- | --- |
| Seed HTML templates | The starter is an OpenPress workspace, not a template file. JSX + auto-discovered components do the same job. |
| WebGL ink-flow background | Skill-local runtime — violates the two-layer split. Replaced by CSS dotted paper grain + soft wash overlays, which preserve the editorial paper feel without adding a JS runtime. |
| Playwright PNG export | Owned by OpenPress (`npm run openpress:image`). Skill stops and reports a substrate gap if missing — never ships a stopgap. |
| Density validator runtime | Owned by OpenPress (`node engine/cli.mjs validate .` / `node engine/cli.mjs inspect . --json`). Rule definitions are kept here as structured specs ready to align with validator hooks as they mature. |

## Recipe naming map

The skill uses **semantic names** for components — the M-series numbering survives only as a reference back to the upstream taxonomy for design auditing.

| Semantic name | Upstream reference | Best for |
| --- | --- | --- |
| `EditorialCover` | M01 Cover | Carousel page 1. Title + optional photo well + issue-strip anchor. |
| `FieldNotePhoto` | M02 Field Note Photo | Documentary photo as evidence + narrow caption column. |
| `EditorialNoteRows` | M03 Editorial Note Rows | Default M03. One title + three full-width horizontal numbered observations. Rules fill the page width. |
| `EditorialEssaySplit` | M03 Editorial Essay Split alternate | Two columns: title / pull on the left, 2–3 true paragraphs on the right. Use only when the content is essay copy, not 1 / 2 / 3 field notes. |
| `PullQuote` | M04 Pull Quote / Thesis | A core sentence as the whole page. Required: kicker + source. |
| `EvidenceWall` | M06 Evidence Wall | 2×2 / 3×2 image grid + headline. Use when multiple small images are interpreted together. |
| `ClosingLedger` | M07 Closing Note | Final-page ledger (4–6 rows + sub-lines) + closing block. |
| `TallLedger` | M08 Tall Ledger | Detail-heavy enumeration. 4–6 full-width rows with index + consequence. |
| `EvidenceFeature` | M10 Evidence Feature | Large image (45–65 % vertical) + headline + takeaways. |
| `MarginaliaEssay` | M11 Marginalia Essay | Wide title + main column + narrow marginal column with keywords / fragments. Hairline vertical rule. |
| `SectionDivider` | M12 Section Divider | Mid-carousel breath between dense pages. Kicker + huge title + serif italic subtitle + atmospheric background. |

## Absorbed by existing recipes (not separate components)

Three upstream recipes don't need their own implementation in OpenPress because they reduce to existing components:

| Upstream recipe | Absorbed by | Why |
| --- | --- | --- |
| M05 Checklist / Buying Guide | `TallLedger` | Both structures are "header + 4–6 numbered rows with item + consequence". M05's optional small photo crop can be added via a child component if needed, but the row structure is identical. |
| M09 Atmospheric Thesis | `PullQuote` with `kicker` set + `SectionDivider`-like atmosphere | M09's core device is the WebGL ink-flow background. With WebGL off the table (substrate boundary), M09 reduces to "one thesis + atmospheric whitespace" — which is `PullQuote` plus the optional ink-wash treatment. |
| M13 Hero Question | `PullQuote` with the `quote` slot phrased as a question | M13 is structurally identical to M04 — single sentence as the whole page. The only difference is rhetorical (question vs statement), which is content, not layout. |

If a future use case demonstrates that one of these *does* need a distinct component (e.g. checklist needs a swatch column, atmospheric thesis grows a distinct identity device), it can be added — but adding redundant components creates maintenance overhead without expressive gain.

The remaining unimplemented upstream entry is none: every upstream non-WebGL recipe is either implemented or explicitly absorbed.

## Token contract

```
--openpress-color-document   primary page background ("paper")
--openpress-color-paper-2    secondary surface (photo wells, strip bg)
--openpress-color-ink        primary type
--openpress-color-muted      secondary type, captions, kickers
--openpress-color-line       hairline rules
--openpress-accent           single accent — sparing use
--openpress-accent-soft      light tint of accent (washes, backgrounds)

--social-card-display        cover headline (≈104px)
--social-card-headline       page headline (≈64px)
--social-card-subhead        serif italic subhead (≈36px)
--social-card-body-l/body/body-s   body sizes (28 / 24 / 22 px)
--social-card-caption        20px
--social-card-micro          18px
--social-card-kicker         21px uppercase mono runner
--social-card-bignum         168px — large-number reserve token

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
