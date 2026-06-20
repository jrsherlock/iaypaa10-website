import Link from "next/link";
import Hero from "@/components/sections/Hero";
import CountdownTimer from "@/components/ui/CountdownTimer";
import SlimeDivider from "@/components/ui/SlimeDivider";
import QuickInfoCards from "@/components/sections/QuickInfoCards";
import ThemeTeaser from "@/components/sections/ThemeTeaser";
import EmailSignup from "@/components/sections/EmailSignup";

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Countdown — a quiet moment, plain heading. */}
      <section className="relative py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/20 pb-4">
            <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              August 14–16, 2026
            </span>
            <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wide text-bone-white leading-none">
              Until we <span className="text-ooze-green">gather</span>
            </h2>
          </div>
          <CountdownTimer />
        </div>
      </section>

      <SlimeDivider />

      {/* 3. Feature Program (formerly Quick Info Cards) */}
      <QuickInfoCards />

      <SlimeDivider />

      {/* 4. Theme Teaser — atmospheric pull-quote */}
      <ThemeTeaser />

      <SlimeDivider />

      {/* 5. What is IAYPAA — the costume comes off. Plain, sincere, serif.
              This is the passage someone scanning the QR at a meeting actually
              needs to read. Quiet on purpose. */}
      <section className="relative py-20 sm:py-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-bone-white/15" aria-hidden="true" />
            <span className="font-typewriter text-xs tracking-[0.3em] uppercase text-bone-white/55">
              the plain truth
            </span>
            <span className="h-px flex-1 bg-bone-white/15" aria-hidden="true" />
          </div>

          <h2 className="font-news text-3xl sm:text-4xl text-bone-white leading-tight mb-6 text-center">
            For young people who want to stay sober &mdash; and anyone willing
            to stand beside them.
          </h2>

          <p className="font-news text-lg sm:text-xl text-bone-white/85 leading-[1.75] text-center">
            IAYPAA is Iowa Young People in Alcoholics Anonymous. Since 2016
            we&rsquo;ve gathered once a year for a weekend of speaker meetings,
            workshops, and fellowship &mdash; organized by young people in AA,
            open to anyone with a desire to stop drinking. No age requirement,
            no cover charge for being new, no judgment if it&rsquo;s your first
            time in the room.{" "}
            <Link
              href="/about"
              className="text-gold underline underline-offset-4 decoration-gold/40 hover:decoration-gold transition-colors"
            >
              More about IAYPAA &rarr;
            </Link>
          </p>
        </div>
      </section>

      <SlimeDivider />

      {/* 6. Email Signup */}
      <EmailSignup />
    </>
  );
}
