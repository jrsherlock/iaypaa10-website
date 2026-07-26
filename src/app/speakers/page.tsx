import type { Metadata } from "next";
import Link from "next/link";
import RisingMotes from "@/components/effects/RisingMotes";
import MainSpeakers from "@/components/sections/MainSpeakers";
import { CONFERENCE, PROGRAM_PUBLIC } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Speakers",
  description: `The three main speakers for ${CONFERENCE.name}, Primordial Ooze, August 14–16 2026 in Iowa City. One night at a time, revealed as each is confirmed.`,
};

export default function SpeakersPage() {
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
              Voices
            </span>
            <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-wide text-bone-white leading-none">
              The <span className="text-ooze-green">Speakers</span>
            </h1>
          </div>

          <p className="font-typewriter text-sm sm:text-base tracking-[0.15em] uppercase text-bone-white/70 leading-relaxed">
            Three nights · three voices &nbsp;·&nbsp; revealed one at a time
          </p>
        </div>
      </section>

      {/* ---------- The three main speakers ---------- */}
      <MainSpeakers />

      {/* ---------- Confirmed so far — point to the live program ---------- */}
      {PROGRAM_PUBLIC && (
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-rule-lines opacity-50 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-2xl mx-auto">
          <div className="mb-10 sm:mb-12 flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4">
            <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              Confirmed so far
            </span>
            <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wide text-bone-white leading-none">
              It&rsquo;s on the <span className="text-ooze-green">program</span>
            </h2>
          </div>

          <p className="font-news text-bone-white/85 text-lg sm:text-xl leading-[1.75] mb-8">
            The weekend program is live: every panel, workshop, and main
            meeting with its day, time, and room. Speaker and panelist names
            are announced closer to the conference, first name and last
            initial only, in keeping with the Eleventh Tradition. The lineup
            lands on this page the day it drops.
          </p>

          <Link
            href="/schedule"
            className="group inline-flex items-center gap-3 bg-gold text-void-black font-anton uppercase tracking-[0.15em] text-base sm:text-lg px-7 py-3.5 border-2 border-gold transition-all hover:bg-ember hover:border-ember hover:shadow-[0_0_24px_rgba(247,129,84,0.45)]"
          >
            See the program
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.25em] uppercase text-bone-white/40 mt-8">
            Names withheld outside the fellowship in keeping with the Eleventh
            Tradition
          </p>
        </div>
      </section>
      )}
    </div>
  );
}
