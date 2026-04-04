import type { Metadata } from "next";
import GlowText from "@/components/ui/GlowText";
import SlimeDivider from "@/components/ui/SlimeDivider";
import DrippingSlime from "@/components/effects/DrippingSlime";
import ProductGrid from "@/components/merch/ProductGrid";
import { PRODUCTS, PRINTFUL_STORE_URL } from "@/lib/products";

export const metadata: Metadata = {
  title: "Merch",
  description:
    "Official conference merchandise — hoodies, tees, stickers, and more. Shop online or pick up at the event.",
};

const MERCH_FAQ = [
  {
    icon: "🎪",
    title: "In-Person Pickup",
    description:
      "Merch will be available at the conference — no shipping cost, no wait. Grab yours at the merch table.",
  },
  {
    icon: "📦",
    title: "Online Shipping",
    description:
      "Online orders are fulfilled and shipped via a third-party service. Shipping times and costs vary by provider.",
  },
];

export default function MerchPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-4">
          <GlowText as="h1" className="mb-4">
            Merch
          </GlowText>
          <p className="text-bone-white/70 text-lg md:text-xl max-w-2xl mx-auto font-[family-name:var(--font-space)]">
            Rep the ooze. Wear the slime. Support IAYPAA. All proceeds go
            directly to funding the conference.
          </p>
        </div>
        <DrippingSlime count={10} />

        {/* Shop CTA */}
        <div className="text-center mb-16">
          <a
            href={PRINTFUL_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-4 font-bold text-void-black text-lg transition-all duration-300 hover:bg-ember hover:shadow-[0_0_20px_rgba(242,193,78,0.4),0_0_40px_rgba(247,129,84,0.2)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-void-black"
          >
            Shop All Merch
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        {/* Product Grid */}
        <section className="mb-16">
          <ProductGrid products={PRODUCTS} />
        </section>

        <SlimeDivider className="mb-16" />

        {/* FAQ / Info Section */}
        <section className="mb-8">
          <GlowText as="h2" glow="subtle" className="mb-10 text-center">
            How It Works
          </GlowText>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {MERCH_FAQ.map((item, index) => {
              const titleColors = [
                "text-ooze-green",
                "text-gold",
                "text-swamp-teal",
              ];
              const titleColor = titleColors[index % titleColors.length];
              return (
                <div
                  key={item.title}
                  className="group rounded-xl border border-ooze-green/20 bg-void-black/60 p-6 text-center transition-all duration-300 hover:border-gold/50 hover:bg-toxic-green/10 hover:shadow-[0_0_20px_rgba(57,255,20,0.1)]"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3
                    className={`font-[family-name:var(--font-creepster)] text-xl ${titleColor} mb-3 glow-text-subtle`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-bone-white/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
