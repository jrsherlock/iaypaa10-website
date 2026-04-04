"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, CONFERENCE } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <nav
        className="relative bg-void-black/95 backdrop-blur-md"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="font-[family-name:var(--font-creepster)] text-2xl tracking-wider text-ooze-green glow-text-subtle transition-all duration-300 hover:glow-text"
            >
              {CONFERENCE.name}
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative px-3 py-2 text-sm text-bone-white/80 transition-colors duration-200 hover:text-gold group"
                  >
                    {link.label}
                    {/* Underline on hover */}
                    <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gold transition-all duration-300 group-hover:w-4/5" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="lg:hidden relative flex h-10 w-10 items-center justify-center rounded-md text-bone-white transition-colors duration-200 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-ooze-green"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              <span className="sr-only">
                {mobileOpen ? "Close menu" : "Open menu"}
              </span>
              {/* Animated hamburger lines */}
              <span className="flex flex-col items-center justify-center gap-[5px]">
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    mobileOpen
                      ? "translate-y-[7px] rotate-45"
                      : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                    mobileOpen
                      ? "-translate-y-[7px] -rotate-45"
                      : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Animated ooze drip border */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-visible" aria-hidden="true">
          {/* Base gradient line */}
          <div className="h-full w-full bg-gradient-to-r from-transparent via-ooze-green to-transparent opacity-70" />
          {/* Drip drops — small green blobs hanging off the bottom border */}
          <div className="absolute top-0 left-[10%] w-1 h-3 rounded-b-full bg-ooze-green/60 animate-drip-continuous" style={{ animationDelay: "0s" }} />
          <div className="absolute top-0 left-[25%] w-1.5 h-4 rounded-b-full bg-swamp-teal/50 animate-drip-continuous" style={{ animationDelay: "0.8s" }} />
          <div className="absolute top-0 left-[45%] w-1 h-2.5 rounded-b-full bg-gold/50 animate-drip-continuous" style={{ animationDelay: "1.6s" }} />
          <div className="absolute top-0 left-[65%] w-1.5 h-3.5 rounded-b-full bg-ooze-green/60 animate-drip-continuous" style={{ animationDelay: "2.4s" }} />
          <div className="absolute top-0 left-[80%] w-1 h-3 rounded-b-full bg-swamp-teal/40 animate-drip-continuous" style={{ animationDelay: "1.2s" }} />
          <div className="absolute top-0 left-[92%] w-1 h-2 rounded-b-full bg-gold/50 animate-drip-continuous" style={{ animationDelay: "2s" }} />
        </div>
      </nav>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </header>
  );
}
