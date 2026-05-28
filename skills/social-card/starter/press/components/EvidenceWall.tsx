export interface EvidenceWallImage {
  src: string;
  alt: string;
  caption?: string;
  /** object-position. Defaults to "center". */
  position?: string;
}

export interface EvidenceWallProps {
  /** Optional kicker above the headline. */
  kicker?: string;
  /** One headline anchoring the interpretation of the whole wall. */
  headline: string;
  /** 4 images for 2×2, 6 for 3×2, or 3 for 3×1. Each should be readable
   * at the final rendered size. */
  images: EvidenceWallImage[];
  /** Grid shape. Defaults to "2x2". */
  layout?: "2x2" | "3-col" | "3x2";
}

/**
 * Evidence wall card (M06 family). Best for multiple screenshots,
 * references, or small images that are interpreted together. The
 * headline carries the interpretation; the grid carries the proof.
 *
 * Use only when supplied images are readable at the final tile size.
 * If a single image is the proof, switch to EvidenceFeature. If the
 * images are decorative, drop them entirely and use a typographic
 * recipe.
 */
export default function EvidenceWall({
  kicker,
  headline,
  images,
  layout = "2x2",
}: EvidenceWallProps) {
  return (
    <section
      className="editorial-evidence-wall"
      data-layout="editorial-evidence-wall"
      data-grid={layout}
    >
      <header className="editorial-evidence-wall__head">
        {kicker ? <div className="social-card-kicker">{kicker}</div> : null}
        <h2 className="editorial-evidence-wall__headline">{headline}</h2>
      </header>
      <div className="editorial-evidence-wall__grid">
        {images.map((img, i) => (
          <figure key={i} className="editorial-evidence-wall__tile">
            <div className="editorial-evidence-wall__well">
              <img
                src={img.src}
                alt={img.alt}
                style={{ objectPosition: img.position ?? "center" }}
              />
            </div>
            {img.caption ? (
              <figcaption className="editorial-evidence-wall__caption">
                {img.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </section>
  );
}
