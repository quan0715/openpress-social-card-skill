import type { ReactNode } from "react";

export interface EvidenceFeatureProps {
  /** Optional kicker above the headline. */
  kicker?: string;
  /** Page headline. Serif, medium. */
  headline: string;
  /** Optional lead paragraph between headline and image. */
  lead?: string;
  /** The visual evidence. Photo, screenshot, or chart with text-light
   * composition. Must be large enough to inspect. */
  image: {
    src: string;
    alt: string;
    /** object-position. Defaults to "center". Set explicitly for face
     * or subject-led images per references/image-overlay.md. */
    position?: string;
  };
  /** 2–3 short takeaways below the image. Each ≤ 24 Chinese chars or
   * ≤ 80 Latin chars. */
  takeaways?: string[];
  /** Optional source credit — required for web-sourced images per
   * SOURCES.md. */
  sourceCredit?: ReactNode;
}

/**
 * Evidence feature card (M10 family). Use when the image is the proof,
 * not the decoration: large screenshots, photos with detail to inspect,
 * or charts. The image occupies 45–65 % of the vertical canvas; the
 * headline sits above; takeaways anchor the bottom.
 *
 * Don't use this recipe with a small logo or icon — the well will
 * letterbox and read as broken.
 */
export default function EvidenceFeature({
  kicker,
  headline,
  lead,
  image,
  takeaways,
  sourceCredit,
}: EvidenceFeatureProps) {
  return (
    <section className="editorial-evidence" data-layout="editorial-evidence">
      <header className="editorial-evidence__head">
        {kicker ? <div className="social-card-kicker">{kicker}</div> : null}
        <h2 className="editorial-evidence__headline">{headline}</h2>
        {lead ? <p className="editorial-evidence__lead">{lead}</p> : null}
      </header>

      <figure className="editorial-evidence__media">
        <img
          src={image.src}
          alt={image.alt}
          style={{ objectPosition: image.position ?? "center" }}
        />
      </figure>

      <div>
        {takeaways && takeaways.length > 0 ? (
          <div className="editorial-evidence__takeaways">
            {takeaways.map((t, i) => (
              <div key={i} className="editorial-evidence__takeaway">
                <div className="editorial-evidence__takeaway-index">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>{t}</div>
              </div>
            ))}
          </div>
        ) : null}
        {sourceCredit ? (
          <div className="openpress-source-credit" style={{ marginTop: 16 }}>
            {sourceCredit}
          </div>
        ) : null}
      </div>
    </section>
  );
}
