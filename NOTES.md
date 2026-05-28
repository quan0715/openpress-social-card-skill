# NOTES — substrate gaps & cross-repo coordination

This is the report-back channel from this skill's implementation to the
OpenPress framework side (§ 14.2 discipline: do not patch the framework
repo from this skill). Each gap lists what was observed, where the workaround
lives, and what the framework side needs to do for the workaround to be
deleted.

---

## GAP-1 · PNG export

**Status:** active. Codex is implementing on the OpenPress side.

**Observed:** OpenPress currently centers on reader / PDF / static output.
There is no `openpress png` command, so PNG-per-card export had to live in
this skill.

**Workaround in this skill:**

- `skills/social-card/scripts/render-png.mjs` — Playwright-based, spins up
  a static server, walks `.reader-page`, screenshots each at real pixel
  dimensions, writes deterministic filenames.
- `skills/social-card/scripts/README.md` lists `playwright` and
  `serve-handler` as workspace dependencies.
- `SKILL.md` § OpenPress commands lists this script and marks it as
  "until OpenPress ships `openpress png`".

**Framework side closes this gap by:**

1. Adding an `openpress png` command (or `node engine/cli.mjs png …`) that
   accepts at minimum: workspace path, output dir, frame selector / frameKey,
   optional deterministic filename pattern.
2. Reusing the existing `chrome-pdf.mjs` headless Chrome resolution so PNG
   does not add a new dependency.
3. Documenting the command in `docs/cli.md` and the public API page.

**This skill closes its side by:**

- Deleting `scripts/render-png.mjs` and its `README.md` entry.
- Removing the `playwright` / `serve-handler` dep notes.
- Updating `SKILL.md` § OpenPress commands to call `openpress png` directly.
- Updating `references/qa-checklist.md` to reference the framework command.

---

## GAP-2 · Validator hooks

**Status:** not started on the framework side. Acceptable as skill-local
for v1.

**Observed:** the design spec § 8.4 sketches a validator-hook contract
where `document/openpress.config.mjs` can list extra validators that
OpenPress runs alongside its built-in checks. That contract does not exist
yet, so the social-card validator runs as a free-standing script.

**Workaround in this skill:**

- `skills/social-card/scripts/validate-social-card.mjs` — standalone
  Playwright-based validator. Boots its own server, runs its own rules,
  returns its own exit code.

**Framework side closes this gap by:**

1. Exposing a `validators: [path, …]` slot in `document/openpress.config.mjs`.
2. Defining the validator contract: input (rendered DOM / source tree),
   output (issue list with `{ rule, slug, detail }`), exit semantics.
3. Wiring built-in checks (overflow, small-type) into the same contract so
   third-party skills don't reimplement the basics.

**This skill closes its side by:**

- Adapting `validate-social-card.mjs` to export the contract instead of
  running standalone.
- Adding the validator path to `document/openpress.config.mjs`.

---

## GAP-3 · Per-frame geometry (mixed-ratio carousels)

**Status:** deferred to framework v2 per spec § 8.3 + § 13.5.

**Observed:** mixed-ratio carousels (e.g. 4:5 hero + 1:1 detail, or any
combination across IG / FB / Threads variants + FB link preview) need
per-frame geometry. Current `config.page` is workspace-level, so two
ratios in one workspace is not supported.

**Workaround in this skill:**

- v1 targets only IG / FB / Threads 1080×1350 — single ratio.
- Square 1080×1080 and FB link-preview 1200×630 explicitly deferred
  (`SKILL.md` § First-slice scope).

**Framework side closes this gap by:**

1. Allowing `<Frame>` (or a wrapper) to declare `geometry` per frame.
2. Making the reader, workbench zoom, PDF, and PNG export honor
   frame-level geometry.

**This skill closes its side by:**

- Adding square 1080×1080 + FB link-preview 1200×630 layouts.
- Adding mixed-ratio carousel composition (e.g. 4:5 hero + 1:1 detail in one
  workspace).

---

## GAP-4 · `document/` vs `press/` naming

**Status:** inconsistency between docs and runtime.

**Observed:** `apps/web/src/pages/docs/product-boundary.astro` now refers
to the workspace source as `press/index.tsx` and `press/chapters/**`.
However, the actual framework code still uses `document/` everywhere
(see `skills/social-post/starter/document/…`, `documentDir: "document"`
default in `openpress.config.mjs`). The bundled packs all use `document/`.

