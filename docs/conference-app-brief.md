# IAYPAA X — Conference Brief & App Foundation

> A single reference for building the **official IAYPAA X mobile app**. Pulls
> together the event facts, the mission, the design system, the data
> integrations, and a derived feature map. Everything here is drawn from the
> live conference site (`2026.iaypaa.org`) and its source of truth,
> `src/lib/constants.ts`.
>
> **Last compiled:** June 2026. **Authoritative source:** this repo's
> `src/lib/constants.ts` (facts), `docs/design-philosophy.md` (design),
> `src/app/globals.css` (tokens). When in doubt, those files win over this one.

---

## 1. Event at a glance

| | |
|---|---|
| **Name** | IAYPAA X |
| **Full name** | Iowa Young People in Alcoholics Anonymous |
| **Edition** | 10th Annual |
| **Theme** | *Primordial Ooze* |
| **Dates** | **August 14–16, 2026** (Fri–Sun) |
| **Location** | Iowa City, Iowa |
| **Venue** | The Highlander Hotel, 2525 Highlander Place, Iowa City, IA 52245 · (319) 354-2000 |
| **Registration** | Early Bird **$20** full weekend pass (price rises; at-the-door TBA) |
| **Hotel block** | **$119/night** at the Highlander — Choice Hotels group code **cv26l2** |
| **Canonical site** | https://2026.iaypaa.org |
| **Legacy site** | https://iaypaa.org (older AA-Advisory WordPress site; not canonical) |
| **Contact** | iaypaa10@gmail.com |
| **Instagram** | [@iaypaa](https://www.instagram.com/iaypaa) |
| **Registration link** | https://my.cheddarup.com/c/iaypaa-x-registrations/items |
| **Hotel booking link** | https://www.choicehotels.com/reservations/groups/cv26l2 |

---

## 2. Mission & what IAYPAA is

**IAYPAA = Iowa Young People in Alcoholics Anonymous.** It's a fellowship of
young people in AA who organize an annual conference to **carry the message of
recovery to young alcoholics across Iowa and beyond**.

Core promises and posture (carry these into the app's tone and policy):

- **Everyone is welcome.** You do *not* have to be "young," and you do not have
  to know anyone. Anyone with a desire to stop drinking — or who supports
  someone in recovery — is welcome. No age requirement.
- **A weekend of recovery + fun.** Speaker meetings, panel discussions,
  workshops, fellowship, and social events (dance parties, games, themed
  events). "We prove that sobriety is anything but boring."
- **First-timers belong.** "Never been to a YPAA conference before? Just show
  up. We'll take it from there."

### It is an AA event — built on the Twelve Traditions

This is **not** a generic event app. It must respect AA's Traditions:

- **Anonymity (Tradition 11):** **Never publish full names or photos of members
  as AA members.** Speakers/leads are shown as **first name + last initial**
  only (e.g. "Dan K."). This applies to the app's speaker lists, schedules,
  push notifications, social sharing, and any user-generated content.
- **Self-supporting (Tradition 7):** **No outside ads or sponsors.** The
  conference funds itself through its own contributions. Don't add ad networks,
  paid placements, or third-party sponsorships to the app.
- **No one turned away for lack of funds.** Scholarships exist; keep that
  promise visible and make asking easy and *quiet* (private, low-friction).
- **Voice:** warm, plain, sincere about recovery. Borrow the Big Book's
  register — "quietly certain," never ironic or salesy.

### Where it sits inside A.A. (reference material)

IAYPAA is a YPAA conference under the broader **ICYPAA** umbrella (International
Conference of Young People in A.A., since 1958). The About page links primary
sources that situate young-people's conferences inside A.A.:

- Bill W.'s letter to the first ICYPAA gathering
- *Box 459* — G.S.O. bulletins "Discussing ICYPAA" (1986 and 2005)
- Bill W.'s "hippies & young people" letter (AA Grapevine, June 2004)
- ICYPAA: https://www.icypaa.org/about-icypaa

---

## 3. The theme — *Primordial Ooze*

**The one-line meaning:** *We were the ooze, and something alive came out of
it.* The theme is **abiogenesis** — life cohering out of formless, lifeless
muck when energy and time are applied — mapped onto recovery:

| Primordial ooze | Recovery (the Big Book) |
|---|---|
| Formless, lifeless muck | The "jumping-off place," demoralization |
| Energy + structure over time | The steps, the fellowship, the daily reprieve |
| Life slowly cohering | The spiritual awakening that "develops slowly over time" |
| Something alive rises | "A new freedom and a new happiness" / "the turning point" |

**The guiding principle (north star):** **_Emergence, not horror._** Every
design and copy choice should feel like *something living rising out of the
dark* — not something dead lunging at you.

- Horror points **down and back** (fear, recoil, the past). ❌
- Emergence points **up and forward** (awe, warmth, the turning point). ✅
- Same darkness, same green — **opposite emotional vector.**

**The one-line test for any element** (texture, animation, word, color):
> *Does this feel like life arriving, or like something rotting?* Keep the
> first; cut the second. If it makes someone flinch or smirk, it's wrong. If it
> makes them lean in, it's right.

> ⚠️ Explicitly **retired**: the B-movie/horror "costume" — slime-as-monster,
> VHS scanlines, film grain, "RATED YP," reels/showtimes, drippy horror fonts
> (Creepster), neon-toxic glow, xerox-flyer kit. Don't reintroduce these in the
> app. The theme is strong enough that you never wink at it.

---

## 4. Brand & design system

### Color palette (exact hex)

| Token | Hex | Role |
|---|---|---|
| **ooze-green** | `#5FAD56` | "First light / living glow" — primary accent (was "toxic warning") |
| **swamp-teal** | `#4D9078` | The cold deep before life |
| **gold** | `#F2C14E` | **Warmth emerging from cold — the core story beat.** Primary CTA / highlight |
| **ember** | `#F78154` | Heat of formation — use sparingly (hover/accent) |
| **berry** | `#B4436C` | Rare secondary accent |
| **void-black** | `#0D0D0D` | The lightless origin — primary background |
| **dark-ooze** | `#0A1A12` | Depth, not menace |
| **toxic-green** | `#1B3B30` | "Deep strata" (dark green panels) — treat as depth, not poison |
| **bone-white** | `#E8E6E1` | Primary text on dark |

Palette story: **cold muck → warm life.** Void-black/teal depth resolving
toward a single warm amber (gold) light.

### Typography

- **Display / headlines — Anton** (heavy, condensed). Reads as structure that
  *solidified* out of the soft stuff. Fallback: Impact, sans-serif.
- **Plain-spoken voice — Newsreader** (serif). Reserved for the honest moments
  the site "speaks plainly about recovery" — the Big Book register. Fallback:
  Iowan Old Style, Georgia, serif.
- **Captions / small labels — Special Elite** (typewriter). *Demoted* to humble
  meeting-list captions (times, rooms, small labels) — **never** a "rubber
  stamp." Fallback: Courier New, monospace.
- **Body / UI — Space Grotesk** (sans). Default UI text. Fallback: sans-serif.
- **Mono — JetBrains Mono** (data, countdown digits, technical labels).

### Motion & texture principles

- **Everything settles, coalesces, surfaces, or grows.** Slow reveals; things
  drifting **upward**; layers building. **The drip becomes a rise.**
- Glow is a **single soft warm halo** (like faint luminescence through dark
  water), not a multi-layer neon sign.
- Texture is **geological / biological** — sediment, strata, mineral grain,
  condensation, accretion — never cinematic (no scanlines, no animated grain).
- Page-load = one orchestrated, calm, staggered **rise** (not scattered twitch).

### Signature motifs (for parity with the web app)

- Rising motes / bubbling-ooze background (slow, deep, calm).
- Staggered "poster-rise" entrance on load.
- Framed date/venue "stamp" (clean hairline border, tracked caption — not a
  rotated rubber stamp).
- Countdown to Aug 14, 2026 (compute live on-device; never bake a static value).

---

## 5. Conference logistics

### Registration & pricing
- **Early Bird: $20** for a full weekend pass. Limited-time; price goes up.
- At-the-door pricing announced closer to the conference.
- **Scholarships available; no one is turned away for lack of funds.** Asking
  should be private/quiet.
- Current registration handled via CheddarUp:
  `https://my.cheddarup.com/c/iaypaa-x-registrations/items`

### Venue & hotel
- **The Highlander Hotel**, 2525 Highlander Place, Iowa City, IA 52245 ·
  (319) 354-2000 · https://www.highlanderhotel.us
- **Group room block: $119/night**, Choice Hotels group code **cv26l2**.
- Book: `https://www.choicehotels.com/reservations/groups/cv26l2`
- Amenities shown on site: indoor pool, lobby/lounge, guest rooms.

### Program & speakers (status: not yet public)
- The day-by-day **schedule, featured speakers, and workshop list are gated**
  pending AA Advisory committee approval (`PROGRAM_PUBLIC = false`). Until then,
  the app should show a "still forming" state, not placeholders that dead-end.
- Program content, once approved, will include keynote/speaker meetings, panel
  discussions, workshops, fellowship + social events, running all weekend.

---

## 6. Pre-conference events (lead-up)

Run-up gatherings before the Aug 14–16 conference. (Source:
`PRE_CONFERENCE_EVENTS` in `constants.ts`. Some have downloadable flyers.)

| Date | Event | Time | Location |
|---|---|---|---|
| Jun 14, 2026 | Sweet Speakers and Sweet Bake Off | 1:00–4:00 PM | The Last Chance — 4711 44th St, Unit 5, Rock Island, IL |
| Jun 27, 2026 | AA Pride Party | 4:00–7:00 PM | Happy Hollow Park — 800 Brown St, Iowa City, IA |
| Jul 4, 2026 | Picnic in the Park | 1:00–4:00 PM | Lower City Park — 200 Park Rd, Iowa City, IA |
| Jul 11, 2026 | Yoga & Meditation in the Park | 10:00 AM–12:00 PM | City Park — 200 Park Rd, Iowa City, IA |
| Jul 17, 2026 | Virtual AA Panel | 7:00–8:30 PM | On Zoom |
| Aug 1, 2026 | Kick-Off Event (Spaghetti Dinner) | 5:00–8:00 PM | Zion Lutheran Church — 310 N Johnson St, Iowa City, IA |

Each event has: id, title, date (+optional end date), time, location/city,
description, and optional `flyer` (PDF) + `flyerThumb` (image) + extra link.

---

## 7. Conference history

| Year | Edition | Location | Theme |
|---|---|---|---|
| 2017 | I | Des Moines, IA | The Beginning |
| 2018 | II | Iowa City, IA | A New Hope |
| 2019 | III | Cedar Rapids, IA | Under the Big Top |
| 2020 | IV | Virtual | Together Apart |
| 2021 | V | Des Moines, IA | The Roaring Recovery |
| 2022 | VI | Iowa City, IA | Camp IAYPAA |
| 2023 | VII | Cedar Rapids, IA | IAYPAA in Wonderland |
| 2024 | VIII | Des Moines, IA | IAYPAA in Space |
| 2025 | IX | Iowa City, IA | Disco Fever |
| **2026** | **X** | **Iowa City, IA** | **Primordial Ooze** |

---

## 8. FAQ (verbatim from the site)

- **What is IAYPAA?** — Iowa Young People in Alcoholics Anonymous; a fellowship
  of young people in AA who organize an annual conference to carry the message
  of recovery to young alcoholics across Iowa and beyond.
- **Do I have to be "young" to attend?** — No. Anyone with a desire to stop
  drinking, or who supports someone in recovery, is welcome. No age requirement.
- **What happens at a conference?** — Speaker meetings, panels, workshops,
  fellowship events, and social activities centered on recovery.
- **How much does it cost?** — Early Bird $20 full weekend pass (rising);
  at-the-door TBA; scholarships available, no one turned away for lack of funds.
- **Where is IAYPAA X?** — The Highlander Hotel, Iowa City, Aug 14–16, 2026.
- **Is this an AA event?** — Yes, organized in the spirit of the Twelve
  Traditions; self-supporting; no outside funding.
- **How can I get involved?** — Outreach page: committee positions and service
  opportunities.
- **What is the Primordial Ooze theme?** — Where life begins; the formless place
  every one of us started from, and the new life that comes up out of it when
  you stop trying to do it alone.

---

## 9. Information architecture (web → app parity)

The website's sections, useful as a baseline app tab/screen map:

- **Home** (hero, live countdown, mailing-list signup)
- **Registration** (price, scholarships, register CTA)
- **Schedule** (gated until Advisory approval)
- **Speakers** (gated)
- **Hotel & Venue** (room block, booking, amenities, map)
- **About** (mission + AA-fellowship references)
- **FAQ**
- **Past Conferences**
- **Outreach** (get involved / committee / service)
- **Pre-Conference Events**
- **Merch**
- **Stay In the Loop** (mailing list)

---

## 10. Data, integrations & backend (for app engineering)

- **Source of truth for facts:** `src/lib/constants.ts` (`CONFERENCE`,
  `PAST_CONFERENCES`, `PRE_CONFERENCE_EVENTS`, `FAQ_ITEMS`, `NAV_*`,
  `PROGRAM_PUBLIC`). **Recommendation:** expose this as a small JSON endpoint or
  shared package so the app and website never drift. Today it's compile-time
  TypeScript, not a public API.
- **Email / mailing list → Loops.** The site posts to:
  - `POST /api/subscribe` — fields: `firstName`, `lastInitial`, `email`,
    `homeGroup?`, `consent`, `website` (honeypot). Upserts a Loops contact
    (`userGroup: "iaypaa-2026"`, `source: "website"`, `subscribed: true`) and
    fires a `signedUp` event. Requires `LOOPS_API_KEY`.
  - `POST /api/contact` — same shape; `source: "contact-form"`, fires a
    `contactedUs` event with the message; deliberately omits `subscribed`.
  - The app can reuse these endpoints for signup/contact. Note Loops has **no
    "list all contacts" API** — bulk views are dashboard/export only.
  - ⚠️ **Welcome email is not live yet** (transactional/sending-domain pending).
    Don't assume new signups receive an automated welcome.
- **Analytics:** Vercel Web Analytics (cookieless, privacy-friendly) on the web
  app. For the mobile app, choose a privacy-respecting analytics approach
  consistent with AA anonymity (no PII, no cross-linking identities).
- **Hosting/stack (web):** Next.js 16 (App Router), React 19, TypeScript,
  Tailwind v4, deployed on Vercel; auto-deploys from `main`.
- **External services in play:** CheddarUp (registration), Choice Hotels (room
  block), Loops (email), Instagram (@iaypaa).

---

## 11. Suggested app feature map (derived)

A first-pass set of features that fit the event and the Traditions:

1. **Schedule / agenda** with personal favorites + reminders (respect anonymity
   in speaker labels: first name + last initial only). Gate until program is
   approved.
2. **Speakers/panels** (first name + last initial; no member photos-as-AA).
3. **Venue & maps** — Highlander Hotel, room block CTA (code cv26l2), parking,
   hospitality.
4. **Registration** — deep link to CheddarUp; surface scholarship ask quietly.
5. **Pre-conference events** — list with flyers, RSVP/links, add-to-calendar.
6. **Push notifications** — schedule changes, "event starting soon," program
   drops. Keep copy warm/plain; no PII.
7. **Mailing list / contact** — reuse `/api/subscribe` + `/api/contact`.
8. **Merch** — link out.
9. **Recovery-first niceties** — meeting/quiet-room finder, "first time here?"
   onboarding, anonymity reminder, sobriety countdown, helpline/contact.
10. **Live countdown** to Aug 14, 2026 (compute on-device).

**Hard constraints to bake into the app from day one:** anonymity (Tradition
11), self-supporting/no ads (Tradition 7), scholarships visible, warm/plain
voice, *emergence-not-horror* aesthetic, and the exact palette/type above.

---

## 12. Open / TBD items

- Final **program, speakers, and workshops** (gated pending Advisory approval).
- **At-the-door pricing.**
- **Welcome email** automation (sending domain / transactional not finished).
- A **public data API** (currently facts live only in `constants.ts`).
- Whether registration/payments move off CheddarUp.

---

### Quick reference — assets & links
- Site: https://2026.iaypaa.org · Legacy: https://iaypaa.org
- Register: https://my.cheddarup.com/c/iaypaa-x-registrations/items
- Hotel: https://www.choicehotels.com/reservations/groups/cv26l2 (code cv26l2, $119/night)
- Email: iaypaa10@gmail.com · Instagram: https://www.instagram.com/iaypaa
- Design north star: `docs/design-philosophy.md` · Tokens: `src/app/globals.css` · Facts: `src/lib/constants.ts`
