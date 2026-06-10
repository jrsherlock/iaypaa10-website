import type { Metadata } from "next";
import Image from "next/image";
import GlowText from "@/components/ui/GlowText";
import SlimeDivider from "@/components/ui/SlimeDivider";
import RisingMotes from "@/components/effects/RisingMotes";
import OozeButton from "@/components/ui/OozeButton";
import { CONFERENCE } from "@/lib/constants";

// Thumbnail is the JPG (renders as an image preview); the downloaded
// artifact is the print-ready PDF.
const FLYER_THUMB = "/flyers/iaypaax-flyer.jpg";
const FLYER_DOWNLOAD = "/flyers/iaypaax-flyer.pdf";

export const metadata: Metadata = {
  title: "Outreach",
  description:
    "Help spread the word about IAYPAA X! Download flyers, share on social media, and learn how to join the committee.",
};

const SHARE_TEXTS = [
  {
    platform: "General",
    text: `IAYPAA X is coming to Iowa City in August 2026! The theme is Primordial Ooze — ten years of IAYPAA and a weekend about coming up out of the dark together. Hope to see you there.`,
  },
  {
    platform: "Meeting Announcement",
    text: `Hey everyone! The 10th annual Iowa Young People in AA conference is happening August 2026 in Iowa City. It's called Primordial Ooze and it's going to be epic. Check out iaypaa.org for details!`,
  },
  {
    platform: "Text to a Friend",
    text: `Have you heard about IAYPAA X? It's a young people in AA conference in Iowa City this August. Speakers, workshops, fellowship, and the Primordial Ooze theme — about coming up out of the dark. You should come!`,
  },
];

