"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/merch/ProductCard";
import type { Product, ProductCategory } from "@/lib/products";
import { PRODUCT_CATEGORIES } from "@/lib/products";

interface ProductGridProps {
  products: Product[];
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export default function ProductGrid({ products }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<
    ProductCategory | "all"
  >("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div>
      {/* Filter Tabs */}
      <nav
        aria-label="Filter products by category"
        className="flex flex-wrap justify-center gap-2 mb-10"
      >
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ooze-green focus-visible:ring-offset-2 focus-visible:ring-offset-void-black ${
              activeCategory === cat.value
                ? "bg-ooze-green text-void-black shadow-[0_0_15px_rgba(95,173,86,0.3)]"
                : "border border-ooze-green/30 text-bone-white/70 hover:border-ooze-green/60 hover:text-bone-white"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </nav>

      {/* Product Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
