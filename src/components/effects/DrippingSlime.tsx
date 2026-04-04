/**
 * DrippingSlime - Animated dripping slime drops
 *
 * Renders a row of small rounded drip elements that hang from the top of
 * the container and animate downward using .animate-drip-continuous.
 * Each drip is staggered with a unique animation-delay and placed at a
 * deterministic pseudo-random horizontal position (no client JS needed).
 *
 * Server component — CSS-only animations, no "use client" required.
 */
interface DrippingSlimeProps {
  count?: number;
  color?: string;
  className?: string;
}

// Deterministic pseudo-random positions and delays per drip index so the
// layout is stable across server and client renders without useEffect.
const DRIP_CONFIGS = [
  { left: "5%", delay: "0s", width: 6, height: 10 },
  { left: "14%", delay: "0.7s", width: 5, height: 12 },
  { left: "23%", delay: "1.4s", width: 7, height: 9 },
  { left: "31%", delay: "0.3s", width: 4, height: 11 },
  { left: "42%", delay: "2.1s", width: 6, height: 10 },
  { left: "53%", delay: "1.1s", width: 5, height: 13 },
  { left: "61%", delay: "0.5s", width: 7, height: 10 },
  { left: "72%", delay: "1.8s", width: 4, height: 12 },
  { left: "79%", delay: "2.5s", width: 6, height: 9 },
  { left: "88%", delay: "0.9s", width: 5, height: 11 },
  { left: "95%", delay: "1.6s", width: 7, height: 10 },
  { left: "37%", delay: "2.3s", width: 5, height: 12 },
  { left: "67%", delay: "0.2s", width: 6, height: 11 },
  { left: "10%", delay: "1.9s", width: 4, height: 10 },
  { left: "48%", delay: "2.7s", width: 5, height: 13 },
  { left: "84%", delay: "0.6s", width: 7, height: 9 },
];

export default function DrippingSlime({
  count = 8,
  color = "var(--color-ooze-green)",
  className = "",
}: DrippingSlimeProps) {
  const drips = DRIP_CONFIGS.slice(0, count);

  return (
    <div
      className={`pointer-events-none relative w-full overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ height: 80 }}
    >
      {drips.map((cfg, i) => (
        <span
          key={i}
          className="animate-drip-continuous absolute top-0"
          style={{
            left: cfg.left,
            animationDelay: cfg.delay,
            width: cfg.width,
            height: cfg.height,
            borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70%",
            backgroundColor: color,
            boxShadow: `0 0 6px ${color}`,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}
