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

  return (
    <div className="aspect-video rounded-xl border border-white/10 overflow-hidden bg-black/60 relative">
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
          <div className="text-center">
            <button
              onClick={onTogglePlay}
              className="w-24 h-24 bg-primary-600/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse hover:bg-primary-600/50 transition-colors duration-300"
            >
              <span className="text-5xl">▶️</span>
            </button>
            <p className="text-text-primary text-lg font-medium">
              {t("demoComingSoonTitle")}
            </p>
            <p className="text-text-secondary mt-2">
              {t("demoComingSoonDescription")}
            </p>
          </div>
        </div>
      )}

      {/* Badge indicators */}
      <div className="absolute bottom-4 left-4 flex space-x-2 opacity-70 z-20">
        <div className="px-2 py-1 bg-surface-dark/70 backdrop-blur-md rounded-md text-xs font-mono text-primary-400 border border-primary-600/30">
          S-AI-2
        </div>
        <div className="px-2 py-1 bg-surface-dark/70 backdrop-blur-md rounded-md text-xs font-mono text-accent-indigo border border-accent-indigo/30">
          V-AI-3
        </div>
      </div>

      {/* Stop button if playing */}
      {isPlaying && (
        <button
          onClick={onTogglePlay}
          className="absolute bottom-4 right-4 px-3 py-1.5 bg-surface-dark/70 backdrop-blur-md rounded-md text-sm text-text-primary border border-white/20 hover:bg-surface-dark transition-colors duration-300 z-20 flex items-center space-x-1"
        >
          <span>⏹️</span>
          <span>{t("interactiveDemoStop")}</span>
        </button>
      )}

      {/* Slide indicators */}
      {isPlaying && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 z-20">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentSlide === index ? "bg-primary-400" : "bg-white/20"
              }`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DemoSlideshow;
