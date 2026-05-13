import type { Metadata } from "next";
import { CONFERENCE } from "@/lib/constants";
import DrippingSlime from "@/components/effects/DrippingSlime";
import SlimeDivider from "@/components/ui/SlimeDivider";

export const metadata: Metadata = {
  title: "Registration",
  description: `Reserve your seat at ${CONFERENCE.name}. Early-bird $20, at-the-door TBA, scholarships available. ${CONFERENCE.date} in ${CONFERENCE.location}.`,
};

const REGISTRATION_URL =
  "https://my.cheddarup.com/c/iaypaa-x-registrations/items";

type Tier = {
  num: string;
  name: string;
  price: string;
  note: string;
  includes: readonly string[];
  highlighted: boolean;
  stamp?: string;
};

const TIERS: readonly Tier[] = [
  {
    num: "01",
    name: "Early Bird",
    price: "$20",
    note: "Limited-time price. Going up — get in before it does.",
    includes: [
      "Full weekend access",
      "Conference swag bag",
      "All speaker sessions",
      "Workshops & panels",
      "Fellowship events",
    ],
    highlighted: true,
    stamp: "Best deal",
  },
  {
    num: "02",
    name: "At the Door",
    price: "TBA",
    note: "Walk-in registration — subject to availability.",
    includes: [
      "Full weekend access",
      "All speaker sessions",
      "Workshops & panels",
      "Fellowship events",
    ],
    highlighted: false,
  },
];

export default function RegistrationPage() {
  return (
    <div className="relative">
      {/* ---------- Page header — stamped, asymmetric, not centered Creepster ---------- */}
      <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 overflow-hidden">
        {/* faint rule-line backdrop */}
        <div
          className="absolute inset-0 bg-rule-lines opacity-50 pointer-events-none"
          aria-hidden="true"
        />
        {/* a few drips at the top edge to tie it to the homepage hero */}
        <DrippingSlime
          count={5}
          color="#5FAD56"
          className="absolute top-0 left-0 right-0 z-10"
        />

        <div className="relative z-20 max-w-3xl mx-auto">
          <div className="flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4 mb-8">
            <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              Reel 02
            </span>
            <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-wide text-bone-white leading-none">
              The <span className="text-ooze-green">Box</span> Office
            </h1>
          </div>

          <p className="font-typewriter text-sm sm:text-base tracking-[0.15em] uppercase text-bone-white/70 leading-relaxed">
            {CONFERENCE.date} &nbsp;·&nbsp; {CONFERENCE.venue.name}
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> &nbsp;·&nbsp; </span>
            {CONFERENCE.location}
          </p>
        </div>
      </section>

      {/* ---------- Primary CTA — marquee panel ---------- */}
      <section className="relative px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="relative max-w-2xl mx-auto">
          {/* tape strips */}
          <span
            aria-hidden="true"
            className="absolute -top-3 left-8 w-20 h-5 tape-strip rotate-[-5deg]"
          />
          <span
            aria-hidden="true"
            className="absolute -top-3 right-8 w-20 h-5 tape-strip rotate-[4deg]"
          />

          <div className="relative bg-toxic-green/35 border border-ooze-green/30 paper-grit p-8 sm:p-12">
            <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.35em] uppercase text-gold mb-4">
              // tickets on sale
            </p>

            <h2
              className="font-[family-name:var(--font-creepster)] text-ooze-green leading-[0.9] mb-4"
              style={{
                fontSize: "clamp(2.5rem, 9vw, 5.5rem)",
                textShadow:
                  "0 0 14px rgba(95,173,86,0.55), 0 0 40px rgba(77,144,120,0.4)",
              }}
            >
              Registration
              <br />
              is open
            </h2>

            <div
              className="marquee-rule w-32 sm:w-40 mb-6"
              aria-hidden="true"
            />

            <p className="font-news text-bone-white/85 text-base sm:text-lg leading-relaxed mb-8 max-w-prose">
              Tickets are processed off-site through Cheddar Up — the same
              7th-tradition friendly payment service the host committee has
              used for years. You&rsquo;ll pick your tier on the next screen.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 bg-gold text-void-black font-anton uppercase tracking-[0.15em] text-base sm:text-lg px-7 py-3.5 border-2 border-gold transition-all hover:bg-ember hover:border-ember hover:shadow-[0_0_24px_rgba(247,129,84,0.45)]"
              >
                Reserve your seat
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
              <span className="font-typewriter text-xs tracking-[0.2em] uppercase text-bone-white/55">
                opens cheddar up · new tab
              </span>
            </div>
          </div>
        </div>
      </section>

      <SlimeDivider />

      {/* ---------- Pricing tiers — ticket stubs, not card grid ---------- */}
      <section className="relative px-4 sm:px-6 py-20 sm:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-rule-lines opacity-50 pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4 mb-12 sm:mb-14">
            <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              Tiers
            </span>
            <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wide text-bone-white leading-none">
              Two ways <span className="text-ooze-green">in</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {TIERS.map((tier, i) => (
              <TicketStub key={tier.num} tier={tier} index={i} />
            ))}
          </div>

          <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.25em] uppercase text-bone-white/40 text-center mt-12 sm:mt-14">
            // prices reviewed quarterly by the host committee
          </p>
        </div>
      </section>

      <SlimeDivider />

      {/* ---------- Scholarship — the costume comes off ---------- */}
      <section className="relative px-4 sm:px-6 py-20 sm:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-bone-white/15" aria-hidden="true" />
            <span className="font-typewriter text-xs tracking-[0.3em] uppercase text-bone-white/55">
              the plain truth
            </span>
            <span className="h-px flex-1 bg-bone-white/15" aria-hidden="true" />
          </div>

          <h2 className="font-news text-3xl sm:text-4xl text-bone-white leading-tight mb-6 text-center">
            No one is turned away for lack of funds.
          </h2>

          <p className="font-news text-lg sm:text-xl text-bone-white/85 leading-[1.75] text-center mb-6">
            IAYPAA is self-supporting through our own contributions, in the
            spirit of the Seventh Tradition. If the ticket price is the only
            thing standing between you and a weekend that might matter, write
            to us &mdash; we&rsquo;ll work it out, quietly, and with no
            questions you don&rsquo;t want to answer.
          </p>

          <p className="font-typewriter text-sm tracking-[0.15em] uppercase text-center text-bone-white/75">
            scholarship inquiries:{" "}
            <a
              href={`mailto:${CONFERENCE.email}`}
              className="text-gold underline underline-offset-4 decoration-gold/40 hover:decoration-gold transition-colors normal-case tracking-normal"
            >
              {CONFERENCE.email}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   TicketStub — perforated two-pane "ADMIT ONE" stub.
   Left: the big stamp with tier label + price.
   Right: the matrix of what's included.
   Featured tier is tilted slightly and carries a stamp.
   ============================================================ */
