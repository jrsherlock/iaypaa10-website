"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { NAV_LINKS, CONFERENCE } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus the first link after the slide-in animation starts
      const timer = setTimeout(() => firstLinkRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-void-black/80 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Ooze-green edge glow peeking from behind */}
        <div
          className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-ooze-green/0 via-ooze-green/60 to-swamp-teal/0 blur-sm"
          aria-hidden="true"
        />

        <div className="flex h-full flex-col bg-void-black/98 backdrop-blur-lg border-l border-ooze-green/20">
          {/* Header with close button */}
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-anton text-xl text-ooze-green glow-text-subtle">
              {CONFERENCE.name}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-md text-bone-white transition-colors duration-200 hover:text-ooze-green focus:outline-none focus-visible:ring-2 focus-visible:ring-ooze-green"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Separator with drip */}
          <div className="relative h-px w-full" aria-hidden="true">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-ooze-green/50 to-transparent" />
          </div>

          {/* Nav links */}
          <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Mobile navigation">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link, index) => (
                <li
                  key={link.href}
                  className="opacity-0"
                  style={
                    isOpen
                      ? {
                          animation: `slideInRight 0.3s ease-out forwards`,
                          animationDelay: `${index * 50 + 100}ms`,
                        }
                      : { opacity: 0 }
                  }
                >
                  <Link
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-center gap-3 rounded-lg px-4 py-3 text-lg text-bone-white/80 transition-all duration-200 hover:bg-toxic-green/30 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-ooze-green"
                  >
                    {/* Small ooze dot indicator */}
                    <span className="h-1.5 w-1.5 rounded-full bg-ooze-green/40 transition-all duration-200 group-hover:bg-gold group-hover:shadow-[0_0_6px_#F2C14E]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom tagline */}
          <div className="px-6 py-4 border-t border-ooze-green/10">
            <p className="text-xs text-bone-white/40 font-[family-name:var(--font-mono)]">
              {CONFERENCE.edition} &mdash; {CONFERENCE.tagline}
            </p>
          </div>
        </div>
      </div>

    </>
  );
}
