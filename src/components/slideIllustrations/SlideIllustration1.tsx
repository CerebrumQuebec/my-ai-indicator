import React from "react";

const SlideIllustration1: React.FC = () => {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="url(#paint0_radial)"
        fillOpacity="0.3"
      />
      <circle
        cx="60"
        cy="60"
        r="40"
        stroke="#67E8F9"
        strokeWidth="2"
        strokeDasharray="1 3"
      />
      <circle
        cx="60"
        cy="60"
        r="50"
        stroke="#67E8F9"
        strokeOpacity="0.6"
        strokeWidth="1"
      />

      {/* Badge Hexagon */}
      <path
        d="M60 25L85 40V70L60 85L35 70V40L60 25Z"
        fill="url(#paint1_linear)"
        fillOpacity="0.6"
        stroke="#A5B4FC"
        strokeWidth="2"
      />

      {/* Label Text */}
      <path d="M54 50V64H66V50H54ZM64 62H56V52H64V62Z" fill="white" />
      <path d="M45 75L49 65L51 66L47 76L45 75Z" fill="white" />
      <path d="M69 66L71 65L75 75L73 76L69 66Z" fill="white" />

      {/* Animated dots */}
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
