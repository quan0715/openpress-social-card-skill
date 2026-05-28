import type { ReactNode } from "react";

export interface SwissStatementProps {
  eyebrow?: string;
  /**
   * The statement body. Wrap inline emphasis with <em> — the theme will
   * recolor it with the accent token.
   */
  children: ReactNode;
  cta?: ReactNode;
  meta?: ReactNode;
}

export default function SwissStatement({
  eyebrow,
  children,
  cta,
  meta,
}: SwissStatementProps) {
  return (
    <section className="swiss-statement" data-layout="swiss-statement">
      {eyebrow ? <div className="swiss-statement__eyebrow">{eyebrow}</div> : null}
      <h1 className="swiss-statement__display">{children}</h1>
      {cta || meta ? (
        <footer className="swiss-statement__cta">
          {cta ? <div>{cta}</div> : null}
          {meta ? <div style={{ textAlign: "right" }}>{meta}</div> : null}
        </footer>
      ) : null}
    </section>
  );
}
