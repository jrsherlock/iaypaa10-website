import Link from "next/link";
import Hero from "@/components/sections/Hero";
import CountdownTimer from "@/components/ui/CountdownTimer";
import SlimeDivider from "@/components/ui/SlimeDivider";
import QuickInfoCards from "@/components/sections/QuickInfoCards";
import ThemeTeaser from "@/components/sections/ThemeTeaser";
import EmailSignup from "@/components/sections/EmailSignup";
import GlowText from "@/components/ui/GlowText";

export default function Home() {
  return (
    <>
      {/* 1. Hero */}
      <Hero />

      {/* 2. Divider */}
      <SlimeDivider />

      {/* 3. Countdown */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 text-center">
        <GlowText
          as="h2"
          glow="subtle"
          className="font-[family-name:var(--font-creepster)] text-3xl sm:text-4xl md:text-5xl text-ooze-green mb-10"
        >
          Countdown to IAYPAA X
        </GlowText>
        <CountdownTimer />
      </section>

      {/* 4. Divider */}
      <SlimeDivider />

      {/* 5. Quick Info Cards */}
      <QuickInfoCards />

      {/* 6. Divider */}
      <SlimeDivider />

      {/* 7. Theme Teaser */}
      <ThemeTeaser />

      {/* 8. Divider */}
      <SlimeDivider />

      {/* 9. What is IAYPAA? */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-3xl mx-auto text-center">
        <GlowText
          as="h2"
          glow="subtle"
          className="font-[family-name:var(--font-creepster)] text-3xl sm:text-4xl md:text-5xl text-ooze-green mb-6"
        >
          What is IAYPAA?
        </GlowText>
        <p className="text-bone-white/85 text-base sm:text-lg leading-relaxed font-[family-name:var(--font-space)]">
          IAYPAA stands for Iowa Young People in Alcoholics Anonymous. Since
          2017, we have brought together young people in recovery from across
          Iowa and beyond for a weekend of speaker meetings, workshops,
          fellowship, and fun. Our annual conference is organized by young people
          in AA, for anyone who wants to attend&mdash;no age requirement, just a
          desire to connect.{" "}
          <Link
            href="/about"
            className="text-gold underline underline-offset-4 decoration-gold/40 hover:decoration-gold transition-colors"
          >
            Learn more about IAYPAA
          </Link>
          .
        </p>
      </section>

      {/* 10. Divider */}
      <SlimeDivider />

      {/* 11. Email Signup */}
      <EmailSignup />
    </>
  );
}
