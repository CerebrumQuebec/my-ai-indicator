"use client";

import { useWizard } from "../contexts/WizardContext";
import { useTranslation } from "../contexts/TranslationContext";
import { SelectedCategories } from "../types";

interface ManualSelectionStepProps {
  onNext: () => void;
  onBack: () => void;
}

export default function ManualSelectionStep({
  onNext,
  onBack,
}: ManualSelectionStepProps) {
  const { selectedCategories, setSelectedCategories } = useWizard();
  const { t } = useTranslation();

  const toggleCategory = (category: keyof SelectedCategories) => {
    const newCategories: SelectedCategories = {
      ...selectedCategories,
      [category]: !selectedCategories[category],
    };
    setSelectedCategories(newCategories);
  };

  const isAnyCategorySelected = Object.values(selectedCategories).some(Boolean);

  // Add debugging console log
  //console.log("Current selected categories:", selectedCategories);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-text-primary">
          {t("categorySelectionTitle")}
        </h2>
        <p className="text-text-secondary">
          {t("categorySelectionDescription")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <button
          onClick={() => toggleCategory("sounds")}
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
            {t("soundsCategoryTitle")}
          </h3>
          <p className="text-sm text-gray-300">
            {t("soundsCategoryDescription")}
          </p>
          {selectedCategories.sounds && (
            <div className="mt-2 p-1 text-center bg-blue-600 text-white text-xs font-bold uppercase rounded">
              {t("selected")}
            </div>
          )}
        </button>

        <button
          onClick={() => toggleCategory("visual")}
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
            {t("visualCategoryTitle")}
          </h3>
          <p className="text-sm text-gray-300">
            {t("visualCategoryDescription")}
          </p>
          {selectedCategories.visual && (
            <div className="mt-2 p-1 text-center bg-purple-600 text-white text-xs font-bold uppercase rounded">
              {t("selected")}
            </div>
          )}
        </button>

        <button
          onClick={() => toggleCategory("text")}
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
            {t("textCategoryTitle")}
          </h3>
          <p className="text-sm text-gray-300">
            {t("textCategoryDescription")}
          </p>
          {selectedCategories.text && (
            <div className="mt-2 p-1 text-center bg-green-600 text-white text-xs font-bold uppercase rounded">
              {t("selected")}
            </div>
          )}
        </button>
      </div>

      <div className="flex justify-between pt-8">
        <button
          onClick={onBack}
          className="px-6 py-2 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
        >
          {t("back")}
        </button>
        <button
          onClick={onNext}
          disabled={!isAnyCategorySelected}
          className={`px-6 py-2 rounded-lg transition-colors ${
            isAnyCategorySelected
              ? "bg-primary-500 text-white hover:bg-primary-600"
              : "bg-gray-500 text-gray-300 cursor-not-allowed"
          }`}
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
}
