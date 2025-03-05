"use client";

import React, { useState } from "react";
import { RadioGroup as HeadlessRadioGroup } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { CategoryOption, Category } from "../types";
import HighContrastText from "./HighContrastText";

interface RadioGroupProps {
  options: CategoryOption[];
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
                    {detailedOptions && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setExpandedInfo(
                            expandedInfo === option.id ? null : option.id
                          );
                        }}
                        className="ml-2 flex items-center justify-center w-8 h-8 text-white hover:text-primary-400 transition-colors"
                      >
                        <InformationCircleIcon className="h-6 w-6" />
                      </button>
                    )}
                  </div>
                  <HeadlessRadioGroup.Description as="div">
                    <HighContrastText>{option.description}</HighContrastText>
                    {expandedInfo === option.id && detailedOptions && (
                      <div className="mt-2 text-sm border-t border-white/10 pt-2">
                        <HighContrastText>
                          {
                            detailedOptions.find((o) => o.id === option.id)
                              ?.description
                          }
                        </HighContrastText>
                      </div>
                    )}
                  </HeadlessRadioGroup.Description>
                </div>
                <div className="mt-2 flex items-center sm:ml-4 sm:mt-0">
                  {/* Removed the checkbox icon */}
                </div>
                <div
                  className={`absolute -inset-px rounded-lg pointer-events-none ${
                    active ? "border border-primary-500" : ""
                  }`}
                  aria-hidden="true"
                />
              </>
            )}
          </HeadlessRadioGroup.Option>
        ))}
      </div>
    </HeadlessRadioGroup>
  );
}
