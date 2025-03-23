"use client";

import React from "react";
import { useTranslation } from "../contexts/TranslationContext";
import { useWizard } from "../contexts/WizardContext";
import { StepProps, Category, soundsCategoryOptions } from "../types";
import Button from "../components/Button";
import HighContrastText from "../components/HighContrastText";
import RadioGroup from "../components/RadioGroup";

const SoundsStep: React.FC<StepProps> = ({ onNext, onBack = () => {} }) => {
  const { t } = useTranslation();
  const { soundsCategory, setSoundsCategory, setQuestionnaireMode } =
    useWizard();

  const handleCategoryChange = (value: Category) => {
    setSoundsCategory(value);
    if (onNext) onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          <HighContrastText text={t("musicEvaluationTitle")} />
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t("musicEvaluationDescription")}
        </p>
      </div>

      <RadioGroup
        options={soundsCategoryOptions}
        value={soundsCategory}
        onChange={handleCategoryChange}
      />

      <div className="flex justify-center">
        <Button
          onClick={() => {
            setQuestionnaireMode(true);
            if (onNext) onNext();
          }}
          variant="outline"
        >
          {t("takeQuestionnaire")}
        </Button>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline">
          {t("back")}
        </Button>
      </div>
    </div>
  );
};

export default SoundsStep;
