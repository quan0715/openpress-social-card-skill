import type { ReactNode } from "react";

export interface SwissStatementProps {
  eyebrow?: string;
  /**
   * The statement, one entry per visual line. Plain strings only — no inline
   * JSX. If accent emphasis is needed, restructure into a different layout
   * rather than embedding markup here.
   */
  lines: string[];
  cta?: ReactNode;
  meta?: ReactNode;
}

export default function SwissStatement({ eyebrow, lines, cta, meta }: SwissStatementProps) {
  return (
    <section className="swiss-statement" data-layout="swiss-statement">
      {eyebrow ? <div className="swiss-statement__eyebrow">{eyebrow}</div> : null}
      <h1 className="swiss-statement__display">
        {lines.map((line, i) => (
          <span key={i} className="swiss-statement__line">
            {line}
          </span>
        ))}
      </h1>
      {cta || meta ? (
        <footer className="swiss-statement__cta">
          {cta ? <div>{cta}</div> : null}
          {meta ? <div style={{ textAlign: "right" }}>{meta}</div> : null}
        </footer>
      ) : null}
    </section>
  );
}
