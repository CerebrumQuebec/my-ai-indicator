"use client";

import React, { useState } from "react";
import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { CategoryOption, Category } from "../types";
import HighContrastText from "./HighContrastText";
import { useTranslation } from "../contexts/TranslationContext";

// We need to extend CategoryOption to work with both title/description and titleKey/descriptionKey
interface DisplayCategoryOption {
  id: Category;
  title: string;
  description: string;
}

interface RadioGroupProps {
  options: DisplayCategoryOption[];
  value: Category;
  onChange: (value: Category) => void;
  detailedOptions?: CategoryOption[];
}

export default function RadioGroup({
  options,
  value,
  onChange,
  detailedOptions,
}: RadioGroupProps) {
  const [expandedInfo, setExpandedInfo] = useState<number | null>(null);
  const { t } = useTranslation();

  // Transform detailedOptions if they exist
  const displayDetailedOptions = detailedOptions?.map((option) => ({
    id: option.id,
    title: t(option.titleKey),
    description: t(option.descriptionKey),
  }));

  return (
    <HeadlessRadioGroup value={value} onChange={onChange}>
      <div className="space-y-2">
        {options.map((option) => (
          <HeadlessRadioGroup.Option
            key={option.id}
            value={option.id}
            className={({ checked, active }) =>
              `relative block cursor-pointer rounded-lg border border-white/10 bg-[#0f1525] px-4 py-3 shadow-sm focus:outline-none sm:flex sm:justify-between ${
                checked ? "border-transparent ring-2 ring-primary-500" : ""
              } ${active ? "border-primary-500 ring-2 ring-primary-500" : ""}`
            }
          >
            {({ active }) => (
              <>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <HeadlessRadioGroup.Label
                      as="p"
                      className="font-medium text-white"
                    >
                      {option.title}
                    </HeadlessRadioGroup.Label>
                    {displayDetailedOptions && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setExpandedInfo(
                            expandedInfo === option.id ? null : option.id
                          );
                        }}
                        className={`ml-4 flex items-center text-sm font-medium transition duration-150 hover:text-primary-300 ${
                          active ? "text-primary-300" : "text-primary-500"
                        }`}
                      >
                        <InformationCircleIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                        <span className="sr-only">
                          Plus d&apos;informations
                        </span>
                      </button>
                    )}
                  </div>
                  <HeadlessRadioGroup.Description as="div" className="mt-1">
                    <HighContrastText
                      text={option.description}
                      className="text-sm text-text-secondary"
                    />
                  </HeadlessRadioGroup.Description>
                </div>
              </>
            )}
          </HeadlessRadioGroup.Option>
        ))}
      </div>

      {/* Expanded information panel */}
      {expandedInfo !== null && displayDetailedOptions && (
        <div className="mt-4 rounded-lg bg-[#0f1525] border border-white/10 p-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            {
              displayDetailedOptions.find(
                (option) => option.id === expandedInfo
              )?.title
            }
          </h3>
          <p className="text-text-secondary">
            {
              displayDetailedOptions.find(
                (option) => option.id === expandedInfo
              )?.description
            }
          </p>
        </div>
      )}
    </HeadlessRadioGroup>
  );
}
