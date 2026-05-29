# Layout recipes — v1

Ten OpenPress-native recipes ship with this skill. Each one is a React component in `press/components/`, used inside MDX cards without imports (OpenPress auto-discovers them).

Each recipe expects a specific content shape; matching the shape is the agent's job during the story-plan step. Density floors, anchor requirements, and "minimum content set" lines are not advisory — they prevent the most common failure modes documented in `references/validator-rules.md`.

## EditorialCover (M01 family)

**Use as:** page 1 of an Editorial carousel.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `kicker` | recommended | Short uppercase tag (≤ 12 chars). Series, category, or runner. |
| `title` | yes | 2–4 visual lines. Display serif, weight 500, wide tracking. |
| `subtitle` | optional | One short serif-italic sentence below the title. |
| `image` | optional | Photo or illustration in the central well. Use when the image carries meaning, not when filling space. |
| `anchor` | recommended | `{ number, label, caption? }` — the issue strip at the bottom. Use `number: "—"` for the quiet magazine separator. |
| `inkWash` | optional | Adds a radial atmospheric wash. Use sparingly — covers and pull quotes only. |

**Don't:** stack five bullets in the body. Use `TallLedger` for that.

## FieldNotePhoto (M02 family)

**Use as:** a mid-carousel documentary card. Outdoor scenes, hardware, objects, real-world evidence.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `image` | yes | Large documentary photo. Treat as evidence, not decoration. |
| `takeaway` | yes | One short sentence in headline size. Anchors the photo. |
| `caption` | yes | Narrow column caption. Italic serif. Source / context / observation. |

**Don't:** use for decorative stock photography. If the photo isn't carrying meaning, switch to `EditorialCover` with a small photo well.

## PullQuote (M04 family)

**Use as:** any high-impact thesis card. Works as a mid-carousel beat between dense pages or as the closing line.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `kicker` | recommended | Required if you want the empty top edge to read as anchored, not missing. |
| `quote` | yes | The thesis. 2–4 visual lines. Plain string, no inline JSX. |
| `source` | yes | Anchors the bottom. Without it, the surrounding whitespace reads as a missing slot. |
| `context` | optional | Page / edition / year. |

**Don't:** use without both the kicker and the source — both are anchor points that justify the whitespace.

## ClosingLedger (M07 family)

**Use as:** the final page of a carousel.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `kicker` | optional | "Closing" / "wrap" / "summary". |
| `title` | yes | Big takeaway. ≤ 2 lines. |
| `rows` | yes | 4–6 ledger items, each `{ title, sub }`. Sub-line is required — bare title list is too thin. |
| `closing` | yes | `{ quote?, signature? }` — at least one. The closing block grounds the page; without it the carousel ends abruptly. |

**Don't:** ship 3 short rows on a 1080×1440 canvas. Either expand each row's `sub` to a meaningful consequence, or switch to `PullQuote`.

## TallLedger (M08 family)

**Use as:** detail-heavy enumeration. Roles, pros / cons, gear items, product capabilities, agent responsibilities.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `kicker` | optional | |
| `title` | yes | What the ledger enumerates. |
| `rows` | yes | 4–6 rows, each `{ index, title, consequence }`. Index is a short marginalia ("01", "ROLE", "PROS"). Consequence is a body-weight explanation. |

**Don't:** let the ledger occupy only the middle third of the page. Each row should consume 118–170 px so the ledger fills the canvas vertically.

## EvidenceFeature (M10 family)

**Use as:** mid-carousel evidence pages where the image is the proof.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `kicker` | optional | |
| `headline` | yes | One short sentence. The point this evidence makes. |
| `lead` | optional | A body-paragraph between headline and image. |
| `image` | yes | Photo, screenshot, or chart. The image well takes 45–65 % of the vertical canvas. |
| `takeaways` | recommended | 2–3 short bullets below the image. Each ≤ 24 Chinese chars or ≤ 80 Latin chars. |
| `sourceCredit` | recommended | Required for web-sourced images (provenance is logged in `press/media/SOURCES.md`). |

**Don't:** use a logo or icon as the `image`. The well will letterbox and read as broken.

## EditorialNoteRows (M03 family, default)

