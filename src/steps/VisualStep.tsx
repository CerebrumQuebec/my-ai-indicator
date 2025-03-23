"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useWizard } from "../contexts/WizardContext";
import { StepProps, Category, visualCategoryOptions } from "../types";
import RadioGroup from "../components/RadioGroup";
import Button from "../components/Button";
import HighContrastText from "../components/HighContrastText";

const VisualStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const t = useTranslations();
  const { visualCategory, setVisualCategory, setIsQuestionnaireMode } =
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
      setIsQuestionnaireMode(true);
      onNext();
    }
  };

  const localizedOptions = visualCategoryOptions.map((option) => ({
    ...option,
    title: t(option.titleKey),
    description: t(option.descriptionKey),
  }));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          <HighContrastText text={t("visualEvaluationTitle")} />
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t("visualEvaluationDescription")}
        </p>
      </div>

      <RadioGroup
        options={localizedOptions}
        value={visualCategory}
        onChange={handleCategoryChange}
      />

      <div className="flex justify-between mt-8">
        {onBack && (
          <Button onClick={onBack} variant="secondary">
            {t("back")}
          </Button>
        )}
        <div className="flex gap-4">
          <Button onClick={handleQuestionnaireMode} variant="secondary">
            {t("takeQuestionnaire")}
          </Button>
          <Button
            onClick={handleNext}
            disabled={visualCategory === null}
            className="w-full sm:w-auto"
          >
            {t("next")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VisualStep;
