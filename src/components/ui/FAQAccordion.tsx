"use client";

import Link from "next/link";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  /** Optional CTA shown below the answer, e.g. "See the references". */
  link?: { label: string; href: string };
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="w-full max-w-3xl mx-auto divide-y divide-swamp-teal/30">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={index} className="group">
            <button
              onClick={() => toggle(index)}
              className={`
                w-full flex items-center justify-between gap-4
                py-5 px-4 text-left cursor-pointer
                transition-colors duration-200
                ${isOpen ? "text-gold" : "text-bone-white hover:text-gold"}
              `}
              aria-expanded={isOpen}
            >
              <span className="text-lg md:text-xl font-semibold pr-4">
                {item.question}
              </span>

              {/* Chevron indicator */}
              <span
                className={`
                  flex-shrink-0 w-6 h-6 flex items-center justify-center
                  border-2 rounded-full transition-all duration-300
                  ${isOpen ? "border-gold rotate-180" : "border-bone-white/40 rotate-0"}
                `}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-colors duration-300"
                >
                  <path
                    d="M2 4L6 8L10 4"
                    stroke={isOpen ? "#F2C14E" : "#E8E6E1"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>

            {/* Answer panel with smooth height transition */}
            <div
              className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
              `}
            >
              <div className="px-4 pb-5 pr-14">
                <p className="text-bone-white/75 leading-relaxed">
                  {item.answer}
                </p>
                {item.link ? (
                  <Link
                    href={item.link.href}
                    className="mt-3 inline-flex items-center gap-2 font-typewriter text-xs uppercase tracking-[0.25em] text-gold border-b border-gold/40 pb-0.5 hover:text-bone-white hover:border-bone-white transition-colors"
                  >
                    {item.link.label}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                ) : null}
              </div>
            </div>

            {/* Active item green accent bar */}
            {isOpen && (
              <div className="h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            )}
          </div>
        );
      })}
    </div>
  );
}
