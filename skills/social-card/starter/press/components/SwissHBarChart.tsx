export interface SwissHBarChartRow {
  /** Item name — Chinese OK. Renders left of the bar on 3:4. */
  label: string;
  /** Display value — typically the percentage, e.g. "94%". */
  value: string;
  /** Bar fill percent 0–100. The widest row should be exactly 100 (or
   * normalized to it); never fabricate. */
  fillPercent: number;
}

export interface SwissHBarChartProps {
  /** Optional kicker. */
  kicker?: string;
  /** Page title — what the ranking is. */
  title: string;
  /** 5–6 rows recommended for 1080×1440. Max 6. Anything thinner reads
   * as a stat list; switch to KPITower for ≤ 4. */
  rows: SwissHBarChartRow[];
}

/**
 * Swiss horizontal bar chart (S10 family). Best for rankings,
 * comparisons of 5–6 items, "top N" lists, before/after pairs at scale.
 *
 * The bar fill encodes magnitude — the widest row should be exactly
 * the largest value (100 %) and all others proportional. Inventing
 * percentages or normalizing arbitrarily breaks Swiss honesty.
 */
export default function SwissHBarChart({ kicker, title, rows }: SwissHBarChartProps) {
  return (
    <section className="swiss-h-bar-chart" data-layout="swiss-h-bar-chart" data-style="swiss">
      <header className="swiss-stack swiss-gap-5">
        {kicker ? <p className="swiss-t-cat">{kicker}</p> : null}
        <h2 className="swiss-h-xl">{title}</h2>
      </header>
      <div className="swiss-h-bar-chart__rows">
        {rows.slice(0, 6).map((row, i) => (
          <div key={i} className="swiss-h-bar-chart__row">
            <div className="swiss-h-bar-chart__row-label">{row.label}</div>
            <div className="swiss-h-bar-chart__row-track">
              <div
                className="swiss-h-bar-chart__row-fill"
                style={{ width: `${Math.min(100, Math.max(0, row.fillPercent))}%` }}
                aria-hidden="true"
              />
            </div>
            <div className="swiss-h-bar-chart__row-value">{row.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
