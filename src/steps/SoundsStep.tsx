"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useWizard } from "../contexts/WizardContext";
import { StepProps, Category } from "../types";
import Button from "../components/Button";
import HighContrastText from "../components/HighContrastText";

const SoundsStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const t = useTranslations();
  const { soundsCategory, setSoundsCategory, setQuestionnaireMode } =
    useWizard();

  const handleCategoryChange = (value: Category) => {
    setSoundsCategory(value);
    onNext?.();
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[0, 1, 2, 3, 4].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category as Category)}
            className={`p-4 rounded-lg border transition-colors ${
              soundsCategory === category
                ? "bg-primary-500 border-primary-600 text-white"
                : "bg-surface-card border-white/10 hover:bg-surface-hover"
            }`}
          >
            <h3 className="font-semibold mb-2">
              {t(`category${category}Title`)}
            </h3>
            <p className="text-sm opacity-90">
              {t(`category${category}Description`)}
            </p>
          </button>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => {
            setQuestionnaireMode(true);
            onNext?.();
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
