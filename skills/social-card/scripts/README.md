# scripts/

Skill-local scripts. Both run against an OpenPress workspace where this skill
has been initialized as the starter.

| Script | Purpose | Until |
| --- | --- | --- |
| `render-png.mjs` | PNG export of each `.reader-page` at real pixel dimensions | OpenPress ships first-class `openpress png` |
| `validate-social-card.mjs` | Social-card-specific validation (overflow, small type, density, missing source) | OpenPress exposes validator hooks per design spec § 8.4 |

## Dependencies

Both scripts depend on `playwright` and `serve-handler`. `playwright` is
already a transitive dependency of `@open-press/core`'s render pipeline; if
running outside a framework workspace, install them locally:

```bash
npm i -D playwright serve-handler
npx playwright install chromium
```

## Why not put these in OpenPress itself?

This skill is the first external skill to exercise the two-layer split.
Keeping these scripts local lets us prove the workflow before promoting
either capability into the framework. See `NOTES.md` for the substrate-gap
report that tracks both promotions.
