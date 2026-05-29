# QA checklist

Run this checklist before delivering the carousel. The mechanical checks have structured specs in `validator-rules.md` and are designed to hook into `openpress validate` once that command ships — until then, the agent applies them by reading the rendered output.

## Identity tests (first pass)

Run before everything else. A page that fails an identity test isn't a small fix; the whole recipe choice may be wrong.

### Editorial identity (apply to every Editorial page)

- [ ] Paper grain layer renders (visible at 100 % zoom; subtle but present).
- [ ] Display title uses the serif family (Source Serif / Noto Serif / Songti, not Inter or system sans).
- [ ] Page contains at least one of: large photo well, serif pull quote, marginalia column, true ledger with 4+ rows.

A flat paper + serif title + mono labels everywhere fails — switch to Swiss honestly or add atmosphere + magazine structure.

### Swiss identity (apply to every Swiss page)

- [ ] Display title (≥ 72 px) has computed weight ≤ 300.
- [ ] No serif family loaded anywhere.
- [ ] Separators are hairline rules or grid gutters; no card borders + drop shadows.
- [ ] Exactly one accent across the entire carousel.

## Mechanical (will hook into `openpress validate`)

- [ ] **No overflow** on any card. Footer not crashed by content above.
- [ ] **No text below floors**: body ≥ 24 px, caption / micro ≥ 18 px.
- [ ] **4-band density**: classify each 25 % horizontal band as filled / justified-empty / under-filled. Filled bands ≥ 70 % of canvas height; no adjacent justified-empty bands.
- [ ] **Title character cap**: cover headlines ≤ 14 Chinese chars or 28 Latin chars per line; total ≤ 24 / 60.
- [ ] **One accent** across the entire carousel.
- [ ] **Every `<img>` pointing to `/openpress/media/`** is listed in `press/media/SOURCES.md`.

## Per-recipe density floors

- EditorialCover: title + (image OR anchor) — neither = placeholder
- FieldNotePhoto: image > 55 % vertical + takeaway + caption
- EditorialNoteRows: title + exactly 3 horizontal rows
- EditorialEssaySplit: title + ≥ 2 paragraphs; not for numbered observation rows
- PullQuote: kicker + quote + source — all three are anchor points
- EvidenceWall: headline + ≥ 3 (3-col) / 4 (2×2) / 6 (3×2) captioned images
- ClosingLedger: title + ≥ 4 rows (each with sub) + closing block
- TallLedger: title + ≥ 4 rows, each row ≥ 118 px tall
- EvidenceFeature: headline + image > 45 % vertical + ≥ 2 takeaways
- MarginaliaEssay: title + ≥ 2 main paragraphs + ≥ 3 marginal entries
- SectionDivider: kicker + title (atmospheric whitespace intentional)

If a card doesn't reach its floor: **expand the content or switch to a different recipe**. Don't publish under-filled.

## Visual (human review)

### Type

- [ ] Cover title reads at social-feed thumbnail size (≈ 200 px wide).
- [ ] No line of body text exceeds 24 Chinese chars / 80 Latin chars.
- [ ] Display weight is 500 (Editorial) or ≤ 300 (Swiss) — no surprise bold headlines.
- [ ] Kicker / meta / labels are weight 500 with wide tracking (≈ 0.22em).

### Images

- [ ] No cropped faces, logos, or critical UI text.
- [ ] Image well not letterboxing important content.
- [ ] Screenshots: surrounding negative space ≥ 32 px on each side.
- [ ] Web-sourced images have a visible source credit (unless user explicitly waived).
- [ ] Subject map documented as an HTML comment for any text-on-image card.

### Story

- [ ] Cover sells the point in 1 second.
- [ ] Each evidence card stands alone if seen out of order.
- [ ] Final card has a clear CTA, signature, or wrap — no trailing dead page.

### Provenance & ethics

- [ ] No fabricated metrics, prices, dates, or product claims.
- [ ] Generated images do not embed text unless the user asked.
- [ ] No visible "instructions to the agent" left inside the image.
- [ ] If reusing layout concepts from upstream sources, attribution is recorded (see repo root `README.md` § Attribution).

## Before delivery

- [ ] Run `npm run build` — no warnings.
- [ ] Run `openpress export png --out output/png` (when it ships) and visually inspect every output PNG. If the command is not yet available, stop and report it as a missing substrate capability — not ship a skill-local renderer.
- [ ] Run `openpress validate` (when it ships) — exit code 0. Same principle if missing.
- [ ] Skim rendered output (PNG or PDF) at thumbnail size (≈ 200 px wide). Every card's primary message must still read.

## Anti-pattern checklist (quick scan)

- [ ] No thick big title in Swiss (weight 700+ on huge type).
- [ ] No Editorial-without-atmosphere page (flat paper + serif title + mono labels everywhere with no photo / quote / ledger).
- [ ] No recipe-local footer drifting with content. Use `PageChrome` for fixed top / bottom issue strips.
- [ ] No full-bleed photo with title crossing the subject.
- [ ] No mixed accents across pages.
- [ ] No decorative SVG shapes (blobs, ovals, drops).
