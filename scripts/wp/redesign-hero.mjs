import { writeFileSync, mkdirSync } from "node:fs";
import { wpFetch, WP_BASE_URL } from "./lib.mjs";

const apply = process.argv.includes("--apply");
const tpId = "kubio//front-header";

const POSTER_ID = 2414;
const POSTER_URL = "https://iaypaa.org/wp-content/uploads/2026/05/primordial-ooze-poster.jpg";
const ARCHIVE_PAGE_ID = 2413;
const ARCHIVE_URL = `${WP_BASE_URL}/?page_id=${ARCHIVE_PAGE_ID}`;
const DOTENAGAIN_URL = "https://dotenagain.com";

const NEW_HERO = `<!-- wp:cover {"overlayColor":"black","isUserOverlayColor":true,"dimRatio":100,"minHeight":85,"minHeightUnit":"vh","align":"full","style":{"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"1.5rem","right":"1.5rem"}}}} -->
<div class="wp-block-cover alignfull" style="padding-top:3rem;padding-right:1.5rem;padding-bottom:3rem;padding-left:1.5rem;min-height:85vh"><span aria-hidden="true" class="wp-block-cover__background has-black-background-color has-background-dim-100 has-background-dim"></span><div class="wp-block-cover__inner-container">
<!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"clamp(2.5rem, 6vw, 5rem)","fontWeight":"800","letterSpacing":"0.02em","textTransform":"uppercase"}},"textColor":"white"} -->
<h1 class="wp-block-heading has-text-align-center has-white-color has-text-color" style="font-size:clamp(2.5rem, 6vw, 5rem);font-weight:800;letter-spacing:0.02em;text-transform:uppercase">IAYPAA X &middot; Primordial Ooze</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"white","style":{"typography":{"fontSize":"1.25rem","letterSpacing":"0.05em"}}} -->
<p class="has-text-align-center has-white-color has-text-color" style="font-size:1.25rem;letter-spacing:0.05em">Iowa Conference of Young People in AA &middot; August 14–16, 2026 &middot; Iowa City</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":${POSTER_ID},"width":"min(420px, 80vw)","sizeSlug":"large","linkDestination":"custom","align":"center","style":{"border":{"radius":"8px"}}} -->
<figure class="wp-block-image aligncenter size-large is-resized has-custom-border"><a href="${DOTENAGAIN_URL}"><img src="${POSTER_URL}" alt="IAYPAA X 2026 Primordial Ooze Poster" class="wp-image-${POSTER_ID}" style="border-radius:8px;width:min(420px, 80vw)"/></a></figure>
<!-- /wp:image -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center","flexWrap":"wrap"},"style":{"spacing":{"blockGap":"1rem","margin":{"top":"2rem"}}}} -->
<div class="wp-block-buttons" style="margin-top:2rem">
<!-- wp:button {"style":{"color":{"background":"#7CFF3F","text":"#0a0a0a"},"typography":{"fontWeight":"700","fontSize":"1.05rem","textTransform":"uppercase","letterSpacing":"0.05em"},"spacing":{"padding":{"top":"0.85rem","bottom":"0.85rem","left":"1.75rem","right":"1.75rem"}},"border":{"radius":"4px"}}} -->
<div class="wp-block-button has-custom-font-size" style="font-size:1.05rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase"><a class="wp-block-button__link has-text-color has-background wp-element-button" href="${DOTENAGAIN_URL}" style="border-radius:4px;color:#0a0a0a;background-color:#7CFF3F;padding-top:0.85rem;padding-right:1.75rem;padding-bottom:0.85rem;padding-left:1.75rem">Visit dotenagain.com →</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"is-style-outline","style":{"color":{"text":"#ffffff"},"border":{"width":"1px","color":"#ffffff","radius":"4px"},"typography":{"fontWeight":"600","fontSize":"1.05rem","textTransform":"uppercase","letterSpacing":"0.05em"},"spacing":{"padding":{"top":"0.85rem","bottom":"0.85rem","left":"1.75rem","right":"1.75rem"}}}} -->
<div class="wp-block-button is-style-outline has-custom-font-size" style="font-size:1.05rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase"><a class="wp-block-button__link has-text-color wp-element-button" href="${ARCHIVE_URL}" style="border-radius:4px;border-color:#ffffff;border-width:1px;color:#ffffff;padding-top:0.85rem;padding-right:1.75rem;padding-bottom:0.85rem;padding-left:1.75rem">View 2025 Conference Archive →</a></div>
<!-- /wp:button -->
</div>
<!-- /wp:buttons -->
</div></div>
<!-- /wp:cover -->`;

const tp = await wpFetch(`/wp/v2/template-parts/${tpId}?context=edit`);
const html = tp.content.raw;

const heroOpener = "<!-- wp:kubio/hero ";
const heroCloser = "<!-- /wp:kubio/hero -->";
const start = html.indexOf(heroOpener);
const closeIdx = html.indexOf(heroCloser);
if (start === -1 || closeIdx === -1) {
  console.error("FATAL: could not locate <kubio/hero> block in front-header.");
  process.exit(2);
}
const end = closeIdx + heroCloser.length;

if ((html.match(/<!-- wp:kubio\/hero /g) || []).length > 1) {
  console.error("FATAL: more than one kubio/hero block found. Refusing to guess.");
  process.exit(2);
}

const oldBlock = html.slice(start, end);
const newHtml = html.slice(0, start) + NEW_HERO + html.slice(end);

mkdirSync("scripts/wp/snapshots", { recursive: true });
const backupPath = `scripts/wp/snapshots/template-part-front-header.before-redesign.json`;
writeFileSync(backupPath, JSON.stringify(tp, null, 2));
console.log(`Backup written: ${backupPath}`);

console.log(`\nReplacing kubio/hero block at offset ${start}–${end}`);
console.log(`  Old length: ${oldBlock.length} chars (Kubio hero: splatter bg, h1 'Match Calamity', subtitle, 'Thank you for everything', poster)`);
console.log(`  New length: ${NEW_HERO.length} chars (Gutenberg cover: solid black bg, h1 'IAYPAA X · Primordial Ooze', date/city tagline, poster, 2 CTA buttons)`);
console.log(`\nFront-header total: ${html.length} → ${newHtml.length} chars`);

console.log(`\nNew hero will link to:`);
console.log(`  Primary CTA:   ${DOTENAGAIN_URL}`);
console.log(`  Secondary CTA: ${ARCHIVE_URL}  (page 2413 — must be published or this 404s)`);

if (!apply) {
  console.log("\nDRY RUN — no write. Re-run with --apply to send.");
  process.exit(0);
}

const res = await wpFetch(`/wp/v2/template-parts/${tpId}`, {
  method: "PUT",
  body: JSON.stringify({ content: newHtml }),
});
console.log(`✓ Updated. New front-header length: ${res.content?.raw?.length || "?"} chars`);
console.log(`Visit ${WP_BASE_URL}/ to confirm.`);
