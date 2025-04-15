"use client";

import React, { useEffect } from "react";
import { useWizard } from "../contexts/WizardContext";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DocumentTextIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "../contexts/TranslationContext";

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  canContinue: boolean;
  isQuestionnaireMode: boolean;
  currentQuestion: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  canContinue,
  isQuestionnaireMode,
  currentQuestion,
  totalQuestions,
}) => {
  const {
    setStep,
    setSoundsCategory,
    setVisualCategory,
    setTextCategory,
    setSelectedCategories,
    setQuestionnaireMode,
  } = useWizard();
  const { t } = useTranslation();

  const handleReset = () => {
    setStep(1);
    setSoundsCategory(null);
    setVisualCategory(null);
    setTextCategory(null);
    setSelectedCategories({
      sounds: false,
      visual: false,
      text: false,
    });
    setQuestionnaireMode(false);
  };

  // Simple percentage calculation
  let progressPercent = (currentStep / totalSteps) * 100;

  // Make sure progress is between 0-100
  progressPercent = Math.max(0, Math.min(100, progressPercent));

  // Debug logging
  useEffect(() => {
    //console.log("Progress Bar Debug:");
    //console.log("Current Step:", currentStep);
    //console.log("Total Steps:", totalSteps);
    //console.log("Progress Percent:", progressPercent);
  }, [currentStep, totalSteps, progressPercent]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={onBack}
          className="flex items-center text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          <span className="text-sm font-medium">{t("back")}</span>
        </button>
        <div className="text-sm font-medium">
          {isQuestionnaireMode ? (
            <span className="bg-white/10 px-3 py-1 rounded-full flex items-center">
              <DocumentTextIcon className="h-4 w-4 mr-1 text-primary-400" />
              {t("question")} {currentQuestion}/{totalQuestions}
            </span>
          ) : (
            <span className="bg-white/10 px-3 py-1 rounded-full flex items-center">
              <ChartBarIcon className="h-4 w-4 mr-1 text-primary-400" />
              {t("step")} {currentStep}/{totalSteps}
            </span>
          )}
        </div>
        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`flex items-center ${
            canContinue
              ? "text-primary-400 hover:text-primary-300"
              : "text-gray-500 cursor-not-allowed"
          } transition-colors`}
        >
          <span className="text-sm font-medium">{t("next")}</span>
          <ArrowRightIcon className="h-5 w-5 ml-1" />
        </button>
      </div>

      <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-600 to-primary-400 rounded-full relative shimmer"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      {!isQuestionnaireMode && (
        <div className="flex justify-between mt-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${
                index === currentStep - 1
                  ? "text-primary-400"
                  : index < currentStep - 1
                  ? "text-green-400"
                  : "text-gray-500"
              }`}
            >
              <div
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentStep - 1
                    ? "bg-primary-400 animate-pulse scale-125"
                    : index < currentStep - 1
                    ? "bg-green-400"
                    : "bg-gray-600"
                }`}
              ></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
