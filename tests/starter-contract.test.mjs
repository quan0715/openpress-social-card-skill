import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

const starterRoot = path.resolve("skills/social-card/starter/press");
const themeRoot = path.join(starterRoot, "theme");

test("starter ships the OpenPress 1.0 theme layers the runtime reads", () => {
  const required = [
    "base/page-contract.css",
    "base/typography.css",
    "page-surfaces/cover.css",
    "page-surfaces/back-cover.css",
    "page-surfaces/toc.css",
    "shell/reader-controls.css",
    "base/print.css",
  ];

  for (const relativePath of required) {
    const filePath = path.join(themeRoot, relativePath);
    assert.equal(
      fs.existsSync(filePath),
      true,
      `missing theme layer: ${relativePath}`,
    );
  }
});

test("starter uses the editorial 1080x1440 page contract", () => {
  const entry = fs.readFileSync(path.join(starterRoot, "index.tsx"), "utf8");
  const tokens = fs.readFileSync(path.join(themeRoot, "tokens.css"), "utf8");

  assert.match(entry, /width:\s*"1080px"/);
  assert.match(entry, /height:\s*"1440px"/);
  assert.match(tokens, /--openpress-page-padding-top:\s*96px/);
  assert.match(tokens, /--openpress-page-padding-x:\s*88px/);
  assert.match(tokens, /--social-card-kicker:\s*21px/);
  assert.match(tokens, /--social-card-body:\s*24px/);
});

test("runtime typography layer contains the social-card visual system", () => {
  const css = fs.readFileSync(path.join(themeRoot, "base/typography.css"), "utf8");

  assert.match(css, /\.reader-page--social-card\b/);
  assert.match(css, /paper grain/i);
  assert.match(css, /editorial-cover__title/);
  assert.match(css, /editorial-cover__lead/);
  assert.match(css, /editorial-essay-split__note/);
  assert.match(css, /swiss-statement__display/);
});
