import React, { ReactNode } from "react";

interface DemoSlideProps {
  title?: string;
  content?: string;
  illustration?: ReactNode;
  bgColor?: string;
  isActive: boolean;
  type: "text" | "svg";
  animationDelay?: number;
}

const DemoSlide: React.FC<DemoSlideProps> = ({
  title,
  content,
  illustration,
  bgColor = "from-primary-600/30 to-accent-indigo/30",
  isActive,
  type,
  animationDelay = 0,
}) => {
  return (
    <div
      className={`absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-1000 ${
        isActive
          ? "opacity-100 z-10 blur-none scale-100"
          : "opacity-0 z-0 blur-md scale-105"
      }`}
      style={{ transitionDelay: `${animationDelay * 0.1}s` }}
    >
      {/* Futuristic background effects for all slides */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="smallGrid"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 30 0 L 0 0 0 30"
                  fill="none"
                  stroke="rgba(103, 232, 249, 0.3)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>

        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-primary-600/10 animate-pulse-slow blur-3xl"></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-[30vw] h-[30vw] rounded-full bg-accent-indigo/10 animate-pulse-slow blur-3xl"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/4 w-[25vw] h-[25vw] rounded-full bg-cyan-400/5 animate-pulse-slow blur-3xl"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Scanning line effect */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-400/50 to-transparent animate-scan-vertical"></div>

        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-70`}
        ></div>
      </div>

      {type === "text" ? (
        // Text slide with cinematic animations
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-3xl mx-auto">
            {title && (
              <h3
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 sm:mb-8 opacity-0 animate-cinematic-title"
                style={{
                  animationDelay: "0.3s",
                  animationFillMode: "forwards",
                  textShadow: "0 0 15px rgba(103, 232, 249, 0.5)",
                }}
              >
                {title}
              </h3>
            )}

            {content && (
              <p
                className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto opacity-0 animate-cinematic-text"
                style={{
                  animationDelay: "0.8s",
                  animationFillMode: "forwards",
                  textShadow: "0 0 10px rgba(103, 232, 249, 0.3)",
                }}
              >
                {content}
              </p>
            )}
          </div>
        </div>
      ) : (
        // Full-screen SVG illustration slide
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {illustration && (
            <div className="svg-container w-full h-full flex items-center justify-center max-w-none">
              <div
                style={{
                  transform: "scale(5)",
                  transformOrigin: "center center",
                }}
                className="animate-float"
              >
                {illustration}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DemoSlide;
