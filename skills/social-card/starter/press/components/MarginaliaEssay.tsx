export interface MarginaliaNote {
  /** The marginal label — a keyword, term, or page reference. */
  keyword: string;
  /** Optional gloss / fragment / short explanation below the keyword. */
  note?: string;
}

export interface MarginaliaEssayProps {
  /** Optional kicker above the title. */
  kicker?: string;
  /** Wide editorial title spanning the full width above both columns. */
  title: string;
  /** Main column — 2–3 short paragraphs. */
  paragraphs: string[];
  /** Marginal column — keywords, quote fragments, page references,
   * inline definitions. Renders as a narrow column with a hairline
   * vertical rule separating it from the main column. */
  marginalia: MarginaliaNote[];
}

/**
 * Marginalia essay card (M11 family). Three-column layout: title spans
 * full width, main column carries paragraphs, narrow marginal column
 * carries keywords / fragments / page references. Hairline vertical
 * rule between columns.
 *
 * Use when EditorialEssaySplit feels too empty but a TallLedger would
 * feel too mechanical. This is the recipe that gives the carousel a
 * real magazine reading rhythm.
 *
 * The marginal column is **not** decoration — every entry should carry
 * meaning (a term that needs a gloss, a quote fragment that supports
 * the main paragraph, a page reference, an inline definition). If you
 * can't fill it with meaningful content, drop the margin and switch to
 * EditorialEssaySplit.
 */
export default function MarginaliaEssay({
  kicker,
  title,
  paragraphs,
  marginalia,
}: MarginaliaEssayProps) {
  return (
    <section
      className="editorial-marginalia-essay"
      data-layout="editorial-marginalia-essay"
    >
      <header className="editorial-marginalia-essay__head">
        {kicker ? <div className="social-card-kicker">{kicker}</div> : null}
        <h2 className="editorial-marginalia-essay__title">{title}</h2>
      </header>
      <div className="editorial-marginalia-essay__main">
        {paragraphs.map((p, i) => (
          <p key={i} className="editorial-marginalia-essay__paragraph">
            {p}
          </p>
        ))}
      </div>
      <aside className="editorial-marginalia-essay__margin">
        {marginalia.map((m, i) => (
          <div key={i} className="editorial-marginalia-essay__note">
            <div className="editorial-marginalia-essay__keyword">{m.keyword}</div>
            {m.note ? (
              <div className="editorial-marginalia-essay__gloss">{m.note}</div>
            ) : null}
          </div>
        ))}
      </aside>
    </section>
  );
}
