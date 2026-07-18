import type { Metadata } from "next";
import Image from "next/image";
import RisingMotes from "@/components/effects/RisingMotes";
import PreConferenceEvents from "@/components/sections/PreConferenceEvents";
import { PRE_CONFERENCE_EVENTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pre-Conference Events",
  description:
    "Lead-up events before IAYPAA X: bake-offs, picnics, panels, and the kick-off dinner in the weeks before the August 14–16, 2026 conference. Past events stay here as an archive.",
};

/**
 * Pre-Conference Events — the lead-up to IAYPAA X.
 *
 * The past/upcoming split is computed here on the server (event date vs.
 * today), so the page is correct with zero client JS. The interactive
 * cards + modal live in the client PreConferenceEvents component. Past
 * events are not removed — they settle into a greyed-but-openable
 * archive; upcoming events surface in full colour.
 */

// Local YYYY-MM-DD — string compare avoids any timezone drift.
function todayISO(): string {
  const n = new Date();
  const p = (x: number) => String(x).padStart(2, "0");
  return `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}`;
}

export default function PreConferencePage() {
  const today = todayISO();

  const upcoming = PRE_CONFERENCE_EVENTS.filter(
    (e) => (e.endDate ?? e.date) >= today,
  ).sort((a, b) => a.date.localeCompare(b.date));

  const past = PRE_CONFERENCE_EVENTS.filter(
    (e) => (e.endDate ?? e.date) < today,
  ).sort((a, b) => b.date.localeCompare(a.date));

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
              The lead-up
            </span>
            <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-wide text-bone-white leading-none">
              Pre-Conference <span className="text-ooze-green">Events</span>
            </h1>
          </div>

          <p className="font-news text-bone-white/80 text-base sm:text-lg leading-relaxed max-w-prose">
            The road to IAYPAA X: bake-offs, picnics, a virtual panel, and
            the kick-off dinner in the weeks before August 14–16. Tap any
            event for details and its flyer. Events that have already
            happened stay here as an archive.
          </p>
        </div>
      </section>

      {/* ---------- Showcase poster ---------- */}
      <section className="relative px-4 sm:px-6 pb-14 sm:pb-16">
        <div className="relative max-w-xl mx-auto">
          <div className="border border-ooze-green/25 bg-void-black/40 paper-grit p-3 sm:p-4">
            <Image
              src="/images/pre-conference-events-v3.jpg"
              alt="Pre-Conference Event Showcase poster for Summer 2026 lead-up events for IAYPAA X, listing the Speakers & Sweets Bake-Off, AA Pride Event, Picnic in the Park, Yoga & Meditation in the Park, the July 29 Virtual AA Panel, Kick-Off Spaghetti Dinner, and the August 14–16 Iowa City IAYPAA Conference."
              width={1200}
              height={1470}
              className="w-full h-auto"
              sizes="(min-width: 640px) 36rem, 100vw"
            />
          </div>
          <p className="mt-4 text-center">
            <a
              href="/images/pre-conference-events-v3.jpg"
              download
              className="group inline-flex items-center gap-2 font-typewriter text-xs uppercase tracking-[0.25em] text-gold border-b border-gold/40 pb-0.5 transition-colors hover:text-bone-white hover:border-bone-white"
            >
              Download the poster
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
          </p>
        </div>
      </section>

      <PreConferenceEvents upcoming={upcoming} past={past} />
    </div>
  );
}
