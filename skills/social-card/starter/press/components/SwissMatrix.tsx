export interface SwissMatrixCell {
  /** Cell index — "01", "02", … */
  index: string;
  /** Short Chinese phrase or short English title. */
  title: string;
  /** Single this cell out as the most important capability. At most one
   * cell per matrix carries this flag — two breaks the rhythm. */
  accent?: boolean;
}

export interface SwissMatrixHeroStat {
  /** Small accent-coloured kicker on the left. */
  kicker: string;
  /** One short sentence below the kicker. */
  sentence: string;
  /** Hero number on the right. **Must agree** with the matrix's cell
   * count (e.g. `"12"` if 12 cells). */
  number: string;
}

export interface SwissMatrixProps {
  /** Optional kicker. */
  kicker?: string;
  /** Page title — what the matrix enumerates. */
  title: string;
  /** 8 cells on 1080×1440 (renders 2 columns × 4 rows). */
  cells: SwissMatrixCell[];
  /** Bottom hero-stat row that summarizes the matrix's total. */
  heroStat: SwissMatrixHeroStat;
}

/**
 * Swiss matrix + hero stat (S12 family). Best for capability matrices,
 * agent inventories, "this set covers X domains" pages where 8 small
 * cells back a single bottom-line number.
 *
 * Hard rule: the `heroStat.number` must match the cell count. If you
 * have 8 cells, the hero stat reads `"8"`. Displaying a number
 * unsupported by the grid is the most common identity failure for
 * this recipe.
 */
export default function SwissMatrix({
  kicker,
  title,
  cells,
  heroStat,
}: SwissMatrixProps) {
  const visibleCells = cells.slice(0, 8);
  return (
    <section className="swiss-matrix" data-layout="swiss-matrix" data-style="swiss">
      <header className="swiss-stack swiss-gap-5">
        {kicker ? <p className="swiss-t-cat">{kicker}</p> : null}
        <h2 className="swiss-h-xl">{title}</h2>
      </header>
      <div className="swiss-matrix__grid">
        {visibleCells.map((cell, i) => (
          <div
            key={i}
            className={`swiss-matrix__cell${cell.accent ? " swiss-matrix__cell--accent" : ""}`}
          >
            <div className="swiss-matrix__cell-num">{cell.index}</div>
            <div className="swiss-matrix__cell-title">{cell.title}</div>
          </div>
        ))}
      </div>
      <div className="swiss-matrix__hero-stat">
        <div className="swiss-matrix__hero-stat-left">
          <p className="swiss-t-cat">{heroStat.kicker}</p>
          <p className="swiss-lead">{heroStat.sentence}</p>
        </div>
        <p className="swiss-matrix__hero-stat-num">{heroStat.number}</p>
      </div>
    </section>
  );
}
