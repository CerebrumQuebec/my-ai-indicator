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
      <div className="bg-surface-card/90 backdrop-blur-sm rounded-2xl shadow-soft border border-white/10 overflow-hidden p-6 md:p-8">
        <h1 className="text-3xl font-bold text-text-primary mb-6">
          {t("faqTitle")}
        </h1>

        <p className="text-text-secondary mb-8">{t("faqDescription")}</p>

        <div className="space-y-4 mb-8">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-surface-dark rounded-lg border border-white/10 overflow-hidden"
            >
              <button
                className="w-full text-left p-4 flex justify-between items-center"
                onClick={() => toggleItem(index)}
              >
                <span className="font-medium text-text-primary">
                  {item.question}
                </span>
                <span className="text-primary-500">
                  {expandedItem === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </button>
              {expandedItem === index && (
                <div className="px-4 pb-4 text-text-secondary">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <section className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center text-primary-500 hover:text-primary-400 font-medium"
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
            {t("home")}
          </Link>
        </section>
      </div>
    </div>
  );
}
