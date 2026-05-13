import { writeFileSync, mkdirSync } from "node:fs";
import { wpFetch, WP_BASE_URL } from "./lib.mjs";

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const positional = args.filter(a => !a.startsWith("--"));
const posterId = positional[0];

if (!posterId) {
  console.error("usage: node scripts/wp/swap-front-header-video.mjs <posterMediaId> [--apply]");
  process.exit(1);
}

const tpId = "kubio//front-header";
const tp = await wpFetch(`/wp/v2/template-parts/${tpId}?context=edit`);
const html = tp.content.raw;
console.log(`Loaded template part "${tp.title.raw}" — ${html.length} chars`);

const opener = "<!-- wp:kubio/video ";
const closer = " /-->";
const occurrences = (html.match(/<!-- wp:kubio\/video /g) || []).length;
if (occurrences === 0) {
  console.error("FATAL: no wp:kubio/video block found in front-header. Did the structure change?");
  process.exit(2);
}
if (occurrences > 1) {
  console.error(`FATAL: expected exactly 1 wp:kubio/video block, found ${occurrences}. Refusing to guess.`);
  process.exit(2);
}

const start = html.indexOf(opener);
const closerIdx = html.indexOf(closer, start);
if (closerIdx === -1) {
  console.error("FATAL: could not find self-closing ' /-->' for the kubio/video block.");
  process.exit(2);
}
const end = closerIdx + closer.length;
const oldBlock = html.slice(start, end);

const poster = await wpFetch(`/wp/v2/media/${posterId}`);
console.log(`Poster: [${poster.id}] ${poster.source_url} (${poster.media_type})`);
if (poster.media_type !== "image") {
  console.error(`FATAL: media ${posterId} is not an image (type=${poster.media_type}).`);
  process.exit(2);
}

const altText = poster.title?.rendered || "IAYPAA X — Primordial Ooze";
const newBlock = `<!-- wp:image {"id":${poster.id},"sizeSlug":"large","linkDestination":"none","align":"center"} -->\n<figure class="wp-block-image aligncenter size-large"><img src="${poster.source_url}" alt="${altText}" class="wp-image-${poster.id}"/></figure>\n<!-- /wp:image -->`;

const newHtml = html.slice(0, start) + newBlock + html.slice(end);

mkdirSync("scripts/wp/snapshots", { recursive: true });
const backupPath = `scripts/wp/snapshots/template-part-front-header.before-swap.json`;
writeFileSync(backupPath, JSON.stringify(tp, null, 2));
console.log(`Backup written: ${backupPath}`);

console.log("\n--- OLD BLOCK (to remove, " + oldBlock.length + " chars) ---");
console.log(oldBlock);
console.log("\n--- NEW BLOCK (to insert, " + newBlock.length + " chars) ---");
console.log(newBlock);
console.log(`\nDelta: ${html.length} → ${newHtml.length} chars (${newHtml.length - html.length >= 0 ? "+" : ""}${newHtml.length - html.length})`);

console.log("\n" + "─".repeat(60));
if (!apply) {
  console.log("DRY RUN — no write performed. Re-run with --apply to send the edit.");
  console.log("To restore the original block later: see backup at " + backupPath);
  process.exit(0);
}

console.log("APPLYING — PUT /wp/v2/template-parts/" + tpId);
const res = await wpFetch(`/wp/v2/template-parts/${tpId}`, {
  method: "PUT",
  body: JSON.stringify({ content: newHtml }),
});
console.log(`✓ Updated. content length now: ${res.content?.raw?.length || "?"} chars`);
console.log(`Visit ${WP_BASE_URL}/ to confirm — hard refresh / clear caches if needed.`);
