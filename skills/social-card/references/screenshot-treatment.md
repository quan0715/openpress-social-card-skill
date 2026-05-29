# Screenshot treatment

When the user supplies an app / web / code / dashboard screenshot, **do not** drop it raw into an `ImageWell` or a recipe's image slot. The aspect-ratio mismatch crops UI and the harsh edge looks SaaS-y.

Use `.swiss-frame-shot` instead — a Swiss-prefixed utility that stages a contain-fit screenshot inside one of several backgrounds, with optional device chrome wrappers.

## When to reach for it

- **App / Web UI capture** — anything with a status bar, tab bar, toolbar, or window chrome.
- **Code / terminal screenshots.**
- **Dashboard / chart screenshots** that need to keep every label readable.
- **IDE captures** where text density matters more than composition.

For **photographic** content (people, scenery, products), keep using `EvidenceFeature` / `FieldNotePhoto` / `EditorialCover` — the treatments below assume a pixel-perfect UI source where contain-fit is non-negotiable.

## Subject prep

Before framing, decide what the actual screenshot subject is. If the source capture contains a floating modal / card over an unrelated page, desktop chrome, cropped side text, cursor trails, notification fragments, or leftover background UI, **crop to the foreground window / card first**, then place that cleaned subject into the stage. Don't beautify a raw capture that carries accidental UI behind the subject.

Screenshot beautification must not introduce perspective, skew, rotation, or 3-D tilt unless the user explicitly asks for a mockup scene. The treatment here is orthographic: straight subject, equal scaling, quiet background, clear safe padding.

## Anatomy

```
.swiss-frame-shot.r-{ratio}.corners-{sq|sm|md}.shadow-{none|soft|ed}
                 .bg-{paper|paper-2|grey-1|grid|dot|ink}.inset-{none|sub|bal}
  └─ <img src="…">         (object-fit: contain by default)
```

Optional device wrappers:

```
.swiss-device-browser
  └─ .swiss-frame-shot.r-16x10.bg-paper
       └─ <img>

.swiss-device-phone
  └─ .swiss-frame-shot.r-3x4.bg-paper
       └─ <img>
```

## Parameters

Pick six values before writing the markup. Treat this like a one-time decision per card — don't fiddle mid-build.

### 1. `r-*` ratio (required, matches slot)

| Class | Use |
| --- | --- |
| `r-16x10` | Default for app / web shots — looks like a real window |
| `r-16x9` | Landscape video / dashboard / wide chart |
| `r-4x3` | Classic desktop window, legacy app |
| `r-3x2` | DSLR-style — only if the source is a photographic UI mockup |
| `r-1x1` | App icon / square widget |
| `r-3x4` | Mobile portrait shot — pair with `.swiss-device-phone` |
| `r-21x9` | Multi-monitor / ultra-wide / hero strip |

### 2. `corners-*`

- **Swiss default:** `corners-sq`. Use `corners-sm` only if the slot has surrounding shadow or chrome.
- **Editorial default:** `corners-sm` (4 px). Bump to `corners-md` (10 px) for a "cutout" feel on paper.

Never go above 10 px — anything bigger reads as iOS marketing.

### 3. `shadow-*`

- **Swiss:** `shadow-none` 90 % of the time. `shadow-soft` only on screenshots that float on `bg-grid` / `bg-dot`. `shadow-ed` adds a 1 px outline — reserve for hero shots.
- **Editorial:** `shadow-soft` on `bg-paper-2` is the warm default. `shadow-ed` for hero shots.

### 4. `bg-*` — the screenshot "stage"

| Token | Swiss role | Editorial role |
| --- | --- | --- |
| `bg-paper` | Default plain stage | Same |
| `bg-paper-2` | n/a | Default warm stage |
| `bg-grey-1` | Default plain stage | n/a |
| `bg-grid` | Engineering / data | Field-notes engineering |
| `bg-dot` | Subtle structure | Subtle structure |
| `bg-ink` | Dark-mode UI shot | Dark-mode UI shot |

