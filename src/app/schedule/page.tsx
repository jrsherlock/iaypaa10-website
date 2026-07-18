"use client";

import { useEffect, useRef, useState } from "react";
import RisingMotes from "@/components/effects/RisingMotes";
import ComingSoon from "@/components/ui/ComingSoon";
import { PROGRAM_PUBLIC } from "@/lib/constants";
import {
  ALL_WEEKEND,
  FEATURED_SPEAKERS,
  KIND_LABELS,
  SCHEDULE_DAYS,
  type ScheduleEvent,
  type SessionKind,
} from "@/lib/schedule";

/**
 * The Program page. A sticky FRI/SAT/SUN switcher sits under the navbar;
 * each day renders as a single chronological rail (grouped by start time,
 * so simultaneous rooms sit side by side) with category-coded session
 * cards. Program data lives in `src/lib/schedule.ts`.
 */

// Literal class strings per category so Tailwind can see them at build time.
const KIND_STYLES: Record<
  SessionKind,
  { border: string; dot: string; text: string }
> = {
  main: { border: "border-l-gold", dot: "bg-gold", text: "text-gold" },
  panel: {
    border: "border-l-ooze-green",
    dot: "bg-ooze-green",
    text: "text-ooze-green",
  },
  meeting: {
    border: "border-l-swamp-teal",
    dot: "bg-swamp-teal",
    text: "text-swamp-teal",
  },
  social: { border: "border-l-ember", dot: "bg-ember", text: "text-ember" },
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
      className={`border border-bone-white/10 border-l-2 ${styles.border} bg-void-black/50 p-4 sm:p-5`}
    >
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
    </article>
  );
}

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState(0);
  const day = SCHEDULE_DAYS[activeDay];
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
              {FEATURED_SPEAKERS.map((s) => (
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

      {/* ---------- Program notice (pre-approval only) ---------- */}
      {!PROGRAM_PUBLIC && (
        <section className="relative px-4 sm:px-6 pb-12 sm:pb-16">
          <ComingSoon
            title="Weekend Program"
            subtitle="The full program, including speakers, panel leads, and the day-by-day timeline, is with the AA Advisory committee for review."
            showEmailSignup
          />
        </section>
      )}

      {/* ---------- Day-by-day program ---------- */}
      {PROGRAM_PUBLIC && (
        <>
          {/* Sticky day switcher — sits just under the 4rem navbar */}
          <div className="sticky top-16 z-40 bg-void-black/90 backdrop-blur-sm border-y border-ooze-green/20">
            <nav
              aria-label="Conference days"
              className="max-w-3xl mx-auto grid grid-cols-3"
            >
              {SCHEDULE_DAYS.map((d, index) => {
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

                {groups.map((group, index) => (
                  <li
                    key={group.time}
                    className="poster-rise relative pl-7 sm:pl-9"
                    style={{ "--i": Math.min(index + 1, 8) } as React.CSSProperties}
                  >
                    {/* node dot on the rail */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[3px] h-[11px] w-[11px] rounded-full border border-ooze-green bg-void-black shadow-[0_0_8px_rgba(95,173,86,0.5)]"
                    />

                    <div className="flex items-baseline gap-3 mb-2.5">
                      <time className="font-[family-name:var(--font-mono)] text-sm sm:text-base tracking-wider text-bone-white">
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
                        <SessionCard
                          key={event.title + event.room}
                          event={event}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ol>

              {day.footnote ? (
                <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.15em] uppercase text-bone-white/45 mt-8 pl-7 sm:pl-9">
                  {day.footnote}
                </p>
              ) : null}
            </div>
          </section>

          <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.25em] uppercase text-bone-white/40 text-center px-4 pb-14 sm:pb-16">
            Working program · times may shift before August
          </p>
        </>
      )}

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
    </div>
  );
}
