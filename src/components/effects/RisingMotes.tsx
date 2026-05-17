/**
 * RisingMotes — faint motes that rise out of the dark and dissipate.
 *
 * The reversed drip. Small soft points originate low in the band, drift
 * upward, and fade — sediment lifting, first life rising. Calm and slow,
 * never a falling/decaying motion. See docs/design-philosophy.md §3.
 *
 * Each mote uses a deterministic pseudo-random horizontal position and
 * delay so the layout is stable across server and client renders — no
 * useEffect, so this stays a server component.
 */
interface RisingMotesProps {
  count?: number;
  color?: string;
  className?: string;
}

// Deterministic positions/delays/sizes per mote index.
const MOTE_CONFIGS = [
  { left: "5%", delay: "0s", size: 4 },
  { left: "14%", delay: "1.3s", size: 3 },
  { left: "23%", delay: "2.6s", size: 5 },
  { left: "31%", delay: "0.6s", size: 3 },
  { left: "42%", delay: "3.9s", size: 4 },
  { left: "53%", delay: "2.0s", size: 3 },
  { left: "61%", delay: "0.9s", size: 5 },
  { left: "72%", delay: "3.3s", size: 3 },
  { left: "79%", delay: "4.6s", size: 4 },
  { left: "88%", delay: "1.6s", size: 3 },
  { left: "95%", delay: "2.9s", size: 5 },
  { left: "37%", delay: "4.2s", size: 3 },
  { left: "67%", delay: "0.3s", size: 4 },
  { left: "10%", delay: "3.6s", size: 3 },
  { left: "48%", delay: "5.0s", size: 4 },
  { left: "84%", delay: "1.0s", size: 3 },
];

export default function RisingMotes({
  count = 8,
  color = "var(--color-ooze-green)",
  className = "",
}: RisingMotesProps) {
  const motes = MOTE_CONFIGS.slice(0, count);

  return (
    <div
      className={`pointer-events-none relative w-full overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ height: 80 }}
    >
      {motes.map((cfg, i) => (
        <span
          key={i}
          className="animate-mote-rise absolute bottom-0 rounded-full"
          style={{
            left: cfg.left,
            animationDelay: cfg.delay,
            width: cfg.size,
            height: cfg.size,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}
