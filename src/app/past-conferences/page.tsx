import type { Metadata } from "next";
import GlowText from "@/components/ui/GlowText";
import DrippingSlime from "@/components/effects/DrippingSlime";
import { PAST_CONFERENCES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Past Conferences",
  description:
    "A visual timeline of all IAYPAA conferences, from the very first in 2017 to the 10th annual Primordial Ooze in 2026.",
};

export default function PastConferencesPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-4">
          <GlowText as="h1" className="mb-4">
            A Decade of IAYPAA
          </GlowText>
          <p className="text-bone-white/70 text-lg md:text-xl max-w-2xl mx-auto font-[family-name:var(--font-space)]">
            Ten years of recovery, fellowship, and unforgettable weekends
          </p>
        </div>
        <DrippingSlime count={10} />

        {/* Timeline */}
        <section className="relative max-w-4xl mx-auto">
          {/* Center timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ooze-green/60 via-swamp-teal/30 to-swamp-teal/60 md:-translate-x-px" />

          <div className="space-y-12 md:space-y-16">
            {PAST_CONFERENCES.map((conf, index) => {
              const isCurrentYear = conf.edition === "X";
              const isEven = index % 2 === 0;

              return (
                <div
                  key={conf.year}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 -translate-x-1/2 z-10 ${
                      isCurrentYear
                        ? "border-gold bg-gold shadow-[0_0_15px_#F2C14E,0_0_30px_#4D9078]"
                        : "border-ooze-green/60 bg-void-black"
                    }`}
                  />

                  {/* Card */}
                  <div
                    className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isEven ? "md:pr-0 md:mr-auto md:pl-0" : "md:pl-0 md:ml-auto md:pr-0"
                    }`}
                  >
                    <div
                      className={`rounded-xl border p-6 transition-all duration-300 ${
                        isCurrentYear
                          ? "border-gold/70 bg-toxic-green/20 shadow-[0_0_30px_rgba(242,193,78,0.2)] animate-pulse-glow"
                          : "border-ooze-green/20 bg-void-black/60 hover:border-ooze-green/40 hover:shadow-[0_0_15px_rgba(57,255,20,0.08)]"
                      }`}
                    >
                      {/* Edition badge */}
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className={`font-[family-name:var(--font-creepster)] text-2xl md:text-3xl ${
                            isCurrentYear
                              ? "text-gold glow-text-gold"
                              : "text-ooze-green/80 glow-text-subtle"
                          }`}
                        >
                          IAYPAA {conf.edition}
                        </span>
                        {isCurrentYear && (
                          <span className="rounded-full bg-gold px-3 py-0.5 text-xs font-bold text-void-black uppercase tracking-wider">
                            This Year
                          </span>
                        )}
                      </div>

                      {/* Year */}
                      <div className="font-[family-name:var(--font-mono)] text-sm text-ooze-green/70 mb-2 tracking-wider">
                        {conf.year}
                      </div>

                      {/* Theme */}
                      <h3
                        className={`font-[family-name:var(--font-space)] text-lg font-semibold mb-1 ${
                          isCurrentYear ? "text-gold" : "text-bone-white"
                        }`}
                      >
                        {conf.theme}
                      </h3>

                      {/* Location */}
                      <p className="text-bone-white/50 text-sm">
                        {conf.location}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom cap */}
          <div className="absolute left-4 md:left-1/2 -bottom-4 w-3 h-3 rounded-full bg-ooze-green/40 -translate-x-1/2" />
        </section>
      </div>
    </div>
  );
}
