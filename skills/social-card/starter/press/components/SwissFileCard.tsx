export interface SwissFileCardProperty {
  /** Mono uppercase label — "FORMAT", "AUTHOR", "MODIFIED", "ROW COUNT". */
  label: string;
  /** Value. Plain text. */
  value: string;
}

export interface SwissFileCardProps {
  /** Optional kicker above the page title. */
  kicker?: string;
  /** Page title — what this card is about. */
  title: string;
  /** Mono uppercase file-type / object-kind tag inside the card. */
  fileType: string;
  /** The file name or object identifier. Renders large inside the card. */
  fileName: string;
  /** 3–4 properties shown as label/value rows. Mono labels, plain values. */
  properties: SwissFileCardProperty[];
  /** Card fill variant. Default "fill" (grey-1); "outlined" for a
   * lighter touch. */
  variant?: "fill" | "outlined";
}

const VARIANT_CLASS: Record<NonNullable<SwissFileCardProps["variant"]>, string> = {
  fill: "swiss-card-fill",
  outlined: "swiss-card-outlined",
};

/**
 * Swiss file / data card (S03 family). Best for Markdown, memory,
 * source-of-truth records, database schemas, or state — anywhere a
 * named object has a short property list.
 *
 * The fileType tag and the fileName form the visual anchor; the
 * properties anchor the body. Don't use this for free-form lists —
 * it's specifically for object-shaped data.
 */
export default function SwissFileCard({
  kicker,
  title,
  fileType,
  fileName,
  properties,
  variant = "fill",
}: SwissFileCardProps) {
  return (
    <section className="swiss-file-card" data-layout="swiss-file-card" data-style="swiss">
      <header className="swiss-file-card__head">
        {kicker ? <p className="swiss-t-cat">{kicker}</p> : null}
        <h2 className="swiss-h-xl">{title}</h2>
      </header>
      <div className={["swiss-file-card__card", VARIANT_CLASS[variant]].join(" ")}>
        <div className="swiss-file-card__type">{fileType}</div>
        <div className="swiss-file-card__name">{fileName}</div>
        <ul className="swiss-file-card__props">
          {properties.map((prop, i) => (
            <li key={i} className="swiss-file-card__prop">
              <span className="swiss-file-card__prop-label">{prop.label}</span>
              <span className="swiss-file-card__prop-value">{prop.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
