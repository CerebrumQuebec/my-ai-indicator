import React from "react";

const SlideIllustration3: React.FC = () => {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="url(#paint0_radial)"
        fillOpacity="0.2"
      />

      {/* Five-level scale background */}
      <rect
        x="28"
        y="40"
        width="64"
        height="40"
        rx="4"
        fill="url(#paint1_linear)"
        fillOpacity="0.2"
        stroke="#A5B4FC"
        strokeWidth="1"
      />

      {/* Level separators */}
      <line
        x1="40.5"
        y1="40"
        x2="40.5"
        y2="80"
        stroke="#A5B4FC"
        strokeOpacity="0.5"
        strokeDasharray="2 2"
      />
      <line
        x1="53.5"
        y1="40"
        x2="53.5"
        y2="80"
        stroke="#A5B4FC"
        strokeOpacity="0.5"
        strokeDasharray="2 2"
      />
      <line
        x1="66.5"
        y1="40"
        x2="66.5"
        y2="80"
        stroke="#A5B4FC"
        strokeOpacity="0.5"
        strokeDasharray="2 2"
      />
      <line
        x1="79.5"
        y1="40"
        x2="79.5"
        y2="80"
        stroke="#A5B4FC"
        strokeOpacity="0.5"
        strokeDasharray="2 2"
      />

      {/* Level numbers */}
      <text
        x="34"
        y="58"
        textAnchor="middle"
        fontSize="8"
        fill="#67E8F9"
        fontFamily="monospace"
      >
        0
      </text>
      <text
        x="47"
        y="58"
        textAnchor="middle"
        fontSize="8"
        fill="#67E8F9"
        fontFamily="monospace"
      >
        1
      </text>
      <text
        x="60"
        y="58"
        textAnchor="middle"
        fontSize="8"
        fill="#67E8F9"
        fontFamily="monospace"
      >
        2
      </text>
      <text
        x="73"
        y="58"
        textAnchor="middle"
        fontSize="8"
        fill="#67E8F9"
        fontFamily="monospace"
      >
        3
      </text>
      <text
        x="86"
        y="58"
        textAnchor="middle"
        fontSize="8"
        fill="#67E8F9"
        fontFamily="monospace"
      >
        4
      </text>

      {/* Human icon (level 0) */}
      <circle
        cx="34"
        cy="30"
        r="8"
        fill="#22D3EE"
        fillOpacity="0.3"
        stroke="#67E8F9"
        strokeWidth="1"
      />
      <path
        d="M34 26C33 26 32 27 32 28C32 29 33 30 34 30C35 30 36 29 36 28C36 27 35 26 34 26Z"
        fill="white"
      />
      <path
        d="M30 34C30 31 32 29 34 29C36 29 38 31 38 34"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
      />

      {/* AI icon (level 4) */}
      <circle
        cx="86"
        cy="30"
        r="8"
        fill="#818CF8"
        fillOpacity="0.3"
        stroke="#A5B4FC"
        strokeWidth="1"
      />
      <path
        d="M82 28H90"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M82 30H90"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M82 32H90"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="84" cy="28" r="0.5" fill="white" />
      <circle cx="84" cy="30" r="0.5" fill="white" />
      <circle cx="84" cy="32" r="0.5" fill="white" />

      {/* Level labels */}
      <text
        x="34"
        y="68"
        textAnchor="middle"
        fontSize="5"
        fill="white"
        fontFamily="monospace"
      >
        Human
      </text>
      <text
        x="34"
        y="74"
        textAnchor="middle"
        fontSize="5"
        fill="white"
        fontFamily="monospace"
      >
        Only
      </text>

      <text
        x="86"
        y="68"
        textAnchor="middle"
        fontSize="5"
        fill="white"
        fontFamily="monospace"
      >
        AI
      </text>
      <text
        x="86"
        y="74"
        textAnchor="middle"
        fontSize="5"
        fill="white"
        fontFamily="monospace"
      >
        Only
      </text>

      {/* Active level indicator (example on level 2) */}
      <rect
        x="54"
        y="40"
        width="12"
        height="40"
        fill="#A5B4FC"
        fillOpacity="0.3"
      >
        <animate
          attributeName="y"
          values="40;38;40"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>
      <circle
        cx="60"
        cy="30"
        r="8"
        fill="#A5B4FC"
        fillOpacity="0.3"
        stroke="#A5B4FC"
        strokeWidth="1"
      >
        <animate
          attributeName="r"
          values="8;8.5;8"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <text
        x="60"
        y="32"
        textAnchor="middle"
        fontSize="8"
        fill="white"
        fontFamily="monospace"
      >
        50%
      </text>
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fontSize="5"
        fill="white"
        fontFamily="monospace"
      >
        AI-Human
      </text>
      <text
        x="60"
        y="74"
        textAnchor="middle"
        fontSize="5"
        fill="white"
        fontFamily="monospace"
      >
        Balanced
      </text>

      {/* Gradient fill animation for scale */}
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.6">
          <animate
            attributeName="stop-opacity"
            values="0.6;0.3;0.6"
            dur="4s"
            repeatCount="indefinite"
          />
        </stop>
        <stop offset="100%" stopColor="#818CF8" stopOpacity="0.6">
          <animate
            attributeName="stop-opacity"
            values="0.6;0.3;0.6"
            dur="4s"
            repeatCount="indefinite"
          />
        </stop>
      </linearGradient>
      <rect x="28" y="90" width="64" height="4" rx="2" fill="url(#gradient)" />

      <defs>
        <radialGradient
          id="paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(60 60) rotate(90) scale(60)"
        >
          <stop stopColor="#C084FC" />
          <stop offset="1" stopColor="#C084FC" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="paint1_linear"
          x1="28"
          y1="40"
          x2="92"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#22D3EE" stopOpacity="0.2" />
          <stop offset="1" stopColor="#A5B4FC" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SlideIllustration3;
