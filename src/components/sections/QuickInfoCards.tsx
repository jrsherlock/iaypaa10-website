import Link from "next/link";

/**
 * The "Feature Program" — replaces a generic three-card grid.
 *
 * Reads like the back of a VHS box or a film-festival lineup card: a
 * numbered list of three acts, each with a punchy condensed-display
 * label, a typewriter line of detail, and a discrete pointer link.
 */

type Act = {
  num: string;
  label: string;
  body: string;
  href: string;
  cta: string;
  status?: string;
};

const ACTS: readonly Act[] = [
  {
    num: "I",
    label: "Reserve your seat",
    body:
      "Registration opens early 2026. Early-bird pricing first, scholarships available, no one turned away.",
    href: "/registration",
    cta: "Registration",
  },
  {
    num: "II",
    label: "Where you'll stay",
    body:
      "The Highlander Hotel, Iowa City. Group rate room block is open — bring a roommate, split the cost.",
    href: "/hotel",
    cta: "Hotel & venue",
    status: "block open",
  },
  {
    num: "III",
    label: "Give back, get in",
    body:
      "Join a committee, chair a meeting, work the merch table. Service keeps it ours and keeps it free.",
    href: "/outreach",
    cta: "Get involved",
  },
];

export default function QuickInfoCards() {
  return (
    <section className="relative py-20 sm:py-24 px-4 sm:px-6 overflow-hidden">
      {/* faint rule-line backdrop — like notebook paper showing through */}
      <div
        className="absolute inset-0 bg-rule-lines opacity-60 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-3xl mx-auto">
        {/* Section header — stamped, not centered ornament */}
        <div className="mb-12 sm:mb-16 flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4">
          <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
            Start here
          </span>
          <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wide text-bone-white leading-none">
            What you <span className="text-ooze-green">need</span> to know
          </h2>
        </div>

        <ol className="space-y-10 sm:space-y-12">
          {ACTS.map((act) => (
            <li
              key={act.num}
              className="group relative grid grid-cols-[auto_1fr] gap-5 sm:gap-7 items-start"
            >
              {/* Roman numeral — the projector slide-card */}
              <div className="flex flex-col items-center gap-1 select-none">
                <span
                  className="font-anton text-5xl sm:text-6xl text-ooze-green leading-none"
                  style={{
                    textShadow: "0 0 12px rgba(95,173,86,0.35)",
                  }}
                >
                  {act.num}
                </span>
                <span
                  className="h-6 w-px bg-ooze-green/30 mt-1"
                  aria-hidden="true"
                />
              </div>

              {/* Act content */}
              <div className="min-w-0 pt-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="font-anton text-2xl sm:text-3xl uppercase tracking-wide text-bone-white leading-tight">
                    {act.label}
                  </h3>
                  {act.status && (
                    <span className="font-typewriter text-[0.65rem] sm:text-xs tracking-[0.2em] uppercase text-ember/90 border border-ember/40 px-1.5 py-0.5">
                      {act.status}
                    </span>
                  )}
                </div>

                <p className="font-[family-name:var(--font-space)] text-bone-white/80 text-[0.95rem] sm:text-base leading-relaxed mb-3 max-w-prose">
                  {act.body}
                </p>

                <Link
                  href={act.href}
                  className="inline-flex items-center gap-2 font-typewriter text-xs sm:text-sm uppercase tracking-[0.25em] text-gold border-b border-gold/40 pb-0.5 transition-colors hover:text-bone-white hover:border-bone-white"
                >
                  {act.cta}
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </li>
          ))}
        </ol>

        {/* Bottom credits line — the small print at the foot of a poster */}
        <p className="mt-14 sm:mt-16 font-typewriter text-[0.7rem] sm:text-xs tracking-[0.25em] uppercase text-bone-white/40 text-center">
          presented by the IAYPAA X host committee · iowa city, ia
        </p>
      </div>
    </section>
  );
}
