import type { ReactNode } from "react";
import IssueStrip from "./IssueStrip";

export interface PageChromeStrip {
  left: ReactNode;
  middle?: ReactNode;
  right?: ReactNode;
}

export interface PageChromeProps {
  /** Fixed top runner, outside the recipe's content flow. */
  top?: PageChromeStrip;
  /** Fixed bottom issue strip, outside the recipe's content flow. */
  bottom?: PageChromeStrip;
  /** One recipe component. */
  children: ReactNode;
}

/**
 * Fixed page chrome for social cards. Header and footer live on stable
 * page axes; recipes render inside the reserved content zone so longer
 * copy cannot push metadata around.
 */
export default function PageChrome({ top, bottom, children }: PageChromeProps) {
  return (
    <section className="social-card-page-chrome" data-component="page-chrome">
      {top ? <IssueStrip position="top" {...top} /> : null}
      <div className="social-card-page-chrome__content">{children}</div>
      {bottom ? <IssueStrip position="bottom" {...bottom} /> : null}
    </section>
  );
}
