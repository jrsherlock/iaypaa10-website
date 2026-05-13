import { wpFetch } from "./lib.mjs";

const src = await wpFetch(`/wp/v2/pages/1906?context=edit`);
console.log(`Page 1906 featured_media: ${src.featured_media}`);
console.log(`Page 1906 _links keys: ${Object.keys(src._links || {}).join(", ")}`);

if (src.featured_media) {
  const media = await wpFetch(`/wp/v2/media/${src.featured_media}`);
  console.log(`  featured media [${media.id}]: ${media.media_type} — ${media.source_url}`);
}

const dup = await wpFetch(`/wp/v2/pages/2413?context=edit`);
console.log(`Page 2413 featured_media: ${dup.featured_media}`);

const html = src.content.raw;
console.log(`\nSearching post_content for video signals…`);
const patterns = [
  ["<video", "<video tag"],
  ["youtube", "youtube"],
  ["vimeo", "vimeo"],
  ["mp4", "mp4 file"],
  ["webm", "webm file"],
  ["wp:video", "wp:video block"],
  ["wp:embed", "wp:embed block"],
  ["wp:kubio/video", "kubio video block"],
  ["videoUrl", "videoUrl prop"],
  ["bgVideo", "bgVideo prop"],
];
for (const [needle, label] of patterns) {
  const count = (html.toLowerCase().match(new RegExp(needle.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
  console.log(`  ${label.padEnd(20)} ${count > 0 ? `FOUND (${count} matches)` : "—"}`);
}

console.log(`\nFetching live homepage HTML to locate the video element…`);
const liveRes = await fetch("https://iaypaa.org/");
const liveHtml = await liveRes.text();
const videoMatches = [...liveHtml.matchAll(/<video[^>]*>[\s\S]{0,400}?<\/video>/g)];
console.log(`  <video> tags on live homepage: ${videoMatches.length}`);
for (const m of videoMatches.slice(0, 3)) {
  console.log(`    ${m[0].slice(0, 350).replace(/\s+/g, " ")}`);
}
const iframeMatches = [...liveHtml.matchAll(/<iframe[^>]*(?:youtube|vimeo)[^>]*>/gi)];
console.log(`  <iframe> youtube/vimeo on live homepage: ${iframeMatches.length}`);
for (const m of iframeMatches.slice(0, 3)) {
  console.log(`    ${m[0].slice(0, 250).replace(/\s+/g, " ")}`);
}
