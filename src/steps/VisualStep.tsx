"use client";

import React from "react";
import { useTranslation } from "../contexts/TranslationContext";
import { useWizard } from "../contexts/WizardContext";
import { StepProps, Category, visualCategoryOptions } from "../types";
import RadioGroup from "../components/RadioGroup";
import Button from "../components/Button";
import HighContrastText from "../components/HighContrastText";
import { AiFillEye } from "react-icons/ai";
import Image from "next/image";

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
      {/* Background decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-accent-indigo rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-20 w-72 h-72 bg-primary-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent-indigo rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          <HighContrastText text={t("visualEvaluationTitle")} />
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {t("visualEvaluationDescription")}
        </p>
      </div>

      <RadioGroup
        options={visualCategoryOptions.map((option) => ({
          value: option.id,
          label: (
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={`/badges/category-${option.id}.svg`}
                  alt={`Category ${option.id} badge`}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <div className="font-semibold text-lg">
                  {t(option.titleKey)}
                </div>
                <div className="text-sm text-gray-400">
                  {t(option.descriptionKey)}
                </div>
                <div className="text-accent-indigo font-mono mt-1">
                  V-AI-{option.id}
                </div>
              </div>
            </div>
          ),
          description: "",
        }))}
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
