import type { Metadata } from "next";
import GlowText from "@/components/ui/GlowText";
import SlimeDivider from "@/components/ui/SlimeDivider";
import DrippingSlime from "@/components/effects/DrippingSlime";
import ComingSoon from "@/components/ui/ComingSoon";
import { CONFERENCE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Hotel & Venue",
  description:
    "Hotel and venue information for IAYPAA X in Iowa City, Iowa. Travel tips, nearest airports, and room block details coming soon.",
};

export default function HotelPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-4">
          <GlowText as="h1" className="mb-4">
            Hotel &amp; Venue
          </GlowText>
          <p className="text-bone-white/70 text-lg md:text-xl max-w-2xl mx-auto font-[family-name:var(--font-space)]">
            Where to stay and how to get to {CONFERENCE.location}
          </p>
        </div>
        <DrippingSlime count={10} />

        {/* Coming Soon */}
        <section className="mb-16">
          <ComingSoon
            title="Hotel Announcement Coming Soon"
            subtitle="We're finalizing the venue and room block details. Sign up to be notified!"
            showEmailSignup
          />
        </section>

        <SlimeDivider className="mb-16" />

        {/* Iowa City Info */}
        <section className="mb-16">
          <GlowText as="h2" glow="subtle" className="mb-6 text-center">
            Welcome to Iowa City
          </GlowText>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 text-bone-white/80 leading-relaxed">
              <p>
                Iowa City is a vibrant college town in eastern Iowa, home to the
                University of Iowa and a thriving arts and culture scene. Named a
                UNESCO City of Literature, it&apos;s known for its walkable
                downtown, eclectic restaurants, and welcoming community.
              </p>
              <p>
                Whether you&apos;re exploring the Pedestrian Mall, grabbing coffee
                at a local shop, or checking out the Iowa City Book Festival,
                there&apos;s plenty to do beyond the conference. It&apos;s the
                perfect host city for IAYPAA X.
              </p>
            </div>
            <div className="rounded-xl border border-ooze-green/20 bg-void-black/60 p-6">
              <h3 className="font-[family-name:var(--font-creepster)] text-xl text-ooze-green mb-4 glow-text-subtle">
                Iowa City Highlights
              </h3>
              <ul className="space-y-3">
                {[
                  "UNESCO City of Literature",
                  "Walkable downtown & Ped Mall",
                  "University of Iowa campus",
                  "Vibrant local food scene",
                  "Strong recovery community",
                  "Plenty of AA meetings nearby",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-bone-white/70 text-sm">
                    <span className="text-ooze-green">&#x25C6;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* Travel Tips */}
        <section className="mb-16">
          <GlowText as="h2" glow="subtle" className="mb-8 text-center">
            Getting Here
          </GlowText>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* By Air */}
            <div className="rounded-xl border border-swamp-teal/30 bg-void-black/60 p-6">
              <div className="text-3xl mb-3">{"\u2708\uFE0F"}</div>
              <h3 className="font-[family-name:var(--font-creepster)] text-xl text-ooze-green mb-3 glow-text-subtle">
                By Air
              </h3>
              <div className="space-y-3 text-bone-white/70 text-sm leading-relaxed">
                <p>
                  <strong className="text-bone-white">The Eastern Iowa Airport (<span className="text-gold font-bold">CID</span>)</strong>{" "}
                  is the nearest airport, located in Cedar Rapids — about 25
                  minutes from Iowa City. Multiple airlines serve CID with
                  connections through major hubs.
                </p>
                <p>
                  <strong className="text-bone-white">Quad City International Airport (MLI)</strong>{" "}
                  is about 1 hour east, and the{" "}
                  <strong className="text-bone-white">Des Moines International Airport (DSM)</strong>{" "}
                  is about 2 hours west — both offer additional flight options.
                </p>
              </div>
            </div>

            {/* By Car */}
            <div className="rounded-xl border border-swamp-teal/30 bg-void-black/60 p-6">
              <div className="text-3xl mb-3">{"\uD83D\uDE97"}</div>
              <h3 className="font-[family-name:var(--font-creepster)] text-xl text-ooze-green mb-3 glow-text-subtle">
                By Car
              </h3>
              <div className="space-y-3 text-bone-white/70 text-sm leading-relaxed">
                <p>
                  Iowa City is conveniently located along{" "}
                  <strong className="text-bone-white">Interstate 80</strong>, making
                  it easy to reach from anywhere in the Midwest.
                </p>
                <ul className="space-y-1">
                  <li>From Des Moines: ~2 hours east on I-80</li>
                  <li>From Chicago: ~3.5 hours west on I-80</li>
                  <li>From Minneapolis: ~4.5 hours south on I-35/I-80</li>
                  <li>From Omaha: ~4 hours east on I-80</li>
                  <li>From Kansas City: ~4.5 hours north on I-35</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* Placeholder Room Rate */}
        <section className="mb-8 text-center">
          <GlowText as="h2" glow="subtle" className="mb-8">
            Conference Room Block
          </GlowText>
          <div className="max-w-md mx-auto rounded-xl border border-gold/30 bg-toxic-green/10 p-8 animate-pulse-glow">
            <div className="text-4xl mb-4">{"\uD83C\uDFE8"}</div>
            <h3 className="font-[family-name:var(--font-creepster)] text-2xl text-ooze-green mb-2 glow-text-subtle">
              Hotel Room Block
            </h3>
            <div className="font-[family-name:var(--font-mono)] text-3xl text-bone-white font-bold mb-2">
              Rate TBA
            </div>
            <p className="text-bone-white/60 text-sm mb-6">
              Discounted group rate for IAYPAA X attendees. Hotel name and
              booking link will be announced soon.
            </p>
            <div className="inline-block rounded-full border border-ooze-green/50 bg-void-black/60 px-5 py-2">
              <span className="font-[family-name:var(--font-mono)] text-ooze-green text-xs tracking-widest uppercase glow-text-subtle">
                Details Coming Soon
              </span>
            </div>
          </div>
          <p className="text-bone-white/50 text-sm mt-6 max-w-lg mx-auto">
            We recommend booking within the conference room block for the best
            rate and to be close to the action. Contact{" "}
            <a
              href={`mailto:${CONFERENCE.email}`}
              className="text-gold hover:underline"
            >
              {CONFERENCE.email}
            </a>{" "}
            with any questions.
          </p>
        </section>
      </div>
    </div>
  );
}
