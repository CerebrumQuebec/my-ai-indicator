"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslation } from "../../contexts/TranslationContext";
import Image from "next/image";

export default function Future() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"software" | "social" | "media">(
    "software"
  );
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [animatedElements, setAnimatedElements] = useState<Set<string>>(
    new Set()
  );
  const [aiSlider, setAiSlider] = useState(50);

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setAnimatedElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observe all elements with the 'animate-on-scroll' class
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      if (observerRef.current) observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  // Helper function to check if an element should be animated
  const isAnimated = (id: string) => animatedElements.has(id);

  // Mockup data for integrated platforms
  const integrations = {
    software: [
      {
        name: "Adobe Photoshop",
        icon: "🖌️",
        badge: "V-AI-2",
        description: "AI-assisted image editing",
      },
      {
        name: "Logic Pro",
        icon: "🎵",
        badge: "S-AI-1",
        description: "AI audio filtering enhancements",
      },
      {
        name: "Canva",
        icon: "🎨",
        badge: "V-AI-3",
        description: "AI-directed design generation",
      },
      {
        name: "Microsoft Word",
        icon: "📝",
        badge: "T-AI-1",
        description: "Grammar and style suggestions",
      },
      {
        name: "Final Cut Pro",
        icon: "🎬",
        badge: "V-AI-2",
        description: "AI video enhancement",
      },
      {
        name: "ChatGPT",
        icon: "🤖",
        badge: "T-AI-4",
        description: "Pure AI text generation",
      },
    ],
    social: [
      {
        name: "Instagram",
        icon: "📸",
        badge: "V-AI-3",
        description: "AI-enhanced photography",
      },
      {
        name: "Facebook",
        icon: "👥",
        badge: "T-AI-2",
        description: "AI-collaborative post writing",
      },
      {
        name: "X / Twitter",
        icon: "🐦",
        badge: "T-AI-1",
        description: "AI-assisted tweet suggestion",
      },
      {
        name: "TikTok",
        icon: "📱",
        badge: "V-AI-2",
        description: "AI video effects",
      },
      {
        name: "YouTube",
        icon: "▶️",
        badge: "S-AI-2",
        description: "AI-enhanced audio mixing",
      },
      {
        name: "LinkedIn",
        icon: "💼",
        badge: "T-AI-2",
        description: "AI-collaborative article writing",
      },
    ],
    media: [
      {
        name: "Spotify",
        icon: "🎧",
        badge: "S-AI-2",
        description: "AI-collaborative music",
      },
      {
        name: "Netflix",
        icon: "🍿",
        badge: "V-AI-3",
        description: "AI-directed visual content",
      },
      {
        name: "News Outlets",
        icon: "📰",
        badge: "T-AI-1",
        description: "AI-assisted journalism",
      },
      {
        name: "Digital Art Galleries",
        icon: "🖼️",
        badge: "V-AI-3",
        description: "AI-directed artwork",
      },
      {
        name: "Podcast Platforms",
        icon: "🎙️",
        badge: "S-AI-1",
        description: "AI-assisted audio production",
      },
      {
        name: "E-Books",
        icon: "📚",
        badge: "T-AI-2",
        description: "AI-collaborative writing",
      },
    ],
  };

  return (
    <div className="min-h-screen">
      {/* Futuristic background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-surface-dark to-black opacity-90"></div>
        <div className="absolute top-20 right-20 w-[30vw] h-[30vw] rounded-full bg-primary-600/20 animate-pulse-slow blur-3xl"></div>
        <div
          className="absolute bottom-40 left-20 w-[25vw] h-[25vw] rounded-full bg-accent-indigo/20 animate-pulse-slow blur-3xl"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/3 w-[35vw] h-[35vw] rounded-full bg-primary-400/10 animate-pulse-slow blur-3xl"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Digital network lines */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 50 0 L 0 0 0 50"
                  fill="none"
                  stroke="rgba(103, 232, 249, 0.2)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 relative">
        {/* Hero Section */}
        <section className="text-center mb-20 pt-10">
          <h1
            id="hero-title"
            className="animate-on-scroll text-5xl md:text-7xl font-extrabold mb-6 tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-accent-indigo to-primary-600">
              {t("futureTitle")}
            </span>
          </h1>
          <p
            id="hero-subtitle"
            className="animate-on-scroll text-2xl md:text-3xl text-text-primary font-light max-w-3xl mx-auto leading-relaxed"
          >
            {t("futureSubtitle")}
          </p>

          <div
            id="hero-badges"
            className="animate-on-scroll flex flex-wrap justify-center gap-4 mt-10"
          >
            {["S", "V", "T"].map((type) => (
              <div
                key={`badge-${type}`}
                className="flex items-center px-4 py-2 bg-surface-dark/80 backdrop-blur-md rounded-full border border-primary-600/30 shadow-glow"
              >
                <span className="text-lg font-mono font-bold mr-2 text-primary-400">
                  {type}
                </span>
                <span className="text-sm text-text-secondary">AI</span>
                <span className="flex ml-2">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <span
                      key={`${type}-level-${level}`}
                      className={`w-2 h-6 mx-0.5 ${
                        level < 3 ? "bg-primary-600/80" : "bg-primary-600/30"
                      } rounded-sm`}
                    />
                  ))}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Vision Statement */}
        <section
          id="vision"
          className="animate-on-scroll mb-20 max-w-4xl mx-auto bg-surface-card/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-text-primary">
            {t("futureVisionTitle")}
          </h2>
          <p className="text-text-secondary mb-4 text-lg">
            {t("futureVisionDescription")}
          </p>

          <div className="flex items-center justify-center p-6 bg-surface-dark/50 rounded-xl border border-white/5">
            <blockquote className="italic text-xl text-center text-primary-300">
              {t("futureVisionQuote")}
              <footer className="text-right text-sm text-text-secondary mt-2">
                — Philippe Bourque
              </footer>
            </blockquote>
          </div>
        </section>

        {/* Badge Definition Section */}
        <section
          id="badge-definition"
          className="animate-on-scroll mb-20 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-text-primary">
            {t("badgeDefinitionTitle")}
          </h2>

          <div className="bg-surface-card/40 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <div className="mb-8">
              <label className="block text-text-primary text-sm mb-2">
                {t("adjustAIContribution")}{" "}
                <span className="text-primary-400 font-mono">{aiSlider}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={aiSlider}
                onChange={(e) => setAiSlider(parseInt(e.target.value))}
                className="w-full h-2 bg-surface-dark rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>{t("humanOnly")}</span>
                <span>{t("aiGenerated")}</span>
              </div>
            </div>

            <div className="relative h-48 bg-surface-dark/70 rounded-lg border border-white/5 overflow-hidden mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-xs">
                  <div className="h-4 bg-surface-light/10 rounded-full mb-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500"
                      style={{ width: `${100 - aiSlider}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-green-400">
                      {t("humanPercentage").replace(
                        "{{percentage}}",
                        (100 - aiSlider).toString()
                      )}
                    </span>
                    <span className="text-blue-500">
                      {t("aiPercentage").replace(
                        "{{percentage}}",
                        aiSlider.toString()
                      )}
                    </span>
                  </div>

                  <div className="mt-6 space-y-2">
                    {[
                      { name: t("originalComposition"), aiThreshold: 0 },
                      { name: t("colorCorrection"), aiThreshold: 15 },
                      { name: t("objectRemoval"), aiThreshold: 30 },
                      { name: t("backgroundGeneration"), aiThreshold: 45 },
                    ].map((activity) => (
                      <div
                        key={activity.name}
                        className="flex justify-between items-center"
                      >
                        <span className="text-text-secondary text-xs">
                          {activity.name}
                        </span>
                        <span
                          className={`text-xs font-mono px-2 py-0.5 rounded ${
                            aiSlider > activity.aiThreshold
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-green-500/20 text-green-400"
                          }`}
                        >
                          {aiSlider > activity.aiThreshold
                            ? t("activityStatus")
                            : t("humanOnly")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  letter: "S",
                  title: t("soundsCategory"),
                  description: t("soundsDescription"),
                  color: "text-cyan-400",
                  bg: "bg-cyan-500/20",
                  border: "border-cyan-500/30",
                },
                {
                  letter: "V",
                  title: t("visualCategory"),
                  description: t("visualDescription"),
                  color: "text-indigo-400",
                  bg: "bg-indigo-500/20",
                  border: "border-indigo-500/30",
                },
                {
                  letter: "T",
                  title: t("textCategory"),
                  description: t("textDescription"),
                  color: "text-purple-400",
                  bg: "bg-purple-500/20",
                  border: "border-purple-500/30",
                },
              ].map((type) => (
                <div
                  key={`type-${type.letter}`}
                  className={`p-6 rounded-xl ${type.bg} ${type.border} flex flex-col items-center text-center`}
                >
                  <div
                    className={`w-16 h-16 flex items-center justify-center rounded-full ${type.bg} border ${type.border} mb-4`}
                  >
                    <span
                      className={`text-3xl font-mono font-bold ${type.color}`}
                    >
                      {type.letter}
                    </span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${type.color}`}>
                    {type.title}
                  </h3>
                  <p className="text-text-secondary">{type.description}</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {[0, 1, 2, 3, 4].map((level) => (
                      <span
                        key={`${type.letter}-level-${level}`}
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-mono ${type.bg} ${type.color} ${type.border}`}
                      >
                        {type.letter}-AI-{level}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Section: Auto-Integration Examples */}
        <section
          id="auto-integration"
          className="animate-on-scroll mb-20 max-w-4xl mx-auto bg-surface-card/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-text-primary">
            {t("realTimeDetectionTitle")}
          </h2>

          <div className="space-y-8">
            {/* ChatGPT Example */}
            <div className="bg-surface-dark/50 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🤖</span>
                  <h3 className="text-xl font-bold text-text-primary">
                    {t("chatGPTIntegrationTitle")}
                  </h3>
                </div>
                <div className="flex items-center px-3 py-1 bg-primary-600/20 rounded-full">
                  <span className="text-xs font-mono text-primary-400 animate-pulse">
                    T-AI-4
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-text-secondary mb-4">
                  {t("chatGPTIntegrationDescription")}
                </p>
                <ul className="space-y-2 text-text-secondary ml-6 list-disc">
                  <li>{t("aiPromptRefinement")}</li>
                  <li>{t("aiComplexityLevel")}</li>
                  <li>{t("humanEditing")}</li>
                </ul>
                <div className="mt-6 bg-surface-dark/70 p-4 rounded-lg border border-white/5">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm">👤</span>
                    </div>
                    <div>
                      <p className="text-text-secondary text-sm mb-1">
                        {t("userPromptExample")}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs font-mono text-primary-400 bg-primary-600/10 px-2 py-0.5 rounded">
                          T-AI-0
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 mt-4">
                    <div className="w-8 h-8 bg-accent-indigo/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm">🤖</span>
                    </div>
                    <div>
                      <p className="text-text-secondary text-sm mb-1">
                        {t("aiResponseExample")}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs font-mono text-accent-indigo bg-accent-indigo/10 px-2 py-0.5 rounded">
                          T-AI-4
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photoshop Example */}
            <div className="bg-surface-dark/50 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🖌️</span>
                  <h3 className="text-xl font-bold text-text-primary">
                    {t("photoshopIntegrationTitle")}
                  </h3>
                </div>
                <div className="flex items-center px-3 py-1 bg-primary-600/20 rounded-full">
                  <span className="text-xs font-mono text-primary-400">
                    V-AI-<span className="animate-pulse">2</span>
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="relative h-48 bg-surface-dark/70 rounded-lg border border-white/5 overflow-hidden mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-xs">
                      <div className="h-4 bg-surface-light/10 rounded-full mb-3 overflow-hidden">
                        <div className="h-full w-3/4 bg-gradient-to-r from-primary-400 to-accent-indigo"></div>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-primary-400">Human: 75%</span>
                        <span className="text-accent-indigo">AI: 25%</span>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-text-secondary text-xs">
                            {t("originalComposition")}
                          </span>
                          <span className="text-xs font-mono text-primary-400 bg-primary-600/10 px-2 py-0.5 rounded">
                            {t("humanOnly")}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-text-secondary text-xs">
                            {t("colorCorrection")}
                          </span>
                          <span className="text-xs font-mono text-accent-indigo bg-accent-indigo/10 px-2 py-0.5 rounded">
                            {t("aiAssisted")}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-text-secondary text-xs">
                            {t("objectRemoval")}
                          </span>
                          <span className="text-xs font-mono text-accent-indigo bg-accent-indigo/10 px-2 py-0.5 rounded">
                            {t("aiGenerated")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-text-secondary">
                  {t("photoshopIntegrationDescription")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Metadata Protocol Animation Section */}
        <section
          id="protocol-animation"
          className="animate-on-scroll mb-20 max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-10 text-center text-text-primary">
            {t("metadataProtocolTitle")}
          </h2>

          <div className="relative h-96 bg-surface-card/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-20 z-0">
              <svg
                width="100%"
                height="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    id="smallgrid"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 20 0 L 0 0 0 20"
                      fill="none"
                      stroke="rgba(103, 232, 249, 0.3)"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#smallgrid)" />
              </svg>
            </div>

            {/* Animation elements */}
            <div className="relative h-full flex flex-col md:flex-row items-center justify-around z-20">
              {/* Creation Source */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-surface-dark rounded-xl border border-primary-600/30 flex items-center justify-center mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-surface-dark z-10"></div>
                  <span className="text-3xl relative z-30">💻</span>

                  {/* Pulse animation */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div
                      className="w-full h-full bg-primary-600/10 rounded-full scale-0 animate-ping"
                      style={{ animationDuration: "3s" }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm font-medium text-text-primary z-30">
                  Creation Software
                </p>
                <p className="text-xs text-text-secondary text-center mt-1 z-30">
                  Embeds Badge AI metadata
                </p>
              </div>

              {/* Animation of data packets moving */}
              <div className="w-full max-w-xs h-20 relative my-8 md:my-0 flex-shrink-0 z-30">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary-600/30"></div>

                {/* Animated data packets */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-8 bg-surface-dark border border-primary-600/50 rounded-md flex items-center justify-center transform -translate-x-1/2 animate-float z-40"
                  style={{ animationDuration: "8s", left: "20%" }}
                >
                  <span className="text-xs font-mono text-primary-400">
                    S-AI-2
                  </span>
                </div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-8 bg-surface-dark border border-accent-indigo/50 rounded-md flex items-center justify-center transform -translate-x-1/2 animate-float z-40"
                  style={{
                    animationDuration: "8s",
                    animationDelay: "1s",
                    left: "40%",
                  }}
                >
                  <span className="text-xs font-mono text-accent-indigo">
                    V-AI-3
                  </span>
                </div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-8 bg-surface-dark border border-primary-400/50 rounded-md flex items-center justify-center transform -translate-x-1/2 animate-float z-40"
                  style={{
                    animationDuration: "8s",
                    animationDelay: "2s",
                    left: "60%",
                  }}
                >
                  <span className="text-xs font-mono text-primary-400">
                    T-AI-1
                  </span>
                </div>

                {/* Protocol labels */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-text-secondary z-30">
                  Badge AI Metadata Protocol
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-text-secondary z-30">
                  Standardized Format
                </div>
              </div>

              {/* Consumption Destination */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-surface-dark rounded-xl border border-accent-indigo/30 flex items-center justify-center mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/20 to-surface-dark z-10"></div>
                  <span className="text-3xl relative z-30">📱</span>

                  {/* Reception animation */}
                  <div className="absolute inset-0 z-20">
                    <svg className="w-full h-full" viewBox="0 0 80 80">
                      <circle
                        cx="40"
                        cy="40"
                        r="30"
                        fill="none"
                        stroke="rgba(99, 102, 241, 0.2)"
                        strokeWidth="1"
                        className="animate-pulse-slow"
                      />
                      <circle
                        cx="40"
                        cy="40"
                        r="20"
                        fill="none"
                        stroke="rgba(99, 102, 241, 0.3)"
                        strokeWidth="1"
                        className="animate-pulse-slow"
                        style={{ animationDelay: "0.5s" }}
                      />
                    </svg>
                  </div>
                </div>
                <p className="text-sm font-medium text-text-primary z-30">
                  Display Platform
                </p>
                <p className="text-xs text-text-secondary text-center mt-1 z-30">
                  Reads & displays Badge AI
                </p>
              </div>
            </div>

            {/* Protocol details */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-30">
              <div className="bg-surface-dark/70 backdrop-blur-md rounded-md px-4 py-2 border border-white/10 text-xs text-text-secondary flex items-center">
                <span className="font-mono text-primary-400 mr-2">
                  {'<BadgeAI type="T" level="3" components="[{...}]" />'}
                </span>
                <span>Universal Metadata Standard</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-white/10 transition-all duration-300 hover:shadow-glow-sm hover:border-primary-500/30">
              <h3 className="text-lg font-bold mb-2 text-text-primary">
                {t("automaticDetectionTitle")}
              </h3>
              <p className="text-sm text-text-secondary">
                Software analyzes AI usage patterns in real-time, generating
                standardized metadata documenting the exact AI contribution.
              </p>
            </div>

            <div className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-white/10 transition-all duration-300 hover:shadow-glow-sm hover:border-primary-500/30">
              <h3 className="text-lg font-bold mb-2 text-text-primary">
                {t("seamlessTransferTitle")}
              </h3>
              <p className="text-sm text-text-secondary">
                Badge AI metadata persists through file transfers, conversions,
                and sharing across the entire digital ecosystem.
              </p>
            </div>

            <div className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-white/10 transition-all duration-300 hover:shadow-glow-sm hover:border-primary-500/30">
              <h3 className="text-lg font-bold mb-2 text-text-primary">
                {t("universalDisplayTitle")}
              </h3>
              <p className="text-sm text-text-secondary">
                All digital platforms can recognize and display the Badge AI
                indicators, providing instant transparency.
              </p>
            </div>
          </div>
        </section>

        {/* Content Transformation Journey Section */}
        <section
          id="content-journey"
          className="animate-on-scroll mb-20 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-text-primary">
            {t("contentJourneyTitle")}
          </h2>

          <div className="bg-surface-card/40 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <p className="text-text-secondary mb-8 text-center">
              {t("contentJourneyDescription")}
            </p>

            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-0.5 bg-primary-600/30"></div>

              <div className="space-y-16">
                {/* Step 1: iPhone */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-[calc(50%-2rem)] text-right md:pr-8 mb-6 md:mb-0">
                    <div className="inline-block bg-surface-dark/70 rounded-xl p-6 border border-white/5">
                      <div className="flex items-center justify-end mb-4">
                        <span className="text-2xl mr-3">📱</span>
                        <h3 className="text-xl font-bold text-text-primary">
                          iPhone Camera
                        </h3>
                      </div>
                      <p className="text-text-secondary text-sm mb-3">
                        {t("iphoneStepDescription")}
                      </p>
                      <div className="flex justify-end">
                        <span className="text-xs font-mono text-primary-400 bg-primary-600/10 px-2 py-0.5 rounded">
                          V-AI-1
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-12 h-12 flex-shrink-0 z-10">
                    <div className="absolute w-12 h-12 bg-surface-dark rounded-full border-2 border-primary-600 flex items-center justify-center">
                      <span className="text-lg">1</span>
                    </div>
                  </div>

                  <div className="w-full md:w-[calc(50%-2rem)] md:pl-8">
                    {/* Metadata Display */}
                    <div className="bg-surface-dark/60 rounded-lg p-3 font-mono text-xs overflow-hidden border border-white/5">
                      <pre className="text-primary-400 text-[10px] text-left">
                        {`{
  "badgeAI": {
    "version": "1.0",
    "types": {
      "visual": { "level": 1 }
    },
    "history": [
      {
        "tool": "iPhone Camera",
        "timestamp": "2025-03-01T10:00:00Z"
      }
    ]
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Step 2: ChatGPT */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-[calc(50%-2rem)] mb-6 md:mb-0 order-1 md:order-2">
                    <div className="inline-block bg-surface-dark/70 rounded-xl p-6 border border-white/5">
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-3">🤖</span>
                        <h3 className="text-xl font-bold text-text-primary">
                          ChatGPT
                        </h3>
                      </div>
                      <p className="text-text-secondary text-sm mb-3">
                        {t("chatgptStepDescription")}
                      </p>
                      <div className="flex">
                        <span className="text-xs font-mono text-accent-indigo bg-accent-indigo/10 px-2 py-0.5 rounded">
                          V-AI-3
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-12 h-12 flex-shrink-0 z-10 order-2 md:order-1">
                    <div className="absolute w-12 h-12 bg-surface-dark rounded-full border-2 border-primary-600 flex items-center justify-center">
                      <span className="text-lg">2</span>
                    </div>
                  </div>

                  <div className="w-full md:w-[calc(50%-2rem)] md:text-right md:pr-8 order-3 md:order-0">
                    {/* Metadata Display */}
                    <div className="bg-surface-dark/60 rounded-lg p-3 font-mono text-xs overflow-hidden border border-white/5">
                      <pre className="text-primary-400 text-[10px] text-left">
                        {`{
  "badgeAI": {
    "version": "1.0",
    "types": {
      "visual": { "level": 3 }
    },
    "history": [
      {
        "tool": "iPhone Camera",
        "timestamp": "2025-03-01T10:00:00Z",
        "badge": "V-AI-1"
      },
      {
        "tool": "ChatGPT Image Gen",
        "timestamp": "2025-03-01T14:30:00Z"
      }
    ]
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Step 3: Photoshop */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-[calc(50%-2rem)] text-right md:pr-8 mb-6 md:mb-0">
                    <div className="inline-block bg-surface-dark/70 rounded-xl p-6 border border-white/5">
                      <div className="flex items-center justify-end mb-4">
                        <span className="text-2xl mr-3">🖌️</span>
                        <h3 className="text-xl font-bold text-text-primary">
                          Adobe Photoshop
                        </h3>
                      </div>
                      <p className="text-text-secondary text-sm mb-3">
                        {t("photoshopStepDescription")}
                      </p>
                      <div className="flex justify-end">
                        <span className="text-xs font-mono text-primary-400 bg-primary-600/10 px-2 py-0.5 rounded">
                          V-AI-2
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-12 h-12 flex-shrink-0 z-10">
                    <div className="absolute w-12 h-12 bg-surface-dark rounded-full border-2 border-primary-600 flex items-center justify-center">
                      <span className="text-lg">3</span>
                    </div>
                  </div>

                  <div className="w-full md:w-[calc(50%-2rem)] md:pl-8">
                    {/* Metadata Display */}
                    <div className="bg-surface-dark/60 rounded-lg p-3 font-mono text-xs overflow-hidden border border-white/5">
                      <pre className="text-primary-400 text-[10px] text-left">
                        {`{
  "badgeAI": {
    "version": "1.0",
    "types": {
      "visual": { 
        "level": 2,
        "components": [
          {
            "name": "Base image",
            "humanContribution": 0,
            "aiContribution": 100,
            "aiTools": ["ChatGPT"]
          },
          {
            "name": "Retouching",
            "humanContribution": 80,
            "aiContribution": 20,
            "aiTools": ["Adobe Sensei"]
          }
        ]
      }
    },
    "history": [
      {
        "tool": "iPhone Camera",
        "timestamp": "2025-03-01T10:00:00Z",
        "badge": "V-AI-1"
      },
      {
        "tool": "ChatGPT Image Gen",
        "timestamp": "2025-03-01T14:30:00Z",
        "badge": "V-AI-3"
      },
      {
        "tool": "Adobe Photoshop",
        "timestamp": "2025-03-01T16:45:00Z"
      }
    ]
  }
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Step 4: Instagram */}
                <div className="flex flex-col md:flex-row items-center">
                  <div className="w-full md:w-[calc(50%-2rem)] mb-6 md:mb-0 order-1 md:order-2">
                    <div className="inline-block bg-surface-dark/70 rounded-xl p-6 border border-white/5">
                      <div className="flex items-center mb-4">
                        <span className="text-2xl mr-3">📸</span>
                        <h3 className="text-xl font-bold text-text-primary">
                          Instagram
                        </h3>
                      </div>
                      <p className="text-text-secondary text-sm mb-3">
                        {t("instagramStepDescription")}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono text-primary-400 bg-primary-600/10 px-2 py-0.5 rounded">
                          V-AI-2
                        </span>
                        <span className="text-text-secondary text-[10px]">
                          {t("viewHistory")} →
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-12 h-12 flex-shrink-0 z-10 order-2 md:order-1">
                    <div className="absolute w-12 h-12 bg-surface-dark rounded-full border-2 border-accent-indigo flex items-center justify-center animate-pulse">
                      <span className="text-lg">4</span>
                    </div>
                  </div>

                  <div className="w-full md:w-[calc(50%-2rem)] md:text-right md:pr-8 order-3 md:order-0">
                    {/* User interface showing the badge history */}
                    <div className="bg-surface-dark/60 rounded-lg overflow-hidden border border-white/5">
                      <div className="p-2 border-b border-white/10 bg-surface-dark/80">
                        <h4 className="text-xs font-medium text-text-primary">
                          {t("aiContributionHistory")}
                        </h4>
                      </div>
                      <div className="p-3">
                        <div className="space-y-2">
                          {[
                            {
                              tool: "iPhone Camera",
                              time: "10:00 AM",
                              level: "V-AI-1",
                              date: "Mar 1",
                            },
                            {
                              tool: "ChatGPT Image",
                              time: "2:30 PM",
                              level: "V-AI-3",
                              date: "Mar 1",
                            },
                            {
                              tool: "Adobe Photoshop",
                              time: "4:45 PM",
                              level: "V-AI-2",
                              date: "Mar 1",
                            },
                          ].map((entry, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between text-[10px]"
                            >
                              <div className="flex items-center">
                                <span className="w-3 h-3 rounded-full bg-primary-600/50 mr-2"></span>
                                <span className="text-text-primary">
                                  {entry.tool}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="text-text-secondary">
                                  {entry.date} {entry.time}
                                </span>
                                <span
                                  className={`px-1.5 py-0.5 rounded ${
                                    entry.level === "V-AI-3"
                                      ? "bg-accent-indigo/20 text-accent-indigo"
                                      : "bg-primary-600/10 text-primary-400"
                                  }`}
                                >
                                  {entry.level}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Implementation Section */}
        <section
          id="technical-implementation"
          className="animate-on-scroll mb-20 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-text-primary">
            Technical Implementation
          </h2>

          <div className="space-y-8">
            {/* Metadata Schema */}
            <div className="bg-surface-card/40 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-primary-400">
                {t("metadataSchemaTitle")}
              </h3>
              <div className="bg-surface-dark/70 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-text-secondary text-left">
                  {`{
  "badgeAI": {
    "version": "1.0",
    "types": {
      "visual": {
        "level": 2,
        "components": [
          {
            "name": "Composition",
            "humanContribution": 90,
            "aiContribution": 10,
            "aiTools": ["Adobe Firefly"]
          },
          {
            "name": "Color Grading",
            "humanContribution": 30,
            "aiContribution": 70,
            "aiTools": ["Adobe Sensei"]
          }
        ]
      }
    },
    "history": [
      {
        "tool": "iPhone Camera",
        "timestamp": "2025-03-01T10:00:00Z",
        "badge": "V-AI-1"
      },
      {
        "tool": "Adobe Photoshop",
        "timestamp": "2025-03-02T14:30:00Z",
        "badge": "V-AI-2"
      }
    ],
    "timestamp": "2025-04-01T12:34:56Z",
    "signature": "ed25519:abcdef1234567890"
  }
}`}
                </pre>
              </div>
              <p className="text-xs text-text-secondary mt-2 italic text-center">
                {t("metadataSchemaNote")}
              </p>
            </div>

            {/* Embedding Methods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🖼️</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-text-primary">
                  Image Files
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Badge AI metadata embedded in EXIF/XMP data for seamless
                  integration with existing image workflows.
                </p>
                <div className="bg-surface-dark/70 rounded-lg p-3 font-mono text-xs">
                  <code className="text-primary-400">
                    {'<x:xmpmeta xmlns:x="adobe:ns:meta/">'}
                  </code>
                </div>
              </div>

              <div className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-accent-indigo/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📄</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-text-primary">
                  HTML Documents
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Simple meta tags for web content, making Badge AI data easily
                  accessible to browsers and crawlers.
                </p>
                <div className="bg-surface-dark/70 rounded-lg p-3 font-mono text-xs">
                  <code className="text-accent-indigo">
                    {
                      '<meta name="badge-ai" content=\'{"type":"text","level":3}\'>'
                    }
                  </code>
                </div>
              </div>

              <div className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-white/10">
                <div className="w-12 h-12 bg-primary-400/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎵</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-text-primary">
                  Audio Files
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  Badge AI data stored in ID3 tags or BWF chunks for
                  comprehensive audio file support.
                </p>
                <div className="bg-surface-dark/70 rounded-lg p-3 font-mono text-xs">
                  <code className="text-primary-400">
                    {"ID3v2.4.0+badgeai/1.0"}
                  </code>
                </div>
              </div>
            </div>

            {/* API Integration */}
            <div className="bg-surface-card/40 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-primary-400">
                {t("apiIntegrationTitle")}
              </h3>
              <p className="text-text-secondary mb-6">
                Simple REST API for software platforms to implement Badge AI:
              </p>
              <div className="bg-surface-dark/70 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                <pre className="text-text-secondary">
                  {`// Generate Badge AI metadata
const response = await fetch('https://api.badgeai.org/v1/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    content_type: 'image',
    ai_tools_used: ['Midjourney', 'Photoshop'],
    human_editing_time: 45, // minutes
    ai_generation_steps: 3
  })
});

const badgeMetadata = await response.json();`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="animate-on-scroll mb-20 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-text-primary">
            {t("integrationPathTitle")}
          </h2>

          <div className="space-y-8">
            {/* Step 1: Automatic Detection */}
            <div className="flex flex-col md:flex-row gap-6 items-center bg-surface-card/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="w-full md:w-1/3 flex-shrink-0">
                <div className="aspect-square bg-surface-dark/70 rounded-2xl flex items-center justify-center p-6 border border-white/5">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-primary-600/20 rounded-full flex items-center justify-center">
                        <span className="text-3xl">🧠</span>
                      </div>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="rgba(103, 232, 249, 0.2)"
                        strokeWidth="1"
                        strokeDasharray="2 4"
                        className="animate-spin-slow"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-bold mb-2 text-primary-400">
                  {t("automaticDetectionAndBadgingTitle")}
                </h3>
                <p className="text-text-secondary">
                  {t("automaticDetectionDescription")}
                </p>
              </div>
            </div>

            {/* Step 2: Standardization */}
            <div className="flex flex-col md:flex-row gap-6 items-center bg-surface-card/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="w-full md:w-1/3 flex-shrink-0 order-first md:order-last">
                <div className="aspect-square bg-surface-dark/70 rounded-2xl flex items-center justify-center p-6 border border-white/5">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-accent-indigo/20 rounded-full flex items-center justify-center">
                        <span className="text-3xl">🔄</span>
                      </div>
                    </div>
                    <div className="absolute inset-0">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <polygon
                          points="50,10 60,30 40,30"
                          fill="rgba(99, 102, 241, 0.4)"
                          className="origin-center animate-pulse-slow"
                        />
                        <polygon
                          points="90,50 70,60 70,40"
                          fill="rgba(99, 102, 241, 0.4)"
                          className="origin-center animate-pulse-slow"
                          style={{ animationDelay: "0.5s" }}
                        />
                        <polygon
                          points="50,90 40,70 60,70"
                          fill="rgba(99, 102, 241, 0.4)"
                          className="origin-center animate-pulse-slow"
                          style={{ animationDelay: "1s" }}
                        />
                        <polygon
                          points="10,50 30,40 30,60"
                          fill="rgba(99, 102, 241, 0.4)"
                          className="origin-center animate-pulse-slow"
                          style={{ animationDelay: "1.5s" }}
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-bold mb-2 text-accent-indigo">
                  {t("globalStandardsTitle")}
                </h3>
                <p className="text-text-secondary">
                  {t("globalStandardsDescription")}
                </p>
              </div>
            </div>

            {/* Step 3: Verification */}
            <div className="flex flex-col md:flex-row gap-6 items-center bg-surface-card/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="w-full md:w-1/3 flex-shrink-0">
                <div className="aspect-square bg-surface-dark/70 rounded-2xl flex items-center justify-center p-6 border border-white/5">
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-primary-600/20 rounded-full flex items-center justify-center">
                        <span className="text-3xl">👁️</span>
                      </div>
                    </div>
                    <div className="absolute inset-0">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="rgba(139, 92, 246, 0.2)"
                          strokeWidth="1"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="30"
                          fill="none"
                          stroke="rgba(139, 92, 246, 0.3)"
                          strokeWidth="1"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="15"
                          fill="none"
                          stroke="rgba(139, 92, 246, 0.4)"
                          strokeWidth="1"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-bold mb-2 text-primary-600">
                  {t("effortlessVerificationTitle")}
                </h3>
                <p className="text-text-secondary">
                  {t("effortlessVerificationDescription")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section
          id="benefits"
          className="animate-on-scroll mb-20 max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-10 text-center text-text-primary">
            {t("digitalTrustTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-card/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:shadow-glow-sm hover:border-primary-500/30">
              <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-primary">
                {t("protectionTitle")}
              </h3>
              <p className="text-text-secondary">
                {t("protectionDescription")}
              </p>
            </div>

            <div className="bg-surface-card/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:shadow-glow-sm hover:border-primary-500/30">
              <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">⚖️</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-primary">
                {t("responsibleAITitle")}
              </h3>
              <p className="text-text-secondary">
                {t("responsibleAIDescription")}
              </p>
            </div>

            <div className="bg-surface-card/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:shadow-glow-sm hover:border-primary-500/30">
              <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-primary">
                {t("consumerAwarenessTitle")}
              </h3>
              <p className="text-text-secondary">
                {t("consumerAwarenessDescription")}
              </p>
            </div>

            <div className="bg-surface-card/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:shadow-glow-sm hover:border-primary-500/30">
              <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">💼</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-primary">
                {t("creativeEconomyTitle")}
              </h3>
              <p className="text-text-secondary">
                {t("creativeEconomyDescription")}
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section
          id="interactive-demo"
          className="animate-on-scroll mb-20 max-w-4xl mx-auto bg-surface-card/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-indigo/10 rounded-full blur-3xl"></div>

          <h2 className="text-3xl font-bold mb-8 text-center text-text-primary">
            {t("interactiveDemoTitle")}
          </h2>

          <div className="aspect-video rounded-xl border border-white/10 overflow-hidden bg-black/60 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <span className="text-5xl">▶️</span>
                </div>
                <p className="text-text-primary text-lg font-medium">
                  {t("demoComingSoonTitle")}
                </p>
                <p className="text-text-secondary mt-2">
                  {t("demoComingSoonDescription")}
                </p>
              </div>
            </div>

            {/* Mockup UI elements */}
            <div className="absolute bottom-4 left-4 flex space-x-2 opacity-70">
              <div className="px-2 py-1 bg-surface-dark/70 backdrop-blur-md rounded-md text-xs font-mono text-primary-400 border border-primary-600/30">
                S-AI-2
              </div>
              <div className="px-2 py-1 bg-surface-dark/70 backdrop-blur-md rounded-md text-xs font-mono text-accent-indigo border border-accent-indigo/30">
                V-AI-3
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section
          id="timeline"
          className="animate-on-scroll mb-20 max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-12 text-center text-text-primary">
            {t("timelineTitle")}
          </h2>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-0.5 bg-primary-600/30"></div>

            <div className="space-y-20">
              {/* Phase 1: Foundation */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-[calc(50%-2rem)] md:text-right md:pr-8 mb-6 md:mb-0">
                  <h3 className="text-xl font-bold text-primary-400 mb-2">
                    {t("timelinePhase1Title")}
                  </h3>
                  <div className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-white/10 inline-block">
                    <h4 className="text-lg font-semibold mb-2 text-text-primary">
                      {t("timelinePhase1Subtitle")}
                    </h4>
                    <p className="text-text-secondary">
                      {t("timelinePhase1Description")}
                    </p>
                  </div>
                </div>

                <div className="relative w-10 h-10 flex-shrink-0 z-10">
                  <div className="absolute w-10 h-10 bg-surface-dark rounded-full border-2 border-primary-600 flex items-center justify-center">
                    <div className="w-4 h-4 bg-primary-600 rounded-full"></div>
                  </div>
                </div>

                <div className="w-full md:w-[calc(50%-2rem)] md:pl-8 opacity-70">
                  {/* Empty for layout */}
                </div>
              </div>

              {/* Phase 2: Integration */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-[calc(50%-2rem)] md:text-right md:pr-8 opacity-70 mb-6 md:mb-0 md:order-1 order-2">
                  {/* Empty for layout */}
                </div>

                <div className="relative w-10 h-10 flex-shrink-0 z-10 order-1">
                  <div className="absolute w-10 h-10 bg-surface-dark rounded-full border-2 border-primary-600 flex items-center justify-center">
                    <div className="w-4 h-4 bg-primary-600 rounded-full"></div>
                  </div>
                </div>

                <div className="w-full md:w-[calc(50%-2rem)] md:pl-8 order-2 md:order-1">
                  <h3 className="text-xl font-bold text-primary-400 mb-2">
                    {t("timelinePhase2Title")}
                  </h3>
                  <div className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold mb-2 text-text-primary">
                      {t("timelinePhase2Subtitle")}
                    </h4>
                    <p className="text-text-secondary">
                      {t("timelinePhase2Description")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phase 3: Standardization */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-[calc(50%-2rem)] md:text-right md:pr-8 mb-6 md:mb-0">
                  <h3 className="text-xl font-bold text-primary-400 mb-2">
                    {t("timelinePhase3Title")}
                  </h3>
                  <div className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-white/10 inline-block">
                    <h4 className="text-lg font-semibold mb-2 text-text-primary">
                      {t("timelinePhase3Subtitle")}
                    </h4>
                    <p className="text-text-secondary">
                      {t("timelinePhase3Description")}
                    </p>
                  </div>
                </div>

                <div className="relative w-10 h-10 flex-shrink-0 z-10">
                  <div className="absolute w-10 h-10 bg-surface-dark rounded-full border-2 border-primary-600 flex items-center justify-center">
                    <div className="w-4 h-4 bg-primary-600 rounded-full"></div>
                  </div>
                </div>

                <div className="w-full md:w-[calc(50%-2rem)] md:pl-8 opacity-70">
                  {/* Empty for layout */}
                </div>
              </div>

              {/* Phase 4: Ubiquity (Vision) */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-[calc(50%-2rem)] md:text-right md:pr-8 opacity-70 mb-6 md:mb-0 md:order-1 order-2">
                  {/* Empty for layout */}
                </div>

                <div className="relative w-10 h-10 flex-shrink-0 z-10 order-1">
                  <div className="absolute w-10 h-10 bg-surface-dark rounded-full border-2 border-accent-indigo flex items-center justify-center animate-pulse">
                    <div className="w-4 h-4 bg-accent-indigo rounded-full"></div>
                  </div>
                </div>

                <div className="w-full md:w-[calc(50%-2rem)] md:pl-8 order-2 md:order-1">
                  <h3 className="text-xl font-bold text-accent-indigo mb-2">
                    {t("timelinePhase4Title")}
                  </h3>
                  <div className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-accent-indigo/20 shadow-glow-sm">
                    <h4 className="text-lg font-semibold mb-2 text-text-primary">
                      {t("timelinePhase4Subtitle")}
                    </h4>
                    <p className="text-text-secondary">
                      {t("timelinePhase4Description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenges & Solutions Section */}
        <section
          id="challenges"
          className="animate-on-scroll mb-20 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-text-primary">
            {t("challengesTitle")}
          </h2>

          <div className="space-y-6">
            {[
              {
                challenge: t("challengeBadgeSpoofing"),
                solution: t("challengeBadgeSpoofingSolution"),
                icon: "🔒",
              },
              {
                challenge: t("challengeAIContribution"),
                solution: t("challengeAIContributionSolution"),
                icon: "📊",
              },
              {
                challenge: t("challengeCrossPlatform"),
                solution: t("challengeCrossPlatformSolution"),
                icon: "🔄",
              },
              {
                challenge: t("challengePrivacy"),
                solution: t("challengePrivacySolution"),
                icon: "🛡️",
              },
              {
                challenge: t("challengeTechnical"),
                solution: t("challengeTechnicalSolution"),
                icon: "⚙️",
              },
            ].map((item, index) => (
              <div
                key={`challenge-${index}`}
                className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-primary-400">
                      {item.challenge}
                    </h3>
                    <p className="text-text-secondary">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Industry Adoption Partners Section */}
        <section
          id="partners"
          className="animate-on-scroll mb-20 max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-text-primary">
            {t("partnersTitle")}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Adobe", icon: "🎨" },
              { name: "Microsoft", icon: "💻" },
              { name: "Google", icon: "🔍" },
              { name: "Meta", icon: "🌐" },
              { name: "Apple", icon: "🍎" },
              { name: "OpenAI", icon: "🤖" },
              { name: "Anthropic", icon: "🧠" },
              { name: "Stability AI", icon: "🎯" },
            ].map((partner) => (
              <div
                key={partner.name}
                className="group bg-surface-dark/60 backdrop-blur-md rounded-xl p-6 border border-white/10 flex flex-col items-center justify-center h-32 hover:border-primary-500/30 transition-all duration-300 hover:shadow-glow-sm"
              >
                <span className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                  {partner.icon}
                </span>
                <span className="text-xl font-medium text-text-primary opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center mt-6 text-text-secondary opacity-70">
            {t("partnersDisclaimer")}
          </p>
        </section>

        {/* Improved CTA Section */}
        <section className="animate-on-scroll mb-20">
          <div className="bg-gradient-to-br from-surface-dark/90 to-surface-dark/60 rounded-2xl p-8 md:p-12 border border-white/10 max-w-5xl mx-auto relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-indigo/10 rounded-full blur-3xl"></div>

            <h2 className="text-3xl font-bold mb-6 text-center text-text-primary relative z-10">
              {t("ctaTitle")}
            </h2>

            <p className="text-lg text-text-secondary mb-8 max-w-3xl mx-auto text-center relative z-10">
              {t("ctaDescription")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 relative z-10">
              <div className="bg-surface-dark/50 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-primary-500/30 transition-all duration-300">
                <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">👩‍💻</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-text-primary">
                  {t("ctaDevelopersTitle")}
                </h3>
                <p className="text-text-secondary mb-4">
                  {t("ctaDevelopersDescription")}
                </p>
                <Link
                  href="/developers"
                  className="text-primary-400 hover:text-primary-300 inline-flex items-center"
                >
                  <span>{t("ctaDevelopersAction")}</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>

              <div className="bg-surface-dark/50 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-accent-indigo/30 transition-all duration-300">
                <div className="w-12 h-12 bg-accent-indigo/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">🏢</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-text-primary">
                  {t("ctaOrganizationsTitle")}
                </h3>
                <p className="text-text-secondary mb-4">
                  {t("ctaOrganizationsDescription")}
                </p>
                <Link
                  href="/partners"
                  className="text-accent-indigo hover:text-accent-indigo/80 inline-flex items-center"
                >
                  <span>{t("ctaOrganizationsAction")}</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>

              <div className="bg-surface-dark/50 backdrop-blur-sm rounded-xl p-6 border border-white/5 hover:border-primary-400/30 transition-all duration-300">
                <div className="w-12 h-12 bg-primary-400/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-text-primary">
                  {t("ctaCreatorsTitle")}
                </h3>
                <p className="text-text-secondary mb-4">
                  {t("ctaCreatorsDescription")}
                </p>
                <Link
                  href="/"
                  className="text-primary-400 hover:text-primary-300 inline-flex items-center"
                >
                  <span>{t("ctaCreatorsAction")}</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Link
                href="/beta"
                className="px-8 py-3 bg-primary-600 hover:bg-primary-500 rounded-lg text-white font-medium transition-all duration-300 text-center hover:shadow-glow-sm"
              >
                {t("ctaBetaAction")}
              </Link>
              <Link
                href="/updates"
                className="px-8 py-3 bg-surface-dark hover:bg-surface-dark/80 border border-white/10 rounded-lg text-text-primary font-medium transition-all duration-300 text-center"
              >
                {t("ctaUpdatesAction")}
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="animate-on-scroll mb-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-text-primary">
            {t("futureFaqTitle")}
          </h2>

          <div className="space-y-4">
            {[
              {
                question: t("futureFaqQuestion1"),
                answer: t("futureFaqAnswer1"),
              },
              {
                question: t("futureFaqQuestion2"),
                answer: t("futureFaqAnswer2"),
              },
              {
                question: t("futureFaqQuestion3"),
                answer: t("futureFaqAnswer3"),
              },
              {
                question: t("futureFaqQuestion4"),
                answer: t("futureFaqAnswer4"),
              },
              {
                question: t("futureFaqQuestion5"),
                answer: t("futureFaqAnswer5"),
              },
              {
                question: t("futureFaqQuestion6"),
                answer: t("futureFaqAnswer6"),
              },
            ].map((item, index) => (
              <div
                key={`faq-${index}`}
                className="bg-surface-card/40 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 transition-all hover:border-primary-500/30"
              >
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-text-primary">
                    {item.question}
                  </h3>
                  <p className="text-text-secondary">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
