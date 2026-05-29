export interface SwissLedgerRow {
  /** Short index — "01", "02", "03" — or a single big number that
   * encodes the row's magnitude. Renders large in the accent colour. */
  number: string;
  /** Short phrase. The takeaway in one breath. */
  phrase: string;
  /** Compressed explanation. One sentence in body weight. */
  explanation: string;
}

export interface SwissLedgerProps {
  /** Optional kicker — "Closing", "Summary", "Takeaways". */
  kicker?: string;
  /** Big thesis title. ≤ 2 lines at this size. */
  title: string;
  /** 3 ledger rows (canonical). 4 still works; 2 reads as thin and is a
   * smell — switch to SwissTwoSignals if you only have two points. */
  rows: SwissLedgerRow[];
  /** Background variant. "paper" (default) for inline closure. "ink"
   * creates a dark closure card filling the full page — the strongest
   * way to end a Swiss carousel. */
  variant?: "paper" | "ink";
}

/**
 * Swiss takeaway ledger (S07 family). Best for the final page of a
 * Swiss carousel.
 *
 * The mood should feel like a release note's bottom-line summary —
 * three quantified points, each with explanation. Not a sales banner.
 *
 * Don't ship 2 short rows here. Either expand to 3 with proper
 * explanations, or switch to SwissTwoSignals which is designed for
 * exactly two items.
 */
export default function SwissLedger({
  kicker,
  title,
  rows,
  variant = "paper",
}: SwissLedgerProps) {
  return (
    <section
      className={`swiss-ledger${variant === "ink" ? " swiss-ledger--ink" : ""}`}
      data-layout="swiss-ledger"
      data-style="swiss"
    >
      <header className="swiss-ledger__head">
        {kicker ? <p className="swiss-t-cat">{kicker}</p> : null}
        <h2 className="swiss-ledger__title">{title}</h2>
      </header>
      <div className="swiss-ledger__rows">
        {rows.map((row, i) => (
          <div key={i} className="swiss-ledger__row">
            <div className="swiss-ledger__row-num">{row.number}</div>
            <div className="swiss-ledger__row-body">
              <p className="swiss-ledger__row-phrase">{row.phrase}</p>
              <p className="swiss-ledger__row-explanation">{row.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
