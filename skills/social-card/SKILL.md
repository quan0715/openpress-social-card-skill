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

A typical flow looks like this. **Intake comes first** because skill quality depends on
understanding the user — that one is load-bearing. Everything after can be re-sequenced when the
context calls for it.

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

This skill **does not** ask the agent to hand-write standalone HTML. It also **does not** rely on
OpenPress to fetch the starter — this skill owns its starter and is responsible for getting it
into the workspace. OpenPress only initializes a blank runtime workspace; populating it is the
skill's job.

Bootstrap flow:

```bash
# 1. Init a blank OpenPress workspace. No --pack. OpenPress only sets up the runtime.
npx @open-press/cli@next init my-cards
cd my-cards

# 2. Resolve this skill's installed location. Path differs per agent harness:
#    - Codex:        ${CODEX_HOME:-$HOME/.codex}/skills/social-card
#    - Claude Code:  $HOME/.claude/skills/social-card
SOCIAL_CARD_SKILL_DIR="${CODEX_HOME:-$HOME/.codex}/skills/social-card"

# 3. Replace the default document/ with this skill's starter.
rm -rf document
cp -R "$SOCIAL_CARD_SKILL_DIR/starter/document" document

# 4. Boot the workbench.
npm run dev
```

Notes for the agent at this step:

- `openpress init --pack …` is not how this works. OpenPress doesn't fetch external skill starters.
- The installed skill directory (`$SOCIAL_CARD_SKILL_DIR`) is the source of truth for
  `starter/`, `references/`, and `scripts/`.
- After the starter is copied in, the workspace belongs to the user — edit it like any other code.

**If the starter doesn't run on the current OpenPress version**, that's expected — frameworks
evolve. The starter is a worked example calibrated for the OpenPress version this skill was last
validated against (see the `Compatibility` note in `README.md` if present, otherwise treat the
starter as illustrative). When the starter and the installed `@open-press/core` disagree:

1. Read https://open-press.dev/docs and the installed `@open-press/core` type definitions.
2. Make the smallest migration that preserves the skill's intent — IG / FB / Threads 1080×1350
   portrait cards, MDX-driven, Editorial / Swiss visual systems, source-backed and editable.
3. Then continue with the workflow.

Don't wait for a `MIGRATIONS.md` recipe — there isn't one. The starter is a starting point, not
a contract.

Typical edit targets, roughly in order of impact:

- `document/chapters/<page>/content/<page>.mdx` — copy text. Each card is one MDX file.
- `document/theme/tokens.css` — brand colors, type, padding.
- `document/components/layouts/*.tsx` — when an existing layout doesn't express the page.
- `document/media/` — drop images here; web-sourced images go through `SOURCES.md` first.

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

## Hard rules

These are the lines that define the skill. Violating one means the skill failed, not that the
agent made a tradeoff.

- **Don't fake current facts, metrics, prices, or release details.** If a number could be wrong,
  browse and cite before using it.
- **Don't use web images without recording provenance.** `document/media/SOURCES.md` is the
  ledger — entries before references.
- **Don't deliver a standalone HTML file.** The deliverable lives inside an OpenPress workspace
  with source-backed cards. Bypassing the workspace is bypassing the whole skill.
- **Don't skip intake.** Without intake the skill collapses into a generic prompt.

## Strong defaults

Production-quality guidelines. Break them only when the user explicitly asks.

- Don't crop faces, key UI text, or product details — increase image area instead.
- Don't solve overflow by shrinking text below the floors in `references/qa-checklist.md`.
- Don't mix Editorial and Swiss in one carousel.
- Don't embed visible "instructions to the agent" inside the image — the card is the deliverable,
  not a how-to.

## References (load on demand)

- `references/platform-specs.md` — per-platform pixel sizes, safe areas, density expectations.
- `references/style-system.md` — Editorial vs Swiss: tokens, type pairings, when to use which.
- `references/layout-recipes.md` — the v1 layouts and what content shape each one expects.
- `references/qa-checklist.md` — final visual / typography / image / provenance checks.

## OpenPress commands the skill relies on

Scripts owned by this skill are run **from the OpenPress workspace** but **live in the skill's
installed directory** — they are skill-local tools, not workspace scripts. Always invoke them
via the absolute `$SOCIAL_CARD_SKILL_DIR` path with `--workspace .`.

| Command | Lives in | Purpose |
| --- | --- | --- |
| `npx @open-press/cli@next init` | OpenPress | Create a blank runtime workspace. No `--pack`. |
| `npm run dev` | OpenPress workspace | Workbench preview |
| `npm run build` | OpenPress workspace | Render to `dist-react/` |
| `npm run openpress:pdf` | OpenPress workspace | PDF output |
| `node "$SOCIAL_CARD_SKILL_DIR/scripts/render-png.mjs" --workspace .` | **this skill** | PNG export (stopgap until OpenPress ships `openpress png`). Run from inside the workspace. |
| `node "$SOCIAL_CARD_SKILL_DIR/scripts/validate-social-card.mjs" --workspace .` | **this skill** | Social-card validation. Run from inside the workspace. |
| `apply-comment` skill | OpenPress | Apply user's `@openpress-comment` markers |

If a command is missing or behaves wrong, **report back via `NOTES.md`**. Do not patch the
framework from this skill.
