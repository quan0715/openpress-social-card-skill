import type { ReactNode } from "react";

export interface EditorialCoverProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  anchorNumber?: string;
  anchorLabel?: string;
  anchorCaption?: string;
  children?: ReactNode;
}

export default function EditorialCover({
  eyebrow,
  title,
  subtitle,
  anchorNumber,
  anchorLabel,
  anchorCaption,
  children,
}: EditorialCoverProps) {
  return (
    <section className="editorial-cover" data-layout="editorial-cover">
      <header>
        {eyebrow ? <div className="editorial-cover__eyebrow">{eyebrow}</div> : null}
        <h1 className="editorial-cover__title">{title}</h1>
        {subtitle ? <p className="editorial-cover__subtitle">{subtitle}</p> : null}
      </header>

      <div>{children}</div>

      {anchorNumber || anchorLabel || anchorCaption ? (
        <footer className="editorial-cover__anchor">
          {anchorNumber ? (
            <div className="editorial-cover__anchor-number">{anchorNumber}</div>
          ) : null}
          {anchorLabel ? (
            <div className="editorial-cover__anchor-label">{anchorLabel}</div>
          ) : null}
          {anchorCaption ? (
            <div className="editorial-cover__anchor-caption">{anchorCaption}</div>
          ) : null}
        </footer>
      ) : null}
    </section>
  );
}
