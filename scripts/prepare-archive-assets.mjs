import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(scriptDir, "..");
const repoRoot = path.resolve(siteRoot, "..");

const SOURCE_ROOT = path.resolve(repoRoot, "Rittenhouse-Residence");
const PUBLIC_ROOT = path.resolve(siteRoot, "public", "archive");

const COPY_TARGETS = [
  {
    label: "raw_documents",
    src: path.resolve(SOURCE_ROOT, "raw_documents"),
    dest: path.resolve(PUBLIC_ROOT, "raw_documents"),
  },
  {
    label: "images/web",
    src: path.resolve(SOURCE_ROOT, "images", "web"),
    dest: path.resolve(PUBLIC_ROOT, "images", "web"),
  },
  {
    label: "refs",
    src: path.resolve(SOURCE_ROOT, "refs"),
    dest: path.resolve(PUBLIC_ROOT, "refs"),
  },
];

// Files/patterns to exclude from public archive
// These documents contain sensitive financial information and should never be publicly displayed
const ARCHIVE_EXCLUDE_PATTERNS = [
  "property cert",
  "2013 deed",        // Current ownership deed - financial details too explicit
  "scarlet fever",    // Historical illness reference - not appropriate for rental marketing
];

function shouldExcludeArchiveFile(srcPath) {
  const normalized = srcPath.toLowerCase();
  return ARCHIVE_EXCLUDE_PATTERNS.some((pattern) => normalized.includes(pattern));
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function rmIfExists(p) {
  if (!(await exists(p))) return;
  await fs.rm(p, { recursive: true, force: true });
}

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function main() {
  // Skip on Vercel/CI - assets should already be in public/archive
  if (process.env.VERCEL || process.env.CI) {
    console.log("Archive sync skipped (Vercel/CI environment)");
    return;
  }

  if (process.env.SKIP_ARCHIVE_SYNC) {
    console.log("Archive sync skipped (SKIP_ARCHIVE_SYNC=1)");
    return;
  }

  const missingSources = [];
  for (const target of COPY_TARGETS) {
    if (!(await exists(target.src))) missingSources.push(target.src);
  }

  if (missingSources.length) {
    // If public/archive already exists with content, skip silently
    const webArchive = path.resolve(PUBLIC_ROOT, "images", "web");
    if (await exists(webArchive)) {
      console.log("Archive sync skipped (public/archive already populated)");
      return;
    }

    const lifecycle = process.env.npm_lifecycle_event ?? "";
    const shouldFail = lifecycle.includes("build") && !process.env.SKIP_ARCHIVE_SYNC;

    const lines = [
      "Archive sync skipped (missing source folders):",
      ...missingSources.map((src) => `- ${src}`),
    ];

    console.log(lines.join("\n"));
    return;
  }

  await ensureDir(PUBLIC_ROOT);

  for (const target of COPY_TARGETS) {
    await rmIfExists(target.dest);
    await ensureDir(path.dirname(target.dest));
    await fs.cp(target.src, target.dest, {
      recursive: true,
      force: true,
      filter: (src) =>
        path.basename(src) !== ".DS_Store" && !shouldExcludeArchiveFile(src),
    });
    console.log(`Synced ${target.label} -> ${path.relative(siteRoot, target.dest)}`);
  }
}

await main();
