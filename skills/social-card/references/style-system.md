# Style system

Two visual stances ship in v1. Pick one per project. Mixing them in the same
carousel is a non-negotiable per `SKILL.md` § Non-negotiables.

## Editorial — quiet, paper-like, serif-led

**Use when:** the content is long-form (essay, research summary, opinion),
the voice is calm or reflective, and the audience expects to read rather
than scroll past.

- **Type pairing**: serif display (`--openpress-font-serif`) for titles
  and anchor numbers; sans body (`--openpress-font-body`) for eyebrows,
  bullets, captions.
- **Color**: warm paper (`--openpress-color-document` ≈ off-white), dark
  ink, single warm accent (`--openpress-accent`) used sparingly — typically
  on the anchor number, the bullet marker, or one inline emphasis.
- **Rhythm**: title large, generous whitespace, one strong visual anchor
  (number, image, or pull quote) per card.
- **Don't**: stack three accent colors. Use multiple display weights. Crowd
  the bottom margin.

Layouts shipped: `EditorialCover`, `EditorialEvidence`.

## Swiss — graphic, sans, chunky

**Use when:** the content is a statement, a stat, a campaign slogan, a
launch CTA. The audience scrolls fast and needs the message in one beat.

- **Type pairing**: heavy sans display (`--openpress-font-body` at heavy
  weight) for the statement; same family at smaller sizes everywhere else.
- **Color**: same paper + ink as Editorial, but the accent is louder —
  used for the eyebrow, the inline `<em>` emphasis, and the underline rule.
- **Rhythm**: huge display headline, near-edge alignment, no decorative
  whitespace. Bottom rule + CTA grid grounds the page.
- **Don't**: switch to a serif. Use thin weights. Center-align long text.

Layouts shipped: `SwissStatement`.

## Where the tokens live

`document/theme/tokens.css` is the single source of truth. Override colors,
type sizes, and padding there — do not paste inline `style={}` into MDX or
layout components.

If a brand needs a token that does not yet exist, add it to `tokens.css`
with the `--social-card-` prefix and update the layout CSS in
`document/theme/social-card.css`. Do not invent ad-hoc variables inside
component files.
