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
  title: string;
  content: string;
  bgColor: string;
}

const DemoSlideshow: React.FC<DemoSlideshowProps> = ({
  isPlaying,
  onTogglePlay,
}) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Define slides array
  const slides: SlideData[] = [
    {
      title: t("slide1Title"),
      content: t("slide1Content"),
      bgColor: "from-primary-600/30 to-accent-indigo/30",
    },
    {
      title: t("slide2Title"),
      content: t("slide2Content"),
      bgColor: "from-cyan-500/30 to-indigo-500/30",
    },
    {
      title: t("slide3Title"),
      content: t("slide3Content"),
      bgColor: "from-indigo-500/30 to-purple-500/30",
    },
    {
      title: t("slide4Title"),
      content: t("slide4Content"),
      bgColor: "from-purple-500/30 to-primary-600/30",
    },
    {
      title: t("slide5Title"),
      content: t("slide5Content"),
      bgColor: "from-primary-400/30 to-accent-indigo/30",
    },
    {
      title: t("slide6Title"),
      content: t("slide6Content"),
      bgColor: "from-accent-indigo/30 to-primary-600/30",
    },
    {
      title: t("slide7Title"),
      content: t("slide7Content"),
      bgColor: "from-primary-600/30 to-primary-400/30",
    },
  ];

  // Array of illustrations components
  const illustrations = [
    <SlideIllustration1 key="illustration1" />,
    <SlideIllustration2 key="illustration2" />,
    <SlideIllustration3 key="illustration3" />,
    <SlideIllustration4 key="illustration4" />,
    <SlideIllustration5 key="illustration5" />,
    <SlideIllustration6 key="illustration6" />,
    <SlideIllustration7 key="illustration7" />,
  ];

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
      }, 5000); // Change slide every 5 seconds
    } else if (audioRef.current) {
      audioRef.current.pause();

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, slides.length]);

  // Function to format time
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Calculate total and current time
  const totalTime = 5 * slides.length; // 5 seconds per slide
  const currentTime = currentSlide * 5;

  // Calculate progress percentage
  const progressPercentage = (currentSlide / (slides.length - 1)) * 100;

  return (
    <div className="video-player-container w-full mx-auto">
      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>

      {/* Outer container with fixed aspect ratio */}
      <div className="relative w-full pt-[56.25%] bg-black rounded-xl overflow-hidden border border-white/10 shadow-lg">
        {/* Video content container */}
        <div
          ref={containerRef}
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden"
        >
          {/* Slides */}
          {slides.map((slide, index) => (
            <DemoSlide
              key={index}
              title={slide.title}
              content={slide.content}
              bgColor={slide.bgColor}
              isActive={currentSlide === index}
              illustration={illustrations[index]}
            />
          ))}

          {/* Control elements */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-20">
              <div className="text-center px-4 sm:px-0">
                <button
                  onClick={onTogglePlay}
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-primary-600/30 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 animate-pulse hover:bg-primary-600/50 transition-colors duration-300"
                  aria-label="Play"
                >
                  <span className="text-4xl sm:text-5xl">▶️</span>
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
            <div className="video-controls absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent pt-16 pb-4 px-4 z-20 opacity-100 hover:opacity-100 transition-opacity duration-300">
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-gray-700 rounded-full mb-2 cursor-pointer">
                <div
                  className="h-full bg-primary-400 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div
                    className="w-3 h-3 bg-white rounded-full absolute top-0 -mt-0.75"
                    style={{
                      left: `${progressPercentage}%`,
                      transform: "translateY(-25%) translateX(-50%)",
                    }}
                  ></div>
                </div>
              </div>

              {/* Controls row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {/* Badge indicators */}
                  <div className="flex space-x-2">
                    <div className="px-2 py-1 bg-surface-dark/70 backdrop-blur-md rounded-md text-xs font-mono text-primary-400 border border-primary-600/30">
                      S-AI-2
                    </div>
                    <div className="px-2 py-1 bg-surface-dark/70 backdrop-blur-md rounded-md text-xs font-mono text-accent-indigo border border-accent-indigo/30">
                      V-AI-3
                    </div>
                  </div>

                  {/* Time indicator */}
                  <div className="text-white text-xs hidden sm:block">
                    {formatTime(currentTime)} / {formatTime(totalTime)}
                  </div>
                </div>

                {/* Stop button */}
                <button
                  onClick={onTogglePlay}
                  className="px-3 py-1.5 bg-surface-dark/70 backdrop-blur-md rounded-md text-sm text-text-primary border border-white/20 hover:bg-surface-dark transition-colors duration-300 flex items-center space-x-1"
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
