import type { Metadata } from "next";
import DrippingSlime from "@/components/effects/DrippingSlime";
import ComingSoon from "@/components/ui/ComingSoon";
import SlimeDivider from "@/components/ui/SlimeDivider";
import { CONFERENCE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Speakers",
  description: `The speaker lineup for ${CONFERENCE.name} — Primordial Ooze. Nominations open, full cast TBA.`,
};

/**
 * Six anonymous slots in the lineup — placeholder until the host
 * committee confirms speakers. Kept as a small constant so the layout
 * doesn't pretend there's more here than there is.
 */
const SLOTS = Array.from({ length: 6 }, (_, i) => i + 1);

export default function SpeakersPage() {
  return (
    <div className="relative">
      {/* ---------- Page header ---------- */}
      <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-rule-lines opacity-50 pointer-events-none"
          aria-hidden="true"
        />
        <DrippingSlime
          count={5}
          color="#5FAD56"
          className="absolute top-0 left-0 right-0 z-10"
        />

        <div className="relative z-20 max-w-3xl mx-auto">
          <div className="flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4 mb-8">
            <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              Reel 04
            </span>
            <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-wide text-bone-white leading-none">
              The <span className="text-ooze-green">Cast</span>
            </h1>
          </div>

          <p className="font-typewriter text-sm sm:text-base tracking-[0.15em] uppercase text-bone-white/70 leading-relaxed">
            Speakers · panelists · workshop leaders &nbsp;//&nbsp; in alphabetical order of confirmation
          </p>
        </div>
      </section>

      {/* ---------- TBA notice ---------- */}
      <section className="relative px-4 sm:px-6 pb-16 sm:pb-20">
        <ComingSoon
          title="Speaker Lineup"
          subtitle="The host committee is finalizing the lineup — keynote speakers, panelists, and workshop leaders. Get on the list to hear it the day it drops."
          showEmailSignup
        />
      </section>

      {/* ---------- Placeholder lineup grid ---------- */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-rule-lines opacity-50 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto">
          <div className="mb-10 sm:mb-12 flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4">
            <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              Slots
            </span>
            <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wide text-bone-white leading-none">
              Six <span className="text-ooze-green">voices</span> · tba
            </h2>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {SLOTS.map((n) => (
              <li
                key={n}
                className="group relative border border-ooze-green/25 bg-void-black/50 paper-grit p-5 sm:p-6"
              >
                {/* number marker — like the back of a wrestling card or playbill */}
                <div className="flex items-baseline justify-between mb-4 border-b border-ooze-green/20 pb-2">
                  <span className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.3em] uppercase text-bone-white/55">
                    Voice {String(n).padStart(2, "0")}
                  </span>
                  <span className="font-typewriter text-[0.65rem] tracking-[0.25em] uppercase text-ember/85 border border-ember/40 px-1.5 py-0.5">
                    TBA
                  </span>
                </div>

                {/* the "name plate" — silhouette / unknown */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-toxic-green/30 border border-ooze-green/30">
                    <span
                      aria-hidden="true"
                      className="font-anton text-2xl sm:text-3xl text-ooze-green/70"
                    >
                      ?
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-anton text-lg sm:text-xl uppercase tracking-wide text-bone-white leading-tight">
                      Name redacted
                    </p>
                    <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.2em] uppercase text-bone-white/45 mt-1">
                      To be announced
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.25em] uppercase text-bone-white/40 text-center mt-10">
            // names withheld in keeping with the eleventh tradition
          </p>
        </div>
      </section>

      <SlimeDivider />

      {/* ---------- Call for nominations — the casting call ---------- */}
      <section className="relative px-4 sm:px-6 py-20 sm:py-24">
        <div className="relative max-w-2xl mx-auto">
          {/* tape pinning the casting call up */}
          <span
            aria-hidden="true"
            className="absolute -top-3 left-10 w-20 h-5 tape-strip rotate-[-3deg]"
          />
          <span
            aria-hidden="true"
            className="absolute -top-3 right-10 w-20 h-5 tape-strip rotate-[4deg]"
          />

          <div className="relative bg-toxic-green/35 border border-gold/35 paper-grit p-8 sm:p-10">
            <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.35em] uppercase text-gold mb-4">
              // casting call · nominations open
            </p>

            <h2
              className="font-[family-name:var(--font-creepster)] text-gold leading-[0.95] mb-4"
              style={{
                fontSize: "clamp(2.2rem, 7vw, 4rem)",
                textShadow:
                  "0 0 14px rgba(242,193,78,0.55), 0 0 36px rgba(247,129,84,0.35)",
              }}
            >
              Know someone
              <br />
              who carries it well?
            </h2>

            <div className="marquee-rule w-28 sm:w-36 mb-6" aria-hidden="true" />

            <div className="font-news text-bone-white/85 text-base sm:text-lg leading-[1.7] space-y-4 mb-7 max-w-prose">
              <p>
                We&rsquo;re looking for speakers, panelists, and workshop leaders
                whose story carries the message — strong sobriety, a
                compelling voice, and the willingness to pass it on to the
                young people in the room.
              </p>
              <p>
                Nominate yourself or someone you know. The committee reviews
                every name and follows up directly. Identities stay confidential
                outside the fellowship in keeping with the Eleventh Tradition.
              </p>
            </div>

            <a
              href={`mailto:${CONFERENCE.email}?subject=IAYPAA X Speaker Nomination`}
              className="group inline-flex items-center gap-3 bg-gold text-void-black font-anton uppercase tracking-[0.15em] text-base sm:text-lg px-7 py-3.5 border-2 border-gold transition-all hover:bg-ember hover:border-ember hover:shadow-[0_0_24px_rgba(247,129,84,0.45)]"
            >
              Send a nomination
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>

            <p className="font-typewriter text-xs tracking-[0.2em] uppercase text-bone-white/55 mt-4">
              opens your email · {CONFERENCE.email}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
