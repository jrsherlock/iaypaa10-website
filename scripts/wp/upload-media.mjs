import { readFileSync } from "node:fs";
import { basename } from "node:path";
import { wpFetch, WP_BASE_URL } from "./lib.mjs";

const args = process.argv.slice(2);
const apply = args.includes("--apply");
const positional = args.filter(a => !a.startsWith("--"));
const [filePath, titleArg] = positional;

if (!filePath) {
  console.error("usage: node scripts/wp/upload-media.mjs <filePath> [\"Title\"] [--apply]");
  process.exit(1);
}

const buf = readFileSync(filePath);
const filename = basename(filePath);
const ext = filename.split(".").pop().toLowerCase();
const mime = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp" }[ext];
if (!mime) throw new Error(`Unsupported extension: ${ext}`);

console.log(`Source:   ${filePath}`);
console.log(`Filename: ${filename}`);
console.log(`Size:     ${(buf.length / 1024).toFixed(1)} KB`);
console.log(`MIME:     ${mime}`);
console.log(`Title:    ${titleArg || "(auto from filename)"}`);

console.log("\n" + "─".repeat(60));
if (!apply) {
  console.log("DRY RUN — no upload performed. Re-run with --apply to upload.");
  process.exit(0);
}

console.log("APPLYING — uploading to WP media library…");
const created = await wpFetch("/wp/v2/media", {
  method: "POST",
  headers: {
    "Content-Type": mime,
    "Content-Disposition": `attachment; filename="${filename}"`,
  },
  body: buf,
});

if (titleArg) {
  await wpFetch(`/wp/v2/media/${created.id}`, {
    method: "POST",
    body: JSON.stringify({ title: titleArg, alt_text: titleArg }),
  });
}

console.log(`\n✓ Uploaded: media id ${created.id}`);
console.log(`  URL:    ${created.source_url}`);
console.log(`  Edit:   ${WP_BASE_URL}/wp-admin/post.php?post=${created.id}&action=edit`);
