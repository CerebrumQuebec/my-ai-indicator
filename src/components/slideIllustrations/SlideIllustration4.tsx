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
        x="15"
        y="15"
        width="90"
        height="68"
        rx="4"
        fill="#1F2937"
        stroke="#334155"
        strokeWidth="1"
      />

      {/* Window header */}
      <rect x="15" y="15" width="90" height="8" rx="4" fill="#334155" />
      <circle cx="19" cy="19" r="2" fill="#F87171" />
      <circle cx="27" cy="19" r="2" fill="#FBBF24" />
      <circle cx="35" cy="19" r="2" fill="#34D399" />

      {/* Application title */}
      <text
        x="60"
        y="20"
        textAnchor="middle"
        fontSize="5"
        fill="white"
        fontFamily="monospace"
      >
        CREATIVE STUDIO
      </text>

      {/* Content area with grid */}
      <rect x="19" y="27" width="82" height="52" rx="2" fill="#111827" />
      <line
        x1="19"
        y1="37"
        x2="101"
        y2="37"
        stroke="#374151"
        strokeWidth="0.5"
      />
      <line
        x1="19"
        y1="47"
        x2="101"
        y2="47"
        stroke="#374151"
        strokeWidth="0.5"
      />
      <line
        x1="19"
        y1="57"
        x2="101"
        y2="57"
        stroke="#374151"
        strokeWidth="0.5"
      />
      <line
        x1="19"
        y1="67"
        x2="101"
        y2="67"
        stroke="#374151"
        strokeWidth="0.5"
      />
      <line
        x1="43"
        y1="27"
        x2="43"
        y2="79"
        stroke="#374151"
        strokeWidth="0.5"
      />
      <line
        x1="67"
        y1="27"
        x2="67"
        y2="79"
        stroke="#374151"
        strokeWidth="0.5"
      />
      <line
        x1="91"
        y1="27"
        x2="91"
        y2="79"
        stroke="#374151"
        strokeWidth="0.5"
      />

      {/* Toolbar */}
      <rect x="19" y="27" width="82" height="5" fill="#1E293B" />

      {/* Toolbar items */}
      <circle cx="22" cy="29.5" r="1.5" fill="#67E8F9" fillOpacity="0.5" />
      <circle cx="27" cy="29.5" r="1.5" fill="#A5B4FC" fillOpacity="0.5" />
      <circle cx="32" cy="29.5" r="1.5" fill="#C084FC" fillOpacity="0.5" />
      <rect
        x="37"
        cy="28.5"
        width="3"
        height="2"
        rx="0.5"
        fill="white"
        fillOpacity="0.5"
      />
      <rect
        x="42"
        cy="28.5"
        width="3"
        height="2"
        rx="0.5"
        fill="white"
        fillOpacity="0.5"
      />

      {/* Real-time badge display panel */}
      <rect
        x="80"
        y="28"
        width="20"
        height="8"
        rx="1"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.75"
        strokeOpacity="0.7"
      />
      <text
        x="90"
        y="33"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        BADGE AI
      </text>

      {/* AI Brush Tool */}
      <rect
        x="22"
        y="35"
        width="18"
        height="3"
        rx="1.5"
        fill="#4F46E5"
        fillOpacity="0.6"
      />
      <path
        d="M24 41C24 39.9 24.9 39 26 39H36C37.1 39 38 39.9 38 41V45C38 46.1 37.1 47 36 47H26C24.9 47 24 46.1 24 45V41Z"
        fill="#3B82F6"
        fillOpacity="0.3"
        stroke="#3B82F6"
        strokeWidth="0.5"
      />
      <path
        d="M27 43C27 42.4477 27.4477 42 28 42H34C34.5523 42 35 42.4477 35 43C35 43.5523 34.5523 44 34 44H28C27.4477 44 27 43.5523 27 43Z"
        fill="#93C5FD"
      />
      <text
        x="31"
        y="51"
        textAnchor="middle"
        fontSize="4"
        fill="#93C5FD"
        fontFamily="monospace"
      >
        AI BRUSH
      </text>

      {/* AI Detection in Progress */}
      <path
        d="M50 38L55 48L60 38"
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
        cx="55"
        cy="43"
        r="4"
        fill="#4F46E5"
        fillOpacity="0.2"
        stroke="#A5B4FC"
        strokeWidth="0.75"
      >
        <animate
          attributeName="r"
          values="4;4.5;4"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <text
        x="55"
        y="44.5"
        textAnchor="middle"
        fontSize="3.5"
        fill="#A5B4FC"
        fontFamily="monospace"
      >
        AI
      </text>
      <text
        x="55"
        y="51"
        textAnchor="middle"
        fontSize="4"
        fill="#A5B4FC"
        fontFamily="monospace"
      >
        DETECTING
      </text>

      {/* Real-time badge being assigned */}
      <g>
        <rect
          x="79"
          y="41"
          width="16"
          height="10"
          rx="2"
          fill="#4F46E5"
          fillOpacity="0.3"
          stroke="#A5B4FC"
          strokeWidth="0.5"
        />
        <text
          x="87"
          y="46"
          textAnchor="middle"
          fontSize="5"
          fill="white"
          fontFamily="monospace"
        >
          V-AI-2
        </text>
        <text
          x="87"
          y="51"
          textAnchor="middle"
          fontSize="3.5"
          fill="#A5B4FC"
          fontFamily="monospace"
        >
          AUTO-ASSIGNED
        </text>

        {/* Animated badge update indicators */}
        <circle cx="79" cy="41" r="1" fill="#A5B4FC">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="0s"
          />
        </circle>
        <circle cx="95" cy="41" r="1" fill="#A5B4FC">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="0.2s"
          />
        </circle>
        <circle cx="95" cy="51" r="1" fill="#A5B4FC">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="0.4s"
          />
        </circle>
        <circle cx="79" cy="51" r="1" fill="#A5B4FC">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="0.6s"
          />
        </circle>
      </g>

      {/* AI-generated content being created */}
      <g>
        <rect x="50" y="55" width="15" height="10" rx="1" fill="#1E293B" />
        <path
          d="M53 59C53 59 54 57 55 57C56 57 57 59 57 59C57 59 58 61 59 61C60 61 62 59 62 59"
          stroke="#A5B4FC"
          strokeWidth="0.75"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="20;0"
            dur="2s"
            repeatCount="indefinite"
            begin="0s"
          />
          <animate
            attributeName="stroke-dasharray"
            values="0 1;1 0"
            dur="0.1s"
            fill="freeze"
            begin="0s"
          />
        </path>
      </g>

      {/* Scanner line animation */}
      <line
        x1="19"
        y1="60"
        x2="101"
        y2="60"
        stroke="#67E8F9"
        strokeWidth="1"
        strokeLinecap="round"
      >
        <animate
          attributeName="y1"
          values="27;79;27"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="y2"
          values="27;79;27"
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

      {/* Created content preview */}
      <rect
        x="76"
        y="55"
        width="20"
        height="15"
        rx="1"
        fill="#1E293B"
        stroke="#A5B4FC"
        strokeWidth="0.5"
        strokeOpacity="0.5"
      />
      <path
        d="M80 62C80 62 82 59 85 59C88 59 90 62 90 62C90 62 92 65 93 65"
        stroke="#A5B4FC"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <circle cx="94" cy="58" r="1.5" fill="#67E8F9" fillOpacity="0.7" />
      <text
        x="86"
        y="69"
        textAnchor="middle"
        fontSize="3"
        fill="#A5B4FC"
        fontFamily="monospace"
      >
        BADGE EMBEDDED
      </text>

      {/* Badge analysis components */}
      <g>
        <rect
          x="22"
          y="55"
          width="18"
          height="15"
          rx="1"
          fill="#1E293B"
          stroke="#A5B4FC"
          strokeWidth="0.5"
          strokeOpacity="0.5"
        />
        <text
          x="31"
          y="59"
          textAnchor="middle"
          fontSize="3"
          fill="#A5B4FC"
          fontFamily="monospace"
        >
          AI ANALYSIS
        </text>

        {/* Analysis bars */}
        <rect x="24" y="62" width="14" height="1.5" rx="0.75" fill="#334155" />
        <rect
          x="24"
          y="62"
          width="3"
          height="1.5"
          rx="0.75"
          fill="#67E8F9"
          fillOpacity="0.7"
        />
        <text
          x="25.5"
          y="61"
          textAnchor="middle"
          fontSize="2.5"
          fill="white"
          fontFamily="monospace"
        >
          COLOR
        </text>

        <rect x="24" y="65" width="14" height="1.5" rx="0.75" fill="#334155" />
        <rect
          x="24"
          y="65"
          width="7"
          height="1.5"
          rx="0.75"
          fill="#A5B4FC"
          fillOpacity="0.7"
        />
        <text
          x="25.5"
          y="64"
          textAnchor="middle"
          fontSize="2.5"
          fill="white"
          fontFamily="monospace"
        >
          FORM
        </text>

        <rect x="24" y="68" width="14" height="1.5" rx="0.75" fill="#334155" />
        <rect
          x="24"
          y="68"
          width="10"
          height="1.5"
          rx="0.75"
          fill="#C084FC"
          fillOpacity="0.7"
        />
        <text
          x="25.5"
          y="67"
          textAnchor="middle"
          fontSize="2.5"
          fill="white"
          fontFamily="monospace"
        >
          STYLE
        </text>
      </g>

      {/* Status footer panel */}
      <rect
        x="15"
        y="87"
        width="90"
        height="18"
        rx="4"
        fill="url(#paint1_linear)"
        fillOpacity="0.2"
        stroke="#A5B4FC"
        strokeWidth="0.5"
      />
      <text
        x="60"
        y="95"
        textAnchor="middle"
        fontSize="5"
        fill="#67E8F9"
        fontFamily="monospace"
      >
        REAL-TIME AI DETECTION
      </text>
      <text
        x="60"
        y="101"
        textAnchor="middle"
        fontSize="4"
        fill="#A5B4FC"
        fontFamily="monospace"
      >
        Badges auto-assigned during creation
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
          x1="15"
          y1="87"
          x2="105"
          y2="105"
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
