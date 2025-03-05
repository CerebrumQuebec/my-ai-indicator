"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../../contexts/TranslationContext";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-surface-card/90 backdrop-blur-sm rounded-2xl shadow-soft border border-white/10 overflow-hidden p-6 md:p-8">
        <h1 className="text-3xl font-bold text-text-primary mb-6">
          {t("aboutTitle")}
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              {t("aboutIntroTitle")}
            </h2>
            <p className="text-text-secondary mb-4">{t("aboutIntroText")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              {t("aboutMissionTitle")}
            </h2>
            <p className="text-text-secondary mb-4">{t("aboutMissionText")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              {t("aboutCategoriesTitle")}
            </h2>
            <p className="text-text-secondary mb-4">
              {t("aboutCategoriesText")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
              {/* Category cards */}
              {[1, 2, 3, 4, 5].map((category) => (
                <div
                  key={category}
                  className="bg-surface-dark rounded-lg border border-white/10 p-4"
                >
                  <h3 className="font-semibold text-text-primary mb-2">
                    {t(`category${category}Title`)}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {t(`category${category}Description`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              {t("aboutTeamTitle")}
            </h2>
            <p className="text-text-secondary mb-4">{t("aboutTeamText")}</p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
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
            {t("backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
