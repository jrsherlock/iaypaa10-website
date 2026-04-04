import GlowText from "@/components/ui/GlowText";
import BubblingOoze from "@/components/effects/BubblingOoze";

export default function ThemeTeaser() {
  return (
    <section className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
      {/* Dark gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0D0D0D 0%, #0A1A12 40%, #0A1A12 60%, #0D0D0D 100%)",
        }}
      />

      {/* Bubbling ooze in background */}
      <BubblingOoze className="absolute inset-0 z-0 opacity-40" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <GlowText
          as="h2"
          glow="strong"
          className="font-[family-name:var(--font-creepster)] text-4xl sm:text-5xl md:text-6xl text-ooze-green mb-8"
        >
          Welcome to the Ooze
        </GlowText>

        <p className="text-lg sm:text-xl text-bone-white/90 leading-relaxed mb-6 font-[family-name:var(--font-space)]">
          The 10th annual IAYPAA conference goes where no YPAA has gone
          before&mdash;deep into the bubbling, dripping, gloriously gross world
          of <span className="text-gold font-semibold">Primordial Ooze</span>.
        </p>

        <p className="text-base sm:text-lg text-bone-white/75 leading-relaxed mb-6 font-[family-name:var(--font-space)]">
          Inspired by the creature features and B-movie horror classics that
          kept us up past our bedtimes, IAYPAA X transforms Iowa City into a
          retro sci-fi nightmare&mdash;complete with slime, scanlines, and
          things that glow in the dark. Beneath the campy thrills, the heart of
          the conference remains the same: young people in recovery coming
          together to share experience, strength, and hope.
        </p>

        <p className="text-base sm:text-lg text-bone-white/75 leading-relaxed font-[family-name:var(--font-space)]">
          Whether you&rsquo;re a conference veteran or a newcomer to IAYPAA,
          this is a weekend you won&rsquo;t forget. Something is rising from the
          ooze&mdash;and it looks a lot like{" "}
          <span className="text-swamp-teal font-semibold">fellowship</span>.
        </p>
      </div>
    </section>
  );
}
