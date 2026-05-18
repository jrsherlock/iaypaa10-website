# AGENTS.md

Project guide for AI agents and contributors. This is the canonical project
doc (`CLAUDE.md` imports it).

## What this is

The official website for **IAYPAA X — the 10th Annual Iowa Young People in
Alcoholics Anonymous conference**, August 14–16, 2026, Iowa City, Iowa.
Theme: *Primordial Ooze*. Sole maintainer/webmaster: Jim Sherlock.

This is a real, live site for a recovery fellowship — not a demo. Treat copy,
tone, and uptime accordingly.

## Stack & commands

- **Next.js 16** (App Router) · **React 19** · **TypeScript** · **Tailwind v4**
- `npm run dev` — local dev
- `npm run build` — production build (run before shipping non-trivial changes)
- `npm run lint` — ESLint

Components are **React Server Components by default**; only add `"use client"`
when the component needs interactivity/state. Prefer server components.

## Where things live

- `src/app/<route>/page.tsx` — pages (one folder per route)
- `src/components/` — `sections/`, `layout/`, `ui/`, `effects/`
- `src/lib/constants.ts` — **single source of truth** for conference facts:
  dates, venue, nav, FAQ, pre-conference events, past conferences. Edit content
  here, not hardcoded in pages.
- `public/flyers/` — downloadable flyers (see `public/flyers/README.txt`);
  pre-conference event flyers are wired via the `flyer:` field in `constants.ts`
- `public/images/` — site imagery
- `docs/design-philosophy.md` — **read this before any visual change.** The
  aesthetic (drip/ooze, AA-flyer/ticket-stub/contact-sheet language, "the
  costume comes off" plain-serif moments) is intentional and codified.

## Custom Tailwind utilities

Defined in `src/app/globals.css`, reused across pages — prefer these over
ad-hoc styles for cohesion: `paper-grit`, `stamp`, `marquee-rule`,
`bg-rule-lines`, `bg-halftone-lg`, `poster-rise`, `animate-*`. Brand colors
are CSS vars: `void-black`, `bone-white`, `ooze-green`, `swamp-teal`, `gold`,
`ember`, `berry`, `toxic-green`.

## Content & tone (important)

This is an AA-affiliated event. Follow the spirit of the Twelve Traditions:

- **Anonymity (Tradition 11):** never publish full names or photos of members
  as AA members. Speakers/leads use **first name + last initial** only
  (e.g. "Dan K."). Don't add full names.
- **Self-supporting (Tradition 7):** no outside ads/sponsors; scholarships
  exist and "no one is turned away for lack of funds" — keep that promise in copy.
- **Tone:** warm, plain, sincere about recovery. The site uses a deliberate
  switch to plain serif ("the costume comes off") for the honest moments — don't
  flatten that into marketing voice.
- Keep facts consistent across pages (registration price, dates, hotel block).
  If you change one, grep for the others.

## Domains

- **dotenagain.com** — canonical production site (this repo). `CONFERENCE.siteUrl`.
- **iaypaa.org** — legacy AA-Advisory WordPress site (separate). It is the
  footer "iaypaa.org" link (`CONFERENCE.website`) and is *not* this repo. Do
  not point SEO/canonical at it.

## Deployment

See **`DEPLOYMENT.md`**. Short version:

- **Single branch: `main`.** Commit and push directly to `main`.
- Pushing `main` **auto-deploys to production** (Vercel, GitHub-connected).
- **Always deploy to production by default** — don't ask which environment.
- **Always verify the deploy actually went live** (cache-bust; alias can lag).
  Manual override if it didn't: `vercel --prod --yes` from repo root.
- Do not create long-lived feature branches / branch-sync dances — a same-SHA
  dual push to two branches breaks the production deploy (documented in
  `DEPLOYMENT.md`).

## Email / mailing list

`/api/subscribe` → **Loops**. `LOOPS_API_KEY` is set in Vercel (Production +
Preview) and in local `.env.local` (gitignored, not in the repo). Without it,
signup returns 503. See `docs/mailing-list.md` and `docs/welcome-email.md`.

## Gotchas

- `.env.local` holds real secrets — gitignored, never commit it.
- `.vercel/project.json` `orgId` looks like a foreign team id but is correct
  (internal id of the personal scope). Don't "fix" it.
- Tailwind v4 — config/utilities live in `globals.css`, not a JS config.
