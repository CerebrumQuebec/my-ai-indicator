"use client";

import React, { useState } from "react";
import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
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

  return (
    <HeadlessRadioGroup value={value} onChange={onChange}>
      <div className="space-y-4">
        {options.map((option) => (
          <HeadlessRadioGroup.Option
            key={option.value}
            value={option.value}
            className={({ active, checked }) =>
              `${
                active
                  ? "ring-2 ring-primary-500 ring-offset-2"
                  : "ring-1 ring-inset ring-gray-300"
              }
              ${
                checked
                  ? "bg-primary-500 text-white"
                  : "bg-surface-card hover:bg-surface-hover"
              }
              relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
            }
          >
            {({ active, checked }) => (
              <>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <HeadlessRadioGroup.Label
                        as="p"
                        className={`font-medium ${
                          checked
                            ? "text-white"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        <HighContrastText text={t(option.titleKey)} />
                      </HeadlessRadioGroup.Label>
                      <HeadlessRadioGroup.Description
                        as="span"
                        className={`inline ${
                          checked
                            ? "text-white"
                            : "text-gray-500 dark:text-gray-300"
                        }`}
                      >
                        {t(option.descriptionKey)}
                      </HeadlessRadioGroup.Description>
                    </div>
                  </div>
                  {detailedOptions && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setExpandedInfo(
                          expandedInfo === option.value ? null : option.value
                        );
                      }}
                      className="shrink-0 text-white"
                    >
                      <InformationCircleIcon
                        className={`h-6 w-6 ${
                          checked
                            ? "text-white"
                            : "text-gray-500 dark:text-gray-300"
                        }`}
                      />
                    </button>
                  )}
                </div>
                {expandedInfo === option.value && detailedOptions && (
                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-300">
                    {detailedOptions.find(
                      (detailedOption) => detailedOption.value === option.value
                    )?.descriptionKey &&
                      t(
                        detailedOptions.find(
                          (detailedOption) =>
                            detailedOption.value === option.value
                        )!.descriptionKey
                      )}
                  </div>
                )}
              </>
            )}
          </HeadlessRadioGroup.Option>
        ))}
      </div>
    </HeadlessRadioGroup>
  );
};

export default RadioGroup;
