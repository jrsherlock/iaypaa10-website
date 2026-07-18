import { CHALLENGE } from "@/lib/constants";
import { formatUSD, scaleFraction } from "@/lib/challenge";

/**
 * The Ooza-Palooza balance widget: festival-lineup thermometer. A CSS
 * glass column of ooze rises past the milestone lineup on the right; a
 * floating live badge marks the current total on the left. The liquid
 * fills on load (goo-fill) and bubbles drift up through it (goo-bubble)
 * — rising and settling, per the design philosophy. All data derives
 * from CHALLENGE in constants.ts.
 */

const TUBE_H = 420; // px — glass column height
const BULB_GAP = 44; // px — bulb region below the column (48px bulb, -4 overlap)

export default function OozeThermometer() {
  const { raised, goal, updated, tiers } = CHALLENGE;
  const frac = scaleFraction(raised);
  const fillPct = frac * 100;
  const bubbleRise = Math.max(frac * TUBE_H - 12, 0);

  return (
    <div className="border border-ooze-green/25 bg-void-black/60 paper-grit p-6 sm:p-7">
      {/* ---- balance header ---- */}
      <div className="text-center mb-9">
        <p className="font-typewriter text-[0.65rem] tracking-[0.3em] uppercase text-bone-white/55">
          Ooza-Palooza balance
        </p>
        <p
          className="font-anton text-5xl leading-none text-gold mt-2"
          style={{ textShadow: "0 0 18px rgba(242,193,78,0.5)" }}
        >
          {formatUSD(raised)}
        </p>
        <p className="font-typewriter text-[0.65rem] tracking-[0.2em] uppercase text-bone-white/50 mt-2.5">
          goal {formatUSD(goal)} · as of {updated}
        </p>
      </div>

      {/* ---- gauge row: [live-badge gutter][glass column][milestones] ---- */}
      <div className="flex justify-center">
        {/* live badge gutter — aligned to the tube's vertical span */}
        <div className="relative w-16 shrink-0" style={{ height: TUBE_H }}>
          <span
            className="absolute right-1 translate-y-1/2 flex items-center gap-1 font-[family-name:var(--font-mono)] text-sm tracking-wider text-ember whitespace-nowrap"
            style={{
              bottom: `${fillPct}%`,
              textShadow: "0 0 10px rgba(247,129,84,0.55)",
            }}
          >
            {formatUSD(raised)}
            <span aria-hidden="true">—</span>
          </span>
        </div>

        {/* the tube + bulb */}
        <div
          className="flex flex-col items-center shrink-0"
          role="img"
          aria-label={`Fundraising thermometer: ${formatUSD(raised)} raised of ${formatUSD(goal)}.`}
        >
          <div
            className="relative w-[18px] overflow-hidden rounded-t-full border-2 border-b-0 border-bone-white/15 bg-bone-white/[0.03]"
            style={{ height: TUBE_H }}
          >
            {/* the ooze */}
            <div
              className="goo-fill absolute bottom-0 inset-x-0"
              style={{
                height: `${fillPct}%`,
                background:
                  "linear-gradient(to top, #0A1A12, #4D9078 55%, #5FAD56)",
                boxShadow: "0 0 26px rgba(95,173,86,0.55)",
              }}
            >
              {/* hot cap at the surface */}
              <div
                className="absolute top-0 inset-x-0 h-[4px] bg-bone-white goo-glow"
                style={{
                  boxShadow: "0 0 8px #E8E6E1, 0 0 18px #5FAD56",
                }}
              />
              {/* bubbles rising through the goo */}
              {[
                { left: 2, size: 5, dur: "7s", delay: "0s" },
                { left: 9, size: 3, dur: "9s", delay: "2.6s" },
                { left: 6, size: 4, dur: "8s", delay: "5s" },
              ].map((b, i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="goo-bubble absolute bottom-1 rounded-full bg-bone-white/35"
                  style={{
                    left: b.left,
                    width: b.size,
                    height: b.size,
                    animationDuration: b.dur,
                    animationDelay: b.delay,
                    ["--bubble-rise" as string]: `-${bubbleRise}px`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* base bulb */}
          <div className="relative -mt-1 flex h-12 w-12 items-center justify-center rounded-full border-2 border-bone-white/15 bg-bone-white/[0.03]">
            <div
              className="h-8 w-8 rounded-full goo-glow"
              style={{
                background: "radial-gradient(circle at 40% 35%, #4D9078, #0A1A12)",
                boxShadow: "0 0 24px rgba(95,173,86,0.5)",
              }}
            />
          </div>
        </div>

        {/* milestone lineup — same height as the tube so % line up */}
        <div className="relative flex-1 ml-5" style={{ height: TUBE_H }}>
          {tiers.map((tier, i) => {
            const unlocked = tier.amount <= raised;
            const bottom = ((i + 1) / tiers.length) * 100;
            return (
              <span
                key={tier.amount}
                className={`absolute left-0 translate-y-1/2 flex items-center gap-2 whitespace-nowrap font-[family-name:var(--font-mono)] text-xs tracking-wider ${
                  unlocked ? "text-bone-white" : "text-bone-white/40"
                }`}
                style={{ bottom: `${bottom}%` }}
              >
                <span
                  aria-hidden="true"
                  className={unlocked ? "text-gold" : "text-bone-white/25"}
                  style={
                    unlocked
                      ? { textShadow: "0 0 8px rgba(242,193,78,0.8)" }
                      : undefined
                  }
                >
                  {unlocked ? "✓" : "—"}
                </span>
                {formatUSD(tier.amount)}
              </span>
            );
          })}
        </div>
      </div>
      {/* spacer keeps the bulb clear of the card edge on short screens */}
      <div style={{ height: BULB_GAP - 36 }} aria-hidden="true" />
    </div>
  );
}
