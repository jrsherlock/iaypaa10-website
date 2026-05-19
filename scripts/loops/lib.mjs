import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { LoopsClient } from "loops";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../../.env.local");

// Hand-rolled .env.local reader — same approach as scripts/wp/lib.mjs so
// these scripts have no extra runtime deps beyond the official SDK.
function loadEnv() {
  const raw = readFileSync(envPath, "utf8");
  const env = {};
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

const env = loadEnv();
if (!env.LOOPS_API_KEY) {
  throw new Error("Missing LOOPS_API_KEY in .env.local");
}

export const loops = new LoopsClient(env.LOOPS_API_KEY);

/** The segment every website signup is tagged with (see /api/subscribe). */
export const USER_GROUP = "iaypaa-2026";

/** Transactional id of the welcome email (see docs/welcome-email.md). */
export const WELCOME_TRANSACTIONAL_ID =
  env.LOOPS_TRANSACTIONAL_WELCOME_ID || null;

/** Normalize an email the same way the API route does before hitting Loops. */
export function normalizeEmail(raw) {
  return String(raw || "").trim().toLowerCase();
}

/** Pull the first positional CLI arg (after `node script.mjs`). */
export function argEmail() {
  const raw = process.argv[2];
  if (!raw || raw.startsWith("--")) return null;
  return normalizeEmail(raw);
}

/** Destructive scripts require an explicit --apply, mirroring scripts/wp. */
export function isWriteAllowed() {
  return process.argv.includes("--apply");
}

export function banner(action) {
  const apply = isWriteAllowed();
  console.log("─".repeat(60));
  console.log(`${apply ? "APPLYING" : "DRY RUN"}: ${action}`);
  console.log(
    apply
      ? "(this WILL modify your live Loops list)"
      : "(no writes — pass --apply to commit)",
  );
  console.log("─".repeat(60));
  return apply;
}

/** Print an error from the SDK in a readable way and exit non-zero. */
export function fail(err) {
  console.error("\n✗ Loops request failed:");
  if (err && err.name) console.error(`  ${err.name}: ${err.message}`);
  else console.error(`  ${err}`);
  if (err && err.json) console.error("  ", JSON.stringify(err.json));
  process.exit(1);
}
