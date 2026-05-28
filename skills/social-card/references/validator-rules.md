# Validator rules

Structured rule specs for the social-card domain. These are designed to register with OpenPress's `openpress validate` command (and the optional `validators:` config hook) once those ship.

Until then, the rules below are an agent-readable QA checklist — the agent should mentally apply them before delivery, and the existing visual checks in `qa-checklist.md` cover the same ground in narrative form.

**Each rule has:**

- `id` — stable identifier
- `applies_to` — recipe families or scope
- `severity` — `error` blocks delivery, `warn` requires user acknowledgment
- `check` — what the runtime is expected to verify
- `reason` — why this rule exists; used by the agent to explain a violation to the user

## Identity rules

### `editorial-identity`

```
applies_to: pages where [data-style] is unset or "editorial"
severity: error
check:
  - at-least-one-of:
      - paper-grain-layer-present       (.reader-page--social-card::before opacity > 0)
      - with-ink-wash modifier applied
  - display-font-family is serif        (computed font-family contains "Source Serif", "Noto Serif", "Songti", or "serif")
  - at-least-one-of:
      - image with class .editorial-cover__well or .editorial-evidence__media or .editorial-field-note__photo
      - blockquote with class .editorial-pull-quote__quote
      - ledger with class .editorial-tall-ledger__rows or .editorial-closing-ledger__rows
reason: |
  Without atmosphere + serif title + magazine structure, the page reads
  as "Swiss-with-a-serif" or a generic infographic, not Editorial.
```

### `swiss-identity`

```
applies_to: pages where [data-style="swiss"]
severity: error
check:
  - every display title (font-size >= 72px) uses a typed class
    (.swiss-statement__display etc.); computed font-weight <= 300
  - no serif family is loaded or computed on any element
  - section separators are hairline rules (1–2px) or grid gutters; no card borders + drop shadows
  - exactly one accent color is in use across all pages of the carousel
reason: |
  A bold 90px headline, serif fallback, or mixed accents instantly
  downgrades Swiss to generic landing-page editorial.
```

### `the-larger-the-lighter`

```
applies_to: all pages, both modes
severity: error
check:
  - any element with font-size >= 72px has font-weight <= 500 (Editorial) or <= 300 (Swiss)
  - any small text (font-size <= 24px) used as kicker / meta has font-weight >= 500
reason: |
  The hierarchy rule that prevents both modes from collapsing into
  generic landing-page editorial. 90px at weight 700+ is the most
  common identity failure.
```

## Density rules

### `4-band-density-check`

```
applies_to: every page
severity: error (under-filled band > 15 % canvas height)
check:
  for each page, divide the rendered canvas into 4 equal horizontal bands
  classify each band as:
    - filled: contains text, image, data, or rule (covers > 60 % of band)
    - justified-empty: empty for a stated reason (hero-image breathing on EditorialCover, pull-quote whitespace on PullQuote, leading/trailing margin ≤ 8 %)
    - under-filled: empty with no reason
  pass conditions:
    1. filled + justified-empty bands cover ≥ 100 %
    2. filled bands cover ≥ 70 % of canvas height (≥ 945 px of 1350 px)
    3. no two adjacent bands are both justified-empty
reason: |
  Under-filled cards read as "PowerPoint with a missing element" at
  thumbnail size. Editorial magazines absorb whitespace across opposing
  pages; social cards are scrolled one at a time.
```

Per-recipe density floors (when the rule above is too coarse):

