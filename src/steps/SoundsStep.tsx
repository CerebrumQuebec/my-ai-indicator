"use client";

import React, { useEffect } from "react";
import { useTranslation } from "../contexts/TranslationContext";
import { useWizard } from "../contexts/WizardContext";
import { StepProps, Category, soundsCategoryOptions } from "../types/index";
import Button from "../components/Button";
import HighContrastText from "../components/HighContrastText";
import RadioGroup from "../components/RadioGroup";
import { FaVolumeUp } from "react-icons/fa";
import Image from "next/image";

const SoundsStep: React.FC<StepProps> = ({ onNext, onBack = () => {} }) => {
  const { t } = useTranslation();
  const { soundsCategory, setSoundsCategory, setQuestionnaireMode } =
    useWizard();

  // Debug current state
  useEffect(() => {
    //console.log("SoundsStep - Component mounted");
    //console.log("SoundsStep - Current soundsCategory:", soundsCategory);
    //console.log("SoundsStep - Available options:", soundsCategoryOptions);
    // Check if options are properly defined
    if (!soundsCategoryOptions || soundsCategoryOptions.length === 0) {
      //console.error("SoundsStep - No options available!");
    } else {
      //console.log(
      //  "SoundsStep - Number of options:",
      //  soundsCategoryOptions.length
      //);
      //soundsCategoryOptions.forEach((option) => {
      //  console.log("Option:", {
      //    id: option.id,
      //    titleKey: option.titleKey,
      //    descriptionKey: option.descriptionKey,
      //    translatedTitle: t(option.titleKey),
      //    translatedDescription: t(option.descriptionKey),
      //  });
      //});
    }
  }, [soundsCategory, t]);

  const handleCategoryChange = (value: Category) => {
    //console.log("SoundsStep - handleCategoryChange called with value:", value);
    setSoundsCategory(value);
  };

  const handleNext = () => {
    //console.log("SoundsStep - handleNext called, category:", soundsCategory);
    if (onNext && soundsCategory !== null) {
      //console.log("SoundsStep - Calling onNext to advance to next step");
      onNext();
    } else {
      //console.log(
      //  "SoundsStep - Cannot advance: onNext is null or category is null"
      //);
    }
  };

  const handleQuestionnaireMode = () => {
    //console.log("SoundsStep - handleQuestionnaireMode called");
    if (onNext) {
      //console.log("SoundsStep - Setting questionnaire mode and calling onNext");
      setQuestionnaireMode(true);
      onNext();
    } else {
      //console.log(
      //  "SoundsStep - Cannot advance to questionnaire: onNext is null"
      //);
    }
  };

  // Ensure we have valid options before rendering
  if (!soundsCategoryOptions || soundsCategoryOptions.length === 0) {
    //console.error("SoundsStep - No options available for rendering");
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Background decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-primary-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-2/3 left-20 w-64 h-64 bg-primary-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-indigo rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          <HighContrastText text={t("soundsEvaluationTitle")} />
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {t("soundsEvaluationDescription")}
        </p>
      </div>

      <RadioGroup
        options={soundsCategoryOptions.map((option) => ({
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
                  S-AI-{option.id}
                </div>
              </div>
            </div>
          ),
          description: "",
        }))}
        value={soundsCategory}
        onChange={handleCategoryChange}
        name="sounds-category"
      />

      <div className="flex justify-between items-center mt-8">
        {onBack && (
          <Button onClick={onBack} variant="secondary">
            {t("back")}
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={soundsCategory === null}
          variant="primary"
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default SoundsStep;
