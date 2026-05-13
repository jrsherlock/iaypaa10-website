import { writeFileSync, mkdirSync } from "node:fs";
import { wpFetch, WP_BASE_URL } from "./lib.mjs";

const apply = process.argv.includes("--apply");

const ARCHIVE_PAGE_ID = 2413;
const VIDEO_MEDIA_ID = 2375;
const VIDEO_URL = "https://iaypaa.org/wp-content/uploads/2025/10/copy_E1E91E02-D009-4E25-B5BA-186CDC6C2067.mov";

const page = await wpFetch(`/wp/v2/pages/${ARCHIVE_PAGE_ID}?context=edit`);
console.log(`Archive page: [${page.id}] "${page.title.rendered}" — ${page.content.raw.length} chars, status=${page.status}`);

const videoBlock = `<!-- wp:video {"id":${VIDEO_MEDIA_ID},"autoplay":true,"loop":true,"muted":true,"playsInline":true,"align":"wide"} -->
<figure class="wp-block-video alignwide"><video autoplay loop muted playsinline controls src="${VIDEO_URL}"></video></figure>
<!-- /wp:video -->

<!-- wp:heading {"level":2,"align":"center"} -->
<h2 class="wp-block-heading has-text-align-center">IAYPAA IX — Cedar Rapids, 2025</h2>
<!-- /wp:heading -->

`;

if (page.content.raw.includes("copy_E1E91E02-D009-4E25-B5BA-186CDC6C2067.mov")) {
  console.log("⚠ Archive page already references this video. Aborting to avoid duplicating.");
  process.exit(0);
}

const newContent = videoBlock + page.content.raw;
const backupPath = `scripts/wp/snapshots/page-${ARCHIVE_PAGE_ID}.before-video-embed.json`;
mkdirSync("scripts/wp/snapshots", { recursive: true });
writeFileSync(backupPath, JSON.stringify(page, null, 2));
console.log(`Backup written: ${backupPath}`);

console.log("\n--- BLOCK TO PREPEND (" + videoBlock.length + " chars) ---");
console.log(videoBlock);
console.log(`\nContent: ${page.content.raw.length} → ${newContent.length} chars`);

console.log("\n" + "─".repeat(60));
if (!apply) {
  console.log("DRY RUN — no write performed. Re-run with --apply to update the draft.");
  process.exit(0);
}

console.log(`APPLYING — PUT /wp/v2/pages/${ARCHIVE_PAGE_ID}`);
const res = await wpFetch(`/wp/v2/pages/${ARCHIVE_PAGE_ID}`, {
  method: "PUT",
  body: JSON.stringify({ content: newContent }),
});
console.log(`✓ Updated. New content length: ${res.content?.raw?.length || "?"} chars`);
console.log(`Edit URL: ${WP_BASE_URL}/wp-admin/post.php?post=${ARCHIVE_PAGE_ID}&action=edit`);
