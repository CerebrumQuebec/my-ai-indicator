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

      {/* Digital landscape - interconnected network representing the entire digital ecosystem */}
      <circle
        cx="60"
        cy="60"
        r="40"
        fill="url(#paint1_linear)"
        fillOpacity="0.1"
        stroke="#A5B4FC"
        strokeWidth="0.5"
      />

      {/* Connection lines forming a network */}
      <path
        d="M30 60C40 45 50 35 60 30C70 35 80 45 90 60C80 75 70 85 60 90C50 85 40 75 30 60Z"
        stroke="#A5B4FC"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      />
      <path
        d="M35 50C45 40 55 35 60 35C65 35 75 40 85 50C85 70 75 80 60 85C45 80 35 70 35 50Z"
        stroke="#A5B4FC"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      />
      <path
        d="M40 40C50 35 60 35 70 40C80 50 80 70 70 80C60 85 50 85 40 80C30 70 30 50 40 40Z"
        stroke="#A5B4FC"
        strokeWidth="0.25"
        strokeDasharray="1 1"
      />

      {/* Main network grid lines */}
      <line x1="20" y1="60" x2="100" y2="60" stroke="#A5B4FC" strokeWidth="0.5" />
      <line x1="60" y1="20" x2="60" y2="100" stroke="#A5B4FC" strokeWidth="0.5" />
      <line x1="30" y1="30" x2="90" y2="90" stroke="#A5B4FC" strokeWidth="0.25" strokeDasharray="1 1" />
      <line x1="30" y1="90" x2="90" y2="30" stroke="#A5B4FC" strokeWidth="0.25" strokeDasharray="1 1" />

      {/* Badge Universal Emblem in center - representing synchronized badge recognition */}
      <circle
        cx="60"
        cy="60"
        r="10"
        fill="url(#paint2_linear)"
        fillOpacity="0.6"
        stroke="#67E8F9"
        strokeWidth="1"
      >
        <animate
          attributeName="opacity"
          values="0.6;0.9;0.6"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      <text
        x="60"
        y="58"
        textAnchor="middle"
        fontSize="4"
        fill="white"
        fontFamily="monospace"
      >
        IA
      </text>
      <text
        x="60"
        y="63"
        textAnchor="middle"
        fontSize="3"
        fill="white"
        fontFamily="monospace"
      >
        BADGE
      </text>

      {/* Creative Platforms - Section 1 (Top) */}
      <g>
        <rect
          x="25"
          y="25"
          width="70"
          height="20"
          rx="10"
          fill="#4F46E5"
          fillOpacity="0.1"
          stroke="#818CF8"
          strokeWidth="0.5"
        />
        <text
          x="60"
          y="35"
          textAnchor="middle"
          fontSize="5"
          fill="#A5B4FC"
          fontFamily="monospace"
          fontWeight="bold"
        >
          CREATIVE PLATFORMS
        </text>
        <text
          x="60"
          y="40"
          textAnchor="middle"
          fontSize="3"
          fill="#A5B4FC"
          fontFamily="monospace"
        >
          NATIVE INTEGRATION
        </text>
      </g>

      {/* Platform icons in Creative Section */}
      {/* Creative Platform 1 - Photo Editing */}
      <g>
        <circle
          cx="35"
          y="32"
          r="5"
          fill="#334155"
          stroke="#818CF8"
          strokeWidth="0.5"
        />
        <rect x="33" y="30" width="4" height="4" rx="1" stroke="white" strokeWidth="0.5" />
        <circle cx="35" y="32" r="1" fill="white" />
        
        {/* Badge indicator on platform */}
        <circle cx="37" y="29" r="1.5" fill="#67E8F9" stroke="#ffffff" strokeWidth="0.25">
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="3s"
            repeatCount="indefinite"
            begin="0s"
          />
        </circle>
        <text x="37" y="29.5" textAnchor="middle" fontSize="1.5" fill="#334155">IA</text>
      </g>

      {/* Creative Platform 2 - Video Editing */}
      <g>
        <circle
          cx="50"
          y="32"
          r="5"
          fill="#334155"
          stroke="#818CF8"
          strokeWidth="0.5"
        />
        <path d="M48 32H52" stroke="white" strokeWidth="0.5" />
        <path d="M50 30V34" stroke="white" strokeWidth="0.5" />
        
        {/* Badge indicator on platform */}
        <circle cx="52" y="29" r="1.5" fill="#67E8F9" stroke="#ffffff" strokeWidth="0.25">
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="3s"
            repeatCount="indefinite"
            begin="0.2s"
          />
        </circle>
        <text x="52" y="29.5" textAnchor="middle" fontSize="1.5" fill="#334155">IA</text>
      </g>

      {/* Creative Platform 3 - Design */}
      <g>
        <circle
          cx="70"
          y="32"
          r="5"
          fill="#334155"
          stroke="#818CF8"
          strokeWidth="0.5"
        />
        <path d="M68 30L72 34" stroke="white" strokeWidth="0.5" />
        <path d="M68 34L72 30" stroke="white" strokeWidth="0.5" />
        
        {/* Badge indicator on platform */}
        <circle cx="72" y="29" r="1.5" fill="#67E8F9" stroke="#ffffff" strokeWidth="0.25">
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="3s"
            repeatCount="indefinite"
            begin="0.4s"
          />
        </circle>
        <text x="72" y="29.5" textAnchor="middle" fontSize="1.5" fill="#334155">IA</text>
      </g>

      {/* Creative Platform 4 - 3D/AI */}
      <g>
        <circle
          cx="85"
          y="32"
          r="5"
          fill="#334155"
          stroke="#818CF8"
          strokeWidth="0.5"
        />
        <path d="M83 31H87" stroke="white" strokeWidth="0.5" />
        <path d="M85 33L87 31" stroke="white" strokeWidth="0.5" />
        <path d="M85 33L83 31" stroke="white" strokeWidth="0.5" />
        
        {/* Badge indicator on platform */}
        <circle cx="87" y="29" r="1.5" fill="#67E8F9" stroke="#ffffff" strokeWidth="0.25">
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="3s"
            repeatCount="indefinite"
            begin="0.6s"
          />
        </circle>
        <text x="87" y="29.5" textAnchor="middle" fontSize="1.5" fill="#334155">IA</text>
      </g>

      {/* Social Media Platforms - Section 2 (Bottom) */}
      <g>
        <rect
          x="25"
          y="75"
          width="70"
          height="20"
          rx="10"
          fill="#8B5CF6"
          fillOpacity="0.1"
          stroke="#A78BFA"
          strokeWidth="0.5"
        />
        <text
          x="60"
          y="85"
          textAnchor="middle"
          fontSize="5"
          fill="#A78BFA"
          fontFamily="monospace"
          fontWeight="bold"
        >
          SOCIAL MEDIA
        </text>
        <text
          x="60"
          y="90"
          textAnchor="middle"
          fontSize="3"
          fill="#A78BFA"
          fontFamily="monospace"
        >
          SYNCHRONIZED TRANSPARENCY
        </text>
      </g>

      {/* Social Media Platform 1 */}
      <g>
        <circle
          cx="35"
          y="85"
          r="5"
          fill="#334155"
          stroke="#A78BFA"
          strokeWidth="0.5"
        />
        <path d="M35 83C36 83 37 84 37 85C37 86 36 87 35 87C34 87 33 86 33 85C33 84 34 83 35 83Z" stroke="white" strokeWidth="0.5" />
        
        {/* Badge indicator on platform */}
        <circle cx="37" y="82" r="1.5" fill="#67E8F9" stroke="#ffffff" strokeWidth="0.25">
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="3s"
            repeatCount="indefinite"
            begin="0.8s"
          />
        </circle>
        <text x="37" y="82.5" textAnchor="middle" fontSize="1.5" fill="#334155">IA</text>
      </g>

      {/* Social Media Platform 2 */}
      <g>
        <circle
          cx="50"
          y="85"
          r="5"
          fill="#334155"
          stroke="#A78BFA"
          strokeWidth="0.5"
        />
        <path d="M48 84H52" stroke="white" strokeWidth="0.5" />
        <path d="M48 86H52" stroke="white" strokeWidth="0.5" />
        
        {/* Badge indicator on platform */}
        <circle cx="52" y="82" r="1.5" fill="#67E8F9" stroke="#ffffff" strokeWidth="0.25">
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="3s"
            repeatCount="indefinite"
            begin="1s"
          />
        </circle>
        <text x="52" y="82.5" textAnchor="middle" fontSize="1.5" fill="#334155">IA</text>
      </g>

      {/* Social Media Platform 3 */}
      <g>
        <circle
          cx="70"
          y="85"
          r="5"
          fill="#334155"
          stroke="#A78BFA"
          strokeWidth="0.5"
        />
        <path d="M68 85L72 85" stroke="white" strokeWidth="0.5" />
        <path d="M70 83L70 87" stroke="white" strokeWidth="0.5" />
        <circle cx="70" y="85" r="1.5" stroke="white" strokeWidth="0.5" fill="none" />
        
        {/* Badge indicator on platform */}
        <circle cx="72" y="82" r="1.5" fill="#67E8F9" stroke="#ffffff" strokeWidth="0.25">
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="3s"
            repeatCount="indefinite"
            begin="1.2s"
          />
        </circle>
        <text x="72" y="82.5" textAnchor="middle" fontSize="1.5" fill="#334155">IA</text>
      </g>

      {/* Social Media Platform 4 */}
      <g>
        <circle
          cx="85"
          y="85"
          r="5"
          fill="#334155"
          stroke="#A78BFA"
          strokeWidth="0.5"
        />
        <path d="M83 84L87 86" stroke="white" strokeWidth="0.5" />
        <path d="M83 86L87 84" stroke="white" strokeWidth="0.5" />
        
        {/* Badge indicator on platform */}
        <circle cx="87" y="82" r="1.5" fill="#67E8F9" stroke="#ffffff" strokeWidth="0.25">
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="3s"
            repeatCount="indefinite"
            begin="1.4s"
          />
        </circle>
        <text x="87" y="82.5" textAnchor="middle" fontSize="1.5" fill="#334155">IA</text>
      </g>

      {/* Left side - Website platforms */}
      <g>
        <rect
          x="15"
          y="45"
          width="20"
          height="30"
          rx="5"
          fill="#0EA5E9"
          fillOpacity="0.1"
          stroke="#7DD3FC"
          strokeWidth="0.5"
        />
        <text
          x="25"
          y="55"
          textAnchor="middle"
          fontSize="4"
          fill="#7DD3FC"
          fontFamily="monospace"
          fontWeight="bold"
          writingMode="tb"
        >
          WEBSITES
        </text>
        
        {/* Website platform icons */}
        <circle
          cx="25"
          y="65"
          r="5"
          fill="#334155"
          stroke="#7DD3FC"
          strokeWidth="0.5"
        />
        <path d="M23 65H27" stroke="white" strokeWidth="0.5" />
        <path d="M25 63V67" stroke="white" strokeWidth="0.5" />
        
        {/* Badge indicator on platform */}
        <circle cx="28" y="62" r="1.5" fill="#67E8F9" stroke="#ffffff" strokeWidth="0.25">
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="3s"
            repeatCount="indefinite"
            begin="1.6s"
          />
        </circle>
        <text x="28" y="62.5" textAnchor="middle" fontSize="1.5" fill="#334155">IA</text>
      </g>

      {/* Right side - NFT/Blockchain platforms */}
      <g>
        <rect
          x="85"
          y="45"
          width="20"
          height="30"
          rx="5"
          fill="#10B981"
          fillOpacity="0.1"
          stroke="#6EE7B7"
          strokeWidth="0.5"
        />
        <text
          x="95"
          y="55"
          textAnchor="middle"
          fontSize="4"
          fill="#6EE7B7"
          fontFamily="monospace"
          fontWeight="bold"
          writingMode="tb"
        >
          BLOCKCHAINS
        </text>
        
        {/* NFT platform icon */}
        <circle
          cx="95"
          y="65"
          r="5"
          fill="#334155"
          stroke="#6EE7B7"
          strokeWidth="0.5"
        />
        <path d="M93 64H97" stroke="white" strokeWidth="0.5" />
        <path d="M93 66H97" stroke="white" strokeWidth="0.5" />
        <path d="M93 64V66" stroke="white" strokeWidth="0.5" />
        <path d="M97 64V66" stroke="white" strokeWidth="0.5" />
        
        {/* Badge indicator on platform */}
        <circle cx="92" y="62" r="1.5" fill="#67E8F9" stroke="#ffffff" strokeWidth="0.25">
          <animate
            attributeName="opacity"
            values="0.7;1;0.7"
            dur="3s"
            repeatCount="indefinite"
            begin="1.8s"
          />
        </circle>
        <text x="92" y="62.5" textAnchor="middle" fontSize="1.5" fill="#334155">IA</text>
      </g>

      {/* Synchronization pulse lines connecting the central badge to all platforms */}
      {/* Creative Platform connections */}
      <path
        d="M53 57L35 37"
        stroke="#67E8F9"
        strokeWidth="0.75"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.3;1;0.3"
          dur="3s"
          repeatCount="indefinite"
          begin="0s"
        />
      </path>
      <path
        d="M55 53L50 37"
        stroke="#67E8F9"
        strokeWidth="0.75"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.3;1;0.3"
          dur="3s"
          repeatCount="indefinite"
          begin="0.2s"
        />
      </path>
      <path
        d="M65 53L70 37"
        stroke="#67E8F9"
        strokeWidth="0.75"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.3;1;0.3"
          dur="3s"
          repeatCount="indefinite"
          begin="0.4s"
        />
      </path>
      <path
        d="M67 57L85 37"
        stroke="#67E8F9"
        strokeWidth="0.75"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.3;1;0.3"
          dur="3s"
          repeatCount="indefinite"
          begin="0.6s"
        />
      </path>

      {/* Social Media connections */}
      <path
        d="M53 63L35 80"
        stroke="#67E8F9"
        strokeWidth="0.75"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.3;1;0.3"
          dur="3s"
          repeatCount="indefinite"
          begin="0.8s" 
        />
      </path>
      <path
        d="M55 67L50 80"
        stroke="#67E8F9"
        strokeWidth="0.75"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.3;1;0.3"
          dur="3s"
          repeatCount="indefinite"
          begin="1s"
        />
      </path>
      <path
        d="M65 67L70 80"
        stroke="#67E8F9"
        strokeWidth="0.75"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.3;1;0.3"
          dur="3s"
          repeatCount="indefinite"
          begin="1.2s"
        />
      </path>
      <path
        d="M67 63L85 80"
        stroke="#67E8F9"
        strokeWidth="0.75"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.3;1;0.3"
          dur="3s"
          repeatCount="indefinite"
          begin="1.4s"
        />
      </path>

      {/* Side platform connections */}
      <path
        d="M50 60L30 65"
        stroke="#67E8F9"
        strokeWidth="0.75"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.3;1;0.3"
          dur="3s"
          repeatCount="indefinite"
          begin="1.6s"
        />
      </path>
      <path
        d="M70 60L90 65"
        stroke="#67E8F9"
        strokeWidth="0.75"
        strokeDasharray="1 1"
      >
        <animate
          attributeName="stroke-opacity"
          values="0.3;1;0.3"
          dur="3s"
          repeatCount="indefinite"
          begin="1.8s"
        />
      </path>

      {/* Sync status indicators */}
      <circle cx="45" cy="47" r="1.5" fill="#67E8F9">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="3s"
          repeatCount="indefinite"
          begin="0.1s"
        />
      </circle>
      <circle cx="52" cy="45" r="1.5" fill="#67E8F9">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="3s"
          repeatCount="indefinite"
          begin="0.3s"
        />
      </circle>
      <circle cx="68" cy="45" r="1.5" fill="#67E8F9">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="3s"
          repeatCount="indefinite"
          begin="0.5s"
        />
      </circle>
      <circle cx="75" cy="47" r="1.5" fill="#67E8F9">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="3s"
          repeatCount="indefinite"
          begin="0.7s"
        />
      </circle>
      <circle cx="45" cy="73" r="1.5" fill="#67E8F9">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="3s"
          repeatCount="indefinite"
          begin="0.9s"
        />
      </circle>
      <circle cx="52" cy="75" r="1.5" fill="#67E8F9">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="3s"
          repeatCount="indefinite"
          begin="1.1s"
        />
      </circle>
      <circle cx="68" cy="75" r="1.5" fill="#67E8F9">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="3s"
          repeatCount="indefinite"
          begin="1.3s"
        />
      </circle>
      <circle cx="75" cy="73" r="1.5" fill="#67E8F9">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="3s"
          repeatCount="indefinite"
          begin="1.5s"
        />
      </circle>
      <circle cx="40" cy="62" r="1.5" fill="#67E8F9">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="3s"
          repeatCount="indefinite"
          begin="1.7s"
        />
      </circle>
      <circle cx="80" cy="62" r="1.5" fill="#67E8F9">
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="3s"
          repeatCount="indefinite"
          begin="1.9s"
        />
      </circle>

      {/* Key Title for the Illustration */}
      <rect
        x="30"
        y="105"
        width="60"
        height="10"
        rx="5"
        fill="#334155"
        fillOpacity="0.7"
        stroke="#A5B4FC"
        strokeWidth="0.5"
      />
      <text
        x="60"
        y="111"
        textAnchor="middle"
        fontSize="5"
        fill="#67E8F9"
        fontFamily="monospace"
        fontWeight="bold"
      >
        CONSISTENT TRANSPARENCY
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
