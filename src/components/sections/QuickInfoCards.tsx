import GlowText from "@/components/ui/GlowText";
import OozeButton from "@/components/ui/OozeButton";

const cards = [
  {
    emoji: "\u{1F9EA}",
    title: "Register",
    description:
      "Secure your spot at the 10th annual IAYPAA conference. Early bird pricing available soon.",
    href: "/registration",
    buttonText: "Register Now",
  },
  {
    emoji: "\u{1F3E8}",
    title: "Hotel Info",
    description:
      "Stay close to the action. Hotel block information and booking details coming soon.",
    href: "/hotel",
    buttonText: "View Hotel Info",
    badge: "TBD",
  },
  {
    emoji: "\u{1F91D}",
    title: "Get Involved",
    description:
      "Join a committee, volunteer, or help carry the message. There are many ways to serve.",
    href: "/outreach",
    buttonText: "Get Involved",
  },
];

export default function QuickInfoCards() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <GlowText
          as="h2"
          glow="subtle"
          className="font-[family-name:var(--font-creepster)] text-4xl sm:text-5xl text-ooze-green"
        >
          Quick Info
        </GlowText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {cards.map((card) => (
          <div
            key={card.title}
            className="group relative bg-toxic-green/50 border border-ooze-green/20 rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-gold/50 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(242,193,78,0.1)]"
          >
            {card.badge && (
              <span className="absolute top-3 right-3 bg-ember text-void-black text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                {card.badge}
              </span>
            )}

            <span className="text-4xl mb-4" role="img" aria-hidden="true">
              {card.emoji}
            </span>

            <h3 className="font-[family-name:var(--font-creepster)] text-2xl text-ooze-green mb-3">
              {card.title}
            </h3>

            <p className="text-bone-white/80 text-sm leading-relaxed mb-6 flex-1">
              {card.description}
            </p>

            <OozeButton href={card.href} variant="secondary" className="mt-auto">
              {card.buttonText}
            </OozeButton>
          </div>
        ))}
      </div>
    </section>
  );
}
