# openpress-social-card-skill

> 為 OpenPress 設計的社群卡片(Instagram / Facebook / Threads)生成 skill。從 `guizang-social-card-skill` 的工作流啟發,重寫成 OpenPress-native 的版本,版面以 IG/FB/Threads 通用的 1080×1350 portrait 為主。

[![License](https://img.shields.io/badge/license-MIT-black)](LICENSE)
[![Status](https://img.shields.io/badge/status-WIP%20scaffold-orange)](#status)

## Status

**v0 — scaffold only.** The directory layout and coordination contract are in place; the SKILL behavior, OpenPress-native components, PNG export script, and validator are not yet implemented. Not usable as a skill yet.

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

Per the design spec § 5:

```txt
openpress-social-card-skill/
  README.md
  LICENSE
  skills/
    social-card/
      SKILL.md           ← agent-facing behavior (workflow, intake, taste)
      starter/           ← OpenPress workspace template for one ratio
      references/        ← detailed workflow rules, loaded on demand
      assets/            ← textures, sample media
      scripts/           ← render-png, validate-social-card
```

## How it will be installed (future)

Once the OpenPress CLI ships skill-with-starter pack resolution:

```bash
npx @open-press/cli init my-cards \
  --pack github:quan0715/openpress-social-card-skill/social-card
```

This is being implemented on the OpenPress side in parallel. Until both sides are green, the starter can be validated by manually copying `skills/social-card/starter/document/` into a scratch OpenPress workspace.

## License

MIT — see [LICENSE](LICENSE). License covers only code written in this repository; derived material retains its original license.
