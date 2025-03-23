"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Category, WizardContextType, SelectedCategories } from "@/types";

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const WizardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedCategories, setSelectedCategories] =
    useState<SelectedCategories>({
      sounds: false,
      visual: false,
      text: false,
    });
  const [soundsCategory, setSoundsCategory] = useState<Category>(null);
  const [visualCategory, setVisualCategory] = useState<Category>(null);
  const [textCategory, setTextCategory] = useState<Category>(null);
  const [isQuestionnaireMode, setQuestionnaireMode] = useState<boolean>(false);
  const [soundsQuestionnaireAnswers, setSoundsQuestionnaireAnswers] = useState<
    Record<string, number>
  >({});
  const [visualQuestionnaireAnswers, setVisualQuestionnaireAnswers] = useState<
    Record<string, number>
  >({});
  const [textQuestionnaireAnswers, setTextQuestionnaireAnswers] = useState<
    Record<string, number>
  >({});

  const value: WizardContextType = {
    step,
    setStep,
    selectedCategories,
    setSelectedCategories,
    soundsCategory,
    setSoundsCategory,
    visualCategory,
    setVisualCategory,
    textCategory,
    setTextCategory,
    isQuestionnaireMode,
    setQuestionnaireMode,
    soundsQuestionnaireAnswers,
    setSoundsQuestionnaireAnswers,
    visualQuestionnaireAnswers,
    setVisualQuestionnaireAnswers,
    textQuestionnaireAnswers,
    setTextQuestionnaireAnswers,
  };

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
};

export const useWizard = (): WizardContextType => {
  const context = useContext(WizardContext);

  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider");
  }

  return context;
};

export default WizardContext;
