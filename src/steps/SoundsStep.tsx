"use client";

import React, { useEffect } from "react";
import { useTranslation } from "../contexts/TranslationContext";
import { useWizard } from "../contexts/WizardContext";
import { StepProps, Category, soundsCategoryOptions } from "../types/index";
import Button from "../components/Button";
import HighContrastText from "../components/HighContrastText";
import RadioGroup from "../components/RadioGroup";

const SoundsStep: React.FC<StepProps> = ({ onNext, onBack = () => {} }) => {
  const { t } = useTranslation();
  const { soundsCategory, setSoundsCategory, setQuestionnaireMode } =
    useWizard();

  // Debug current state
  useEffect(() => {
    console.log("SoundsStep - Component mounted");
    console.log("SoundsStep - Current soundsCategory:", soundsCategory);
    console.log("SoundsStep - Available options:", soundsCategoryOptions);
    // Check if options are properly defined
    if (!soundsCategoryOptions || soundsCategoryOptions.length === 0) {
      console.error("SoundsStep - No options available!");
    } else {
      console.log(
        "SoundsStep - Number of options:",
        soundsCategoryOptions.length
      );
      soundsCategoryOptions.forEach((option) => {
        console.log("Option:", {
          id: option.id,
          titleKey: option.titleKey,
          descriptionKey: option.descriptionKey,
          translatedTitle: t(option.titleKey),
          translatedDescription: t(option.descriptionKey),
        });
      });
    }
  }, [soundsCategory, t]);

  const handleCategoryChange = (value: Category) => {
    console.log("SoundsStep - handleCategoryChange called with value:", value);
    setSoundsCategory(value);
  };

  const handleNext = () => {
    if (onNext && soundsCategory !== null) {
      onNext();
    }
  };

  const handleQuestionnaireMode = () => {
    if (onNext) {
      setQuestionnaireMode(true);
      onNext();
    }
  };

  // Ensure we have valid options before rendering
  if (!soundsCategoryOptions || soundsCategoryOptions.length === 0) {
    console.error("SoundsStep - No options available for rendering");
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          <HighContrastText text={t("soundsEvaluationTitle")} />
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {t("soundsEvaluationDescription")}
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
        options={soundsCategoryOptions}
        value={soundsCategory}
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
