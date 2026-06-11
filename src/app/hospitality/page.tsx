import type { Metadata } from "next";
import GlowText from "@/components/ui/GlowText";
import RisingMotes from "@/components/effects/RisingMotes";
import { HOSPITALITY_SIGNUP_URL, HOSPITALITY_SLOTS } from "@/lib/constants";
import { fetchSlotAvailability } from "@/lib/signupgenius";

export const metadata: Metadata = {
  title: "Hospitality Suite",
  description:
    "Host a slot in the IAYPAA X hospitality suite — home groups sign up to bring meals and snacks throughout the weekend at the Highlander Hotel.",
};

// Regenerate at most every 10 minutes so the claimed/open badges track the
// SignUpGenius sheet without visitors ever hitting it directly.
export const revalidate = 600;

// Home groups claim a meal/snack slot via SignUpGenius. The slot lineup is
// static; claimed/open status is fetched live and degrades to no badges if
// the fetch fails (see src/lib/signupgenius.ts).
export default async function HospitalityPage() {
  const availability = await fetchSlotAvailability();

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-4">
          <GlowText as="h1" className="mb-4">
            Host the Hospitality Suite
          </GlowText>
          <p className="text-bone-white/70 text-lg md:text-xl max-w-2xl mx-auto font-[family-name:var(--font-space)]">
            The social hub of the weekend — and it runs on home groups
          </p>
        </div>
        <RisingMotes count={10} />

        <section className="mb-8">
          <p className="text-bone-white/70 text-center mb-10 max-w-2xl mx-auto">
            The hospitality suite at the Highlander is where the fellowship
            gathers between sessions — coffee, snacks, and conversation that
            runs late. Each slot below is a meal or snack shift one group hosts
            together: bring the food, serve the fellowship, and keep the room
            warm. Claim your group&apos;s slot on SignUpGenius.
          </p>
          <div className="max-w-4xl mx-auto rounded-xl border border-ooze-green/30 bg-void-black/60 p-6 sm:p-8">
            <div className="grid md:grid-cols-3 gap-x-8 gap-y-8">
              {HOSPITALITY_SLOTS.map((day) => (
                <div key={day.day}>
                  <div className="flex items-baseline gap-3 border-b border-ooze-green/25 pb-2 mb-4">
                    <span className="font-anton text-2xl text-ooze-green leading-none">
                      {day.day}
                    </span>
                    <span className="font-typewriter text-xs tracking-[0.2em] uppercase text-bone-white/60">
                      {day.date}
                    </span>
                  </div>
                  <ul className="space-y-3">
                    {day.slots.map((slot) => {
                      const claimed = availability?.get(slot.slotItemId);
                      return (
                        <li
                          key={slot.title}
                          className={claimed ? "opacity-50" : undefined}
                        >
                          <span className="flex items-baseline justify-between gap-3">
                            <span className="font-[family-name:var(--font-mono)] text-xs text-bone-white/55 tracking-wider">
                              {slot.time}
                            </span>
                            {claimed === undefined ? null : claimed ? (
                              <span className="font-typewriter text-[0.6rem] tracking-[0.2em] uppercase text-bone-white/45 border border-bone-white/20 px-1.5 py-0.5 shrink-0">
                                Claimed
                              </span>
                            ) : (
                              <span className="font-typewriter text-[0.6rem] tracking-[0.2em] uppercase text-ooze-green border border-ooze-green/40 px-1.5 py-0.5 shrink-0">
                                Open
                              </span>
                            )}
                          </span>
                          <span className="block font-typewriter text-sm text-bone-white/85">
                            {slot.title}
                          </span>
                          <span className="block font-news text-xs text-bone-white/50 leading-relaxed">
                            {slot.note}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center border-t border-ooze-green/15 pt-8">
              <a
                href={HOSPITALITY_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-bold transition-all duration-300 bg-gold text-void-black hover:bg-ember hover:shadow-[0_0_20px_rgba(242,193,78,0.4),0_0_40px_rgba(247,129,84,0.2)]"
              >
                Claim a Slot on SignUpGenius
                <span aria-hidden="true">&rarr;</span>
              </a>
              <p className="text-bone-white/40 text-xs mt-4">
                {availability
                  ? "Availability synced from SignUpGenius every few minutes"
                  : "Live availability is on SignUpGenius"}{" "}
                &middot; one group per slot &middot; sign your whole group up
                together
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
