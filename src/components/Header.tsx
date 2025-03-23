"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useWizard } from "../contexts/WizardContext";
import { useTranslation } from "../contexts/TranslationContext";
import Button from "./Button";
import HighContrastText from "./HighContrastText";

const Header: React.FC = () => {
  const {
    setStep,
    setSoundsCategory,
    setVisualCategory,
    setTextCategory,
    setSelectedCategories,
    setQuestionnaireMode,
  } = useWizard();
  const { language, setLanguage, t } = useTranslation();

  const handleReset = () => {
    setStep(1);
    setSoundsCategory(null);
    setVisualCategory(null);
    setTextCategory(null);
    setSelectedCategories({
      sounds: false,
      visual: false,
      text: false,
    });
    setQuestionnaireMode(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  return (
    <header className="w-full bg-surface-dark border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-4">
          <Link
            href="/"
            onClick={handleReset}
            className="flex items-center text-2xl font-bold text-text-primary mb-4 md:mb-0 hover:text-primary-400 transition-colors"
          >
            <div className="relative w-8 h-8 mr-3">
              <Image
                src="/logo.png"
                alt="Badge AI Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <HighContrastText text={t("appName")} />
          </Link>

          <div className="flex items-center">
            <nav className="mr-6">
              <ul className="flex items-center gap-8">
                <li>
                  <Link
                    href="/"
                    onClick={handleReset}
                    className="text-text-primary hover:text-primary-400 transition-colors font-medium"
                  >
                    <HighContrastText text={t("home")} />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-text-primary hover:text-primary-400 transition-colors font-medium"
                  >
                    <HighContrastText text={t("about")} />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-text-primary hover:text-primary-400 transition-colors font-medium"
                  >
                    <HighContrastText text={t("faq")} />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-text-primary hover:text-primary-400 transition-colors font-medium"
                  >
                    <HighContrastText text={t("contact")} />
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <Button onClick={handleReset} variant="outline">
                {t("reset")}
              </Button>
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors font-medium"
              >
                {language === "fr" ? "EN" : "FR"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
