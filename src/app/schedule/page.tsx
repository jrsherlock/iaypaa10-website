"use client";

import { useState } from "react";
import RisingMotes from "@/components/effects/RisingMotes";
import ComingSoon from "@/components/ui/ComingSoon";
import { PROGRAM_PUBLIC } from "@/lib/constants";

/**
 * The Program page. Each day is a row with a day code, an Anton heading,
 * and an expandable program below. Times and leads come from the working
 * conference timeline; Saturday's workshop block lists confirmed topics
 * and panel leads whose exact start times are still being locked in.
 */

type Slot = {
  time: string; // "8:00 PM"
  title: string;
  room?: string; // "Main Ballroom", "Breakout", "Lobby"
  lead?: string; // "Dan K. · Twin Cities"
  desc?: string;
};

type SessionItem = {
  topic: string;
  lead?: string;
};

type Sessions = {
  heading: string;
  note: string;
  items: readonly SessionItem[];
};

type Day = {
  code: string; // "FRI", "SAT", "SUN"
  date: string; // "Aug 14"
  name: string;
  blurb: string;
  slots: readonly Slot[];
  sessions?: Sessions;
  footnote?: string;
};

/** Threads that run continuously, all weekend long. */
const ALL_WEEKEND: readonly {
  title: string;
  detail: string;
  link?: { href: string; label: string };
}[] = [
  {
    title: "Marathon meeting room",
    detail:
      "An AA meeting running nearly around the clock, Friday afternoon through Sunday morning. Overwhelmed, restless, or up at 3 AM? The door is open.",
  },
  {
    title: "Hospitality suite",
    detail:
      "The social hub. Free coffee, snacks, energy drinks, and the kind of fellowship that runs late. Home groups host the meal and snack slots all weekend.",
    link: { href: "/hospitality", label: "Host a slot" },
  },
  {
    title: "Prayer & meditation room",
    detail:
      "A quiet space to decompress or keep your daily spiritual routine.",
  },
  {
    title: "Outreach tables",
    detail:
      "MNYPAA · ISCYPAA · WICYPAA · MOSCYPAA · ICYPAA · Midwest CampYPAA. Come meet the bids.",
  },
];

const SPEAKERS: readonly { name: string; from: string }[] = [
  { name: "Dan K.", from: "Twin Cities" },
  { name: "Sammy F.", from: "Cedar Rapids, IA" },
];

