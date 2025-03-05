"use client";

import React from "react";
import { Category } from "../types";

interface ResultBadgeProps {
  musicCategory: Category;
  textCategory: Category;
}

const ResultBadge: React.FC<ResultBadgeProps> = ({
  musicCategory,
  textCategory,
}) => {
  if (!musicCategory || !textCategory) {
    return null;
  }

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case 1:
        return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-100 dark:border-red-700";
      case 2:
        return "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900 dark:text-orange-100 dark:border-orange-700";
      case 3:
        return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-100 dark:border-yellow-700";
      case 4:
        return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700";
      case 5:
        return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div
        className={`px-3 py-1.5 rounded-full text-sm font-medium ${getCategoryColor(
          musicCategory
        )} border`}
      >
        Musique: Cat. {musicCategory}
      </div>
      <div
        className={`px-3 py-1.5 rounded-full text-sm font-medium ${getCategoryColor(
          textCategory
        )} border`}
      >
        Texte: Cat. {textCategory}
      </div>
    </div>
  );
};

export default ResultBadge;