Backgrounds are **never** accent-coloured. If the screenshot needs an accent emphasis, add a `.swiss-t-cat` chip or kicker next to it — don't tint the stage.

### Asset backgrounds (not shipped)

Upstream ships 9 real-texture WebP backgrounds (`.bg-asset-monocle-classic`, `.bg-asset-ikb-dot`, etc.) under `assets/screenshot-backgrounds/`. This skill **does not** ship those assets in v1 — the CSS-generated stages above cover ≈ 80 % of cases, and bundling WebP binaries would inflate the skill repo for a marginal aesthetic gain.

If a project genuinely needs the textured warmth, copy the assets into the workspace's `press/media/` directory and define matching `.bg-asset-*` rules locally in `theme/tokens.css` or a project-level CSS override.

### 5. `inset-*` — padding between shot and stage

- `inset-none` — image fills the frame. Use when the screenshot already has its own window chrome.
- `inset-sub` (20 px) — default. Lets the stage breathe.
- `inset-bal` (48 px) — when the shot is busy and needs to feel calm.

### 6. `fit-cover` (override)

Default is `object-fit: contain` — this is the whole point of `.swiss-frame-shot`. **Only** add `.fit-cover` when:

- The slot is a hero where exact pixels of the source don't matter (e.g. a code shot used as a background pattern).
- The user explicitly says they want the shot cropped.

## Device wrappers

### `.swiss-device-browser`

A 32-px chrome bar with three traffic-light dots. Use for web / desktop app captures. (Shipped — already used inside the `SwissBrowserMock` recipe.)

Pair with `shadow-soft` on the screenshot itself for a desk-photo feel.

```html
<div class="swiss-device-browser">
  <div class="swiss-frame-shot r-16x10 bg-paper inset-none">
    <img src="/openpress/media/inbox.png" alt="Linear inbox" />
  </div>
</div>
```

### `.swiss-device-phone`

Wraps a `r-3x4` or `r-16x10` shot in an ink-coloured bezel with 18 px rounded inner corners. Use for mobile captures.

```html
<div class="swiss-device-phone">
  <div class="swiss-frame-shot r-3x4 bg-paper inset-none">
    <img src="/openpress/media/app.png" alt="WeChat detail" />
  </div>
</div>
```

Don't stack `corners-md` on top of `.swiss-device-phone` — the bezel already rounds the inner shot.

## Safe-area cropping

When the user delivers a full-screen capture (1290×2796 iOS / 1080×2400 Android / 1920×1080 desktop), do **not** show the status bar, dock, or browser tab strip unless that chrome is the subject. Crop before importing:

1. Trim the iOS / Android status bar (top ≈ 47–59 px on retina).
2. Trim the home indicator / nav gesture bar (bottom ≈ 34 px on iOS).
3. For desktop: trim everything above the page content unless wrapping in `.swiss-device-browser`.

If you can't crop ahead of time, use `object-position: center 6%` to bias the visible region downward — but this is a workaround, not the preferred path.

## Cheat-sheet recipes

Two configurations that cover 80 % of cases.

**Swiss product demo** — pure stage, no shadow:

```
.swiss-frame-shot.r-16x10.corners-sq.shadow-none.bg-grey-1.inset-bal
```

**Editorial deep-dive** — desk-photo warmth:

```
.swiss-frame-shot.r-16x10.corners-sm.shadow-soft.bg-paper-2.inset-sub
```

For comparison shots (before / after), use **the same parameters** on both — different treatment between cells reads as inconsistency, not contrast.

## Mixing with photographic recipes

If a card mixes `EvidenceFeature` (photographic) and `.swiss-frame-shot` (UI screenshot) on the same page, that's usually a smell — pick one approach per page. The hairline shadow + contain-fit on a `.swiss-frame-shot` clashes visually with the cover-fit photo wells in Editorial recipes.

Exception: `EvidenceWall` with mixed media is fine when the page's interpretation is "these are different artifacts I'm comparing," not "this is the same story." Document the choice with a kicker that names the comparison (e.g. "Code · UI" rather than just "Evidence").
