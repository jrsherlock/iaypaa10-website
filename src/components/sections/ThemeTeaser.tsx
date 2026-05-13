import BubblingOoze from "@/components/effects/BubblingOoze";

/**
 * ThemeTeaser — collapsed from a three-paragraph essay into a single
 * atmospheric pull-quote. The B-movie costume is loud; underneath, the
 * caption speaks plainly about what the conference actually is.
 */
export default function ThemeTeaser() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 overflow-hidden">
      {/* gradient bed */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0D0D0D 0%, #0A1A12 35%, #0A1A12 65%, #0D0D0D 100%)",
        }}
        aria-hidden="true"
      />
      <BubblingOoze className="absolute inset-0 z-0 opacity-35" />

      {/* halftone wash for the print feel */}
      <div
        className="absolute inset-0 z-[1] bg-halftone opacity-15 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* top mini-stamp */}
        <p className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 text-center mb-8">
          // coming attractions
        </p>

        {/* the big pull-quote — single line per word for poster effect */}
        <blockquote
          className="font-[family-name:var(--font-creepster)] text-ooze-green text-center leading-[0.95] tracking-wide"
          style={{
            fontSize: "clamp(3.5rem, 11vw, 8rem)",
            textShadow:
              "0 0 18px rgba(95,173,86,0.55), 0 0 60px rgba(77,144,120,0.35)",
          }}
        >
          <span className="block">Something</span>
          <span className="block">is surfacing</span>
        </blockquote>

        <p className="font-typewriter text-sm sm:text-base tracking-[0.2em] uppercase text-gold/90 text-center mt-8">
          — from the iowa swamp, august 2026
        </p>

        {/* the sincere caption — serif, not horror */}
        <p className="font-news text-bone-white/85 text-lg sm:text-xl leading-[1.7] text-center mt-12 max-w-xl mx-auto">
          A ten-year retrospective in three acts. B-movie horror on the outside,
          twelve steps on the inside &mdash; a weekend by and for young people
          in recovery, with anyone who wants to show up welcome at the door.
        </p>
      </div>
    </section>
  );
}
