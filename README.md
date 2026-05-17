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
| **"Emergence, not horror" aesthetic ("Primordial Ooze")** | The theme is read for its real meaning — life cohering out of formless muck, mapped onto the Big Book's arc from the "jumping-off place" to a new life. Dark and singular, but hopeful, never a creature-feature. The full rationale and component rules are in [`docs/design-philosophy.md`](./docs/design-philosophy.md). |
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
- **Animation:** Hand-rolled CSS keyframes for the ambient effects (rising motes, slow formation); Framer Motion on the merch grid
- **Fonts:** A deliberate multi-face system — see below
- **Lead capture:** [Loops](https://loops.so) via `/api/subscribe`
- **Hosting:** Vercel

### Typography system

Type is layered on purpose — each face has one job. (Creepster, the old drippy horror headline face, was retired in the redesign; see [`docs/design-philosophy.md`](./docs/design-philosophy.md).)

| Face | Variable | When |
|---|---|---|
| **Anton** | `--font-anton` (`.font-anton`) | The primary headline face. Heavy, condensed — structure formed out of the soft stuff. All page/section headings. |
| **Newsreader** | `--font-news` (`.font-news`) | The serif voice — sincere passages about recovery and what IAYPAA actually is. The Big Book register. |
| **Special Elite** | `--font-typewriter` (`.font-typewriter`) | Humble captions, dates, small labels only — the quiet meeting-list voice. (No longer used for rubber "stamps".) |
| **Space Grotesk** | `--font-space` | General body copy where readability matters most. |
| **JetBrains Mono** | `--font-mono` | Countdown digits, dates, technical numerals. |

Each face has a single, repeatable role.

### Design tokens

The palette is derived from a [coolors.co](https://coolors.co/5fad56-f2c14e-f78154-4d9078-b4436c) scheme and exposed as Tailwind theme variables. Hex values are unchanged from the original scheme, but the redesign reframed their *intent* (green reads as "first light," not "toxic"; warm amber is life emerging from cold) — see [`docs/design-philosophy.md`](./docs/design-philosophy.md) §3.

| Token | Hex | Role |
|---|---|---|
| `ooze-green` | `#5FAD56` | Primary accent / first light — glows, CTAs |
| `swamp-teal` | `#4D9078` | The cold deep before life — secondary accent |
| `gold` | `#F2C14E` | Warmth emerging from cold — highlights, links |
| `ember` | `#F78154` | Heat of formation — warm accents (sparing) |
| `berry` | `#B4436C` | Cool accent |
| `void-black` | `#0D0D0D` | The lightless origin — page background |
| `dark-ooze` | `#0A1A12` | Depth — section backgrounds |
| `toxic-green` | `#1B3B30` | Deep strata — card backgrounds (name kept; intent is "strata," not "poison") |
| `bone-white` | `#E8E6E1` | Body text |

---

## Project structure

```
src/
  app/                  # Next.js App Router routes
    page.tsx            # Homepage (hero, countdown, info, theme, signup)
    about/              # What IAYPAA is and what to expect
    registration/       # Lead capture + ticket info
    schedule/           # Day-by-day program (built from the working timeline)
    pre-conference/     # Lead-up events; past = greyed archive, upcoming = full colour
    speakers/           # Speaker lineup (TBD shell)
    hotel/              # Venue details and booking link
    merch/              # Conference merch
    past-conferences/   # Editions I–IX
    outreach/           # How to get involved / committee
    faq/                # Common questions
    api/subscribe/      # POST -> Loops (email signup)
    layout.tsx          # Root layout: fonts, nav, footer
    globals.css         # Tailwind v4 theme + formation/depth keyframes
  components/
    sections/           # Full homepage sections (Hero, QuickInfoCards, ...)
    ui/                 # Reusable bits (CountdownTimer, GlowText, OozeButton, ComingSoon, ...)
    effects/            # Atmosphere (RisingMotes, BubblingOoze)
    layout/             # Navbar (incl. NavDropdown), MobileMenu, Footer
    merch/              # Merch grid + cards
  lib/
    constants.ts        # CONFERENCE, NAV_GROUPS/NAV_LINKS, PAST_CONFERENCES,
                        #   PRE_CONFERENCE_EVENTS, FAQ_ITEMS
public/
  images/               # Poster art, hotel photos, ooze textures
docs/
  design-philosophy.md  # "Emergence, not horror" — design north star + component audit
  mailing-list.md       # Loops setup + broadcast runbook
  welcome-email.md      # Welcome-email copy (+ .html) for the Loops automation
scripts/
  loops/                # Loops maintenance tooling (official SDK)
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
- `PRE_CONFERENCE_EVENTS` — lead-up events; the `/pre-conference` page sorts and splits past/upcoming automatically by `date`
- `FAQ_ITEMS` — the FAQ page

Page-specific prose (About, Hotel, Outreach, etc.) lives directly in each route's `page.tsx`.

---

## Deployment

The site deploys to Vercel on every push to `main`. Preview deployments are created automatically for other branches. Set `LOOPS_API_KEY` in the Vercel project settings for all environments where the signup should work (Production and Preview).

---

## Related

- **Design philosophy:** [`docs/design-philosophy.md`](./docs/design-philosophy.md) — the "emergence, not horror" north star and the component audit the redesign followed
- **Mailing list runbook:** [`docs/mailing-list.md`](./docs/mailing-list.md)
- **Original implementation plan:** [`IAYPAA-X-IMPLEMENTATION-PLAN.md`](./IAYPAA-X-IMPLEMENTATION-PLAN.md) — kept as a design-intent reference; the live site has evolved from it
- **Legacy WP site tooling:** [`scripts/wp/README.md`](./scripts/wp/README.md)
