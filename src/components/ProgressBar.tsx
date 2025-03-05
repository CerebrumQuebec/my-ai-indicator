"use client";

import React from "react";
import Button from "./Button";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  onNext?: () => void;
  canContinue?: boolean;
  currentQuestion?: number;
  totalQuestions?: number;
  isQuestionnaireMode?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  canContinue,
  currentQuestion = 0,
  totalQuestions = 0,
  isQuestionnaireMode = false,
}) => {
  const calculateProgress = () => {
    if (!isQuestionnaireMode) {
      return (currentStep / totalSteps) * 100;
    }

    // For questionnaire mode, calculate progress based on steps and questions
    const stepsBeforeCurrent = currentStep - 1; // Steps fully completed
    const baseProgress = (stepsBeforeCurrent / totalSteps) * 100; // Progress from completed steps

    if (currentStep === 1) return 0; // First step (intro) has no questions

    // If we're in step 2 or 3 (questionnaire steps)
    if (currentStep === 2 || currentStep === 3) {
      const questionProgress =
        (currentQuestion / totalQuestions) * (100 / totalSteps);
      return baseProgress + questionProgress;
    }

    return (currentStep / totalSteps) * 100; // For the last step
  };

  const progress = calculateProgress();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="bg-primary-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-medium mr-2">
              {currentStep}
            </span>
            <span className="text-sm font-medium text-text-primary">
              Étape {currentStep} sur {totalSteps}
            </span>
          </div>
          <span className="bg-primary-500/20 text-primary-300 px-2 py-1 rounded-full text-xs font-medium">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onBack && (
            <Button variant="secondary" onClick={onBack} size="sm">
              Retour
            </Button>
          )}
          {onNext && canContinue && (
            <Button onClick={onNext} size="sm">
              Suivant
            </Button>
          )}
        </div>
      </div>
      <div className="h-2.5 bg-black/40 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
