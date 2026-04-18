"use client";

import Link from "next/link";

interface OozeButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function OozeButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
}: OozeButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center rounded-lg px-6 py-3 font-bold transition-all duration-300 cursor-pointer overflow-visible group";

  const variantStyles =
    variant === "primary"
      ? "bg-gold text-void-black hover:bg-ember hover:shadow-[0_0_20px_rgba(242,193,78,0.4),0_0_40px_rgba(247,129,84,0.2)]"
      : "border-2 border-ooze-green text-ooze-green bg-transparent hover:border-gold hover:text-gold hover:bg-gold/10 hover:shadow-[0_0_15px_rgba(242,193,78,0.3)]";

  const disabledStyles = disabled
    ? "opacity-60 cursor-not-allowed pointer-events-none"
    : "";

  const combinedStyles = `${baseStyles} ${variantStyles} ${disabledStyles} ${className}`;

  const dripColor = variant === "primary" ? "bg-gold" : "bg-ooze-green";

  const drips = (
    <span className="pointer-events-none absolute bottom-0 left-0 right-0 flex justify-around translate-y-full">
      <span className={`w-1.5 h-0 ${dripColor} rounded-b-full opacity-0 group-hover:animate-[button-drip_0.8s_ease-out_forwards] group-hover:delay-0`} />
      <span className={`w-1 h-0 ${dripColor} rounded-b-full opacity-0 group-hover:animate-[button-drip_0.8s_ease-out_0.1s_forwards]`} />
      <span className={`w-1.5 h-0 ${dripColor} rounded-b-full opacity-0 group-hover:animate-[button-drip_0.8s_ease-out_0.2s_forwards]`} />
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={combinedStyles}>
        {children}
        {drips}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
    >
      {children}
      {drips}
    </button>
  );
}
