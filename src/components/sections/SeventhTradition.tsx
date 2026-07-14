import { CONFERENCE } from "@/lib/constants";

/**
 * Seventh Tradition — how to donate. Self-supporting through our own
 * contributions; the ask is sincere and plain, in the "costume comes off"
 * register. Cash App handle lives in constants.ts.
 */
export default function SeventhTradition() {
  const { cashApp } = CONFERENCE;

  return (
    <section
      id="donate"
      className="relative px-4 sm:px-6 py-20 sm:py-24 scroll-mt-20"
    >
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-bone-white/15" aria-hidden="true" />
          <span className="font-typewriter text-xs tracking-[0.3em] uppercase text-bone-white/55">
            Seventh Tradition
          </span>
          <span className="h-px flex-1 bg-bone-white/15" aria-hidden="true" />
        </div>

        <div className="relative bg-void-black border border-gold/40 paper-grit p-8 sm:p-10 text-center">
          <h2 className="font-anton text-3xl sm:text-5xl uppercase tracking-wide text-bone-white leading-none mb-5">
            Help keep it <span className="text-gold">free</span>
          </h2>

          <p className="font-news text-bone-white/85 text-base sm:text-lg leading-[1.75] max-w-xl mx-auto mb-8">
            IAYPAA X is self-supporting through our own contributions. Every
            dollar goes straight back into the weekend, keeps registration
            low, and funds the scholarships that make sure no one is turned
            away for lack of funds.
          </p>

          <a
            href={cashApp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-gold text-void-black font-anton uppercase tracking-[0.15em] text-base sm:text-lg px-7 py-3.5 border-2 border-gold transition-all hover:bg-ember hover:border-ember hover:shadow-[0_0_24px_rgba(247,129,84,0.45)]"
          >
            Donate via Cash App
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </a>

          <p className="mt-4 font-typewriter text-sm tracking-[0.25em] uppercase text-bone-white/60">
            {cashApp.handle} &middot; cash.app &middot; new tab
          </p>
        </div>
      </div>
    </section>
  );
}
