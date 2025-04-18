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

      {/* Central metadata node */}
      <circle
        cx="60"
        cy="60"
        r="16"
        fill="url(#paint1_linear)"
        fillOpacity="0.5"
        stroke="#67E8F9"
        strokeWidth="1"
      />
      <text
        x="60"
        y="63"
        textAnchor="middle"
        fontSize="7"
        fill="white"
        fontFamily="monospace"
      >
        Badge AI
      </text>

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
      <path d="M27 38V32H33V38H27Z" stroke="white" strokeWidth="0.5" />
      <text
        x="30"
        y="45"
        textAnchor="middle"
        fontSize="5"
        fill="#67E8F9"
        fontFamily="monospace"
      >
        Software
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
        height="8"
        rx="1"
        stroke="white"
        strokeWidth="0.5"
      />
      <text
        x="90"
        y="45"
        textAnchor="middle"
        fontSize="5"
        fill="#67E8F9"
        fontFamily="monospace"
      >
        Mobile
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
      <path d="M87 82C87 82 89 88 93 82" stroke="white" strokeWidth="0.5" />
      <circle cx="90" cy="85" r="1" fill="white" />
      <text
        x="90"
        y="95"
        textAnchor="middle"
        fontSize="5"
        fill="#67E8F9"
        fontFamily="monospace"
      >
        Social
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
      <path d="M25 85H35" stroke="white" strokeWidth="0.5" />
      <path d="M30 80V90" stroke="white" strokeWidth="0.5" />
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
        fontSize="5"
        fill="#67E8F9"
        fontFamily="monospace"
      >
        Web
      </text>

      {/* Connection paths with animated data packets */}
      {/* Central to Desktop */}
      <path
        d="M50 50L35 40"
        stroke="#67E8F9"
        strokeWidth="0.5"
        strokeDasharray="1 1"
      />
      <circle cx="42.5" cy="45" r="1.5" fill="#67E8F9">
        <animate
          attributeName="cx"
          values="50;35"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values="50;40"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Central to Mobile */}
      <path
        d="M70 50L85 40"
        stroke="#67E8F9"
        strokeWidth="0.5"
        strokeDasharray="1 1"
      />
      <circle cx="77.5" cy="45" r="1.5" fill="#67E8F9">
        <animate
          attributeName="cx"
          values="70;85"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values="50;40"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Central to Social */}
      <path
        d="M70 70L85 80"
        stroke="#67E8F9"
        strokeWidth="0.5"
        strokeDasharray="1 1"
      />
      <circle cx="77.5" cy="75" r="1.5" fill="#67E8F9">
        <animate
          attributeName="cx"
          values="70;85"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
        <animate
          attributeName="cy"
          values="70;80"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
      </circle>

      {/* Central to Web */}
      <path
        d="M50 70L35 80"
        stroke="#67E8F9"
        strokeWidth="0.5"
        strokeDasharray="1 1"
      />
      <circle cx="42.5" cy="75" r="1.5" fill="#67E8F9">
        <animate
          attributeName="cx"
          values="50;35"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
        <animate
          attributeName="cy"
          values="70;80"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
      </circle>

      {/* Connecting arc for seamless transfer */}
      <path
        d="M30 45C10 60 10 80 30 95"
        stroke="#67E8F9"
        strokeWidth="0.5"
        strokeDasharray="1 1"
        stroke-opacity="0.5"
      />
      <path
        d="M90 45C110 60 110 80 90 95"
        stroke="#67E8F9"
        strokeWidth="0.5"
        strokeDasharray="1 1"
        stroke-opacity="0.5"
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

      {/* Badge indicators at each platform */}
      <rect
        x="24"
        y="35"
        width="12"
        height="6"
        rx="3"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      />
      <text
        x="30"
        y="39"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        V-AI-2
      </text>

      <rect
        x="84"
        y="35"
        width="12"
        height="6"
        rx="3"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      />
      <text
        x="90"
        y="39"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        V-AI-2
      </text>

      <rect
        x="84"
        y="85"
        width="12"
        height="6"
        rx="3"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      />
      <text
        x="90"
        y="89"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        V-AI-2
      </text>

      <rect
        x="24"
        y="85"
        width="12"
        height="6"
        rx="3"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      />
      <text
        x="30"
        y="89"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        V-AI-2
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
