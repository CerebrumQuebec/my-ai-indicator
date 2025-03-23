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
  const [knowsLicense, setKnowsLicense] = useState<boolean | null>(null);
  const { setStep, setQuestionnaireMode } = useWizard();
  const { t } = useTranslation();

  // Function to handle selection of knowledge state
  const handleLicenseKnowledge = (knows: boolean) => {
    setKnowsLicense(knows);
    if (knows) {
      setQuestionnaireMode(false);
      onNext?.();
    } else {
      setQuestionnaireMode(true);
      onNext?.();
    }
  };

  return (
    <div className="space-y-8">
      {/* First box: Welcome and CTA */}
      <div className="bg-surface-card rounded-xl border border-white/10 p-6">
        <div className="text-center space-y-6">
          <div className="relative w-24 h-24 mx-auto">
            <Image
              src="/logo.png"
              alt="Badge AI Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-text-primary">
            {t("welcomeTitle")}
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {t("welcomeDescription")}
          </p>
        </div>

        {/* License knowledge question */}
        <div className="mt-8 bg-surface-dark rounded-xl border border-white/10 p-6">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold text-text-primary">
              {t("licenseQuestion")}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => handleLicenseKnowledge(true)}
              className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                knowsLicense === true
                  ? "bg-primary-500 text-white"
                  : "bg-surface-card hover:bg-primary-500/20 text-text-primary"
              }`}
            >
              {t("yes")}
            </button>
            <button
              onClick={() => handleLicenseKnowledge(false)}
              className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                knowsLicense === false
                  ? "bg-primary-500 text-white"
                  : "bg-surface-card hover:bg-primary-500/20 text-text-primary"
              }`}
            >
              {t("no")}
            </button>
          </div>
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
