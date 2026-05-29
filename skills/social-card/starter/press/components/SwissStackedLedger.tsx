import type { ReactNode } from "react";

export interface SwissStackedLedgerRow {
  /** Big number — currency amount, count, percentage. */
  number: string;
  /** Primary label. Plain text. */
  label: string;
  /** Optional secondary sub-line — additional context in muted body. */
  sub?: string;
  /** Optional icon node. Pass an `<svg>` or any inline element. The
   * recipe doesn't bring an icon library — supply what you have. */
  icon?: ReactNode;
}

export interface SwissStackedLedgerProps {
  /** Optional kicker. */
  kicker?: string;
  /** Page title — what's being rolled up. */
  title: string;
  /** 4–6 rows on 1080×1440. Each row is a big-number + label combo. */
  rows: SwissStackedLedgerRow[];
}

/**
 * Swiss stacked ledger (S11 family). Best for shopping lists,
 * expense rollups, agent capability inventories, or any "big number
 * + label + (optional icon)" row stack where each item is quantified.
 *
 * Hard requirement: real numerical evidence per row. If you cannot
 * produce a number for an item, switch to `SwissTrapRows` or
 * `TallLedger` — this recipe is specifically for quantified stacks.
 */
export default function SwissStackedLedger({
  kicker,
  title,
  rows,
}: SwissStackedLedgerProps) {
  return (
    <section
      className="swiss-stacked-ledger"
      data-layout="swiss-stacked-ledger"
      data-style="swiss"
    >
      <header className="swiss-stack swiss-gap-5">
        {kicker ? <p className="swiss-t-cat">{kicker}</p> : null}
        <h2 className="swiss-h-xl">{title}</h2>
      </header>
      <div className="swiss-stacked-ledger__rows">
        {rows.slice(0, 6).map((row, i) => (
          <div key={i} className="swiss-stacked-ledger__row">
            <div className="swiss-stacked-ledger__num">{row.number}</div>
            <div className="swiss-stacked-ledger__label">
              <span className="swiss-stacked-ledger__label-main">{row.label}</span>
              {row.sub ? (
                <span className="swiss-stacked-ledger__label-sub">{row.sub}</span>
              ) : null}
            </div>
            {row.icon ? (
              <div className="swiss-stacked-ledger__icon" aria-hidden="true">
                {row.icon}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
