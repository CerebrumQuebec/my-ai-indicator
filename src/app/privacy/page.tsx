"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/contexts/TranslationContext";
import Analytics from "@/components/Analytics";

export default function Privacy() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("privacy");

  const renderPrivacyContent = () => (
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
          {t("analyticsSystemTitle")}
        </h2>
        <p className="text-text-secondary mb-4">
          {t("analyticsSystemDescription")}
        </p>
        <div className="bg-surface-card/50 rounded-lg p-4 mt-4">
          <ul className="space-y-4 text-text-secondary">
            <li>{t("analyticsFeatures_noPersonalInfo")}</li>
            <li>{t("analyticsFeatures_noCookies")}</li>
            <li>
              {t("analyticsFeatures_anonymousData")}
              <ul className="list-disc ml-6 mt-2 space-y-2">
                <li>{t("analyticsFeatures_features_pageViews")}</li>
                <li>{t("analyticsFeatures_features_deviceTypes")}</li>
                <li>{t("analyticsFeatures_features_browserTypes")}</li>
                <li>{t("analyticsFeatures_features_languages")}</li>
                <li>{t("analyticsFeatures_features_visitTimes")}</li>
                <li>{t("analyticsFeatures_features_performance")}</li>
              </ul>
            </li>
            <li>{t("analyticsFeatures_noIdentification")}</li>
            <li>{t("analyticsFeatures_noTracking")}</li>
            <li>{t("analyticsFeatures_transparent")}</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          {t("analyticsSystemCharacteristics")}
        </h2>
        <div className="bg-surface-card/50 rounded-lg p-4 mt-4">
          <ul className="list-disc ml-6 space-y-2 text-text-secondary">
            <li>{t("analyticsCharacteristics_openSource")}</li>
            <li>{t("analyticsCharacteristics_selfHosted")}</li>
            <li>{t("analyticsCharacteristics_gdprCompliant")}</li>
            <li>{t("analyticsCharacteristics_minimal")}</li>
            <li>{t("analyticsCharacteristics_transparent")}</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-text-primary mb-4">
          {t("questionsTitle")}
        </h2>
        <p className="text-text-secondary mb-4">{t("questionsText")}</p>
      </section>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-surface-card/90 backdrop-blur-sm rounded-2xl shadow-soft border border-white/10 overflow-hidden p-6 md:p-8">
        <h1 className="text-3xl font-bold text-text-primary mb-6">
          {t("privacyTitle")}
        </h1>

        <div className="mb-6 border-b border-white/10">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("privacy")}
              className={`pb-2 px-1 ${
                activeTab === "privacy"
                  ? "border-b-2 border-primary-500 text-primary-500"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {t("privacyPolicy")}
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`pb-2 px-1 ${
                activeTab === "analytics"
                  ? "border-b-2 border-primary-500 text-primary-500"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {t("analytics")}
            </button>
          </div>
        </div>

        {activeTab === "privacy" ? renderPrivacyContent() : <Analytics />}

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
