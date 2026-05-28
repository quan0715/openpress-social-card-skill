export interface TallLedgerRow {
  /** Left-column index or marginalia. Short — "01", "ROLE", "PROS". */
  index: string;
  /** Right-column title. Serif, medium weight. */
  title: string;
  /** Right-column consequence / reason / explanation. Body serif. */
  consequence: string;
}

export interface TallLedgerProps {
  /** Optional kicker. */
  kicker?: string;
  /** Page title — what the ledger is enumerating. */
  title: string;
  /** 4–6 rows. Each row consumes 118–170 px on a 1080×1440 canvas; do
   * not let the ledger occupy only the middle third of the page. */
  rows: TallLedgerRow[];
}

/**
 * Tall ledger card (M08 family). Use for lists where a normal table
 * would feel too short: roles, pros/cons, gear items, product
 * capabilities, agent responsibilities. Each row is a meaningful
 * statement, not a single phrase.
 *
 * Anti-pattern: a 3-row ledger floating in the middle of a 1080×1440
 * canvas. If you only have 3 items, either expand each into title +
 * consequence + example, or switch to ClosingLedger which can wrap
 * with a quote / signature.
 */
export default function TallLedger({ kicker, title, rows }: TallLedgerProps) {
  return (
    <section className="editorial-tall-ledger" data-layout="editorial-tall-ledger">
      <div>
        {kicker ? <div className="social-card-kicker">{kicker}</div> : null}
        <h2 className="editorial-tall-ledger__title">{title}</h2>
      </div>
      <div className="editorial-tall-ledger__rows">
        {rows.map((row, i) => (
          <div key={i} className="editorial-tall-ledger__row">
            <div className="editorial-tall-ledger__row-index">{row.index}</div>
            <div className="editorial-tall-ledger__row-body">
              <div className="editorial-tall-ledger__row-title">{row.title}</div>
              <div className="editorial-tall-ledger__row-consequence">
                {row.consequence}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
