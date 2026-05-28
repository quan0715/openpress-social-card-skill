export interface PullQuoteProps {
  /** Optional kicker — chapter, date stamp, or part marker. Required
   * if you want the page to read as anchored — without one, the empty
   * top edge reads as a missing slot. */
  kicker?: string;
  /** The quote itself. Plain string, no inline JSX. 2–4 visual lines. */
  quote: string;
  /** Source attribution (who said it / where it's from). Required —
   * this is the anchor point that justifies the whitespace around the
   * quote. */
  source: string;
  /** Optional context — page, edition, year. Shown next to source. */
  context?: string;
}

/**
 * Pull-quote thesis card (M04 family). This is the one recipe where
 * dense content is wrong — the quote needs whitespace to breathe. But
 * the page still needs anchor points to keep whitespace from reading
 * as a missing slot:
 *
 * - a kicker at top (chapter, date stamp, or part marker),
 * - the source row at the bottom,
 * - a hairline rule above the source.
 *
 * If you can't supply at least the kicker and the source, switch to
 * EditorialCover — empty space with no anchor reads as broken layout.
 */
export default function PullQuote({ kicker, quote, source, context }: PullQuoteProps) {
  return (
    <section className="editorial-pull-quote" data-layout="editorial-pull-quote">
      {kicker ? <div className="social-card-kicker social-card-kicker--accent">{kicker}</div> : null}
      <blockquote className="editorial-pull-quote__quote">{quote}</blockquote>
      <footer className="editorial-pull-quote__source">
        <strong>{source}</strong>
        {context ? <span>{context}</span> : null}
      </footer>
    </section>
  );
}
