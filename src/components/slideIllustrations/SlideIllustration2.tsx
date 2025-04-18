import React from "react";

const SlideIllustration2: React.FC = () => {
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
        fillOpacity="0.3"
      />

      {/* Category badges */}
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

      {/* Connecting lines */}
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
