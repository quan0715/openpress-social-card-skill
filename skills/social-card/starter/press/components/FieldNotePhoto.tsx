export interface FieldNotePhotoProps {
  /** Small uppercase observation label above the title. */
  kicker?: string;
  /** Documentary photo. The photo *is* the page; treat it as evidence,
   * not decoration. */
  image: {
    src: string;
    alt: string;
  };
  /** One short takeaway. Renders large under the photo. */
  takeaway: string;
  /** Narrow column caption. Plain text, italic serif. */
  caption: string;
}

/**
 * Field-note photo card (M02 family). Use when the photo is evidence:
 * outdoor scenes, objects, hardware, real-world documentation. The title
 * occupies the upper-left reading zone; the photo anchors the lower-left;
 * the narrow caption column sits to the right, like an editorial field note.
 *
 * Don't use this for decorative stock photography — if the photo isn't
 * carrying meaning, switch to EditorialCover with a smaller well.
 */
export default function FieldNotePhoto({
  kicker,
  image,
  takeaway,
  caption,
}: FieldNotePhotoProps) {
  return (
    <section className="editorial-field-note" data-layout="editorial-field-note">
      <header className="editorial-field-note__head">
        {kicker ? <div className="social-card-kicker">{kicker}</div> : null}
        <h2 className="editorial-field-note__takeaway">{takeaway}</h2>
      </header>
      <div className="editorial-field-note__bottom">
        <figure className="editorial-field-note__photo">
          <img src={image.src} alt={image.alt} />
        </figure>
        <p className="editorial-field-note__caption">{caption}</p>
      </div>
    </section>
  );
}
