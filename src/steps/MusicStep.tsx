"use client";

import React from "react";
import { useWizard } from "../contexts/WizardContext";
import RadioGroup from "../components/RadioGroup";
import {
  StepProps,
  musicCategoryOptions,
  musicCategoryOptionsDetailed,
  Category,
} from "../types";

const MusicStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { musicCategory, setMusicCategory } = useWizard();

  const handleOptionSelect = (value: Category) => {
    setMusicCategory(value);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-text-primary">
          Évaluation de votre processus musical
        </h2>
        <p className="mt-2 text-text-secondary">
          Sélectionnez la catégorie qui correspond le mieux à votre processus de
          création musicale.
        </p>
      </div>

      <div className="pt-2">
        <RadioGroup
          options={musicCategoryOptions}
          value={musicCategory}
          onChange={handleOptionSelect}
          detailedOptions={musicCategoryOptionsDetailed}
        />
      </div>
    </div>
  );
};

export default MusicStep;
