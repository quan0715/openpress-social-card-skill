import type { ReactNode } from "react";

export interface EditorialCoverProps {
  /** Small uppercase tag above the title. Series, category, or runner. */
  kicker?: string;
  /** Display headline. Serif. 2–4 lines. */
  title: string;
  /** Optional subhead in serif italic. One short sentence. */
  subtitle?: string;
  /** Optional cover photo / illustration. Occupies the central well. */
  image?: {
    src: string;
    alt: string;
  };
  /** Optional anchor — a big number plus 1–3 short labels. */
  anchor?: {
    number: string;
    label: string;
    caption?: string;
  };
  /** Render an ink-wash atmosphere layer behind the page chrome. */
  inkWash?: boolean;
  /** Custom children rendered between the title and the anchor. */
  children?: ReactNode;
}

/**
 * Magazine issue cover (M01 family). Best for page 1 of a carousel.
 * Title is the visual anchor; the optional photo and number anchor are
 * supporting devices. Don't pack five bullets into the body — that's
 * EditorialTallLedger's territory.
 */
export default function EditorialCover({
  kicker,
  title,
  subtitle,
  image,
  anchor,
  inkWash,
  children,
}: EditorialCoverProps) {
  return (
    <section
      className={`editorial-cover${inkWash ? " with-ink-wash" : ""}`}
      data-layout="editorial-cover"
    >
      <header>
        {kicker ? <div className="social-card-kicker">{kicker}</div> : null}
      </header>

      <div>
        <h1 className="editorial-cover__title">{title}</h1>
        {subtitle ? <p className="editorial-cover__subtitle">{subtitle}</p> : null}
      </div>

      {image ? (
        <figure className="editorial-cover__well">
          <img src={image.src} alt={image.alt} />
        </figure>
      ) : children ? (
        <div>{children}</div>
      ) : (
        <div />
      )}

      {anchor ? (
        <footer className="editorial-cover__anchor">
          <div className="editorial-cover__anchor-number">{anchor.number}</div>
          <div className="editorial-cover__anchor-meta">
            <strong>{anchor.label}</strong>
            {anchor.caption ? <span>{anchor.caption}</span> : null}
          </div>
        </footer>
      ) : null}
    </section>
  );
}
