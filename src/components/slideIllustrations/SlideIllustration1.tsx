import React from "react";

const SlideIllustration1: React.FC = () => {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Background with digital media elements */}
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="url(#paint0_radial)"
        fillOpacity="0.3"
      />

      {/* Digital media concentric circles representing global reach */}
      <circle
        cx="60"
        cy="60"
        r="50"
        stroke="#67E8F9"
        strokeOpacity="0.6"
        strokeWidth="1"
      />
      <circle
        cx="60"
        cy="60"
        r="40"
        stroke="#67E8F9"
        strokeWidth="0.8"
        strokeDasharray="1 3"
      />
      <circle
        cx="60"
        cy="60"
        r="30"
        stroke="#A5B4FC"
        strokeOpacity="0.6"
        strokeWidth="0.5"
        strokeDasharray="1 2"
      />

      {/* Evolution path from manual to automated - flowing arrow */}
      <path
        d="M20 70C25 60 35 65 45 60C55 55 55 40 65 40C75 40 85 50 100 45"
        stroke="#A5B4FC"
        strokeWidth="1.5"
        strokeDasharray="2 2"
      />
      <path d="M95 41L100 45L97 49" stroke="#A5B4FC" strokeWidth="1.5" />

      {/* Badge Hexagon - central universal standard */}
      <path
        d="M60 25L85 40V70L60 85L35 70V40L60 25Z"
        fill="url(#paint1_linear)"
        fillOpacity="0.6"
        stroke="#A5B4FC"
        strokeWidth="2"
      >
        <animate
          attributeName="stroke-opacity"
          values="1;0.5;1"
          dur="3s"
          repeatCount="indefinite"
        />
      </path>

      {/* Badge AI Logo */}
      <text
        x="60"
        y="57"
        textAnchor="middle"
        fontSize="7"
        fontWeight="bold"
        fill="white"
        fontFamily="monospace"
      >
        Badge
      </text>
      <text
        x="60"
        y="65"
        textAnchor="middle"
        fontSize="7"
        fontWeight="bold"
        fill="white"
        fontFamily="monospace"
      >
        AI
      </text>

      {/* Digital media icons representing different platforms */}
      {/* Document icon - left */}
      <rect
        x="25"
        y="50"
        width="8"
        height="10"
        rx="1"
        fill="#67E8F9"
        fillOpacity="0.5"
      />
      <path d="M27 53H31" stroke="white" strokeWidth="0.5" />
      <path d="M27 55H31" stroke="white" strokeWidth="0.5" />
      <path d="M27 57H29" stroke="white" strokeWidth="0.5" />

      {/* Image icon - right */}
      <rect
        x="87"
        y="50"
        width="8"
        height="8"
        rx="1"
        fill="#A5B4FC"
        fillOpacity="0.5"
      />
      <circle cx="90" cy="53" r="1" fill="white" />
      <path d="M88 56L89 55L91 57" stroke="white" strokeWidth="0.5" />

      {/* Music icon - bottom */}
      <circle cx="60" cy="95" r="4" fill="#A5B4FC" fillOpacity="0.5" />
      <path d="M58 93V97" stroke="white" strokeWidth="0.5" />
      <path d="M62 92V96" stroke="white" strokeWidth="0.5" />
      <path d="M58 93H62" stroke="white" strokeWidth="0.5" />
      <path d="M58 97H62" stroke="white" strokeWidth="0.5" />

      {/* Animated connection points */}
      <circle cx="60" cy="30" r="2" fill="white" opacity="0.8">
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="82" cy="45" r="2" fill="white" opacity="0.8">
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="2s"
          repeatCount="indefinite"
          begin="0.3s"
        />
      </circle>
      <circle cx="82" cy="65" r="2" fill="white" opacity="0.8">
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="2s"
          repeatCount="indefinite"
          begin="0.6s"
        />
      </circle>
      <circle cx="60" cy="80" r="2" fill="white" opacity="0.8">
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="2s"
          repeatCount="indefinite"
          begin="0.9s"
        />
      </circle>
      <circle cx="38" cy="65" r="2" fill="white" opacity="0.8">
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="2s"
          repeatCount="indefinite"
          begin="1.2s"
        />
      </circle>
      <circle cx="38" cy="45" r="2" fill="white" opacity="0.8">
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="2s"
          repeatCount="indefinite"
          begin="1.5s"
        />
      </circle>

      {/* Data flow animation representing seamless attribution */}
      <circle cx="20" cy="70" r="1.5" fill="#67E8F9">
        <animate
          attributeName="cx"
          values="20;45;65;100"
          dur="3s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="cy"
          values="70;60;40;45"
          dur="3s"
          repeatCount="indefinite"
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
          <stop stopColor="#67E8F9" />
          <stop offset="1" stopColor="#67E8F9" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="paint1_linear"
          x1="35"
          y1="25"
          x2="85"
          y2="85"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#67E8F9" stopOpacity="0.2" />
          <stop offset="1" stopColor="#A5B4FC" stopOpacity="0.2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SlideIllustration1;
