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
        className={`w-full max-w-2xl px-8 py-10 bg-gradient-to-br ${bgColor} backdrop-blur-md rounded-xl border border-white/10 shadow-lg text-center`}
      >
        {illustration ? (
          <div className="w-36 h-36 mx-auto mb-6 flex items-center justify-center">
            {illustration}
          </div>
        ) : (
          <div className="w-16 h-16 mx-auto bg-surface-dark/40 rounded-full flex items-center justify-center mb-6 shadow-glow">
            <span className="text-3xl">{icon}</span>
          </div>
        )}
        <h3 className="text-2xl font-bold mb-4 text-text-primary">{title}</h3>
        <p className="text-text-secondary text-lg">{content}</p>
      </div>
    </div>
  );
};

export default DemoSlide;
