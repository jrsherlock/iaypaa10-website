import RisingMotes from "@/components/effects/RisingMotes";
import ScheduleProgram from "@/components/sections/ScheduleProgram";
import ComingSoon from "@/components/ui/ComingSoon";
import { PROGRAM_PUBLIC } from "@/lib/constants";
import { ALL_WEEKEND, SCHEDULE_DAYS } from "@/lib/schedule";

/**
 * The Program page. A server component on purpose: the weekend program is
 * only handed to the client when `PROGRAM_PUBLIC` is true. While it is
 * false the page shows the "soon to be released" notice and the program
 * never leaves the server — not in the HTML, and not in the page's JS
 * bundle either. To reveal the program, flip `PROGRAM_PUBLIC` in
 * `src/lib/constants.ts` and redeploy. The interactive day-by-day UI lives
 * in `src/components/sections/ScheduleProgram.tsx`; the data lives in
 * `src/lib/schedule.ts`.
 */
export default function SchedulePage() {
  return (
    <div className="relative">
      {/* ---------- Page header ---------- */}
      <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-rule-lines opacity-50 pointer-events-none"
          aria-hidden="true"
        />
        <RisingMotes
          count={5}
          color="#5FAD56"
          className="absolute top-0 left-0 right-0 z-10"
        />

        <div className="relative z-20 max-w-3xl mx-auto">
          <div className="flex items-baseline gap-4 sm:gap-6 border-b border-ooze-green/25 pb-4 mb-8">
            <span className="font-typewriter text-xs sm:text-sm tracking-[0.3em] uppercase text-bone-white/55 shrink-0">
              The weekend
            </span>
            <h1 className="font-anton text-4xl sm:text-6xl uppercase tracking-wide text-bone-white leading-none">
              The <span className="text-ooze-green">Program</span>
            </h1>
          </div>

          <p className="font-typewriter text-sm sm:text-base tracking-[0.15em] uppercase text-bone-white/70 leading-relaxed">
            Three nights · Aug 14—16, 2026 · Graduate by Hilton, Iowa City
          </p>
        </div>
      </section>

      {/* ---------- Program notice (while the program is held back) ---------- */}
      {!PROGRAM_PUBLIC && (
        <section className="relative px-4 sm:px-6 pb-16 sm:pb-20">
          <ComingSoon
            title="Weekend Program"
            subtitle="Soon to be released. Stay tuned!"
            showEmailSignup
          />
        </section>
      )}

      {/* ---------- Day-by-day program + all-weekend threads ---------- */}
      {PROGRAM_PUBLIC && (
        <ScheduleProgram days={SCHEDULE_DAYS} allWeekend={ALL_WEEKEND} />
      )}
    </div>
  );
}