function TicketStub({ tier, index }: { tier: Tier; index: number }) {
  const tilt = index === 0 ? "rotate-[-1deg]" : "rotate-[1deg]";

  return (
    <div
      className={`relative ${tilt} ${tier.highlighted ? "" : "opacity-95"}`}
    >
      {/* the stub */}
      <div
        className={`relative grid grid-cols-[1fr_auto] sm:grid-cols-[1fr] md:grid-cols-[1fr] bg-void-black border ${
          tier.highlighted
            ? "border-gold/60 shadow-[0_0_28px_rgba(242,193,78,0.18)]"
            : "border-ooze-green/30"
        } paper-grit`}
      >
        {/* stamp ribbon for highlighted tier */}
        {tier.highlighted && tier.stamp && (
          <span className="absolute -top-3 right-4 z-10 stamp text-gold !text-[0.65rem] sm:!text-xs !tracking-[0.28em]">
            {tier.stamp}
          </span>
        )}

        {/* perforation strip down the left edge — dotted line + half-circle notches */}
        <span
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-6 w-px border-l border-dashed border-bone-white/20"
        />
        <span
          aria-hidden="true"
          className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-void-black border border-bone-white/15"
          style={{
            backgroundColor: "var(--color-void-black)",
          }}
        />

        <div className="col-span-full px-9 sm:px-10 py-8 sm:py-10">
          <div className="flex items-baseline gap-3 mb-1">
            <span className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.3em] uppercase text-bone-white/50">
              No. {tier.num}
            </span>
            <span className="h-px flex-1 bg-bone-white/15" aria-hidden="true" />
          </div>

          <h3 className="font-anton text-3xl sm:text-4xl uppercase tracking-wide text-bone-white leading-none mb-3">
            {tier.name}
          </h3>

          <div className="flex items-baseline gap-3 mb-5">
            <span
              className={`font-[family-name:var(--font-mono)] text-5xl sm:text-6xl font-bold leading-none ${
                tier.price === "TBA" ? "text-bone-white/45" : "text-gold"
              }`}
              style={
                tier.price === "TBA"
                  ? undefined
                  : {
                      textShadow:
                        "0 0 14px rgba(242,193,78,0.35), 0 2px 0 rgba(0,0,0,0.4)",
                    }
              }
            >
              {tier.price}
            </span>
            <span className="font-typewriter text-xs tracking-[0.25em] uppercase text-bone-white/45">
              {tier.price === "TBA" ? "to be announced" : "weekend pass"}
            </span>
          </div>

          <p className="font-news text-bone-white/80 text-sm sm:text-base leading-relaxed mb-6">
            {tier.note}
          </p>

          {/* the matrix of inclusions — typewriter, like a real ticket */}
          <ul className="space-y-1.5 mb-7">
            {tier.includes.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 font-typewriter text-[0.8rem] sm:text-sm tracking-[0.05em] text-bone-white/75 leading-snug"
              >
                <span
                  aria-hidden="true"
                  className="text-ooze-green mt-0.5 shrink-0"
                >
                  ⊕
                </span>
                {feature}
              </li>
            ))}
          </ul>

          {tier.highlighted ? (
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-gold text-void-black font-anton uppercase tracking-[0.15em] text-sm sm:text-base px-6 py-3 border-2 border-gold transition-all hover:bg-ember hover:border-ember"
            >
              Buy this ticket
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          ) : (
            <p className="font-typewriter text-xs tracking-[0.2em] uppercase text-bone-white/45">
              available at registration desk
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
