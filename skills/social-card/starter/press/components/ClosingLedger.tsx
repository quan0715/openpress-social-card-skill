import type { ReactNode } from "react";

export interface ClosingLedgerRow {
  /** Title line — serif, medium. */
  title: string;
  /** Sub-line — body serif at smaller size. Used as consequence, reason,
   * or example. Required: a bare title list is too thin to fill a
   * closing card. */
  sub: string;
}

export interface ClosingLedgerProps {
  /** Optional kicker — "closing" / "wrap" / "summary". */
  kicker?: string;
  /** Big takeaway title for the closing page. ≤ 2 lines. */
  title: string;
  /** 4–6 ledger rows. Fewer than 4 under-fills 1080×1350; in that case
   * either expand each row or switch to PullQuote. */
  rows: ClosingLedgerRow[];
  /** Closing block: pull-quote, signature line, or CTA. One is
   * required — without one the page ends abruptly. */
  closing: {
    quote?: string;
    signature?: ReactNode;
  };
}

/**
 * Closing note card (M07 family). Use for the final page of a carousel.
 * The structure is a heavy ledger (4–6 rows with sub-lines) plus a
 * closing block. The mood should feel like the end of a magazine
 * feature — not a sales banner.
 *
 * 3 short rows on 1080×1350 is a failure mode. Either expand or switch
 * to PullQuote for the closing.
 */
export default function ClosingLedger({
  kicker,
  title,
  rows,
  closing,
}: ClosingLedgerProps) {
  return (
    <section className="editorial-closing-ledger" data-layout="editorial-closing-ledger">
      {kicker ? <div className="social-card-kicker">{kicker}</div> : null}
      <h2 className="editorial-closing-ledger__title">{title}</h2>
      <div className="editorial-closing-ledger__rows">
        {rows.map((row, i) => (
          <div key={i} className="editorial-closing-ledger__row">
            <div className="editorial-closing-ledger__row-title">{row.title}</div>
            <div className="editorial-closing-ledger__row-sub">{row.sub}</div>
          </div>
        ))}
      </div>
      <footer className="editorial-closing-ledger__closing">
        {closing.quote ? (
          <p className="editorial-closing-ledger__closing-quote">{closing.quote}</p>
        ) : (
          <span />
        )}
        {closing.signature ? (
          <div className="editorial-closing-ledger__signature">{closing.signature}</div>
        ) : null}
      </footer>
    </section>
  );
}
