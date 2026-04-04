interface SlimeDividerProps {
  color?: string;
  className?: string;
}

export default function SlimeDivider({
  color = "#5FAD56",
  className = "",
}: SlimeDividerProps) {
  return (
    <div className={`w-full overflow-visible py-2 ${className}`}>
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className="w-full h-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Glow filter */}
        <defs>
          <filter id="slime-glow" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Wavy slime line */}
        <path
          d="M0,20 C100,10 150,30 300,20 C450,10 500,30 600,20 C700,10 800,30 900,20 C1000,10 1100,30 1200,20"
          fill="none"
          stroke={color}
          strokeWidth="3"
          filter="url(#slime-glow)"
          strokeLinecap="round"
        />

        {/* Drip drops hanging down */}
        <ellipse cx="150" cy="25" rx="3" ry="5" fill={color} opacity="0.9">
          <animate
            attributeName="cy"
            values="25;50;25"
            dur="3s"
            repeatCount="indefinite"
            begin="0s"
          />
          <animate
            attributeName="ry"
            values="5;8;5"
            dur="3s"
            repeatCount="indefinite"
            begin="0s"
          />
          <animate
            attributeName="opacity"
            values="0.9;0.3;0.9"
            dur="3s"
            repeatCount="indefinite"
            begin="0s"
          />
        </ellipse>

        <ellipse cx="420" cy="28" rx="2.5" ry="4" fill="#4D9078" opacity="0.8">
          <animate
            attributeName="cy"
            values="28;55;28"
            dur="4s"
            repeatCount="indefinite"
            begin="0.5s"
          />
          <animate
            attributeName="ry"
            values="4;7;4"
            dur="4s"
            repeatCount="indefinite"
            begin="0.5s"
          />
          <animate
            attributeName="opacity"
            values="0.8;0.2;0.8"
            dur="4s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </ellipse>

        <ellipse cx="680" cy="22" rx="3.5" ry="6" fill={color} opacity="0.85">
          <animate
            attributeName="cy"
            values="22;52;22"
            dur="3.5s"
            repeatCount="indefinite"
            begin="1s"
          />
          <animate
            attributeName="ry"
            values="6;9;6"
            dur="3.5s"
            repeatCount="indefinite"
            begin="1s"
          />
          <animate
            attributeName="opacity"
            values="0.85;0.25;0.85"
            dur="3.5s"
            repeatCount="indefinite"
            begin="1s"
          />
        </ellipse>

        <ellipse cx="950" cy="26" rx="2" ry="4" fill="#4D9078" opacity="0.75">
          <animate
            attributeName="cy"
            values="26;48;26"
            dur="4.5s"
            repeatCount="indefinite"
            begin="1.5s"
          />
          <animate
            attributeName="ry"
            values="4;7;4"
            dur="4.5s"
            repeatCount="indefinite"
            begin="1.5s"
          />
          <animate
            attributeName="opacity"
            values="0.75;0.2;0.75"
            dur="4.5s"
            repeatCount="indefinite"
            begin="1.5s"
          />
        </ellipse>

        <ellipse cx="1080" cy="24" rx="2.5" ry="5" fill={color} opacity="0.8">
          <animate
            attributeName="cy"
            values="24;50;24"
            dur="3.8s"
            repeatCount="indefinite"
            begin="0.8s"
          />
          <animate
            attributeName="ry"
            values="5;8;5"
            dur="3.8s"
            repeatCount="indefinite"
            begin="0.8s"
          />
          <animate
            attributeName="opacity"
            values="0.8;0.25;0.8"
            dur="3.8s"
            repeatCount="indefinite"
            begin="0.8s"
          />
        </ellipse>
      </svg>
    </div>
  );
}
