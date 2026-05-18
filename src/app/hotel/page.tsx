import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Image from "next/image";
import RisingMotes from "@/components/effects/RisingMotes";
import SlimeDivider from "@/components/ui/SlimeDivider";
import HotelGallery from "@/components/sections/HotelGallery";
import { CONFERENCE } from "@/lib/constants";

// Read the hotel photo set on the server so the gallery grid renders with
// zero client JS and stays correct no matter how many files are present
// (gaps, or swapped for the hotel's official set later).
function hotelPhotos(): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "images", "hotel");
    return fs
      .readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
      .sort()
      .map((f) => `/images/hotel/${f}`);
  } catch {
    return [];
  }
}

export const metadata: Metadata = {
  title: "Hotel & Venue",
  description: `IAYPAA X is at ${CONFERENCE.venue.name} in ${CONFERENCE.location}. ${CONFERENCE.date}. Independent urban resort with a pool, arcade, courtyard, and live music.`,
};

const VENUE_HIGHLIGHTS: readonly string[] = [
  "Pool",
  "Arcade",
  "Live music",
  "Pickleball",
  "Courtyard",
];

const VENUE_IMAGES = [
  {
    src: "/images/highlander-pool.jpeg",
    alt: "The Highlander Hotel indoor pool",
    caption: "Pool",
  },
  {
    src: "/images/highlander-lobby-1.jpeg",
    alt: "The Highlander Hotel lobby and lounge",
    caption: "Lobby",
  },
  {
    src: "/images/highlander-lobby-2.jpeg",
    alt: "The Highlander Hotel lounge seating",
    caption: "Lounge",
  },
  {
    src: "/images/hotel-room.png",
    alt: "Hotel guest room",
    caption: "The rooms",
  },
] as const;

const ICITY_NOTES: readonly string[] = [
  "UNESCO City of Literature",
  "Walkable downtown & Ped Mall",
  "University of Iowa campus",
  "Strong local food scene",
  "Active recovery community",
  "AA meetings within walking distance",
];

const DRIVES: readonly { from: string; time: string; road: string }[] = [
  { from: "Des Moines", time: "~2 hrs", road: "east on I-80" },
  { from: "Chicago", time: "~3.5 hrs", road: "west on I-80" },
  { from: "Minneapolis", time: "~4.5 hrs", road: "south on I-35 / I-80" },
  { from: "Omaha", time: "~4 hrs", road: "east on I-80" },
  { from: "Kansas City", time: "~4.5 hrs", road: "north on I-35" },
];

