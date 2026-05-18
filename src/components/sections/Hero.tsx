import Image from "next/image";
import { CONFERENCE } from "@/lib/constants";
import OozeButton from "@/components/ui/OozeButton";
import RisingMotes from "@/components/effects/RisingMotes";
import BubblingOoze from "@/components/effects/BubblingOoze";

/**
 * Hero — editorial "framed plate" composition (see docs/design-philosophy.md).
 *
 * The photograph is no longer a full-bleed background fighting the type.
 * It is a deliberately bordered photographic PLATE, set into a pure
 * void-black type zone — a print taped onto AA-flyer paper, stamped
 * "Exhibit A", consistent with the contact-sheet language used on the
 * Hotel page. Type and image are zoned, never overlapping, so the
 * composition reads as composed rather than crowded.
 *
 * Layout is a single explicitly-centered column (mx-auto) — no full-bleed
 * absolute layers, so it cannot inherit any document-level offset.
 *
 * Server component: all motion is CSS (poster-rise stagger on load).
 */
export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-void-black min-h-[100svh] flex items-center">
      {/* ---------- Atmosphere (behind everything, contained) ---------- */}
      <div
        className="absolute inset-0 bg-rule-lines opacity-40 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-halftone-lg opacity-30 mix-blend-soft-light pointer-events-none"
        aria-hidden="true"
      />
      <BubblingOoze className="absolute inset-0 z-0 opacity-70" />
      {/* Warm low glow so the headline reads as light rising out of dark */}
      <div
        className="absolute inset-x-0 top-1/3 h-1/2 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, rgba(242,193,78,0.10), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <RisingMotes
        count={6}
        color="#5FAD56"
        className="absolute top-0 left-0 right-0 z-10"
      />

      {/* ---------- The single centered column ---------- */}
      <div className="relative z-20 mx-auto w-full max-w-2xl px-5 sm:px-6 py-28 sm:py-24 flex flex-col items-center text-center">
        {/* Welcome ribbon */}
        <div
          className="poster-rise inline-flex items-center gap-3 mb-5"
          style={{ ["--i" as string]: 0 }}
        >
          <span className="h-px w-8 sm:w-10 bg-bone-white/50" />
          <span className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.35em] text-bone-white/85 uppercase">
            Welcome home
          </span>
          <span className="h-px w-8 sm:w-10 bg-bone-white/50" />
        </div>

        {/* The 10th Annual line */}
        <p
          className="poster-rise font-anton text-sm sm:text-lg tracking-[0.22em] sm:tracking-[0.25em] text-gold uppercase mb-4 leading-snug"
          style={{ ["--i" as string]: 1 }}
        >
          The 10<sup className="text-[0.65em] tracking-normal">th</sup> Annual
          Iowa Young People in A.A.
        </p>

        {/* Headline — the conference mark */}
        <h1
          className="poster-rise font-anton uppercase text-gold leading-[0.9] w-full"
          style={{
            ["--i" as string]: 2,
            fontSize: "clamp(3rem, 13vw, 6.5rem)",
            textShadow:
              "0 0 14px rgba(242,193,78,0.6), 0 0 40px rgba(247,129,84,0.4), 0 4px 0 rgba(0,0,0,0.45)",
            letterSpacing: "0.01em",
          }}
        >
          <span className="block">Primordial</span>
          <span className="block">Ooze</span>
        </h1>

        {/* First-light rule */}
        <div
          className="poster-rise w-44 sm:w-56 marquee-rule mt-6 mb-6"
          style={{ ["--i" as string]: 3 }}
          aria-hidden="true"
        />

        {/* Date + venue — plain typewriter, no box (the plate carries the frame) */}
        <p
          className="poster-rise font-typewriter text-bone-white tracking-[0.08em] text-base sm:text-lg"
          style={{ ["--i" as string]: 4 }}
        >
          Aug <span className="text-gold">14</span>—
          <span className="text-gold">16</span>, 2026
        </p>
        <p
          className="poster-rise font-typewriter text-xs sm:text-sm tracking-[0.12em] uppercase text-bone-white/65 mt-1"
          style={{ ["--i" as string]: 4 }}
        >
          {CONFERENCE.venue.name} · {CONFERENCE.location}
        </p>

        {/* The framed photographic plate — print taped to the page */}
        <figure
          className="poster-rise relative w-full max-w-[19rem] sm:max-w-sm aspect-[4/5] mt-9 sm:mt-10 mb-9 sm:mb-10 rotate-[-0.7deg]"
          style={{ ["--i" as string]: 5 }}
        >
          <div className="absolute inset-0 border border-ooze-green/35 paper-grit overflow-hidden">
            <Image
              src="/images/ooze.jpeg"
              alt="Primordial Ooze — the IAYPAA X conference artwork"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 640px) 19rem, 24rem"
            />
            {/* Cold green wash, consistent with the site's photo treatment */}
            <span
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                backgroundColor: "rgba(95,173,86,0.12)",
                mixBlendMode: "multiply",
              }}
            />
            {/* Bottom dark fade so the caption sits on something */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/3"
              style={{
                background:
                  "linear-gradient(to top, rgba(13,13,13,0.85), transparent)",
              }}
            />
            <span
              aria-hidden="true"
              className="absolute top-3 left-3 stamp text-gold/90 !text-[0.6rem] !tracking-[0.3em] !py-0.5 !px-1.5 bg-void-black/60"
            >
              Exhibit A
            </span>
          </div>
          <figcaption className="absolute bottom-3 left-3 right-3 font-typewriter text-[0.6rem] sm:text-[0.65rem] tracking-[0.22em] uppercase text-bone-white/75 text-left">
            {CONFERENCE.edition} · {CONFERENCE.location}
          </figcaption>
        </figure>

        {/* Single CTA */}
        <div
          className="poster-rise"
          style={{ ["--i" as string]: 6 }}
        >
          <OozeButton href="/registration" variant="primary">
            Reserve your seat
          </OozeButton>
        </div>

        {/* Who this is for — quiet, centered, on the page (not floating) */}
        <p
          className="poster-rise mt-10 font-typewriter text-[0.6rem] sm:text-[0.7rem] tracking-[0.25em] uppercase text-bone-white/45"
          style={{ ["--i" as string]: 7 }}
        >
          All are welcome · by &amp; for young people in A.A.
        </p>
      </div>

      {/* Scroll hint — bottom edge, centered, out of the way */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-bone-white/35"
      >
        <span className="font-typewriter text-[0.6rem] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <span className="h-6 w-px bg-ooze-green/40" />
      </div>
    </section>
  );
}
