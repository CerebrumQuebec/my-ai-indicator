import React from "react";

const SlideIllustration2: React.FC = () => {
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
        fillOpacity="0.3"
      />

      {/* Hybrid content container - represents mixed media content being analyzed */}
      <rect
        x="35"
        y="25"
        width="50"
        height="70"
        rx="4"
        stroke="#A5B4FC"
        strokeWidth="0.75"
        strokeDasharray="2 2"
        fill="#334155"
        fillOpacity="0.2"
      />

      {/* Scanning beam animation representing smart classification */}
      <rect
        x="35"
        y="45"
        width="50"
        height="1"
        fill="#67E8F9"
        fillOpacity="0.8"
      >
        <animate
          attributeName="y"
          values="25;95;25"
          dur="4s"
          repeatCount="indefinite"
        />
      </rect>

      {/* Category badges with recognition indicators */}
      <g>
        {/* Sound (S) Badge */}
        <circle
          cx="40"
          cy="40"
          r="18"
          fill="url(#paint1_linear)"
          fillOpacity="0.7"
          stroke="#22D3EE"
          strokeWidth="1.5"
        />
        <text
          x="40"
          y="46"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="white"
          fontFamily="monospace"
        >
          S
        </text>

        {/* Recognition highlight for sound */}
        <circle
          cx="40"
          cy="40"
          r="20"
          stroke="#22D3EE"
          strokeWidth="0.5"
          strokeOpacity="0.8"
        >
          <animate
            attributeName="r"
            values="18;22;18"
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.8;0.1;0.8"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Sound waves animation */}
        <path
          d="M26 40H30"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <animate
            attributeName="opacity"
            values="0.2;1;0.2"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M22 40H24"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <animate
            attributeName="opacity"
            values="0.2;1;0.2"
            dur="2s"
            repeatCount="indefinite"
            begin="0.3s"
          />
        </path>
        <path
          d="M50 40H54"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <animate
            attributeName="opacity"
            values="0.2;1;0.2"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M56 40H58"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <animate
            attributeName="opacity"
            values="0.2;1;0.2"
            dur="2s"
            repeatCount="indefinite"
            begin="0.3s"
          />
        </path>
      </g>

      <g>
        {/* Visual (V) Badge */}
        <circle
          cx="80"
          cy="40"
          r="18"
          fill="url(#paint2_linear)"
          fillOpacity="0.7"
          stroke="#818CF8"
          strokeWidth="1.5"
        />
        <text
          x="80"
          y="46"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="white"
          fontFamily="monospace"
        >
          V
        </text>

        {/* Recognition highlight for visual */}
        <circle
          cx="80"
          cy="40"
          r="20"
          stroke="#818CF8"
          strokeWidth="0.5"
          strokeOpacity="0.8"
        >
          <animate
            attributeName="r"
            values="18;22;18"
            dur="2s"
            repeatCount="indefinite"
            begin="0.7s"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.8;0.1;0.8"
            dur="2s"
            repeatCount="indefinite"
            begin="0.7s"
          />
        </circle>

        {/* Aperture lines */}
        <path
          d="M80 28C80 28 76 34 80 34C84 34 80 28 80 28Z"
          stroke="white"
          strokeWidth="1"
        />
        <circle
          cx="80"
          cy="40"
          r="10"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="1 1.5"
        />
      </g>

      <g>
        {/* Text (T) Badge */}
        <circle
          cx="60"
          cy="80"
          r="18"
          fill="url(#paint3_linear)"
          fillOpacity="0.7"
          stroke="#C084FC"
          strokeWidth="1.5"
        />
        <text
          x="60"
          y="86"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="white"
          fontFamily="monospace"
        >
          T
        </text>

        {/* Recognition highlight for text */}
        <circle
          cx="60"
          cy="80"
          r="20"
          stroke="#C084FC"
          strokeWidth="0.5"
          strokeOpacity="0.8"
        >
          <animate
            attributeName="r"
            values="18;22;18"
            dur="2s"
            repeatCount="indefinite"
            begin="1.4s"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.8;0.1;0.8"
            dur="2s"
            repeatCount="indefinite"
            begin="1.4s"
          />
        </circle>

        {/* Text lines */}
        <path
          d="M52 92H68"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="1 1.5"
        />
        <path
          d="M55 96H65"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="1 1.5"
        />
      </g>

      {/* Smart detection labels */}
      <text
        x="40"
        y="30"
        textAnchor="middle"
        fontSize="4"
        fill="#22D3EE"
        fontFamily="sans-serif"
      >
        DETECTED
      </text>

      <text
        x="80"
        y="30"
        textAnchor="middle"
        fontSize="4"
        fill="#818CF8"
        fontFamily="sans-serif"
      >
        DETECTED
      </text>

      <text
        x="60"
        y="70"
        textAnchor="middle"
        fontSize="4"
        fill="#C084FC"
        fontFamily="sans-serif"
      >
        DETECTED
      </text>

      {/* Central "hybrid content" markers */}
      <circle cx="60" cy="60" r="4" fill="#67E8F9" fillOpacity="0.5">
        <animate
          attributeName="opacity"
          values="0.5;0.9;0.5"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="60" cy="60" r="1" fill="white" />

      {/* Connecting smart classification lines */}
      <path
        d="M50 50L57 70"
        stroke="#A5B4FC"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <path
        d="M70 50L63 70"
        stroke="#A5B4FC"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <path
        d="M50 40L70 40"
        stroke="#A5B4FC"
        strokeWidth="1"
        strokeDasharray="2 2"
      />

      {/* Algorithm highlights - data points being analyzed */}
      <circle cx="60" cy="45" r="0.7" fill="white">
        <animate
          attributeName="fill-opacity"
          values="1;0.2;1"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
      <circle cx="55" cy="50" r="0.7" fill="white">
        <animate
          attributeName="fill-opacity"
          values="1;0.2;1"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </circle>
      <circle cx="65" cy="50" r="0.7" fill="white">
        <animate
          attributeName="fill-opacity"
          values="1;0.2;1"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.4s"
        />
      </circle>
      <circle cx="53" cy="60" r="0.7" fill="white">
        <animate
          attributeName="fill-opacity"
          values="1;0.2;1"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.6s"
        />
      </circle>
      <circle cx="67" cy="60" r="0.7" fill="white">
        <animate
          attributeName="fill-opacity"
          values="1;0.2;1"
          dur="1.5s"
          repeatCount="indefinite"
          begin="0.8s"
        />
      </circle>

      <defs>
        <radialGradient
          id="paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(60 60) rotate(90) scale(60)"
        >
          <stop stopColor="#A5B4FC" />
          <stop offset="1" stopColor="#A5B4FC" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="paint1_linear"
          x1="22"
          y1="22"
          x2="58"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#22D3EE" />
          <stop offset="1" stopColor="#22D3EE" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="62"
          y1="22"
          x2="98"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#818CF8" />
          <stop offset="1" stopColor="#818CF8" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="paint3_linear"
          x1="42"
          y1="62"
          x2="78"
          y2="98"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C084FC" />
          <stop offset="1" stopColor="#C084FC" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SlideIllustration2;
