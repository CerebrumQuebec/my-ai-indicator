import React from "react";

const SlideIllustration4: React.FC = () => {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background circle */}
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="url(#paint0_radial)"
        fillOpacity="0.2"
      />

      {/* Creative software window */}
      <rect
        x="20"
        y="20"
        width="80"
        height="60"
        rx="4"
        fill="#1F2937"
        stroke="#334155"
        strokeWidth="1"
      />

      {/* Window header */}
      <rect x="20" y="20" width="80" height="8" rx="4" fill="#334155" />
      <circle cx="24" cy="24" r="2" fill="#F87171" />
      <circle cx="32" cy="24" r="2" fill="#FBBF24" />
      <circle cx="40" cy="24" r="2" fill="#34D399" />

      {/* Content area with grid */}
      <rect x="24" y="32" width="72" height="44" rx="2" fill="#111827" />
      <line
        x1="24"
        y1="40"
        x2="96"
        y2="40"
        stroke="#374151"
        strokeWidth="0.5"
      />
      <line
        x1="24"
        y1="48"
        x2="96"
        y2="48"
        stroke="#374151"
        strokeWidth="0.5"
      />
      <line
        x1="24"
        y1="56"
        x2="96"
        y2="56"
        stroke="#374151"
        strokeWidth="0.5"
      />
      <line
        x1="24"
        y1="64"
        x2="96"
        y2="64"
        stroke="#374151"
        strokeWidth="0.5"
      />
      <line
        x1="48"
        y1="32"
        x2="48"
        y2="76"
        stroke="#374151"
        strokeWidth="0.5"
      />
      <line
        x1="72"
        y1="32"
        x2="72"
        y2="76"
        stroke="#374151"
        strokeWidth="0.5"
      />

      {/* AI Brush Tool */}
      <rect
        x="28"
        y="35"
        width="16"
        height="3"
        rx="1.5"
        fill="#4F46E5"
        fillOpacity="0.6"
      />
      <path
        d="M29 41C29 39.9 29.9 39 31 39H41C42.1 39 43 39.9 43 41V45C43 46.1 42.1 47 41 47H31C29.9 47 29 46.1 29 45V41Z"
        fill="#3B82F6"
        fillOpacity="0.3"
        stroke="#3B82F6"
        strokeWidth="0.5"
      />
      <path
        d="M32 43C32 42.4477 32.4477 42 33 42H39C39.5523 42 40 42.4477 40 43C40 43.5523 39.5523 44 39 44H33C32.4477 44 32 43.5523 32 43Z"
        fill="#93C5FD"
      />
      <text
        x="36"
        y="53"
        textAnchor="middle"
        fontSize="5"
        fill="#93C5FD"
        fontFamily="monospace"
      >
        AI Brush
      </text>

      {/* AI Detection in Progress */}
      <path
        d="M52 38L60 52L68 38"
        stroke="#A5B4FC"
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.2;1;0.2"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
      <circle
        cx="60"
        cy="43"
        r="5"
        fill="#4F46E5"
        fillOpacity="0.2"
        stroke="#A5B4FC"
        strokeWidth="0.75"
      >
        <animate
          attributeName="r"
          values="5;5.5;5"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <text
        x="60"
        y="45"
        textAnchor="middle"
        fontSize="4"
        fill="#A5B4FC"
        fontFamily="monospace"
      >
        AI
      </text>
      <text
        x="60"
        y="53"
        textAnchor="middle"
        fontSize="5"
        fill="#A5B4FC"
        fontFamily="monospace"
      >
        Detecting
      </text>

      {/* Real-time badge assigned */}
      <g>
        <rect
          x="76"
          y="38"
          width="16"
          height="12"
          rx="2"
          fill="#4F46E5"
          fillOpacity="0.3"
          stroke="#A5B4FC"
          strokeWidth="0.5"
        />
        <text
          x="84"
          y="45"
          textAnchor="middle"
          fontSize="6"
          fill="white"
          fontFamily="monospace"
        >
          V-AI-2
        </text>
        <text
          x="84"
          y="53"
          textAnchor="middle"
          fontSize="5"
          fill="#A5B4FC"
          fontFamily="monospace"
        >
          Badge
        </text>

        {/* Animated badge update indicators */}
        <circle cx="76" cy="38" r="1" fill="#A5B4FC">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="0s"
          />
        </circle>
        <circle cx="92" cy="38" r="1" fill="#A5B4FC">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="0.2s"
          />
        </circle>
        <circle cx="92" cy="50" r="1" fill="#A5B4FC">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="0.4s"
          />
        </circle>
        <circle cx="76" cy="50" r="1" fill="#A5B4FC">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="0.6s"
          />
        </circle>
      </g>

      {/* Scanner line animation */}
      <line
        x1="24"
        y1="60"
        x2="96"
        y2="60"
        stroke="#67E8F9"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <animate
          attributeName="y1"
          values="32;76;32"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y2"
          values="32;76;32"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.8;0.2;0.8"
          dur="4s"
          repeatCount="indefinite"
        />
      </line>

      {/* Metadata panel */}
      <rect
        x="30"
        y="84"
        width="60"
        height="16"
        rx="2"
        fill="url(#paint1_linear)"
        fillOpacity="0.2"
        stroke="#A5B4FC"
        strokeWidth="0.5"
      />
      <text
        x="38"
        y="92"
        textAnchor="middle"
        fontSize="5"
        fill="#67E8F9"
        fontFamily="monospace"
      >
        Badge AI
      </text>
      <text
        x="60"
        y="96"
        textAnchor="middle"
        fontSize="5"
        fill="#A5B4FC"
        fontFamily="monospace"
      >
        Real-time Detection
      </text>

      <defs>
        <radialGradient
          id="paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(60 60) rotate(90) scale(60)"
        >
          <stop stopColor="#A78BFA" />
          <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="paint1_linear"
          x1="30"
          y1="84"
          x2="90"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#67E8F9" stopOpacity="0.2" />
          <stop offset="1" stopColor="#A5B4FC" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SlideIllustration4;
