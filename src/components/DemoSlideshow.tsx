import React, { useState, useEffect, useRef } from "react";
import DemoSlide from "./DemoSlide";
import { useTranslation } from "../contexts/TranslationContext";
import {
  SlideIllustration1,
  SlideIllustration2,
  SlideIllustration3,
  SlideIllustration4,
  SlideIllustration5,
  SlideIllustration6,
  SlideIllustration7,
} from "./slideIllustrations";

interface DemoSlideshowProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

interface SlideData {
  title?: string;
  content?: string;
  bgColor: string;
  type: "text" | "svg";
  illustration?: React.ReactNode;
}

const DemoSlideshow: React.FC<DemoSlideshowProps> = ({
  isPlaying,
  onTogglePlay,
}) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  // Create an array of slides alternating between text and SVG
  const createSlides = (): SlideData[] => {
    const slideData: SlideData[] = [];

    // Add first text slide
    slideData.push({
      title: t("slide1Title"),
      content: t("slide1Content"),
      bgColor: "from-primary-600/30 to-accent-indigo/30",
      type: "text",
    });

    // Add first SVG slide
    slideData.push({
      bgColor: "from-primary-600/30 to-accent-indigo/30",
      type: "svg",
      illustration: <SlideIllustration1 />,
    });

    // Add second text slide
    slideData.push({
      title: t("slide2Title"),
      content: t("slide2Content"),
      bgColor: "from-cyan-500/30 to-indigo-500/30",
      type: "text",
    });

    // Add second SVG slide
    slideData.push({
      bgColor: "from-cyan-500/30 to-indigo-500/30",
      type: "svg",
      illustration: <SlideIllustration2 />,
    });

    // Add third text slide
    slideData.push({
      title: t("slide3Title"),
      content: t("slide3Content"),
      bgColor: "from-indigo-500/30 to-purple-500/30",
      type: "text",
    });

    // Add third SVG slide
    slideData.push({
      bgColor: "from-indigo-500/30 to-purple-500/30",
      type: "svg",
      illustration: <SlideIllustration3 />,
    });

    // Add fourth text slide
    slideData.push({
      title: t("slide4Title"),
      content: t("slide4Content"),
      bgColor: "from-purple-500/30 to-primary-600/30",
      type: "text",
    });

    // Add fourth SVG slide
    slideData.push({
      bgColor: "from-purple-500/30 to-primary-600/30",
      type: "svg",
      illustration: <SlideIllustration4 />,
    });

    // Add fifth text slide
    slideData.push({
      title: t("slide5Title"),
      content: t("slide5Content"),
      bgColor: "from-primary-400/30 to-accent-indigo/30",
      type: "text",
    });

    // Add fifth SVG slide
    slideData.push({
      bgColor: "from-primary-400/30 to-accent-indigo/30",
      type: "svg",
      illustration: <SlideIllustration5 />,
    });

    // Add sixth text slide
    slideData.push({
      title: t("slide6Title"),
      content: t("slide6Content"),
      bgColor: "from-accent-indigo/30 to-primary-600/30",
      type: "text",
    });

    // Add sixth SVG slide
    slideData.push({
      bgColor: "from-accent-indigo/30 to-primary-600/30",
      type: "svg",
      illustration: <SlideIllustration6 />,
    });

    // Add seventh text slide
    slideData.push({
      title: t("slide7Title"),
      content: t("slide7Content"),
      bgColor: "from-primary-600/30 to-primary-400/30",
      type: "text",
    });

    // Add seventh SVG slide
    slideData.push({
      bgColor: "from-primary-600/30 to-primary-400/30",
      type: "svg",
      illustration: <SlideIllustration7 />,
    });

    return slideData;
  };

  const slides = createSlides();

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio("/sounds/futur.mp3");
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, []);

  // Handle play/pause
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });

      timerRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        // Only show controls briefly on the first slide to indicate functionality
        // but maintain current visibility state on subsequent slides
        if (currentSlide === 0) {
          setShowControls(true);
          startControlsTimer();
        }
      }, 4000); // Change slide every 4 seconds

      // Start the timer to hide controls initially
      setShowControls(true);
      startControlsTimer();
    } else if (audioRef.current) {
      audioRef.current.pause();

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Keep controls visible when paused
      setShowControls(true);
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
        controlsTimerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, [isPlaying, slides.length, currentSlide]);

  // Function to restart the controls hide timer
  const startControlsTimer = () => {
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }

    controlsTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000); // Hide controls after 3 seconds
  };

  // Handle mouse movement and touch to show controls
  const handleInteraction = () => {
    if (isPlaying) {
      setShowControls(true);
      startControlsTimer();
    }
  };

  // Function to format time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Calculate total and current time
  const totalTime = 4 * slides.length; // 4 seconds per slide
  const currentTime = currentSlide * 4;

  // Calculate progress percentage
  const progressPercentage = (currentSlide / (slides.length - 1)) * 100;

  return (
    <div
      className="video-player-container w-full mx-auto select-none"
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
    >
      <style jsx global>{`
        @keyframes cinematic-title {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes cinematic-text {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          20% {
            opacity: 0;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes float {
          0% {
            transform: scale(5) translateY(0px);
          }
          50% {
            transform: scale(5) translateY(-10px);
          }
          100% {
            transform: scale(5) translateY(0px);
          }
        }

        @keyframes scan-vertical {
          0% {
            top: 0;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        @keyframes flicker {
          0% {
            opacity: 1;
          }
          5% {
            opacity: 0.8;
          }
          10% {
            opacity: 1;
          }
          15% {
            opacity: 0.3;
          }
          20% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          71% {
            opacity: 0.5;
          }
          72% {
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes hue-rotate {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }

        .animate-cinematic-title {
          animation: cinematic-title 1.2s cubic-bezier(0.23, 1, 0.32, 1)
            forwards;
        }

        .animate-cinematic-text {
          animation: cinematic-text 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .animate-float {
          animation: float 10s ease-in-out infinite;
        }

        .animate-scan-vertical {
          animation: scan-vertical 6s linear infinite;
        }

        .animate-flicker {
          animation: flicker 4s linear infinite;
        }

        .animate-hue-rotate {
          animation: hue-rotate 30s linear infinite;
        }
      `}</style>

      {/* Outer container with fixed aspect ratio */}
      <div className="relative w-full pt-[56.25%] bg-black rounded-xl overflow-hidden border border-primary-600/30 shadow-lg">
        {/* Video content container */}
        <div
          ref={containerRef}
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden"
        >
          {/* Futuristic sci-fi background effects that are always present */}
          <div className="absolute inset-0 z-0">
            {/* Black reflective background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-surface-dark to-black"></div>

            {/* Digital noise overlay */}
            <div className="absolute inset-0 opacity-5 mix-blend-lighten">
              <div className="w-full h-full bg-[url('/images/noise.png')] animate-flicker"></div>
            </div>

            {/* Edge glow effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -inset-[2px] rounded-xl opacity-30 bg-gradient-to-r from-primary-600 via-accent-indigo to-primary-400 animate-hue-rotate"></div>
            </div>
          </div>

          {/* Slides */}
          {slides.map((slide, index) => (
            <DemoSlide
              key={index}
              title={slide.title}
              content={slide.content}
              bgColor={slide.bgColor}
              isActive={currentSlide === index}
              type={slide.type}
              illustration={slide.illustration}
              animationDelay={index % 2}
            />
          ))}

          {/* Control elements */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-20">
              <div className="text-center px-4 sm:px-0">
                <button
                  onClick={onTogglePlay}
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-primary-600/30 hover:bg-primary-600/50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse relative group transition-all duration-300"
                  aria-label="Play"
                >
                  {/* Glowing effect around button */}
                  <div className="absolute inset-0 rounded-full bg-primary-600/20 group-hover:bg-primary-600/30 blur-md transition-all duration-300"></div>
                  <span className="text-4xl sm:text-5xl relative z-10">▶️</span>
                </button>
                <p className="text-text-primary text-base sm:text-lg font-medium">
                  {t("demoComingSoonTitle")}
                </p>
                <p className="text-text-secondary mt-2 text-sm sm:text-base">
                  {t("demoComingSoonDescription")}
                </p>
              </div>
            </div>
          )}

          {/* Video player-like controls */}
          {isPlaying && (
            <div
              ref={controlsRef}
              className={`video-controls absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-20 pb-4 px-4 z-30 transition-opacity duration-500 ${
                showControls ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Progress bar */}
              <div
                className="w-full h-1.5 bg-gray-700/60 backdrop-blur-sm rounded-full mb-3 cursor-pointer relative overflow-hidden group"
                onClick={(e) => {
                  if (!containerRef.current) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const position = (e.clientX - rect.left) / rect.width;
                  const newSlide = Math.floor(position * slides.length);
                  setCurrentSlide(
                    Math.min(Math.max(0, newSlide), slides.length - 1)
                  );
                }}
              >
                {/* Progress glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 bg-primary-400/20 blur-sm transition-opacity duration-300"></div>

                <div
                  className="h-full bg-gradient-to-r from-primary-600 via-accent-indigo to-primary-400 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div
                    className="w-3 h-3 bg-white rounded-full absolute -top-1 shadow-glow"
                    style={{
                      left: `${progressPercentage}%`,
                      transform: "translateX(-50%)",
                    }}
                  ></div>
                </div>
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Badge indicators */}
                  <div className="flex space-x-2">
                    <div className="px-2 py-1 bg-surface-dark/70 backdrop-blur-md rounded-md text-xs font-mono text-primary-400 border border-primary-600/30 shadow-glow-sm">
                      S-AI-2
                    </div>
                    <div className="px-2 py-1 bg-surface-dark/70 backdrop-blur-md rounded-md text-xs font-mono text-accent-indigo border border-accent-indigo/30 shadow-glow-sm">
                      V-AI-3
                    </div>
                  </div>

                  {/* Time indicator */}
                  <div className="text-white text-xs hidden sm:block backdrop-blur-sm bg-surface-dark/50 px-2 py-0.5 rounded">
                    {formatTime(currentTime)} / {formatTime(totalTime)}
                  </div>
                </div>

                {/* Stop button */}
                <button
                  onClick={onTogglePlay}
                  className="px-3 py-1.5 bg-surface-dark/70 backdrop-blur-md rounded-md text-sm text-text-primary border border-white/20 hover:bg-surface-dark hover:border-primary-600/30 transition-colors duration-300 flex items-center space-x-1 shadow-glow-sm"
                  aria-label="Stop"
                >
                  <span>⏹️</span>
                  <span className="hidden sm:inline ml-1">
                    {t("interactiveDemoStop")}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoSlideshow;
