import type { ReactNode } from "react";

export interface EditorialEvidenceProps {
  imageSrc: string;
  imageAlt: string;
  imageCaption?: string;
  title: string;
  bullets: string[];
  sourceCredit?: ReactNode;
}

export default function EditorialEvidence({
  imageSrc,
  imageAlt,
  imageCaption,
  title,
  bullets,
  sourceCredit,
}: EditorialEvidenceProps) {
  return (
    <section className="editorial-evidence" data-layout="editorial-evidence">
      <figure className="editorial-evidence__media">
        <img src={imageSrc} alt={imageAlt} />
        {imageCaption ? (
          <figcaption className="openpress-source-credit">{imageCaption}</figcaption>
        ) : null}
      </figure>

      <div className="editorial-evidence__body">
        <h2 className="editorial-evidence__title">{title}</h2>
        <ul>
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
        {sourceCredit ? <div className="openpress-source-credit">{sourceCredit}</div> : null}
      </div>
    </section>
  );
}
