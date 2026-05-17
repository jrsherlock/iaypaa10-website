import Link from "next/link";

interface ComingSoonProps {
  /** What's TBA — e.g. "Schedule", "Speaker Lineup", "Group Rate". */
  title: string;
  /** A one-line description shown under the title in serif. */
  subtitle?: string;
  /** When true, shows a CTA pointing at the homepage mailing-list signup. */
  showEmailSignup?: boolean;
}

/**
 * "Still forming" panel — for sections of the site that are coming
 * together. Emergence, not a stamped "TBA" placard: a quiet label, the
 * subject in Anton, a "Still forming" mark, a plain serif line, and an
 * optional CTA to the mailing list. See docs/design-philosophy.md.
 */
export default function ComingSoon({
  title,
  subtitle,
  showEmailSignup = false,
}: ComingSoonProps) {
  return (
    <div className="relative max-w-xl mx-auto">
      <div className="relative bg-toxic-green/30 border border-ooze-green/30 paper-grit p-8 sm:p-10">
        {/* Quiet label */}
        <p className="font-typewriter text-[0.7rem] sm:text-xs tracking-[0.35em] uppercase text-bone-white/55 mb-3">
          In progress
        </p>

        <div className="flex items-baseline gap-4 mb-4 border-b border-ooze-green/25 pb-3">
          <h2 className="font-anton text-2xl sm:text-3xl uppercase tracking-wide text-bone-white leading-none">
            {title}
          </h2>
        </div>

        {/* The big mark */}
        <p
          className="font-anton text-gold leading-none mb-5"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            textShadow:
              "0 0 14px rgba(242,193,78,0.55), 0 0 40px rgba(247,129,84,0.35)",
            letterSpacing: "0.01em",
          }}
        >
          Still forming
        </p>

        {subtitle && (
          <p className="font-news text-bone-white/85 text-base sm:text-lg leading-relaxed mb-6 max-w-prose">
            {subtitle}
          </p>
        )}

        {showEmailSignup && (
          <Link
            href="/#mailing-list"
            className="group inline-flex items-center gap-2 font-typewriter text-xs sm:text-sm uppercase tracking-[0.25em] text-gold border-b border-gold/40 pb-0.5 transition-colors hover:text-bone-white hover:border-bone-white"
          >
            Get on the IAYPAA X mailing list
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
