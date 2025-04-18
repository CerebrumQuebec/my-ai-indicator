import React from "react";

const SlideIllustration6: React.FC = () => {
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

      {/* Globe base */}
      <circle
        cx="60"
        cy="60"
        r="34"
        fill="url(#paint1_linear)"
        fillOpacity="0.2"
        stroke="#A5B4FC"
        strokeWidth="0.5"
      />

      {/* Grid lines (longitude) */}
      <ellipse
        cx="60"
        cy="60"
        rx="34"
        ry="10"
        stroke="#A5B4FC"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      />
      <ellipse
        cx="60"
        cy="60"
        rx="27"
        ry="8"
        stroke="#A5B4FC"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      />
      <ellipse
        cx="60"
        cy="60"
        rx="17"
        ry="5"
        stroke="#A5B4FC"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      />

      {/* Grid lines (latitude) */}
      <path
        d="M60 26C76 26 83 41 83 60C83 79 76 94 60 94C44 94 37 79 37 60C37 41 44 26 60 26Z"
        stroke="#A5B4FC"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      />
      <path
        d="M60 34C72 34 77 45 77 60C77 75 72 86 60 86C48 86 43 75 43 60C43 45 48 34 60 34Z"
        stroke="#A5B4FC"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      />
      <path
        d="M60 42C68 42 71 49 71 60C71 71 68 78 60 78C52 78 49 71 49 60C49 49 52 42 60 42Z"
        stroke="#A5B4FC"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      />

      {/* Main vertical and horizontal lines */}
      <line
        x1="26"
        y1="60"
        x2="94"
        y2="60"
        stroke="#A5B4FC"
        strokeWidth="0.5"
      />
      <path
        d="M60 26C60 26 60 42 60 60C60 78 60 94 60 94"
        stroke="#A5B4FC"
        strokeWidth="0.5"
      />

      {/* Universal Badge AI Emblem */}
      <circle
        cx="60"
        cy="60"
        r="10"
        fill="url(#paint2_linear)"
        fillOpacity="0.6"
        stroke="#67E8F9"
      />
      <text
        x="60"
        y="62"
        textAnchor="middle"
        fontSize="6"
        fill="white"
        fontFamily="monospace"
      >
        Badge
      </text>

      {/* Location ping animations */}
      {/* North America */}
      <circle cx="40" cy="45" r="2" fill="#67E8F9" fillOpacity="0.8">
        <animate
          attributeName="r"
          values="2;3;2"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="fill-opacity"
          values="0.8;0.2;0.8"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <text
        x="40"
        y="40"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        NA
      </text>

      {/* Europe */}
      <circle cx="65" cy="38" r="2" fill="#67E8F9" fillOpacity="0.8">
        <animate
          attributeName="r"
          values="2;3;2"
          dur="2s"
          repeatCount="indefinite"
          begin="0.3s"
        />
        <animate
          attributeName="fill-opacity"
          values="0.8;0.2;0.8"
          dur="2s"
          repeatCount="indefinite"
          begin="0.3s"
        />
      </circle>
      <text
        x="65"
        y="33"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        EU
      </text>

      {/* Asia */}
      <circle cx="80" cy="48" r="2" fill="#67E8F9" fillOpacity="0.8">
        <animate
          attributeName="r"
          values="2;3;2"
          dur="2s"
          repeatCount="indefinite"
          begin="0.6s"
        />
        <animate
          attributeName="fill-opacity"
          values="0.8;0.2;0.8"
          dur="2s"
          repeatCount="indefinite"
          begin="0.6s"
        />
      </circle>
      <text
        x="80"
        y="43"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        AS
      </text>

      {/* South America */}
      <circle cx="45" cy="70" r="2" fill="#67E8F9" fillOpacity="0.8">
        <animate
          attributeName="r"
          values="2;3;2"
          dur="2s"
          repeatCount="indefinite"
          begin="0.9s"
        />
        <animate
          attributeName="fill-opacity"
          values="0.8;0.2;0.8"
          dur="2s"
          repeatCount="indefinite"
          begin="0.9s"
        />
      </circle>
      <text
        x="45"
        y="75"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        SA
      </text>

      {/* Africa */}
      <circle cx="65" cy="65" r="2" fill="#67E8F9" fillOpacity="0.8">
        <animate
          attributeName="r"
          values="2;3;2"
          dur="2s"
          repeatCount="indefinite"
          begin="1.2s"
        />
        <animate
          attributeName="fill-opacity"
          values="0.8;0.2;0.8"
          dur="2s"
          repeatCount="indefinite"
          begin="1.2s"
        />
      </circle>
      <text
        x="65"
        y="70"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        AF
      </text>

      {/* Australia */}
      <circle cx="85" cy="75" r="2" fill="#67E8F9" fillOpacity="0.8">
        <animate
          attributeName="r"
          values="2;3;2"
          dur="2s"
          repeatCount="indefinite"
          begin="1.5s"
        />
        <animate
          attributeName="fill-opacity"
          values="0.8;0.2;0.8"
          dur="2s"
          repeatCount="indefinite"
          begin="1.5s"
        />
      </circle>
      <text
        x="85"
        y="80"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        AU
      </text>

      {/* Dynamic connection lines */}
      <line x1="43" y1="46" x2="58" y2="58" stroke="#67E8F9" strokeWidth="0.5">
        <animate
          attributeName="stroke-opacity"
          values="0.2;1;0.2"
          dur="3s"
          repeatCount="indefinite"
        />
      </line>
      <line x1="64" y1="40" x2="58" y2="58" stroke="#67E8F9" strokeWidth="0.5">
        <animate
          attributeName="stroke-opacity"
          values="0.2;1;0.2"
          dur="3s"
          repeatCount="indefinite"
          begin="0.3s"
        />
      </line>
      <line x1="78" y1="50" x2="62" y2="58" stroke="#67E8F9" strokeWidth="0.5">
        <animate
          attributeName="stroke-opacity"
          values="0.2;1;0.2"
          dur="3s"
          repeatCount="indefinite"
          begin="0.6s"
        />
      </line>
      <line x1="47" y1="68" x2="58" y2="62" stroke="#67E8F9" strokeWidth="0.5">
        <animate
          attributeName="stroke-opacity"
          values="0.2;1;0.2"
          dur="3s"
          repeatCount="indefinite"
          begin="0.9s"
        />
      </line>
      <line x1="64" y1="64" x2="62" y2="62" stroke="#67E8F9" strokeWidth="0.5">
        <animate
          attributeName="stroke-opacity"
          values="0.2;1;0.2"
          dur="3s"
          repeatCount="indefinite"
          begin="1.2s"
        />
      </line>
      <line x1="83" y1="73" x2="62" y2="62" stroke="#67E8F9" strokeWidth="0.5">
        <animate
          attributeName="stroke-opacity"
          values="0.2;1;0.2"
          dur="3s"
          repeatCount="indefinite"
          begin="1.5s"
        />
      </line>

      {/* Platform labels */}
      <g>
        <rect
          x="30"
          y="92"
          width="60"
          height="14"
          rx="2"
          fill="#334155"
          fillOpacity="0.5"
        />
        <text
          x="60"
          y="98"
          textAnchor="middle"
          fontSize="5"
          fill="#67E8F9"
          fontFamily="monospace"
        >
          Universal Adoption
        </text>
        <text
          x="60"
          y="104"
          textAnchor="middle"
          fontSize="5"
          fill="white"
          fontFamily="monospace"
        >
          All Platforms • Global Standard
        </text>
      </g>

      <defs>
        <radialGradient
          id="paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(60 60) rotate(90) scale(60)"
        >
          <stop stopColor="#818CF8" />
          <stop offset="1" stopColor="#818CF8" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="paint1_linear"
          x1="26"
          y1="26"
          x2="94"
          y2="94"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4F46E5" stopOpacity="0.2" />
          <stop offset="1" stopColor="#8B5CF6" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient
          id="paint2_linear"
          x1="50"
          y1="50"
          x2="70"
          y2="70"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#67E8F9" />
          <stop offset="1" stopColor="#A5B4FC" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SlideIllustration6;
