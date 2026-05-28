import type { ReactNode } from "react";

export interface PosterProps {
  platform?: "ig" | "fb" | "threads";
  theme?: "editorial" | "swiss";
  children: ReactNode;
}

/**
 * Page-level wrapper that tags the card with its target platform and chosen
 * visual system. Used as a data hook for the validator and as a styling
 * scope when a layout needs platform-aware tweaks.
 *
 * Most cards do not need <Poster> directly — the layout components carry
 * their own classes. Reach for it when you need to mark per-platform variants
 * inside one workspace (e.g. an IG-only crop vs a Threads-only crop). Mixed
 * geometries across platforms (square, link preview) wait on per-frame
 * geometry — see NOTES.md GAP-3.
 */
export default function Poster({ platform = "ig", theme = "editorial", children }: PosterProps) {
  return (
    <div
      className={`openpress-poster openpress-poster--${platform} openpress-poster--${theme}`}
      data-platform={platform}
      data-theme={theme}
    >
      {children}
    </div>
  );
}
