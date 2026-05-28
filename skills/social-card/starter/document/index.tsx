import { Frame, MdxArea, Press } from "@open-press/core";
import { mdxSource } from "@open-press/core/mdx";
import { Sections, type SectionsPageProps } from "@open-press/core/manuscript";

export const config = {
  title: "Social Card",
  subtitle: "IG / Facebook / Threads 1080×1350 carousel",
  organization: "OpenPress",
  page: {
    id: "social-4x5",
    label: "IG / FB / Threads 1080×1350",
    width: "1080px",
    height: "1350px",
  },
};

export const sources = {
  cards: mdxSource({ preset: "section-folders", root: "chapters" }),
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
    <Press>
      <Sections source="cards" page={CardPage} />
    </Press>
  );
}
