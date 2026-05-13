import { writeFileSync, mkdirSync } from "node:fs";
import { wpFetch } from "./lib.mjs";

const slug = process.argv[2];
if (!slug) {
  console.error("usage: node scripts/wp/inspect-template-part.mjs <slug>   (e.g. front-header)");
  process.exit(1);
}

const tp = await wpFetch(`/wp/v2/template-parts/kubio//${slug}?context=edit`);

console.log(`Template part: ${tp.id}`);
console.log(`  title:      ${tp.title?.rendered || tp.title?.raw}`);
console.log(`  area:       ${tp.area}`);
console.log(`  description:${tp.description || "—"}`);
console.log(`  source:     ${tp.source}`);
console.log(`  origin:     ${tp.origin}`);
console.log(`  modified:   ${tp.modified || "n/a"}`);
console.log(`  content:    ${tp.content?.raw?.length || 0} chars (raw)`);

mkdirSync("scripts/wp/snapshots", { recursive: true });
const path = `scripts/wp/snapshots/template-part-${slug}.json`;
writeFileSync(path, JSON.stringify(tp, null, 2));
console.log(`\nFull snapshot: ${path}`);

const html = tp.content?.raw || "";

console.log(`\n=== Top-level kubio sections within ${slug} ===`);
const OPEN = "<!-- wp:kubio/section ";
const CLOSE_OPEN = " -->";
const CLOSE_TAG = "<!-- /wp:kubio/section -->";

let cursor = 0;
let idx = 0;
while (true) {
  const start = html.indexOf(OPEN, cursor);
  if (start === -1) break;
  const attrEnd = html.indexOf(CLOSE_OPEN, start);
  const attrs = (() => { try { return JSON.parse(html.slice(start + OPEN.length, attrEnd)); } catch { return {}; } })();

  let depth = 1, scan = attrEnd + CLOSE_OPEN.length, endOf = -1;
  while (depth > 0) {
    const o = html.indexOf(OPEN, scan), c = html.indexOf(CLOSE_TAG, scan);
    if (c === -1) break;
    if (o !== -1 && o < c) { depth++; scan = o + OPEN.length; }
    else { depth--; scan = c + CLOSE_TAG.length; if (depth === 0) endOf = scan; }
  }

  const body = html.slice(start, endOf);
  const text = body.replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const hasVideo = /h-video|<video|\.mov|\.mp4|copy_E1E91E02/i.test(body);
  console.log(`[${idx}] offset=${start.toString().padStart(6)} len=${(endOf - start).toString().padStart(5)} name="${attrs?.attrs?.name || "?"}" hasVideo=${hasVideo}`);
  if (text) console.log(`     text: ${text.slice(0, 180)}${text.length > 180 ? "…" : ""}`);
  cursor = endOf > 0 ? endOf : attrEnd + CLOSE_OPEN.length;
  idx++;
}

console.log(`\n=== Video signal locations in ${slug} ===`);
for (const needle of ["h-video-main", "copy_E1E91E02", "<video", ".mov", ".mp4"]) {
  const i = html.indexOf(needle);
  console.log(`  ${needle.padEnd(20)} ${i >= 0 ? `offset ${i}` : "—"}`);
}
