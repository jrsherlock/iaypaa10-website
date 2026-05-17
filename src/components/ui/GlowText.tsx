interface GlowTextProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  glow?: "strong" | "subtle";
}

export default function GlowText({
  children,
  as: Tag = "h2",
  className = "",
  glow = "strong",
}: GlowTextProps) {
  const glowClass = glow === "strong" ? "glow-text" : "glow-text-subtle";

  const sizeDefaults: Record<string, string> = {
    h1: "text-5xl md:text-7xl",
    h2: "text-3xl md:text-5xl",
    h3: "text-2xl md:text-3xl",
  };

  return (
    <Tag
      className={`font-anton text-ooze-green ${glowClass} ${sizeDefaults[Tag]} ${className}`}
    >
      {children}
    </Tag>
  );
}
