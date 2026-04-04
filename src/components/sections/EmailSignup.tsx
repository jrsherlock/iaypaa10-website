"use client";

import { useState, type FormEvent } from "react";
import GlowText from "@/components/ui/GlowText";
import OozeButton from "@/components/ui/OozeButton";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    // Not wired to a backend -- just show success
    setSubmitted(true);
  }

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-xl mx-auto bg-toxic-green/30 border border-ooze-green/20 rounded-2xl p-8 sm:p-10 text-center">
        <GlowText
          as="h2"
          glow="subtle"
          className="font-[family-name:var(--font-creepster)] text-3xl sm:text-4xl text-ooze-green mb-3"
        >
          Stay in the Loop
        </GlowText>

        <p className="text-bone-white/80 text-sm sm:text-base mb-8">
          Sign up for updates on registration, hotel, and more
        </p>

        {submitted ? (
          <div className="py-6">
            <p className="text-gold text-lg font-semibold font-[family-name:var(--font-creepster)]">
              You&rsquo;re in the ooze!
            </p>
            <p className="text-bone-white/70 text-sm mt-2">
              We&rsquo;ll send updates to{" "}
              <span className="text-swamp-teal">{email}</span>.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 min-w-0 px-4 py-3 rounded-lg bg-void-black border border-swamp-teal text-bone-white placeholder:text-bone-white/40 font-[family-name:var(--font-space)] text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/50 transition-colors"
            />
            <OozeButton variant="primary">
              Subscribe
            </OozeButton>
          </form>
        )}
      </div>
    </section>
  );
}
