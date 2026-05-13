import { readFileSync } from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("usage: node scripts/wp/section-map.mjs <snapshot.json>");
  process.exit(1);
}

const page = JSON.parse(readFileSync(file, "utf8"));
const html = page.content.raw;

const OPEN = "<!-- wp:kubio/section ";
const CLOSE_OPEN = " -->";
const CLOSE_TAG = "<!-- /wp:kubio/section -->";

const sections = [];
let cursor = 0;
while (true) {
  const start = html.indexOf(OPEN, cursor);
  if (start === -1) break;
  const attrEnd = html.indexOf(CLOSE_OPEN, start);
  if (attrEnd === -1) break;
  const attrJson = html.slice(start + OPEN.length, attrEnd);
  let attrs = {};
  try { attrs = JSON.parse(attrJson); } catch (e) { /* ignore */ }

  let depth = 1;
  let scan = attrEnd + CLOSE_OPEN.length;
  let endOfSection = -1;
  while (depth > 0) {
    const nextOpen = html.indexOf(OPEN, scan);
    const nextClose = html.indexOf(CLOSE_TAG, scan);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      scan = nextOpen + OPEN.length;
    } else {
      depth--;
      scan = nextClose + CLOSE_TAG.length;
      if (depth === 0) endOfSection = scan;
    }
  }

  sections.push({
    index: sections.length,
    offset: start,
    end: endOfSection,
    name: attrs?.attrs?.name || "(unnamed)",
    anchor: attrs?.anchor || null,
    category: attrs?.kubioAI?.meta?.category || null,
  });
  cursor = endOfSection > 0 ? endOfSection : attrEnd + CLOSE_OPEN.length;
}

console.log(`Found ${sections.length} top-level kubio sections in page ${page.id} (${html.length} chars total):\n`);

for (const s of sections) {
  const length = s.end - s.offset;
  const body = html.slice(s.offset, s.end);
  const text = body.replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const preview = text.slice(0, 200);
  console.log(`[${s.index}] offset=${s.offset.toString().padStart(6)}  len=${length.toString().padStart(5)}  name="${s.name}"  anchor=${s.anchor || "-"}  cat=${s.category || "-"}`);
  if (preview) console.log(`     text: ${preview}${text.length > 200 ? "…" : ""}`);
}
