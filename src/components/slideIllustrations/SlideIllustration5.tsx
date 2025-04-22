import React from "react";

const SlideIllustration5: React.FC = () => {
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

      {/* Metadata file icon in the center */}
      <rect
        x="50"
        y="50"
        width="20"
        height="20"
        rx="2"
        fill="url(#paint1_linear)"
        fillOpacity="0.5"
        stroke="#67E8F9"
        strokeWidth="1"
      />
      <text
        x="60"
        y="57"
        textAnchor="middle"
        fontSize="5"
        fill="white"
        fontFamily="monospace"
      >
        Badge AI
      </text>
      <text
        x="60"
        y="63"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        METADATA
      </text>
      <path
        d="M53 67L67 67"
        stroke="white"
        strokeWidth="0.5"
        strokeDasharray="1 1"
      />
      <path
        d="M53 70L63 70"
        stroke="white"
        strokeWidth="0.5"
        strokeDasharray="1 1"
      />

      {/* Platform nodes */}
      {/* Desktop/Software */}
      <circle
        cx="30"
        cy="35"
        r="10"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      />
      <rect
        x="26"
        y="31"
        width="8"
        height="7"
        rx="1"
        stroke="white"
        strokeWidth="0.5"
      />
      <rect
        x="26"
        y="31"
        width="8"
        height="2"
        rx="1"
        fill="white"
        fillOpacity="0.3"
      />
      <text
        x="30"
        y="45"
        textAnchor="middle"
        fontSize="4"
        fill="#67E8F9"
        fontFamily="monospace"
      >
        DESKTOP
      </text>

      {/* Mobile */}
      <circle
        cx="90"
        cy="35"
        r="10"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      />
      <rect
        x="86"
        y="31"
        width="8"
        height="9"
        rx="1"
        stroke="white"
        strokeWidth="0.5"
      />
      <circle cx="90" cy="36" r="1" fill="white" />
      <text
        x="90"
        y="45"
        textAnchor="middle"
        fontSize="4"
        fill="#67E8F9"
        fontFamily="monospace"
      >
        MOBILE
      </text>

      {/* Social Media */}
      <circle
        cx="90"
        cy="85"
        r="10"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      />
      <path d="M87 82C87 82 89 86 93 82" stroke="white" strokeWidth="0.5" />
      <path d="M87 85H93" stroke="white" strokeWidth="0.5" />
      <circle cx="90" cy="85" r="1" fill="white" />
      <text
        x="90"
        y="95"
        textAnchor="middle"
        fontSize="4"
        fill="#67E8F9"
        fontFamily="monospace"
      >
        SOCIAL
      </text>

      {/* Web */}
      <circle
        cx="30"
        cy="85"
        r="10"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      />
      <path d="M26 85H34" stroke="white" strokeWidth="0.5" />
      <path d="M30 81V89" stroke="white" strokeWidth="0.5" />
      <circle
        cx="30"
        cy="85"
        r="4"
        stroke="white"
        strokeWidth="0.5"
        strokeDasharray="1 1"
      />
      <text
        x="30"
        y="95"
        textAnchor="middle"
        fontSize="4"
        fill="#67E8F9"
        fontFamily="monospace"
      >
        WEB
      </text>

      {/* Content with embedded badge for each platform */}
      <rect
        x="25"
        y="35"
        width="10"
        height="2"
        rx="1"
        fill="#67E8F9"
        fillOpacity="0.3"
        stroke="#67E8F9"
        strokeWidth="0.25"
      />
      <text x="30" y="36.5" fontSize="1.5" textAnchor="middle" fill="white">
        Badge AI
      </text>

      <rect
        x="85"
        y="35"
        width="10"
        height="2"
        rx="1"
        fill="#67E8F9"
        fillOpacity="0.3"
        stroke="#67E8F9"
        strokeWidth="0.25"
      />
      <text x="90" y="36.5" fontSize="1.5" textAnchor="middle" fill="white">
        Badge AI
      </text>

      <rect
        x="85"
        y="85"
        width="10"
        height="2"
        rx="1"
        fill="#67E8F9"
        fillOpacity="0.3"
        stroke="#67E8F9"
        strokeWidth="0.25"
      />
      <text x="90" y="86.5" fontSize="1.5" textAnchor="middle" fill="white">
        Badge AI
      </text>

      <rect
        x="25"
        y="85"
        width="10"
        height="2"
        rx="1"
        fill="#67E8F9"
        fillOpacity="0.3"
        stroke="#67E8F9"
        strokeWidth="0.25"
      />
      <text x="30" y="86.5" fontSize="1.5" textAnchor="middle" fill="white">
        Badge AI
      </text>

      {/* Connection paths with animated data packets */}
      {/* Metadata to Desktop */}
      <path
        d="M53 55L35 40"
        stroke="#67E8F9"
        strokeWidth="0.5"
        strokeDasharray="1 1"
      />
      <circle cx="44" cy="47.5" r="1.5" fill="#67E8F9">
        <animate
          attributeName="cx"
          values="53;35"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values="55;40"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Metadata to Mobile */}
      <path
        d="M67 55L85 40"
        stroke="#67E8F9"
        strokeWidth="0.5"
        strokeDasharray="1 1"
      />
      <circle cx="76" cy="47.5" r="1.5" fill="#67E8F9">
        <animate
          attributeName="cx"
          values="67;85"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values="55;40"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Metadata to Social */}
      <path
        d="M67 65L85 80"
        stroke="#67E8F9"
        strokeWidth="0.5"
        strokeDasharray="1 1"
      />
      <circle cx="76" cy="72.5" r="1.5" fill="#67E8F9">
        <animate
          attributeName="cx"
          values="67;85"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
        <animate
          attributeName="cy"
          values="65;80"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
      </circle>

      {/* Metadata to Web */}
      <path
        d="M53 65L35 80"
        stroke="#67E8F9"
        strokeWidth="0.5"
        strokeDasharray="1 1"
      />
      <circle cx="44" cy="72.5" r="1.5" fill="#67E8F9">
        <animate
          attributeName="cx"
          values="53;35"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
        <animate
          attributeName="cy"
          values="65;80"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
      </circle>

      {/* Two-way transfer (cross-platform syncing) */}
      <path
        d="M30 45C10 60 10 80 30 95"
        stroke="#67E8F9"
        strokeWidth="0.5"
        strokeDasharray="1 1"
        strokeOpacity="0.5"
      />
      <path
        d="M90 45C110 60 110 80 90 95"
        stroke="#67E8F9"
        strokeWidth="0.5"
        strokeDasharray="1 1"
        strokeOpacity="0.5"
      />
      <path
        d="M30 85C50 85 70 85 90 85"
        stroke="#67E8F9"
        strokeWidth="0.5"
        strokeDasharray="1 1"
        strokeOpacity="0.5"
      />
      <path
        d="M30 35C50 35 70 35 90 35"
        stroke="#67E8F9"
        strokeWidth="0.5"
        strokeDasharray="1 1"
        strokeOpacity="0.5"
      />

      {/* Data packet animations on the arcs */}
      <circle cx="20" cy="60" r="1.5" fill="#67E8F9">
        <animate
          attributeName="cx"
          values="30;18;18;30"
          dur="6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values="45;60;80;95"
          dur="6s"
          repeatCount="indefinite"
        />
      </circle>

      <circle cx="100" cy="60" r="1.5" fill="#67E8F9">
        <animate
          attributeName="cx"
          values="90;102;102;90"
          dur="6s"
          repeatCount="indefinite"
          begin="1s"
        />
        <animate
          attributeName="cy"
          values="45;60;80;95"
          dur="6s"
          repeatCount="indefinite"
          begin="1s"
        />
      </circle>

      <circle cx="60" cy="85" r="1.5" fill="#67E8F9">
        <animate
          attributeName="cx"
          values="30;60;90"
          dur="4s"
          repeatCount="indefinite"
          begin="0.5s"
        />
      </circle>

      <circle cx="60" cy="35" r="1.5" fill="#67E8F9">
        <animate
          attributeName="cx"
          values="90;60;30"
          dur="4s"
          repeatCount="indefinite"
          begin="2s"
        />
      </circle>

      {/* Badge indicators with the same metadata at each platform */}
      <rect
        x="24"
        y="28"
        width="12"
        height="6"
        rx="3"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      />
      <text
        x="30"
        y="32"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        V-AI-2
      </text>

      <rect
        x="84"
        y="28"
        width="12"
        height="6"
        rx="3"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      />
      <text
        x="90"
        y="32"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        V-AI-2
      </text>

      <rect
        x="84"
        y="78"
        width="12"
        height="6"
        rx="3"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      />
      <text
        x="90"
        y="82"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        V-AI-2
      </text>

      <rect
        x="24"
        y="78"
        width="12"
        height="6"
        rx="3"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      />
      <text
        x="30"
        y="82"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        V-AI-2
      </text>

      {/* Label for persistence concept */}
      <rect
        x="30"
        y="105"
        width="60"
        height="10"
        rx="2"
        fill="#334155"
        fillOpacity="0.7"
        stroke="#67E8F9"
        strokeWidth="0.5"
        strokeOpacity="0.7"
      />
      <text
        x="60"
        y="111"
        textAnchor="middle"
        fontSize="5"
        fill="white"
        fontFamily="monospace"
      >
        PERSISTENT METADATA
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
          <stop stopColor="#06B6D4" />
          <stop offset="1" stopColor="#06B6D4" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="paint1_linear"
          x1="44"
          y1="44"
          x2="76"
          y2="76"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#67E8F9" />
          <stop offset="1" stopColor="#67E8F9" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SlideIllustration5;
