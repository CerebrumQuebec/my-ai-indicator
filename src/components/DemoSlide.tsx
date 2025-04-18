import React, { ReactNode, useEffect, useState, useRef } from "react";

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
  const [svgScale, setSvgScale] = useState(5); // Default scale
  const [textSizes, setTextSizes] = useState({
    titleSize: "2.5rem",
    contentSize: "1.2rem",
    titleMargin: "1.5rem",
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Update scale and text sizes based on container size
  useEffect(() => {
    const updateSizes = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      // Calculate the appropriate scale based on the container size
      // Use the smaller dimension to ensure SVG fits completely
      const minDimension = Math.min(rect.width, rect.height);

      // Base size is around 120px (for most SVGs in the illustrations)
      // We want it to take up about 75% of the available space
      let newScale = (minDimension * 0.75) / 120;

      // Ensure scale is reasonable and not too small or too large
      newScale = Math.max(3, Math.min(12, newScale));

      setSvgScale(newScale);

      // Calculate text sizes based on container dimensions
      const isFullScreen = !!document.fullscreenElement;
      const baseTitleSize = isFullScreen
        ? Math.max(2, minDimension * 0.035)
        : Math.max(1.5, minDimension * 0.03);

      const baseContentSize = isFullScreen
        ? Math.max(1.2, minDimension * 0.022)
        : Math.max(1, minDimension * 0.018);

      const titleMargin = isFullScreen
        ? Math.max(1.5, minDimension * 0.02)
        : Math.max(1, minDimension * 0.015);

      setTextSizes({
        titleSize: `${Math.min(4, baseTitleSize)}rem`,
        contentSize: `${Math.min(2, baseContentSize)}rem`,
        titleMargin: `${Math.min(3, titleMargin)}rem`,
      });
    };

    // Initial calculation
    updateSizes();

    // Recalculate on resize and fullscreen change
    window.addEventListener("resize", updateSizes);
    document.addEventListener("fullscreenchange", updateSizes);

    // Also update when the slide becomes active
    if (isActive) {
      // Small delay to allow transitions to complete
      const timer = setTimeout(updateSizes, 100);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("resize", updateSizes);
      document.removeEventListener("fullscreenchange", updateSizes);
    };
  }, [isActive]);

  return (
    <div
      className={`slide-container absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-1000 ${
        isActive
          ? "opacity-100 z-10 blur-none scale-100"
          : "opacity-0 z-0 blur-md scale-105"
      }`}
      style={{ transitionDelay: `${animationDelay * 0.1}s` }}
      ref={containerRef}
    >
      {/* Futuristic background effects for all slides */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
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
        <div className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-primary-600/10 animate-pulse-slow blur-3xl"></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] rounded-full bg-accent-indigo/10 animate-pulse-slow blur-3xl"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/4 w-[25vw] h-[25vw] max-w-[400px] max-h-[400px] rounded-full bg-cyan-400/5 animate-pulse-slow blur-3xl"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Scanning line effect */}
        <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary-400/50 to-transparent animate-scan-vertical"></div>

        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${bgColor} opacity-70`}
        ></div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {type === "text" ? (
          // Text slide content
          <div
            className={`w-full max-w-[90%] sm:max-w-[85%] md:max-w-[80%] lg:max-w-[70%] mx-auto text-center flex flex-col justify-center`}
          >
            {title && (
              <h3
                className="font-bold text-text-primary mx-auto text-center opacity-0 animate-cinematic-title"
                style={{
                  fontSize: textSizes.titleSize,
                  lineHeight: "1.2",
                  marginBottom: textSizes.titleMargin,
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
                className="text-text-secondary mx-auto opacity-0 animate-cinematic-text text-center leading-relaxed"
                style={{
                  fontSize: textSizes.contentSize,
                  lineHeight: "1.5",
                  maxWidth: "80vmin",
                  animationDelay: "0.8s",
                  animationFillMode: "forwards",
                  textShadow: "0 0 10px rgba(103, 232, 249, 0.3)",
                }}
              >
                {content}
              </p>
            )}
          </div>
        ) : (
          // SVG illustration slide content
          <div className="absolute inset-0 flex items-center justify-center">
            {illustration && (
              <div
                className="will-change-transform"
                style={{
                  transform: `scale(${svgScale})`,
                  transformOrigin: "center center",
                  transition: "transform 0.5s ease-in-out",
                }}
              >
                {illustration}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DemoSlide;
