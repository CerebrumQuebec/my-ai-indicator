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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          <HighContrastText text={t("textEvaluationTitle")} />
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t("textEvaluationDescription")}
        </p>
      </div>

      <RadioGroup
        options={textCategoryOptions}
        value={textCategory}
        onChange={handleCategoryChange}
        detailedOptions={textCategoryOptionsDetailed}
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
            disabled={textCategory === null}
            className="w-full sm:w-auto"
          >
            {t("next")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TextStep;
