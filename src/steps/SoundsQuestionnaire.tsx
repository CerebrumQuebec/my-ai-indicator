"use client";

import React, { useState } from "react";
import { useTranslation } from "../contexts/TranslationContext";
import { useWizard } from "../contexts/WizardContext";
import { StepProps, QuestionItem } from "../types";
import Button from "../components/Button";
import HighContrastText from "../components/HighContrastText";

const SoundsQuestionnaire: React.FC<StepProps> = ({ onNext, onBack }) => {
  const { t } = useTranslation();
  const {
    setSoundsCategory,
    soundsQuestionnaireAnswers,
    setSoundsQuestionnaireAnswers,
  } = useWizard();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Define questions with translation keys
  const questions: QuestionItem[] = [
    {
      id: "q1",
      text: t("soundsQ1"),
      options: [
        {
          id: "a",
          text: t("soundsQ1OptionA"),
          points: 4,
        },
        {
          id: "b",
          text: t("soundsQ1OptionB"),
          points: 3,
        },
        {
          id: "c",
          text: t("soundsQ1OptionC"),
          points: 2,
        },
        {
          id: "d",
          text: t("soundsQ1OptionD"),
          points: 1,
        },
        {
          id: "e",
          text: t("soundsQ1OptionE"),
          points: 0,
        },
      ],
    },
    // Add more questions here
  ];

  const handleAnswer = (questionId: string, points: number) => {
    setSoundsQuestionnaireAnswers({
      ...soundsQuestionnaireAnswers,
      [questionId]: points,
    });

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final category based on answers
      const totalPoints = Object.values(soundsQuestionnaireAnswers).reduce(
        (sum, points) => sum + points,
        0
      );
      const averagePoints = totalPoints / questions.length;
      const category = Math.round(averagePoints) as 0 | 1 | 2 | 3 | 4;

      setSoundsCategory(category);
      if (onNext) onNext();
    }
  };

  const currentQuestionData = questions[currentQuestion];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          <HighContrastText text={t("soundsQuestionnaireTitle")} />
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t("soundsQuestionnaireDescription")}
        </p>
      </div>

      <div className="space-y-6" data-current-question={currentQuestion + 1}>
        <p className="text-lg font-medium">{currentQuestionData.text}</p>
        <div className="space-y-4">
          {currentQuestionData.options.map((option) => (
            <button
              key={option.id}
              onClick={() =>
                handleAnswer(currentQuestionData.id, option.points)
              }
              className="w-full p-4 text-left rounded-lg border border-white/10 hover:border-white/20 transition-colors"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-8">
        {onBack && (
          <Button onClick={onBack} variant="secondary">
            {t("back")}
          </Button>
        )}
        <div className="text-sm text-text-secondary">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
};

export default SoundsQuestionnaire;
