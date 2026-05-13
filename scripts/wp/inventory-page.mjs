import { writeFileSync, mkdirSync } from "node:fs";
import { wpFetch } from "./lib.mjs";

const id = process.argv[2];
if (!id) {
  console.error("usage: node scripts/wp/inventory-page.mjs <pageId>");
  process.exit(1);
}

const page = await wpFetch(`/wp/v2/pages/${id}?context=edit`);

const hasElementorMeta = page.meta && Object.keys(page.meta).some(k => k.startsWith("_elementor"));
const elementorEditMode = page.meta?._elementor_edit_mode || null;
const elementorDataLen = page.meta?._elementor_data ? page.meta._elementor_data.length : 0;
const elementorTemplate = page.meta?._wp_page_template || page.template || null;

console.log(`Page [${page.id}] ${page.slug} — "${page.title.rendered}"`);
console.log(`  status:        ${page.status}`);
console.log(`  link:          ${page.link}`);
console.log(`  template:      ${elementorTemplate}`);
console.log(`  modified:      ${page.modified}`);
console.log(`  post_content:  ${page.content.raw?.length || 0} chars (raw), ${page.content.rendered?.length || 0} chars (rendered)`);
console.log(`  elementor:     edit_mode=${elementorEditMode}, _elementor_data length=${elementorDataLen}`);
console.log(`  meta keys:     ${page.meta ? Object.keys(page.meta).join(", ") : "(none exposed via REST)"}`);

mkdirSync("scripts/wp/snapshots", { recursive: true });
const snapPath = `scripts/wp/snapshots/page-${page.id}-${page.slug}.json`;
writeFileSync(snapPath, JSON.stringify(page, null, 2));
console.log(`\nFull snapshot written to: ${snapPath}`);

if (page.content.raw) {
  console.log(`\n--- post_content (raw, first 1500 chars) ---`);
  console.log(page.content.raw.slice(0, 1500));
  if (page.content.raw.length > 1500) console.log(`... (+${page.content.raw.length - 1500} more chars)`);
}
