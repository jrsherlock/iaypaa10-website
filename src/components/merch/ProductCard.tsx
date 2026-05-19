import Image from "next/image";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  /** 1-based catalogue index — printed as the specimen number. */
  index: number;
}

const plate = (n: number) => `NO. ${String(n).padStart(2, "0")}`;

/**
 * A single specimen on the catalogue plate. Sharp-edged, hairline-bordered,
 * lit by a single soft halo on hover — matter surfacing, not a card popping.
 * See docs/design-philosophy.md §3 (Texture / Motion / Light).
 */
export default function ProductCard({ product, index }: ProductCardProps) {
  const inner = (
    <div
      className={`group relative flex h-full flex-col border bg-void-black/40 paper-grit transition-all duration-500 ${
        product.soldOut
          ? "border-bone-white/10 opacity-55"
          : "border-ooze-green/15 hover:border-ooze-green/40 hover:bg-toxic-green/10 hover:shadow-[0_0_28px_-6px_rgba(95,173,86,0.28)]"
      }`}
    >
      {/* Specimen image, lit through dark water */}
      <div className="relative aspect-[4/5] overflow-hidden bg-dark-ooze">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover grayscale-[0.35] transition-all duration-[1100ms] ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
        />
        {/* Cold green wash + sediment grain — the Hero depth stack, in miniature */}
        <div
          className="absolute inset-0 mix-blend-multiply"
          style={{ backgroundColor: "rgba(77,144,120,0.22)" }}
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
              "linear-gradient(180deg, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0) 32%, rgba(13,13,13,0) 60%, rgba(13,13,13,0.85) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Plate index + filed category — handwritten-ledger voice */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          <span className="font-typewriter text-[0.62rem] tracking-[0.28em] text-bone-white/70">
            {plate(index)}
          </span>
          <span className="font-typewriter text-[0.6rem] uppercase tracking-[0.22em] text-bone-white/45">
            {product.category}
          </span>
        </div>

        {product.badge && !product.soldOut && (
          <span className="absolute bottom-3 left-3 inline-block border border-gold/55 px-2 py-0.5 font-typewriter text-[0.6rem] uppercase tracking-[0.2em] text-gold">
            {product.badge}
          </span>
        )}

        {product.soldOut && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-anton text-2xl uppercase tracking-wide text-bone-white/75 glow-text-subtle">
              Sold out
            </span>
          </div>
        )}
      </div>

      {/* First-light rule between the specimen and its label */}
      <div className="marquee-rule" aria-hidden="true" />

      {/* The label */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-anton text-lg leading-tight text-ooze-green glow-text-subtle">
          {product.name}
        </h3>
        <p className="mt-1.5 font-news text-sm leading-relaxed text-bone-white/60">
          {product.description}
        </p>

        <div className="mt-auto flex items-end justify-between pt-5">
          <span className="font-typewriter text-[0.62rem] uppercase tracking-[0.16em] text-bone-white/40">
            {product.spec}
          </span>
          <span className="font-[family-name:var(--font-mono)] text-lg font-bold text-gold">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {!product.soldOut && (
          <span className="mt-3 inline-flex items-center gap-1.5 font-typewriter text-[0.62rem] uppercase tracking-[0.22em] text-bone-white/35 transition-colors duration-300 group-hover:text-ooze-green">
            View in shop
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </span>
        )}
      </div>
    </div>
  );

  if (product.soldOut) return inner;

  return (
    <a
      href={product.printfulUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ooze-green focus-visible:ring-offset-2 focus-visible:ring-offset-void-black"
    >
      {inner}
    </a>
  );
}
