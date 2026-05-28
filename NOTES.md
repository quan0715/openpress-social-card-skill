# NOTES — substrate gaps & cross-repo coordination

This is the report-back channel from this skill's implementation to the
OpenPress framework side (§ 14.2 discipline: do not patch the framework
repo from this skill). Each gap lists what was observed, where the workaround
lives, and what the framework side needs to do for the workaround to be
deleted.

---

## GAP-1 · PNG export

**Status:** waiting for OpenPress first-class PNG export command.

**Observed:** OpenPress currently centers on reader / PDF / static output.
There is no `openpress export png` command.

**Workaround in this skill: none.** A previous version of this skill
shipped `scripts/render-png.mjs`, a Playwright-based stopgap. It was
**removed** because shadow-implementing substrate from a skill blurs the
two-layer split and creates false confidence — the skill appeared to "do"
PNG export when it was really sidestepping the framework.

The skill now instructs the agent to use OpenPress's expected `openpress
export png` command. If that command isn't present in the installed
OpenPress version, the agent stops and reports the missing capability
rather than building a skill-local replacement.

**Framework side closes this gap by:**

1. Adding an `openpress export png` command (or `openpress png`) that
   accepts at minimum: workspace path, output dir, frame selector /
   `frameKey`, optional deterministic filename pattern.
2. Reusing the existing `chrome-pdf.mjs` headless Chrome resolution so PNG
   does not add a new dependency.
3. Documenting the command in `docs/cli.md` and the public API page.

**This skill closes its side by:** nothing to remove. `SKILL.md` and
`README.md` already point the agent at the expected command + the
fail-with-substrate-gap protocol.

---

## GAP-2 · Validation runtime

**Status:** base OpenPress `validate` / `inspect` exists; domain-specific
social-card rules still need a framework hook.

**Observed:** the current OpenPress workspace can run `validate` and
`inspect` for build/overflow sanity. The remaining missing piece is the
validator-hook contract sketched in design spec § 8.4: skills still need a
way to register domain-specific checks such as minimum density, tiny type,
missing sources, and editorial/swiss identity drift.

**Workaround in this skill: none.** A previous version shipped
`scripts/validate-social-card.mjs`, a Playwright-based validator. It was
**removed** for two reasons:

- It returned `0 card(s) checked, 0 issue(s)` when it found zero
  `.reader-page` elements (wrong workspace, build not run, etc.), creating
  a dangerous **false-green**.
- Like PNG export, it was the skill shadow-implementing what OpenPress
  should own. False confidence is worse than a missing check.

**Framework side closes this gap by:**

1. Keeping `openpress validate` / `openpress inspect` as the mandatory
   baseline with documented non-zero exit codes.
2. Exposing a `validators: [path, …]` hook in
   `press/openpress.config.mjs` so skills can register domain-specific rules
   (overflow / density / small-type for social cards) without spawning
   their own runtime.

**This skill closes its side by:** nothing. The skill instructs the agent
to call OpenPress's command and stop-with-substrate-gap if absent. When
the validator-hook contract ships, the skill can contribute its specific
rule set (overflow / density / small-type / source-missing) — but it will
register them through OpenPress's contract, not run its own runtime.

---

## GAP-3 · Per-frame geometry (mixed-ratio carousels)

**Status:** deferred to framework v2 per spec § 8.3 + § 13.5.

**Observed:** mixed-ratio carousels (e.g. 3:4 hero + 1:1 detail, or any
combination across Rednote, IG / FB / Threads variants + link preview) need
per-frame geometry. Current `config.page` is workspace-level, so two
ratios in one workspace is not supported.

**Workaround in this skill:**

- v1 targets only 1080×1440 editorial portrait — single ratio.
- 4:5 feed, square 1080×1080, and FB link-preview 1200×630 explicitly deferred
  (`SKILL.md` § First-slice scope).

**Framework side closes this gap by:**

1. Allowing `<Frame>` (or a wrapper) to declare `geometry` per frame.
2. Making the reader, workbench zoom, PDF, and PNG export honor
   frame-level geometry.

**This skill closes its side by:**

- Adding 4:5 feed, square 1080×1080, and FB link-preview 1200×630 layouts.
- Adding mixed-ratio carousel composition (e.g. 3:4 hero + 1:1 detail in one
  workspace).

---

## GAP-4 · ~~`document/` vs `press/` naming~~ Resolved on skill side

**Status:** resolved on this side. Starter renamed to `press/`.

**Observed:** earlier the framework code used `document/` while the
product-boundary docs used `press/`. This skill originally tracked the
runtime convention.

**Decision in this skill (2026-05-29):** rename `starter/document/` to
`starter/press/` to match the 1.0 contract direction (commit `1dcce35`
in the framework repo). The skill is no longer waiting on the framework
to converge.

If the installed OpenPress version still expects `documentDir: "document"`,
the agent should follow the workspace operation guidance in `SKILL.md`:
read the installed `@open-press/core`, make the small migration, proceed.
The starter doesn't try to be backwards-compatible with both conventions
simultaneously — picking one keeps the starter readable.

---

## GAP-5 · ~~Skill-with-starter pack resolution in the CLI~~ OBSOLETE

**Status:** OBSOLETE. Direction abandoned. Do not implement.

**Original sketch:** the CLI would resolve `--pack github:owner/repo/<skill>`
to `skills/<skill>/starter/press/` and install the skill alongside.

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
`github:owner/repo/social-card → skills/social-card/starter/press/`
(spec §14.3) is no longer the integration point. Codex's CLI work item from
§14.1 ("CLI support for skill-with-starter pack resolution") is **dropped**.
The new (and only) integration point between this skill and OpenPress is
the agent harness's skill-install convention — which OpenPress itself does
not need to know about.

---

## Coordination summary

| Gap | Lives where now | Closed by | Cross-repo? |
| --- | --- | --- | --- |
| 1 PNG export | not in skill — waiting on `openpress export png` | Framework: ship `openpress export png` | Yes |
| 2 Validation runtime | base exists; skill rules waiting on validator hook | Framework: expose optional config hook | Yes |
| 3 Per-frame geometry | deferred (v1 scope only) | Framework v2 | Yes, later |
| 4 ~~`document/` vs `press/`~~ | **resolved** — starter uses `press/` | — | — |
| 5 ~~Skill-with-starter pack resolution~~ | **OBSOLETE** — skill owns starter, agent copies from installed skill dir | — | — |
| 6 Spec names XHS / WeChat as v1 target | aligned — starter uses 1080×1440 editorial card geometry | — | — |
| 7 Spec § 14 contract assumes pack-fetch model | superseded by skill-first bootstrap (GAP-5 obsolete) | Codex / spec owner: rewrite § 14.1 + § 14.3 around `skills add` flow | Spec-only |

If a new gap is discovered during implementation, append a new section
here — do not file an issue in the framework repo from this side without
the user's go-ahead.

---

## GAP-6 · ~~Design spec still names Xiaohongshu / WeChat as targets~~ Resolved

**Status:** resolved on the skill side. The starter is back on the
1080×1440 editorial portrait baseline.

**Observed:** `docs/superpowers/specs/2026-05-28-openpress-social-card-skill-design.md`
in the framework repo describes the first-slice target as **Xiaohongshu
1080×1440** with WeChat 21:9 + 1:1 covers as v2 follow-ups (§ 6.1, § 13.2,
§ 14.2 done-when criteria).

**Decision in this skill (2026-05-29):** keep the original 1080×1440
editorial card geometry as the visual baseline. Future 1080×1350 / square /
link-preview variants should be added as explicit geometries, not by
quietly retuning the baseline.

**This skill closes its side by:** aligning `openpress.config.mjs`,
`index.tsx`, references, README, and SKILL.md around 1080×1440.
