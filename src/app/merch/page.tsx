import type { Metadata } from "next";
import GlowText from "@/components/ui/GlowText";
import RisingMotes from "@/components/effects/RisingMotes";
import ComingSoon from "@/components/ui/ComingSoon";

export const metadata: Metadata = {
  title: "Merch",
  description:
    "IAYPAA X merch is still forming. Hoodies, tees, and stickers are on the way, so get on the mailing list to hear when the catalogue opens.",
};

// Merch is hidden for now — the product catalogue (FeaturedSpecimen +
// ProductGrid, sourced from src/lib/products.ts) is temporarily replaced with
// a "still forming" note. To bring it back, restore the catalogue sections
// from git history (this file pre-2026-06) and re-import PRODUCTS.
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
            The gear is still coming together. None of it is sold for profit.
            Every order goes straight back into the conference, so it stays free
            for the next person who needs it.
          </p>
        </header>

        <RisingMotes count={10} className="my-8" />

        {/* Still forming — catalogue temporarily hidden */}
        <ComingSoon
          title="Merch"
          subtitle="Hoodies, tees, and stickers for the weekend are still forming. Get on the mailing list and we’ll let you know the moment the catalogue opens."
          showEmailSignup
        />
      </div>
    </div>
  );
}
