export interface EditorialEssaySplitProps {
  /** Optional kicker above the title. */
  kicker?: string;
  /** Left-column title or pull. Display serif. */
  title: string;
  /** 2–3 short paragraphs OR numbered fragments. Right column. Plain
   * strings only — no inline JSX. */
  paragraphs: string[];
  /** Render the right column as a numbered list instead of paragraphs. */
  numbered?: boolean;
  /** Optional bottom note spanning both columns. Anchors the lower canvas. */
  note?: string;
}

/**
 * Two-column essay split (M03 family). Best for explaining one idea
 * with nuance: left side carries the title or pull, right side carries
 * 2–3 short paragraphs (or numbered fragments). Thin rule between.
 *
 * Keep paragraphs short — if the right column becomes dense, split into
 * two pages or switch to MarginaliaEssay (which adds a margin column
 * for keywords / fragments without crowding the main column).
 *
 * Minimum content: title + 3 short paragraphs OR title + 2 paragraphs
 * + numbered footer list. Title alone is PullQuote, not this.
 */
export default function EditorialEssaySplit({
  kicker,
  title,
  paragraphs,
  numbered,
  note,
}: EditorialEssaySplitProps) {
  return (
    <section className="editorial-essay-split" data-layout="editorial-essay-split">
      <div className="editorial-essay-split__left">
        {kicker ? <div className="social-card-kicker">{kicker}</div> : null}
        <h2 className="editorial-essay-split__title">{title}</h2>
      </div>
      <div className="editorial-essay-split__rule" aria-hidden="true" />
      <div className="editorial-essay-split__right">
        {numbered ? (
          <ol className="editorial-essay-split__numbered">
            {paragraphs.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ol>
        ) : (
          paragraphs.map((p, i) => (
            <p key={i} className="editorial-essay-split__paragraph">
              {p}
            </p>
          ))
        )}
      </div>
      {note ? <p className="editorial-essay-split__note">{note}</p> : null}
    </section>
  );
}
