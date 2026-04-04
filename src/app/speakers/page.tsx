import type { Metadata } from "next";
import Image from "next/image";
import GlowText from "@/components/ui/GlowText";
import SlimeDivider from "@/components/ui/SlimeDivider";
import DrippingSlime from "@/components/effects/DrippingSlime";
import ComingSoon from "@/components/ui/ComingSoon";
import OozeButton from "@/components/ui/OozeButton";
import { CONFERENCE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Speakers",
  description:
    "Speaker lineup for IAYPAA X — Primordial Ooze. Keynote speakers, panelists, and workshop leaders coming soon.",
};

const PLACEHOLDER_SPEAKERS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  label: `Speaker ${i + 1}`,
}));

export default function SpeakersPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-4">
          <GlowText as="h1" className="mb-4">
            Speakers
          </GlowText>
          <p className="text-bone-white/70 text-lg md:text-xl max-w-2xl mx-auto font-[family-name:var(--font-space)]">
            Hear powerful stories of experience, strength, and hope
          </p>
        </div>
        <DrippingSlime count={10} />

        {/* Coming Soon */}
        <section className="mb-16">
          <ComingSoon
            title="Speaker Lineup Coming Soon"
            subtitle="We're assembling an incredible lineup of speakers. Stay tuned!"
            showEmailSignup
          />
        </section>

        <SlimeDivider className="mb-16" />

        {/* Placeholder Speaker Grid */}
        <section className="mb-16">
          <GlowText as="h2" glow="subtle" className="mb-10 text-center">
            Featured Speakers
          </GlowText>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {PLACEHOLDER_SPEAKERS.map((speaker) => (
              <div
                key={speaker.id}
                className="group rounded-xl border-2 border-ooze-green/30 bg-void-black/60 p-6 text-center transition-all duration-300 hover:border-ooze-green/60 hover:shadow-[0_0_20px_rgba(95,173,86,0.15)]"
              >
                {/* Speaker Image */}
                <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-ooze-green/40 overflow-hidden transition-all duration-300 group-hover:border-ooze-green group-hover:shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                  <Image
                    src="/images/speaker.webp"
                    alt="Speaker to be announced"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-[family-name:var(--font-creepster)] text-3xl text-swamp-teal mb-2 glow-text-subtle">
                  ?
                </div>
                <p className="font-[family-name:var(--font-mono)] text-xs text-bone-white/40 tracking-wider uppercase">
                  To be announced
                </p>
              </div>
            ))}
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* Call for Speakers */}
        <section className="mb-8 text-center">
          <GlowText as="h2" glow="subtle" className="mb-6">
            Call for Speakers
          </GlowText>
          <div className="max-w-2xl mx-auto rounded-xl border border-gold/30 bg-gradient-to-b from-toxic-green/15 to-void-black/40 p-8 md:p-10">
            <div className="text-4xl mb-4">{"\uD83C\uDFA4"}</div>
            <div className="space-y-4 text-bone-white/80 leading-relaxed">
              <p>
                Know someone whose story needs to be heard? We&apos;re looking
                for speakers who carry a powerful message of recovery — from
                keynotes to panel discussions to workshop leaders.
              </p>
              <p>
                Speaker nominations are open! If you&apos;d like to nominate
                yourself or someone you know, reach out to our committee. We
                look for members with strong sobriety, compelling stories, and a
                passion for carrying the message to young people.
              </p>
              <p className="text-bone-white/60 text-sm">
                All speakers are selected in accordance with AA&apos;s Twelve
                Traditions. Speaker identities are kept confidential outside the
                fellowship.
              </p>
            </div>
            <div className="mt-8">
              <OozeButton href={`mailto:${CONFERENCE.email}?subject=IAYPAA X Speaker Nomination`}>
                Nominate a Speaker
              </OozeButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
