"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWizard } from "../contexts/WizardContext";
import { useTranslation } from "../contexts/TranslationContext";
import Button from "./Button";
import HighContrastText from "./HighContrastText";
import DonateButton from "./DonationButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    step,
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
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(language === "fr" ? "en" : "fr");
  };

  const navItems = [
    { href: "/", label: t("home"), onClick: handleReset },
    { href: "/about", label: t("about") },
    { href: "/faq", label: t("faq") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-dark/95 backdrop-blur-sm border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            onClick={handleReset}
            className="flex items-center space-x-3 text-2xl font-bold text-text-primary hover:text-primary-400 transition-colors"
          >
            <div className="relative w-8 h-8">
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

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-primary hover:text-primary-400 hover:bg-surface-card focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={item.onClick}
                    className="text-text-primary hover:text-primary-400 transition-colors font-medium relative group"
                  >
                    <HighContrastText text={item.label} />
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-4">
              <DonateButton locale={language} />
              <button
                onClick={toggleLanguage}
                className="px-3 py-1.5 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md active:transform active:scale-95"
              >
                {language === "fr" ? "EN" : "FR"}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile navigation */}
        <div
          className={`md:hidden transition-all duration-200 ease-in-out ${
            isMenuOpen
              ? "max-h-screen opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          }`}
        >
          <nav className="py-4 space-y-4">
            <ul className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={item.onClick}
                    className="block text-text-primary hover:text-primary-400 transition-colors font-medium"
                  >
                    <HighContrastText text={item.label} />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-col space-y-4 pt-4 border-t border-white/10">
              <DonateButton locale={language} />
              <button
                onClick={toggleLanguage}
                className="w-full px-3 py-1.5 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md active:transform active:scale-95"
              >
                {language === "fr" ? "EN" : "FR"}
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
