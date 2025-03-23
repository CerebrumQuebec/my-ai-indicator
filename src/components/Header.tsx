"use client";

import React from "react";
import { useWizard } from "../contexts/WizardContext";
import { useTranslation } from "../contexts/TranslationContext";
import Button from "./Button";
import HighContrastText from "./HighContrastText";
import Link from "next/link";

const Header: React.FC = () => {
  const {
    setStep,
    setSoundsCategory,
    setVisualCategory,
    setTextCategory,
    setSelectedCategories,
  } = useWizard();
  const { t } = useTranslation();

  const handleReset = () => {
    setStep(0);
    setSoundsCategory(null);
    setVisualCategory(null);
    setTextCategory(null);
    setSelectedCategories({
      sounds: false,
      visual: false,
      text: false,
    });
  };

  return (
    <header className="w-full max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <Link href="/" onClick={handleReset}>
          <h1 className="text-2xl font-bold">
            <HighContrastText text={t("appName")} />
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <Button onClick={handleReset} variant="outline">
            {t("reset")}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
