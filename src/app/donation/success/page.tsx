"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../../../contexts/TranslationContext";

export default function DonationSuccess() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Background decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-primary-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-20 w-72 h-72 bg-accent-indigo rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="bg-surface-card/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 overflow-hidden p-6 md:p-8 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-accent-indigo rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-4">
          <span className="animated-gradient-text">
            {t("donationSuccessTitle")}
          </span>
        </h1>

        <p className="text-text-secondary mb-8 max-w-lg mx-auto">
          {t("donationSuccessMessage")}
        </p>

        <div className="inline-flex flex-col sm:flex-row gap-4 mt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-400 transition-colors shadow-md hover:shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            {t("backToHome")}
          </Link>
        </div>

        {/* Confetti animation */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-2 h-8 bg-primary-500 rounded-full animate-fall-slow"></div>
          <div className="absolute top-0 left-1/3 w-3 h-3 bg-accent-indigo rounded-full animate-fall-medium"></div>
          <div className="absolute top-0 left-1/2 w-4 h-4 bg-primary-400 rounded-full animate-fall-fast"></div>
          <div className="absolute top-0 left-2/3 w-2 h-2 bg-accent-indigo rounded-full animate-fall-slow"></div>
          <div className="absolute top-0 left-3/4 w-3 h-6 bg-primary-500 rounded-full animate-fall-medium"></div>
        </div>

        <style jsx>{`
          @keyframes fall-slow {
            0% {
              transform: translateY(-100px) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(500px) rotate(360deg);
              opacity: 0;
            }
          }
          @keyframes fall-medium {
            0% {
              transform: translateY(-100px) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(500px) rotate(720deg);
              opacity: 0;
            }
          }
          @keyframes fall-fast {
            0% {
              transform: translateY(-100px) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(500px) rotate(1080deg);
              opacity: 0;
            }
          }
          .animate-fall-slow {
            animation: fall-slow 5s linear infinite;
          }
          .animate-fall-medium {
            animation: fall-medium 4s linear infinite;
          }
          .animate-fall-fast {
            animation: fall-fast 3s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
}
