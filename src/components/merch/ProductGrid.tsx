"use client";

import { useState } from "react";
import ProductCard from "@/components/merch/ProductCard";
import type { Product, ProductCategory } from "@/lib/products";
import { PRODUCT_CATEGORIES } from "@/lib/products";

interface ProductGridProps {
  products: Product[];
  /** Catalogue numbering continues from the featured specimen (No. 01). */
  startIndex?: number;
}

export default function ProductGrid({
  products,
  startIndex = 2,
}: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<
    ProductCategory | "all"
  >("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Index selector — a quiet ledger tab strip, not a row of buttons */}
      <nav
        aria-label="Filter the catalogue by category"
        className="mb-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3"
      >
        {PRODUCT_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              aria-pressed={isActive}
              className={`group relative cursor-pointer pb-1 font-typewriter text-xs uppercase tracking-[0.28em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ooze-green focus-visible:ring-offset-4 focus-visible:ring-offset-void-black ${
                isActive
                  ? "text-ooze-green"
                  : "text-bone-white/40 hover:text-bone-white/75"
              }`}
            >
              {cat.label}
              <span
                className={`absolute -bottom-px left-0 h-px bg-ooze-green transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </nav>

      {/* Catalogue plate. Re-keyed on filter so the stagger replays. */}
      <div
        key={activeCategory}
        className="grid grid-cols-1 gap-px overflow-hidden border border-ooze-green/10 bg-ooze-green/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {filtered.map((product, i) => (
          <div
            key={product.id}
            className="poster-rise bg-void-black"
            style={{ ["--i" as string]: i }}
          >
            <ProductCard product={product} index={startIndex + i} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center font-news text-bone-white/50">
          Nothing in this drawer yet — check back as it forms.
        </p>
      )}
    </div>
  );
}
