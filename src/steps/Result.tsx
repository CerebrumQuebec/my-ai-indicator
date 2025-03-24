"use client";

import React, { useState } from "react";
import { useWizard } from "../contexts/WizardContext";
import ResultBadge from "../components/ResultBadge";
import { ResultProps } from "../types";
import Link from "next/link";
import { useTranslation } from "../contexts/TranslationContext";
import { StepProps, Category } from "../types";
import Button from "../components/Button";
import HighContrastText from "../components/HighContrastText";

const Result: React.FC<StepProps> = () => {
  const { t } = useTranslation();
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

  const generateId3Example = () => {
    return `# Example of adding to ID3 metadata (audio)
# Use a tool like MP3Tag or EasyTag

TXXX: AI-USAGE=${selectedCategoryTypes
      .map(
        (type) =>
          `${getCategoryTitle(type)}-${getCategoryCode(
            type
          )}.AI.${getCategoryValue(type)}`
      )
      .join("/")}`;
  };

  const generateCreativeCommonsExample = () => {
    const year = new Date().getFullYear();
    return `© ${year} [Your name] • ${selectedCategoryTypes
      .map(
        (type) =>
          `${getCategoryTitle(type)}: ${getCategoryCode(
            type
          )}.AI.${getCategoryValue(type)}`
      )
      .join(" / ")} • CC BY-SA 4.0`;
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
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-[#8B1F1F] to-[#C41E3A] text-white px-8 py-6 rounded-2xl flex items-center space-x-4 shadow-xl transform transition-all hover:scale-105 border border-white/10">
              {selectedCategoryTypes.map((type, index) => {
                const category = getCategoryValue(type);
                return (
                  <React.Fragment key={type}>
                    {index > 0 && <span className="mx-4 text-2xl">•</span>}
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">
                        {type === "sounds" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        )}
                        {type === "visual" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        {type === "text" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </span>
                      <span className="text-2xl font-bold tracking-wider">{`${getCategoryCode(
                        type
                      )}.AI.${category}`}</span>
                    </div>
                  </React.Fragment>
                );
              })}
              <span className="text-sm opacity-80 ml-4 font-medium">v1.0</span>
            </div>
          </div>
        </div>
        {selectedCategoryTypes.map((type) => {
          const category = getCategoryValue(type);
          return (
            <div key={type} className="space-y-2">
              <h3 className="text-lg font-semibold text-text-primary">
                <HighContrastText text={getCategoryTitle(type)} />
              </h3>
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
                <p className="text-text-secondary text-sm mb-3">
                  {t("htmlMetadataDescription")}
                </p>
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
                <p className="text-text-secondary text-sm mb-3">
                  {t("jsonMetadataDescription")}
                </p>
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
                  {t("audioMetadata")}
                </h3>
                <p className="text-text-secondary text-sm mb-3">
                  {t("audioMetadataDescription")}
                </p>
                <div className="relative">
                  <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto text-text-secondary text-sm">
                    <code>{generateId3Example()}</code>
                  </pre>
                  <button
                    onClick={() => handleCopy(generateId3Example())}
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
                  {t("creativeCommonsUsage")}
                </h3>
                <p className="text-text-secondary text-sm mb-3">
                  {t("creativeCommonsDescription")}
                </p>
                <div className="relative">
                  <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto text-text-secondary text-sm">
                    <code>{generateCreativeCommonsExample()}</code>
                  </pre>
                  <button
                    onClick={() => handleCopy(generateCreativeCommonsExample())}
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
        </div>
      </div>

      {copied && (
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-4 py-2 rounded-lg shadow-lg">
          {t("copied")}
        </div>
      )}
    </div>
  );
};

export default Result;
