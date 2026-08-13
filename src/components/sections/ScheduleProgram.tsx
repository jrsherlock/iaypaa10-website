"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  KIND_LABELS,
  type ScheduleDay,
  type ScheduleEvent,
  type SessionKind,
} from "@/lib/schedule";

/**
 * The published weekend program: a sticky FRI/SAT/SUN switcher under the
 * navbar, each day a chronological rail (grouped by start time, so
 * simultaneous rooms sit side by side) with category-coded session cards.
 * The "running all weekend" threads are not here — they show whether or
 * not the program is public, so they live in the page itself.
 *
 * Program data arrives as props from the server (`src/app/schedule/page.tsx`)
 * rather than being imported here. That is deliberate: while `PROGRAM_PUBLIC`
 * is false the server never renders this component, so no part of the
 * program reaches the browser — not in the HTML, and not in the page's
 * JavaScript either. Importing `SCHEDULE_DAYS` directly here would ship the
 * whole unreleased program in a client chunk for anyone to read.
 */

// Literal class strings per category so Tailwind can see them at build time.
const KIND_STYLES: Record<
  SessionKind,
  { border: string; dot: string; text: string; wash: string }
> = {
  main: {
    border: "border-l-gold",
    dot: "bg-gold",
    text: "text-gold",
    // The spine of the day reads warmest — amber light surfacing out of the dark.
    wash: "bg-gradient-to-r from-gold/[0.07] to-transparent",
  },
  panel: {
    border: "border-l-ooze-green",
    dot: "bg-ooze-green",
    text: "text-ooze-green",
    wash: "bg-gradient-to-r from-ooze-green/[0.05] to-transparent",
  },
  meeting: {
    border: "border-l-swamp-teal",
    dot: "bg-swamp-teal",
    text: "text-swamp-teal",
    wash: "bg-gradient-to-r from-swamp-teal/[0.05] to-transparent",
  },
  social: {
    border: "border-l-ember",
    dot: "bg-ember",
    text: "text-ember",
    wash: "bg-gradient-to-r from-ember/[0.05] to-transparent",
  },
};

const KIND_ORDER: readonly SessionKind[] = [
  "main",
  "panel",
  "meeting",
  "social",
];

type TimeGroup = { time: string; events: ScheduleEvent[] };

/** Group consecutive events that share a start time (simultaneous rooms). */
function groupByTime(events: readonly ScheduleEvent[]): TimeGroup[] {
  const groups: TimeGroup[] = [];
  for (const event of events) {
    const last = groups[groups.length - 1];
    if (last && last.time === event.time) {
      last.events.push(event);
    } else {
      groups.push({ time: event.time, events: [event] });
    }
  }
  return groups;
}

