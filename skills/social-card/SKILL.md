---
name: social-card
description: Use when generating fixed-size social cards (Instagram / Facebook / Threads, 1080×1350 portrait) from a source article, brief, or topic. Owns intake, story planning, visual stance, layout selection, image strategy, and review. Renders, edits, comments, and exports happen in OpenPress — do not reimplement those.
---

# Social Card Skill

A fixed-layout social-card generation workflow that targets OpenPress as the application layer.
This skill brings **creative decisions**; OpenPress brings the **substrate**.

## Two-layer split

| This skill owns | OpenPress owns |
| --- | --- |
| Intake, target-platform choice, source-material handling | Fixed page geometry, Press Tree runtime |
| Story plan, layout selection, visual stance (Editorial / Swiss) | Dev server, workbench, inline edit, comment markers |
| Image / source strategy, provenance | Source-backed MDX/TSX workspace, search, replace |
| Per-domain validation rules (overflow / density / readability) | PDF / web export, validation primitives |
| Taste calls | Agent-facing commands (`apply-comment`, `create-document`, `create-theme`, …) |

**Never reimplement OpenPress substrate from this skill.** If the workbench, dev server, or marker
pipeline does not cover something, report it back (see `NOTES.md`) — do not patch the framework
from a skill.

## First-slice scope (v1)

- **Target:** Instagram / Facebook / Threads at **1080×1350 (4:5 portrait feed)**. One geometry
  covers all three platforms — they share the same recommended portrait size.
- **Layouts:** 3 OpenPress-native recipes — Editorial cover, Editorial evidence, Swiss statement.
- **Export:** skill-local PNG script (`scripts/render-png.mjs`). PNG as a first-class OpenPress
  command is a framework follow-up.
- **Validation:** skill-local validator (`scripts/validate-social-card.mjs`) checking overflow,
  small type, and density.
- **Deferred to v2:** square 1080×1080 (IG / FB), Facebook link-preview 1200×630, per-frame
  geometry for mixed-ratio carousels, full guizang recipe library.

## Workflow

Always run in this order. Do not skip the intake or evidence gates.

### 1. Intake

Ask once, in one message:

1. **Target platform(s)** — Instagram, Facebook, Threads (v1 supports all three at 1080×1350).
   Square 1080×1080 and FB link-preview 1200×630 are deferred to v2.
2. **Source material** — paste text, link, or attached file. If only a topic is given, ask whether
   to research first or to brainstorm a draft together.
3. **Image availability** — does the user have photos / screenshots / brand assets, or should the
   skill source images?
4. **Visual stance preference** — Editorial (calm, paper-like, serif-leaning) or Swiss (graphic,
   chunky type, geometric). If the user has no preference, recommend based on content tone.
5. **Constraints** — language, brand colors, hard text the user wants kept verbatim.

Do not generate anything before all five are answered.

### 2. Evidence gate

If a page needs visual evidence and the user supplied no images, ask **once**:

> "I need images for the evidence pages. Want me to:
> (a) use media you'll attach,
> (b) source images from the web (I'll record provenance), or
> (c) generate images (raw visuals only, no embedded text)?"

Apply the user's choice for the whole project. Do not mix without asking again.

For web-sourced images, always record source URL + license status in
`document/media/SOURCES.md` before using them.

### 3. Story plan

Produce a page-by-page plan **before** touching the workspace. Keep it short:

```
Page 1  cover         <Editorial cover>      "標題 + 副標 + 數字 / 證據錨點"
Page 2  evidence      <Editorial evidence>   "圖佐證 + 重點 bullets"
Page 3  closing       <Swiss statement>      "結論句 + CTA"
```

Show the plan to the user. Iterate the plan, not the rendered cards.

### 4. Style choice

After the plan is approved, lock one visual stance (Editorial or Swiss) for the whole project.
Do not mix per page. If the user explicitly asks for a hybrid, ask once to confirm — mixed
systems are an anti-pattern by default.

Edit theme tokens in `document/theme/tokens.css` to land the brand. Do not paste inline styles
into cards.

### 5. Workspace operation

This skill **does not** ask the agent to hand-write standalone HTML.

Initialize the workspace by copying the starter (or via the OpenPress CLI when skill-with-starter
resolution ships):

```bash
npx @open-press/cli init my-cards \
  --pack github:quan0715/openpress-social-card-skill/social-card
```

Then edit, in this order of preference:

1. `document/chapters/<page>/content/<page>.mdx` — copy text only. Each card is one MDX file.
2. `document/theme/tokens.css` — brand colors, type, padding.
3. `document/components/layouts/*.tsx` — only when an existing layout cannot express the page.
4. `document/media/` — drop images here; reference them via relative path.

### 6. Review

Show the user the workbench (`npm run dev`) or rendered PNGs first. Never describe the cards in
words and call it done — render and screenshot.

Comments use OpenPress's `@openpress-comment` markers. The user marks; the agent applies via the
OpenPress `apply-comment` skill. Do not invent a separate comment flow.

### 7. Validation

Run the skill validator before final delivery if the user asks for auto-check:

```bash
node scripts/validate-social-card.mjs
```

The validator reports overflow, small-type warnings, and density issues. It does not replace
visual review.

### 8. Iteration

Iterate by editing the **MDX source / theme tokens / layout components** and re-exporting.
Never patch the rendered PNG by hand.

## Non-negotiables

These are hard rules. Violating them is the skill failing, not a tradeoff.

- **Do not fake current facts, metrics, prices, or release details.** If a number could be wrong,
  browse and cite before using it.
- **Do not silently use web images without recording source provenance.** `SOURCES.md` is the
  ledger; missing entries are a validator failure.
- **Do not crop faces, key UI text, or product details.** Increase the image area instead.
- **Do not solve overflow by shrinking text below readable floors** (see `references/qa-checklist.md`
  for the floor sizes).
- **Do not mix Editorial and Swiss in one package** unless the user explicitly confirms.
- **Do not place visible usage instructions inside the image.** The card is the deliverable, not
  a how-to.

## References (load on demand)

- `references/platform-specs.md` — per-platform pixel sizes, safe areas, density expectations.
- `references/style-system.md` — Editorial vs Swiss: tokens, type pairings, when to use which.
- `references/layout-recipes.md` — the v1 layouts and what content shape each one expects.
- `references/qa-checklist.md` — final visual / typography / image / provenance checks.

## OpenPress commands the skill relies on

| Command | Lives in | Purpose |
| --- | --- | --- |
| `npx @open-press/cli init` | OpenPress | Create the workspace from this starter |
| `npm run dev` | OpenPress workspace | Workbench preview |
| `npm run build` | OpenPress workspace | Render to `dist-react/` |
| `npm run openpress:pdf` | OpenPress workspace | PDF output (also previews PNG layout) |
| `node scripts/render-png.mjs` | **this skill** | PNG export (until OpenPress ships `openpress png`) |
| `node scripts/validate-social-card.mjs` | **this skill** | Social-card validation |
| `apply-comment` skill | OpenPress | Apply user's `@openpress-comment` markers |

If a command is missing or behaves wrong, **report back via `NOTES.md`**. Do not patch the
framework from this skill.
