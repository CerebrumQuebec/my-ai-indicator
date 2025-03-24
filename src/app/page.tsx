"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useWizard } from "../contexts/WizardContext";
import { useTranslation } from "../contexts/TranslationContext";
import ProgressBar from "../components/ProgressBar";
import Introduction from "../steps/Introduction";
import SoundsStep from "../steps/SoundsStep";
import TextStep from "../steps/TextStep";
import VisualStep from "../steps/VisualStep";
import SoundsQuestionnaire from "../steps/SoundsQuestionnaire";
import TextQuestionnaire from "../steps/TextQuestionnaire";
import VisualQuestionnaire from "../steps/VisualQuestionnaire";
import Result from "../steps/Result";
import ManualSelectionStep from "../steps/ManualSelectionStep";
import GuidedSelectionStep from "../steps/GuidedSelectionStep";
import {
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  PresentationChartBarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Header from "../components/Header";

export default function Home() {
  const [showWizard, setShowWizard] = useState(false);
  const { t } = useTranslation();
  const {
    step,
    setStep,
    soundsCategory,
    visualCategory,
    textCategory,
    isQuestionnaireMode,
    selectedCategories,
  } = useWizard();

  // Debug current step
  console.log("Current step:", step);
  console.log("Selected categories:", selectedCategories);
  console.log("Sound category:", soundsCategory);
  console.log("Visual category:", visualCategory);
  console.log("Text category:", textCategory);

  // Adjusted step calculation to not count Introduction
  const totalSteps =
    1 + Object.values(selectedCategories).filter(Boolean).length + 1; // Category Selection + Selected Categories + Result
  const totalQuestionsPerStep = 10;

  // Get current question number from the active questionnaire component
  const getCurrentQuestionNumber = () => {
    if (!isQuestionnaireMode || step === totalSteps) return 0;
    const component = document.querySelector("[data-current-question]");
    return component
      ? parseInt(component.getAttribute("data-current-question") || "0")
      : 0;
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const startWizard = () => {
    setStep(2);
    setShowWizard(true);
  };

  // Improved canContinue function to better handle step logic
  const canContinue = () => {
    switch (step) {
      case 1:
        return true;
      case 2:
        return Object.values(selectedCategories).some(Boolean); // At least one category selected
      default:
        const currentStepIndex = step - 3; // Adjust for intro and category selection steps
        const categories = Object.entries(selectedCategories)
          .filter(([_, selected]) => selected)
          .map(([category]) => category);

        if (currentStepIndex >= 0 && currentStepIndex < categories.length) {
          const currentCategory = categories[currentStepIndex];
          switch (currentCategory) {
            case "sounds":
              return soundsCategory !== null;
            case "visual":
              return visualCategory !== null;
            case "text":
              return textCategory !== null;
            default:
              return false;
          }
        }

        // If we've gone through all the selected categories, we can continue to the result
        if (currentStepIndex >= categories.length) {
          return true;
        }

        return false;
    }
  };

  const renderStep = () => {
    // Debug step rendering
    console.log("Rendering step:", step);
    console.log("Total steps:", totalSteps);

    switch (step) {
      case 1:
        return <Introduction onNext={handleNext} />;
      case 2:
        return <ManualSelectionStep onNext={handleNext} onBack={handleBack} />;
      default:
        const currentStepIndex = step - 3; // Adjust for intro and category selection steps
        const categories = Object.entries(selectedCategories)
          .filter(([_, selected]) => selected)
          .map(([category]) => category);

        // If we've gone through all categories steps
        if (currentStepIndex >= categories.length) {
          return <Result onBack={handleBack} />;
        }

        if (currentStepIndex >= 0 && currentStepIndex < categories.length) {
          const currentCategory = categories[currentStepIndex];
          switch (currentCategory) {
            case "sounds":
              return isQuestionnaireMode ? (
                <SoundsQuestionnaire onNext={handleNext} onBack={handleBack} />
              ) : (
                <SoundsStep onNext={handleNext} onBack={handleBack} />
              );
            case "visual":
              return isQuestionnaireMode ? (
                <VisualQuestionnaire onNext={handleNext} onBack={handleBack} />
              ) : (
                <VisualStep onNext={handleNext} onBack={handleBack} />
              );
            case "text":
              return isQuestionnaireMode ? (
                <TextQuestionnaire onNext={handleNext} onBack={handleBack} />
              ) : (
                <TextStep onNext={handleNext} onBack={handleBack} />
              );
          }
        }

        // Default fallback
        return <Introduction onNext={handleNext} />;
    }
  };

  // If wizard is active, show the wizard interface
  if (showWizard) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Header showWizard={showWizard} setShowWizard={setShowWizard} />
        <div className="glass-panel overflow-hidden relative">
          <div className="absolute inset-0 -z-10 opacity-5 bg-gradient-to-tr from-primary-600/20 to-accent-indigo/20"></div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent-indigo rounded-full opacity-10 blur-3xl"></div>

          <div className="p-6 md:p-8 relative z-10">
            {step > 1 && (
              <div className="mb-8">
                <ProgressBar
                  currentStep={step - 1} // Subtract 1 to not count Introduction
                  totalSteps={totalSteps}
                  onBack={handleBack}
                  onNext={handleNext}
                  canContinue={canContinue()}
                  isQuestionnaireMode={isQuestionnaireMode}
                  currentQuestion={getCurrentQuestionNumber()}
                  totalQuestions={totalQuestionsPerStep}
                />
              </div>
            )}
            <div className="transition-opacity duration-300">
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Otherwise show the landing page
  return (
    <div className="w-full">
      <Header showWizard={showWizard} setShowWizard={setShowWizard} />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary-500 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute top-1/3 left-0 w-72 h-72 bg-accent-indigo rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-600 rounded-full opacity-10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-1/2 space-y-8">
              <div className="inline-block relative">
                <span className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-indigo rounded-md blur opacity-30"></span>
                <span className="relative bg-surface-dark px-4 py-1 text-sm font-medium rounded-md border border-white/10">
                  {t("appName")} — {t("welcomeTitle")}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="animated-gradient-text block">
                  {t("metaTitle")}
                </span>
                <span className="text-text-primary mt-2 block">
                  {t("metaDescription")}
                </span>
              </h1>

              <p className="text-lg text-text-secondary max-w-2xl">
                {t("welcomeDescription")}
              </p>

              <div className="flex flex-wrap gap-3 mt-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-500/20 text-primary-400 border border-primary-500/30">
                  <span className="font-mono mr-1">S.AI.0-4</span> Sounds
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent-indigo/20 text-accent-indigo border border-accent-indigo/30">
                  <span className="font-mono mr-1">V.AI.0-4</span> Visual
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-600/20 text-primary-200 border border-primary-600/30">
                  <span className="font-mono mr-1">T.AI.0-4</span> Text
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={startWizard}
                  className="group relative inline-flex items-center px-8 py-3 text-base font-medium rounded-xl bg-primary-500 text-white hover:bg-primary-400 transition-colors"
                >
                  <span className="relative flex items-center">
                    {t("start")}
                    <ArrowRightIcon className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </button>

                <Link
                  href="/about"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-xl border border-white/10 text-text-primary hover:bg-surface-card/50 transition-colors"
                >
                  {t("about")}
                </Link>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-accent-indigo/20 rounded-3xl blur-xl"></div>
                <div className="relative bg-surface-card/40 backdrop-blur-sm border border-white/10 rounded-3xl p-6 shadow-xl">
                  <div className="flex items-center justify-center mb-4">
                    <h3 className="text-lg font-medium text-text-primary">
                      <span className="animated-gradient-text">
                        {t("categorySelectionTitle")}
                      </span>
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="flex flex-col items-center p-2 rounded-xl bg-primary-500/20 border border-primary-500/30 transition-transform hover:scale-105">
                      <span className="text-xs uppercase font-medium text-primary-400 mb-1">
                        Sounds
                      </span>
                      <div className="w-12 h-12 relative">
                        <Image
                          src="/icons/sounds-icon.svg"
                          alt="Sounds category"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-xl bg-accent-indigo/20 border border-accent-indigo/30 transition-transform hover:scale-105">
                      <span className="text-xs uppercase font-medium text-accent-indigo mb-1">
                        Visual
                      </span>
                      <div className="w-12 h-12 relative">
                        <Image
                          src="/icons/visual-icon.svg"
                          alt="Visual category"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-xl bg-primary-600/20 border border-primary-600/30 transition-transform hover:scale-105">
                      <span className="text-xs uppercase font-medium text-primary-200 mb-1">
                        Text
                      </span>
                      <div className="w-12 h-12 relative">
                        <Image
                          src="/icons/text-icon.svg"
                          alt="Text category"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[0, 1, 2, 3, 4].map((category) => (
                      <div
                        key={category}
                        className="flex flex-col items-center p-2 rounded-xl bg-surface-dark/60 border border-white/5 transition-transform hover:scale-105"
                      >
                        <div className="w-12 h-12 relative mb-1">
                          <Image
                            src={`/badges/category-${category}.svg`}
                            alt={`Category ${category} badge`}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-xs text-center text-text-secondary">
                          {t(`category${category}Title`)}
                        </span>
                      </div>
                    ))}
                    <div className="col-span-5 flex flex-col items-center p-3 rounded-xl bg-gradient-to-r from-primary-500/20 to-accent-indigo/20 border border-white/10 mt-3">
                      <p className="text-sm text-center text-text-primary">
                        {t("howItWorksContent")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="animated-gradient-text">{t("whyIndicate")}</span>
            </h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              {t("whyIndicateContent")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-surface-card/40 backdrop-blur-sm border border-white/10 hover:border-primary-500/30 transition-all group">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-colors">
                <ShieldCheckIcon className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">
                {t("howItWorks")}
              </h3>
              <p className="text-text-secondary">{t("howItWorksContent")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-card/40 backdrop-blur-sm border border-white/10 hover:border-primary-500/30 transition-all group">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-colors">
                <SparklesIcon className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">
                {t("ccInspiration")}
              </h3>
              <p className="text-text-secondary">{t("ccInspirationIntro")}</p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-card/40 backdrop-blur-sm border border-white/10 hover:border-primary-500/30 transition-all group">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500/30 transition-colors">
                <DocumentTextIcon className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-text-primary">
                {t("metaTitle")}
              </h3>
              <p className="text-text-secondary">{t("footerDescription")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="animated-gradient-text">
                {t("aboutCategoriesTitle")}
              </span>
            </h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              {t("aboutCategoriesText")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 rounded-2xl bg-primary-500/10 backdrop-blur-sm border border-primary-500/20 flex flex-col items-center text-center group transition-all">
              <div className="w-16 h-16 relative mb-4">
                <Image
                  src="/icons/sounds-icon.svg"
                  alt="Sounds category"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-400">
                {t("soundsCategoryTitle")}
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                {t("soundsCategoryDescription")}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className="inline-flex items-center px-2 py-1 rounded text-xs font-mono bg-primary-500/20 text-primary-400 border border-primary-500/30"
                  >
                    S.AI.{level}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-accent-indigo/10 backdrop-blur-sm border border-accent-indigo/20 flex flex-col items-center text-center group transition-all">
              <div className="w-16 h-16 relative mb-4">
                <Image
                  src="/icons/visual-icon.svg"
                  alt="Visual category"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-accent-indigo">
                {t("visualCategoryTitle")}
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                {t("visualCategoryDescription")}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className="inline-flex items-center px-2 py-1 rounded text-xs font-mono bg-accent-indigo/20 text-accent-indigo border border-accent-indigo/30"
                  >
                    V.AI.{level}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-primary-600/10 backdrop-blur-sm border border-primary-600/20 flex flex-col items-center text-center group transition-all">
              <div className="w-16 h-16 relative mb-4">
                <Image
                  src="/icons/text-icon.svg"
                  alt="Text category"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-200">
                {t("textCategoryTitle")}
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                {t("textCategoryDescription")}
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className="inline-flex items-center px-2 py-1 rounded text-xs font-mono bg-primary-600/20 text-primary-200 border border-primary-600/30"
                  >
                    T.AI.{level}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[0, 1, 2, 3, 4].map((category) => (
              <div
                key={category}
                className="p-6 rounded-2xl bg-surface-card/40 backdrop-blur-sm border border-white/10 flex flex-col items-center text-center group hover:border-primary-500/30 transition-all"
              >
                <div className="w-20 h-20 relative mb-4">
                  <Image
                    src={`/badges/category-${category}.svg`}
                    alt={`Category ${category}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-text-primary">
                  {t(`category${category}Title`)}
                </h3>
                <p className="text-sm text-text-secondary">
                  {t(`category${category}Description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Badge System Section */}
      <section className="py-16 relative z-10 bg-surface-card/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="animated-gradient-text">
                Badge Notation System
              </span>
            </h2>
            <p className="text-text-secondary max-w-3xl mx-auto">
              A standardized system for indicating AI involvement across
              different creative mediums
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-surface-dark/80 backdrop-blur-md rounded-3xl border border-white/10 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500/20 border border-primary-500/30 mb-4">
                    <span className="text-2xl font-mono font-bold text-primary-400">
                      S
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-text-primary">
                    Sounds
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    Music, podcasts, sound effects, and other audio content
                  </p>
                  <code className="px-3 py-1 rounded-lg bg-primary-500/10 text-primary-400 font-mono">
                    S.AI.0-4
                  </code>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent-indigo/20 border border-accent-indigo/30 mb-4">
                    <span className="text-2xl font-mono font-bold text-accent-indigo">
                      V
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-text-primary">
                    Visual
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    Images, videos, animations, and other visual content
                  </p>
                  <code className="px-3 py-1 rounded-lg bg-accent-indigo/10 text-accent-indigo font-mono">
                    V.AI.0-4
                  </code>
                </div>

                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-600/20 border border-primary-600/30 mb-4">
                    <span className="text-2xl font-mono font-bold text-primary-200">
                      T
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-text-primary">
                    Text
                  </h3>
                  <p className="text-sm text-text-secondary mb-3">
                    Written content like books, social media posts, emails, and
                    code
                  </p>
                  <code className="px-3 py-1 rounded-lg bg-primary-600/10 text-primary-200 font-mono">
                    T.AI.0-4
                  </code>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex flex-wrap justify-center gap-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center mb-2">
                      <span className="text-lg font-mono font-bold text-text-primary">
                        0
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">Human Only</p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center mb-2">
                      <span className="text-lg font-mono font-bold text-text-primary">
                        1
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Human with AI Assistance
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center mb-2">
                      <span className="text-lg font-mono font-bold text-text-primary">
                        2
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      AI Collaboration
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center mb-2">
                      <span className="text-lg font-mono font-bold text-text-primary">
                        3
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">Directed AI</p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center mb-2">
                      <span className="text-lg font-mono font-bold text-text-primary">
                        4
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">AI Only</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-3xl p-8 lg:p-12 bg-gradient-to-r from-primary-600/20 to-accent-indigo/20 border border-white/10 backdrop-blur-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-text-primary">
                  {t("welcomeTitle")}
                </h2>
                <p className="text-text-secondary max-w-2xl">
                  {t("howItWorksContent")}
                </p>
              </div>

              <button
                onClick={startWizard}
                className="group relative inline-flex items-center px-8 py-3 text-base font-medium rounded-xl bg-primary-500 text-white hover:bg-primary-400 transition-colors"
              >
                <span className="relative flex items-center">
                  {t("start")}
                  <ArrowRightIcon className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
