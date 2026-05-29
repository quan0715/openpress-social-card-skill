export interface SwissKPITowerColumn {
  /** Big stat number — "132K", "3.4M", "68%". */
  number: string;
  /** Mono uppercase label below the number. */
  label: string;
  /** Bar height in px. Encode the value's magnitude proportionally —
   * the largest stat gets the tallest bar (e.g. 320 px); never invent
   * heights that don't match the data. */
  heightPx: number;
  /** Drop the bar to neutral grey for a comparison baseline. Use at
   * most one muted column per tower. */
  muted?: boolean;
}

export interface SwissKPITowerProps {
  /** Optional kicker. */
  kicker?: string;
  /** Page title — what the data describes. */
  title: string;
  /** 4 columns. On 1080×1440 portrait the tower stays 4-wide if heights
   * are 160 – 320 px; switch to TallLedger if you only have 2 numbers. */
  columns: SwissKPITowerColumn[];
}

/**
 * Swiss KPI Tower (S09 family). Best for product-update pages,
 * release notes, traffic dashboards, growth posts — anywhere 3–4
 * numbers need to be compared at a glance.
 *
 * `heightPx` is a real height in pixels. Pick values that
 * proportionally encode the data: largest stat at ≈ 320 px, smallest
 * at ≈ 80 – 120 px. Inventing heights that don't match the data is
 * a hard violation of Swiss honesty.
 */
export default function SwissKPITower({ kicker, title, columns }: SwissKPITowerProps) {
  return (
    <section className="swiss-kpi-tower" data-layout="swiss-kpi-tower" data-style="swiss">
      <header className="swiss-stack swiss-gap-5">
        {kicker ? <p className="swiss-t-cat">{kicker}</p> : null}
        <h2 className="swiss-h-xl">{title}</h2>
      </header>
      <div className="swiss-kpi-tower__row">
        {columns.map((col, i) => (
          <div
            key={i}
            className={`swiss-kpi-tower__col${col.muted ? " swiss-kpi-tower__col--muted" : ""}`}
          >
            <div className="swiss-kpi-tower__num">{col.number}</div>
            <div className="swiss-kpi-tower__label">{col.label}</div>
            <div
              className="swiss-kpi-tower__bar"
              style={{ height: `${col.heightPx}px` }}
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
