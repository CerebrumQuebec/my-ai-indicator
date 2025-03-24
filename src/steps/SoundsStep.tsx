"use client";

import React, { useEffect } from "react";
import { useTranslation } from "../contexts/TranslationContext";
import { useWizard } from "../contexts/WizardContext";
import { StepProps, Category, soundsCategoryOptions } from "../types/index";
import Button from "../components/Button";
import HighContrastText from "../components/HighContrastText";
import RadioGroup from "../components/RadioGroup";
import { FaVolumeUp } from "react-icons/fa";

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
  const circleStroke = "#2563EB"; // Blue for Sounds
  const humanDotFill = "#FFFFFF";
  const aiDotFill =
    level === 0
      ? "#FFFFFF"
      : level === 1
      ? "#3B82F6"
      : level === 2
      ? "#60A5FA"
      : level === 3
      ? "#2563EB"
      : "#BFDBFE";

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

const SoundsStep: React.FC<StepProps> = ({ onNext, onBack = () => {} }) => {
  const { t } = useTranslation();
  const { soundsCategory, setSoundsCategory, setQuestionnaireMode } =
    useWizard();

  // Debug current state
  useEffect(() => {
    console.log("SoundsStep - Component mounted");
    console.log("SoundsStep - Current soundsCategory:", soundsCategory);
    console.log("SoundsStep - Available options:", soundsCategoryOptions);
    // Check if options are properly defined
    if (!soundsCategoryOptions || soundsCategoryOptions.length === 0) {
      console.error("SoundsStep - No options available!");
    } else {
      console.log(
        "SoundsStep - Number of options:",
        soundsCategoryOptions.length
      );
      soundsCategoryOptions.forEach((option) => {
        console.log("Option:", {
          id: option.id,
          titleKey: option.titleKey,
          descriptionKey: option.descriptionKey,
          translatedTitle: t(option.titleKey),
          translatedDescription: t(option.descriptionKey),
        });
      });
    }
  }, [soundsCategory, t]);

  const handleCategoryChange = (value: Category) => {
    console.log("SoundsStep - handleCategoryChange called with value:", value);
    setSoundsCategory(value);
  };

  const handleNext = () => {
    console.log("SoundsStep - handleNext called, category:", soundsCategory);
    if (onNext && soundsCategory !== null) {
      console.log("SoundsStep - Calling onNext to advance to next step");
      onNext();
    } else {
      console.log(
        "SoundsStep - Cannot advance: onNext is null or category is null"
      );
    }
  };

  const handleQuestionnaireMode = () => {
    console.log("SoundsStep - handleQuestionnaireMode called");
    if (onNext) {
      console.log("SoundsStep - Setting questionnaire mode and calling onNext");
      setQuestionnaireMode(true);
      onNext();
    } else {
      console.log(
        "SoundsStep - Cannot advance to questionnaire: onNext is null"
      );
    }
  };

  const adaptedOptions = soundsCategoryOptions.map((option) => ({
    value: option.id,
    label: t(option.titleKey),
    description: t(option.descriptionKey),
    icon: (
      <CategoryIcon level={option.id as number} className="inline-block mr-2" />
    ),
  }));

  // Ensure we have valid options before rendering
  if (!soundsCategoryOptions || soundsCategoryOptions.length === 0) {
    console.error("SoundsStep - No options available for rendering");
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Background decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-primary-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-2/3 left-20 w-64 h-64 bg-primary-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-indigo rounded-full opacity-10 blur-3xl"></div>
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
          <HighContrastText text={t("soundsEvaluationTitle")} />
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {t("soundsEvaluationDescription")}
        </p>
      </div>

      <RadioGroup
        options={adaptedOptions}
        value={soundsCategory}
        onChange={handleCategoryChange}
        name="sounds-category"
      />

      <div className="flex justify-between items-center mt-8">
        {onBack && (
          <Button onClick={onBack} variant="secondary">
            {t("back")}
          </Button>
        )}
        <Button
          onClick={handleNext}
          disabled={soundsCategory === null}
          variant="primary"
        >
          {t("next")}
        </Button>
      </div>
    </div>
  );
};

export default SoundsStep;
