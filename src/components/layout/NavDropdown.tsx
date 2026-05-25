"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

interface NavDropdownProps {
  label: string;
  items: readonly { label: string; href: string }[];
}

// Small grace period before closing so diagonal mouse movement between the
// trigger and the panel doesn't immediately dismiss the menu.
const CLOSE_DELAY_MS = 150;

export default function NavDropdown({ label, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }, [clearCloseTimer]);

  const openNow = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  // Clean up any pending timer on unmount
  useEffect(() => clearCloseTimer, [clearCloseTimer]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape and return focus to the trigger
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          // On hover-capable devices (desktop with mouse), the panel is
          // already open from mouseenter — a click that toggles would
          // instantly close it ("nothing happens" UX bug). Only toggle on
          // touch/no-hover devices where mouseenter doesn't fire on tap.
          const noHover =
            typeof window !== "undefined" &&
            window.matchMedia?.("(hover: none)").matches;
          if (noHover) {
            setOpen((v) => !v);
          } else {
            setOpen(true);
          }
        }}
        onFocus={openNow}
        className="group relative flex items-center gap-1 px-3 py-2 text-sm text-bone-white/80 transition-colors duration-200 hover:text-gold focus:outline-none focus-visible:text-gold"
      >
        {label}
        <svg
          className={`h-3 w-3 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className={`absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-gold transition-all duration-300 ${
            open ? "w-4/5" : "w-0 group-hover:w-4/5"
          }`}
        />
      </button>

      {/* Positioning wrapper. pt-1 is the invisible hover bridge between the
          button and the visible panel so the mouse doesn't cross a dead zone. */}
      <div
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-1 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Visible dropdown panel */}
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className={`min-w-[200px] origin-top rounded-lg border border-ooze-green/25 bg-void-black/98 backdrop-blur-md shadow-[0_0_20px_rgba(95,173,86,0.15)] transition-all duration-200 ${
            open ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Slime accent on top edge */}
          <span
            aria-hidden="true"
            className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-ooze-green/60 to-transparent"
          />
          <ul className="py-2">
            {items.map((item) => (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="group/item flex items-center gap-2 px-4 py-2 text-sm text-bone-white/80 transition-colors duration-150 hover:bg-toxic-green/30 hover:text-gold focus:outline-none focus-visible:bg-toxic-green/30 focus-visible:text-gold"
                >
                  <span className="h-1 w-1 rounded-full bg-ooze-green/40 transition-all duration-150 group-hover/item:bg-gold group-hover/item:shadow-[0_0_4px_#F2C14E]" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
