import { wpFetch, WP_BASE_URL } from "./lib.mjs";

const me = await wpFetch("/wp/v2/users/me?context=edit");
console.log(`Authenticated as: ${me.name} (id ${me.id}) — roles: ${me.roles?.join(", ") || "n/a"}`);
console.log(`Base: ${WP_BASE_URL}\n`);

const pages = await wpFetch("/wp/v2/pages?per_page=100&status=publish,draft,private&_fields=id,slug,title,status,parent,link,modified");
console.log(`Pages (${pages.length}):`);
for (const p of pages) {
  const title = p.title?.rendered || "(no title)";
  console.log(`  [${p.id}] ${p.status.padEnd(7)} ${p.slug.padEnd(30)} ${title}`);
}

const settings = await wpFetch("/wp/v2/settings");
console.log(`\nSite: "${settings.title}" — tagline: "${settings.description}"`);
console.log(`Front page setting: show_on_front=${settings.show_on_front}, page_on_front=${settings.page_on_front}, page_for_posts=${settings.page_for_posts}`);
