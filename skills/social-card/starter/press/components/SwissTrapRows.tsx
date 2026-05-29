export interface SwissTrapRowsRow {
  /** Short mono uppercase label — the anti-pattern's name. */
  label: string;
  /** Consequence — what goes wrong if the trap is fallen into. */
  consequence: string;
}

export interface SwissTrapRowsProps {
  /** Optional kicker — typically "Anti-patterns", "Pitfalls", "Don't". */
  kicker?: string;
  /** Big warning title. */
  title: string;
  /** 3 trap rows. Two reads as thin; four crowds the page. */
  rows: SwissTrapRowsRow[];
}

/**
 * Swiss trap / warning rows (S05 family). Best for "do not do this"
 * pages, anti-pattern lists, and risk callouts.
 *
 * Safety Orange palette pairs naturally with this recipe, but any
 * Swiss accent works — the hairline rows and mono labels carry the
 * warning identity, not the colour alone.
 */
export default function SwissTrapRows({ kicker, title, rows }: SwissTrapRowsProps) {
  return (
    <section className="swiss-trap-rows" data-layout="swiss-trap-rows" data-style="swiss">
      <header className="swiss-stack swiss-gap-5">
        {kicker ? <p className="swiss-t-cat">{kicker}</p> : null}
        <h2 className="swiss-h-xl">{title}</h2>
      </header>
      <div className="swiss-trap-rows__rows">
        {rows.map((row, i) => (
          <div key={i} className="swiss-trap-rows__row">
            <span className="swiss-trap-rows__label">{row.label}</span>
            <p className="swiss-trap-rows__consequence">{row.consequence}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
