"use client";

import React from "react";
import { useWizard } from "../contexts/WizardContext";
import { useTranslation } from "../contexts/TranslationContext";
import RadioGroup from "../components/RadioGroup";
import {
  StepProps,
  textCategoryOptions,
  textCategoryOptionsDetailed,
  Category,
} from "../types";

const TextStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { textCategory, setTextCategory } = useWizard();
  const { t } = useTranslation();

  const handleOptionSelect = (value: Category) => {
    if (value === textCategory) {
      onNext();
    } else {
      setTextCategory(value);
      onNext();
    }
  };

  // Transform options with translation keys into options with localized strings
  const localizedOptions = textCategoryOptions.map((option) => ({
    id: option.id,
    title: t(option.titleKey),
    description: t(option.descriptionKey),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-text-primary">
          {t("textEvaluationTitle")}
        </h2>
        <p className="mt-2 text-text-secondary">
          {t("textEvaluationDescription")}
        </p>
      </div>

      <div className="pt-2">
        <RadioGroup
          options={localizedOptions}
          value={textCategory}
          onChange={handleOptionSelect}
          detailedOptions={textCategoryOptionsDetailed}
        />
      </div>
    </div>
  );
};

export default TextStep;
