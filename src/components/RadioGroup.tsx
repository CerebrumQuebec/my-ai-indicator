"use client";

import React from "react";
import { Category } from "../types";
import HighContrastText from "./HighContrastText";

export interface RadioOption {
  value: Category;
  label: string | JSX.Element;
  description?: string;
  icon?: JSX.Element;
}

interface RadioGroupProps {
  options: RadioOption[];
  value: Category | null;
  onChange: (value: Category) => void;
  name: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
}) => {
  const handleChange = (newValue: Category) => {
    onChange(newValue);
  };

  const getBackgroundColor = (optionValue: Category) => {
    if (value !== optionValue) return "";

    switch (optionValue) {
      case 0:
        return "bg-gradient-to-r from-blue-600/20 to-blue-500/10 border-blue-500/30";
      case 1:
        return "bg-gradient-to-r from-red-600/20 to-red-500/10 border-red-500/30";
      case 2:
        return "bg-gradient-to-r from-orange-600/20 to-orange-500/10 border-orange-500/30";
      case 3:
        return "bg-gradient-to-r from-yellow-600/20 to-yellow-500/10 border-yellow-500/30";
      case 4:
        return "bg-gradient-to-r from-green-600/20 to-green-500/10 border-green-500/30";
      default:
        return "bg-gradient-to-r from-gray-600/20 to-gray-500/10 border-gray-500/30";
    }
  };

  const getCheckmarkColor = (optionValue: Category) => {
    switch (optionValue) {
      case 0:
        return "text-blue-500";
      case 1:
        return "text-red-500";
      case 2:
        return "text-orange-500";
      case 3:
        return "text-yellow-500";
      case 4:
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="space-y-3" role="radiogroup" aria-labelledby={name}>
      {options.map((option) => (
        <div
          key={option.value}
          className={`${
            value === option.value
              ? `${getBackgroundColor(option.value)} shadow-md hover:shadow-lg`
              : "hover:bg-white/5 hover:border-white/20"
          } relative flex cursor-pointer rounded-lg border p-4 transition-all focus:outline-none`}
          onClick={() => handleChange(option.value)}
          role="radio"
          aria-checked={value === option.value}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              {option.icon && (
                <div className="mr-4 flex-shrink-0">{option.icon}</div>
              )}
              <div>
                {typeof option.label === "string" ? (
                  <p
                    className={`font-medium ${
                      value === option.value
                        ? "text-primary-500"
                        : "text-text-primary"
                    }`}
                  >
                    {option.label}
                  </p>
                ) : (
                  option.label
                )}
                {option.description && (
                  <span
                    className={`inline ${
                      value === option.value
                        ? "text-primary-400"
                        : "text-text-secondary"
                    }`}
                  >
                    {option.description}
                  </span>
                )}
              </div>
            </div>
            <div className="flex-shrink-0 mt-1">
              <div
                className={`h-5 w-5 flex items-center justify-center rounded-full border-2 ${
                  value === option.value
                    ? `${getCheckmarkColor(option.value)} border-current`
                    : "border-gray-400"
                }`}
              >
                {value === option.value && (
                  <div className="h-2.5 w-2.5 rounded-full bg-current"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
