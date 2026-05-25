"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { PreConferenceEvent } from "@/lib/constants";

/**
 * Pre-Conference Events — interactive list + modal.
 *
 * The past/upcoming split is computed on the server and passed in, so the
 * cards render correctly with zero JS; only the modal needs the client.
 * Past events are greyed but fully openable — the archive stays
 * accessible. The modal is keyboard-accessible (Esc, focus trap, restore)
 * and works full-width on phones / centred on desktop.
 */

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function whenLine(event: PreConferenceEvent): string {
  const base = event.endDate
    ? `${formatDate(event.date)} — ${formatDate(event.endDate)}`
    : formatDate(event.date);
  return event.time ? `${base} · ${event.time}` : base;
}

function EventCard({
  event,
  past,
  onOpen,
}: {
  event: PreConferenceEvent;
  past: boolean;
  onOpen: (e: PreConferenceEvent) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(event)}
      aria-haspopup="dialog"
      className={`group relative w-full text-left border paper-grit p-6 sm:p-7 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ooze-green ${
        past
          ? "border-bone-white/10 bg-void-black/30 opacity-60 hover:opacity-80"
          : "border-ooze-green/30 bg-void-black/45 hover:border-ooze-green/55"
      } ${event.flyerThumb ? "pr-[6.5rem] sm:pr-[7rem]" : ""}`}
    >
      {/* Pinned flyer thumbnail — top-right corner, slight tilt like a
          poster pinned to a contact-sheet. Decorative; clicking the card
          still opens the modal where the full flyer + download live. */}
      {event.flyerThumb ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-4 right-4 block w-16 sm:w-20 aspect-[3/4] overflow-hidden border border-ooze-green/35 paper-grit rotate-[-3deg] shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:rotate-0 group-hover:scale-105"
        >
          <Image
            src={event.flyerThumb}
            alt=""
            fill
            className="object-cover"
            sizes="80px"
          />
        </span>
      ) : null}

      <div className="flex items-start justify-between gap-4 mb-3">
        <p
          className={`font-[family-name:var(--font-mono)] text-xs tracking-wider ${
            past ? "text-bone-white/35" : "text-gold"
          }`}
        >
          {whenLine(event)}
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

      <span
        className={`mt-4 inline-flex items-center gap-2 font-typewriter text-xs uppercase tracking-[0.25em] ${
          past ? "text-bone-white/40" : "text-gold"
        }`}
      >
        View details
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        >
          →
        </span>
      </span>
    </button>
  );
}

