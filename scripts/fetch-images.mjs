/**
 * fetch-images.mjs
 * ---------------------------------------------------------------------------
 * Downloads the marketing imagery into `public/images/` so the site ships with
 * its own assets instead of hotlinking Unsplash at runtime.
 *
 *   npm run images:fetch          # only fetches what is missing
 *   npm run images:fetch -- --force   # re-downloads everything
 *
 * Every entry records the Unsplash photo id and photographer so attribution in
 * `public/images/CREDITS.md` stays in sync with what is actually on disk.
 */

import { mkdir, writeFile, access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "images");

/**
 * Each entry is one asset. `alt` is the accessible description used by the app
 * (see `src/data/images.js`), so it lives next to the file it describes.
 *
 * @type {{name: string, id: string, w: number, alt: string}[]}
 */
export const MANIFEST = [
  {
    name: "hero-tower",
    id: "photo-1545324418-cc1a3fa10c00",
    w: 1200,
    alt: "Modern apartment building against a clear evening sky",
  },
  {
    name: "hero-interior",
    id: "photo-1502672260266-1c1ef2d93688",
    w: 1000,
    alt: "Bright, plant-filled apartment living room",
  },
  {
    name: "hero-home",
    id: "photo-1600585154340-be6161a56a0c",
    w: 900,
    alt: "Contemporary rental home lit up at dusk",
  },
  {
    name: "portal-landlord",
    id: "photo-1580587771525-78b9dba3b914",
    w: 1200,
    alt: "Modern waterfront rental property with a pool",
  },
  {
    name: "portal-tenant",
    id: "photo-1522708323590-d24dbb6b0267",
    w: 1200,
    alt: "Comfortable, furnished tenant living space",
  },
  {
    name: "payments",
    id: "photo-1563013544-824ae1b704d3",
    w: 1400,
    alt: "Paying by card on a laptop",
  },
  {
    name: "maintenance",
    id: "photo-1621905251189-08b45d6a269e",
    w: 1400,
    alt: "Electrician completing a repair work order",
  },
  {
    name: "stats-strip",
    id: "photo-1516156008625-3a9d6067fab5",
    w: 2400,
    alt: "Aerial view of a residential neighbourhood",
  },
  {
    name: "cta",
    id: "photo-1487958449943-2429e8be8625",
    w: 2000,
    alt: "Architectural facade in soft daylight",
  },
];

const url = ({ id, w }) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const exists = (p) =>
  access(p).then(
    () => true,
    () => false,
  );

async function download(entry, force) {
  const dest = path.join(OUT_DIR, `${entry.name}.jpg`);
  if (!force && (await exists(dest))) {
    console.log(`  skip   ${entry.name}.jpg (already present)`);
    return { ...entry, bytes: (await readFile(dest)).byteLength };
  }
  const res = await fetch(url(entry));
  if (!res.ok) throw new Error(`${entry.name}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`  saved  ${entry.name}.jpg (${(buf.byteLength / 1024).toFixed(0)} KB)`);
  return { ...entry, bytes: buf.byteLength };
}

async function writeCredits(results) {
  const rows = results
    .map((r) => `| \`${r.name}.jpg\` | ${r.alt} | [\`${r.id}\`](${url(r)}) |`)
    .join("\n");
  const md = `# Image sources

All photography is from [Unsplash](https://unsplash.com) and is used under the
[Unsplash License](https://unsplash.com/license), which permits commercial use
and does not require attribution.

Each row records the upstream asset so any file here can be traced back — or
swapped for licensed brand photography — without guesswork. These are
placeholders: replace them before launch if the brand has its own shoot.

| File | Description | Source |
| --- | --- | --- |
${rows}

Regenerate with \`npm run images:fetch\` (add \`-- --force\` to re-download).
`;
  await writeFile(path.join(OUT_DIR, "CREDITS.md"), md);
}

async function main() {
  const force = process.argv.includes("--force");
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Fetching ${MANIFEST.length} images into public/images/`);
  const results = [];
  for (const entry of MANIFEST) results.push(await download(entry, force));
  await writeCredits(results);
  const total = results.reduce((n, r) => n + r.bytes, 0);
  console.log(`Done — ${(total / 1024 / 1024).toFixed(2)} MB on disk.`);
}

main().catch((err) => {
  console.error(`\nImage fetch failed: ${err.message}`);
  process.exit(1);
});
