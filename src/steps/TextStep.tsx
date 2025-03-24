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

const TextStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { textCategory, setTextCategory, setQuestionnaireMode } = useWizard();
  const { t } = useTranslation();

  useEffect(() => {
    console.log("TextStep - textCategoryOptions:", textCategoryOptions);
    console.log("TextStep - category0Title translation:", t("category0Title"));
    console.log(
      "TextStep - category0Description translation:",
      t("category0Description")
    );
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

  const adaptedOptions = textCategoryOptions.map((option) => ({
    value: option.id,
    label: t(option.titleKey),
    description: t(option.descriptionKey),
  }));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BiSolidMessageSquareDetail size={32} className="text-primary-500" />
          <h2 className="text-2xl font-bold">
            <HighContrastText text={t("textEvaluationTitle")} />
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {t("textEvaluationDescription")}
        </p>
      </div>

      <RadioGroup
        options={adaptedOptions}
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
