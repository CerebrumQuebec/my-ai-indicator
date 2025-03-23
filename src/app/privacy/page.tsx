"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../../contexts/TranslationContext";

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-surface-card/90 backdrop-blur-sm rounded-2xl shadow-soft border border-white/10 overflow-hidden p-6 md:p-8">
        <h1 className="text-3xl font-bold text-text-primary mb-6">
          {t("privacyTitle")}
        </h1>

        <div className="space-y-8">
          <section>
            <p className="text-xl text-text-primary mb-6">
              {t("privacyDescription")}
            </p>
            <p className="text-text-secondary mb-8">{t("privacyIntro")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              {t("noTrackingTitle")}
            </h2>
            <p className="text-text-secondary mb-4">{t("noTrackingText")}</p>
            <ul className="space-y-2 text-text-secondary ml-4">
              <li>{t("noGoogleAnalytics")}</li>
              <li>{t("noPixel")}</li>
              <li>{t("noCookies")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              {t("dataCollectionTitle")}
            </h2>
            <p className="text-text-secondary mb-4">
              {t("dataCollectionText")}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              {t("transparencyTitle")}
            </h2>
            <p className="text-text-secondary mb-4">{t("transparencyText")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              {t("questionsTitle")}
            </h2>
            <p className="text-text-secondary mb-4">{t("questionsText")}</p>
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