**Use as:** mid-carousel evidence / observation page where three short findings should read as
a horizontal sequence. This is the default M03 treatment because it keeps the page calm and avoids
the crowding that happens when numbered notes are forced into a two-column essay.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `kicker` | optional | |
| `title` | yes | One calm display title. Keep it shorter than a cover title. |
| `rows` | yes | Exactly 3 rows for M03. Each row is `{ no?, text }`; numbers default to `01`, `02`, `03`. |
| `note` | optional | Short bottom marginal note. Use when the rows need a field-note anchor. |

**Don't:** convert 1 / 2 / 3 observations into side-by-side columns. The row rhythm should span
the page width, with rules filling the horizontal axis. If each point needs a paragraph, split it
into another card or use `EditorialEssaySplit` only for true essay copy.

## EditorialEssaySplit (M03 alternate)

**Use as:** mid-carousel essay page when one idea needs nuance and the content is actual paragraph
copy, not a numbered observation sequence.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `kicker` | optional | |
| `title` | yes | Left-column title or pull. Display serif. |
| `paragraphs` | yes | 2–3 short paragraphs. Right column. Plain strings only. |
| `numbered` | optional | Legacy compatibility only. New 1 / 2 / 3 observation pages should use `EditorialNoteRows`. |
| `note` | optional | Bottom note spanning both columns. Use when the split needs a lower anchor. |

**Don't:** use this for 1 / 2 / 3 field observations; use `EditorialNoteRows` so the numbers and
rules fill the page width. Don't push 4+ paragraphs into the right column. If the right column gets
dense, split into two pages or switch to `MarginaliaEssay` (which adds the marginal column for
keywords / fragments without crowding the main column). A title-only page is `PullQuote`, not this.

## EvidenceWall (M06 family)

**Use as:** multi-image proof. Screenshots, references, before-after pairs, small photos that are interpreted together.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `kicker` | optional | |
| `headline` | yes | One headline that interprets the whole wall. Without it the grid reads as decorative. |
| `images` | yes | 4 for 2×2 layout, 6 for 3×2, or 3 for 3-col. Each must be readable at the final tile size. |
| `layout` | optional | `"2x2"` (default), `"3-col"`, or `"3x2"`. |

**Don't:** use for decorative imagery. If a single image is the proof, switch to `EvidenceFeature`. If the images don't tile cleanly into the chosen grid, drop one or pick the next layout.

## MarginaliaEssay (M11 family)

**Use as:** the magazine reading-rhythm page. Wide title + main column + narrow marginal column. Use this when `EditorialEssaySplit` feels too empty but `TallLedger` would feel too mechanical.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `kicker` | optional | |
| `title` | yes | Wide title spanning above both columns. |
| `paragraphs` | yes | 2–3 paragraphs in the main column. |
| `marginalia` | yes | 3–6 entries, each `{ keyword, note? }`. Renders as keyword (mono accent) + optional gloss (serif italic muted). |

**Don't:** fill the marginal column with decoration. Every entry should carry meaning — a term needing a gloss, a quote fragment supporting the main paragraph, a page reference. If the column can't be filled meaningfully, drop it and switch to `EditorialEssaySplit`.

## SectionDivider (M12 family)

**Use as:** a mid-carousel breath between act 1 and act 2 of a long (7–9 page) carousel.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `kicker` | yes | "Act II", "Part 2 of 3", "Section · Findings". Required — without a runner label, the empty page reads as broken. |
| `title` | yes | 3–6 Chinese characters or short English phrase. Display serif, weight 500. |
| `subtitle` | optional | One short serif-italic sentence describing the section's promise. |
| `footer` | optional | Bottom issue strip with section meta — left / middle / right slots. |

The component sets the ink-wash atmosphere automatically; this is the one recipe where atmospheric whitespace is the point.

**Don't:** use as a cover or closing. Readers expect the first and last pages of a carousel to carry the strongest content. The divider is specifically a mid-set device.

## SwissAccentCover (S01 family)

