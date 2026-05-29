import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";

const repoRoot = path.resolve(".");
const socialCardRoot = path.join(repoRoot, "skills/social-card");

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

test("skill points agents to OpenPress image export instead of legacy png commands", () => {
  const files = [
    "README.md",
    "skills/social-card/SKILL.md",
    "skills/social-card/references/qa-checklist.md",
    "skills/social-card/references/visual-grammar.md",
  ];
  const joined = files.map((file) => `\n--- ${file} ---\n${read(file)}`).join("\n");

  assert.match(read("skills/social-card/SKILL.md"), /npm run openpress:image/);
  assert.doesNotMatch(joined, /openpress export png/i);
  assert.doesNotMatch(joined, /PNG export is still waiting/i);
  assert.doesNotMatch(joined, /expected,\s*not yet shipped/i);
});

test("skill-local starter remains inside the installed social-card skill", () => {
  assert.equal(fs.existsSync(path.join(socialCardRoot, "starter/press/index.tsx")), true);
  assert.equal(fs.existsSync(path.join(socialCardRoot, "starter/press/cards/01-cover/content/01-cover.mdx")), true);
});
