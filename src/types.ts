export type Category = 0 | 1 | 2 | 3 | 4 | null;

export interface StepProps {
  onNext?: () => void;
  onBack?: () => void;
}

export interface CategoryOption {
  value: Category;
  titleKey: string;
  descriptionKey: string;
}

export interface SelectedCategories {
  sounds: boolean;
  visual: boolean;
  text: boolean;
}

export interface WizardContextType {
  step: number;
  setStep: (step: number) => void;
  selectedCategories: SelectedCategories;
  setSelectedCategories: (categories: SelectedCategories) => void;
  soundsCategory: Category;
  setSoundsCategory: (category: Category) => void;
  visualCategory: Category;
  setVisualCategory: (category: Category) => void;
  textCategory: Category;
  setTextCategory: (category: Category) => void;
  isQuestionnaireMode: boolean;
  setQuestionnaireMode: (mode: boolean) => void;
  soundsQuestionnaireAnswers: Record<string, number>;
  setSoundsQuestionnaireAnswers: (answers: Record<string, number>) => void;
  visualQuestionnaireAnswers: Record<string, number>;
  setVisualQuestionnaireAnswers: (answers: Record<string, number>) => void;
  textQuestionnaireAnswers: Record<string, number>;
  setTextQuestionnaireAnswers: (answers: Record<string, number>) => void;
}

export const visualCategoryOptions: CategoryOption[] = [
  {
    value: 0,
    titleKey: "category0Title",
    descriptionKey: "category0Description",
  },
  {
    value: 1,
    titleKey: "category1Title",
    descriptionKey: "category1Description",
  },
  {
    value: 2,
    titleKey: "category2Title",
    descriptionKey: "category2Description",
  },
  {
    value: 3,
    titleKey: "category3Title",
    descriptionKey: "category3Description",
  },
  {
    value: 4,
    titleKey: "category4Title",
    descriptionKey: "category4Description",
  },
];

export const textCategoryOptions: CategoryOption[] = [
  {
    value: 0,
    titleKey: "textCategory0Title",
    descriptionKey: "textCategory0Description",
  },
  {
    value: 1,
    titleKey: "textCategory1Title",
    descriptionKey: "textCategory1Description",
  },
  {
    value: 2,
    titleKey: "textCategory2Title",
    descriptionKey: "textCategory2Description",
  },
  {
    value: 3,
    titleKey: "textCategory3Title",
    descriptionKey: "textCategory3Description",
  },
  {
    value: 4,
    titleKey: "textCategory4Title",
    descriptionKey: "textCategory4Description",
  },
];

export const textCategoryOptionsDetailed: CategoryOption[] = [
  {
    value: 0,
    titleKey: "textDetailedCategory0Title",
    descriptionKey: "textDetailedCategory0Description",
  },
  {
    value: 1,
    titleKey: "textDetailedCategory1Title",
    descriptionKey: "textDetailedCategory1Description",
  },
  {
    value: 2,
    titleKey: "textDetailedCategory2Title",
    descriptionKey: "textDetailedCategory2Description",
  },
  {
    value: 3,
    titleKey: "textDetailedCategory3Title",
    descriptionKey: "textDetailedCategory3Description",
  },
  {
    value: 4,
    titleKey: "textDetailedCategory4Title",
    descriptionKey: "textDetailedCategory4Description",
  },
];
