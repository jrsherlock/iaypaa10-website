"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_GROUPS, CONFERENCE } from "@/lib/constants";
import MobileMenu from "./MobileMenu";
import NavDropdown from "./NavDropdown";

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
              className="font-anton text-2xl tracking-wider text-ooze-green glow-text-subtle transition-all duration-300 hover:glow-text"
            >
              {CONFERENCE.name}
            </Link>

            {/* Desktop nav links */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_GROUPS.map((item) =>
                "children" in item ? (
                  <li key={item.label}>
                    <NavDropdown label={item.label} items={item.children} />
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`relative px-3 py-2 text-sm transition-colors duration-200 hover:text-gold group ${
                        item.href === "/ooza-palooza"
                          ? "text-ooze-green nav-live-glow"
                          : "text-bone-white/80"
                      }`}
                    >
                      {item.label}
                      {/* Underline on hover */}
                      <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gold transition-all duration-300 group-hover:w-4/5" />
                    </Link>
                  </li>
                ),
              )}
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

        {/* Bottom edge — a thin band of first light, not a dripping border.
            See design-philosophy.md §3 (Motion / Light). */}
        <div className="absolute bottom-0 left-0 w-full h-px overflow-visible" aria-hidden="true">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-ooze-green/70 to-transparent" />
          <div className="absolute inset-x-0 -bottom-1 h-2 bg-gradient-to-b from-ooze-green/20 to-transparent blur-[2px]" />
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
