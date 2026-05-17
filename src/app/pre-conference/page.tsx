import type { Metadata } from "next";
import Link from "next/link";
import RisingMotes from "@/components/effects/RisingMotes";
import {
  PRE_CONFERENCE_EVENTS,
  type PreConferenceEvent,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pre-Conference Events",
  description:
    "Lead-up events before IAYPAA X — fundraisers, speaker meetings, and fellowship in the months before the August 14–16, 2026 conference. Past events stay here as an archive.",
};

/**
 * Pre-Conference Events — the lead-up to IAYPAA X.
 *
 * The past/upcoming split is computed on the server from the event date
 * vs. today, so the page renders correctly with zero client JS (see the
 * countdown lesson in docs/design-philosophy.md). Past events are not
 * removed — they settle into the archive, greyed but still legible and
 * linkable. Upcoming events surface in full colour.
 */

// Local YYYY-MM-DD — string compare avoids any timezone drift.
function todayISO(): string {
  const n = new Date();
  const p = (x: number) => String(x).padStart(2, "0");
  return `${n.getFullYear()}-${p(n.getMonth() + 1)}-${p(n.getDate())}`;
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function EventCard({
  event,
  past,
}: {
  event: PreConferenceEvent;
  past: boolean;
}) {
  return (
    <article
      className={`relative border paper-grit p-6 sm:p-7 transition-colors ${
        past
          ? "border-bone-white/10 bg-void-black/30 opacity-60"
          : "border-ooze-green/30 bg-void-black/45 hover:border-ooze-green/55"
      }`}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <p
          className={`font-[family-name:var(--font-mono)] text-xs tracking-wider ${
            past ? "text-bone-white/35" : "text-gold"
          }`}
        >
          {formatDate(event.date)}
          {event.endDate ? ` — ${formatDate(event.endDate)}` : ""}
          {event.time ? ` · ${event.time}` : ""}
        </p>
        <span
          className={`stamp shrink-0 !text-[0.6rem] !tracking-[0.25em] ${
            past ? "text-bone-white/35" : "text-ooze-green/90"
          }`}
        >
          {past ? "Past" : "Upcoming"}
        </span>
      </div>

      <h3
        className={`font-anton uppercase tracking-wide text-xl sm:text-2xl leading-tight ${
          past ? "text-bone-white/65" : "text-bone-white"
        }`}
      >
        {event.title}
      </h3>

      <p
        className={`font-typewriter text-[0.7rem] sm:text-xs tracking-[0.15em] uppercase mt-1.5 ${
          past ? "text-bone-white/35" : "text-bone-white/60"
        }`}
      >
        {event.location}
        {event.city ? ` · ${event.city}` : ""}
      </p>

      <p
        className={`font-news text-base leading-relaxed mt-4 max-w-prose ${
          past ? "text-bone-white/45" : "text-bone-white/85"
        }`}
      >
        {event.description}
      </p>

      {event.link ? (
        <Link
          href={event.link}
          className={`group mt-5 inline-flex items-center gap-2 font-typewriter text-xs uppercase tracking-[0.25em] border-b pb-0.5 transition-colors ${
            past
              ? "text-bone-white/40 border-bone-white/20 hover:text-bone-white/70 hover:border-bone-white/40"
              : "text-gold border-gold/40 hover:text-bone-white hover:border-bone-white"
          }`}
        >
          {event.linkLabel ?? "More"}
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      ) : null}
    </article>
  );
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
            The road to IAYPAA X — fundraisers, speaker meetings, and
            fellowship in the months before August 14–16. Events that have
            already happened stay here as an archive; what&apos;s still ahead
            is below in full.
          </p>
        </div>
      </section>

      {/* ---------- Upcoming ---------- */}
      <section className="relative px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="relative max-w-3xl mx-auto">
          <div className="mb-8 flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4">
            <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              Still ahead
            </span>
            <h2 className="font-anton text-2xl sm:text-4xl uppercase tracking-wide text-bone-white leading-none">
              <span className="text-ooze-green">Upcoming</span>
            </h2>
          </div>

          {upcoming.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-5">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} past={false} />
              ))}
            </div>
          ) : (
            <p className="font-news text-bone-white/70 text-base leading-relaxed">
              Nothing on the calendar right now.{" "}
              <Link
                href="/#mailing-list"
                className="text-gold border-b border-gold/40 hover:text-bone-white hover:border-bone-white transition-colors"
              >
                Get on the mailing list
              </Link>{" "}
              and we&apos;ll let you know when the next one is set.
            </p>
          )}
        </div>
      </section>

      {/* ---------- Past (archive) ---------- */}
      {past.length > 0 ? (
        <section className="relative px-4 sm:px-6 pb-20 sm:pb-24 overflow-hidden">
          <div
            className="absolute inset-0 bg-rule-lines opacity-40 pointer-events-none"
            aria-hidden="true"
          />
          <div className="relative max-w-3xl mx-auto">
            <div className="mb-8 flex items-baseline gap-4 sm:gap-6 border-b border-bone-white/15 pb-4">
              <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/45 shrink-0">
                Archive
              </span>
              <h2 className="font-anton text-2xl sm:text-4xl uppercase tracking-wide text-bone-white/70 leading-none">
                Already happened
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {past.map((event) => (
                <EventCard key={event.id} event={event} past />
              ))}
            </div>

            <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.25em] uppercase text-bone-white/35 text-center mt-10">
              Kept on purpose — every step of the road counts
            </p>
          </div>
        </section>
      ) : null}
    </div>
  );
}
