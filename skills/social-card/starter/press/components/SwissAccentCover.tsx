import type { ReactNode } from "react";

export interface SwissAccentCoverProps {
  /** Small uppercase accent-coloured tag at top. Keep ≤ 12 chars. */
  kicker?: string;
  /** Big light-weight title. Use 1–2 lines on 1080×1440. */
  title: string;
  /** Optional short subtitle / lead. Plain text, no inline JSX. */
  subtitle?: string;
  /** Background variant. Default "paper" (off-white). "accent" fills the
   * whole page with the palette accent; "ink" inverts to dark. */
  background?: "paper" | "accent" | "ink";
  /** Decorative mat layer behind the content. Default "dot"; set "none"
   * for a fully flat cover, "ring" / "cross" for variants. */
  mat?: "dot" | "ring" | "cross" | "none";
  /** Optional abstract diagram, system block, or two-node comparison.
   * Render as plain children — pass `<div>` with whatever Swiss
   * primitives the page needs. */
  diagram?: ReactNode;
  /** Optional bottom mono metadata row. */
  footer?: {
    left: string;
    right?: string;
  };
}

/**
 * Swiss accent cover (S01 family). Best for Swiss carousel covers and
 * single high-impact statement pages.
 *
 * The recipe carries one clear concept. Don't pack two ideas — if the
 * cover needs comparison, switch to SwissTwoSignals; if it needs data,
 * switch to a file card or KPI tower in v2.
 */
export default function SwissAccentCover({
  kicker,
  title,
  subtitle,
  background = "paper",
  mat = "dot",
  diagram,
  footer,
}: SwissAccentCoverProps) {
  const classes = [
    "swiss-accent-cover",
    background === "accent" ? "swiss-accent-cover--accent" : null,
    background === "ink" ? "swiss-accent-cover--ink" : null,
  ]
    .filter(Boolean)
    .join(" ");

  const matClass =
    mat === "dot"
      ? "swiss-dot-mat"
      : mat === "ring"
      ? "swiss-ring-mat"
      : mat === "cross"
      ? "swiss-cross-mat"
      : null;

  return (
    <section className={classes} data-layout="swiss-accent-cover" data-style="swiss">
      {matClass ? <div className={matClass} aria-hidden="true" /> : null}
      <header className="swiss-stack swiss-gap-5">
        {kicker ? <p className="swiss-t-cat">{kicker}</p> : null}
      </header>
      <div className="swiss-accent-cover__body">
        <h1 className="swiss-h-xl">{title}</h1>
        {subtitle ? <p className="swiss-lead">{subtitle}</p> : null}
        {diagram ? <div className="swiss-accent-cover__diagram">{diagram}</div> : null}
      </div>
      {footer ? (
        <footer className="swiss-accent-cover__foot">
          <span>{footer.left}</span>
          {footer.right ? <span>{footer.right}</span> : <span />}
        </footer>
      ) : null}
    </section>
  );
}
