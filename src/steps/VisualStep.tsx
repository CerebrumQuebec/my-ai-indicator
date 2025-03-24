"use client";

import React from "react";
import { useTranslation } from "../contexts/TranslationContext";
import { useWizard } from "../contexts/WizardContext";
import { StepProps, Category, visualCategoryOptions } from "../types";
import RadioGroup from "../components/RadioGroup";
import Button from "../components/Button";
import HighContrastText from "../components/HighContrastText";
import { AiFillEye } from "react-icons/ai";

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
  const circleStroke = "#8B5CF6"; // Purple for Visual
  const humanDotFill = "#FFFFFF";
  const aiDotFill =
    level === 0
      ? "#FFFFFF"
      : level === 1
      ? "#8B5CF6"
      : level === 2
      ? "#A78BFA"
      : level === 3
      ? "#7C3AED"
      : "#C4B5FD";

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

const VisualStep: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { t } = useTranslation();
  const { visualCategory, setVisualCategory, setQuestionnaireMode } =
    useWizard();

  const handleCategoryChange = (value: Category) => {
    setVisualCategory(value);
  };

  const handleNext = () => {
    if (onNext && visualCategory !== null) {
      onNext();
    }
  };

  const handleQuestionnaireMode = () => {
    if (onNext) {
      setQuestionnaireMode(true);
      onNext();
    }
  };

  const adaptedOptions = visualCategoryOptions.map((option) => ({
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
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-accent-indigo rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-20 w-72 h-72 bg-primary-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-accent-indigo rounded-full opacity-10 blur-3xl"></div>
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
          <HighContrastText text={t("visualEvaluationTitle")} />
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {t("visualEvaluationDescription")}
        </p>
      </div>

      <RadioGroup
        options={adaptedOptions}
        value={visualCategory}
        onChange={handleCategoryChange}
        name="visual-category"
      />

      <div className="flex justify-between items-center mt-8">
        {onBack && (
          <Button onClick={onBack} variant="secondary">
            {t("back")}
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={visualCategory === null}
          variant="primary"
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default VisualStep;
