import { readFileSync, existsSync } from "node:fs";
import { wpFetch, WP_BASE_URL } from "./lib.mjs";

const apply = process.argv.includes("--apply");

const TP_BACKUP = "scripts/wp/snapshots/template-part-front-header.before-swap.json";
const ARCHIVE_PAGE_ID = 2413;
const POSTER_MEDIA_ID = 2414;
const ORIGINAL_VIDEO_MEDIA_ID = 2375;

console.log("=== Restore plan ===");
console.log(`1. Restore kubio//front-header content from ${TP_BACKUP}`);
console.log(`2. Delete page ${ARCHIVE_PAGE_ID} (archive draft) — force=true, no trash`);
console.log(`3. Delete media ${POSTER_MEDIA_ID} (Primordial Ooze poster) — force=true`);
console.log(`   (Original IX video media ${ORIGINAL_VIDEO_MEDIA_ID} is NOT deleted — it was always there.)`);
console.log("");

if (!existsSync(TP_BACKUP)) {
  console.error(`FATAL: backup not found at ${TP_BACKUP}. Aborting — refusing to guess.`);
  process.exit(2);
}
const backup = JSON.parse(readFileSync(TP_BACKUP, "utf8"));
const originalContent = backup.content?.raw;
if (!originalContent || originalContent.length < 1000) {
  console.error(`FATAL: backup content looks empty or wrong (${originalContent?.length || 0} chars).`);
  process.exit(2);
}
console.log(`Backup content: ${originalContent.length} chars — looks valid.`);

console.log("\n=== Pre-flight reads (read-only) ===");
let pageExists = true, mediaExists = true;
try {
  const p = await wpFetch(`/wp/v2/pages/${ARCHIVE_PAGE_ID}?context=edit`);
  console.log(`  Page ${ARCHIVE_PAGE_ID}: status=${p.status}, title="${p.title.rendered}"`);
} catch (e) {
  if (e.status === 404) { pageExists = false; console.log(`  Page ${ARCHIVE_PAGE_ID}: not found (already deleted?)`); }
  else throw e;
}
try {
  const m = await wpFetch(`/wp/v2/media/${POSTER_MEDIA_ID}`);
  console.log(`  Media ${POSTER_MEDIA_ID}: ${m.media_type}, ${m.source_url}`);
} catch (e) {
  if (e.status === 404) { mediaExists = false; console.log(`  Media ${POSTER_MEDIA_ID}: not found (already deleted?)`); }
  else throw e;
}
const fhCurrent = await wpFetch(`/wp/v2/template-parts/kubio//front-header?context=edit`);
console.log(`  front-header current: ${fhCurrent.content.raw.length} chars (will become ${originalContent.length} chars)`);

if (!apply) {
  console.log("\n" + "─".repeat(60));
  console.log("DRY RUN — no writes performed. Re-run with --apply to restore.");
  process.exit(0);
}

console.log("\n=== Applying ===");

console.log(`[1/3] PUT /wp/v2/template-parts/kubio//front-header (restoring ${originalContent.length} chars)…`);
const tpRes = await wpFetch(`/wp/v2/template-parts/kubio//front-header`, {
  method: "PUT",
  body: JSON.stringify({ content: originalContent }),
});
console.log(`      ✓ Restored. Length now: ${tpRes.content?.raw?.length || "?"} chars`);

if (pageExists) {
  console.log(`[2/3] DELETE /wp/v2/pages/${ARCHIVE_PAGE_ID}?force=true…`);
  await wpFetch(`/wp/v2/pages/${ARCHIVE_PAGE_ID}?force=true`, { method: "DELETE" });
  console.log(`      ✓ Deleted page ${ARCHIVE_PAGE_ID}`);
} else {
  console.log(`[2/3] Skipped — page ${ARCHIVE_PAGE_ID} doesn't exist`);
}

if (mediaExists) {
  console.log(`[3/3] DELETE /wp/v2/media/${POSTER_MEDIA_ID}?force=true…`);
  await wpFetch(`/wp/v2/media/${POSTER_MEDIA_ID}?force=true`, { method: "DELETE" });
  console.log(`      ✓ Deleted media ${POSTER_MEDIA_ID}`);
} else {
  console.log(`[3/3] Skipped — media ${POSTER_MEDIA_ID} doesn't exist`);
}

console.log(`\nDone. Visit ${WP_BASE_URL}/ — IX video should be back, poster gone, archive page gone.`);
console.log(`(Hard-refresh / clear cache if site looks unchanged.)`);
