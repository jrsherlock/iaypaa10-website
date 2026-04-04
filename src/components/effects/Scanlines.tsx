/**
 * Scanlines - VHS-style horizontal scanline overlay
 *
 * Creates subtle horizontal lines via repeating-linear-gradient and
 * applies the .animate-scanline animation for a slight vertical jitter.
 * Purely decorative — pointer-events are disabled.
 */
interface ScanlinesProps {
  className?: string;
  opacity?: number;
}

export default function Scanlines({
  className = "",
  opacity = 0.04,
}: ScanlinesProps) {
  return (
    <div
      className={`animate-scanline pointer-events-none fixed inset-0 z-50 ${className}`}
      aria-hidden="true"
      style={{
        opacity,
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 0, 0, 0.4) 1px, rgba(0, 0, 0, 0.4) 2px)",
        backgroundSize: "100% 2px",
      }}
    />
  );
}
