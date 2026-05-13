# IAYPAA X — Conference Website

The official website for **IAYPAA X**, the 10th Annual Iowa Young People in Alcoholics Anonymous conference, held **August 14–16, 2026** at The Highlander Hotel in Iowa City, Iowa. Theme: **Primordial Ooze**.

Production URL: [dotenagain.com](https://dotenagain.com)

---

## Purpose

This site is the public entry point for everyone interested in the conference. The single most important visitor flow is:

> Someone sees a poster at an AA meeting → scans the QR code with their phone → lands here.

That means the site is **mobile-first**, **fast**, and built to convert curious newcomers into informed (and eventually registered) attendees. Everything on the homepage answers the questions a first-time visitor has within seconds: *What is this? When is it? Where? How do I get in?*

The site also serves as the conference's lead-capture system — visitors who aren't ready to commit can join the mailing list and get nudged when registration opens, when the schedule drops, when merch is available, etc.

The legacy WordPress site at [iaypaa.org](https://iaypaa.org) is being reduced to a simple CTA that redirects here. Helper scripts for maintaining that legacy site live in [`scripts/wp/`](./scripts/wp/README.md).

---

## Audience and design priorities

The expected visitor is:

- On a phone, often a small/older device, possibly on a hotel or coffee-shop network
- A young person in recovery (or someone who supports one) — likely a stranger to the site
- Skim-reading, in public, in a meeting context — attention is short
- Curious whether this conference is *for them*

That shaped these design decisions:

| Decision | Why |
|---|---|
| **Mobile-first layout** | The QR-from-poster flow is the primary entry. Desktop is treated as a happy bonus. |
| **B-movie horror aesthetic ("Primordial Ooze")** | YPAA conference sites trend clean and corporate. We deliberately go the other way so the 10th annual feels singular, memorable, and unmistakably the work of young people. |
| **Dark theme by default** | Matches the theme; easier on the eyes in low-light meeting rooms; uses less battery on OLED phones. |
| **Conference info above the fold** | Date, location, edition number are visible immediately — no scroll required to answer "is this real and is it for me." |
| **Email capture on the homepage** | Most first-time visitors aren't ready to register. Capturing email is the realistic conversion. Powered by Loops (see [`docs/mailing-list.md`](./docs/mailing-list.md)). |
| **Static-first / no client-side data fetching** | Site is mostly statically generated. Loads fast on flaky cell signal, works behind aggressive corporate Wi-Fi filters. |
| **No analytics / no tracking pixels** | AA is anonymous by tradition. Loops is configured with open- and click-tracking off (see runbook). |
| **Single source of truth in `src/lib/constants.ts`** | Dates, venue, FAQ, past conferences, nav — all in one file so the webmaster updates content in one place, not scattered across components. |

---

## Tech stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (`@theme` design tokens in `src/app/globals.css`)
- **Animation:** Framer Motion + hand-rolled CSS keyframes for the ooze effects
- **Fonts:** A deliberate 5-face system — see below
- **Lead capture:** [Loops](https://loops.so) via `/api/subscribe`
- **Hosting:** Vercel

### Typography system

The site reads like a hand-made show flyer, so type is layered on purpose — each face has one job:

| Face | Variable | When |
|---|---|---|
| **Creepster** | `--font-creepster` | The drippy horror headline. The "movie title." Used sparingly. |
| **Anton** | `--font-anton` (`.font-anton`) | Chunky condensed woodtype for tabloid-style subheads and section labels — the "feature presentation" voice. |
| **Special Elite** | `--font-typewriter` (`.font-typewriter`) | Stamps, ticket stubs, captions, "rated YP" badges. The dispatch voice. |
| **Newsreader** | `--font-news` (`.font-news`) | The serif used the moment the costume comes off — for sincere passages about recovery, what IAYPAA actually is. |
| **Space Grotesk** | `--font-space` | General body copy where readability matters most. |
| **JetBrains Mono** | `--font-mono` | Countdown digits, dates, technical numerals. |

Mixing these is intentional: a real show flyer has 4–5 fonts on it. The rule is that each face has a single, repeatable role.

### Design tokens

The palette is derived from a [coolors.co](https://coolors.co/5fad56-f2c14e-f78154-4d9078-b4436c) scheme and exposed as Tailwind theme variables:

| Token | Hex | Role |
|---|---|---|
| `ooze-green` | `#5FAD56` | Primary accent, glows, CTAs |
| `swamp-teal` | `#4D9078` | Secondary accent |
| `gold` | `#F2C14E` | Highlights, links |
| `ember` | `#F78154` | Warm accents |
| `berry` | `#B4436C` | Cool accents |
| `void-black` | `#0D0D0D` | Page background |
| `dark-ooze` | `#0A1A12` | Section backgrounds |
| `toxic-green` | `#1B3B30` | Card backgrounds |
| `bone-white` | `#E8E6E1` | Body text |

---

## Project structure

```
src/
  app/                  # Next.js App Router routes
    page.tsx            # Homepage (hero, countdown, info, theme, signup)
    about/              # What IAYPAA is and what to expect
    registration/       # Coming-soon + early lead capture
    schedule/           # Day-by-day program (TBD shell)
    speakers/           # Speaker lineup (TBD shell)
    hotel/              # Venue details and booking link
    merch/              # Conference merch
    past-conferences/   # Editions I–IX
    outreach/           # How to get involved / committee
    faq/                # Common questions
    api/subscribe/      # POST -> Loops (email signup)
    layout.tsx          # Root layout: fonts, nav, footer, film grain
    globals.css         # Tailwind v4 theme + ooze keyframes
  components/
    sections/           # Full homepage sections (Hero, QuickInfoCards, ...)
    ui/                 # Reusable bits (CountdownTimer, GlowText, OozeButton, ...)
    effects/            # Atmosphere (FilmGrain, DrippingSlime, Scanlines, BubblingOoze)
    layout/             # Navbar (incl. NavDropdown), MobileMenu, Footer
    merch/              # Merch grid + cards
  lib/
    constants.ts        # CONFERENCE data, NAV_GROUPS, PAST_CONFERENCES, FAQ_ITEMS
public/
  images/               # Poster art, hotel photos, ooze textures
docs/
  mailing-list.md       # Loops setup + broadcast runbook
scripts/
  wp/                   # Helper scripts for the legacy iaypaa.org WP site
```

---

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in LOOPS_API_KEY
npm run dev
```

Open <http://localhost:3000>.

### Environment variables

| Variable | Required | Used by | Notes |
|---|---|---|---|
| `LOOPS_API_KEY` | yes (for signup) | `/api/subscribe` | Get from Loops -> Settings -> API. See [`docs/mailing-list.md`](./docs/mailing-list.md). |

The signup form will still render without the key, but submissions will fail server-side.

### Scripts

```bash
npm run dev      # Next dev server
npm run build    # Production build
npm run start    # Run the production build locally
npm run lint     # ESLint (Next.js config)
```

---

## Editing content

Most copy lives in **`src/lib/constants.ts`**. Update there once and it propagates to the homepage, footer, FAQ page, past-conferences page, and metadata. In particular:

- `CONFERENCE` — name, dates, venue, contact, social links
- `CONFERENCE.countdownTarget` — drives the homepage countdown
- `NAV_GROUPS` — desktop nav structure (grouped under "Event" and "Info" dropdowns)
- `NAV_LINKS` — flat list used by the footer and mobile menu
- `PAST_CONFERENCES` — historical edition list
- `FAQ_ITEMS` — the FAQ page

Page-specific prose (About, Hotel, Outreach, etc.) lives directly in each route's `page.tsx`.

---

## Deployment

The site deploys to Vercel on every push to `main`. Preview deployments are created automatically for other branches. Set `LOOPS_API_KEY` in the Vercel project settings for all environments where the signup should work (Production and Preview).

---

## Related

- **Mailing list runbook:** [`docs/mailing-list.md`](./docs/mailing-list.md)
- **Original implementation plan:** [`IAYPAA-X-IMPLEMENTATION-PLAN.md`](./IAYPAA-X-IMPLEMENTATION-PLAN.md) — kept as a design-intent reference; the live site has evolved from it
- **Legacy WP site tooling:** [`scripts/wp/README.md`](./scripts/wp/README.md)