function SessionCard({ event }: { event: ScheduleEvent }) {
  const styles = KIND_STYLES[event.kind];
  return (
    <article
      className={`relative overflow-hidden border border-bone-white/10 border-l-2 ${styles.border} bg-void-black/50 p-4 sm:p-5`}
    >
      {/* Category wash — a faint light bleeding in from the spine edge. */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 pointer-events-none ${styles.wash}`}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="font-anton text-lg sm:text-xl uppercase tracking-wide text-bone-white leading-tight text-balance">
              {event.title}
            </h4>
            {event.subtitle ? (
              <p
                className={`font-typewriter text-[0.7rem] sm:text-xs tracking-[0.15em] uppercase ${styles.text} mt-1`}
              >
                {event.subtitle}
              </p>
            ) : null}
          </div>
          <span className="font-typewriter text-[0.65rem] sm:text-xs tracking-[0.15em] uppercase text-bone-white/60 border border-bone-white/20 px-1.5 py-0.5 shrink-0 mt-0.5">
            {event.room}
          </span>
        </div>

        {/* The marquee name — the person the session is built around. */}
        {event.speaker ? (
          <div className="mt-3">
            <span className="font-typewriter text-[0.6rem] sm:text-[0.65rem] tracking-[0.25em] uppercase text-bone-white/45">
              Speaker
            </span>
            <p className="font-anton text-2xl sm:text-3xl uppercase tracking-wide text-gold glow-text-gold leading-none mt-1">
              {event.speaker}
            </p>
          </div>
        ) : null}

        {event.until ? (
          <p className="font-[family-name:var(--font-mono)] text-[0.65rem] tracking-wider text-bone-white/45 mt-1.5">
            til {event.until}
          </p>
        ) : null}

        {event.desc ? (
          <p className="font-news text-sm sm:text-base text-bone-white/75 leading-relaxed mt-2">
            {event.desc}
          </p>
        ) : null}

        {event.lead ? (
          <p className="font-typewriter text-xs text-bone-white/70 mt-2.5">
            <span className="text-bone-white/40 uppercase tracking-[0.15em] text-[0.65rem]">
              Led by{" "}
            </span>
            <span className={styles.text}>{event.lead}</span>
          </p>
        ) : null}

        {event.panelists ? (
          <ul className="mt-2.5 grid grid-cols-1 min-[420px]:grid-cols-2 gap-x-4 gap-y-1">
            {event.panelists.map((p) => (
              <li
                key={p}
                className="font-typewriter text-xs text-bone-white/70 flex items-baseline gap-1.5"
              >
                <span
                  aria-hidden="true"
                  className={`inline-block h-1 w-1 rounded-full ${styles.dot} shrink-0 translate-y-[-2px]`}
                />
                <span className="min-w-0">{p}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {/* The committee's poster for the night, pinned to the card and
            straightening on hover. Opens the full artwork in a new tab. */}
        {event.poster ? (
          <a
            href={event.poster.src}
            target="_blank"
            rel="noopener noreferrer"
            className="group/poster mt-4 flex items-end gap-3 w-fit"
          >
            <span className="relative block w-24 sm:w-28 shrink-0 overflow-hidden border border-bone-white/25 rotate-[-2deg] shadow-[0_6px_18px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover/poster:rotate-0 group-hover/poster:scale-[1.03]">
              <Image
                src={event.poster.src}
                alt={`Poster for ${event.title}`}
                width={event.poster.width}
                height={event.poster.height}
                className="w-full h-auto"
                sizes="112px"
              />
            </span>
            <span
              className={`font-typewriter text-[0.65rem] tracking-[0.2em] uppercase ${styles.text} group-hover/poster:text-bone-white transition-colors pb-1`}
            >
              See the poster{" "}
              <span aria-hidden="true" className="inline-block">
                &rarr;
              </span>
            </span>
          </a>
        ) : null}
      </div>
    </article>
  );
}

export default function ScheduleProgram({
  days,
}: {
  days: readonly ScheduleDay[];
}) {
  const [activeDay, setActiveDay] = useState(0);
  const day = days[activeDay];
  const groups = groupByTime(day.events);

  // After a day switch renders, jump back to the top of the day so the
  // switch never lands mid-timeline. Runs post-render (not in the click
  // handler) so the DOM swap can't cancel the smooth scroll.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    document
      .getElementById("program")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeDay]);

  return (
    <>
      {/* Sticky day switcher — sits just under the 4rem navbar */}
      <div className="sticky top-16 z-40 bg-void-black/90 backdrop-blur-sm border-y border-ooze-green/20">
        <nav
          aria-label="Conference days"
          className="max-w-3xl mx-auto grid grid-cols-3"
        >
          {days.map((d, index) => {
            const isActive = activeDay === index;
            return (
              <button
                key={d.code}
                type="button"
                onClick={() => setActiveDay(index)}
                aria-current={isActive ? "true" : undefined}
                className={`relative flex flex-col items-center py-3 sm:py-4 cursor-pointer transition-colors ${
                  isActive
                    ? "text-ooze-green"
                    : "text-bone-white/55 hover:text-bone-white"
                }`}
              >
                <span className="font-anton text-xl sm:text-2xl leading-none tracking-wide">
                  {d.code}
                </span>
                <span className="font-typewriter text-[0.6rem] sm:text-xs tracking-[0.2em] uppercase mt-1 opacity-80">
                  {d.date}
                </span>
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-3 right-3 h-0.5 transition-all duration-300 ${
                    isActive
                      ? "bg-ooze-green shadow-[0_0_10px_rgba(95,173,86,0.7)]"
                      : "bg-transparent"
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </div>

      {/* scroll-mt clears the navbar (4rem) + sticky day tabs (~4rem) */}
      <section
        id="program"
        className="relative scroll-mt-[8.5rem] px-4 sm:px-6 py-10 sm:py-14 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-rule-lines opacity-40 pointer-events-none"
          aria-hidden="true"
        />

        {/* key={day.code} remounts the timeline so the rise re-staggers */}
        <div key={day.code} className="relative max-w-3xl mx-auto">
          <header
            className="poster-rise mb-8 sm:mb-10"
            style={{ "--i": 0 } as React.CSSProperties}
          >
            <div className="flex items-baseline gap-3 sm:gap-4">
              <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wide text-bone-white leading-none">
                {day.name}
              </h2>
              <span className="font-typewriter text-xs sm:text-sm tracking-[0.2em] uppercase text-ooze-green shrink-0">
                {day.code} · {day.date}
              </span>
            </div>
            <p className="font-news text-bone-white/80 text-base sm:text-lg leading-relaxed mt-3 max-w-prose">
              {day.blurb}
            </p>

            {/* Category legend */}
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4">
              {KIND_ORDER.map((kind) => (
                <li
                  key={kind}
                  className="flex items-center gap-1.5 font-typewriter text-[0.65rem] sm:text-xs tracking-[0.15em] uppercase text-bone-white/60"
                >
                  <span
                    aria-hidden="true"
                    className={`inline-block h-1.5 w-1.5 rounded-full ${KIND_STYLES[kind].dot}`}
                  />
                  {KIND_LABELS[kind]}
                </li>
              ))}
            </ul>
          </header>

          {/* Time rail */}
          <ol className="relative space-y-7 sm:space-y-8 pb-2">
            {/* the rail line */}
            <span
              aria-hidden="true"
              className="absolute left-[5px] top-1 bottom-0 w-px bg-gradient-to-b from-ooze-green/50 via-ooze-green/20 to-transparent"
            />

            {groups.map((group, index) => {
              // Main-event slots are the spine of the day: warm node, warm time.
              const isMain = group.events.some((e) => e.kind === "main");
              return (
              <li
                key={group.time}
                className="poster-rise relative pl-7 sm:pl-9"
                style={{ "--i": Math.min(index + 1, 8) } as React.CSSProperties}
              >
                {/* node dot on the rail */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-[3px] h-[11px] w-[11px] rounded-full bg-void-black ${
                    isMain
                      ? "border border-gold shadow-[0_0_10px_rgba(242,193,78,0.6)]"
                      : "border border-ooze-green shadow-[0_0_8px_rgba(95,173,86,0.5)]"
                  }`}
                />

                <div className="flex items-baseline gap-3 mb-2.5">
                  <time
                    className={`font-[family-name:var(--font-mono)] text-sm sm:text-base tracking-wider ${
                      isMain ? "text-gold" : "text-bone-white"
                    }`}
                  >
                    {group.time}
                  </time>
                  {group.events.length > 1 ? (
                    <span className="font-typewriter text-[0.6rem] sm:text-[0.65rem] tracking-[0.2em] uppercase text-bone-white/45">
                      {group.events.length} rooms at once
                    </span>
                  ) : null}
                </div>

                <div
                  className={`grid gap-3 ${
                    group.events.length > 1 ? "sm:grid-cols-2" : ""
                  }`}
                >
                  {group.events.map((event) => (
                    <SessionCard key={event.title + event.room} event={event} />
                  ))}
                </div>
              </li>
              );
            })}
          </ol>

          {day.footnote ? (
            <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.15em] uppercase text-bone-white/45 mt-8 pl-7 sm:pl-9">
              {day.footnote}
            </p>
          ) : null}
        </div>
      </section>

      <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.25em] uppercase text-bone-white/40 text-center px-4 pb-14 sm:pb-16">
        Times & rooms as printed in the weekend gram
      </p>
    </>
  );
}
