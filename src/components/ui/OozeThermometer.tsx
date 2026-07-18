import { CHALLENGE } from "@/lib/constants";
import { formatUSD, scaleFraction } from "@/lib/challenge";

/**
 * The Challenge-Palooza thermometer: a glass test tube of rising ooze.
 * Pure SVG, server-rendered; the only motion is CSS (bubbles drifting up
 * through the goo, a slow breathing glow at the surface) — rising and
 * settling, per the design philosophy. Tier ticks sit at even steps up
 * the tube (see scaleFraction); unlocked ticks turn gold.
 */

// Tube geometry in viewBox units.
const VIEW_W = 220;
const VIEW_H = 660;
const TUBE_X = 62;
const TUBE_W = 48;
const TUBE_TOP = 46; // y of the $2500 mark (tube lip is a bit above)
const TUBE_BOTTOM = 540; // y of the $0 mark
const BULB_CY = 578;
const BULB_R = 42;

export default function OozeThermometer() {
  const { raised, tiers } = CHALLENGE;
  const fillY =
    TUBE_BOTTOM - scaleFraction(raised) * (TUBE_BOTTOM - TUBE_TOP);
  const step = (TUBE_BOTTOM - TUBE_TOP) / tiers.length;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role="img"
      aria-label={`Fundraising thermometer: ${formatUSD(raised)} raised of ${formatUSD(CHALLENGE.goal)}.`}
      className="w-full h-auto"
    >
      <defs>
        {/* goo: cold deep at the bottom resolving to living green up top */}
        <linearGradient id="goo" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#1B3B30" />
          <stop offset="55%" stopColor="#4D9078" />
          <stop offset="100%" stopColor="#5FAD56" />
        </linearGradient>
        <radialGradient id="bulb-glow" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#5FAD56" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#5FAD56" stopOpacity="0" />
        </radialGradient>
        <filter id="soft-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        {/* everything gooey clips to tube + bulb */}
        <clipPath id="vessel">
          <rect
            x={TUBE_X}
            y={TUBE_TOP - 26}
            width={TUBE_W}
            height={BULB_CY - TUBE_TOP + 26}
            rx={TUBE_W / 2}
          />
          <circle cx={TUBE_X + TUBE_W / 2} cy={BULB_CY} r={BULB_R} />
        </clipPath>
      </defs>

      {/* ---- tier ticks (behind the tube so lines tuck under glass) ---- */}
      {tiers.map((tier, i) => {
        const y = TUBE_BOTTOM - (i + 1) * step;
        const unlocked = tier.amount <= raised;
        return (
          <g key={tier.amount}>
            <line
              x1={TUBE_X + TUBE_W}
              y1={y}
              x2={TUBE_X + TUBE_W + 14}
              y2={y}
              stroke={unlocked ? "#F2C14E" : "#E8E6E1"}
              strokeOpacity={unlocked ? 0.9 : 0.28}
              strokeWidth="2"
            />
            <text
              x={TUBE_X + TUBE_W + 20}
              y={y + 4}
              fill={unlocked ? "#F2C14E" : "#E8E6E1"}
              fillOpacity={unlocked ? 0.95 : 0.45}
              style={{
                font: "12px var(--font-mono), monospace",
                letterSpacing: "0.05em",
              }}
            >
              {unlocked ? "✓ " : ""}
              {formatUSD(tier.amount)}
            </text>
          </g>
        );
      })}

      {/* ---- glow bed under the bulb ---- */}
      <circle
        cx={TUBE_X + TUBE_W / 2}
        cy={BULB_CY}
        r={BULB_R + 26}
        fill="url(#bulb-glow)"
        className="goo-glow"
      />

      {/* ---- the goo ---- */}
      <g clipPath="url(#vessel)">
        <rect
          x={TUBE_X - 2}
          y={fillY}
          width={TUBE_W + 4}
          height={BULB_CY + BULB_R - fillY + 4}
          fill="url(#goo)"
        />
        {/* meniscus highlight */}
        <ellipse
          cx={TUBE_X + TUBE_W / 2}
          cy={fillY}
          rx={TUBE_W / 2}
          ry={5}
          fill="#5FAD56"
          filter="url(#soft-blur)"
          className="goo-glow"
        />
        {/* bubbles rising through the goo (CSS-driven) */}
        {[
          { cx: TUBE_X + 14, r: 4, dur: "7s", delay: "0s" },
          { cx: TUBE_X + 30, r: 2.5, dur: "9s", delay: "2.4s" },
          { cx: TUBE_X + 22, r: 3, dur: "8s", delay: "4.8s" },
          { cx: TUBE_X + 37, r: 2, dur: "10s", delay: "1.2s" },
        ].map((b, i) => (
          <circle
            key={i}
            cx={b.cx}
            cy={BULB_CY}
            r={b.r}
            fill="#E8E6E1"
            fillOpacity="0.35"
            className="goo-bubble"
            style={{
              animationDuration: b.dur,
              animationDelay: b.delay,
              // bubbles die at the surface, wherever it currently sits
              ["--bubble-rise" as string]: `${fillY - BULB_CY}px`,
            }}
          />
        ))}
      </g>

      {/* ---- the glass ---- */}
      <rect
        x={TUBE_X}
        y={TUBE_TOP - 26}
        width={TUBE_W}
        height={BULB_CY - TUBE_TOP + 26}
        rx={TUBE_W / 2}
        fill="none"
        stroke="#E8E6E1"
        strokeOpacity="0.35"
        strokeWidth="2.5"
      />
      <circle
        cx={TUBE_X + TUBE_W / 2}
        cy={BULB_CY}
        r={BULB_R}
        fill="none"
        stroke="#E8E6E1"
        strokeOpacity="0.35"
        strokeWidth="2.5"
      />
      {/* glass shine */}
      <line
        x1={TUBE_X + 10}
        y1={TUBE_TOP - 8}
        x2={TUBE_X + 10}
        y2={TUBE_BOTTOM - 30}
        stroke="#E8E6E1"
        strokeOpacity="0.12"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* ---- current-total marker line ---- */}
      <line
        x1={TUBE_X - 16}
        y1={fillY}
        x2={TUBE_X - 4}
        y2={fillY}
        stroke="#F2C14E"
        strokeWidth="2.5"
      />
      <text
        x={TUBE_X - 20}
        y={fillY + 4}
        textAnchor="end"
        fill="#F2C14E"
        style={{
          font: "13px var(--font-mono), monospace",
          letterSpacing: "0.04em",
        }}
      >
        {formatUSD(raised)}
      </text>
    </svg>
  );
}
