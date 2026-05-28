# QA checklist

Run this checklist before delivering the carousel. The validator
(`scripts/validate-social-card.mjs`) covers the mechanical checks; the rest
is visual review.

## Mechanical (validator covers)

- [ ] No overflow on any card (`rule: overflow`).
- [ ] No text below caption floor 22 px (`rule: small-type`).
- [ ] Density between 0.45 and 0.70 (`rule: density-low` flags below floor;
      above 0.70 needs visual review).
- [ ] Every `<img>` pointing to `/openpress/media/` is listed in
      `document/media/SOURCES.md` (`rule: source-missing`).

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
- [ ] Run `node scripts/render-png.mjs` (or `openpress png` once it ships)
      and visually inspect every output PNG.
- [ ] Run `node scripts/validate-social-card.mjs` — exit code 0.
- [ ] Skim the rendered PNGs at thumbnail size (200 px wide) — every
      card's primary message must still read.
