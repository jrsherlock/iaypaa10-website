"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CHALLENGE } from "@/lib/constants";
import { formatUSD, nextTier } from "@/lib/challenge";

/**
 * Slim site-wide Challenge-Palooza banner, above the navbar. Dismissible;
 * the dismissal is keyed to the current raised total (sessionStorage), so
 * it stays gone for the visit but resurfaces when the number changes —
 * progress is news, repetition is nagging. Hidden on the challenge page
 * itself. Not sticky: it makes its pitch at the top and gets out of the way.
 */
export default function ChallengeBanner() {
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();
  const next = nextTier();
  const storageKey = `challenge-banner-${CHALLENGE.raised}`;

  useEffect(() => {
    if (sessionStorage.getItem(storageKey)) setDismissed(true);
  }, [storageKey]);

  if (dismissed || pathname === "/challenge-palooza") return null;

  return (
    <div className="relative bg-toxic-green/60 border-b border-ooze-green/30">
      <Link
        href="/challenge-palooza"
        className="block pr-12 pl-4 sm:px-12 py-2 text-center font-typewriter text-[0.65rem] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase text-bone-white/85 transition-colors hover:text-bone-white"
      >
        <span className="text-gold">Challenge-Palooza · {formatUSD(CHALLENGE.raised)} raised</span>
        {next ? (
          <span className="text-bone-white/75">
            {" "}
            — {formatUSD(next.amount)} unlocks {next.short}{" "}
          </span>
        ) : (
          <span className="text-bone-white/75"> — every dare unlocked! </span>
        )}
        <span aria-hidden="true" className="text-ooze-green">
          &rarr;
        </span>
      </Link>
      <button
        type="button"
        aria-label="Dismiss the Challenge-Palooza banner"
        onClick={() => {
          sessionStorage.setItem(storageKey, "1");
          setDismissed(true);
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center text-bone-white/55 hover:text-bone-white transition-colors cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
}
