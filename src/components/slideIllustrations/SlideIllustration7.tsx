import React from "react";

const SlideIllustration7: React.FC = () => {
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

      {/* Rocket base elements */}
      <g>
        {/* Rocket body */}
        <path
          d="M60 25C60 25 40 45 40 70C40 80 45 85 60 85C75 85 80 80 80 70C80 45 60 25 60 25Z"
          fill="url(#paint1_linear)"
          stroke="#67E8F9"
          strokeWidth="1"
        />

        {/* Rocket window */}
        <circle
          cx="60"
          cy="55"
          r="8"
          fill="#334155"
          stroke="#67E8F9"
          strokeWidth="0.5"
        />
        <circle
          cx="60"
          cy="55"
          r="6"
          fill="#111827"
          stroke="#67E8F9"
          strokeOpacity="0.5"
          strokeWidth="0.5"
        />

        {/* Badge AI logo in window */}
        <text
          x="60"
          y="57"
          textAnchor="middle"
          fontSize="4"
          fill="#67E8F9"
          fontFamily="monospace"
        >
          Badge AI
        </text>

        {/* Rocket fins */}
        <path
          d="M46 70L35 80V70L46 70Z"
          fill="#3B82F6"
          fillOpacity="0.6"
          stroke="#67E8F9"
          strokeWidth="0.5"
        />
        <path
          d="M74 70L85 80V70L74 70Z"
          fill="#3B82F6"
          fillOpacity="0.6"
          stroke="#67E8F9"
          strokeWidth="0.5"
        />

        {/* Rocket bottom */}
        <path
          d="M45 80C45 80 52 75 60 75C68 75 75 80 75 80C75 83 68 85 60 85C52 85 45 83 45 80Z"
          fill="#334155"
          stroke="#67E8F9"
          strokeWidth="0.5"
        />
      </g>

      {/* Rocket flame animation */}
      <g>
        <path
          d="M53 80C53 80 55 90 60 100C65 90 67 80 67 80C65 83 63 85 60 85C57 85 55 83 53 80Z"
          fill="#F59E0B"
        >
          <animate
            attributeName="d"
            values="M53 80C53 80 55 90 60 100C65 90 67 80 67 80C65 83 63 85 60 85C57 85 55 83 53 80Z;M53 80C53 80 55 95 60 105C65 95 67 80 67 80C65 83 63 85 60 85C57 85 55 83 53 80Z;M53 80C53 80 55 90 60 100C65 90 67 80 67 80C65 83 63 85 60 85C57 85 55 83 53 80Z"
            dur="0.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M55 80C55 80 57 88 60 95C63 88 65 80 65 80C63 83 62 85 60 85C58 85 57 83 55 80Z"
          fill="#F97316"
        >
          <animate
            attributeName="d"
            values="M55 80C55 80 57 88 60 95C63 88 65 80 65 80C63 83 62 85 60 85C58 85 57 83 55 80Z;M55 80C55 80 57 92 60 100C63 92 65 80 65 80C63 83 62 85 60 85C58 85 57 83 55 80Z;M55 80C55 80 57 88 60 95C63 88 65 80 65 80C63 83 62 85 60 85C58 85 57 83 55 80Z"
            dur="0.5s"
            repeatCount="indefinite"
            begin="0.1s"
          />
        </path>
        <path
          d="M57 80C57 80 58 85 60 90C62 85 63 80 63 80C62 82 61 83 60 83C59 83 58 82 57 80Z"
          fill="#EF4444"
        >
          <animate
            attributeName="d"
            values="M57 80C57 80 58 85 60 90C62 85 63 80 63 80C62 82 61 83 60 83C59 83 58 82 57 80Z;M57 80C57 80 58 87 60 93C62 87 63 80 63 80C62 82 61 83 60 83C59 83 58 82 57 80Z;M57 80C57 80 58 85 60 90C62 85 63 80 63 80C62 82 61 83 60 83C59 83 58 82 57 80Z"
            dur="0.5s"
            repeatCount="indefinite"
            begin="0.2s"
          />
        </path>
      </g>

      {/* Stars/particles animation */}
      <g>
        <circle cx="45" cy="45" r="1" fill="white">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="0s"
          />
        </circle>
        <circle cx="75" cy="35" r="1" fill="white">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="0.5s"
          />
        </circle>
        <circle cx="30" cy="60" r="1" fill="white">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="1s"
          />
        </circle>
        <circle cx="90" cy="60" r="1" fill="white">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="1.5s"
          />
        </circle>
        <circle cx="50" cy="20" r="1" fill="white">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="2s"
          />
        </circle>
        <circle cx="70" cy="20" r="1" fill="white">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="2.5s"
          />
        </circle>
        <circle cx="85" cy="45" r="1" fill="white">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="0.2s"
          />
        </circle>
        <circle cx="35" cy="40" r="1" fill="white">
          <animate
            attributeName="opacity"
            values="0;1;0"
            dur="3s"
            repeatCount="indefinite"
            begin="0.7s"
          />
        </circle>
      </g>

      {/* Badge types around the rocket */}
      <g>
        <rect
          x="38"
          y="35"
          width="12"
          height="6"
          rx="3"
          fill="#334155"
          stroke="#67E8F9"
          strokeWidth="0.5"
        >
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="4s"
            repeatCount="indefinite"
            begin="0s"
          />
        </rect>
        <text
          x="44"
          y="39"
          textAnchor="middle"
          fontSize="4"
          fill="white"
          fontFamily="monospace"
        >
          S-AI-2
        </text>
      </g>

      <g>
        <rect
          x="70"
          y="35"
          width="12"
          height="6"
          rx="3"
          fill="#334155"
          stroke="#A5B4FC"
          strokeWidth="0.5"
        >
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="4s"
            repeatCount="indefinite"
            begin="1s"
          />
        </rect>
        <text
          x="76"
          y="39"
          textAnchor="middle"
          fontSize="4"
          fill="white"
          fontFamily="monospace"
        >
          V-AI-3
        </text>
      </g>

      <g>
        <rect
          x="45"
          y="65"
          width="12"
          height="6"
          rx="3"
          fill="#334155"
          stroke="#C084FC"
          strokeWidth="0.5"
        >
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="4s"
            repeatCount="indefinite"
            begin="2s"
          />
        </rect>
        <text
          x="51"
          y="69"
          textAnchor="middle"
          fontSize="4"
          fill="white"
          fontFamily="monospace"
        >
          T-AI-1
        </text>
      </g>

      <g>
        <rect
          x="63"
          y="65"
          width="12"
          height="6"
          rx="3"
          fill="#334155"
          stroke="#22D3EE"
          strokeWidth="0.5"
        >
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="4s"
            repeatCount="indefinite"
            begin="3s"
          />
        </rect>
        <text
          x="69"
          y="69"
          textAnchor="middle"
          fontSize="4"
          fill="white"
          fontFamily="monospace"
        >
          S-AI-0
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
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#6366F1" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="paint1_linear"
          x1="40"
          y1="25"
          x2="80"
          y2="85"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#67E8F9" />
          <stop offset="1" stopColor="#818CF8" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SlideIllustration7;
