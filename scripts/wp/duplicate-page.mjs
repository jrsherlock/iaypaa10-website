import { wpFetch } from "./lib.mjs";

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const positional = args.filter(a => !a.startsWith("--"));
const [sourceId, newTitle, newSlug] = positional;

if (!sourceId || !newTitle || !newSlug) {
  console.error("usage: node scripts/wp/duplicate-page.mjs <sourcePageId> <newTitle> <newSlug> [--apply]");
  process.exit(1);
}

const src = await wpFetch(`/wp/v2/pages/${sourceId}?context=edit`);
console.log(`Source: [${src.id}] "${src.title.rendered}" (${src.content.raw.length} chars)`);

const payload = {
  title: newTitle,
  slug: newSlug,
  status: "draft",
  content: src.content.raw,
  template: src.template || "",
  parent: 0,
  comment_status: src.comment_status,
  ping_status: src.ping_status,
};

console.log(`\nWill create new page (status=draft):`);
console.log(`  title:    ${payload.title}`);
console.log(`  slug:     ${payload.slug}`);
console.log(`  template: ${payload.template || "(default)"}`);
console.log(`  content:  ${payload.content.length} chars copied verbatim from source`);

console.log("\n" + "─".repeat(60));
if (!apply) {
  console.log("DRY RUN — no write performed. Re-run with --apply to create the draft.");
  process.exit(0);
}

console.log("APPLYING — creating draft on iaypaa.org…");
const created = await wpFetch("/wp/v2/pages", {
  method: "POST",
  body: JSON.stringify(payload),
});
console.log(`\n✓ Created draft: [${created.id}] ${created.slug}`);
console.log(`  Preview URL:    ${created.link}?preview=true (requires wp-admin login)`);
console.log(`  Edit URL:       https://iaypaa.org/wp-admin/post.php?post=${created.id}&action=edit`);
