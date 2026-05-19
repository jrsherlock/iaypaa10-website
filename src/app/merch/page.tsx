import type { Metadata } from "next";
import GlowText from "@/components/ui/GlowText";
import SlimeDivider from "@/components/ui/SlimeDivider";
import RisingMotes from "@/components/effects/RisingMotes";
import FeaturedSpecimen from "@/components/merch/FeaturedSpecimen";
import ProductGrid from "@/components/merch/ProductGrid";
import { PRODUCTS, PRINTFUL_STORE_URL } from "@/lib/products";

export const metadata: Metadata = {
  title: "Merch",
  description:
    "The IAYPAA X catalogue — hoodies, tees, stickers, and more. Every order is self-supporting: it keeps the conference running. Pick up at the event or order online.",
};

const featured = PRODUCTS.find((p) => p.featured) ?? PRODUCTS[0];
const rest = PRODUCTS.filter((p) => p.id !== featured.id);

const NOTES = [
  {
    label: "At the conference",
    body: "It will be on the merch table all weekend — no shipping, no waiting. Bring cash or a card.",
  },
  {
    label: "Ordered online",
    body: "Online orders are printed and shipped by a third-party fulfiller. Times and shipping cost vary by where you are.",
  },
];

export default function MerchPage() {
  return (
    <div className="px-4 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Masthead */}
        <header className="text-center">
          <p className="font-typewriter text-[0.7rem] uppercase tracking-[0.4em] text-ooze-green/80">
            The IAYPAA X Catalogue
          </p>
          <GlowText as="h1" className="mt-4">
            Merch
          </GlowText>
          {/* Plain serif — the honest line, no wink. */}
          <p className="mx-auto mt-5 max-w-2xl font-news text-lg leading-relaxed text-bone-white/70 md:text-xl">
            Wear the weekend home. None of it is sold for profit — every order
            goes straight back into the conference, so it stays free for the
            next person who needs it.
          </p>
        </header>

        <RisingMotes count={10} className="my-4" />

        {/* Lead specimen */}
        <section className="mb-px mt-6">
          <FeaturedSpecimen product={featured} />
        </section>

        {/* The catalogue */}
        <section className="mb-20 mt-16">
          <div className="mb-10 flex items-end justify-between gap-4 border-b border-ooze-green/15 pb-3">
            <h2 className="font-anton text-xl uppercase tracking-wide text-bone-white/80">
              The rest of the plate
            </h2>
            <span className="font-typewriter text-[0.62rem] uppercase tracking-[0.24em] text-bone-white/40">
              {rest.length} more
            </span>
          </div>
          <ProductGrid products={rest} startIndex={2} />
        </section>

        <SlimeDivider className="mb-16" />

        {/* Self-supporting — the center of the page, said straight */}
        <section className="mb-16">
          <div className="mx-auto max-w-3xl border border-gold/25 bg-gradient-to-b from-toxic-green/15 to-void-black/40 p-8 text-center md:p-12">
            <p className="font-typewriter text-[0.66rem] uppercase tracking-[0.32em] text-gold/80">
              Tradition Seven
            </p>
            <p className="mx-auto mt-5 max-w-2xl font-news text-lg leading-relaxed text-bone-white/80 md:text-xl">
              IAYPAA is fully self-supporting through its own contributions.
              There are no outside sponsors and no profit taken — what you
              spend here pays for the room, the coffee, and the scholarships.
              No one is ever turned away for lack of funds.
            </p>
          </div>
        </section>

        {/* How to get it — two plain notes, no emoji */}
        <section className="mb-16">
          <div className="mb-10 text-center">
            <p className="font-typewriter text-[0.66rem] uppercase tracking-[0.32em] text-ooze-green/80">
              Getting yours
            </p>
          </div>
          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-px overflow-hidden border border-ooze-green/15 bg-ooze-green/15 sm:grid-cols-2">
            {NOTES.map((note) => (
              <div
                key={note.label}
                className="bg-void-black/80 p-7 paper-grit"
              >
                <h3 className="font-typewriter text-xs uppercase tracking-[0.26em] text-ooze-green">
                  {note.label}
                </h3>
                <div className="marquee-rule my-4 w-16" aria-hidden="true" />
                <p className="font-news text-[0.95rem] leading-relaxed text-bone-white/65">
                  {note.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiet shop-all anchor */}
        <div className="text-center">
          <a
            href={PRINTFUL_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-typewriter text-xs uppercase tracking-[0.28em] text-bone-white/55 transition-colors duration-300 hover:text-ooze-green focus:outline-none focus-visible:ring-2 focus-visible:ring-ooze-green focus-visible:ring-offset-4 focus-visible:ring-offset-void-black"
          >
            See the full shop
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