function EventModal({
  event,
  past,
  onClose,
}: {
  event: PreConferenceEvent;
  past: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `evt-${event.id}-title`;

  useEffect(() => {
    const prevActive = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevActive?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-void-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel — full-width sheet on phones, centred card on desktop */}
      <div
        ref={panelRef}
        className="relative w-full sm:max-w-lg max-h-[88vh] overflow-y-auto border border-ooze-green/30 bg-dark-ooze paper-grit p-6 sm:p-8 rounded-t-2xl sm:rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)]"
      >
        <div className="flex items-start justify-between gap-4 mb-4 border-b border-ooze-green/20 pb-4">
          <span
            className={`stamp !text-[0.6rem] !tracking-[0.25em] ${
              past ? "text-bone-white/40" : "text-ooze-green/90"
            }`}
          >
            {past ? "Past event" : "Upcoming"}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 -mt-1 -mr-1 h-9 w-9 flex items-center justify-center rounded-full text-bone-white/70 hover:text-gold hover:bg-toxic-green/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ooze-green cursor-pointer"
          >
            <span aria-hidden="true" className="text-xl leading-none">
              ×
            </span>
          </button>
        </div>

        {/* Flyer preview — a clickable poster that downloads the PDF.
            Falls back gracefully when the event has no thumbnail. */}
        {event.flyerThumb ? (
          event.flyer ? (
            <a
              href={event.flyer}
              download
              aria-label={`Download the ${event.title} flyer (PDF)`}
              className="group/flyer block w-40 sm:w-44 mx-auto mb-6"
            >
              <span className="relative block aspect-[3/4] overflow-hidden border border-ooze-green/40 paper-grit rotate-[-1.5deg] shadow-[0_8px_24px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover/flyer:rotate-0 group-hover/flyer:scale-[1.03]">
                <Image
                  src={event.flyerThumb}
                  alt={`${event.title} flyer`}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-2 right-2 stamp text-gold/95 !text-[0.55rem] !tracking-[0.25em] !py-0.5 !px-1.5 bg-void-black/70"
                >
                  Tap to print
                </span>
              </span>
            </a>
          ) : (
            <span className="block w-40 sm:w-44 mx-auto mb-6">
              <span className="relative block aspect-[3/4] overflow-hidden border border-ooze-green/40 paper-grit rotate-[-1.5deg] shadow-[0_8px_24px_rgba(0,0,0,0.55)]">
                <Image
                  src={event.flyerThumb}
                  alt={`${event.title} flyer`}
                  fill
                  className="object-cover"
                  sizes="180px"
                />
              </span>
            </span>
          )
        ) : null}

        <h2
          id={titleId}
          className="font-anton uppercase tracking-wide text-2xl sm:text-3xl leading-tight text-bone-white"
        >
          {event.title}
        </h2>

        <dl className="mt-4 space-y-2 font-typewriter text-xs sm:text-sm">
          <div className="flex gap-3">
            <dt className="text-bone-white/45 uppercase tracking-[0.2em] shrink-0 w-16">
              When
            </dt>
            <dd className="text-bone-white/85">{whenLine(event)}</dd>
          </div>
          <div className="flex gap-3">
            <dt className="text-bone-white/45 uppercase tracking-[0.2em] shrink-0 w-16">
              Where
            </dt>
            <dd className="text-bone-white/85">
              {event.location}
              {event.city ? (
                <span className="block text-bone-white/55">{event.city}</span>
              ) : null}
            </dd>
          </div>
        </dl>

        <p className="font-news text-bone-white/85 text-base leading-relaxed mt-5">
          {event.description}
        </p>

        <div className="mt-7 flex flex-col sm:flex-row gap-3">
          {event.flyer ? (
            <a
              href={event.flyer}
              download
              className="inline-flex items-center justify-center gap-2 font-typewriter text-xs uppercase tracking-[0.25em] text-void-black bg-gold px-5 py-3 rounded-md hover:bg-bone-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ooze-green"
            >
              Download flyer
              <span aria-hidden="true">↓</span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 font-typewriter text-xs uppercase tracking-[0.25em] text-bone-white/40 border border-bone-white/15 px-5 py-3 rounded-md">
              Flyer coming soon
            </span>
          )}

          {event.link ? (
            <Link
              href={event.link}
              className="inline-flex items-center justify-center gap-2 font-typewriter text-xs uppercase tracking-[0.25em] text-gold border border-gold/40 px-5 py-3 rounded-md hover:text-bone-white hover:border-bone-white transition-colors"
            >
              {event.linkLabel ?? "More"}
              <span aria-hidden="true">→</span>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function PreConferenceEvents({
  upcoming,
  past,
}: {
  upcoming: readonly PreConferenceEvent[];
  past: readonly PreConferenceEvent[];
}) {
  const [selected, setSelected] = useState<PreConferenceEvent | null>(null);
  const open = useCallback((e: PreConferenceEvent) => setSelected(e), []);
  const close = useCallback(() => setSelected(null), []);

  const selectedIsPast = selected
    ? past.some((e) => e.id === selected.id)
    : false;

  return (
    <>
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
                <EventCard
                  key={event.id}
                  event={event}
                  past={false}
                  onOpen={open}
                />
              ))}
            </div>
          ) : (
            <p className="font-news text-bone-white/70 text-base leading-relaxed">
              Nothing on the calendar right now.{" "}
              <Link
                href="/#mailing-list"
                className="text-gold border-b border-gold/40 hover:text-bone-white hover:border-bone-white transition-colors"
              >
                Stay in the loop
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
                <EventCard
                  key={event.id}
                  event={event}
                  past
                  onOpen={open}
                />
              ))}
            </div>

            <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.25em] uppercase text-bone-white/35 text-center mt-10">
              Kept on purpose — every step of the road counts
            </p>
          </div>
        </section>
      ) : null}

      {selected ? (
        <EventModal
          event={selected}
          past={selectedIsPast}
          onClose={close}
        />
      ) : null}
    </>
  );
}