**Use as:** the cover of a Swiss carousel, or any single high-impact statement page.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `kicker` | recommended | Short accent-coloured tag at the top. |
| `title` | yes | Big light-weight title. 1–2 lines. |
| `subtitle` | optional | Short serif lead. |
| `background` | optional | `"paper"` (default off-white), `"accent"` (full accent fill), or `"ink"` (dark inversion). |
| `mat` | optional | `"dot"` (default), `"ring"`, `"cross"`, or `"none"`. Decorative pattern behind the content. |
| `diagram` | optional | A simple system block, comparison shape, or two-node diagram. Use sparingly — one abstract block max. |
| `footer` | optional | Mono metadata strip at bottom. |

**Don't:** pack two ideas. The cover carries one clear concept. If you need comparison, switch to `SwissTwoSignals`.

## SwissTwoSignals (S02 family)

**Use as:** comparison cards — two sources, two options, two product directions.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `kicker` | optional | |
| `title` | yes | Page title that introduces the comparison. |
| `signals` | yes | Exactly two `{ label, title, body?, variant? }` cards. |

Per signal:

- `label` — short uppercase label.
- `title` — the option or source name.
- `body` — optional short explanation.
- `variant` — card fill: `"ink"`, `"outlined"` (default), `"accent"`, or `"fill"`. Mixing one ink + one outlined creates the tension this recipe calls for.

**Don't:** add a third card. If three options matter, switch to a three-column ledger or split into two pages.

## SwissFileCard (S03 family)

**Use as:** a named object with a short property list — Markdown source, memory record, database row, state schema, file manifest.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `kicker` | optional | |
| `title` | yes | Page title — what this card is about. |
| `fileType` | yes | Mono uppercase tag, e.g. `"MARKDOWN"`, `"DATABASE"`. |
| `fileName` | yes | The file name or object identifier. Renders large. |
| `properties` | yes | 3–4 `{ label, value }` rows. Mono labels, plain values. |
| `variant` | optional | `"fill"` (default grey-1) or `"outlined"`. |

**Don't:** use this for free-form lists. If the data isn't object-shaped, switch to `TallLedger` (Editorial) or a future Swiss `KPITower` / `HBarChart`.

## SwissLedger (S07 family)

**Use as:** the closing page of a Swiss carousel — three takeaways with explanation.

**Content shape:**

| Slot | Required | Notes |
| --- | --- | --- |
| `kicker` | optional | "Closing", "Summary", "Takeaways". |
| `title` | yes | Big thesis. ≤ 2 lines. |
| `rows` | yes | 3 (canonical) or 4 `{ number, phrase, explanation }` rows. |
| `variant` | optional | `"paper"` (default) for inline closure. `"ink"` for a dark closure card that fills the whole page — the strongest way to end a Swiss carousel. |

**Don't:** ship 2 short rows. Either expand to 3 with proper explanations, or switch to `SwissTwoSignals`.

## Absorbed upstream recipes

Three upstream recipes don't have separate implementations because they reduce to existing components:

| Upstream | Use this instead |
| --- | --- |
| M05 Checklist / Buying Guide | `TallLedger` — same "header + 4–6 numbered rows with consequence" structure |
| M09 Atmospheric Thesis | `PullQuote` (its WebGL atmosphere is the substrate-boundary boundary case — covered by the ink-wash treatment built into `SectionDivider` if needed) |
| M13 Hero Question | `PullQuote` with the quote phrased as a question (structurally identical to M04) |

See `visual-grammar.md` § Absorbed by existing recipes for the full reasoning.

## Choosing between recipes

- If the page should be **read** as a magazine feature → Editorial family (everything except `SwissStatement`).
- If the page should be **felt** as a graphic statement → `SwissStatement`.
- If the page needs an image as **evidence** →
  - one large image → `EvidenceFeature`
  - documentary photo + caption → `FieldNotePhoto`
  - multiple small images interpreted together → `EvidenceWall`
- If the page is **mostly type** →
  - title-led with anchor → `EditorialCover`
  - one sentence → `PullQuote`
  - three horizontal observations → `EditorialNoteRows`
  - two-column essay copy → `EditorialEssaySplit`
  - three-column with margin notes → `MarginaliaEssay`
  - enumerated detail → `TallLedger`
  - closing recap → `ClosingLedger`
- If the carousel is **long (7–9 pages)** and needs a breath → drop a `SectionDivider` between acts.
