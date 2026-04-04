/**
 * BubblingOoze - Animated SVG / CSS background with morphing ooze blobs
 *
 * Renders large slowly-morphing blobs (.animate-blob-morph) and small
 * rising bubbles (.animate-bubble-rise) in ooze-green / swamp-teal.
 * Intended as a background decoration inside a relatively-positioned parent.
 *
 * Server component — all animation is CSS-only.
 */
interface BubblingOozeProps {
  className?: string;
}

// Large morphing blobs
const BLOBS = [
  {
    width: 180,
    height: 160,
    top: "55%",
    left: "10%",
    opacity: 0.12,
    color: "var(--color-ooze-green)",
    animationDuration: "8s",
    animationDelay: "0s",
  },
  {
    width: 220,
    height: 200,
    top: "40%",
    left: "60%",
    opacity: 0.1,
    color: "var(--color-swamp-teal)",
    animationDuration: "10s",
    animationDelay: "2s",
  },
  {
    width: 140,
    height: 130,
    top: "70%",
    left: "38%",
    opacity: 0.14,
    color: "var(--color-ooze-green)",
    animationDuration: "12s",
    animationDelay: "4s",
  },
];

// Small rising bubbles
const BUBBLES = [
  { size: 8, left: "15%", bottom: "5%", delay: "0s", duration: "4s", opacity: 0.25, color: "var(--color-ooze-green)" },
  { size: 6, left: "28%", bottom: "10%", delay: "0.8s", duration: "3.5s", opacity: 0.2, color: "var(--color-swamp-teal)" },
  { size: 10, left: "45%", bottom: "2%", delay: "1.5s", duration: "5s", opacity: 0.3, color: "var(--color-ooze-green)" },
  { size: 5, left: "55%", bottom: "8%", delay: "2.2s", duration: "3.8s", opacity: 0.18, color: "var(--color-swamp-teal)" },
  { size: 7, left: "68%", bottom: "4%", delay: "0.4s", duration: "4.5s", opacity: 0.22, color: "var(--color-gold)" },
  { size: 9, left: "80%", bottom: "12%", delay: "1.8s", duration: "4.2s", opacity: 0.28, color: "var(--color-ooze-green)" },
  { size: 6, left: "35%", bottom: "6%", delay: "2.8s", duration: "3.6s", opacity: 0.2, color: "var(--color-swamp-teal)" },
  { size: 8, left: "90%", bottom: "3%", delay: "3.5s", duration: "4.8s", opacity: 0.24, color: "var(--color-ooze-green)" },
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
