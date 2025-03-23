"use client";

import React, { createContext, useContext, useState } from "react";

// Types
type Category = 0 | 1 | 2 | 3 | 4 | null;
type ContentType = "sounds" | "visual" | "text";

interface SelectedCategories {
  sounds: boolean;
  visual: boolean;
  text: boolean;
}

interface WizardContextType {
  step: number;
  setStep: (step: number) => void;
  isQuestionnaireMode: boolean;
  setIsQuestionnaireMode: (mode: boolean) => void;

  // Categories
  soundsCategory: Category;
  setSoundsCategory: (category: Category) => void;
  visualCategory: Category;
  setVisualCategory: (category: Category) => void;
  textCategory: Category;
  setTextCategory: (category: Category) => void;

  // Selected Categories tracking
  selectedCategories: SelectedCategories;
  setSelectedCategories: (categories: SelectedCategories) => void;

  // Questionnaire answers
  soundsQuestionnaireAnswers: number[];
  setSoundsQuestionnaireAnswers: (answers: number[]) => void;
  visualQuestionnaireAnswers: number[];
  setVisualQuestionnaireAnswers: (answers: number[]) => void;
  textQuestionnaireAnswers: number[];
  setTextQuestionnaireAnswers: (answers: number[]) => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  const [isQuestionnaireMode, setIsQuestionnaireMode] = useState(false);

  // Categories
  const [soundsCategory, setSoundsCategory] = useState<Category>(null);
  const [visualCategory, setVisualCategory] = useState<Category>(null);
  const [textCategory, setTextCategory] = useState<Category>(null);

  // Selected Categories
  const [selectedCategories, setSelectedCategories] =
    useState<SelectedCategories>({
      sounds: false,
      visual: false,
      text: false,
    });

  // Questionnaire answers
  const [soundsQuestionnaireAnswers, setSoundsQuestionnaireAnswers] = useState<
    number[]
  >([]);
  const [visualQuestionnaireAnswers, setVisualQuestionnaireAnswers] = useState<
    number[]
  >([]);
  const [textQuestionnaireAnswers, setTextQuestionnaireAnswers] = useState<
    number[]
  >([]);

  const value = {
    step,
    setStep,
    isQuestionnaireMode,
    setIsQuestionnaireMode,
    soundsCategory,
    setSoundsCategory,
    visualCategory,
    setVisualCategory,
    textCategory,
    setTextCategory,
    selectedCategories,
    setSelectedCategories,
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
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
