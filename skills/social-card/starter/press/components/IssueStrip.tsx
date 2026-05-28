import type { ReactNode } from "react";

export interface IssueStripProps {
  /** Left slot — typically category or section label. */
  left: ReactNode;
  /** Middle slot — typically date or part marker. Optional. */
  middle?: ReactNode;
  /** Right slot — typically page number, count, or attribution. Optional. */
  right?: ReactNode;
  /** Render as the top strip (border below) instead of bottom (border above). */
  position?: "top" | "bottom";
}

/**
 * Magazine-style runner strip with up to three slots, separated by a
 * hairline rule. Used at the top or bottom of editorial pages to anchor
 * the issue identity. Keep all three slots short — they're labels, not
 * sentences.
 */
export default function IssueStrip({
  left,
  middle,
  right,
  position = "bottom",
}: IssueStripProps) {
  const className =
    position === "top"
      ? "social-card-issue-strip social-card-issue-strip--top"
      : "social-card-issue-strip";
  return (
    <div className={className} data-component="issue-strip">
      <div>{left}</div>
      <div className="social-card-issue-strip__middle">{middle ?? null}</div>
      <div className="social-card-issue-strip__right">{right ?? null}</div>
    </div>
  );
}
