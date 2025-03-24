"use client";

import React from "react";
import { useTranslation } from "../contexts/TranslationContext";
import { useWizard } from "../contexts/WizardContext";
import { StepProps, Category, visualCategoryOptions } from "../types";
import RadioGroup from "../components/RadioGroup";
import Button from "../components/Button";
import HighContrastText from "../components/HighContrastText";

const VisualStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { t } = useTranslation();
  const { visualCategory, setVisualCategory, setQuestionnaireMode } =
    useWizard();

  const handleCategoryChange = (value: Category) => {
    setVisualCategory(value);
  };

  const handleNext = () => {
    if (onNext && visualCategory !== null) {
      onNext();
    }
  };

  const handleQuestionnaireMode = () => {
    if (onNext) {
      setQuestionnaireMode(true);
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          <HighContrastText text={t("visualEvaluationTitle")} />
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {t("visualEvaluationDescription")}
        </p>
        <Button
          onClick={handleQuestionnaireMode}
          variant="secondary"
          className="mx-auto"
        >
          {t("takeQuestionnaire")}
        </Button>
      </div>

      <RadioGroup
        options={visualCategoryOptions}
        value={visualCategory}
        onChange={handleCategoryChange}
      />

      <div className="flex justify-between items-center mt-8">
        {onBack && (
          <Button onClick={onBack} variant="secondary">
            {t("back")}
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={visualCategory === null}
          variant="primary"
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default VisualStep;
