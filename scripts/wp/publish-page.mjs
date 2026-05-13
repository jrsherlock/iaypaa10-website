import { wpFetch, WP_BASE_URL } from "./lib.mjs";

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const positional = args.filter(a => !a.startsWith("--"));
const id = positional[0];

if (!id) {
  console.error("usage: node scripts/wp/publish-page.mjs <pageId> [--apply]");
  process.exit(1);
}

const page = await wpFetch(`/wp/v2/pages/${id}?context=edit`);
console.log(`Page [${page.id}] "${page.title.rendered}" — current status: ${page.status}`);
if (page.status === "publish") {
  console.log("Already published. Nothing to do.");
  process.exit(0);
}

console.log(`Will change status: ${page.status} → publish`);

if (!apply) {
  console.log("DRY RUN — no write. Re-run with --apply to publish.");
  process.exit(0);
}

const res = await wpFetch(`/wp/v2/pages/${id}`, {
  method: "PUT",
  body: JSON.stringify({ status: "publish" }),
});
console.log(`✓ Published. URL: ${res.link}`);
console.log(`  Direct: ${WP_BASE_URL}/?page_id=${id}`);
