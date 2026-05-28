import type { ReactNode } from "react";

export interface KickerProps {
  children: ReactNode;
  /** Use the accent color instead of muted ink. */
  accent?: boolean;
  /** Override the rendered element. Defaults to <span>. */
  as?: "span" | "div" | "p";
}

/**
 * Small uppercase tag in mono. Used on covers, dividers, closings, and
 * section openers. Keep ≤ 12 characters — kickers should feel like
 * runner labels, not subheads.
 */
export default function Kicker({ children, accent, as: As = "span" }: KickerProps) {
  return (
    <As
      className={`social-card-kicker${accent ? " social-card-kicker--accent" : ""}`}
    >
      {children}
    </As>
  );
}
