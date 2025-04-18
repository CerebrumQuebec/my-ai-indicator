import React, { ReactNode, useMemo } from "react";

interface DemoSlideProps {
  title?: string;
  content?: string;
  illustration?: ReactNode;
  bgColor?: string;
  isActive: boolean;
  type: "text" | "svg";
  animationDelay?: number;
  containerWidth: number;
  containerHeight: number;
}

const DemoSlide: React.FC<DemoSlideProps> = ({
  title,
  content,
  illustration,
  bgColor = "from-primary-600/30 to-accent-indigo/30",
  isActive,
  type,
  animationDelay = 0,
  containerWidth,
  containerHeight,
}) => {
  // Calculate sizes based on passed container dimensions
  const { textSizes, svgContainerStyle } = useMemo(() => {
    if (containerWidth === 0 || containerHeight === 0) {
      // Return default/initial sizes if dimensions are not yet available
      return {
        textSizes: {
          titleSize: "1.5rem",
          contentSize: "1rem",
          titleMargin: "1rem",
        },
        svgContainerStyle: {
          width: "80%", // Default width
          height: "80%", // Default height
          maxWidth: "500px", // Max size constraint
          maxHeight: "500px",
        },
      };
    }

    const minDimension = Math.min(containerWidth, containerHeight);
    const isFullScreen = !!document.fullscreenElement; // Keep fullscreen check for potential adjustments

    // --- Text Size Calculation --- Adjusted for better scaling & fullscreen
    // Use viewport units (vw/vh) or container dimensions for more responsive scaling
    const widthFactor = containerWidth / 100; // Represents 1vw equivalent within container
    const heightFactor = containerHeight / 100; // Represents 1vh equivalent within container

    // Base sizes using a mix of factors, slightly more aggressive
    let baseTitleVw = isFullScreen ? 5 : 3.5;
    let baseContentVw = isFullScreen ? 2.5 : 1.8;
    let baseTitleVh = isFullScreen ? 6 : 4;
    let baseContentVh = isFullScreen ? 3 : 2.2;

    // Choose the smaller dimension's factor to prevent overflow
    const titleSizeCalc = Math.min(
      widthFactor * baseTitleVw,
      heightFactor * baseTitleVh
    );
    const contentSizeCalc = Math.min(
      widthFactor * baseContentVw,
      heightFactor * baseContentVh
    );

    // Apply minimum and maximum caps (in rem)
    const finalTitleSize = Math.min(
      isFullScreen ? 8 : 5,
      Math.max(isFullScreen ? 2.5 : 1.8, titleSizeCalc / 16)
    ); // Convert px calculation to rem
    const finalContentSize = Math.min(
      isFullScreen ? 4 : 2.5,
      Math.max(isFullScreen ? 1.5 : 1.1, contentSizeCalc / 16)
    ); // Convert px calculation to rem

    // Adjust margin based on title size
    const titleMargin = `${Math.min(4, Math.max(1, finalTitleSize * 0.5))}rem`;

    const calculatedTextSizes = {
      titleSize: `${finalTitleSize}rem`,
      contentSize: `${finalContentSize}rem`,
      titleMargin: titleMargin,
    };

    // --- SVG Size Calculation ---
    // Aim for SVG to take ~80% of the smaller dimension, but allow flexibility
    const svgSize = Math.min(containerWidth * 0.85, containerHeight * 0.85);

    const calculatedSvgContainerStyle = {
      width: `${svgSize}px`,
      height: `${svgSize}px`,
      // Optional: Add max size constraints if needed, e.g.,
      // maxWidth: '90vw',
      // maxHeight: '90vh',
    };

    return {
      textSizes: calculatedTextSizes,
      svgContainerStyle: calculatedSvgContainerStyle,
    };
  }, [containerWidth, containerHeight]);

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
                  fontSize: textSizes.titleSize,
                  lineHeight: "1.2",
                  marginBottom: textSizes.titleMargin,
                  animationDelay: "0.3s",
                  animationFillMode: "forwards",
                  // Increased text shadow for better contrast
                  textShadow:
                    "0 0 10px rgba(103, 232, 249, 0.6), 0 0 25px rgba(103, 232, 249, 0.4)",
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
                  maxWidth: "80vmin", // Keep vmin for max width constraint
                  animationDelay: "0.8s",
                  animationFillMode: "forwards",
                  // Increased text shadow for better contrast
                  textShadow:
                    "0 0 8px rgba(103, 232, 249, 0.5), 0 0 15px rgba(103, 232, 249, 0.3)",
                }}
              >
                {content}
              </p>
            )}
          </div>
        ) : (
          // SVG illustration slide content
          <div className="absolute inset-0 flex items-center justify-center p-4">
            {illustration && (
              <div
                className="will-change-transform flex items-center justify-center"
                style={{
                  ...svgContainerStyle,
                  transformOrigin: "center center",
                  transition: "width 0.3s ease-in-out, height 0.3s ease-in-out",
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
