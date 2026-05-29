export interface SwissPipelineStep {
  /** Short index — "01", "02", "03". */
  number: string;
  /** Mono uppercase label — the step's role. */
  label: string;
  /** Action verb — what happens in this step. */
  action: string;
  /** Consequence — what the next step receives. */
  consequence: string;
}

export interface SwissPipelineProps {
  /** Optional kicker. */
  kicker?: string;
  /** Page title — what the pipeline describes. */
  title: string;
  /** 3 steps (canonical) — source → render → share, or any 3-stage flow. */
  steps: SwissPipelineStep[];
}

/**
 * Swiss pipeline / architecture (S06 family). Best for workflows and
 * layered systems where each stage feeds the next.
 *
 * On 1080×1440 portrait the steps stack vertically as three rows;
 * on horizontal boards they read left-to-right as columns. The hairline
 * boxes + neutral grey fills carry the architectural identity.
 */
export default function SwissPipeline({ kicker, title, steps }: SwissPipelineProps) {
  return (
    <section className="swiss-pipeline" data-layout="swiss-pipeline" data-style="swiss">
      <header className="swiss-stack swiss-gap-5">
        {kicker ? <p className="swiss-t-cat">{kicker}</p> : null}
        <h2 className="swiss-h-xl">{title}</h2>
      </header>
      <div className="swiss-pipeline__steps">
        {steps.map((step, i) => (
          <div key={i} className="swiss-pipeline__step swiss-card-outlined">
            <div className="swiss-pipeline__step-number">{step.number}</div>
            <div className="swiss-pipeline__step-body">
              <div className="swiss-pipeline__step-label">{step.label}</div>
              <div className="swiss-pipeline__step-action">{step.action}</div>
              <div className="swiss-pipeline__step-consequence">{step.consequence}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
