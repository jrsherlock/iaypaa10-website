import { writeFileSync, mkdirSync } from "node:fs";
import { wpFetch } from "./lib.mjs";

const apply = process.argv.includes("--apply");
const tpId = "kubio//front-header";

const tp = await wpFetch(`/wp/v2/template-parts/${tpId}?context=edit`);
const html = tp.content.raw;

const opener = "<!-- wp:kubio/logo ";
const matches = [];
let cursor = 0;
while (true) {
  const start = html.indexOf(opener, cursor);
  if (start === -1) break;
  const end = html.indexOf("/-->", start) + "/-->".length;
  const block = html.slice(start, end);
  matches.push({ start, end, block });
  cursor = end;
}

console.log(`Found ${matches.length} kubio/logo blocks in ${tpId}`);
for (let i = 0; i < matches.length; i++) {
  const m = matches[i];
  const layoutMatch = m.block.match(/"layoutType":"(\w+)"/);
  console.log(`  [${i}] offset ${m.start}, layoutType=${layoutMatch?.[1] || "?"}, ${m.block.length} chars`);
}

const target = matches.find(m => m.block.includes('"layoutType":"image"'));
if (!target) {
  console.log("No kubio/logo block currently in image mode. Nothing to change.");
  process.exit(0);
}

const newBlock = target.block.replace('"layoutType":"image"', '"layoutType":"text"');
const newHtml = html.slice(0, target.start) + newBlock + html.slice(target.end);

mkdirSync("scripts/wp/snapshots", { recursive: true });
const backupPath = `scripts/wp/snapshots/template-part-front-header.before-logo-text.json`;
writeFileSync(backupPath, JSON.stringify(tp, null, 2));
console.log(`Backup written: ${backupPath}`);

console.log(`\nChange: layoutType "image" → "text" in logo block at offset ${target.start}`);
console.log(`Net delta: ${newHtml.length - html.length} chars (${html.length} → ${newHtml.length})`);

if (!apply) {
  console.log("\nDRY RUN — no write. Re-run with --apply to send.");
  process.exit(0);
}

const res = await wpFetch(`/wp/v2/template-parts/${tpId}`, {
  method: "PUT",
  body: JSON.stringify({ content: newHtml }),
});
console.log(`✓ Updated front-header. New length: ${res.content?.raw?.length || "?"} chars`);
