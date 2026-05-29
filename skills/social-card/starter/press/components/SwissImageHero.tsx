export interface SwissImageHeroStat {
  /** Big number — "132K", "3.4×", "98%". */
  number: string;
  /** Mono uppercase label. */
  label: string;
}

export interface SwissImageHeroProps {
  /** Optional kicker shown above the image. */
  kicker?: string;
  /** Hero image. Treat as evidence; the image is the page's signal. */
  image: {
    src: string;
    alt: string;
    /** object-position. Defaults to "center". */
    position?: string;
  };
  /** Optional accent kicker inside the overlay block. */
  overlayKicker?: string;
  /** Display title in the overlay block. */
  title: string;
  /** 3 stats below the image. Each is a quantified anchor. */
  stats: SwissImageHeroStat[];
}

/**
 * Swiss image hero (S08 family, 3:4-adapted). Best for product
 * launches, release notes with one strong photo, hero shots that need
 * stat anchors below.
 *
 * The image fills the upper 3:2 area; an overlay block in the
 * lower-left carries the title; three stat blocks anchor the bottom.
 * Don't use this without a real photo — the image isn't decorative.
 */
export default function SwissImageHero({
  kicker,
  image,
  overlayKicker,
  title,
  stats,
}: SwissImageHeroProps) {
  return (
    <section className="swiss-image-hero" data-layout="swiss-image-hero" data-style="swiss">
      {kicker ? <p className="swiss-image-hero__kicker swiss-t-cat">{kicker}</p> : null}
      <div className="swiss-image-hero__media">
        <img
          src={image.src}
          alt={image.alt}
          style={{ objectPosition: image.position ?? "center" }}
        />
        <div className="swiss-image-hero__overlay">
          {overlayKicker ? (
            <p className="swiss-t-cat">{overlayKicker}</p>
          ) : null}
          <h2 className="swiss-h-statement">{title}</h2>
        </div>
      </div>
      <div className="swiss-image-hero__stats">
        {stats.slice(0, 3).map((stat, i) => (
          <div key={i} className="swiss-image-hero__stat">
            <div className="swiss-image-hero__stat-num">{stat.number}</div>
            <div className="swiss-image-hero__stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
