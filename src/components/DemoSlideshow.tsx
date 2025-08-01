import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { debounce } from "../utils/debounce";

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
  const [controlsInactive, setControlsInactive] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [enteringFullscreen, setEnteringFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const userInteractedRef = useRef(false);
  const [containerDimensions, setContainerDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });

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
      if (slideTimerRef.current) {
        clearInterval(slideTimerRef.current);
      }
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
      }
    };
  }, []);

  // Handle unmounting
  useEffect(() => {
    return () => {
      if (isPlaying) {
        onTogglePlay();
      }
    };
  }, [isPlaying, onTogglePlay]);

  // Optimized resize handler - avoid getBoundingClientRect()
  const debouncedResizeHandler = useCallback(
    debounce((entries: ResizeObserverEntry[]) => {
      if (entries && entries.length > 0) {
        const { width, height } = entries[0].contentRect;
        // Only update if dimensions actually changed significantly
        setContainerDimensions(prev => {
          if (Math.abs(prev.width - width) > 5 || Math.abs(prev.height - height) > 5) {
            return { width, height };
          }
          return prev;
        });
      }
    }, 250), // Increased debounce for better performance
    []
  );

  // Observe container size changes - optimized
  useEffect(() => {
    const observer = new ResizeObserver(debouncedResizeHandler);
    const currentContainer = containerRef.current;

    if (currentContainer) {
      observer.observe(currentContainer);
      // Use ResizeObserver for initial size instead of getBoundingClientRect
      // This avoids forced reflow on component mount
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
      debouncedResizeHandler.cancel();
    };
  }, [debouncedResizeHandler]);

  // Function to toggle fullscreen with enhanced transition
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      // Entering fullscreen
      setEnteringFullscreen(true);

      if (playerContainerRef.current?.requestFullscreen) {
        playerContainerRef.current.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message}`
          );
          setEnteringFullscreen(false);
        });
      } else {
        setEnteringFullscreen(false);
      }
    } else {
      // Exiting fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen().catch((err) => {
          console.error(
            `Error attempting to exit full-screen mode: ${err.message}`
          );
        });
      }
    }
  };

  // Listen for fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isInFullScreen = !!document.fullscreenElement;
      setIsFullScreen(isInFullScreen);

      // Reset entering state after transition
      if (isInFullScreen) {
        setTimeout(() => {
          setEnteringFullscreen(false);
        }, 800); // Match this with the transition duration
      }

      // Always show controls briefly when fullscreen state changes
      setShowControls(true);
      startControlsTimer();
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Function to hide controls after timeout
  const startControlsTimer = () => {
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current);
    }

    controlsTimerRef.current = setTimeout(() => {
      if (isPlaying && !userInteractedRef.current) {
        setShowControls(false);
      }
      setControlsInactive(true);
    }, 3000); // Hide controls after 3 seconds
  };

  // Start slideshow timer
  const startSlideTimer = () => {
    if (slideTimerRef.current) {
      clearInterval(slideTimerRef.current);
    }

    // Advance slide every 4 seconds
    slideTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      // Don't show controls on slide change if they were already hidden
      // and the user hasn't interacted with the video
      if (controlsInactive && !userInteractedRef.current) {
        setShowControls(false);
      }
    }, 4000);
  };

  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      // Start audio
      if (audioRef.current) {
        audioRef.current.muted = isMuted;
        audioRef.current.play().catch((error) => {
          console.error("Audio playback failed:", error);
        });
      }

      // Show controls initially then hide them
      setShowControls(true);
      startControlsTimer();

      // Start slide timer
      startSlideTimer();
    } else {
      // Pause audio
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // Clear timers
      if (slideTimerRef.current) {
        clearInterval(slideTimerRef.current);
        slideTimerRef.current = null;
      }

      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current);
        controlsTimerRef.current = null;
      }

      // Always show controls when paused
      setShowControls(true);
      setControlsInactive(false);
    }

    // Reset user interaction flag when playback state changes
    userInteractedRef.current = false;

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
      if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    };
  }, [isPlaying, isMuted]);

  // Handle mouse movement and touch to show controls
  const handleInteraction = () => {
    if (isPlaying) {
      userInteractedRef.current = true;
      setShowControls(true);
      startControlsTimer();

      // Reset user interaction flag after controls hide
      setTimeout(() => {
        userInteractedRef.current = false;
      }, 3500);
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

  // Add effect to handle mute state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div
      ref={playerContainerRef}
      className={`demo-slideshow-container video-player-container w-full mx-auto select-none ${
        isFullScreen ? "fixed inset-0 z-50 bg-black" : ""
      } ${enteringFullscreen ? "animate-fullscreen-appear" : ""}`}
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
      onClick={() => {
        if (isPlaying) {
          setIsPaused(true);
          onTogglePlay();
        }
      }}
    >

      {/* Outer container with fixed aspect ratio - adjusts for fullscreen */}
      <div
        className={`relative ${
          isFullScreen ? "fullscreen-video" : "w-full pt-[56.25%]"
        } bg-black rounded-xl overflow-hidden border border-primary-600/30 shadow-lg transition-all duration-500`}
      >
        {/* Video content container */}
        <div
          ref={containerRef}
          className={`demo-slide-content ${
            isFullScreen
              ? "w-full h-full"
              : "absolute top-0 left-0 right-0 bottom-0 w-full h-full"
          } overflow-hidden transition-all duration-500`}
        >
          {/* Futuristic sci-fi background effects that are always present */}
          <div className="absolute inset-0 z-0">
            {/* Black reflective background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-surface-dark to-black"></div>

            {/* Digital noise overlay */}
            <div className="absolute inset-0 opacity-5 mix-blend-lighten">
              <div className="w-full h-full bg-[url('/images/noise.png')] animate-flicker"></div>
            </div>

            {/* Flying comets/shooting stars */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Comet 1 - top to bottom, left to right */}
              <div
                className="absolute w-40 h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-primary-200 rounded-full animate-comet opacity-0"
                style={
                  {
                    "--duration": "7s",
                    "--delay": "0s",
                    "--offset-y": "10",
                    transform: "rotate(15deg)",
                    boxShadow:
                      "0 0 10px #67E8F9, 0 0 20px rgba(103, 232, 249, 0.5)",
                  } as React.CSSProperties
                }
              ></div>

              {/* Comet 2 - top to bottom, left to right faster */}
              <div
                className="absolute w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-indigo to-white rounded-full animate-comet opacity-0"
                style={
                  {
                    "--duration": "4s",
                    "--delay": "2s",
                    "--offset-y": "25",
                    transform: "rotate(30deg)",
                    boxShadow:
                      "0 0 8px #818CF8, 0 0 16px rgba(129, 140, 248, 0.5)",
                  } as React.CSSProperties
                }
              ></div>

              {/* Comet 3 - bottom to top, right to left */}
              <div
                className="absolute w-32 h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-white rounded-full animate-comet-reverse opacity-0"
                style={
                  {
                    "--duration": "6s",
                    "--delay": "1s",
                    "--offset-y": "15",
                    transform: "rotate(-20deg)",
                    boxShadow:
                      "0 0 12px #67E8F9, 0 0 24px rgba(103, 232, 249, 0.5)",
                  } as React.CSSProperties
                }
              ></div>

              {/* Comet 4 - very fast, small streak */}
              <div
                className="absolute w-16 h-0.5 bg-gradient-to-r from-transparent via-white to-white rounded-full animate-comet opacity-0"
                style={
                  {
                    "--duration": "2.5s",
                    "--delay": "4.5s",
                    "--offset-y": "5",
                    transform: "rotate(10deg)",
                    boxShadow:
                      "0 0 5px white, 0 0 10px rgba(255, 255, 255, 0.5)",
                  } as React.CSSProperties
                }
              ></div>

              {/* Comet 5 - slow, large comet */}
              <div
                className="absolute w-48 h-1 bg-gradient-to-r from-transparent via-primary-400 to-accent-indigo rounded-full animate-comet opacity-0"
                style={
                  {
                    "--duration": "12s",
                    "--delay": "3s",
                    "--offset-y": "30",
                    transform: "rotate(25deg)",
                    boxShadow:
                      "0 0 15px #67E8F9, 0 0 30px rgba(103, 232, 249, 0.5)",
                  } as React.CSSProperties
                }
              ></div>
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
              containerWidth={containerDimensions.width}
              containerHeight={containerDimensions.height}
            />
          ))}

          {/* Control elements */}
          {!isPlaying && !isPaused && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPaused(false);
                  onTogglePlay();
                }}
                className="w-20 h-20 sm:w-24 sm:h-24 bg-primary-600/30 hover:bg-primary-600/50 rounded-full flex items-center justify-center animate-pulse relative group transition-all duration-300"
                aria-label="Play"
              >
                {/* Glowing effect around button */}
                <div className="absolute inset-0 rounded-full bg-primary-600/20 group-hover:bg-primary-600/30 blur-md transition-all duration-300"></div>
                <span className="text-4xl sm:text-5xl relative z-10">▶️</span>
              </button>
            </div>
          )}

          {!isPlaying && isPaused && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPaused(false);
                  onTogglePlay();
                }}
                className="w-20 h-20 sm:w-24 sm:h-24 bg-primary-600/30 hover:bg-primary-600/50 rounded-full flex items-center justify-center animate-pulse relative group transition-all duration-300"
                aria-label="Resume"
              >
                <div className="absolute inset-0 rounded-full bg-primary-600/20 group-hover:bg-primary-600/30 blur-md transition-all duration-300"></div>
                <span className="text-4xl sm:text-5xl relative z-10">▶️</span>
              </button>
            </div>
          )}

          {/* Video player-like controls */}
          {isPlaying && (
            <div
              ref={controlsRef}
              className={`video-controls absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-20 pb-4 px-4 z-30 transition-opacity duration-500 ${
                showControls
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Progress bar */}
              <div
                className="progress-bar-container w-full h-1.5 bg-gray-700/60 backdrop-blur-sm rounded-full mb-3 cursor-pointer relative overflow-hidden group"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!containerRef.current) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const position = (e.clientX - rect.left) / rect.width;
                  const newSlide = Math.floor(position * slides.length);
                  setCurrentSlide(
                    Math.min(Math.max(0, newSlide), slides.length - 1)
                  );
                  // Always show controls briefly after user interaction with progress bar
                  setShowControls(true);
                  startControlsTimer();
                }}
              >
                {/* Progress glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 bg-primary-400/20 blur-sm transition-opacity duration-300"></div>

                {/* Progress bar fill */}
                <div
                  className="progress-bar-fill h-full bg-gradient-to-r from-primary-600 via-accent-indigo to-primary-400 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                >
                  {/* Progress handle */}
                  <div
                    className="w-3 h-3 bg-white rounded-full absolute -top-1 shadow-glow"
                    style={{
                      left: `${progressPercentage}%`,
                      transform: "translateX(-50%)",
                      boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
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

                <div className="flex items-center space-x-2">
                  {/* Mute button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted(!isMuted);
                    }}
                    className="px-2 py-1.5 bg-surface-dark/70 backdrop-blur-md rounded-md text-sm text-text-primary border border-white/20 hover:bg-surface-dark hover:border-primary-600/30 transition-colors duration-300 flex items-center shadow-glow-sm"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    <span className="text-lg">{isMuted ? "🔇" : "🔊"}</span>
                  </button>

                  {/* Fullscreen button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullScreen();
                    }}
                    className="px-2 py-1.5 bg-surface-dark/70 backdrop-blur-md rounded-md text-sm text-text-primary border border-white/20 hover:bg-surface-dark hover:border-primary-600/30 transition-colors duration-300 flex items-center shadow-glow-sm"
                    aria-label={
                      isFullScreen ? "Exit fullscreen" : "Enter fullscreen"
                    }
                  >
                    <span className="text-lg">{isFullScreen ? "⎋" : "⛶"}</span>
                  </button>

                  {/* Stop button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsPaused(false);
                      onTogglePlay();
                    }}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoSlideshow;
