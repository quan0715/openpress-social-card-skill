# Layout recipes — v1

Six OpenPress-native recipes ship with this skill. Each one is a React component in `press/components/`, used inside MDX cards without imports (OpenPress auto-discovers them).

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
| `anchor` | recommended | `{ number, label, caption? }` — the big-number anchor at the bottom. Single 1–3-digit number with a short uppercase label. |
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

**Don't:** ship 3 short rows on a 1080×1350 canvas. Either expand each row's `sub` to a meaningful consequence, or switch to `PullQuote`.

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

## Choosing between recipes

- If the page should be **read** as a magazine feature → Editorial family (all of the above except SwissStatement).
- If the page should be **felt** as a graphic statement → `SwissStatement` (alternate Swiss recipe still available in `press/components/`).
- If the page needs an image as **evidence** → `EvidenceFeature` for screenshots / charts, `FieldNotePhoto` for documentary photos.
- If the page is **mostly type** → `EditorialCover` (title-led with anchor), `PullQuote` (one sentence), `TallLedger` (enumerated detail), `ClosingLedger` (closing recap).

## Recipes deferred to later versions

Upstream guizang ships additional recipes (M03 Editorial Essay Split, M05 Checklist, M06 Evidence Wall, M09 Atmospheric Thesis, M11 Marginalia Essay, M12 Section Divider, M13 Hero Question). These can be added by following the same pattern — React component + CSS class + entry in this file + identity rules in `validator-rules.md`. They're absent in v1 to keep the first slice small enough to validate end-to-end.
