"use client";

import React, { useState } from "react";
import { useWizard } from "../contexts/WizardContext";
import {
  StepProps,
  textQuestions,
  textQuestionWeights,
  calculateCategory,
} from "../types";

const TextQuestionnaire: React.FC<StepProps> = ({ onNext, onBack }) => {
  const {
    setTextCategory,
    textQuestionnaireAnswers,
    setTextQuestionnaireAnswers,
  } = useWizard();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [skippedQuestions, setSkippedQuestions] = useState<string[]>([]);
  const [questionHistory, setQuestionHistory] = useState<number[]>([]);

  const handleOptionSelect = (questionId: string, points: number) => {
    const newAnswers = { ...textQuestionnaireAnswers, [questionId]: points };
    setTextQuestionnaireAnswers(newAnswers);

    // Add current question to history before moving to next
    setQuestionHistory([...questionHistory, currentQuestion]);

    // Move to next question or finish if this is the last one
    if (currentQuestion < textQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final category and move to next step
      const category = calculateCategory(newAnswers, textQuestionWeights);
      setTextCategory(category);
      onNext();
    }
  };

  const handleSkip = () => {
    // Only allow skipping if question is marked as optionally skippable
    const question = textQuestions[currentQuestion];
    if (question.notApplicable) {
      setSkippedQuestions([...skippedQuestions, question.id]);

      // Add current question to history before moving to next
      setQuestionHistory([...questionHistory, currentQuestion]);

      // Move to next question or finish if this is the last one
      if (currentQuestion < textQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Calculate final category and move to next step
        const category = calculateCategory(
          textQuestionnaireAnswers,
          textQuestionWeights
        );
        setTextCategory(category);
        onNext();
      }
    }
  };

  const handleBack = () => {
    // If we have question history, go back to the last question
    if (questionHistory.length > 0) {
      // Get the last question from history
      const previousQuestion = questionHistory[questionHistory.length - 1];

      // Update current question
      setCurrentQuestion(previousQuestion);

      // Remove the last item from history
      setQuestionHistory(questionHistory.slice(0, -1));
    } else if (currentQuestion > 0) {
      // If no history but not on first question, just go back one
      setCurrentQuestion(currentQuestion - 1);
    } else {
      // If on first question and no history, go back to previous step
      onBack?.();
    }
  };

  // Current question to display
  const question = textQuestions[currentQuestion];

  return (
    <div className="space-y-6" data-current-question={currentQuestion}>
      <div>
        <h2 className="text-2xl font-semibold text-text-primary">
          Évaluation détaillée de votre processus textuel
        </h2>
        <p className="mt-2 text-text-secondary">
          Question {currentQuestion + 1} sur {textQuestions.length}
        </p>
      </div>

      <div className="bg-surface-dark rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-medium text-text-primary mb-4">
          {question.text}
        </h3>

        <div className="space-y-3 mt-4">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(question.id, option.points)}
              className="w-full text-left p-4 rounded-lg border border-white/10 bg-surface-card hover:bg-surface-hover transition-colors flex items-start"
            >
              <div className="mr-3 mt-1 w-5 h-5 flex-shrink-0 rounded-full border border-primary-500 flex items-center justify-center">
                {textQuestionnaireAnswers[question.id] === option.points && (
                  <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                )}
              </div>
              <div>
                <span className="block text-text-primary">{option.text}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className="px-6 py-2 rounded-lg border border-white/10 bg-surface-card hover:bg-surface-hover transition-colors text-text-primary"
          >
            Retour
          </button>

          {question.notApplicable && (
            <button
              onClick={handleSkip}
              className="px-6 py-2 rounded-lg border border-primary-500/50 bg-transparent hover:bg-primary-500/10 transition-colors text-primary-500"
            >
              Non applicable
            </button>
          )}
        </div>
      </div>

      {/* Progress indicator */}
      <div className="w-full bg-surface-card/50 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-primary-500 h-full transition-all duration-300 ease-out"
          style={{
            width: `${((currentQuestion + 1) / textQuestions.length) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default TextQuestionnaire;
