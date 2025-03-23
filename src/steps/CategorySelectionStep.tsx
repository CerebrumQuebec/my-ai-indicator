import React from "react";
import { useTranslations } from "next-intl";
import { useWizard } from "../contexts/WizardContext";
import { StepProps } from "@/types";
import Button from "@/components/Button";
import HighContrastText from "@/components/HighContrastText";

const CategorySelectionStep: React.FC<StepProps> = ({ onNext }) => {
  const t = useTranslations();
  const { selectedCategories, setSelectedCategories } = useWizard();

  const handleCategoryToggle = (category: keyof typeof selectedCategories) => {
    setSelectedCategories({
      ...selectedCategories,
      [category]: !selectedCategories[category],
    });
  };

  const isAtLeastOneCategorySelected = Object.values(selectedCategories).some(
    (value) => value
  );

  const handleNext = () => {
    if (onNext && isAtLeastOneCategorySelected) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          <HighContrastText text={t("categorySelectionTitle")} />
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t("categorySelectionDescription")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Sounds Category */}
        <button
          onClick={() => handleCategoryToggle("sounds")}
          className={`p-6 rounded-xl border-2 transition-colors text-left ${
            selectedCategories.sounds
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">
            <HighContrastText text={t("soundsCategoryTitle")} />
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {t("soundsCategoryDescription")}
          </p>
        </button>

        {/* Visual Category */}
        <button
          onClick={() => handleCategoryToggle("visual")}
          className={`p-6 rounded-xl border-2 transition-colors text-left ${
            selectedCategories.visual
              ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
              : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">
            <HighContrastText text={t("visualCategoryTitle")} />
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {t("visualCategoryDescription")}
          </p>
        </button>

        {/* Text Category */}
        <button
          onClick={() => handleCategoryToggle("text")}
          className={`p-6 rounded-xl border-2 transition-colors text-left ${
            selectedCategories.text
              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
              : "border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">
            <HighContrastText text={t("textCategoryTitle")} />
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {t("textCategoryDescription")}
          </p>
        </button>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          onClick={handleNext}
          disabled={!isAtLeastOneCategorySelected}
          className="w-full sm:w-auto"
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default CategorySelectionStep;
