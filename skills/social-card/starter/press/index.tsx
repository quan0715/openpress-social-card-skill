import { Frame, MdxArea, Press, Workspace } from "@open-press/core";
import { mdxSource } from "@open-press/core/mdx";
import { Sections, type SectionsPageProps } from "@open-press/core/manuscript";

// Out-of-band exports kept during the 0.x → 1.0 transition. The unreleased
// 1.0 authoring baseline reads these as JSX props on <Press>, while the
// current runtime still reads them as module-level exports. Keep both until
// the runtime stops reading the exports.
export const config = {
  title: "Social Card",
  page: {
    id: "social-4x5",
    label: "IG / FB / Threads 1080×1350",
    width: "1080px",
    height: "1350px",
  },
};

export const sources = {
  cards: mdxSource({ id: "cards", preset: "section-folders", root: "cards" }),
};

function CardPage({
  frameKey,
  chainId,
  pageIndex,
  totalPages,
  sectionSlug,
}: SectionsPageProps) {
  return (
    <Frame
      frameKey={frameKey}
      role="social.card"
      chrome={false}
      className="reader-page--social-card"
      data-page-index={pageIndex}
      data-total-pages={totalPages}
      data-section-id={sectionSlug}
    >
      <div className="page-frame">
        <main className="page-body">
          <MdxArea chainId={chainId} overflow="truncate" />
        </main>
      </div>
    </Frame>
  );
}

export default function SocialCardDocument() {
  return (
    <Workspace name="Social Card">
      <Press
        slug="social-card"
        title={config.title}
        page={config.page}
        sources={[sources.cards]}
      >
        <Sections source="cards" page={CardPage} />
      </Press>
    </Workspace>
  );
}
