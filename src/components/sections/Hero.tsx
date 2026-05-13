"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CONFERENCE } from "@/lib/constants";
import OozeButton from "@/components/ui/OozeButton";
import DrippingSlime from "@/components/effects/DrippingSlime";
import BubblingOoze from "@/components/effects/BubblingOoze";
import Scanlines from "@/components/effects/Scanlines";

/**
 * Hero — composed as a B-movie one-sheet, not a SaaS hero section.
 *
 * Layered, in stacking order:
 *   1. Poster image (parallaxed, slow-zoom)
 *   2. Halftone + green tint + dark vignette (the "xerox of newsprint" feel)
 *   3. Atmospheric effects (bubbles, scanlines, drips at the top edge)
 *   4. Oversized roman "X" watermark — the 10th-annual mark
 *   5. Typography stack: top stamp -> tagline -> conference mark ->
 *      typewriter date stub -> single CTA -> rated-YP footnote
 *
 * Almost every element has a small intentional tilt or off-axis nudge so
 * the composition reads as "made by hand" rather than "centered by CSS".
 */
export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    function handleScroll() {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafRef.current = null;
      });
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Gentler parallax than before — the X watermark and typography do the
  // visual work; the photo is atmosphere, not the star.
  const parallaxOffset = scrollY * 0.25;

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* ---------- L1: Poster image (parallax + slow zoom) ---------- */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(-${parallaxOffset}px)`,
            willChange: "transform",
          }}
        >
          <div className="animate-slow-zoom absolute inset-0">
            <Image
              src="/images/ooze.jpeg"
              alt=""
              fill
              priority
              className="object-cover object-[center_70%] sm:object-center"
              sizes="100vw"
            />
          </div>
        </div>
      </div>

      {/* ---------- L2: print treatments stacked over the photo ---------- */}
      {/* Green ink wash */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundColor: "rgba(95, 173, 86, 0.14)",
          mixBlendMode: "multiply",
        }}
        aria-hidden="true"
      />
      {/* Halftone dot field for the xerox feel */}
      <div
        className="absolute inset-0 z-[2] bg-halftone-lg opacity-30 mix-blend-soft-light"
        aria-hidden="true"
      />
      {/* Dark vignette — text legibility, not "gradient hero overlay" */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 60%, rgba(13,13,13,0.2) 0%, rgba(13,13,13,0.55) 55%, rgba(13,13,13,0.95) 100%)",
        }}
        aria-hidden="true"
      />

      {/* ---------- L3: atmosphere ---------- */}
      <BubblingOoze className="absolute inset-0 z-[3]" />
      <DrippingSlime
        count={6}
        color="#5FAD56"
        className="absolute top-0 left-0 right-0 z-10"
      />
      <Scanlines className="absolute inset-0 z-20" opacity={0.035} />

      {/* ---------- L4: typography stack ---------- */}
      <div className="relative z-30 flex flex-col items-center text-center px-5 sm:px-6 max-w-[52rem] w-full">
        {/* Top ribbon — "ONE WEEKEND ONLY" stamp */}
        <div
          className="poster-rise inline-flex items-center gap-3 mb-6 sm:mb-8"
          style={{ "--i": 0 } as React.CSSProperties}
        >
          <span className="h-px w-6 sm:w-10 bg-bone-white/50" />
          <span className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.35em] text-bone-white/85 uppercase">
            One Weekend Only · Aug 2026
          </span>
          <span className="h-px w-6 sm:w-10 bg-bone-white/50" />
        </div>

        {/* The "10th Annual" line — small, condensed, like a movie subtitle card */}
        <p
          className="poster-rise font-anton text-base sm:text-lg tracking-[0.25em] text-gold uppercase mb-3"
          style={{ ["--i" as string]: 1 }}
        >
          The 10<sup className="text-[0.65em] tracking-normal">th</sup> Annual Iowa
          Young People in A.A.
        </p>

        {/* Headline: PRIMORDIAL OOZE — drippy Creepster, the "movie title".
            Sized to fit the smallest QR-scan viewport without clipping the
            final 'l' in Primordial. Gold (was green) so it pops against
            the green-cast poster image behind it. */}
        <h1
          className="poster-rise font-[family-name:var(--font-creepster)] text-gold leading-[0.85] w-full"
          style={{
            ["--i" as string]: 2,
            // Sized so "Primordial" fits without clipping at any viewport.
            // Creepster glyphs run ~0.65em wide; longest word is 10 chars.
            // At 6rem max font, that's ~672px — fits inside the 52rem column.
            fontSize: "clamp(2.5rem, 10vw, 6rem)",
            textShadow:
              "0 0 14px rgba(242,193,78,0.65), 0 0 40px rgba(247,129,84,0.45), 0 4px 0 rgba(0,0,0,0.45)",
            letterSpacing: "0.01em",
          }}
        >
          <span className="block whitespace-nowrap">Primordial</span>
          <span className="block -mt-1 sm:-mt-2 whitespace-nowrap">Ooze</span>
        </h1>

        {/* Marquee bar */}
        <div
          className="poster-rise w-44 sm:w-56 marquee-rule mt-6 sm:mt-8 mb-6 sm:mb-7"
          style={{ ["--i" as string]: 3 }}
          aria-hidden="true"
        />

        {/* Typewriter date stub — stapled-on ticket, slightly off-axis */}
        <div
          className="poster-rise relative font-typewriter text-bone-white tracking-[0.08em] border border-bone-white/25 px-5 py-3 bg-void-black/40 backdrop-blur-[1px]"
          style={{
            ["--i" as string]: 4,
            transform: "rotate(-1.6deg)",
          }}
        >
          {/* tape strip across the top of the "ticket" */}
          <span
            aria-hidden="true"
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-3 tape-strip rotate-[2deg]"
          />
          <p className="text-base sm:text-lg">
            Aug <span className="text-gold">14</span>—<span className="text-gold">16</span>, 2026
          </p>
          <p className="mt-0.5 text-xs sm:text-sm text-bone-white/80">
            {CONFERENCE.venue.name} · {CONFERENCE.location}
          </p>
        </div>

        {/* Single CTA — no choice paralysis */}
        <div
          className="poster-rise mt-9 sm:mt-11"
          style={{ ["--i" as string]: 5 }}
        >
          <OozeButton href="/registration" variant="primary">
            Reserve your seat
          </OozeButton>
        </div>
      </div>

      {/* ---------- Corner stamp: "Rated YP", absolutely positioned on the
                     poster like a real ink stamp — asymmetric, off-axis,
                     not part of the centered column. ---------- */}
      <div
        className="absolute bottom-6 left-4 sm:bottom-10 sm:left-8 z-30 poster-rise flex flex-col items-start gap-1 max-w-[10rem] sm:max-w-[14rem]"
        style={{ ["--i" as string]: 6 }}
      >
        <span className="stamp text-ooze-green/90 !text-[0.65rem] sm:!text-xs !tracking-[0.25em]">
          Rated YP
        </span>
        <span className="font-typewriter text-[0.6rem] sm:text-[0.7rem] tracking-[0.18em] uppercase text-bone-white/55 leading-snug">
          by &amp; for young
          <br />
          people in A.A.
        </span>
      </div>

      {/* ---------- Opposite-corner colophon: tiny typewriter signature so the
                     bottom edge feels printed-and-stapled, not floating. ---------- */}
      <div
        className="hidden sm:flex absolute bottom-10 right-8 z-30 poster-rise flex-col items-end gap-0.5 text-bone-white/45"
        style={{ ["--i" as string]: 6 }}
        aria-hidden="true"
      >
        <span className="font-typewriter text-[0.6rem] tracking-[0.35em] uppercase">
          Iowa City · MMXXVI
        </span>
        <span className="font-typewriter text-[0.55rem] tracking-[0.3em] uppercase">
          Edition 10
        </span>
      </div>

      {/* ---------- bottom edge: scroll hint, tiny and not in the way ---------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-bone-white/40"
      >
        <span className="font-typewriter text-[0.6rem] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <span className="h-6 w-px bg-ooze-green/40" />
      </div>
    </section>
  );
}
