import React from "react";

const SlideIllustration7: React.FC = () => {
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

      {/* Community globe - central element */}
      <circle
        cx="60"
        cy="60"
        r="25"
        fill="#1E293B"
        fillOpacity="0.7"
        stroke="#67E8F9"
        strokeWidth="0.75"
      />

      {/* Globe latitude/longitude lines */}
      <ellipse
        cx="60"
        cy="60"
        rx="25"
        ry="10"
        stroke="#67E8F9"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      />
      <ellipse
        cx="60"
        cy="60"
        rx="20"
        ry="8"
        stroke="#67E8F9"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      />
      <ellipse
        cx="60"
        cy="60"
        rx="14"
        ry="5.5"
        stroke="#67E8F9"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      />
      <path
        d="M60 35C75 35 80 45 80 60C80 75 75 85 60 85C45 85 40 75 40 60C40 45 45 35 60 35Z"
        stroke="#67E8F9"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      />
      <path
        d="M60 42C70 42 73 50 73 60C73 70 70 78 60 78C50 78 47 70 47 60C47 50 50 42 60 42Z"
        stroke="#67E8F9"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      />
      <path
        d="M60 50C65 50 66 55 66 60C66 65 65 70 60 70C55 70 54 65 54 60C54 55 55 50 60 50Z"
        stroke="#67E8F9"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      />

      {/* Badge AI logo in center of globe */}
      <text
        x="60"
        y="57"
        textAnchor="middle"
        fontSize="6"
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
        fill="#67E8F9"
        fontFamily="monospace"
      >
        GLOBAL STANDARD
      </text>

      {/* Copyright symbol next to Badge AI to represent equivalence */}
      <circle
        cx="75"
        cy="60"
        r="5"
        fill="#334155"
        stroke="#A5B4FC"
        strokeWidth="0.5"
      />
      <text
        x="75"
        y="62"
        textAnchor="middle"
        fontSize="6"
        fill="white"
        fontFamily="sans-serif"
      >
        ©
      </text>

      {/* Contributors/community members around the globe */}
      {/* Contributor 1 */}
      <circle
        cx="40"
        cy="35"
        r="4"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      >
        <animate
          attributeName="r"
          values="4;4.5;4"
          dur="4s"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>
      <path
        d="M40 32C39 32 38 33 38 34C38 35 39 36 40 36C41 36 42 35 42 34C42 33 41 32 40 32Z"
        fill="white"
      />
      <path
        d="M37 38C37 36 38.5 35 40 35C41.5 35 43 36 43 38"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
      />

      {/* Contributor 2 */}
      <circle
        cx="80"
        cy="35"
        r="4"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      >
        <animate
          attributeName="r"
          values="4;4.5;4"
          dur="4s"
          repeatCount="indefinite"
          begin="1s"
        />
      </circle>
      <path
        d="M80 32C79 32 78 33 78 34C78 35 79 36 80 36C81 36 82 35 82 34C82 33 81 32 80 32Z"
        fill="white"
      />
      <path
        d="M77 38C77 36 78.5 35 80 35C81.5 35 83 36 83 38"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
      />

      {/* Contributor 3 */}
      <circle
        cx="40"
        cy="85"
        r="4"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      >
        <animate
          attributeName="r"
          values="4;4.5;4"
          dur="4s"
          repeatCount="indefinite"
          begin="2s"
        />
      </circle>
      <path
        d="M40 82C39 82 38 83 38 84C38 85 39 86 40 86C41 86 42 85 42 84C42 83 41 82 40 82Z"
        fill="white"
      />
      <path
        d="M37 88C37 86 38.5 85 40 85C41.5 85 43 86 43 88"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
      />

      {/* Contributor 4 */}
      <circle
        cx="80"
        cy="85"
        r="4"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      >
        <animate
          attributeName="r"
          values="4;4.5;4"
          dur="4s"
          repeatCount="indefinite"
          begin="3s"
        />
      </circle>
      <path
        d="M80 82C79 82 78 83 78 84C78 85 79 86 80 86C81 86 82 85 82 84C82 83 81 82 80 82Z"
        fill="white"
      />
      <path
        d="M77 88C77 86 78.5 85 80 85C81.5 85 83 86 83 88"
        stroke="white"
        strokeWidth="0.5"
        strokeLinecap="round"
      />

      {/* Contributor connections */}
      <path
        d="M42 38L57 55"
        stroke="#67E8F9"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.2;1;0.2"
          dur="4s"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </path>
      <path
        d="M78 38L63 55"
        stroke="#67E8F9"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.2;1;0.2"
          dur="4s"
          repeatCount="indefinite"
          begin="1.2s"
        />
      </path>
      <path
        d="M42 82L57 65"
        stroke="#67E8F9"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.2;1;0.2"
          dur="4s"
          repeatCount="indefinite"
          begin="2.2s"
        />
      </path>
      <path
        d="M78 82L63 65"
        stroke="#67E8F9"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.2;1;0.2"
          dur="4s"
          repeatCount="indefinite"
          begin="3.2s"
        />
      </path>

      {/* Community connection circles */}
      <circle cx="49" cy="46" r="1" fill="#67E8F9">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="4s"
          repeatCount="indefinite"
          begin="0.4s"
        />
      </circle>
      <circle cx="71" cy="46" r="1" fill="#67E8F9">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="4s"
          repeatCount="indefinite"
          begin="1.4s"
        />
      </circle>
      <circle cx="49" cy="74" r="1" fill="#67E8F9">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="4s"
          repeatCount="indefinite"
          begin="2.4s"
        />
      </circle>
      <circle cx="71" cy="74" r="1" fill="#67E8F9">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="4s"
          repeatCount="indefinite"
          begin="3.4s"
        />
      </circle>

      {/* Badge types being contributed */}
      <rect
        x="35"
        y="28"
        width="10"
        height="5"
        rx="2.5"
        fill="#334155"
        stroke="#67E8F9"
        strokeWidth="0.5"
      >
        <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="4s"
          repeatCount="indefinite"
          begin="0.5s"
        />
      </rect>
      <text
        x="40"
        y="31.5"
        textAnchor="middle"
        fontSize="3"
        fill="white"
        fontFamily="monospace"
      >
        S-AI-2
      </text>

      <rect
        x="75"
        y="28"
        width="10"
        height="5"
        rx="2.5"
        fill="#334155"
        stroke="#A5B4FC"
        strokeWidth="0.5"
      >
        <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="4s"
          repeatCount="indefinite"
          begin="1.5s"
        />
      </rect>
      <text
        x="80"
        y="31.5"
        textAnchor="middle"
        fontSize="3"
        fill="white"
        fontFamily="monospace"
      >
        V-AI-3
      </text>

      <rect
        x="35"
        y="78"
        width="10"
        height="5"
        rx="2.5"
        fill="#334155"
        stroke="#C084FC"
        strokeWidth="0.5"
      >
        <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="4s"
          repeatCount="indefinite"
          begin="2.5s"
        />
      </rect>
      <text
        x="40"
        y="81.5"
        textAnchor="middle"
        fontSize="3"
        fill="white"
        fontFamily="monospace"
      >
        T-AI-1
      </text>

      <rect
        x="75"
        y="78"
        width="10"
        height="5"
        rx="2.5"
        fill="#334155"
        stroke="#22D3EE"
        strokeWidth="0.5"
      >
        <animate
          attributeName="opacity"
          values="0.5;1;0.5"
          dur="4s"
          repeatCount="indefinite"
          begin="3.5s"
        />
      </rect>
      <text
        x="80"
        y="81.5"
        textAnchor="middle"
        fontSize="3"
        fill="white"
        fontFamily="monospace"
      >
        V-AI-0
      </text>

      {/* Join CTA element */}
      <rect
        x="30"
        y="100"
        width="60"
        height="10"
        rx="5"
        fill="#3B82F6"
        fillOpacity="0.3"
        stroke="#67E8F9"
        strokeWidth="0.5"
      >
        <animate
          attributeName="fill-opacity"
          values="0.3;0.5;0.3"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>
      <text
        x="60"
        y="106"
        textAnchor="middle"
        fontSize="5"
        fill="white"
        fontFamily="monospace"
      >
        JOIN TODAY
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
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#6366F1" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default SlideIllustration7;
