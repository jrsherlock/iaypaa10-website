import Image from "next/image";
import type { Product } from "@/lib/products";

/**
 * The lead specimen — an asymmetric two-column plate that breaks the
 * catalogue grid. Image is atmosphere; the right column drops into plain
 * serif (Newsreader) for the honest line, the way the rest of the site
 * lets "the costume come off." See docs/design-philosophy.md.
 */
export default function FeaturedSpecimen({ product }: { product: Product }) {
  return (
    <a
      href={product.printfulUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-void-black"
    >
      <article className="relative grid grid-cols-1 overflow-hidden border border-ooze-green/20 bg-strata paper-grit transition-all duration-500 group-hover:border-gold/40 group-hover:shadow-[0_0_44px_-10px_rgba(242,193,78,0.3)] lg:grid-cols-[1.05fr_1fr]">
        {/* Image side */}
        <div className="relative aspect-[4/5] overflow-hidden bg-dark-ooze sm:aspect-[16/10] lg:aspect-auto lg:min-h-[30rem]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
          />
          <div
            className="absolute inset-0 mix-blend-multiply"
            style={{ backgroundColor: "rgba(77,144,120,0.18)" }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-halftone-lg opacity-40 mix-blend-soft-light"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 100% at 30% 40%, rgba(13,13,13,0) 0%, rgba(13,13,13,0.45) 70%, rgba(13,13,13,0.9) 100%)",
            }}
            aria-hidden="true"
          />
          <span className="absolute left-4 top-4 font-typewriter text-[0.65rem] uppercase tracking-[0.3em] text-bone-white/70">
            Specimen No. 01
          </span>
          {product.badge && (
            <span className="absolute bottom-4 left-4 inline-block border border-gold/55 px-2.5 py-1 font-typewriter text-[0.62rem] uppercase tracking-[0.22em] text-gold">
              {product.badge}
            </span>
          )}
        </div>

        {/* Text side */}
        <div className="flex flex-col justify-center gap-5 p-7 sm:p-10 lg:p-12">
          <span className="font-typewriter text-[0.68rem] uppercase tracking-[0.32em] text-ooze-green/80">
            Featured this year
          </span>

          <h2 className="font-anton text-3xl uppercase leading-[0.95] text-gold glow-text-gold sm:text-4xl">
            {product.name}
          </h2>

          {/* The costume comes off — plain serif, said straight. */}
          <p className="font-news text-base leading-relaxed text-bone-white/75 sm:text-lg">
            You came up out of the dark and you stayed. This is something to
            wear that knows that. Every order keeps the doors open and the
            coffee on — nothing here is sold for profit.
          </p>

          <div className="marquee-rule w-40" aria-hidden="true" />

          <div className="flex flex-wrap items-end justify-between gap-4">
            <span className="font-typewriter text-[0.66rem] uppercase tracking-[0.18em] text-bone-white/45">
              {product.spec}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-2xl font-bold text-gold">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <span className="mt-1 inline-flex w-fit items-center gap-2 border-2 border-ooze-green px-6 py-3 font-bold text-ooze-green transition-all duration-300 group-hover:border-gold group-hover:bg-gold/10 group-hover:text-gold">
            Open in the shop
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </span>
        </div>
      </article>
    </a>
  );
}
