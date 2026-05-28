import type { ReactNode } from "react";

export interface ScreenshotFrameProps {
  src: string;
  alt: string;
  /** Caption rendered below the screenshot. */
  caption?: ReactNode;
  /** Background tint behind the screenshot. Defaults to the page line color. */
  background?: string;
}

/**
 * Container for UI screenshots. Reserves enough breathing room around the
 * shot so small text in the UI stays readable at thumbnail size.
 */
export default function ScreenshotFrame({
  src,
  alt,
  caption,
  background,
}: ScreenshotFrameProps) {
  return (
    <figure
      className="openpress-screenshot-frame"
      style={{
        background: background ?? "var(--openpress-color-line)",
        padding: "32px",
        borderRadius: "12px",
        display: "grid",
        gap: "16px",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "contain",
          display: "block",
          borderRadius: "4px",
        }}
      />
      {caption ? (
        <figcaption className="openpress-source-credit">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