| Recipe | Minimum content |
| --- | --- |
| EditorialCover | title + (image OR anchor). With neither, the cover reads as a placeholder. |
| FieldNotePhoto | image filling > 55 % vertical + takeaway + caption. No bare photo. |
| EditorialEssaySplit | title + ≥ 2 paragraphs (or ≥ 3 numbered fragments). Title alone is `PullQuote`. |
| PullQuote | kicker + quote + source. Without kicker + source, whitespace reads as missing. |
| EvidenceWall | headline + ≥ 3 images (for 3-col) or 4 (for 2×2) or 6 (for 3×2). All captioned. |
| ClosingLedger | title + ≥ 4 ledger rows (each with sub-line) + closing block. 3 short rows fail. |
| TallLedger | title + ≥ 4 rows, each row ≥ 118 px tall. Bare list of phrases fails. |
| EvidenceFeature | headline + image filling > 45 % vertical + ≥ 2 takeaways. |
| MarginaliaEssay | title + ≥ 2 main-column paragraphs + ≥ 3 marginal entries. Marginalia must carry meaning, not decoration. |
| SectionDivider | kicker + title. Subtitle and footer optional but recommended. This is the one recipe where atmospheric whitespace is intentional. |

## Type rules

### `body-floor`

```
applies_to: all elements rendering body copy
severity: error
check: computed font-size >= 30px for body, >= 22px for caption
reason: |
  Cards are viewed at IG/FB/Threads feed thumbnail size (≈ 200 px wide).
  Body smaller than 30 px is unreadable in feed; captions smaller than
  22 px disappear.
```

### `title-character-cap`

```
applies_to: EditorialCover.title, PullQuote.quote, SwissStatement.lines
severity: warn
check:
  - Chinese: <= 14 characters per line; total <= 24 characters
  - Latin: <= 28 characters per line; total <= 60 characters
reason: |
  Cover headlines must read at IG thumbnail size. Long headlines wrap
  unpredictably and the focal point is lost.
```

## Image rules

### `source-missing`

```
applies_to: any <img> in a card
severity: error
check:
  - every <img> referencing /openpress/media/<file> has a matching entry
    in press/media/SOURCES.md (origin / license / retrieved / notes)
  - origin=user has no required fields beyond "user"
  - origin=web requires URL + license + retrieved date
  - origin=generated requires model name + prompt summary
reason: |
  Web-sourced images without provenance are a legal exposure; user
  uploads need a record so the workspace stays auditable; generated
  images need attribution so the workflow stays reproducible.
```

### `subject-safe-zone`

```
applies_to: EvidenceFeature with image, EditorialCover with image
severity: warn
check:
  - if the image has a documented subject map (HTML comment near the
    <img>), display title placement does not overlap a face, hand, or
    key product feature
  - if no subject map is present, warn that one is recommended for
    text-on-image cards
reason: |
  Full-bleed photo with title crossing the subject is the most common
  failure mode that survives every other check — the HTML is valid,
  the image loads, the title renders, but the result is unreadable at
  thumbnail size.
```

## Layout integrity rules

### `footer-collision`

```
applies_to: pages with .swiss-statement__cta or .editorial-closing-ledger__closing
severity: error
check:
  - footer is positioned via flex (margin-top: auto) or grid (auto 1fr auto),
    not position: absolute; bottom
  - content above does not extend past the footer's expected top edge
reason: |
  Absolutely-positioned footers get crashed through by overflowing content
  above. Flex / grid patterns are safe; absolute is not.
```

### `one-accent-per-package`

```
applies_to: the carousel as a whole
severity: error
check: exactly one --openpress-accent value is used across all pages
reason: |
  Multi-accent carousels look like a stock-template generator. Cross-
  page palette coherence is what makes the carousel feel like a single
  publication.
```

### `no-decorative-shapes`

```
applies_to: all elements
severity: warn
check:
  - no SVG circles, ovals, blobs, drops, or ornamental decorations
    that don't carry meaning
  - no gradient backgrounds outside the sanctioned ink-wash atmosphere
  - no nested rounded cards
reason: |
  Decorative shapes signal "infographic template", not magazine.
```

## When the validator hook ships

These rules are designed to register through OpenPress's expected `validators:` config hook (see `NOTES.md` GAP-2). The expected shape:

```js
// press/openpress.config.mjs
export default {
  // ...
  validators: ["<install-skill-dir>/social-card/validate.json"],
};
```

Where the validator config file is a structured list matching the schema above (`id`, `applies_to`, `severity`, `check`, `reason`). The skill will export this file once OpenPress confirms the contract — until then, the rules live here as agent-readable specs.
