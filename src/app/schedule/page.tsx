"use client";

import { useState } from "react";
import GlowText from "@/components/ui/GlowText";
import SlimeDivider from "@/components/ui/SlimeDivider";
import DrippingSlime from "@/components/effects/DrippingSlime";
import ComingSoon from "@/components/ui/ComingSoon";

const DAYS = [
  {
    name: "Friday",
    date: "August 2026",
    icon: "\uD83C\uDF19",
    description:
      "Kick off the weekend with opening ceremonies, check-in, and evening fellowship. Get settled in and meet your fellow attendees as we ease into a weekend of recovery and fun.",
    events: [
      "Registration & Check-in",
      "Opening Ceremony",
      "Ice Breaker Activities",
      "Evening Fellowship",
    ],
  },
  {
    name: "Saturday",
    date: "August 2026",
    icon: "\u2600\uFE0F",
    description:
      "The main event! A full day packed with speaker sessions, workshops, panels, and the main Saturday night event. This is where the Primordial Ooze theme comes to life.",
    events: [
      "Morning Speaker Session",
      "Workshops & Panels",
      "Afternoon Activities",
      "Dinner",
      "Saturday Night Main Event",
    ],
  },
  {
    name: "Sunday",
    date: "August 2026",
    icon: "\uD83C\uDF1E",
    description:
      "Wind down the weekend with a closing speaker, farewell brunch, and final goodbyes. Take home memories, friendships, and a renewed sense of purpose.",
    events: [
      "Closing Speaker",
      "Farewell Brunch",
      "Closing Ceremony",
      "Safe Travels Home",
    ],
  },
];

export default function SchedulePage() {
  const [openDay, setOpenDay] = useState<number | null>(null);

  function toggleDay(index: number) {
    setOpenDay(openDay === index ? null : index);
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-4">
          <GlowText as="h1" className="mb-4">
            Schedule
          </GlowText>
          <p className="text-bone-white/70 text-lg md:text-xl max-w-2xl mx-auto font-[family-name:var(--font-space)]">
            Three days of speakers, workshops, fellowship, and ooze
          </p>
        </div>
        <DrippingSlime count={10} />

        {/* Coming Soon */}
        <section className="mb-16">
          <ComingSoon
            title="Schedule Coming Soon"
            subtitle="Check back for the full weekend lineup"
            showEmailSignup
          />
        </section>

        <SlimeDivider className="mb-16" />

        {/* Day-by-Day Accordion */}
        <section className="mb-8">
          <GlowText as="h2" glow="subtle" className="mb-4 text-center">
            Weekend Overview
          </GlowText>
          <p className="text-bone-white/60 text-center mb-10 max-w-lg mx-auto">
            Specific times and session details will be announced closer to the
            conference. Here&apos;s what each day looks like at a glance.
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            {DAYS.map((day, index) => {
              const isOpen = openDay === index;
              const dayColors = ["text-ooze-green", "text-gold", "text-ember"];
              const dayColor = dayColors[index % dayColors.length];
              return (
                <div
                  key={day.name}
                  className={`rounded-xl border transition-all duration-300 ${
                    isOpen
                      ? "border-ooze-green/60 bg-toxic-green/15 shadow-[0_0_20px_rgba(57,255,20,0.1)]"
                      : "border-ooze-green/20 bg-void-black/60 hover:border-ooze-green/40"
                  }`}
                >
                  <button
                    onClick={() => toggleDay(index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{day.icon}</span>
                      <div>
                        <h3 className={`font-[family-name:var(--font-creepster)] text-2xl ${dayColor} glow-text-subtle`}>
                          {day.name}
                        </h3>
                        <span className="font-[family-name:var(--font-mono)] text-xs text-bone-white/50 tracking-wider uppercase">
                          {day.date}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`shrink-0 text-2xl transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-gold" : "text-ooze-green"
                      }`}
                    >
                      &#x25BE;
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-bone-white/70 leading-relaxed mb-6">
                        {day.description}
                      </p>
                      <div className="space-y-3">
                        {day.events.map((event) => (
                          <div
                            key={event}
                            className="flex items-center gap-3 rounded-lg border border-ooze-green/10 bg-void-black/40 px-4 py-3"
                          >
                            <span className="w-2 h-2 rounded-full bg-ooze-green shrink-0 shadow-[0_0_6px_#5FAD56]" />
                            <span className="text-bone-white/70 text-sm">
                              {event}
                            </span>
                            <span className="ml-auto font-[family-name:var(--font-mono)] text-xs text-bone-white/30">
                              TBA
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-bone-white/40 text-xs mt-4 italic text-center">
                        Times and details to be announced
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
