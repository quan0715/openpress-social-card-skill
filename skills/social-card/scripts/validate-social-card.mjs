#!/usr/bin/env node
/**
 * validate-social-card.mjs — skill-local validator for social-card workspaces.
 *
 * Boots the built reader, walks every `.reader-page`, and reports rule
 * violations as a JSON report (and a non-zero exit code on failure).
 *
 * Rules implemented in v1:
 *   - overflow:           any descendant overflowing its frame
 *   - small-type:         text smaller than --social-card-size-caption
 *   - density-low:        body fills less than `min-density` of the frame area
 *   - source-missing:     any <img> whose src points to /openpress/media/ but
 *                         the file is not listed in document/media/SOURCES.md
 *
 * Rules tracked in spec but not yet enforced (see NOTES.md):
 *   - footer/source-credit collision (needs layout-aware probe)
 *   - title length / line caps (needs token-level rules per layout)
 *   - screenshot readability (needs OCR or per-shot metadata)
 *
 * Usage:
 *   node scripts/validate-social-card.mjs [--workspace <path>] [--min-density 0.45]
 *
 * Exit codes:
 *   0  all checks passed
 *   1  one or more violations
 *   2  setup error (build failed, browser launch failed, etc.)
 */

import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { spawn } from "node:child_process";

import { chromium } from "playwright";
import handler from "serve-handler";

const args = parseArgs(process.argv.slice(2));
const workspace = path.resolve(args.workspace ?? process.cwd());
const minDensity = Number(args["min-density"] ?? 0.45);
const distDir = path.resolve(workspace, "dist-react");
const sourcesPath = path.resolve(workspace, "document/media/SOURCES.md");

try {
  if (!args["skip-build"]) {
    console.log(`[validate] building ${workspace} …`);
    await runNpm(workspace, "run", "build");
  }
} catch (err) {
  console.error("[validate] build failed:", err.message);
  process.exit(2);
}

const declaredSources = await loadDeclaredSources(sourcesPath);

const server = createServer((req, res) =>
  handler(req, res, { public: distDir, cleanUrls: false }),
);
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
const url = `http://127.0.0.1:${port}/`;

let exitCode = 0;
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);

  const reports = await page.$$eval(
    ".reader-page",
    (frames, params) => {
      const { minDensity, declaredSources } = params;
      const results = [];

      for (const frame of frames) {
        const slug =
          frame.getAttribute("data-section-id") ||
          frame.getAttribute("data-page-index") ||
          "(unknown)";
        const rect = frame.getBoundingClientRect();
        const issues = [];

        // overflow: any descendant whose box extends past the frame
        const descendants = frame.querySelectorAll("*");
        for (const el of descendants) {
          const r = el.getBoundingClientRect();
          if (r.right > rect.right + 0.5 || r.bottom > rect.bottom + 0.5) {
            issues.push({
              rule: "overflow",
              detail: `${el.tagName.toLowerCase()}${el.className ? "." + String(el.className).split(" ").join(".") : ""}`,
            });
            break;
          }
        }

        // small-type: any text node smaller than caption floor (22px default)
        const FLOOR = parseFloat(
          getComputedStyle(document.documentElement)
            .getPropertyValue("--social-card-size-caption") || "22",
        );
        for (const el of descendants) {
          if (!el.textContent || !el.textContent.trim()) continue;
          const fs = parseFloat(getComputedStyle(el).fontSize);
          if (fs && fs < FLOOR - 0.5) {
            issues.push({
              rule: "small-type",
              detail: `${el.tagName.toLowerCase()} at ${fs.toFixed(1)}px (floor ${FLOOR}px)`,
            });
            break;
          }
        }

        // density: body area roughly = sum of visible content boxes / frame area
        let inkArea = 0;
        for (const el of descendants) {
          const r = el.getBoundingClientRect();
          const isLeaf =
            el.children.length === 0 ||
            el.tagName === "IMG" ||
            el.tagName === "svg".toUpperCase();
          if (isLeaf && r.width > 0 && r.height > 0) {
            inkArea += r.width * r.height;
          }
        }
        const frameArea = rect.width * rect.height;
        const density = inkArea / frameArea;
        if (density < minDensity) {
          issues.push({
            rule: "density-low",
            detail: `density ${density.toFixed(2)} below floor ${minDensity}`,
          });
        }

        // source-missing: <img> referencing /openpress/media/ but not declared
        const imgs = frame.querySelectorAll("img");
        for (const img of imgs) {
          const src = img.getAttribute("src") || "";
          if (src.includes("/media/")) {
            const file = src.split("/").pop();
            if (!declaredSources.includes(file)) {
              issues.push({
                rule: "source-missing",
                detail: `${file} not listed in document/media/SOURCES.md`,
              });
            }
          }
        }

        results.push({ slug, issues });
      }

      return results;
    },
    { minDensity, declaredSources },
  );

  // Print report
  let totalIssues = 0;
  for (const report of reports) {
    if (report.issues.length === 0) {
      console.log(`✓ ${report.slug}`);
    } else {
      totalIssues += report.issues.length;
      console.log(`✗ ${report.slug}`);
      for (const issue of report.issues) {
        console.log(`    [${issue.rule}] ${issue.detail}`);
      }
    }
  }
  console.log("");
  console.log(`[validate] ${reports.length} card(s) checked, ${totalIssues} issue(s)`);
  if (totalIssues > 0) exitCode = 1;
} catch (err) {
  console.error("[validate] error:", err.message);
  exitCode = 2;
} finally {
  await browser.close();
  server.close();
}

process.exit(exitCode);

// ---- helpers ----

async function loadDeclaredSources(file) {
  try {
    const text = await readFile(file, "utf8");
    const matches = [];
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^-?\s*file:\s*(\S+)/);
      if (m) matches.push(m[1]);
    }
    return matches;
  } catch {
    return [];
  }
}

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
