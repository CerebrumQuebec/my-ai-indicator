"use client";

import React from "react";
import { useTranslation } from "../contexts/TranslationContext";
import { useWizard } from "../contexts/WizardContext";
import { StepProps, Category, visualCategoryOptions } from "../types";
import RadioGroup from "../components/RadioGroup";
import Button from "../components/Button";
import HighContrastText from "../components/HighContrastText";
import { AiFillEye } from "react-icons/ai";

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

  const adaptedOptions = visualCategoryOptions.map((option) => ({
    value: option.id,
    label: t(option.titleKey),
    description: t(option.descriptionKey),
  }));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <AiFillEye size={32} className="text-primary-500" />
          <h2 className="text-2xl font-bold">
            <HighContrastText text={t("visualEvaluationTitle")} />
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {t("visualEvaluationDescription")}
        </p>
      </div>

      <RadioGroup
        options={adaptedOptions}
        value={visualCategory}
        onChange={handleCategoryChange}
        name="visual-category"
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
