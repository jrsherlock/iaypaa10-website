"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CONFERENCE } from "@/lib/constants";
import GlowText from "@/components/ui/GlowText";
import OozeButton from "@/components/ui/OozeButton";
import DrippingSlime from "@/components/effects/DrippingSlime";
import BubblingOoze from "@/components/effects/BubblingOoze";
import Scanlines from "@/components/effects/Scanlines";

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
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Parallax: translate the poster upward as user scrolls (max ~100px shift)
  const parallaxOffset = scrollY * 0.35;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Poster background image with slow zoom + parallax */}
      <div
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Outer div: parallax translateY on scroll */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(-${parallaxOffset}px)`,
            willChange: "transform",
          }}
        >
          {/* Inner div: slow zoom CSS animation */}
          <div className="animate-slow-zoom absolute inset-0">
            <Image
              src="/images/ooze.jpeg"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>
      </div>

      {/* Green color tint overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundColor: "rgba(95, 173, 86, 0.12)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Dark gradient overlay for text readability */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(to bottom, #0D0D0D 0%, rgba(13, 13, 13, 0.7) 15%, rgba(13, 13, 13, 0.3) 40%, rgba(13, 13, 13, 0.3) 60%, rgba(13, 13, 13, 0.7) 85%, #0D0D0D 100%)",
        }}
      />

      {/* Bubbling ooze background effect */}
      <BubblingOoze className="absolute inset-0 z-[3]" />

      {/* Dripping slime at top */}
      <DrippingSlime
        count={12}
        color="#5FAD56"
        className="absolute top-0 left-0 right-0 z-10"
      />

      {/* Scanlines overlay */}
      <Scanlines className="absolute inset-0 z-20" opacity={0.04} />

      {/* Content — pushed to bottom on mobile so image subject is visible */}
      <div className="relative z-30 flex flex-col items-center text-center px-4 sm:px-6 mt-auto mb-16 sm:mt-0 sm:mb-0">
        <GlowText
          as="h1"
          glow="strong"
          className="font-[family-name:var(--font-creepster)] text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] text-ooze-green leading-none tracking-wider"
        >
          {CONFERENCE.name}
        </GlowText>

        <p className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-creepster)] text-gold tracking-wide">
          {CONFERENCE.tagline}
        </p>

        <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-bone-white font-[family-name:var(--font-space)]">
          {CONFERENCE.location} | {CONFERENCE.date}
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6">
          <OozeButton href="/registration" variant="primary">
            Register Now
          </OozeButton>
          <OozeButton href="/about" variant="secondary">
            Learn More
          </OozeButton>
        </div>
      </div>
    </section>
  );
}
