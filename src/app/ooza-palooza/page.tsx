import type { Metadata } from "next";
import Image from "next/image";
import RisingMotes from "@/components/effects/RisingMotes";
import OozeThermometer from "@/components/ui/OozeThermometer";
import { CHALLENGE, CONFERENCE } from "@/lib/constants";
import { formatUSD, nextTier } from "@/lib/challenge";

export const metadata: Metadata = {
  title: "Ooza-Palooza",
  description: `The IAYPAA X Ooza-Palooza fundraiser: past and present Host & Advisory members take on escalating dares as the total climbs. ${formatUSD(CHALLENGE.raised)} raised so far — every dollar funds the conference and its scholarships.`,
  alternates: { canonical: "/ooza-palooza" },
};

/**
 * Ooza-Palooza — the fundraiser page. One pot: as the running total
 * crosses each tier, that dare is locked in. Everything on this page
 * derives from CHALLENGE in constants.ts; to post a new total, edit
 * `raised` there and redeploy.
 */
export default function OozaPaloozaPage() {
  const { raised, tiers } = CHALLENGE;
  const next = nextTier();

  return (
    <div className="relative">
      {/* ---------- Page header ---------- */}
      <section className="relative pt-20 pb-10 sm:pt-24 sm:pb-12 px-4 sm:px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-rule-lines opacity-50 pointer-events-none"
          aria-hidden="true"
        />
        <RisingMotes
          count={6}
          color="#5FAD56"
          className="absolute top-0 left-0 right-0 z-10"
        />

        <div className="relative z-20 max-w-4xl mx-auto">
          <div className="flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4 mb-8">
            <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              The fundraiser
            </span>
            <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-wide text-bone-white leading-none">
              Ooza-<span className="text-ooze-green">Palooza</span>
            </h1>
          </div>

          <div className="font-news text-bone-white/85 text-base sm:text-lg leading-[1.75] max-w-prose space-y-4">
            <p>
              Past and present IAYPAA Host &amp; Advisory members have
              committed to the dares below in celebration of our tenth annual
              conference. It&rsquo;s one pot: every dollar raised counts
              toward every challenge, and each time the total crosses a tier,
              that dare is locked in. No backing out.
            </p>
            <p>
              Join in by donating, pre-registering, or purchasing a
              scholarship — it all feeds the ooze.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Thermometer + tiers ---------- */}
      <section className="relative px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-[20rem_1fr] gap-8 sm:gap-10 items-start">
            {/* The balance widget */}
            <div className="max-w-[22rem] mx-auto w-full sm:sticky sm:top-24">
              <OozeThermometer />
            </div>

            {/* Tier ladder, top prize first */}
            <ol className="space-y-3">
              {[...tiers].reverse().map((tier) => {
                const unlocked = tier.amount <= raised;
                const isNext = next?.amount === tier.amount;
                return (
                  <li
                    key={tier.amount}
                    className={`border border-l-4 p-4 sm:p-5 ${
                      unlocked
                        ? "border-gold/25 border-l-gold bg-toxic-green/25"
                        : isNext
                          ? "border-ember/40 border-l-ember bg-void-black/50"
                          : "border-bone-white/10 border-l-bone-white/25 bg-void-black/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span
                          className={`font-[family-name:var(--font-mono)] text-sm tracking-wider ${
                            unlocked ? "text-gold" : "text-bone-white/55"
                          }`}
                        >
                          {formatUSD(tier.amount)}
                        </span>
                        <h3
                          className={`font-anton text-lg sm:text-xl uppercase tracking-wide leading-tight mt-0.5 ${
                            unlocked ? "text-bone-white" : "text-bone-white/85"
                          }`}
                        >
                          {tier.title}
                        </h3>
                        <p className="font-typewriter text-xs text-ooze-green/90 mt-1.5">
                          {tier.who}
                        </p>
                      </div>
                      {unlocked ? (
                        <span className="font-typewriter text-[0.65rem] tracking-[0.2em] uppercase text-void-black bg-gold px-2 py-1 shrink-0 mt-0.5">
                          ✓ Locked in
                        </span>
                      ) : isNext ? (
                        <span className="font-typewriter text-[0.65rem] tracking-[0.2em] uppercase text-ember border border-ember/50 px-2 py-1 shrink-0 mt-0.5">
                          Next up
                        </span>
                      ) : null}
                    </div>
                    {isNext ? (
                      <p className="font-news text-sm text-bone-white/70 leading-relaxed mt-2.5">
                        {formatUSD(tier.amount - raised)} more and this one
                        happens.
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- How to donate ---------- */}
      <section
        id="give"
        className="relative px-4 sm:px-6 pb-16 sm:pb-20 scroll-mt-20"
      >
        <div className="max-w-2xl mx-auto">
          <div className="relative bg-void-black border border-gold/40 paper-grit p-8 sm:p-10 text-center">
            <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-wide text-bone-white leading-none mb-5">
              Feed the <span className="text-gold">ooze</span>
            </h2>

            <p className="font-news text-bone-white/85 text-base sm:text-lg leading-[1.75] max-w-xl mx-auto mb-8">
              Every dollar counts toward the next dare — and all of it goes
              straight back into the weekend: keeping registration low and
              funding the scholarships that make sure no one is turned away
              for lack of funds.
            </p>

            <a
              href={CONFERENCE.cashApp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-gold text-void-black font-anton uppercase tracking-[0.15em] text-base sm:text-lg px-7 py-3.5 border-2 border-gold transition-all hover:bg-ember hover:border-ember hover:shadow-[0_0_24px_rgba(247,129,84,0.45)]"
            >
              Donate via Cash App
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>

            <p className="font-typewriter text-xs tracking-[0.2em] uppercase text-bone-white/50 mt-5">
              {CONFERENCE.cashApp.handle} · Venmo option coming soon
            </p>

            <p className="font-news text-sm text-bone-white/60 leading-relaxed mt-6 max-w-md mx-auto">
              Pre-registrations and scholarship purchases count toward the
              total too — so if you were going to register anyway, now it
              also gets somebody pied.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- The flyer ---------- */}
      <section className="relative px-4 sm:px-6 pb-20 sm:pb-24">
        <div className="relative max-w-2xl mx-auto">
          <div className="border border-ooze-green/25 bg-void-black/40 paper-grit p-3 sm:p-4">
            <Image
              src="/flyers/challenge-palooza.jpg"
              alt="IAYPAA X Ooza-Palooza challenge flyer listing all ten challenges: $50 Prank/Rejection Challenge, $100 Blind-Folded Drawing, $150 Lip Sync Battle, $300 Pie-in-Face, $500 Ghost Peppers & Onions, $750 Full Clown Makeup in Public, $1000 WWE IAYPAA Smackdown, $1500 Shave Eyebrows Off, $2000 IAYPAA-Themed Tattoo, and $2500 Fear Factor Snackboard."
              width={1400}
              height={1174}
              className="w-full h-auto"
              sizes="(min-width: 640px) 42rem, 100vw"
            />
          </div>
          <p className="mt-4 text-center">
            <a
              href="/flyers/challenge-palooza.jpg"
              download
              className="group inline-flex items-center gap-2 font-typewriter text-xs uppercase tracking-[0.25em] text-gold border-b border-gold/40 pb-0.5 transition-colors hover:text-bone-white hover:border-bone-white"
            >
              Download the flyer
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-y-0.5"
              >
                ↓
              </span>
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
