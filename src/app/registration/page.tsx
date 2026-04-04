import GlowText from "@/components/ui/GlowText";
import SlimeDivider from "@/components/ui/SlimeDivider";
import DrippingSlime from "@/components/effects/DrippingSlime";
import { CONFERENCE } from "@/lib/constants";

const REGISTRATION_URL =
  "https://my.cheddarup.com/c/iaypaa-x-registrations/items";

const PRICING_TIERS = [
  {
    name: "Early Bird",
    price: "$15",
    description: "Limited-time price — going up soon! Register now and save.",
    features: [
      "Full weekend access",
      "Conference swag bag",
      "All speaker sessions",
      "Workshops & panels",
      "Fellowship events",
    ],
    highlighted: true,
  },
  {
    name: "At-the-Door",
    price: "TBA",
    description: "Walk-in registration — subject to availability.",
    features: [
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
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-4">
          <GlowText as="h1" className="mb-4">
            Registration
          </GlowText>
          <p className="text-bone-white/70 text-lg md:text-xl max-w-2xl mx-auto font-[family-name:var(--font-space)]">
            Secure your spot at {CONFERENCE.name} &mdash;{" "}
            {CONFERENCE.location}, {CONFERENCE.date}
          </p>
        </div>
        <DrippingSlime count={10} />

        {/* Register Now Hero */}
        <section className="mb-16">
          <div className="flex items-center justify-center px-4 py-16 md:py-24">
            <div className="relative w-full max-w-lg rounded-xl border border-ooze-green/30 bg-toxic-green/20 p-8 md:p-12 text-center animate-pulse-glow">
              <h2 className="font-[family-name:var(--font-creepster)] text-3xl md:text-5xl text-ooze-green glow-text mb-4">
                Registration Is Open
              </h2>
              <div className="flex justify-center gap-6 mb-6">
                <span className="block w-1.5 h-3 bg-ooze-green rounded-b-full animate-drip-continuous" />
                <span
                  className="block w-1 h-2 bg-ooze-green rounded-b-full animate-drip-continuous"
                  style={{ animationDelay: "0.5s" }}
                />
                <span
                  className="block w-1.5 h-3 bg-ooze-green rounded-b-full animate-drip-continuous"
                  style={{ animationDelay: "1s" }}
                />
              </div>
              <p className="text-bone-white/80 text-base md:text-lg mb-8 max-w-md mx-auto">
                Don&apos;t miss {CONFERENCE.edition} {CONFERENCE.name}! Grab
                your spot before it fills up.
              </p>
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-gold px-10 py-4 font-bold text-void-black text-lg hover:bg-ember hover:shadow-[0_0_30px_rgba(242,193,78,0.5)] transition-all"
              >
                Register Now
              </a>
            </div>
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* Pricing Tiers */}
        <section className="mb-16">
          <GlowText as="h2" glow="subtle" className="mb-4 text-center">
            Pricing Tiers
          </GlowText>
          <p className="text-bone-white/60 text-center mb-10 max-w-lg mx-auto">
            Select a tier when you register. Early Bird spots are limited!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {PRICING_TIERS.map((tier, index) => {
              const tierBorderColors = ["border-ooze-green", "border-gold", "border-ember"];
              const tierAccentColors = ["text-ooze-green", "text-gold", "text-ember"];
              const tierBorder = tierBorderColors[index];
              const tierAccent = tierAccentColors[index];
              return (
              <div
                key={tier.name}
                className={`relative rounded-xl border p-8 text-center transition-all duration-300 ${
                  tier.highlighted
                    ? `${tierBorder}/60 bg-toxic-green/15 shadow-[0_0_25px_rgba(57,255,20,0.15)]`
                    : `${tierBorder}/20 bg-void-black/60 hover:${tierBorder}/40`
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ooze-green px-4 py-1 text-xs font-bold text-void-black uppercase tracking-wider">
                    Best Value
                  </div>
                )}
                <h3 className={`font-[family-name:var(--font-creepster)] text-2xl ${tierAccent} mb-2 glow-text-subtle`}>
                  {tier.name}
                </h3>
                <div className="font-[family-name:var(--font-mono)] text-4xl text-gold font-bold mb-2">
                  {tier.price}
                </div>
                <p className="text-bone-white/60 text-sm mb-6">
                  {tier.description}
                </p>
                <ul className="space-y-2 text-left mb-6">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-bone-white/70 text-sm"
                    >
                      <span className="text-ooze-green">&#x2713;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                {tier.highlighted && (
                  <a
                    href={REGISTRATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full rounded-lg py-3 font-bold text-center transition-all bg-gold text-void-black hover:bg-ember hover:shadow-[0_0_20px_rgba(242,193,78,0.5)]"
                  >
                    Register Now
                  </a>
                )}
              </div>
              );
            })}
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* Scholarship Note */}
        <section className="mb-8 text-center">
          <div className="max-w-2xl mx-auto rounded-xl border border-berry/30 bg-gradient-to-b from-toxic-green/15 to-void-black/40 p-8">
            <h3 className="font-[family-name:var(--font-creepster)] text-2xl text-berry mb-4 glow-text-subtle">
              Scholarships Available
            </h3>
            <p className="text-bone-white/80 leading-relaxed mb-4">
              No one should be turned away from IAYPAA for lack of funds. We
              offer scholarships to ensure that everyone who wants to attend
              can attend. If you need financial assistance, please don&apos;t
              hesitate to reach out.
            </p>
            <p className="text-bone-white/60 text-sm">
              Contact us at{" "}
              <a
                href={`mailto:${CONFERENCE.email}`}
                className="text-ooze-green hover:underline"
              >
                {CONFERENCE.email}
              </a>{" "}
              for scholarship inquiries.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
