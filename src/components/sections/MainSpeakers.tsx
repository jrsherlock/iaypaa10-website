import Image from "next/image";
import Organism from "@/components/effects/Organism";
import { MAIN_SPEAKERS, type MainSpeaker } from "@/lib/constants";

/** Stable per-card seed, so an organism keeps its character across renders. */
const SEEDS: Record<MainSpeaker["id"], number> = {
  friday: 17,
  saturday: 43,
  sunday: 71,
  alanon: 29,
};

/** Eyebrow line: "Friday · Aug 14", or just the slot label when the
 *  speaker isn't tied to one night (the Al-Anon speaker). */
function slotLabel(speaker: MainSpeaker): string {
  return speaker.date ? `${speaker.day} · ${speaker.date}` : speaker.day;
}

/**
 * The main speakers — one per night, plus the Al-Anon speaker.
 *
 * The two states are the same thing at different stages of formation: an
 * unrevealed speaker is ooze that hasn't taken shape (a mass that morphs and
 * never resolves), a revealed one has cohered into a person. That is the
 * conference theme stated literally — see docs/design-philosophy.md — and it
 * is why the pending card needs no padlock, question mark, or blurred face.
 *
 * Content lives in `MAIN_SPEAKERS` in src/lib/constants.ts; revealing a
 * speaker is a data change there, not a change here.
 */

/**
 * Fallback figure for a revealed speaker with no commissioned portrait: a
 * plain silhouette that HAS cohered, so the distinction from a pending card
 * still reads.
 */
function CoheredSilhouette() {
  return (
    <div className="relative h-[190px] grid place-items-end justify-center">
      <div
        aria-hidden="true"
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[140px] h-5"
        style={{
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(95,173,86,0.3), transparent 70%)",
        }}
      />
      <div aria-hidden="true" className="relative w-32 h-[152px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full bg-ooze-green" />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[124px] h-[78px] bg-ooze-green"
          style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }}
        />
      </div>
    </div>
  );
}

function PendingCard({ speaker }: { speaker: MainSpeaker }) {
  return (
    <li className="organism-field border border-ooze-green/20 bg-toxic-green/30 p-4 flex items-center gap-4">
      <div className="shrink-0">
        <Organism seed={SEEDS[speaker.id]} size={66} />
      </div>
      <div className="min-w-0">
        <p className="font-typewriter text-[0.6rem] sm:text-[0.65rem] tracking-[0.26em] uppercase text-bone-white/50">
          {slotLabel(speaker)}
        </p>
        <p className="font-anton text-lg sm:text-xl uppercase tracking-[0.06em] text-bone-white/40 leading-none mt-1.5">
          Still forming
        </p>
      </div>
    </li>
  );
}

/**
 * A revealed speaker. The gold rule rides the TOP of the card, not between
 * the portrait and the name — it marks where a speaker begins, so a portrait
 * always reads as belonging to the name under it rather than to the name
 * above it. Everything inside a card sits tighter than the gap between
 * cards; that spacing relationship is what does the grouping.
 */
function RevealedCard({ speaker }: { speaker: MainSpeaker }) {
  return (
    <li className="border-t border-gold/45 pt-6">
      {speaker.portrait ? (
        /* Once a speaker is disclosed the card is just the portrait: no
           membrane over it, nothing moving. The organisms belong to the
           speakers who have not been cultured yet.

           No frame either — the artwork's ground is the same void-black as
           the page, so the figure rises out of the surface with no box. */
        <div className="relative">
          <Image
            src={speaker.portrait}
            alt={`Stencil portrait of ${speaker.name}, the ${speaker.day} speaker, rendered in ooze green with the face unreadable`}
            width={1000}
            height={1000}
            className="w-full h-auto"
            sizes="(min-width: 640px) 36rem, 100vw"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-[72%] h-6 pointer-events-none"
            style={{
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(95,173,86,0.28), transparent 70%)",
            }}
          />
        </div>
      ) : (
        <CoheredSilhouette />
      )}

      <div className="mt-3">
        <p className="font-typewriter text-[0.6rem] sm:text-[0.65rem] tracking-[0.26em] uppercase text-gold">
          {slotLabel(speaker)}
        </p>
        <p className="font-anton text-3xl sm:text-4xl uppercase tracking-wide text-bone-white leading-none mt-1.5">
          {speaker.name}
        </p>
        {speaker.hometown ? (
          <p className="font-typewriter text-[0.65rem] sm:text-xs tracking-[0.18em] uppercase text-ooze-green mt-1.5">
            {speaker.hometown}
          </p>
        ) : null}
        {speaker.bio ? (
          <p className="font-news text-sm sm:text-base text-bone-white/85 leading-relaxed mt-2.5 max-w-prose">
            {speaker.bio}
          </p>
        ) : null}
      </div>
    </li>
  );
}

export default function MainSpeakers() {
  return (
    <section className="relative px-4 sm:px-6 pb-16 sm:pb-20">
      {/* The gap between speakers has to beat the gaps inside one (mt-3,
          pt-6) by a clear margin, or a portrait reads as belonging to the
          name above it instead of the name below. */}
      <ul className="relative max-w-xl mx-auto flex flex-col gap-12 sm:gap-14 list-none">
        {MAIN_SPEAKERS.map((speaker) =>
          speaker.revealed ? (
            <RevealedCard key={speaker.id} speaker={speaker} />
          ) : (
            <PendingCard key={speaker.id} speaker={speaker} />
          ),
        )}
      </ul>
    </section>
  );
}
