"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const card = (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      whileHover={product.soldOut ? undefined : { scale: 1.02 }}
      className={`group relative rounded-2xl border border-ooze-green/20 bg-void-black/60 overflow-hidden transition-shadow duration-300 ${
        product.soldOut
          ? "opacity-50 cursor-not-allowed"
          : "hover:border-ooze-green/40 hover:shadow-[0_0_25px_rgba(95,173,86,0.15)]"
      }`}
    >
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-b from-toxic-green/20 to-void-black/80 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 right-3 z-10 rounded-full bg-ember px-3 py-1 text-xs font-bold text-void-black uppercase tracking-wider">
            {product.badge}
          </span>
        )}

        {/* Sold Out Overlay */}
        {product.soldOut && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-void-black/60">
            <span className="font-[family-name:var(--font-creepster)] text-2xl text-bone-white/80 glow-text-subtle">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-5">
        <h3 className="font-[family-name:var(--font-creepster)] text-lg text-ooze-green mb-1 glow-text-subtle">
          {product.name}
        </h3>
        <p className="text-bone-white/60 text-sm leading-relaxed mb-3">
          {product.description}
        </p>
        <span className="font-[family-name:var(--font-mono)] text-lg text-gold font-bold">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </motion.div>
  );

  if (product.soldOut) {
    return card;
  }

  return (
    <a
      href={product.printfulUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-ooze-green focus-visible:ring-offset-2 focus-visible:ring-offset-void-black rounded-2xl"
    >
      {card}
    </a>
  );
}
