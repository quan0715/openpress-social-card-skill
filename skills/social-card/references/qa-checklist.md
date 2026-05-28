# QA checklist

Run this checklist before delivering the carousel. The mechanical checks
will hook into `openpress validate` once that command ships — until then,
they are agent-driven against the rendered workspace.

## Mechanical (will hook into `openpress validate`)

- [ ] No overflow on any card.
- [ ] No text below caption floor 22 px.
- [ ] Density between 0.45 and 0.70 (below 0.45 looks empty; above 0.70
      crowds).
- [ ] Every `<img>` pointing to `/openpress/media/` is listed in
      `press/media/SOURCES.md`.

## Visual (human review)

### Type

- [ ] Cover title reads at IG/FB/Threads feed thumbnail size (≈200 px wide).
- [ ] No line of body text exceeds 24 Chinese chars / 80 Latin chars.
- [ ] Italic / weight emphasis appears at most once per card.
- [ ] One accent color across the entire carousel — no chromatic drift.

### Images

- [ ] No cropped faces, logos, or critical UI text.
- [ ] Image well is not letterboxing important content.
- [ ] Screenshots: surrounding negative space ≥ 32 px on each side.
- [ ] All web-sourced images have a visible `SourceCredit` (unless the
      user explicitly waived attribution and the platform allows it).

### Story

- [ ] Cover sells the point in 1 second.
- [ ] Each evidence card stands alone if seen out of order.
- [ ] Final card has a clear CTA, handle, or wrap-up — no trailing dead
      page.

### Provenance & ethics

- [ ] No fabricated metrics, prices, dates, or product claims.
- [ ] Generated images do not embed text unless the user asked.
- [ ] No visible "instructions to the agent" left inside the image.
- [ ] If reusing layout concepts from upstream sources, attribution is
      recorded (see repo root `README.md` § Attribution).

## Before delivery

- [ ] Run `npm run build` — no warnings.
- [ ] Run `openpress export png --out output/png` (when it ships) and
      visually inspect every output PNG. If the command is not yet
      available, the agent should stop and report it as a missing
      substrate capability — not ship a skill-local renderer.
- [ ] Run `openpress validate` (when it ships) — exit code 0. Same
      principle if it's missing: report, don't shadow-implement.
- [ ] Skim the rendered PNGs (or PDF pages, as a stopgap) at thumbnail
      size (≈ 200 px wide) — every card's primary message must still read.
