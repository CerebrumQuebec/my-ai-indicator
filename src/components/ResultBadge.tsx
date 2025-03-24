"use client";

import React from "react";
import { useTranslation } from "../contexts/TranslationContext";
import { Category } from "../types/index";
import HighContrastText from "./HighContrastText";

export interface ResultBadgeProps {
  type: string;
  category: Category;
  title: string;
}

const ResultBadge: React.FC<ResultBadgeProps> = ({ type, category, title }) => {
  if (!category) return null;

  const getCategoryGradient = (category: Category) => {
    switch (category) {
      case 0:
        return "from-blue-600 to-blue-400";
      case 1:
        return "from-red-600 to-red-400";
      case 2:
        return "from-orange-600 to-orange-400";
      case 3:
        return "from-yellow-600 to-yellow-400";
      case 4:
        return "from-green-600 to-green-400";
      default:
        return "from-gray-600 to-gray-400";
    }
  };

  const getCategoryColor = (category: Category) => {
    switch (category) {
      case 0:
        return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/60 dark:text-blue-100 dark:border-blue-700/50";
      case 1:
        return "bg-red-100 text-red-800 border-red-300 dark:bg-red-900/60 dark:text-red-100 dark:border-red-700/50";
      case 2:
        return "bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-900/60 dark:text-orange-100 dark:border-orange-700/50";
      case 3:
        return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/60 dark:text-yellow-100 dark:border-yellow-700/50";
      case 4:
        return "bg-green-100 text-green-800 border-green-300 dark:bg-green-900/60 dark:text-green-100 dark:border-green-700/50";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800/60 dark:text-gray-100 dark:border-gray-600/50";
    }
  };

  const getCategoryIcon = (category: Category) => {
    switch (category) {
      case 0:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 1:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 2:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        );
      case 3:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
        );
      case 4:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`inline-flex items-center px-6 py-4 rounded-xl border-2 shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-glow ${getCategoryColor(
        category
      )}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-10 rounded-xl ${getCategoryGradient(category)}"></div>
      <div className="flex items-center space-x-4 relative z-10">
        <div className={`text-2xl p-2 rounded-full bg-white/10`}>
          {getCategoryIcon(category)}
        </div>
        <div className="flex flex-col">
          <div className="text-lg font-bold mb-0.5">
            <HighContrastText text={title} />
          </div>
          <div className="flex items-center">
            <span className="text-xl font-bold tracking-wide">
              Cat. {category}
            </span>
            <span className="text-sm opacity-70 ml-2 font-medium">v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultBadge;
