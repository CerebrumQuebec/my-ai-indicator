"use client";

import React from "react";
import { useWizard } from "../contexts/WizardContext";
import RadioGroup from "../components/RadioGroup";
import {
  StepProps,
  textCategoryOptions,
  textCategoryOptionsDetailed,
  Category,
} from "../types";

const TextStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { textCategory, setTextCategory } = useWizard();

  const handleOptionSelect = (value: Category) => {
    if (value === textCategory) {
      onNext();
    } else {
      setTextCategory(value);
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-text-primary">
          Évaluation de votre processus textuel
        </h2>
        <p className="mt-2 text-text-secondary">
          Sélectionnez la catégorie qui correspond le mieux à votre processus de
          création textuelle.
        </p>
      </div>

      <div className="pt-2">
        <RadioGroup
          options={textCategoryOptions}
          value={textCategory}
          onChange={handleOptionSelect}
          detailedOptions={textCategoryOptionsDetailed}
        />
      </div>
    </div>
  );
};

export default TextStep;