const DAYS: readonly Day[] = [
  {
    code: "FRI",
    date: "Aug 14",
    name: "Opening night",
    blurb:
      "Doors open, hugs out front, registration in the lobby. The marathon room opens and the weekend warms up with hype, the state roll call, and the Friday night speaker.",
    slots: [
      { time: "12:00 PM", title: "Doors & registration open", room: "Lobby" },
      { time: "6:30 PM", title: "Hype", room: "Main Ballroom" },
      {
        time: "7:00 PM",
        title: "Readings & state roll call",
        room: "Main Ballroom",
      },
      {
        time: "8:00 PM",
        title: "Friday night main speaker",
        room: "Main Ballroom",
        desc: "Readings, bid-committee hype, then the Friday night keynote.",
      },
      {
        time: "9:00 PM",
        title: "Advisory bid meet & greet",
        room: "Breakout",
      },
      {
        time: "10:00 PM",
        title: "“When we retire at night” · late meeting",
        room: "Breakout",
      },
      {
        time: "Late",
        title: "Socials, games & marathon fellowship",
        room: "Hospitality",
        desc: "Details to be announced.",
      },
    ],
  },
  {
    code: "SAT",
    date: "Aug 15",
    name: "The core day",
    blurb:
      "The fullest day: bid skits in the morning, a full slate of step panels and workshops, then the Saturday night main meeting with the sobriety countdown and the advisory host announcement.",
    slots: [
      { time: "7:00 AM", title: "Doors open & coffee", room: "Lobby" },
      { time: "9:30 AM", title: "Bid skits", room: "Main Ballroom" },
      { time: "6:30 PM", title: "Hype", room: "Main Ballroom" },
      {
        time: "7:00 PM",
        title: "Readings & state roll call",
        room: "Main Ballroom",
      },
      {
        time: "8:00 PM",
        title: "Saturday night main speaker",
        room: "Main Ballroom",
        desc: "The sobriety countdown, longest sober down to 24 hours, then the keynote. The emotional peak of the weekend.",
      },
      {
        time: "9:00 PM",
        title: "Advisory bid decision & passing of the torch",
        room: "Main Ballroom",
        desc: "Next year's host city is announced and the banner is passed.",
      },
      {
        time: "10:00 PM",
        title: "“When we retire at night” · late meeting",
        room: "Breakout",
      },
      {
        time: "Late",
        title: "Saturday night dance & socials",
        room: "Hospitality",
        desc: "Details to be announced.",
      },
    ],
    sessions: {
      heading: "Workshops, step panels & breakouts",
      note: "Running through the day across the breakout rooms; exact start times are being locked in.",
      items: [
        { topic: "What is YPAA?", lead: "Grant N. · Waukesha, WI" },
        { topic: "Step 1 (the doctor's opinion)", lead: "Tyler V. · Quad Cities" },
        { topic: "Step 2", lead: "Chris B. · Milwaukee, WI" },
        { topic: "Step 3", lead: "Tom H. · Minneapolis" },
        { topic: "Steps 4 & 5: Resentments", lead: "Emily L. · Kansas City, MO" },
        { topic: "Steps 4 & 5: Fear" },
        { topic: "Steps 4 & 5: Sex inventory" },
        { topic: "Steps 6 & 7" },
        { topic: "Steps 8 & 9", lead: "Mario O. · Oshkosh, WI" },
        { topic: "Step 10", lead: "Kate G. · Chicago" },
        { topic: "Step 11" },
        { topic: "Step 12", lead: "Ricky S. · Quad Cities" },
        {
          topic: "Hybrids: navigating multiple fellowships & mental health",
          lead: "Josh B. · Minneapolis",
        },
        {
          topic: "Service industry: bars &/or rehab",
          lead: "Justin W. · Quad Cities",
        },
        { topic: "LGBTQIA+ panel", lead: "Mario O. · Oshkosh, WI" },
        { topic: "Al-Anon meeting / panel", lead: "Theresa G. · Des Moines, IA" },
        {
          topic: "Traditions workshop",
          lead: "Jennifer G. · East Moline, IL",
        },
        {
          topic: "“When we retire at night” workshop",
          lead: "Kyle T. · Cedar Rapids, IA",
        },
        {
          topic: "“Upon awakening” meditation workshop",
          lead: "Kyle T. · Cedar Rapids, IA",
        },
      ],
    },
  },
  {
    code: "SUN",
    date: "Aug 16",
    name: "Closing morning",
    blurb:
      "A softer landing: the morning meditation, the Sunday closing speaker, then farewell and the goodbyes you keep in your pocket for the year. Safe travels home.",
    slots: [
      {
        time: "8:30 AM",
        title: "“Upon awakening” · meditation",
        room: "Main Ballroom",
        lead: "Kyle T. · Cedar Rapids, IA",
      },
      {
        time: "10:00 AM",
        title: "Sunday closing speaker",
        room: "Main Ballroom",
        desc: "A final, reflective speaker meeting to ground the weekend.",
      },
      {
        time: "12:00 PM",
        title: "Farewell & safe travels home",
        room: "Lobby",
      },
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
        <RisingMotes
          count={5}
          color="#5FAD56"
          className="absolute top-0 left-0 right-0 z-10"
        />

        <div className="relative z-20 max-w-3xl mx-auto">
          <div className="flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4 mb-8">
            <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              The weekend
            </span>
            <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-wide text-bone-white leading-none">
              The <span className="text-ooze-green">Program</span>
            </h1>
          </div>

          <p className="font-typewriter text-sm sm:text-base tracking-[0.15em] uppercase text-bone-white/70 leading-relaxed">
            Three nights · Aug 14—16, 2026 · Graduate by Hilton, Iowa City
          </p>

          {PROGRAM_PUBLIC && (
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ooze-green/15 pt-4">
              <span className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.3em] uppercase text-bone-white/50">
                Featured speakers
              </span>
              {SPEAKERS.map((s) => (
                <span
                  key={s.name}
                  className="font-typewriter text-sm text-bone-white/85"
                >
                  <span className="text-ooze-green">{s.name}</span>
                  <span className="text-bone-white/45"> · {s.from}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------- Program notice ---------- */}
      <section className="relative px-4 sm:px-6 pb-12 sm:pb-16">
        {PROGRAM_PUBLIC ? (
          <ComingSoon
            title="Working Program"
            subtitle="This is the working timeline for the weekend. The shape, the speakers, and the panel leads are set, though a few exact start times for Saturday's workshops are still being locked in. Get on the list and we'll send the final program."
            showEmailSignup
          />
        ) : (
          <ComingSoon
            title="Weekend Program"
            subtitle="The full program, including speakers, panel leads, and the day-by-day timeline, is with the AA Advisory committee for review."
            showEmailSignup
          />
        )}
      </section>

      {/* ---------- Running all weekend ---------- */}
      <section className="relative px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="relative max-w-3xl mx-auto">
          <div className="mb-8 flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4">
            <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              Always on
            </span>
            <h2 className="font-anton text-2xl sm:text-4xl uppercase tracking-wide text-bone-white leading-none">
              Running <span className="text-ooze-green">all weekend</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {ALL_WEEKEND.map((item) => (
              <div
                key={item.title}
                className="border border-ooze-green/20 bg-void-black/40 p-4 sm:p-5"
              >
                <h3 className="font-anton text-base sm:text-lg uppercase tracking-wide text-ooze-green leading-tight">
                  {item.title}
                </h3>
                <p className="font-news text-bone-white/80 text-sm sm:text-base leading-relaxed mt-1.5">
                  {item.detail}
                </p>
                {item.link ? (
                  <a
                    href={item.link.href}
                    className="inline-flex items-center gap-1.5 font-typewriter text-xs tracking-[0.2em] uppercase text-gold hover:text-bone-white transition-colors mt-3"
                  >
                    {item.link.label}
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Day-by-day program ---------- */}
      {PROGRAM_PUBLIC && (
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

                    {/* Day title + chevron */}
                    <div className="flex-1 flex items-center justify-between gap-4 px-4 sm:px-6 py-5 sm:py-6">
                      <h3 className="font-anton text-xl sm:text-2xl uppercase tracking-wide text-bone-white leading-tight">
                        {day.name}
                      </h3>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-typewriter text-[0.65rem] sm:text-xs tracking-[0.2em] uppercase text-ooze-green/90 border border-ooze-green/40 px-1.5 py-0.5 hidden sm:inline-block">
                          {day.slots.length} sessions
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

                        <ul className="font-typewriter text-sm sm:text-base text-bone-white/80 space-y-2.5">
                          {day.slots.map((slot) => (
                            <li
                              key={slot.time + slot.title}
                              className="border-b border-bone-white/10 pb-2"
                            >
                              <div className="flex items-baseline justify-between gap-4">
                                <span className="flex items-baseline gap-3 min-w-0">
                                  <span
                                    aria-hidden="true"
                                    className="text-ooze-green shrink-0"
                                  >
                                    ⊕
                                  </span>
                                  <span className="min-w-0">
                                    {slot.title}
                                    {slot.room ? (
                                      <span className="text-bone-white/40">
                                        {" "}
                                        · {slot.room}
                                      </span>
                                    ) : null}
                                  </span>
                                </span>
                                <span className="font-[family-name:var(--font-mono)] text-xs text-bone-white/55 tracking-wider shrink-0">
                                  {slot.time}
                                </span>
                              </div>
                              {slot.lead ? (
                                <p className="font-typewriter text-xs text-ooze-green/80 mt-1 ml-6">
                                  {slot.lead}
                                </p>
                              ) : null}
                              {slot.desc ? (
                                <p className="font-news text-sm text-bone-white/55 mt-1 ml-6 leading-relaxed">
                                  {slot.desc}
                                </p>
                              ) : null}
                            </li>
                          ))}
                        </ul>

                        {day.sessions ? (
                          <div className="mt-6 border-t border-ooze-green/15 pt-5">
                            <h4 className="font-anton text-base sm:text-lg uppercase tracking-wide text-ooze-green leading-tight">
                              {day.sessions.heading}
                            </h4>
                            <p className="font-typewriter text-xs sm:text-sm text-bone-white/55 mt-1 mb-3 leading-relaxed">
                              {day.sessions.note}
                            </p>
                            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 font-typewriter text-sm text-bone-white/80">
                              {day.sessions.items.map((item) => (
                                <li
                                  key={item.topic}
                                  className="flex items-baseline gap-2.5"
                                >
                                  <span
                                    aria-hidden="true"
                                    className="text-ooze-green shrink-0"
                                  >
                                    ⊕
                                  </span>
                                  <span className="min-w-0">
                                    {item.topic}
                                    {item.lead ? (
                                      <span className="block text-xs text-ooze-green/70">
                                        {item.lead}
                                      </span>
                                    ) : null}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}

                        {day.footnote ? (
                          <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.2em] uppercase text-bone-white/45 mt-5">
                            {day.footnote}
                          </p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.25em] uppercase text-bone-white/40 text-center mt-10 sm:mt-12">
            Working program · still being confirmed
          </p>
        </div>
      </section>
      )}
    </div>
  );
}
