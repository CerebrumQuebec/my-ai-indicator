"use client";

import React, { useState } from "react";
import { useWizard } from "../contexts/WizardContext";
import ResultBadge from "../components/ResultBadge";
import { ResultProps } from "../types";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { StepProps, Category } from "../types";
import Button from "../components/Button";
import HighContrastText from "../components/HighContrastText";

const Result: React.FC<StepProps> = () => {
  const t = useTranslations();
  const { selectedCategories, soundsCategory, visualCategory, textCategory } =
    useWizard();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "visual" | "metadata" | "advanced"
  >("visual");

  const getSelectedCategories = () => {
    const categories = [];
    if (selectedCategories.sounds) categories.push("sounds");
    if (selectedCategories.visual) categories.push("visual");
    if (selectedCategories.text) categories.push("text");
    return categories;
  };

  const getCategoryValue = (type: string): Category => {
    switch (type) {
      case "sounds":
        return soundsCategory;
      case "visual":
        return visualCategory;
      case "text":
        return textCategory;
      default:
        return null;
    }
  };

  const getCategoryTitle = (type: string): string => {
    switch (type) {
      case "sounds":
        return t("soundsCategoryTitle");
      case "visual":
        return t("visualCategoryTitle");
      case "text":
        return t("textCategoryTitle");
      default:
        return "";
    }
  };

  const getCategoryDescription = (type: string, category: Category): string => {
    if (category === null) return "";
    return t(`category${category}Description`);
  };

  const getCategoryCode = (type: string): string => {
    switch (type) {
      case "sounds":
        return "S";
      case "visual":
        return "V";
      case "text":
        return "T";
      default:
        return "";
    }
  };

  const selectedCategoryTypes = getSelectedCategories();

  const generateBadgeHtml = () => {
    return `<div style="display: inline-flex; gap: 8px; font-family: sans-serif;">
${selectedCategoryTypes
  .map(
    (
      type
    ) => `  <span style="background-color: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 14px; font-weight: 500;">
    ${getCategoryTitle(type)}: ${getCategoryCode(type)}.AI.${getCategoryValue(
      type
    )}
  </span>`
  )
  .join("\n")}
</div>`;
  };

  const generateMarkdownCode = () => {
    return selectedCategoryTypes
      .map(
        (type) =>
          `![${getCategoryTitle(type)}: ${getCategoryCode(
            type
          )}.AI.${getCategoryValue(
            type
          )}](https://img.shields.io/badge/${getCategoryTitle(
            type
          )}-${getCategoryCode(type)}.AI.${getCategoryValue(type)}-blue)`
      )
      .join(" ");
  };

  const generateMetadataHtml = () => {
    return selectedCategoryTypes
      .map(
        (type) =>
          `<meta name="AI-Usage-${getCategoryTitle(
            type
          )}" content="${getCategoryCode(type)}.AI.${getCategoryValue(
            type
          )}" />`
      )
      .join("\n");
  };

  const generateMetadataJson = () => {
    const metadata = {
      AIUsage: {
        version: "1.0",
        ...Object.fromEntries(
          selectedCategoryTypes.map((type) => [
            type,
            `${getCategoryCode(type)}.AI.${getCategoryValue(type)}`,
          ])
        ),
      },
    };
    return JSON.stringify(metadata, null, 2);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          <HighContrastText text={t("resultTitle")} />
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t("resultDescription")}
        </p>
      </div>

      <div className="space-y-8">
        {selectedCategoryTypes.map((type) => {
          const category = getCategoryValue(type);
          return (
            <div key={type} className="space-y-4">
              <h3 className="text-xl font-semibold">
                <HighContrastText text={getCategoryTitle(type)} />
              </h3>
              <ResultBadge
                type={type}
                category={category}
                title={getCategoryTitle(type)}
              />
              <p className="text-gray-600 dark:text-gray-300">
                {getCategoryDescription(type, category)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-8">
        <Button
          onClick={() => window.location.reload()}
          className="w-full sm:w-auto"
        >
          {t("startOver")}
        </Button>
      </div>

      <div className="bg-surface-dark rounded-xl border border-white/10 overflow-hidden">
        <div className="flex border-b border-white/10">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "visual"
                ? "bg-surface-hover text-text-primary"
                : "text-text-secondary hover:bg-surface-card/50"
            }`}
            onClick={() => setActiveTab("visual")}
          >
            {t("visualBadges")}
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "metadata"
                ? "bg-surface-hover text-text-primary"
                : "text-text-secondary hover:bg-surface-card/50"
            }`}
            onClick={() => setActiveTab("metadata")}
          >
            {t("metadata")}
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "advanced"
                ? "bg-surface-hover text-text-primary"
                : "text-text-secondary hover:bg-surface-card/50"
            }`}
            onClick={() => setActiveTab("advanced")}
          >
            {t("advanced")}
          </button>
        </div>

        <div className="p-6">
          {activeTab === "visual" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  {t("htmlCode")}
                </h3>
                <div className="relative">
                  <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto text-text-secondary text-sm">
                    <code>{generateBadgeHtml()}</code>
                  </pre>
                  <button
                    onClick={() => handleCopy(generateBadgeHtml())}
                    className="absolute top-3 right-3 bg-surface-card p-1.5 rounded-md hover:bg-surface-hover"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  {t("markdownCode")}
                </h3>
                <div className="relative">
                  <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto text-text-secondary text-sm">
                    <code>{generateMarkdownCode()}</code>
                  </pre>
                  <button
                    onClick={() => handleCopy(generateMarkdownCode())}
                    className="absolute top-3 right-3 bg-surface-card p-1.5 rounded-md hover:bg-surface-hover"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "metadata" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  {t("htmlMetadata")}
                </h3>
                <div className="relative">
                  <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto text-text-secondary text-sm">
                    <code>{generateMetadataHtml()}</code>
                  </pre>
                  <button
                    onClick={() => handleCopy(generateMetadataHtml())}
                    className="absolute top-3 right-3 bg-surface-card p-1.5 rounded-md hover:bg-surface-hover"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  {t("jsonMetadata")}
                </h3>
                <div className="relative">
                  <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto text-text-secondary text-sm">
                    <code>{generateMetadataJson()}</code>
                  </pre>
                  <button
                    onClick={() => handleCopy(generateMetadataJson())}
                    className="absolute top-3 right-3 bg-surface-card p-1.5 rounded-md hover:bg-surface-hover"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  {t("advancedUsage")}
                </h3>
                <p className="text-text-secondary">
                  {t("advancedUsageDescription")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {copied && (
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-4 py-2 rounded-lg shadow-lg">
          Copié dans le presse-papier !
        </div>
      )}
    </div>
  );
};

export default Result;
