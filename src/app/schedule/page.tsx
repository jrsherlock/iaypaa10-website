"use client";

import { useState } from "react";
import DrippingSlime from "@/components/effects/DrippingSlime";
import ComingSoon from "@/components/ui/ComingSoon";

/**
 * The "Showtimes" page — formerly /schedule rendered as a card accordion
 * with emoji day icons. Recomposed as a film-festival program reel:
 * each day is a "REEL" row with a stamped day code, an Anton headline,
 * a TBA badge, and an expandable typewriter program below.
 */

type Day = {
  code: string; // "FRI", "SAT", "SUN"
  date: string; // "Aug 14"
  name: string; // "Opening night"
  blurb: string;
  events: readonly string[];
};

const DAYS: readonly Day[] = [
  {
    code: "FRI",
    date: "Aug 14",
    name: "Opening night",
    blurb:
      "Doors open, hugs out front, registration table set up under the marquee. The weekend warms up with a welcome meeting and the first round of fellowship.",
    events: [
      "Registration & check-in",
      "Opening ceremony",
      "Icebreaker meeting",
      "Evening fellowship",
    ],
  },
  {
    code: "SAT",
    date: "Aug 15",
    name: "The main feature",
    blurb:
      "The full reel — speaker meetings, workshops, panels, and the Saturday night main event where the Primordial Ooze comes alive.",
    events: [
      "Morning speaker meeting",
      "Workshops & panels",
      "Afternoon fellowship activities",
      "Dinner",
      "Saturday night main event",
    ],
  },
  {
    code: "SUN",
    date: "Aug 16",
    name: "Closing reel",
    blurb:
      "Closing speaker, farewell brunch, and goodbyes you keep in your pocket for the year. Safe travels home.",
    events: [
      "Closing speaker",
      "Farewell brunch",
      "Closing ceremony",
      "Safe travels home",
    ],
  },
];

export default function SchedulePage() {
  const [openDay, setOpenDay] = useState<number | null>(0);

  function toggleDay(index: number) {
    setOpenDay(openDay === index ? null : index);
  }

  return (
    <div className="relative">
      {/* ---------- Page header ---------- */}
      <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-rule-lines opacity-50 pointer-events-none"
          aria-hidden="true"
        />
        <DrippingSlime
          count={5}
          color="#5FAD56"
          className="absolute top-0 left-0 right-0 z-10"
        />

        <div className="relative z-20 max-w-3xl mx-auto">
          <div className="flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4 mb-8">
            <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              Reel 03
            </span>
            <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-wide text-bone-white leading-none">
              <span className="text-ooze-green">Show</span>times
            </h1>
          </div>

          <p className="font-typewriter text-sm sm:text-base tracking-[0.15em] uppercase text-bone-white/70 leading-relaxed">
            Three nights · Aug 14—16, 2026 · The Highlander, Iowa City
          </p>
        </div>
      </section>

      {/* ---------- TBA notice ---------- */}
      <section className="relative px-4 sm:px-6 pb-16 sm:pb-20">
        <ComingSoon
          title="Full Program"
          subtitle="Specific times, speaker names, and workshop topics drop closer to the conference. The skeleton below gives you the shape of the weekend."
          showEmailSignup
        />
      </section>

      {/* ---------- Day-by-day program reel ---------- */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-rule-lines opacity-50 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="mb-10 sm:mb-12 flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4">
            <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              Program
            </span>
            <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wide text-bone-white leading-none">
              The <span className="text-ooze-green">weekend</span> at a glance
            </h2>
          </div>

          <ol className="space-y-4 sm:space-y-5">
            {DAYS.map((day, index) => {
              const isOpen = openDay === index;
              return (
                <li
                  key={day.code}
                  className={`group relative border transition-colors ${
                    isOpen
                      ? "border-ooze-green/50 bg-toxic-green/20"
                      : "border-ooze-green/20 bg-void-black/40 hover:border-ooze-green/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleDay(index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-stretch text-left cursor-pointer"
                  >
                    {/* Day-code column — like the date column on a tour poster */}
                    <div className="flex flex-col items-center justify-center px-4 sm:px-6 py-5 sm:py-6 border-r border-ooze-green/20 min-w-[5.5rem] sm:min-w-[6.5rem]">
                      <span className="font-anton text-2xl sm:text-3xl text-ooze-green leading-none">
                        {day.code}
                      </span>
                      <span className="font-typewriter text-[0.65rem] sm:text-xs tracking-[0.2em] uppercase text-bone-white/60 mt-1">
                        {day.date}
                      </span>
                    </div>

                    {/* Day title + TBA stamp */}
                    <div className="flex-1 flex items-center justify-between gap-4 px-4 sm:px-6 py-5 sm:py-6">
                      <h3 className="font-anton text-xl sm:text-2xl uppercase tracking-wide text-bone-white leading-tight">
                        {day.name}
                      </h3>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-typewriter text-[0.65rem] sm:text-xs tracking-[0.2em] uppercase text-ember/90 border border-ember/40 px-1.5 py-0.5 hidden sm:inline-block">
                          times tba
                        </span>
                        <span
                          aria-hidden="true"
                          className={`font-anton text-2xl text-ooze-green transition-transform duration-300 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Expanded content */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-7 pb-6 sm:pb-7 pt-1 border-t border-ooze-green/15">
                        <p className="font-news text-bone-white/85 text-base sm:text-lg leading-relaxed mb-5 max-w-prose">
                          {day.blurb}
                        </p>

                        <ul className="font-typewriter text-sm sm:text-base text-bone-white/80 space-y-1.5">
                          {day.events.map((event) => (
                            <li
                              key={event}
                              className="flex items-baseline justify-between gap-4 border-b border-bone-white/10 pb-1.5"
                            >
                              <span className="flex items-baseline gap-3 min-w-0">
                                <span
                                  aria-hidden="true"
                                  className="text-ooze-green shrink-0"
                                >
                                  ⊕
                                </span>
                                <span>{event}</span>
                              </span>
                              <span className="font-[family-name:var(--font-mono)] text-xs text-bone-white/40 tracking-wider shrink-0">
                                TBA
                              </span>
                            </li>
                          ))}
                        </ul>

                        <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.25em] uppercase text-bone-white/40 mt-5 text-right">
                          // times to be announced
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.25em] uppercase text-bone-white/40 text-center mt-10 sm:mt-12">
            // skeleton subject to change
          </p>
        </div>
      </section>
    </div>
  );
}
