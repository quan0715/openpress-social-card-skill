# Theme presets

One theme per project. Mixing palettes across pages is an anti-pattern unless the user explicitly asks for a multi-chapter system.

Themes switch via the `data-theme` attribute on a parent element (typically the workspace `<Workspace>` or per-frame). The default — no attribute — is `ink-classic`.

## Editorial palettes (6)

The Editorial palettes are paper-and-ink stances. Five are light; one — Midnight Ink — is the only sanctioned dark variant.

### Ink Classic (default)

For business commentary, AI essays, product thinking, neutral editorial posts.

```
paper        #f3f0e8
paper-2      #ebe6da
ink          #0a0a0b
muted        #68625a
line         rgba(10, 10, 11, 0.22)
accent       #111111
accent-soft  #d8d2c6
```

### Indigo Porcelain

For technology, research, data, AI infrastructure, calm analytical writing.

```
paper        #f2f4f5
paper-2      #e5ebef
ink          #0a1f3d
muted        #5f6d78
line         rgba(10, 31, 61, 0.20)
accent       #315d93
accent-soft  #d7e1ec
```

### Forest Ink

For hiking, outdoor, nature, sustainability, field notes, grounded lifestyle posts.

```
paper        #f5f1e8
paper-2      #e8dfcf
ink          #16251b
muted        #5d665d
line         rgba(22, 37, 27, 0.22)
accent       #2e6b4f
accent-soft  #d4dfd2
```

### Kraft Paper

For memory, craft, personal essays, old objects, creator notes, warm low-tech topics.

```
paper        #eedfc7
paper-2      #dfc9a8
ink          #2a1e13
muted        #755f49
line         rgba(42, 30, 19, 0.24)
accent       #9b5a2e
accent-soft  #d5b58f
```

### Dune

For design, object studies, portfolio-like covers, gallery tone, restrained aesthetics.

```
paper        #f0e6d2
paper-2      #ded0b7
ink          #1f1a14
muted        #6f6557
line         rgba(31, 26, 20, 0.22)
accent       #8f7650
accent-soft  #d4c2a4
```

### Midnight Ink (dark)

The **only** sanctioned dark Editorial palette. Reserved for content whose source imagery is already dark — game art, night photography, cinematic covers, dark cultural pieces. Do not improvise other dark palettes; if Midnight Ink doesn't fit, pick a different mode (Editorial dark is not a universal switch).

```
paper        #0e0d0c
paper-2      #1a1714
ink          #ece2cf
muted        #9a8c75
line         rgba(236, 226, 207, 0.22)
accent       #d4a04a
accent-soft  #3a2a14
```

Midnight Ink also overrides the paper grain — opacity drops to 0.28 and blend mode switches to `screen`. Don't stack opaque card fills on top; dark Editorial relies on photo bleeds and warm gilt accent for hierarchy, not background blocks.

## Swiss palettes (2)

The Swiss palettes pair a flat off-white surface with one high-saturation accent. Paper grain is disabled (opacity 0) — flat surfaces are part of the Swiss system.

### IKB Blue

Default Swiss palette. For AI, technology, product updates, design, engineering.

```
paper        #fafaf8
paper-2      #f0f0ee
ink          #0a0a0a
muted        #737373
line         rgba(10, 10, 10, 0.20)
accent       #002fa7
accent-soft  #d6dffb
```

### Cinnabar

For announcements, launches, campaign moments — higher-energy Swiss.

```
paper        #fafaf8
paper-2      #f0f0ee
ink          #0a0a0a
muted        #737373
line         rgba(10, 10, 10, 0.20)
accent       #d4391c
accent-soft  #f8d6cc
```

## Custom palettes

To add a brand-specific palette, define a `[data-theme="<name>"]` rule in `press/theme/tokens.css` and override the seven palette tokens (`document` / `paper-2` / `ink` / `muted` / `line` / `accent` / `accent-soft`). For Swiss-style palettes, also set `--social-card-grain-opacity: 0`.

Do not invent palette tokens outside this set — components consume the same seven names regardless of theme.
