"use client";

import React from "react";
import { Category } from "@/types";
import HighContrastText from "./HighContrastText";

export interface ResultBadgeProps {
  type: string;
  category: Category;
  title: string;
}

const ResultBadge: React.FC<ResultBadgeProps> = ({ type, category, title }) => {
  if (!category) return null;

  const getBgColor = () => {
    switch (type) {
      case "sounds":
        return "bg-blue-100 dark:bg-blue-900";
      case "visual":
        return "bg-purple-100 dark:bg-purple-900";
      case "text":
        return "bg-green-100 dark:bg-green-900";
      default:
        return "bg-gray-100 dark:bg-gray-900";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "sounds":
        return "text-blue-800 dark:text-blue-200";
      case "visual":
        return "text-purple-800 dark:text-purple-200";
      case "text":
        return "text-green-800 dark:text-green-200";
      default:
        return "text-gray-800 dark:text-gray-200";
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case "sounds":
        return "border-blue-300 dark:border-blue-700";
      case "visual":
        return "border-purple-300 dark:border-purple-700";
      case "text":
        return "border-green-300 dark:border-green-700";
      default:
        return "border-gray-300 dark:border-gray-700";
    }
  };

  return (
    <div
      className={`inline-flex items-center px-4 py-2 rounded-full border ${getBgColor()} ${getTextColor()} ${getBorderColor()}`}
    >
      <HighContrastText text={`${title}: Cat. ${category}`} />
    </div>
  );
};

export default ResultBadge;
