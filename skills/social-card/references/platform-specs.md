# Platform specs

Pixel sizes, safe areas, and density expectations per supported platform. v1 ships one editorial portrait geometry that matches the original guizang social-card baseline.

## Editorial portrait / Rednote — v1

| Spec | Value |
| --- | --- |
| Card size | **1080 × 1440 px** (3:4 portrait) |
| Why this size | Matches the guizang Editorial M-series visual baseline and leaves enough vertical room for magazine cover, field-note photo, and ledger recipes. |
| Safe area | 88 px side, 96 px top, 96 px bottom (set by `tokens.css`) |
| Carousel length | Keep ≤ 9 unless the brief explicitly needs a longer sequence |
| Thumbnail viewing | Feed thumbnail ≈ 200 px wide on mobile; **headlines must read at that size** |
| Body floor | 24 px (`--social-card-body`) |
| Caption / micro floor | 18–20 px (`--social-card-micro` / `--social-card-caption`) |
| Density floor | Filled bands ≥ 70 % of canvas height (≥ 1008 px of 1440) |
| Per-recipe density floors | See `validator-rules.md` § Per-recipe density floors |
| Default theme | `ink-classic` (light Editorial) |
| Available themes | 6 Editorial + 2 Swiss — see `theme-presets.md` |
| Cover anchor | Issue-strip label + separator + count (Editorial) or display statement (Swiss) |

Notes per platform:

- **Rednote / Xiaohongshu-style posts**: 3:4 gives the Editorial recipes the same vertical rhythm as the reference skill.
- **Instagram / Facebook / Threads**: use the 4:5 variant once per-frame or alternate-geometry support is added.

## Deferred to v2

| Surface | Size | Reason |
| --- | --- | --- |
| 4:5 feed (IG / FB / Threads) | 1080 × 1350 | Needs a separate density calibration from the 3:4 editorial baseline. |
| Square feed (IG / FB) | 1080 × 1080 (1:1) | Acceptable but lower engagement than 4:5; can be added once the per-frame geometry framework hook lands. |
| Facebook link preview | 1200 × 630 (1.91:1) | Different aspect, needs its own layout set — not a feed post format. |
| Story / Reel cover | 1080 × 1920 (9:16) | Vertical full-bleed surface; needs different visual system. |

Mixed-ratio carousels (e.g. 3:4 hero + 1:1 detail) need per-frame geometry which lives on the OpenPress framework side — see `NOTES.md` GAP-3.

## Adding a new platform

1. A page geometry entry in `press/openpress.config.mjs` with explicit width / height.
2. Padding tokens tuned for the new aspect.
3. At least one layout component sized for it.
4. A platform spec section in this file with the safe areas and floors.

Do not silently extend the `social-xhs-3x4` geometry to other aspects — declare each one explicitly.
