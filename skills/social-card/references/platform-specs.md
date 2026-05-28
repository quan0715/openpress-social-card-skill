# Platform specs

Pixel sizes, safe areas, and density expectations per supported platform.
v1 ships one geometry that works across Instagram, Facebook, and Threads.

## Instagram / Facebook / Threads — v1 (portrait feed)

| Spec | Value |
| --- | --- |
| Card size | **1080 × 1350 px** (4:5 portrait) |
| Why this size | IG's recommended portrait feed size; FB feed and Threads both accept it natively; carousels render without center-crop. |
| Safe area | 88 px side, 96 px top, 96 px bottom (set by `tokens.css`) |
| Carousel length | IG up to 10, FB and Threads similar — keep ≤ 9 to be safe |
| Thumbnail viewing | Feed thumbnail ≈ 200 px wide on mobile; **headlines must read at that size** |
| Body floor | 30 px (`--social-card-size-body`) |
| Caption floor | 22 px (`--social-card-size-caption`) |
| Cover anchor | Big number + label (Editorial) or display statement (Swiss) |

Density expectation: 0.45–0.65. Below 0.45 the card looks empty; above 0.7
it crowds. (Will be checked by `openpress validate` once that ships.)

Notes per platform:

- **Instagram**: 4:5 is the largest portrait the feed shows without crop. 1:1
  is also accepted but uses less vertical real estate.
- **Facebook**: portrait posts now display at full height in the feed; 4:5
  matches IG so the same export works in both places.
- **Threads**: matches IG's media sizing rules — same export, no changes.

## Deferred to v2

| Surface | Size | Reason |
| --- | --- | --- |
| Square feed (IG / FB) | 1080 × 1080 (1:1) | Acceptable but lower engagement than 4:5; can be added once the per-frame geometry framework hook lands. |
| Facebook link preview | 1200 × 630 (1.91:1) | Different aspect, needs its own layout set — not a feed post format. |
| Story / Reel cover | 1080 × 1920 (9:16) | Vertical full-bleed surface; needs different visual system. |

Mixed-ratio carousels (e.g. 4:5 hero + 1:1 detail) need per-frame geometry
which lives on the OpenPress framework side — see `NOTES.md` GAP-3.

## Adding a new platform

1. A page geometry entry in `press/openpress.config.mjs` with explicit
   width/height.
2. Padding tokens tuned for the new aspect.
3. At least one layout component sized for it.
4. A platform spec section in this file with the safe areas and floors.

Do not silently extend the `social-4x5` geometry to other aspects — declare
each one explicitly.
