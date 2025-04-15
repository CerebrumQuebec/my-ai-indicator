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
              The Future of Badge AI
            </span>
          </h1>
          <p
            id="hero-subtitle"
            className="animate-on-scroll text-2xl md:text-3xl text-text-primary font-light max-w-3xl mx-auto leading-relaxed"
          >
            Envisioning the universal standard for AI transparency
          </p>

          <div
            id="hero-badges"
            className="animate-on-scroll flex flex-wrap justify-center gap-4 mt-10"
          >
            {["S", "V", "T"].map((type) => (
              <div
                key={type}
                className="flex items-center px-4 py-2 bg-surface-dark/80 backdrop-blur-md rounded-full border border-primary-600/30 shadow-glow"
              >
                <span className="text-lg font-mono font-bold mr-2 text-primary-400">
                  {type}
                </span>
                <span className="text-sm text-text-secondary">AI</span>
                <span className="flex ml-2">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <span
                      key={level}
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
            Our Vision: Seamless Digital Transparency
          </h2>
          <p className="text-text-secondary mb-4 text-lg">
            Imagine a future where Badge AI becomes the universal standard for
            transparent AI attribution. Our goal is for every piece of digital
            content—from social media posts to professional software—to
            seamlessly integrate AI transparency badges, revealing how
            artificial intelligence contributed to its creation.
          </p>
          <p className="text-text-secondary mb-6 text-lg">
            We envision Badge AI evolving into an essential metadata layer woven
            throughout the digital ecosystem. Software like ChatGPT, Photoshop,
            or Logic Pro could automatically detect AI usage during the creation
            process and embed the corresponding Badge AI level directly into the
            file's metadata, updating it dynamically as the level of AI
            involvement changes. This would enable instant verification of
            content authenticity and AI contribution levels across all
            platforms.
          </p>

          <div className="flex items-center justify-center p-6 bg-surface-dark/50 rounded-xl border border-white/5">
            <blockquote className="italic text-xl text-center text-primary-300">
              "Our aim is to fundamentally change how we interact with digital
              content, bringing clarity and trust to an increasingly AI-powered
              world."
              <footer className="text-right text-sm text-text-secondary mt-2">
                — The Badge AI Vision
              </footer>
            </blockquote>
          </div>
        </section>

        {/* New Section: Auto-Integration Examples */}
        <section
          id="auto-integration"
          className="animate-on-scroll mb-20 max-w-4xl mx-auto bg-surface-card/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-text-primary">
            Real-Time AI Detection & Badging
          </h2>

          <div className="space-y-8">
            {/* ChatGPT Example */}
            <div className="bg-surface-dark/50 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🤖</span>
                  <h3 className="text-xl font-bold text-text-primary">
                    ChatGPT Integration
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
                  Each ChatGPT response would carry dynamic Badge AI metadata
                  that adjusts in real-time based on:
                </p>
                <ul className="space-y-2 text-text-secondary ml-6 list-disc">
                  <li>
                    Whether you're refining the AI's output with additional
                    prompts
                  </li>
                  <li>The complexity and creativity of the AI's responses</li>
                  <li>
                    How much human editing is applied to the final content
                  </li>
                </ul>
                <div className="mt-6 bg-surface-dark/70 p-4 rounded-lg border border-white/5">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-primary-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-sm">👤</span>
                    </div>
                    <div>
                      <p className="text-text-secondary text-sm mb-1">
                        Write me a short poem about autumn
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
                        Crisp leaves dance on autumn breeze,
                        <br />
                        Amber skies and golden trees.
                        <br />
                        Nature's canvas, rich and deep,
                        <br />
                        As the world prepares to sleep.
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
                    Adobe Photoshop Integration
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
                            Original composition
                          </span>
                          <span className="text-xs font-mono text-primary-400 bg-primary-600/10 px-2 py-0.5 rounded">
                            Human
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-text-secondary text-xs">
                            Color correction
                          </span>
                          <span className="text-xs font-mono text-accent-indigo bg-accent-indigo/10 px-2 py-0.5 rounded">
                            AI-assisted
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-text-secondary text-xs">
                            Object removal
                          </span>
                          <span className="text-xs font-mono text-accent-indigo bg-accent-indigo/10 px-2 py-0.5 rounded">
                            AI-generated
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-text-secondary">
                  As the artist applies various tools, the system analyzes which
                  operations are human-executed versus AI-generated, with the
                  final exported image carrying a Badge AI metadata tag.
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
            The Badge AI Metadata Protocol
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
                Automatic Detection
              </h3>
              <p className="text-sm text-text-secondary">
                Software analyzes AI usage patterns in real-time, generating
                standardized metadata documenting the exact AI contribution.
              </p>
            </div>

            <div className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-white/10 transition-all duration-300 hover:shadow-glow-sm hover:border-primary-500/30">
              <h3 className="text-lg font-bold mb-2 text-text-primary">
                Seamless Transfer
              </h3>
              <p className="text-sm text-text-secondary">
                Badge AI metadata persists through file transfers, conversions,
                and sharing across the entire digital ecosystem.
              </p>
            </div>

            <div className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-white/10 transition-all duration-300 hover:shadow-glow-sm hover:border-primary-500/30">
              <h3 className="text-lg font-bold mb-2 text-text-primary">
                Universal Display
              </h3>
              <p className="text-sm text-text-secondary">
                All digital platforms can recognize and display the Badge AI
                indicators, providing instant transparency.
              </p>
            </div>
          </div>
        </section>

        {/* Integration Showcase */}
        <section className="mb-20">
          <h2
            id="integration-title"
            className="animate-on-scroll text-3xl font-bold mb-8 text-center text-text-primary"
          >
            Towards Universal Integration
          </h2>

          <p className="text-text-secondary text-center mb-8 max-w-3xl mx-auto">
            In our vision, every platform automatically analyzes AI usage and
            assigns the appropriate Badge AI level. As users create and modify
            content, these applications continuously update the Badge AI
            metadata to reflect the changing balance between human and AI
            contributions.
          </p>

          {/* Tabs for different categories */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1 bg-surface-dark/50 backdrop-blur-md rounded-full border border-white/10">
              {["software", "social", "media"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-primary-600/30 text-white shadow-glow-sm"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Integration grid */}
          <div
            id="integration-grid"
            className="animate-on-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {integrations[activeTab].map((item, index) => (
              <div
                key={index}
                className="bg-surface-dark/50 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden transition-all duration-500 hover:border-primary-500/30 hover:shadow-glow hover:scale-105"
              >
                <div className="h-40 bg-gradient-to-br from-surface-light/5 to-surface-dark flex items-center justify-center">
                  <span className="text-6xl">{item.icon}</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-text-primary">
                      {item.name}
                    </h3>
                    <span className="px-3 py-1 bg-primary-600/20 rounded-full text-sm font-mono text-primary-400">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-text-secondary mb-3">{item.description}</p>
                  <p className="text-xs text-text-secondary border-t border-white/5 pt-3">
                    Badge AI adjusts as users interact with AI features,
                    ensuring transparency about the level of AI involvement at
                    any moment.
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-surface-dark/50 backdrop-blur-md rounded-xl border border-white/10 p-6 mt-8 max-w-3xl mx-auto">
            <h3 className="text-lg font-bold mb-3 text-center text-primary-400">
              How Dynamic Badge AI Works
            </h3>
            <p className="text-text-secondary mb-4">
              Each platform integrates Badge AI differently, but follows the
              same principles:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start">
                <span className="text-primary-400 mr-2">•</span>
                <span>
                  <strong>Real-time Analysis:</strong> Applications continuously
                  monitor the ratio of AI-generated to human-created elements
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-400 mr-2">•</span>
                <span>
                  <strong>Contextual Awareness:</strong> Systems understand
                  different creative contexts and adjust Badge AI levels
                  accordingly
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-400 mr-2">•</span>
                <span>
                  <strong>Persistent Metadata:</strong> Badge AI information
                  remains with content as it's shared, exported, or modified
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-400 mr-2">•</span>
                <span>
                  <strong>User Control:</strong> Creators can view detailed
                  breakdowns of how Badge AI levels were calculated
                </span>
              </li>
            </ul>
          </div>
          <p className="text-center mt-8 text-text-secondary max-w-3xl mx-auto">
            Achieving this requires collaboration with software developers and
            platform owners to build robust AI detection mechanisms and
            standardized metadata protocols, allowing Badge AI levels to be
            assigned and updated automatically based on real-time usage.
          </p>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="animate-on-scroll mb-20 max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-text-primary">
            The Path to Seamless Integration
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
                  Automatic Detection & Dynamic Badging
                </h3>
                <p className="text-text-secondary">
                  The vision includes developing sophisticated AI fingerprinting
                  or usage-tracking technology within creative tools. This would
                  automatically identify and measure AI contribution in
                  real-time. As a user leverages AI features (e.g., generating
                  text, applying filters, composing melodies), the system
                  dynamically updates the embedded Badge AI metadata.
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
                  Global Standards & Interoperability
                </h3>
                <p className="text-text-secondary">
                  Establishing universal adoption requires creating open
                  standards for Badge AI metadata. This ensures seamless
                  transferability across diverse platforms and formats. Content
                  shared between applications would maintain its transparency
                  data, creating a cohesive and trustworthy digital ecosystem.
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
                  Effortless Verification
                </h3>
                <p className="text-text-secondary">
                  Ultimately, audiences everywhere could benefit from instant,
                  reliable visual indicators showing AI contribution levels.
                  Verification could become possible through intuitive
                  interfaces like augmented reality overlays, browser
                  extensions, and native platform integrations, making
                  transparency easily accessible.
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
            A New Era of Digital Trust
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-card/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:shadow-glow-sm hover:border-primary-500/30">
              <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-primary">
                Protection from Misinformation
              </h3>
              <p className="text-text-secondary">
                Badge AI helps combat deep fakes and AI-generated misinformation
                by providing immediate verification of content authenticity and
                clear insight into how AI contributed.
              </p>
            </div>

            <div className="bg-surface-card/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:shadow-glow-sm hover:border-primary-500/30">
              <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">⚖️</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-primary">
                Supporting Responsible AI
              </h3>
              <p className="text-text-secondary">
                As AI usage grows, clear standards like Badge AI can support
                regulatory efforts and promote ethical AI practices by providing
                a common framework for disclosure and accountability.
              </p>
            </div>

            <div className="bg-surface-card/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:shadow-glow-sm hover:border-primary-500/30">
              <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-primary">
                Consumer Awareness
              </h3>
              <p className="text-text-secondary">
                People now routinely check Badge AI indicators before making
                purchasing decisions, consuming news, or engaging with social
                media content.
              </p>
            </div>

            <div className="bg-surface-card/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 transition-all duration-300 hover:shadow-glow-sm hover:border-primary-500/30">
              <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">💼</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-text-primary">
                Creative Economy
              </h3>
              <p className="text-text-secondary">
                Badge AI has created a new value system where fully
                human-created content can be properly recognized and valued
                alongside AI-assisted or AI-generated content.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section
          id="interactive-demo"
          className="animate-on-scroll mb-20 max-w-4xl mx-auto bg-surface-card/40 backdrop-blur-md rounded-2xl p-8 border border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-indigo/10 rounded-full blur-3xl -z-10"></div>

          <h2 className="text-3xl font-bold mb-8 text-center text-text-primary">
            Badge AI Integrated Experience
          </h2>

          <div className="aspect-video rounded-xl border border-white/10 overflow-hidden bg-black/60 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <span className="text-5xl">▶️</span>
                </div>
                <p className="text-text-primary text-lg font-medium">
                  Interactive Demo Coming Soon
                </p>
                <p className="text-text-secondary mt-2">
                  Experience the future of Badge AI integration
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

          <div className="mt-6 text-center">
            <p className="text-text-secondary">
              This interactive demo will showcase how Badge AI seamlessly
              integrates across platforms, providing real-time transparency for
              all digital content.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section
          id="timeline"
          className="animate-on-scroll mb-20 max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-12 text-center text-text-primary">
            Roadmap to Transparency
          </h2>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-0.5 bg-primary-600/30"></div>

            <div className="space-y-20">
              {/* Phase 1: Foundation */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-[calc(50%-2rem)] md:text-right md:pr-8 mb-6 md:mb-0">
                  <h3 className="text-xl font-bold text-primary-400 mb-2">
                    Phase 1: Foundation
                  </h3>
                  <div className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-white/10 inline-block">
                    <h4 className="text-lg font-semibold mb-2 text-text-primary">
                      Launch & Initial Adoption
                    </h4>
                    <p className="text-text-secondary">
                      Establish the Badge AI system and tools, encouraging
                      voluntary adoption by creators and early partners.
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
                    Phase 2: Integration
                  </h3>
                  <div className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-semibold mb-2 text-text-primary">
                      Industry Partnerships
                    </h4>
                    <p className="text-text-secondary">
                      Collaborate with major software and platform developers to
                      integrate Badge AI options, potentially including early
                      automatic detection features.
                    </p>
                  </div>
                </div>
              </div>

              {/* Phase 3: Standardization */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-full md:w-[calc(50%-2rem)] md:text-right md:pr-8 mb-6 md:mb-0">
                  <h3 className="text-xl font-bold text-primary-400 mb-2">
                    Phase 3: Standardization
                  </h3>
                  <div className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-white/10 inline-block">
                    <h4 className="text-lg font-semibold mb-2 text-text-primary">
                      Developing Open Standards
                    </h4>
                    <p className="text-text-secondary">
                      Work towards establishing Badge AI as an open standard for
                      metadata, promoting interoperability and potentially
                      aligning with emerging regulatory frameworks.
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
                    Phase 4: Universal Adoption
                  </h3>
                  <div className="bg-surface-card/40 backdrop-blur-md rounded-xl p-6 border border-accent-indigo/20 shadow-glow-sm">
                    <h4 className="text-lg font-semibold mb-2 text-text-primary">
                      Seamless Ecosystem
                    </h4>
                    <p className="text-text-secondary">
                      The ultimate vision: Badge AI is universally embedded,
                      with platforms automatically detecting, displaying, and
                      transferring AI attribution data, creating a transparent
                      digital environment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-12">
          <div
            id="cta"
            className="animate-on-scroll bg-gradient-to-br from-surface-dark/90 to-surface-dark/60 rounded-2xl p-12 border border-white/10 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6 text-text-primary">
              Shape the Future with Badge AI
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto">
              The future of digital transparency is already beginning. Join us
              in building a more honest and ethical digital world.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/about"
                className="px-8 py-3 bg-primary-600/20 hover:bg-primary-600/30 border border-primary-600/30 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-glow-sm"
              >
                Learn More
              </Link>
              <Link
                href="/"
                className="px-8 py-3 bg-surface-dark hover:bg-surface-dark/80 border border-white/10 rounded-lg text-text-primary font-medium transition-all duration-300"
              >
                Try Badge AI Today
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
