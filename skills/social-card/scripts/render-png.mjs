#!/usr/bin/env node
/**
 * render-png.mjs — skill-local PNG export for social-card workspaces.
 *
 * TEMPORARY. Codex is implementing a first-class `openpress png` command in
 * the OpenPress framework repo. Delete this file (and the dep entries in
 * scripts/README.md) once that command lands and update SKILL.md to call
 * `openpress png` directly. Tracked in NOTES.md as GAP-1.
 *
 * Until then, this stopgap:
 *   1. Runs `npm run build` in the target workspace to produce dist-react/.
 *   2. Boots a static file server.
 *   3. Visits the rendered reader, waits for fonts and images.
 *   4. Screenshots each `.reader-page` at its real pixel dimensions.
 *   5. Writes deterministic filenames `<section-slug>.png` into the out dir.
 *
 * Usage:
 *   node scripts/render-png.mjs [--workspace <path>] [--out <dir>] [--selector <css>]
 *
 * Defaults:
 *   --workspace   current working directory
 *   --out         output/png/
 *   --selector    .reader-page
 */

import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { chromium } from "playwright";
import handler from "serve-handler";

const args = parseArgs(process.argv.slice(2));
const workspace = path.resolve(args.workspace ?? process.cwd());
const outDir = path.resolve(workspace, args.out ?? "output/png");
const selector = args.selector ?? ".reader-page";
const distDir = path.resolve(workspace, "dist-react");

await mkdir(outDir, { recursive: true });

if (!args["skip-build"]) {
  console.log(`[render-png] building ${workspace} …`);
  await runNpm(workspace, "run", "build");
} else {
  console.log("[render-png] --skip-build set, reusing existing dist-react/");
}

const server = createServer((req, res) =>
  handler(req, res, { public: distDir, cleanUrls: false }),
);
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const url = `http://127.0.0.1:${port}/`;

console.log(`[render-png] serving ${distDir} at ${url}`);

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForLoadState("networkidle");

  const frames = await page.$$(selector);
  if (frames.length === 0) {
    throw new Error(`no elements matched selector ${selector}`);
  }
  console.log(`[render-png] found ${frames.length} frame(s) matching ${selector}`);

  let i = 1;
  for (const frame of frames) {
    const slug =
      (await frame.getAttribute("data-section-id")) ||
      (await frame.getAttribute("data-page-index")) ||
      String(i);
    const filename = `${String(i).padStart(2, "0")}-${slug}.png`;
    const target = path.join(outDir, filename);
    await frame.screenshot({ path: target, omitBackground: false });
    console.log(`[render-png] wrote ${path.relative(workspace, target)}`);
    i += 1;
  }
} finally {
  await browser.close();
  server.close();
}

console.log(`[render-png] done. ${outDir}`);

// ---- helpers ----

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        out[key] = next;
        i += 1;
      } else {
        out[key] = true;
      }
    }
  }
  return out;
}

function runNpm(cwd, ...args) {
  return new Promise((resolve, reject) => {
    const child = spawn("npm", args, { cwd, stdio: "inherit" });
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`npm ${args.join(" ")} exited with ${code}`));
    });
    child.on("error", reject);
  });
}
