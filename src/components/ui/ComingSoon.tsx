"use client";

import { useState } from "react";

interface ComingSoonProps {
  title: string;
  subtitle?: string;
  showEmailSignup?: boolean;
}

export default function ComingSoon({
  title,
  subtitle,
  showEmailSignup = false,
}: ComingSoonProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  }

  return (
    <div className="flex items-center justify-center px-4 py-16 md:py-24">
      <div className="relative w-full max-w-lg rounded-xl border border-ooze-green/30 bg-toxic-green/20 p-8 md:p-12 text-center animate-pulse-glow">
        {/* Title */}
        <h2 className="font-[family-name:var(--font-creepster)] text-3xl md:text-5xl text-ooze-green glow-text mb-4">
          {title}
        </h2>

        {/* Drip effect below title */}
        <div className="flex justify-center gap-6 mb-6">
          <span className="block w-1.5 h-3 bg-ooze-green rounded-b-full animate-drip-continuous" />
          <span
            className="block w-1 h-2 bg-ooze-green rounded-b-full animate-drip-continuous"
            style={{ animationDelay: "0.5s" }}
          />
          <span
            className="block w-1.5 h-3 bg-ooze-green rounded-b-full animate-drip-continuous"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-bone-white/80 text-base md:text-lg mb-8 max-w-md mx-auto">
            {subtitle}
          </p>
        )}

        {/* Coming Soon badge */}
        <div className="inline-block rounded-full bg-ember px-6 py-2 mb-6">
          <span className="font-[family-name:var(--font-mono)] text-void-black text-sm tracking-widest uppercase font-bold">
            Coming Soon
          </span>
        </div>

        {/* Email signup */}
        {showEmailSignup && (
          <div className="mt-6">
            {submitted ? (
              <p className="text-swamp-teal font-medium animate-drip">
                You&apos;re on the list! We&apos;ll be in touch.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 rounded-lg border border-swamp-teal bg-void-black/80 px-4 py-2.5 text-bone-white placeholder:text-bone-white/40 focus:outline-none focus:border-gold focus:shadow-[0_0_10px_rgba(242,193,78,0.3)] transition-all"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-gold px-5 py-2.5 font-bold text-void-black hover:bg-ember hover:shadow-[0_0_20px_rgba(242,193,78,0.4)] transition-all cursor-pointer"
                >
                  Notify Me
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
