import React from "react";
import { useTranslation } from "../contexts/TranslationContext";
import { useWizard } from "../contexts/WizardContext";
import { StepProps } from "@/types";
import Button from "@/components/Button";
import HighContrastText from "@/components/HighContrastText";

const CategorySelectionStep: React.FC<StepProps> = ({ onNext }) => {
  const { t } = useTranslation();
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
          style={{
            padding: "1.5rem",
            borderRadius: "0.75rem",
            borderWidth: "4px",
            borderStyle: "solid",
            borderColor: selectedCategories.sounds ? "#3b82f6" : "#4b5563",
            backgroundColor: selectedCategories.sounds
              ? "#1e3a8a"
              : "transparent",
            color: selectedCategories.sounds ? "white" : "inherit",
          }}
          aria-pressed={selectedCategories.sounds}
        >
          <h3 className="text-lg font-semibold mb-2">
            <HighContrastText text={t("soundsCategoryTitle")} />
          </h3>
          <p className="text-sm text-gray-300">
            {t("soundsCategoryDescription")}
          </p>
          {selectedCategories.sounds && (
            <div className="mt-2 p-1 text-center bg-blue-600 text-white text-xs font-bold uppercase rounded">
              Selected
            </div>
          )}
        </button>

        {/* Visual Category */}
        <button
          onClick={() => handleCategoryToggle("visual")}
          style={{
            padding: "1.5rem",
            borderRadius: "0.75rem",
            borderWidth: "4px",
            borderStyle: "solid",
            borderColor: selectedCategories.visual ? "#8b5cf6" : "#4b5563",
            backgroundColor: selectedCategories.visual
              ? "#5b21b6"
              : "transparent",
            color: selectedCategories.visual ? "white" : "inherit",
          }}
          aria-pressed={selectedCategories.visual}
        >
          <h3 className="text-lg font-semibold mb-2">
            <HighContrastText text={t("visualCategoryTitle")} />
          </h3>
          <p className="text-sm text-gray-300">
            {t("visualCategoryDescription")}
          </p>
          {selectedCategories.visual && (
            <div className="mt-2 p-1 text-center bg-purple-600 text-white text-xs font-bold uppercase rounded">
              Selected
            </div>
          )}
        </button>

        {/* Text Category */}
        <button
          onClick={() => handleCategoryToggle("text")}
          style={{
            padding: "1.5rem",
            borderRadius: "0.75rem",
            borderWidth: "4px",
            borderStyle: "solid",
            borderColor: selectedCategories.text ? "#10b981" : "#4b5563",
            backgroundColor: selectedCategories.text
              ? "#065f46"
              : "transparent",
            color: selectedCategories.text ? "white" : "inherit",
          }}
          aria-pressed={selectedCategories.text}
        >
          <h3 className="text-lg font-semibold mb-2">
            <HighContrastText text={t("textCategoryTitle")} />
          </h3>
          <p className="text-sm text-gray-300">
            {t("textCategoryDescription")}
          </p>
          {selectedCategories.text && (
            <div className="mt-2 p-1 text-center bg-green-600 text-white text-xs font-bold uppercase rounded">
              Selected
            </div>
          )}
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
