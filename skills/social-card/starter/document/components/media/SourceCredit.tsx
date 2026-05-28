import type { ReactNode } from "react";

export interface SourceCreditProps {
  children: ReactNode;
  href?: string;
}

/**
 * Tiny provenance label. Renders inline-block so it can sit alongside an
 * image caption or pin to the corner of a media block.
 */
export default function SourceCredit({ children, href }: SourceCreditProps) {
  const content = (
    <span className="openpress-source-credit" data-component="source-credit">
      {children}
    </span>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" style={{ textDecoration: "none" }}>
        {content}
      </a>
    );
  }
  return content;
}
