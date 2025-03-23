"use client";

import React, { useState, useEffect } from "react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { CategoryOption, Category } from "../types";
import HighContrastText from "./HighContrastText";
import { useTranslation } from "../contexts/TranslationContext";

interface Props {
  options: CategoryOption[];
  value: Category | null;
  onChange: (value: Category) => void;
  detailedOptions?: CategoryOption[];
}

const RadioGroup: React.FC<Props> = ({
  options,
  value,
  onChange,
  detailedOptions,
}) => {
  const [expandedInfo, setExpandedInfo] = useState<Category | null>(null);
  const { t } = useTranslation();

  // Debug logging
  useEffect(() => {
    console.log("RadioGroup - Component mounted/updated");
    console.log("RadioGroup - Received options:", options);
    console.log("RadioGroup - Current value:", value);
    if (options?.length > 0) {
      options.forEach((option) => {
        console.log("RadioGroup - Option details:", {
          id: option.id,
          titleKey: option.titleKey,
          translatedTitle: t(option.titleKey),
        });
      });
    } else {
      console.warn("RadioGroup - No options received");
    }
  }, [options, value, t]);

  // Check if options is undefined or empty
  if (!options || options.length === 0) {
    console.warn("RadioGroup - No options available");
    return null;
  }

  return (
    <div className="space-y-4" role="radiogroup">
      {options.map((option) => {
        const isSelected = value === option.id;
        console.log(
          `RadioGroup - Rendering option ${option.id}, isSelected: ${isSelected}, value: ${value}`
        );

        return (
          <label
            key={`category-${option.id}`}
            className={`
              block relative cursor-pointer rounded-lg px-5 py-4 shadow-md focus-within:outline-none
              ${
                isSelected
                  ? "ring-2 ring-primary-500 ring-offset-2 bg-primary-500 text-white"
                  : "ring-1 ring-inset ring-gray-300 bg-surface-card hover:bg-surface-hover"
              }
            `}
          >
            <input
              type="radio"
              className="sr-only"
              name="category"
              value={String(option.id)}
              checked={isSelected}
              onChange={() => {
                console.log("RadioGroup - Option selected:", option.id);
                onChange(option.id);
              }}
            />
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center">
                <div className="text-sm">
                  <span
                    className={`font-medium block ${
                      isSelected
                        ? "text-white"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    <HighContrastText text={t(option.titleKey)} />
                  </span>
                  <span
                    className={`inline-block mt-1 ${
                      isSelected
                        ? "text-white"
                        : "text-gray-500 dark:text-gray-300"
                    }`}
                  >
                    {t(option.descriptionKey)}
                  </span>
                </div>
              </div>
              {detailedOptions && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setExpandedInfo(
                      expandedInfo === option.id ? null : option.id
                    );
                  }}
                  className="shrink-0 text-white"
                >
                  <InformationCircleIcon
                    className={`h-6 w-6 ${
                      isSelected
                        ? "text-white"
                        : "text-gray-500 dark:text-gray-300"
                    }`}
                  />
                </button>
              )}
            </div>
            {expandedInfo === option.id && detailedOptions && (
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-300">
                {detailedOptions.find(
                  (detailedOption) => detailedOption.id === option.id
                )?.descriptionKey &&
                  t(
                    detailedOptions.find(
                      (detailedOption) => detailedOption.id === option.id
                    )!.descriptionKey
                  )}
              </div>
            )}
          </label>
        );
      })}
    </div>
  );
};

export default RadioGroup;
