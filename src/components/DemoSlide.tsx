import React, { ReactNode } from "react";

interface DemoSlideProps {
  title: string;
  content: string;
  icon?: string;
  illustration?: ReactNode;
  bgColor?: string;
  isActive: boolean;
}

const DemoSlide: React.FC<DemoSlideProps> = ({
  title,
  content,
  icon = "✨",
  illustration,
  bgColor = "from-primary-600/30 to-accent-indigo/30",
  isActive,
}) => {
  return (
    <div
      className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-700 ${
        isActive ? "opacity-100 z-10" : "opacity-0 z-0"
      }`}
    >
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${bgColor} transition-all duration-500 py-4`}
      >
        <div className="flex-grow flex items-center justify-center w-full max-h-[70%]">
          {illustration ? (
            <div className="transform-gpu scale-[1.8] sm:scale-[2] md:scale-[2.2] lg:scale-[2.5] flex items-center justify-center">
              {illustration}
            </div>
          ) : (
            <div className="w-16 h-16 bg-surface-dark/40 rounded-full flex items-center justify-center shadow-glow">
              <span className="text-3xl">{icon}</span>
            </div>
          )}
        </div>

        <div className="w-full px-4 sm:px-6 pt-4 sm:pt-6 text-center max-h-[30%] flex flex-col justify-end">
          <h3
            className="text-xl sm:text-2xl font-bold text-text-primary mb-1 sm:mb-2 animate-fade-in opacity-0"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            {title}
          </h3>
          <p
            className="text-xs sm:text-sm md:text-base text-text-secondary max-w-md mx-auto animate-fade-in opacity-0"
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoSlide;
