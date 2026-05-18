# Deployment

Short version for anyone (human or AI agent) shipping this site.

## How it deploys

- **Host:** Vercel — project `iaypaa10-website`, scope `jrsherlocks-projects`.
- **Production domain:** https://dotenagain.com (Vercel alias `iaypaa10-website.vercel.app`).
- **Auto-deploy:** the GitHub repo `jrsherlock/iaypaa10-website` is connected with
  **production branch = `main`**. Every push to `main` builds and deploys to
  **production** automatically. There is no PR/review step — `main` is live.

## The workflow (do this)

1. Work on `main`. Commit to `main`. Push `main`.
2. That's it — the push auto-deploys to production.
3. **Verify it actually went live** (see below). Don't assume.

**Single branch only.** Do **not** create long-lived feature branches and
fast-forward/sync them. A previous workflow pushed the *same commit SHA* to
`main` and a second branch seconds apart; Vercel dedupes by SHA, attributed the
build to the other branch as a *Preview*, and skipped the *production* deploy
for `main`. One branch, one SHA, no race.

## Verify a deploy went live

```bash
vercel inspect iaypaa10-website.vercel.app        # check url + created time
curl -s "https://dotenagain.com/?cb=$RANDOM" | grep <a-marker-from-your-change>
```

Browsers (and the `.vercel.app` edge) cache hard — always cache-bust when
checking, or you'll think nothing changed when it did.

## If a push didn't go live (manual override)

From the repo root:

```bash
vercel --prod --yes
```

This builds the current working tree and deploys it straight to production,
moving the alias. Proven reliable — use it whenever an auto-deploy didn't land.

## Gotchas / notes

- `vercel promote <url>` fails with "Deployment belongs to a different team"
  on the current CLI — don't rely on it; use `vercel --prod --yes` instead.
- `.vercel/project.json` `orgId` is `team_WTzr10mG5HUk1iKCrC7N9kX9` — this is
  **correct**; it's the internal id of the `jrsherlocks-projects` personal
  scope (slug ≠ id). Don't "fix" it.
- `LOOPS_API_KEY` is set in Vercel for Production + Preview (mailing-list
  signup `/api/subscribe` 503s without it). It is not in the repo; local dev
  reads it from `.env.local`.
- Vercel CLI may warn it's outdated; deploys still work.

## Rollback

`main` history is the source of truth. To undo a bad deploy: `git revert`
the offending commit on `main` and push (auto-deploys), then verify. If the
auto-deploy doesn't land, `vercel --prod --yes`.
