"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "../../contexts/TranslationContext";

export default function FAQ() {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const { t } = useTranslation();

  const toggleItem = (index: number) => {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  };

  const faqItems = [
    {
      question: t("faqQuestion1"),
      answer: t("faqAnswer1"),
    },
    {
      question: t("faqQuestion2"),
      answer: t("faqAnswer2"),
    },
    {
      question: t("faqQuestion3"),
      answer: t("faqAnswer3"),
    },
    {
      question: t("faqQuestion4"),
      answer: t("faqAnswer4"),
    },
    {
      question: t("faqQuestion5"),
      answer: t("faqAnswer5"),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Background decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-primary-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-20 w-72 h-72 bg-accent-indigo rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="bg-surface-card/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/10 overflow-hidden p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="animated-gradient-text">{t("faqTitle")}</span>
        </h1>

        <p className="text-text-secondary mb-8 pl-14">{t("faqDescription")}</p>

        <div className="space-y-4 mb-8">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-surface-dark/80 to-surface-dark/60 rounded-lg border overflow-hidden transition-all duration-300 ${
                expandedItem === index
                  ? "border-primary-500/30 shadow-lg"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              <button
                className="w-full text-left p-4 flex justify-between items-center"
                onClick={() => toggleItem(index)}
              >
                <span className="font-medium text-text-primary flex items-center">
                  <span
                    className={`flex-shrink-0 inline-flex items-center justify-center w-8 h-8 mr-3 rounded-lg transition-colors duration-300 ${
                      expandedItem === index
                        ? "bg-primary-500/30"
                        : "bg-primary-500/10"
                    }`}
                  >
                    <span className="text-primary-400 font-bold">
                      {index + 1}
                    </span>
                  </span>
                  {item.question}
                </span>
                <span
                  className={`text-primary-500 transition-transform duration-300 ${
                    expandedItem === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
              <div
                className={`px-4 pb-4 overflow-hidden transition-all duration-300 ${
                  expandedItem === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <div className="pl-11 text-text-secondary border-l-2 border-primary-500/30">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="pt-4 border-t border-white/10">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-surface-dark border border-white/10 rounded-lg text-primary-400 hover:bg-primary-500/20 hover:border-primary-500/30 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {t("backToHome")}
          </Link>
        </section>
      </div>
    </div>
  );
}
