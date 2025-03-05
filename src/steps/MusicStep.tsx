"use client";

import React from "react";
import { useWizard } from "../contexts/WizardContext";
import { useTranslation } from "../contexts/TranslationContext";
import RadioGroup from "../components/RadioGroup";
import {
  StepProps,
  musicCategoryOptions,
  musicCategoryOptionsDetailed,
  Category,
} from "../types";

const MusicStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { musicCategory, setMusicCategory } = useWizard();
  const { t } = useTranslation();

  const handleOptionSelect = (value: Category) => {
    setMusicCategory(value);
    onNext();
  };

  // Transform options with translation keys into options with localized strings
  const localizedOptions = musicCategoryOptions.map((option) => ({
    id: option.id,
    title: t(option.titleKey),
    description: t(option.descriptionKey),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-text-primary">
          {t("musicEvaluationTitle")}
        </h2>
        <p className="mt-2 text-text-secondary">
          {t("musicEvaluationDescription")}
        </p>
      </div>

      <div className="pt-2">
        <RadioGroup
          options={localizedOptions}
          value={musicCategory}
          onChange={handleOptionSelect}
          detailedOptions={musicCategoryOptionsDetailed}
        />
      </div>
    </div>
  );
};

export default MusicStep;
