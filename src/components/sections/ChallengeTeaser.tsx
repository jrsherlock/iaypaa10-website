import Link from "next/link";
import { CHALLENGE } from "@/lib/constants";
import { formatUSD, nextTier, scaleFraction } from "@/lib/challenge";

/**
 * Home-page Ooza-Palooza teaser — right after the hero. A horizontal
 * goo bar (same even-tier scale as the thermometer) with the current
 * total, the next dare on the line, and a pointer to the full page.
 */
export default function ChallengeTeaser() {
  const { raised, goal, tiers } = CHALLENGE;
  const next = nextTier();
  const pct = scaleFraction(raised) * 100;

  return (
    <section className="relative px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-3xl mx-auto">
        <div className="relative border border-ooze-green/30 bg-toxic-green/25 paper-grit p-6 sm:p-9">
          <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.35em] uppercase text-ooze-green mb-3">
            Fundraiser · one pot, ten dares
          </p>

          <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wide text-bone-white leading-[0.95] mb-4">
            Ooza-<span className="text-ooze-green">Palooza</span>
          </h2>

          <p className="font-news text-bone-white/85 text-base sm:text-lg leading-[1.7] max-w-prose mb-6">
            Host &amp; Advisory members past and present have signed up for
            escalating dares as the total climbs.{" "}
            {next ? (
              <>
                At {formatUSD(next.amount)}: <em>{next.short}</em>. No backing
                out.
              </>
            ) : (
              <>Every dare is unlocked. See what you did.</>
            )}
          </p>

          {/* Goo progress bar */}
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={goal}
            aria-valuenow={raised}
            aria-label={`${formatUSD(raised)} raised of ${formatUSD(goal)}`}
            className="relative h-5 border border-bone-white/25 bg-void-black/60 overflow-hidden mb-2"
          >
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-swamp-teal via-ooze-green to-ooze-green"
              style={{ width: `${pct}%` }}
            />
            {/* tier notches */}
            {tiers.map((t, i) => (
              <span
                key={t.amount}
                aria-hidden="true"
                className={`absolute inset-y-0 w-px ${
                  t.amount <= raised ? "bg-void-black/50" : "bg-bone-white/20"
                }`}
                style={{ left: `${((i + 1) / tiers.length) * 100}%` }}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-7">
            <span className="font-[family-name:var(--font-mono)] text-sm text-gold tracking-wider">
              {formatUSD(raised)} raised
            </span>
            <span className="font-typewriter text-[0.65rem] sm:text-xs tracking-[0.2em] uppercase text-bone-white/50">
              of {formatUSD(goal)} · as of {CHALLENGE.updated}
            </span>
          </div>

          <Link
            href="/ooza-palooza"
            className="group inline-flex items-center gap-3 bg-gold text-void-black font-anton uppercase tracking-[0.15em] text-base sm:text-lg px-7 py-3.5 border-2 border-gold transition-all hover:bg-ember hover:border-ember hover:shadow-[0_0_24px_rgba(247,129,84,0.45)]"
          >
            See the dares &amp; donate
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
