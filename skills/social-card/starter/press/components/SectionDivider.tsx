export interface SectionDividerProps {
  /** Kicker — typically "Act II", "Part 2 of 3", "Section · Findings".
   * Required: the divider needs a runner label to read as a deliberate
   * beat, not a missing slot. */
  kicker: string;
  /** Section name. 3–6 Chinese characters or a short English phrase. */
  title: string;
  /** Short serif-italic subtitle. One sentence describing the section's
   * promise. */
  subtitle?: string;
  /** Optional bottom issue strip with section meta. */
  footer?: {
    left: string;
    middle?: string;
    right?: string;
  };
}

/**
 * Section divider card (M12 family). Drop one between act 1 and act 2
 * of a long carousel (7–9 pages) so the reader gets a beat of silence.
 * This is the recipe where atmospheric whitespace is the point — the
 * page is mostly grain and ink-wash with a small content block.
 *
 * Not a cover. Not a closing. Specifically a *mid-carousel breath*.
 * Don't open or close a carousel with this — readers expect the first
 * and last pages to carry the strongest content.
 *
 * The component sets the `with-ink-wash` modifier on the page chrome
 * by default — atmosphere is non-optional for this recipe.
 */
export default function SectionDivider({
  kicker,
  title,
  subtitle,
  footer,
}: SectionDividerProps) {
  return (
    <section
      className="editorial-section-divider with-ink-wash"
      data-layout="editorial-section-divider"
    >
      <div className="editorial-section-divider__body">
        <div className="social-card-kicker social-card-kicker--accent">
          {kicker}
        </div>
        <h1 className="editorial-section-divider__title">{title}</h1>
        {subtitle ? (
          <p className="editorial-section-divider__subtitle">{subtitle}</p>
        ) : null}
      </div>
      {footer ? (
        <footer className="editorial-section-divider__footer">
          <span>{footer.left}</span>
          <span className="editorial-section-divider__footer-middle">
            {footer.middle ?? ""}
          </span>
          <span className="editorial-section-divider__footer-right">
            {footer.right ?? ""}
          </span>
        </footer>
      ) : null}
    </section>
  );
}
