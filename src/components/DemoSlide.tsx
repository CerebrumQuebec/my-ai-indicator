import React, { ReactNode, useEffect, useState } from "react";

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
  // Track viewport dimensions and fullscreen state
  const [viewport, setViewport] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    isFullScreen: false,
    smallerDimension:
      typeof window !== "undefined"
        ? Math.min(window.innerWidth, window.innerHeight)
        : 0,
  });

  // Update dimensions on resize and fullscreen change
  useEffect(() => {
    const updateViewport = () => {
      const isFullScreen = !!document.fullscreenElement;
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewport({
        width,
        height,
        isFullScreen,
        smallerDimension: Math.min(width, height),
      });
    };

    // Initialize
    updateViewport();

    // Add event listeners
    window.addEventListener("resize", updateViewport);
    document.addEventListener("fullscreenchange", updateViewport);

    // Clean up
    return () => {
      window.removeEventListener("resize", updateViewport);
      document.removeEventListener("fullscreenchange", updateViewport);
    };
  }, []);

  // Dynamically calculate SVG scale based on viewport
  const getSvgStyle = (): React.CSSProperties => {
    const { smallerDimension, isFullScreen } = viewport;
    let scale = 1; // Default scale

    if (isFullScreen) {
      // Aim for SVG to take ~70% of the smaller dimension
      scale = (smallerDimension * 0.7) / 120; // 120 is base SVG size
      scale = Math.max(4, Math.min(8, scale)); // Clamp scale
    } else {
      // Scale based on container width (approximated by viewport width)
      scale = (viewport.width * 0.8) / 120;
      scale = Math.max(3, Math.min(7, scale)); // Clamp for regular view
    }

    return {
      transform: `scale(${scale})`,
      transformOrigin: "center center",
      transition: "transform 0.5s ease-in-out", // Smooth transition
      willChange: "transform",
    };
  };

  // Get text size using viewport units for better fullscreen scaling
  const getTextStyles = () => {
    const { smallerDimension, isFullScreen } = viewport;

    // Use vmin (percentage of the smaller viewport dimension) for dynamic sizing
    const baseFontSize = Math.max(1, smallerDimension * 0.01); // Base 1% of smaller dimension

    return {
      title: {
        fontSize: `${Math.min(
          isFullScreen ? 5 : 4,
          baseFontSize * (isFullScreen ? 3.5 : 2.8)
        )}vmin`,
        lineHeight: "1.2",
        marginBottom: `${Math.max(1, baseFontSize * 1.5)}vmin`,
      },
      content: {
        fontSize: `${Math.min(
          isFullScreen ? 2.8 : 2.2,
          baseFontSize * (isFullScreen ? 2 : 1.6)
        )}vmin`,
        lineHeight: "1.5",
        maxWidth: "80vmin", // Limit width based on viewport
      },
    };
  };

  const textStyles = getTextStyles();

  return (
    <div
      className={`slide-container absolute inset-0 w-full h-full flex items-center justify-center transition-all duration-1000 ${
        isActive
          ? "opacity-100 z-10 blur-none scale-100"
          : "opacity-0 z-0 blur-md scale-105"
      }`}
      style={{ transitionDelay: `${animationDelay * 0.1}s` }}
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
                  ...textStyles.title,
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
                  ...textStyles.content,
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-auto">
            {illustration && (
              <div
                className="animate-float will-change-transform"
                style={getSvgStyle()}
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