**Decision in this skill:** follow what the runtime actually supports.
The starter uses `document/`, not `press/`.

**Framework side closes this gap by either:**

- (a) Doing the rename in code + bundled packs + CLI defaults + tests, and
      providing a codemod / back-compat shim for downstream workspaces, OR
- (b) Reverting the product-boundary doc to `document/`.

Whichever way it goes, this skill will follow. Until then there is no
pending action on this side.

---

## GAP-5 · ~~Skill-with-starter pack resolution in the CLI~~ OBSOLETE

**Status:** OBSOLETE. Direction abandoned. Do not implement.

**Original sketch:** the CLI would resolve `--pack github:owner/repo/<skill>`
to `skills/<skill>/starter/document/` and install the skill alongside.

**Why it's obsolete:** OpenPress will not fetch external skill starters.
The two-layer split is cleaner if owned this way:

- **OpenPress's job ends at `init`** producing a blank runtime workspace.
- **Skills own their starters.** Agents read installed skill files (via the
  agent harness's `skills/` directory — `$CODEX_HOME/skills/<skill>` for
  Codex, `$HOME/.claude/skills/<skill>` for Claude Code) and copy / adapt
  them into the workspace from the inside.
- **No cross-repo CLI coupling.** No "skill-with-starter pack" resolver, no
  GitHub fetch path through `--pack`.

**This skill's adaptation:** see `SKILL.md` § Workspace operation and
`README.md` § Install / § Expected agent behavior for the skill-first
bootstrap flow. There is nothing for OpenPress to implement here.

**Implication for the §14 coordination contract:** the shared interface
`github:owner/repo/social-card → skills/social-card/starter/document/`
(spec §14.3) is no longer the integration point. Codex's CLI work item from
§14.1 ("CLI support for skill-with-starter pack resolution") is **dropped**.
The new (and only) integration point between this skill and OpenPress is
the agent harness's skill-install convention — which OpenPress itself does
not need to know about.

---

## Coordination summary

| Gap | Lives where now | Closed by | Cross-repo? |
| --- | --- | --- | --- |
| 1 PNG export | this skill (`scripts/render-png.mjs`) | Codex: `openpress png` command | Yes |
| 2 Validator hooks | this skill (standalone script) | Framework: validator contract | Yes |
| 3 Per-frame geometry | deferred (v1 scope only) | Framework v2 | Yes, later |
| 4 `document/` vs `press/` | docs say `press/`, code uses `document/` | Framework: pick one | Doc-only |
| 5 ~~Skill-with-starter pack resolution~~ | **OBSOLETE** — skill owns starter, agent copies from installed skill dir | — | — |
| 6 Spec names XHS / WeChat as v1 target | implementation pivoted to IG / FB / Threads | Codex / spec owner: update spec § 6.1, § 13, § 14.2 | Spec-only |
| 7 Spec § 14 contract assumes pack-fetch model | superseded by skill-first bootstrap (GAP-5 obsolete) | Codex / spec owner: rewrite § 14.1 + § 14.3 around `skills add` flow | Spec-only |

If a new gap is discovered during implementation, append a new section
here — do not file an issue in the framework repo from this side without
the user's go-ahead.

---

## GAP-6 · Design spec still names Xiaohongshu / WeChat as targets

**Status:** spec out of sync with implementation direction (Codex / spec
owner to update).

**Observed:** `docs/superpowers/specs/2026-05-28-openpress-social-card-skill-design.md`
in the framework repo describes the first-slice target as **Xiaohongshu
1080×1440** with WeChat 21:9 + 1:1 covers as v2 follow-ups (§ 6.1, § 13.2,
§ 14.2 done-when criteria). The user has since redirected this skill to
**Instagram / Facebook / Threads 1080×1350**.

**Workaround in this skill:** the implementation has already pivoted. All
runtime artifacts (`openpress.config.mjs`, `index.tsx`, references, README,
SKILL.md) target IG / FB / Threads at 1080×1350. The spec's XHS/WeChat
language is no longer authoritative.

**Framework / spec side closes this gap by:**

1. Updating the design spec § 6.1 page-geometry list to read
   `social-4x5: 1080×1350` as the v1 target.
2. Updating § 13 implementation decisions and § 14.2 done-when criteria
   accordingly.
3. Moving Xiaohongshu / WeChat from "first target" to "alternate regional
   targets" — they can still be valid future packs but are not the v1
   reference implementation.

**This skill closes its side by:** no action — already pivoted.
