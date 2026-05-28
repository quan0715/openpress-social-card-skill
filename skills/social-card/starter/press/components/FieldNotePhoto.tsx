export interface FieldNotePhotoProps {
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
 * outdoor scenes, objects, hardware, real-world documentation. The
 * photo occupies the dominant upper area; the takeaway + narrow caption
 * column anchor the bottom.
 *
 * Don't use this for decorative stock photography — if the photo isn't
 * carrying meaning, switch to EditorialCover with a smaller well.
 */
export default function FieldNotePhoto({ image, takeaway, caption }: FieldNotePhotoProps) {
  return (
    <section className="editorial-field-note" data-layout="editorial-field-note">
      <figure className="editorial-field-note__photo">
        <img src={image.src} alt={image.alt} />
      </figure>
      <div className="editorial-field-note__bottom">
        <h2 className="editorial-field-note__takeaway">{takeaway}</h2>
        <p className="editorial-field-note__caption">{caption}</p>
      </div>
    </section>
  );
}
