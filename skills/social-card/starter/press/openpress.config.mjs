// social-card starter — editorial portrait 1080×1440 carousel workspace.
export default {
  title: "Social Card",

  page: {
    id: "social-xhs-3x4",
    label: "Rednote / Editorial 1080×1440",
    width: "1080px",
    height: "1440px",
  },

  sourceDir: "cards",
  mediaDir: "media",
  themeDir: "theme",
  designDoc: "design.md",
  componentsDir: "components",
  publicDir: "public/openpress",
  outputDir: "dist-react",

  pdf: {
    filename: "social-card.pdf",
  },

  deploy: {
    adapter: "cloudflare-pages",
    source: ".deploy/social-card",
    projectName: null,
    commitDirty: false,
    requiresConfirmation: true,
  },
};
