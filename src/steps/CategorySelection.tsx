"use client";

import { useWizard } from "../contexts/WizardContext";
import { useTranslation } from "../contexts/TranslationContext";

interface CategorySelectionProps {
  onNext: () => void;
  onBack: () => void;
}

export default function CategorySelection({
  onNext,
  onBack,
}: CategorySelectionProps) {
  const { selectedCategories, setSelectedCategories } = useWizard();
  const { t } = useTranslation();

  const toggleCategory = (category: keyof typeof selectedCategories) => {
    setSelectedCategories({
      ...selectedCategories,
      [category]: !selectedCategories[category],
    });
  };

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
          className={`p-6 rounded-xl border-2 transition-all ${
            selectedCategories.sounds
              ? "border-primary bg-primary/10"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">
            {t("soundsCategoryTitle")}
          </h3>
          <p className="text-sm text-text-secondary">
            {t("soundsCategoryDescription")}
          </p>
        </button>

        <button
          onClick={() => toggleCategory("visual")}
          className={`p-6 rounded-xl border-2 transition-all ${
            selectedCategories.visual
              ? "border-primary bg-primary/10"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">
            {t("visualCategoryTitle")}
          </h3>
          <p className="text-sm text-text-secondary">
            {t("visualCategoryDescription")}
          </p>
        </button>

        <button
          onClick={() => toggleCategory("text")}
          className={`p-6 rounded-xl border-2 transition-all ${
            selectedCategories.text
              ? "border-primary bg-primary/10"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">
            {t("textCategoryTitle")}
          </h3>
          <p className="text-sm text-text-secondary">
            {t("textCategoryDescription")}
          </p>
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
          disabled={!Object.values(selectedCategories).some(Boolean)}
          className="px-6 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
}
