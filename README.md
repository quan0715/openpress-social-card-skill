# openpress-social-card-skill

> 為 OpenPress 設計的社群卡片(Instagram / Facebook / Threads)生成 skill。從 `guizang-social-card-skill` 的工作流啟發,重寫成 OpenPress-native 的版本,版面以 IG/FB/Threads 通用的 1080×1350 portrait 為主。

[![License](https://img.shields.io/badge/license-MIT-black)](LICENSE)
[![Status](https://img.shields.io/badge/status-WIP%20scaffold-orange)](#status)

## Status

**v0 — scaffold only.** The skill workflow, starter, and reference docs are in place; rendering, preview, export, and validation are explicitly OpenPress's responsibility (not shipped from this skill — see § What this skill tests). Not usable as a finished skill until the OpenPress side ships the commands listed in § Expected future OpenPress commands.

See the design spec (developed in the OpenPress framework repo) at `docs/superpowers/specs/2026-05-28-openpress-social-card-skill-design.md` for what this skill is meant to do.

## What this is

An **external skill** that targets OpenPress's fixed-layout application layer.

- **Skill (this repo)** brings the creative decisions: intake, story plan, visual stance, layout selection, image strategy, per-domain validation rules.
- **OpenPress (separate repo)** brings the substrate: fixed page geometry, dev server, inline edit, comment markers, source-backed workspace, PDF / PNG export, validation primitives.

This is the first external reference implementation of OpenPress's two-layer product model. See the OpenPress repo's `docs/product-boundary` for the model.

First-slice target: **IG / Facebook / Threads 1080×1350 (4:5 portrait feed)**. Square 1080×1080 and Facebook link-preview 1200×630 are tracked for v2.

## Attribution / 致謝

This project is a **clean-room OpenPress-native rewrite** of the workflow and decision logic behind [`guizang-social-card-skill`](https://github.com/op7418/guizang-social-card-skill). The original skill proved that high-quality social-card generation needs a real application layer rather than another prompt pack. This project preserves the creative judgment captured in that workflow while moving rendering, workspace, and editing into OpenPress.

**Upstream:** https://github.com/op7418/guizang-social-card-skill

**Relationship to the original:**

- Inspired by the workflow, taste system (Editorial / Swiss), layout recipes, and validation rules described in `guizang-social-card-skill`.
- Behavior and concepts are studied and re-implemented in OpenPress-native form.
- **No source code, HTML templates, CSS, or assets from the original repo are copied directly into this one.** Where a direct port would be unavoidable, the source file will carry a per-file attribution notice and will be licensed accordingly.
- This repo does not bundle, redistribute, or rehost any artifact from the original repo.

If you are the author of the upstream repo and want the attribution updated, please open an issue.

## Layout

```txt
openpress-social-card-skill/
  README.md
  LICENSE
  skills/
    social-card/
      SKILL.md           ← agent-facing behavior (workflow, intake, taste)
      starter/press/     ← OpenPress workspace template for one ratio
      references/        ← detailed workflow rules, loaded on demand
```

No `scripts/` directory: rendering, preview, validation, and export live on the OpenPress side (see § What this skill tests).

## Install

```bash
npx -y skills@latest add quan0715/openpress-social-card-skill
```

Restart Codex (or your agent harness) after installing the skill. After restart, ask the agent to use the social-card skill. The skill will create an OpenPress workspace and copy its own starter into it.

OpenPress only initializes a blank runtime workspace — this skill owns the starter and tells the agent how to bootstrap from it. There is no `--pack` flag, no skill-with-starter pack resolution on the framework side.

## What the skill expects from the agent

When invoked, the agent typically:

1. **Intakes first.** Asks about target platform, source text, image availability, visual stance, and constraints. Card generation comes after intake, not before.
2. **Ensures an OpenPress workspace is in place.** Runs `npx @open-press/cli@next init` if the working directory isn't one. No `--pack` — this skill provides the starter.
3. **Uses this skill's installed starter as the starting point.** Reads from the installed skill directory (e.g. `${CODEX_HOME:-$HOME/.codex}/skills/social-card/starter/press/` for Codex, `$HOME/.claude/skills/social-card/starter/press/` for Claude Code) and copies it into the workspace. If the starter doesn't match the installed OpenPress version, reads the latest OpenPress docs + `@open-press/core` types and does the smallest migration to land the same intent.
4. **Edits source, not output.** Modifies MDX cards, theme tokens, and layout components in the workspace; renders flow from source.
5. **Renders and validates via OpenPress commands.** `npm run dev` for preview, `npm run build` / `openpress:pdf` for output, `openpress validate` and `openpress export png` once they ship. If a needed command isn't present in the installed OpenPress version, the agent should stop and report the missing substrate capability — **not** implement a skill-local renderer or validator.
6. **Logs web-sourced images.** Every image not supplied by the user gets an entry in `press/media/SOURCES.md` with URL + license + retrieval date before it can be referenced.

The spirit of the skill: it's a guide and a starting point, not a rulebook. The agent owns the implementation; the skill owns the intent — IG / FB / Threads 1080×1350 carousels, MDX-driven, source-backed, OpenPress-as-substrate. If the agent finds a better way to land the intent, take it.

The point of this skill is not to test OpenPress's template system. It is to demonstrate that a skill can correctly route an agent into OpenPress's substrate — workspace, source files, comments, render, export — without reinventing any of it.

## What this skill tests

This skill tests whether an external creative / intake skill can guide an agent into OpenPress as the substrate.

- It **does not** test an OpenPress template system.
- It **does not** ship renderer / export infrastructure.
- It **may** include starter content as skill-local examples, but OpenPress owns runtime, preview, validation, and output.

## Expected future OpenPress commands

The skill assumes OpenPress will ship (or already ships):

- `openpress build`
- `openpress preview`
- `openpress validate`
- `openpress export png --out output/png`

If a needed command isn't present in the installed OpenPress version, the skill expects the agent to **stop and report the missing substrate capability**, not to implement a skill-local replacement. Shadow-implementing rendering or validation from a skill blurs the two-layer split and creates false confidence (e.g. a Playwright-based validator that returns 0 issues when it finds 0 cards is worse than no validator at all).

## License

MIT — see [LICENSE](LICENSE). License covers only code written in this repository; derived material retains its original license.
