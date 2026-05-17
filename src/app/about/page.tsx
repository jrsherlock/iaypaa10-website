import type { Metadata } from "next";
import GlowText from "@/components/ui/GlowText";
import SlimeDivider from "@/components/ui/SlimeDivider";
import RisingMotes from "@/components/effects/RisingMotes";
import { CONFERENCE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about IAYPAA — Iowa Young People in Alcoholics Anonymous — and our 10th annual conference, Primordial Ooze, in Iowa City, August 2026.",
};

const WHAT_TO_EXPECT = [
  {
    icon: "\uD83C\uDFA4",
    title: "Speakers",
    description:
      "Hear powerful stories of experience, strength, and hope from speakers across the fellowship. Keynote and panel sessions all weekend long.",
  },
  {
    icon: "\uD83D\uDEE0\uFE0F",
    title: "Workshops",
    description:
      "Dive deeper into recovery topics with interactive workshops led by members of the fellowship. Something for everyone, from newcomers to old-timers.",
  },
  {
    icon: "\uD83E\uDD1D",
    title: "Fellowship",
    description:
      "Connect with young people in AA from across Iowa and beyond. Build friendships that last well beyond the weekend.",
  },
  {
    icon: "\uD83C\uDF89",
    title: "Fun",
    description:
      "Dance parties, games, themed events, and plenty of laughs. We prove that sobriety is anything but boring — especially with a Primordial Ooze theme.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-4">
          <GlowText as="h1" className="mb-4">
            About IAYPAA
          </GlowText>
          <p className="text-bone-white/70 text-lg md:text-xl max-w-2xl mx-auto font-[family-name:var(--font-space)]">
            A decade of young people carrying the message of recovery across Iowa
          </p>
        </div>
        <RisingMotes count={10} />

        {/* What is IAYPAA */}
        <section className="mb-16">
          <GlowText as="h2" glow="subtle" className="mb-6 text-center">
            What is IAYPAA?
          </GlowText>
          <div className="max-w-3xl mx-auto space-y-4 text-bone-white/80 leading-relaxed text-base md:text-lg">
            <p>
              <strong className="text-ooze-green">IAYPAA</strong> stands for{" "}
              <strong>{CONFERENCE.fullName}</strong>. We are a fellowship of
              young people in AA who organize an annual conference dedicated to
              carrying the message of recovery to young alcoholics across Iowa
              and beyond.
            </p>
            <p>
              Since 2017, IAYPAA has brought together hundreds of young people
              each year for a weekend of speaker meetings, workshops, fellowship,
              and fun — all rooted in the principles of Alcoholics Anonymous and
              its Twelve Traditions. Our conferences are self-supporting through
              our own contributions and are open to anyone with a desire to stop
              drinking, regardless of age.
            </p>
            <p>
              What started as a small gathering has grown into one of Iowa&apos;s
              most vibrant YPAA events, creating a community where young people
              in recovery can find connection, hope, and proof that a sober life
              is worth living.
            </p>
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* About IAYPAA X */}
        <section className="mb-16">
          <GlowText as="h2" glow="subtle" className="mb-6 text-center">
            About IAYPAA X
          </GlowText>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-xl border border-ooze-green/30 bg-toxic-green/10 p-8 md:p-10">
              <p className="text-center font-[family-name:var(--font-mono)] text-ooze-green text-sm tracking-widest uppercase mb-4">
                {CONFERENCE.edition} &bull; {CONFERENCE.date} &bull;{" "}
                {CONFERENCE.location}
              </p>
              <div className="space-y-4 text-bone-white/80 leading-relaxed text-base md:text-lg">
                <p>
                  <strong className="text-ooze-green">IAYPAA X</strong> marks a
                  milestone — our{" "}
                  <strong className="text-swamp-teal">10th annual conference</strong>.
                  To mark a decade of recovery, fellowship, and growth, the
                  theme is{" "}
                  <span className="text-ooze-green font-bold glow-text-subtle">
                    Primordial Ooze
                  </span>
                  .
                </p>
                <p>
                  Primordial ooze is where life begins — the formless place
                  every one of us started from, and the new life that comes up
                  out of it given a little energy, a little time, and people
                  around you. This August, Iowa City fills with young people
                  who came up out of the dark. Whether you&apos;ve been to
                  every IAYPAA or this is your first, you belong here.
                </p>
                <p>
                  Just like the primordial ooze from which all life emerged, our
                  recovery journeys start from the most unlikely beginnings — and
                  from that ooze, something incredible grows.
                </p>
              </div>
            </div>
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* What to Expect */}
        <section className="mb-16">
          <GlowText as="h2" glow="subtle" className="mb-10 text-center">
            What to Expect
          </GlowText>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHAT_TO_EXPECT.map((item, index) => {
              const titleColors = ["text-ooze-green", "text-gold", "text-ember", "text-swamp-teal"];
              const titleColor = titleColors[index % titleColors.length];
              return (
              <div
                key={item.title}
                className="group rounded-xl border border-ooze-green/20 bg-void-black/60 p-6 text-center transition-all duration-300 hover:border-gold/50 hover:bg-toxic-green/10 hover:shadow-[0_0_20px_rgba(57,255,20,0.1)]"
              >
                <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <h3 className={`font-anton text-xl ${titleColor} mb-3 glow-text-subtle`}>
                  {item.title}
                </h3>
                <p className="text-bone-white/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
              );
            })}
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* First-Timers Welcome */}
        <section className="mb-8">
          <GlowText as="h2" glow="subtle" className="mb-6 text-center">
            First-Timers Welcome
          </GlowText>
          <div className="max-w-3xl mx-auto rounded-xl border border-gold/30 bg-gradient-to-b from-toxic-green/15 to-void-black/40 p-8 md:p-10">
            <div className="text-center text-4xl mb-6">
              {"\uD83D\uDC4B"}
            </div>
            <div className="space-y-4 text-bone-white/80 leading-relaxed text-base md:text-lg text-center">
              <p>
                <strong className="text-gold">Never been to a YPAA conference before?</strong>{" "}
                You&apos;re in the right place. IAYPAA conferences are designed to
                be welcoming, inclusive, and accessible to everyone — whether
                you&apos;ve been sober for ten years or ten days.
              </p>
              <p>
                There are no requirements other than a desire to stop drinking
                (or support someone who does). You don&apos;t need to know anyone,
                you don&apos;t need to be a certain age, and you definitely don&apos;t
                need to have it all figured out.
              </p>
              <p>
                Our conference is full of people who remember exactly what it
                felt like to walk in for the first time. You&apos;ll find open arms,
                friendly faces, and a community that genuinely wants you here.
              </p>
              <p className="text-ooze-green font-semibold text-lg glow-text-subtle">
                Come as you are. Leave with a community.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
