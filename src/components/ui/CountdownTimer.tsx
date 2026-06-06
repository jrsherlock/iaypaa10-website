"use client";

import { useEffect, useState } from "react";
import { CONFERENCE } from "@/lib/constants";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const difference =
    CONFERENCE.countdownTarget.getTime() - new Date().getTime();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function padNumber(num: number | null): string {
  // null = not yet computed on the client; show a neutral placeholder so the
  // static HTML never ships a stale number.
  if (num === null) return "--";
  return num.toString().padStart(2, "0");
}

export default function CountdownTimer() {
  // Start empty and compute only on the client. The homepage is statically
  // prerendered, so seeding from calculateTimeLeft() here would bake the
  // build-time day count into the cached HTML and it would drift a day every
  // day until the next deploy. null → render a placeholder on the server, then
  // fill in the live value once JS runs, so the number is never stale.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Compute immediately on mount, then tick every second.
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const blocks: { label: string; value: number | null; isSeconds?: boolean }[] =
    [
      { label: "Days", value: timeLeft?.days ?? null },
      { label: "Hours", value: timeLeft?.hours ?? null },
      { label: "Minutes", value: timeLeft?.minutes ?? null },
      { label: "Seconds", value: timeLeft?.seconds ?? null, isSeconds: true },
    ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {blocks.map(({ label, value, isSeconds }) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <div
            className={`
              relative w-full rounded-lg border-2 border-gold/60
              bg-void-black/80 px-4 py-5 md:px-6 md:py-7
              flex items-center justify-center
              shadow-[0_0_10px_rgba(242,193,78,0.15)]
              ${isSeconds ? "animate-count-pulse" : ""}
            `}
          >
            <span
              suppressHydrationWarning
              className="
                font-[family-name:var(--font-mono)] text-4xl md:text-6xl
                font-bold text-gold glow-text-gold tabular-nums
              "
            >
              {padNumber(value)}
            </span>
          </div>
          <span className="text-bone-white/70 text-sm md:text-base font-medium uppercase tracking-widest">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
