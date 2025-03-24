"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useWizard } from "../contexts/WizardContext";
import { useTranslation } from "../contexts/TranslationContext";
import { StepProps } from "../types";

const Introduction: React.FC<StepProps> = ({ onNext }) => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [showCCInspiration, setShowCCInspiration] = useState(false);
  const { setQuestionnaireMode } = useWizard();
  const { t } = useTranslation();

  const handleStart = () => {
    setQuestionnaireMode(false);
    onNext?.();
  };

  return (
    <div className="space-y-8">
      {/* First box: Welcome and CTA */}
      <div className="bg-surface-card rounded-xl border border-white/10 p-6">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <Image
              src="/logo.png"
              alt="Badge AI Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-text-primary mb-6">
            {t("welcomeTitle")}
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-16">
            {t("welcomeDescription")}
          </p>

          {/* Start button */}
          <button
            onClick={handleStart}
            className="group relative inline-flex items-center px-10 py-4 text-lg font-medium rounded-2xl bg-primary-500 text-white hover:bg-primary-400 transition-colors"
          >
            <span className="relative flex items-center">
              {t("start")}
              <svg
                className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Second box: Explanations */}
        <div className="mt-8 bg-surface-dark rounded-xl border border-white/10 p-6 space-y-4">
          {/* How it works section */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowHowItWorks(!showHowItWorks)}
            >
              <h3 className="text-lg font-semibold text-text-primary">
                {t("howItWorks")}
              </h3>
              <div className="text-primary-500">
                {showHowItWorks ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
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
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
            {showHowItWorks && (
              <div className="mt-4 space-y-3 text-text-secondary">
                {t("howItWorksContent")}
              </div>
            )}
          </div>

          {/* Why use this section */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowWhy(!showWhy)}
            >
              <h3 className="text-lg font-semibold text-text-primary">
                {t("whyIndicate")}
              </h3>
              <div className="text-primary-500">
                {showWhy ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
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
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
            {showWhy && (
              <div className="mt-4 space-y-3 text-text-secondary">
                {t("whyIndicateContent")}
              </div>
            )}
          </div>

          {/* Creative Commons inspiration section */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowCCInspiration(!showCCInspiration)}
            >
              <h3 className="text-lg font-semibold text-text-primary">
                {t("ccInspiration")}
              </h3>
              <div className="text-primary-500">
                {showCCInspiration ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
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
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
            {showCCInspiration && (
              <div className="mt-4 space-y-3 text-text-secondary">
                <p>{t("ccInspirationIntro")}</p>
                <p>
                  <span className="font-medium text-text-primary">
                    {t("ccSimilaritiesTitle")}
                  </span>
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>
                    <span className="font-medium text-text-primary">
                      {t("ccSimilarity1Title")}
                    </span>{" "}
                    {t("ccSimilarity1Description")}
                  </li>
                  <li>
                    <span className="font-medium text-text-primary">
                      {t("ccSimilarity2Title")}
                    </span>{" "}
                    {t("ccSimilarity2Description")}
                  </li>
                  <li>
                    <span className="font-medium text-text-primary">
                      {t("ccSimilarity3Title")}
                    </span>{" "}
                    {t("ccSimilarity3Description")}
                  </li>
                  <li>
                    <span className="font-medium text-text-primary">
                      {t("ccSimilarity4Title")}
                    </span>{" "}
                    {t("ccSimilarity4Description")}
                  </li>
                </ul>
                <p>
                  <span className="font-medium text-text-primary">
                    {t("ccMainDifferenceTitle")}
                  </span>{" "}
                  {t("ccMainDifferenceContent")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
