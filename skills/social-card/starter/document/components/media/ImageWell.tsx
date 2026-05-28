import type { CSSProperties } from "react";

export interface ImageWellProps {
  src: string;
  alt: string;
  /** Aspect ratio expressed as "w / h", e.g. "4 / 3". Defaults to natural. */
  aspectRatio?: string;
  /** object-fit policy. Default "cover" — switch to "contain" for logos / UI shots. */
  fit?: "cover" | "contain";
  /** object-position, e.g. "center", "top left". */
  position?: string;
  className?: string;
}

export default function ImageWell({
  src,
  alt,
  aspectRatio,
  fit = "cover",
  position = "center",
  className,
}: ImageWellProps) {
  const style: CSSProperties = {
    aspectRatio,
  };
  return (
    <div
      className={["openpress-image-well", className].filter(Boolean).join(" ")}
      style={style}
    >
      <img
        src={src}
        alt={alt}
        style={{ objectFit: fit, objectPosition: position }}
      />
    </div>
  );
}
