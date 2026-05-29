export interface SwissTwoSignalsSignal {
  /** Short uppercase label above the signal title. */
  label: string;
  /** The signal title — what option / source / direction this is. */
  title: string;
  /** Optional short body. Plain text, no inline JSX. */
  body?: string;
  /** Card fill variant. Mutually exclusive — pick one. Default "outlined". */
  variant?: "ink" | "outlined" | "accent" | "fill";
}

export interface SwissTwoSignalsProps {
  /** Optional kicker. */
  kicker?: string;
  /** Page title — what's being compared. */
  title: string;
  /** Exactly two signals. Mixing variants is encouraged — one ink + one
   * outlined creates the tension Swiss S02 calls for. */
  signals: [SwissTwoSignalsSignal, SwissTwoSignalsSignal];
}

const VARIANT_CLASS: Record<NonNullable<SwissTwoSignalsSignal["variant"]>, string> = {
  ink: "swiss-card-ink",
  outlined: "swiss-card-outlined",
  accent: "swiss-card-accent",
  fill: "swiss-card-fill",
};

/**
 * Swiss two-signal comparison (S02 family). Best for explaining two
 * sources, two options, or two product directions. The two cards do
 * the work; the page title introduces the question they answer.
 *
 * Anti-pattern: three signals. If you need three, switch to a
 * three-column ledger or split into two pages. The S02 layout depends
 * on the tension between exactly two cards.
 */
export default function SwissTwoSignals({ kicker, title, signals }: SwissTwoSignalsProps) {
  return (
    <section className="swiss-two-signals" data-layout="swiss-two-signals" data-style="swiss">
      <header className="swiss-two-signals__head">
        {kicker ? <p className="swiss-t-cat">{kicker}</p> : null}
        <h2 className="swiss-h-xl">{title}</h2>
      </header>
      <div className="swiss-two-signals__grid">
        {signals.map((signal, i) => (
          <article
            key={i}
            className={[
              "swiss-two-signals__signal",
              VARIANT_CLASS[signal.variant ?? "outlined"],
            ].join(" ")}
          >
            <span className="swiss-two-signals__signal-label">{signal.label}</span>
            <h3 className="swiss-two-signals__signal-title">{signal.title}</h3>
            {signal.body ? (
              <p className="swiss-two-signals__signal-body">{signal.body}</p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
