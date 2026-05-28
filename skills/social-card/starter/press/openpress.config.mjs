// social-card starter — IG / Facebook / Threads 1080×1350 carousel workspace.
export default {
  title: "Social Card",

  page: {
    id: "social-4x5",
    label: "IG / FB / Threads 1080×1350",
    width: "1080px",
    height: "1350px",
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
