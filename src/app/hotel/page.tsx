import type { Metadata } from "next";
import Image from "next/image";
import GlowText from "@/components/ui/GlowText";
import SlimeDivider from "@/components/ui/SlimeDivider";
import DrippingSlime from "@/components/effects/DrippingSlime";
import { CONFERENCE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Hotel & Venue",
  description:
    "IAYPAA X is at The Highlander Hotel in Iowa City, Iowa — August 14–16, 2026. Psychedelic luxury, pool, arcade, patio bar, and more.",
};

const VENUE_HIGHLIGHTS = [
  { icon: "\u{1F3CA}", label: "Pool" },
  { icon: "\u{1F579}\u{FE0F}", label: "Arcade" },
  { icon: "\u{1F378}", label: "Patio Bar" },
  { icon: "\u{1F3B5}", label: "Live Music" },
  { icon: "\u{1F3BE}", label: "Pickleball" },
  { icon: "\u{1F333}", label: "Courtyard" },
];

const VENUE_IMAGES = [
  {
    src: "https://cdn.prod.website-files.com/662bf62cc1e1dce174d48bf8/6745eae51d8bf7157ebd6d39_210824_Highlander_0322%20(2)-2.jpg",
    alt: "The Highlander Hotel exterior",
  },
  {
    src: "https://cdn.prod.website-files.com/662bf62cc1e1dce174d48bf8/6650df58352c8cfc061d17ef_210824_Highlander_0018.jpg",
    alt: "The Highlander Hotel lobby and lounge",
  },
  {
    src: "https://cdn.prod.website-files.com/662bf62cc1e1dce174d48bf8/6632589a7944a3e4d58f0b29_Rectangle%20115.jpg",
    alt: "Patio bar area",
  },
  {
    src: "https://cdn.prod.website-files.com/662bf62cc1e1dce174d48bf8/663258a8645e8efed9225df6_Rectangle%20116.jpg",
    alt: "Hotel atrium and lobby",
  },
];

export default function HotelPage() {
  const { venue } = CONFERENCE;

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-4">
          <GlowText as="h1" className="mb-4">
            Hotel &amp; Venue
          </GlowText>
          <p className="text-bone-white/70 text-lg md:text-xl max-w-2xl mx-auto font-[family-name:var(--font-space)]">
            {CONFERENCE.date} &mdash; {CONFERENCE.location}
          </p>
        </div>
        <DrippingSlime count={10} />

        {/* Venue Hero */}
        <section className="mb-16">
          <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="font-[family-name:var(--font-creepster)] text-3xl md:text-5xl text-ooze-green glow-text mb-2">
                {venue.name}
              </h2>
              <p className="text-bone-white/80 text-sm md:text-base font-[family-name:var(--font-space)]">
                {venue.address}
              </p>
            </div>
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-ooze-green/30 mb-6">
              <Image
                src={VENUE_IMAGES[0].src}
                alt={VENUE_IMAGES[0].alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 900px"
                priority
              />
            </div>
            <div className="text-center">
              <a
                href={venue.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-gold px-8 py-3 font-bold text-void-black text-base hover:bg-ember hover:shadow-[0_0_25px_rgba(242,193,78,0.5)] transition-all"
              >
                Visit Hotel Website
              </a>
            </div>
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* Venue Vibe */}
        <section className="mb-16 text-center">
          <GlowText as="h2" glow="subtle" className="mb-3">
            The Vibe
          </GlowText>
          <p className="text-gold italic text-lg mb-8 font-[family-name:var(--font-space)]">
            &ldquo;Independent. Counterculture. You&apos;ll fit right in.&rdquo;
          </p>
          <p className="text-bone-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
            The Highlander Hotel is Iowa City&apos;s psychedelic-luxury urban
            resort &mdash; the perfect home for Primordial Ooze. With a pool,
            arcade, patio bar, live music, and courtyard hangouts, there&apos;s
            no shortage of fellowship space between sessions.
          </p>
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
            {VENUE_HIGHLIGHTS.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 rounded-full border border-ooze-green/30 bg-toxic-green/15 px-5 py-2.5 transition-all hover:border-ooze-green/60 hover:shadow-[0_0_12px_rgba(57,255,20,0.15)]"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-bone-white/90 text-sm font-medium">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* Photo Grid */}
        <section className="mb-16">
          <GlowText as="h2" glow="subtle" className="mb-10 text-center">
            Take a Look
          </GlowText>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {VENUE_IMAGES.map((img) => (
              <div
                key={img.alt}
                className="relative aspect-[4/3] overflow-hidden rounded-xl border border-ooze-green/20 group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 450px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <p className="absolute bottom-3 left-3 text-bone-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.alt}
                </p>
              </div>
            ))}
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* Conference Room Block */}
        <section className="mb-16 text-center">
          <GlowText as="h2" glow="subtle" className="mb-8">
            Conference Room Block
          </GlowText>
          <div className="max-w-md mx-auto rounded-xl border border-gold/30 bg-toxic-green/10 p-8 animate-pulse-glow">
            <h3 className="font-[family-name:var(--font-creepster)] text-2xl text-ooze-green mb-2 glow-text-subtle">
              {venue.name}
            </h3>
            <div className="font-[family-name:var(--font-mono)] text-3xl text-gold font-bold mb-2">
              Group Rate TBA
            </div>
            <p className="text-bone-white/60 text-sm mb-6">
              A discounted group rate for IAYPAA X attendees is being finalized.
              Booking link coming soon!
            </p>
            <p className="text-bone-white/50 text-xs">
              Call{" "}
              <a
                href={`tel:${venue.phone}`}
                className="text-gold hover:underline"
              >
                {venue.phone}
              </a>{" "}
              and mention IAYPAA for more info.
            </p>
          </div>
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
                Whether you&apos;re exploring the Pedestrian Mall, grabbing
                coffee at a local shop, or checking out the Iowa City Book
                Festival, there&apos;s plenty to do beyond the conference.
                It&apos;s the perfect host city for IAYPAA X.
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
                  <li
                    key={item}
                    className="flex items-center gap-2 text-bone-white/70 text-sm"
                  >
                    <span className="text-ooze-green">&#x25C6;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* Getting Here */}
        <section className="mb-8">
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
                  <strong className="text-bone-white">
                    The Eastern Iowa Airport (
                    <span className="text-gold font-bold">CID</span>)
                  </strong>{" "}
                  is the nearest airport, located in Cedar Rapids &mdash; about
                  25 minutes from Iowa City.
                </p>
                <p>
                  <strong className="text-bone-white">
                    Quad City International Airport (MLI)
                  </strong>{" "}
                  is about 1 hour east, and the{" "}
                  <strong className="text-bone-white">
                    Des Moines International Airport (DSM)
                  </strong>{" "}
                  is about 2 hours west.
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
                  <strong className="text-bone-white">Interstate 80</strong>,
                  making it easy to reach from anywhere in the Midwest.
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
      </div>
    </div>
  );
}