export default function OutreachPage() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-4">
          <GlowText as="h1" className="mb-4">
            Outreach
          </GlowText>
          <p className="text-bone-white/70 text-lg md:text-xl max-w-2xl mx-auto font-[family-name:var(--font-space)]">
            Help us spread the word about IAYPAA X
          </p>
        </div>
        <RisingMotes count={10} />

        {/* Download Flyer */}
        <section className="mb-16 text-center">
          <GlowText as="h2" glow="subtle" className="mb-6">
            Download the Flyer
          </GlowText>
          <div className="max-w-md mx-auto rounded-xl border border-gold/30 bg-toxic-green/10 p-8">
            {/* Thumbnail of the actual flyer \u2014 click to open/download */}
            <a
              href={FLYER_DOWNLOAD}
              download="IAYPAA-X-Flyer.pdf"
              aria-label="Download the IAYPAA X flyer (PDF)"
              className="group block w-44 mx-auto mb-6"
            >
              <span className="relative block aspect-[1179/1771] overflow-hidden border border-ooze-green/35 paper-grit rotate-[-1deg] shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.03]">
                <Image
                  src={FLYER_THUMB}
                  alt="IAYPAA X \u2014 Primordial Ooze conference flyer"
                  fill
                  className="object-cover"
                  sizes="176px"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-2 left-2 stamp text-gold/90 !text-[0.55rem] !tracking-[0.25em] !py-0.5 !px-1.5 bg-void-black/60"
                >
                  The Flyer
                </span>
              </span>
            </a>
            <p className="text-bone-white/70 mb-6 leading-relaxed">
              Print it out, share it at meetings, post it on bulletin boards,
              and pass it around. Every flyer helps carry the message to someone
              who might need it.
            </p>
            <a
              href={FLYER_DOWNLOAD}
              download="IAYPAA-X-Flyer.pdf"
              className="relative inline-flex items-center justify-center rounded-lg px-6 py-3 font-bold transition-all duration-300 bg-gold text-void-black hover:bg-ember hover:shadow-[0_0_20px_rgba(242,193,78,0.4),0_0_40px_rgba(247,129,84,0.2)]"
            >
              Download Flyer (PDF)
            </a>
            <p className="text-bone-white/40 text-xs mt-4">
              Print-ready PDF \u00B7 share it anywhere
            </p>
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* Social Media */}
        <section className="mb-16 text-center">
          <GlowText as="h2" glow="subtle" className="mb-6">
            Follow Us
          </GlowText>
          <p className="text-bone-white/70 mb-8 max-w-lg mx-auto">
            Stay connected and get the latest updates on IAYPAA X. Follow us on
            social media and share our posts with your network.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href={CONFERENCE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-ember/30 bg-void-black/60 px-6 py-4 transition-all duration-300 hover:border-ember/60 hover:shadow-[0_0_20px_rgba(247,129,84,0.15)]"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-7 h-7 text-ember transition-transform duration-300 group-hover:scale-110"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <div className="text-left">
                <div className="font-anton text-ember text-lg glow-text-subtle">
                  Instagram
                </div>
                <div className="text-bone-white/50 text-xs">@iaypaa</div>
              </div>
            </a>
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* The wider fellowship — ICYPAA, the international young people's
            umbrella. Outbound link to their site + directory for folks
            looking to plug in beyond Iowa. */}
        <section className="mb-16 text-center">
          <GlowText as="h2" glow="subtle" className="mb-6">
            The Wider Fellowship
          </GlowText>
          <p className="text-bone-white/70 mb-8 max-w-2xl mx-auto">
            IAYPAA is one of dozens of young-people&rsquo;s conferences across
            the country. The international umbrella is ICYPAA &mdash; the
            International Conference of Young People in A.A. &mdash; running
            since 1958. If IAYPAA X is your first YPAA event, theirs is the
            next door to walk through.
          </p>
          <div className="max-w-2xl mx-auto rounded-xl border border-ooze-green/30 bg-void-black/60 p-6 sm:p-8">
            <p className="font-typewriter text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase text-bone-white/45 mb-3">
              International umbrella &middot; since 1958
            </p>
            <h3 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl text-bone-white leading-tight mb-3">
              <span className="text-ooze-green">ICYPAA</span> &mdash; the wider room
            </h3>
            <p className="text-bone-white/75 leading-relaxed mb-6">
              Background on YPAA, archives of past conferences, a worldwide
              directory of young-people&rsquo;s groups, and the bid process
              for hosting future ICYPAA conferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://www.icypaa.org"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-typewriter text-xs uppercase tracking-[0.25em] text-void-black bg-gold px-5 py-3 rounded-md hover:bg-bone-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ooze-green"
              >
                Visit icypaa.org
                <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                href="https://www.icypaa.org/ypaa-directory"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-typewriter text-xs uppercase tracking-[0.25em] text-gold border border-gold/40 px-5 py-3 rounded-md hover:text-bone-white hover:border-bone-white transition-colors"
              >
                YPAA directory
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* Share the Word */}
        <section className="mb-16">
          <GlowText as="h2" glow="subtle" className="mb-4 text-center">
            Share the Word
          </GlowText>
          <p className="text-bone-white/60 text-center mb-10 max-w-lg mx-auto">
            Copy and paste these messages to share at meetings, in group chats,
            or on social media. Tweak them to make them your own!
          </p>
          <div className="max-w-3xl mx-auto space-y-6">
            {SHARE_TEXTS.map((item) => (
              <div
                key={item.platform}
                className="rounded-xl border border-ooze-green/20 bg-void-black/60 p-6 hover:border-ooze-green/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-[family-name:var(--font-mono)] text-xs text-ooze-green tracking-wider uppercase">
                    {item.platform}
                  </span>
                </div>
                <p className="text-bone-white/70 leading-relaxed text-sm italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>

        <SlimeDivider className="mb-16" />

        {/* Join the Committee */}
        <section className="mb-8 text-center">
          <GlowText as="h2" glow="subtle" className="mb-6">
            Join the Committee
          </GlowText>
          <div className="max-w-2xl mx-auto rounded-xl border border-swamp-teal/30 bg-gradient-to-b from-toxic-green/15 to-void-black/40 p-8 md:p-10">
            <div className="text-4xl mb-4">{"\uD83E\uDD1D"}</div>
            <div className="space-y-4 text-bone-white/80 leading-relaxed">
              <p>
                IAYPAA is entirely volunteer-run, and we&apos;re always looking
                for enthusiastic people to join the committee. Whether you have
                experience in event planning, design, outreach, or just a
                willingness to help — there&apos;s a place for you.
              </p>
              <p>
                Service positions are a fantastic way to give back, build
                connections, and be part of something bigger than yourself.
                Committee meetings are held regularly and are open to anyone
                interested in getting involved.
              </p>
              <p className="text-bone-white/60 text-sm">
                Available positions include: outreach chair, registration
                coordinator, merchandise lead, hospitality, entertainment, and
                more.
              </p>
            </div>
            <div className="mt-8">
              <OozeButton href={`mailto:${CONFERENCE.email}?subject=I Want to Join the IAYPAA X Committee`}>
                Get Involved
              </OozeButton>
            </div>
            <p className="text-bone-white/50 text-sm mt-4">
              Or email us directly at{" "}
              <a
                href={`mailto:${CONFERENCE.email}`}
                className="text-gold hover:underline"
              >
                {CONFERENCE.email}
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
