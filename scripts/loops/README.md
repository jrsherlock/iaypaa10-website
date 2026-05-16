# Loops helper scripts

Small Node scripts for inspecting and maintaining the IAYPAA X mailing
list in [Loops](https://loops.so), using the official `loops` SDK.
Mirrors the conventions in `scripts/wp/`: reads `LOOPS_API_KEY` from
`.env.local`, no extra runtime deps, destructive actions need `--apply`.

The signup flow itself lives in `src/app/api/subscribe/route.ts`; these
scripts are for the maintenance side (testing, lookups, cleanup).

## Scripts

| Script | What it does |
|---|---|
| `test-key.mjs` | Confirms the API key in `.env.local` is valid. |
| `find-contact.mjs <email>` | Prints a single contact record. |
| `send-test-event.mjs <email> [--apply]` | Fires a `signedUp` event (same shape the form sends) to exercise the welcome Loop without using the website. |
| `delete-contact.mjs <email> [--apply]` | Deletes a contact. Prints it first; dry-run unless `--apply`. |

## Usage

```bash
node scripts/loops/test-key.mjs
node scripts/loops/find-contact.mjs jsherlock+iaypaatest@cybercade.com
node scripts/loops/send-test-event.mjs you+test@example.com --apply
node scripts/loops/delete-contact.mjs old+test@example.com --apply
```

Destructive scripts (`delete-contact`, `send-test-event`) are **dry-run by
default** and print what they would do. Add `--apply` to commit.

## Why not a "list everyone" / export script?

Loops has **no list/filter contacts API** — the SDK only looks contacts
up one at a time by email or userId. Bulk export is dashboard-only:

> Loops → Contacts → filter `userGroup = iaypaa-2026` → Export CSV

That export path (and the monthly backup cadence) is documented in
[`docs/mailing-list.md`](../../docs/mailing-list.md).