export default function HotelPage() {
  const { venue } = CONFERENCE;
  const photos = hotelPhotos();

  return (
    <div className="relative">
      {/* ---------- Page header ---------- */}
      <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-rule-lines opacity-50 pointer-events-none"
          aria-hidden="true"
        />
        <RisingMotes
          count={5}
          color="#5FAD56"
          className="absolute top-0 left-0 right-0 z-10"
        />

        <div className="relative z-20 max-w-3xl mx-auto">
          <div className="flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4 mb-8">
            <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              Where we meet
            </span>
            <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-wide text-bone-white leading-none">
              The <span className="text-ooze-green">Venue</span>
            </h1>
          </div>

          <p className="font-typewriter text-sm sm:text-base tracking-[0.15em] uppercase text-bone-white/70 leading-relaxed">
            {CONFERENCE.date} &nbsp;—&nbsp; where we&apos;ll be
          </p>
        </div>
      </section>

      {/* ---------- Venue — hero image + name + address ---------- */}
      <section className="relative px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Venue header */}
          <div className="mb-6 sm:mb-7">
            <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.35em] uppercase text-gold mb-3">
              The venue
            </p>
            <h2
              className="font-anton text-gold leading-[0.9]"
              style={{
                fontSize: "clamp(2.6rem, 9vw, 6rem)",
                textShadow:
                  "0 0 14px rgba(242,193,78,0.55), 0 0 40px rgba(247,129,84,0.35)",
                letterSpacing: "0.01em",
              }}
            >
              {venue.name}
            </h2>
            <div
              className="marquee-rule w-44 sm:w-56 mt-5 mb-5"
              aria-hidden="true"
            />
            <p className="font-typewriter text-sm sm:text-base tracking-[0.12em] uppercase text-bone-white/75">
              {venue.address}
            </p>
          </div>

          {/* Hero photo — kept rectangular and bordered like a contact-sheet frame */}
          <div className="relative aspect-[21/9] w-full overflow-hidden border border-ooze-green/30 paper-grit">
            <Image
              src={VENUE_IMAGES[0].src}
              alt={VENUE_IMAGES[0].alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
            <span
              aria-hidden="true"
              className="absolute top-3 left-3 stamp text-gold/90 !text-[0.6rem] !tracking-[0.3em] !py-0.5 !px-1.5 bg-void-black/60"
            >
              Exhibit A
            </span>
          </div>

          {/* CTA row */}
          <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href={venue.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-gold text-void-black font-anton uppercase tracking-[0.15em] text-base sm:text-lg px-7 py-3.5 border-2 border-gold transition-all hover:bg-ember hover:border-ember hover:shadow-[0_0_24px_rgba(247,129,84,0.45)]"
            >
              Visit hotel site
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
            <span className="font-typewriter text-xs tracking-[0.2em] uppercase text-bone-white/55">
              highlanderhotel.us · new tab
            </span>
          </div>
        </div>
      </section>

      <SlimeDivider />

      {/* ---------- The Vibe ---------- */}
      <section className="relative px-4 sm:px-6 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-bone-white/15" aria-hidden="true" />
            <span className="font-typewriter text-xs tracking-[0.3em] uppercase text-bone-white/55">
              the joint
            </span>
            <span className="h-px flex-1 bg-bone-white/15" aria-hidden="true" />
          </div>

          <blockquote
            className="font-anton text-ooze-green text-center leading-[0.95] mb-8"
            style={{
              fontSize: "clamp(2.4rem, 8vw, 4.5rem)",
              textShadow:
                "0 0 16px rgba(95,173,86,0.55), 0 0 50px rgba(77,144,120,0.35)",
            }}
          >
            &ldquo;Independent. Counterculture.
            <br />
            You&rsquo;ll fit right in.&rdquo;
          </blockquote>

          <p className="font-news text-bone-white/85 text-lg sm:text-xl leading-[1.75] text-center mb-10 max-w-xl mx-auto">
            The Highlander is Iowa City&rsquo;s independent urban resort
            &mdash; warm, a little off the beaten path, and easy to feel at
            home in. Pool, arcade, courtyard, live music. No shortage of
            fellowship space between sessions.
          </p>

          {/* Amenities checklist */}
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 max-w-md mx-auto">
            {VENUE_HIGHLIGHTS.map((label) => (
              <li
                key={label}
                className="flex items-baseline gap-2.5 font-typewriter text-sm tracking-[0.08em] text-bone-white/80 border-b border-bone-white/10 pb-1"
              >
                <span aria-hidden="true" className="text-ooze-green shrink-0">
                  ⊕
                </span>
                {label}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-center">
            <a
              href={venue.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-typewriter text-xs uppercase tracking-[0.25em] text-gold border-b border-gold/40 pb-0.5 transition-colors hover:text-bone-white hover:border-bone-white"
            >
              See the hotel&rsquo;s full photo gallery
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </p>
        </div>
      </section>

      <SlimeDivider />

      {/* ---------- Photo gallery ---------- */}
      {photos.length > 0 ? (
        <>
          <section className="relative px-4 sm:px-6 py-16 sm:py-20">
            <div className="relative max-w-5xl mx-auto">
              <div className="mb-8 flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4">
                <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
                  Take a look
                </span>
                <h2 className="font-anton text-2xl sm:text-4xl uppercase tracking-wide text-bone-white leading-none">
                  Photo <span className="text-ooze-green">gallery</span>
                </h2>
              </div>

              <HotelGallery images={photos} />

              <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.2em] uppercase text-bone-white/40 mt-6 text-center">
                Photos courtesy of {venue.name}
              </p>
            </div>
          </section>

          <SlimeDivider />
        </>
      ) : null}

      {/* ---------- Photo contact sheet ---------- */}
      <section className="relative px-4 sm:px-6 py-20 sm:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-rule-lines opacity-50 pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto">
          <div className="mb-10 sm:mb-12 flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4">
            <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              Contact sheet
            </span>
            <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wide text-bone-white leading-none">
              Take a <span className="text-ooze-green">look</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {VENUE_IMAGES.map((img, i) => (
              <figure
                key={`${img.alt}-${i}`}
                className={`relative aspect-[4/3] overflow-hidden border border-ooze-green/25 paper-grit ${
                  i % 2 === 0 ? "rotate-[-0.6deg]" : "rotate-[0.5deg]"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 450px"
                />
                {/* contact-sheet number stamp */}
                <figcaption className="absolute bottom-2 left-2 font-typewriter text-[0.65rem] tracking-[0.25em] uppercase text-bone-white bg-void-black/70 border border-bone-white/20 px-1.5 py-0.5">
                  {String(i + 1).padStart(2, "0")} · {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <SlimeDivider />

      {/* ---------- Room block — ticket-stub style notice ---------- */}
      <section className="relative px-4 sm:px-6 py-20 sm:py-24">
        <div className="relative max-w-xl mx-auto">
          <div className="relative bg-void-black border border-gold/40 paper-grit p-8 sm:p-10">
            {/* perforation line down the left */}
            <span
              aria-hidden="true"
              className="absolute top-0 bottom-0 left-6 w-px border-l border-dashed border-bone-white/20"
            />
            <span
              aria-hidden="true"
              className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-void-black border border-bone-white/15"
            />

            <div className="pl-3 sm:pl-4">
              <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.3em] uppercase text-bone-white/55 mb-2">
                Room block · No. 026
              </p>
              <h3 className="font-anton text-2xl sm:text-3xl uppercase tracking-wide text-bone-white leading-none mb-3">
                {venue.name}
              </h3>

              <div className="flex items-baseline gap-3 mb-5">
                <span
                  className="font-[family-name:var(--font-mono)] text-4xl sm:text-5xl font-bold leading-none text-gold"
                  style={{
                    textShadow:
                      "0 0 12px rgba(242,193,78,0.35), 0 2px 0 rgba(0,0,0,0.4)",
                  }}
                >
                  TBA
                </span>
                <span className="font-typewriter text-xs tracking-[0.25em] uppercase text-bone-white/45">
                  group rate · nightly
                </span>
              </div>

              <p className="font-news text-bone-white/80 text-base sm:text-lg leading-relaxed mb-6">
                The IAYPAA X room block is open. Book your stay at the group
                rate using the link below.
              </p>

              <a
                href="https://www.choicehotels.com/reservations/groups/cv26l2"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-gold text-void-black font-anton uppercase tracking-[0.15em] text-base sm:text-lg px-7 py-3.5 border-2 border-gold transition-all hover:bg-ember hover:border-ember hover:shadow-[0_0_24px_rgba(247,129,84,0.45)] mb-6"
              >
                Book the room block
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>

              <p className="font-typewriter text-sm tracking-[0.08em] text-bone-white/75">
                Prefer to call? Dial{" "}
                <a
                  href={`tel:${venue.phone}`}
                  className="text-gold underline underline-offset-4 decoration-gold/40 hover:decoration-gold transition-colors"
                >
                  {venue.phone}
                </a>{" "}
                and mention IAYPAA.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SlimeDivider />

      {/* ---------- Iowa City — the costume comes off ---------- */}
      <section className="relative px-4 sm:px-6 py-20 sm:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-bone-white/15" aria-hidden="true" />
            <span className="font-typewriter text-xs tracking-[0.3em] uppercase text-bone-white/55">
              the host city
            </span>
            <span className="h-px flex-1 bg-bone-white/15" aria-hidden="true" />
          </div>

          <h2 className="font-news text-3xl sm:text-4xl text-bone-white leading-tight mb-6 text-center">
            Iowa City is a college town with a long memory and a soft spot for
            recovery.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 sm:gap-10 items-start">
            <div className="font-news text-bone-white/85 text-base sm:text-lg leading-[1.75] space-y-4">
              <p>
                It&rsquo;s a vibrant downtown, the home of the University of
                Iowa, a UNESCO City of Literature with bookstores and coffee
                shops walkable from the venue. Beyond the conference there&rsquo;s
                the Pedestrian Mall, the Iowa City Book Festival, and a small,
                steady local AA fellowship that keeps the lights on year-round.
              </p>
              <p>
                If you&rsquo;ve never been, plan to wander. If you&rsquo;ve
                been before, you already know.
              </p>
            </div>

            <ul className="border border-ooze-green/25 paper-grit p-5 sm:p-6">
              <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.3em] uppercase text-bone-white/55 mb-3 border-b border-ooze-green/20 pb-2">
                Within a short walk
              </p>
              {ICITY_NOTES.map((note) => (
                <li
                  key={note}
                  className="flex items-baseline gap-2.5 font-typewriter text-sm text-bone-white/80 py-1.5 border-b border-bone-white/10 last:border-b-0"
                >
                  <span aria-hidden="true" className="text-ooze-green shrink-0">
                    ⊕
                  </span>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <SlimeDivider />

      {/* ---------- Getting here ---------- */}
      <section className="relative px-4 sm:px-6 py-20 sm:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-rule-lines opacity-50 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="mb-10 sm:mb-12 flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4">
            <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              Getting here
            </span>
            <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wide text-bone-white leading-none">
              How to <span className="text-ooze-green">arrive</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* By air */}
            <div className="border border-ooze-green/25 paper-grit p-6 sm:p-7">
              <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.3em] uppercase text-bone-white/55 mb-2">
                By air
              </p>
              <h3 className="font-anton text-2xl uppercase tracking-wide text-bone-white leading-none mb-4">
                The <span className="text-ooze-green">runway</span>
              </h3>
              <div className="space-y-3 font-news text-bone-white/85 text-base leading-relaxed">
                <p>
                  Closest:{" "}
                  <span className="font-typewriter text-sm tracking-[0.08em] text-gold">
                    CID
                  </span>{" "}
                  &mdash; The Eastern Iowa Airport in Cedar Rapids, about 25
                  minutes from the venue.
                </p>
                <p>
                  Further:{" "}
                  <span className="font-typewriter text-sm tracking-[0.08em] text-gold">
                    MLI
                  </span>{" "}
                  (Quad Cities, ~1 hr) and{" "}
                  <span className="font-typewriter text-sm tracking-[0.08em] text-gold">
                    DSM
                  </span>{" "}
                  (Des Moines, ~2 hrs).
                </p>
              </div>
            </div>

            {/* By car */}
            <div className="border border-ooze-green/25 paper-grit p-6 sm:p-7">
              <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.3em] uppercase text-bone-white/55 mb-2">
                By car
              </p>
              <h3 className="font-anton text-2xl uppercase tracking-wide text-bone-white leading-none mb-4">
                <span className="text-ooze-green">I-80</span> runs right past
              </h3>
              <ul className="font-typewriter text-sm sm:text-[0.95rem] text-bone-white/80 space-y-2.5">
                {DRIVES.map((d) => (
                  <li
                    key={d.from}
                    className="border-b border-bone-white/10 pb-2"
                  >
                    <span className="block">
                      from <span className="text-bone-white">{d.from}</span>
                    </span>
                    <span className="block text-xs sm:text-sm text-bone-white/55 mt-0.5">
                      {d.time} · {d.road}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
