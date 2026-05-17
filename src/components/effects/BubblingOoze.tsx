/**
 * BubblingOoze — slow formation in the deep.
 *
 * Large, very slowly morphing masses (.animate-blob-morph) and a few small
 * points rising and dissipating (.animate-bubble-rise). Tuned for
 * abiogenesis, not swamp gas: slower, deeper, fewer — cold teal weighted
 * over green, no warm "toxic" notes. See docs/design-philosophy.md §3.
 *
 * Server component — all animation is CSS-only.
 */
interface BubblingOozeProps {
  className?: string;
}

// Large, very slowly morphing masses — deep, dim, unhurried.
const BLOBS = [
  {
    width: 240,
    height: 210,
    top: "55%",
    left: "8%",
    opacity: 0.1,
    color: "var(--color-swamp-teal)",
    animationDuration: "26s",
    animationDelay: "0s",
  },
  {
    width: 300,
    height: 270,
    top: "38%",
    left: "58%",
    opacity: 0.08,
    color: "var(--color-swamp-teal)",
    animationDuration: "32s",
    animationDelay: "5s",
  },
  {
    width: 190,
    height: 175,
    top: "72%",
    left: "36%",
    opacity: 0.11,
    color: "var(--color-ooze-green)",
    animationDuration: "38s",
    animationDelay: "9s",
  },
];

// A few points rising and dissipating — sparse, slow, cold-weighted.
const BUBBLES = [
  { size: 6, left: "18%", bottom: "6%", delay: "0s", duration: "11s", opacity: 0.16, color: "var(--color-swamp-teal)" },
  { size: 8, left: "44%", bottom: "3%", delay: "2.5s", duration: "13s", opacity: 0.2, color: "var(--color-ooze-green)" },
  { size: 5, left: "60%", bottom: "9%", delay: "5s", duration: "10s", opacity: 0.14, color: "var(--color-swamp-teal)" },
  { size: 7, left: "78%", bottom: "5%", delay: "1.5s", duration: "12s", opacity: 0.18, color: "var(--color-swamp-teal)" },
  { size: 6, left: "33%", bottom: "11%", delay: "7s", duration: "12.5s", opacity: 0.15, color: "var(--color-ooze-green)" },
];

export default function BubblingOoze({ className = "" }: BubblingOozeProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Large morphing blobs */}
      {BLOBS.map((blob, i) => (
        <div
          key={`blob-${i}`}
          className="animate-blob-morph absolute"
          style={{
            width: blob.width,
            height: blob.height,
            top: blob.top,
            left: blob.left,
            opacity: blob.opacity,
            backgroundColor: blob.color,
            animationDuration: blob.animationDuration,
            animationDelay: blob.animationDelay,
            filter: "blur(40px)",
          }}
        />
      ))}

      {/* Small rising bubbles */}
      {BUBBLES.map((bubble, i) => (
        <div
          key={`bubble-${i}`}
          className="animate-bubble-rise absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
            bottom: bubble.bottom,
            opacity: bubble.opacity,
            backgroundColor: bubble.color,
            boxShadow: `0 0 4px ${bubble.color}`,
            animationDuration: bubble.duration,
            animationDelay: bubble.delay,
          }}
        />
      ))}
    </div>
  );
}
