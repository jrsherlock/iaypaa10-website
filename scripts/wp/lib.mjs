import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../../.env.local");

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
const required = ["WP_BASE_URL", "WP_USERNAME", "WP_APP_PASSWORD"];
for (const key of required) {
  if (!env[key]) throw new Error(`Missing ${key} in .env.local`);
}

const authHeader =
  "Basic " +
  Buffer.from(`${env.WP_USERNAME}:${env.WP_APP_PASSWORD}`).toString("base64");

export const WP_BASE_URL = env.WP_BASE_URL.replace(/\/$/, "");

export async function wpFetch(path, init = {}) {
  const [route, query = ""] = path.split("?");
  const qs = query ? `&${query}` : "";
  const url = `${WP_BASE_URL}/?rest_route=${encodeURIComponent(route)}${qs}`;
  const headers = {
    Authorization: authHeader,
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(init.headers || {}),
  };
  const res = await fetch(url, { ...init, headers });
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  if (!res.ok) {
    const err = new Error(`WP ${init.method || "GET"} ${path} → ${res.status}`);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

export function isWriteAllowed() {
  return process.argv.includes("--apply");
}

export function previewBanner(action) {
  const apply = isWriteAllowed();
  console.log("─".repeat(60));
  console.log(`${apply ? "APPLYING" : "DRY RUN"}: ${action}`);
  console.log(apply ? "(writes WILL be sent to iaypaa.org)" : "(no writes — pass --apply to commit)");
  console.log("─".repeat(60));
  return apply;
}
