"use client";

import React, { useEffect } from "react";
import { useWizard } from "../contexts/WizardContext";
import { useTranslation } from "../contexts/TranslationContext";
import RadioGroup from "../components/RadioGroup";
import {
  StepProps,
  textCategoryOptions,
  textCategoryOptionsDetailed,
  Category,
} from "../types";
import Button from "../components/Button";
import HighContrastText from "../components/HighContrastText";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import Image from "next/image";

const TextStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { textCategory, setTextCategory, setQuestionnaireMode } = useWizard();
  const { t } = useTranslation();

  useEffect(() => {
    //console.log("TextStep - textCategoryOptions:", textCategoryOptions);
    //console.log("TextStep - category0Title translation:", t("category0Title"));
    //console.log(
    //  "TextStep - category0Description translation:",
    //  t("category0Description")
    //);
  }, [t]);

  const handleCategoryChange = (value: Category) => {
    setTextCategory(value);
  };

  const handleNext = () => {
    if (onNext && textCategory !== null) {
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
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-primary-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-20 w-72 h-72 bg-accent-indigo rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-primary-600 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          <HighContrastText text={t("textEvaluationTitle")} />
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {t("textEvaluationDescription")}
        </p>
      </div>

      <RadioGroup
        options={textCategoryOptions.map((option) => ({
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
                <div className="text-primary-400 font-mono mt-1">
                  T-AI-{option.id}
                </div>
              </div>
            </div>
          ),
          description: "",
        }))}
        value={textCategory}
        onChange={handleCategoryChange}
        name="text-category"
      />

      <div className="flex justify-between items-center mt-8">
        {onBack && (
          <Button onClick={onBack} variant="secondary">
            {t("back")}
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={textCategory === null}
          variant="primary"
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default TextStep;
