import type { ReactNode } from "react";

export interface SwissBrowserMockModule {
  label: string;
  body: string;
}

export interface SwissBrowserMockProps {
  /** Optional kicker. */
  kicker?: string;
  /** Page title above the browser mock. */
  title: string;
  /** Hero content inside the browser frame — typically a one-line statement
   * and an optional supporting sentence. */
  hero: {
    title: string;
    body?: string;
  };
  /** 2–3 functional modules below the hero. Each renders as a small card
   * with mono label + body. */
  modules?: SwissBrowserMockModule[];
  /** Optional bottom action strip text — a single CTA-style phrase. */
  action?: ReactNode;
}

/**
 * Swiss browser mock (S04 family). Best for explaining HTML / UI /
 * interaction / output-layer concepts inside a stylized browser frame.
 *
 * The browser chrome is pure CSS (no SVG) — a 3-dot title bar above
 * a hairline-bordered content area.
 */
export default function SwissBrowserMock({
  kicker,
  title,
  hero,
  modules,
  action,
}: SwissBrowserMockProps) {
  return (
    <section className="swiss-browser-mock" data-layout="swiss-browser-mock" data-style="swiss">
      <header className="swiss-stack swiss-gap-5">
        {kicker ? <p className="swiss-t-cat">{kicker}</p> : null}
        <h2 className="swiss-h-xl">{title}</h2>
      </header>
      <div className="swiss-browser-mock__frame swiss-device-browser">
        <div className="swiss-browser-mock__body">
          <div className="swiss-browser-mock__hero">
            <h3 className="swiss-h-md">{hero.title}</h3>
            {hero.body ? <p className="swiss-lead">{hero.body}</p> : null}
          </div>
          {modules && modules.length > 0 ? (
            <div className="swiss-browser-mock__modules">
              {modules.map((m, i) => (
                <div key={i} className="swiss-browser-mock__module swiss-card-fill">
                  <span className="swiss-t-meta">{m.label}</span>
                  <p className="swiss-body">{m.body}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {action ? (
        <footer className="swiss-browser-mock__action swiss-t-meta">{action}</footer>
      ) : null}
    </section>
  );
}
