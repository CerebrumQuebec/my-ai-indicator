"use client";

import React, { useEffect } from "react";
import { useWizard } from "../contexts/WizardContext";
import { useTranslation } from "../contexts/TranslationContext";
import RadioGroup from "../components/RadioGroup";
import {
  StepProps,
  textCategoryOptions,
  textCategoryOptionsDetailed,
  Category,
} from "../types";
import Button from "../components/Button";
import HighContrastText from "../components/HighContrastText";
import { BiSolidMessageSquareDetail } from "react-icons/bi";

// SVG Category Icon Components
const CategoryIcon = ({
  level,
  className = "",
}: {
  level: number;
  className?: string;
}) => {
  // Common styles
  const circleSize = 40;
  const circleStroke = "#6366F1";
  const humanDotFill = "#FFFFFF";
  const aiDotFill =
    level === 0
      ? "#FFFFFF"
      : level === 1
      ? "#6366F1"
      : level === 2
      ? "#8B5CF6"
      : level === 3
      ? "#4F46E5"
      : "#A5B4FC";

  const renderCategory = () => {
    switch (level) {
      case 0: // Human Only
        return (
          <g>
            <circle cx="20" cy="15" r="4" fill={humanDotFill} />
            <circle cx="20" cy="25" r="4" fill={humanDotFill} />
          </g>
        );
      case 1: // Human with AI Assistance
        return (
          <g>
            <circle cx="20" cy="15" r="4" fill={humanDotFill} />
            <circle cx="20" cy="25" r="4" fill={humanDotFill} />
            <circle cx="30" cy="15" r="4" fill={aiDotFill} />
          </g>
        );
      case 2: // Collaboration
        return (
          <g>
            <circle cx="15" cy="15" r="4" fill={humanDotFill} />
            <circle cx="15" cy="25" r="4" fill={humanDotFill} />
            <circle cx="25" cy="15" r="4" fill={aiDotFill} />
            <circle cx="25" cy="25" r="4" fill={aiDotFill} />
          </g>
        );
      case 3: // Directed AI
        return (
          <g>
            <circle cx="15" cy="20" r="4" fill={humanDotFill} />
            <circle cx="27" cy="20" r="7" fill={aiDotFill} />
          </g>
        );
      case 4: // AI Only
        return (
          <g>
            <circle cx="20" cy="15" r="4" fill={aiDotFill} />
            <circle cx="20" cy="25" r="4" fill={aiDotFill} />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <svg
      width={circleSize}
      height={circleSize}
      viewBox="0 0 40 40"
      className={className}
    >
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke={circleStroke}
        strokeWidth="1"
        opacity="0.3"
      />
      {renderCategory()}
      <text
        x="20"
        y="38"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="10"
        fontWeight="bold"
      >
        {level}
      </text>
    </svg>
  );
};

const TextStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { textCategory, setTextCategory, setQuestionnaireMode } = useWizard();
  const { t } = useTranslation();

  useEffect(() => {
    console.log("TextStep - textCategoryOptions:", textCategoryOptions);
    console.log("TextStep - category0Title translation:", t("category0Title"));
    console.log(
      "TextStep - category0Description translation:",
      t("category0Description")
    );
  }, [t]);

  const handleCategoryChange = (value: Category) => {
    setTextCategory(value);
  };

  const handleNext = () => {
    if (onNext && textCategory !== null) {
      onNext();
    }
  };

  const handleQuestionnaireMode = () => {
    if (onNext) {
      setQuestionnaireMode(true);
      onNext();
    }
  };

  const adaptedOptions = textCategoryOptions.map((option) => ({
    value: option.id,
    label: t(option.titleKey),
    description: t(option.descriptionKey),
    icon: (
      <CategoryIcon level={option.id as number} className="inline-block mr-2" />
    ),
  }));

  return (
    <div className="space-y-6">
      {/* Background decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-primary-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-20 w-72 h-72 bg-accent-indigo rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-primary-600 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex space-x-2">
            {[0, 1, 2, 3, 4].map((level) => (
              <CategoryIcon key={level} level={level} />
            ))}
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">
          <HighContrastText text={t("textEvaluationTitle")} />
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {t("textEvaluationDescription")}
        </p>
      </div>

      <RadioGroup
        options={adaptedOptions}
        value={textCategory}
        onChange={handleCategoryChange}
        name="text-category"
      />

      <div className="flex justify-between items-center mt-8">
        {onBack && (
          <Button onClick={onBack} variant="secondary">
            {t("back")}
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={textCategory === null}
          variant="primary"
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default TextStep;
