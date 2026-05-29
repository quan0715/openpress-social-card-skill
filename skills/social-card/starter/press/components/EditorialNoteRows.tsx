export interface EditorialNoteRow {
  /** Short row marker. Defaults to 1-based numbering. */
  no?: string;
  /** One observation sentence. */
  text: string;
}

export interface EditorialNoteRowsProps {
  /** Mono runner above the title. */
  kicker?: string;
  /** Serif title. */
  title: string;
  /** 3-5 horizontal note rows. */
  rows: EditorialNoteRow[];
  /** Optional closing note below the rows. */
  note?: string;
}

/**
 * Horizontal note rows (M03 family). This is the denser social-card
 * version of an editorial essay: title first, then numbered rows across
 * the full width. Use this before reaching for a two-column essay when
 * the copy is already compact.
 */
export default function EditorialNoteRows({
  kicker,
  title,
  rows,
  note,
}: EditorialNoteRowsProps) {
  return (
    <section className="editorial-note-rows" data-layout="editorial-note-rows">
      <header className="editorial-note-rows__head">
        {kicker ? <div className="social-card-kicker">{kicker}</div> : null}
        <h2 className="editorial-note-rows__title">{title}</h2>
      </header>
      <div className="editorial-note-rows__rows">
        {rows.map((row, i) => (
          <div className="editorial-note-rows__row" key={i}>
            <div className="editorial-note-rows__no">{row.no ?? `${i + 1}`}</div>
            <div className="editorial-note-rows__text">{row.text}</div>
          </div>
        ))}
      </div>
      {note ? <p className="editorial-note-rows__note">{note}</p> : null}
    </section>
  );
}
