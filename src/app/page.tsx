"use client";

import { useWizard } from "../contexts/WizardContext";
import ProgressBar from "../components/ProgressBar";
import Introduction from "../steps/Introduction";
import SoundsStep from "../steps/SoundsStep";
import TextStep from "../steps/TextStep";
import VisualStep from "../steps/VisualStep";
import SoundsQuestionnaire from "../steps/SoundsQuestionnaire";
import TextQuestionnaire from "../steps/TextQuestionnaire";
import VisualQuestionnaire from "../steps/VisualQuestionnaire";
import Result from "../steps/Result";
import ManualSelectionStep from "../steps/ManualSelectionStep";
import GuidedSelectionStep from "../steps/GuidedSelectionStep";

export default function Home() {
  const {
    step,
    setStep,
    soundsCategory,
    visualCategory,
    textCategory,
    isQuestionnaireMode,
    selectedCategories,
  } = useWizard();

  // Debug current step
  console.log("Current step:", step);
  console.log("Selected categories:", selectedCategories);
  console.log("Sound category:", soundsCategory);
  console.log("Visual category:", visualCategory);
  console.log("Text category:", textCategory);

  // Adjusted step calculation to not count Introduction
  const totalSteps =
    1 + Object.values(selectedCategories).filter(Boolean).length + 1; // Category Selection + Selected Categories + Result
  const totalQuestionsPerStep = 10;

  // Get current question number from the active questionnaire component
  const getCurrentQuestionNumber = () => {
    if (!isQuestionnaireMode || step === totalSteps) return 0;
    const component = document.querySelector("[data-current-question]");
    return component
      ? parseInt(component.getAttribute("data-current-question") || "0")
      : 0;
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Improved canContinue function to better handle step logic
  const canContinue = () => {
    switch (step) {
      case 1:
        return true;
      case 2:
        return Object.values(selectedCategories).some(Boolean); // At least one category selected
      default:
        const currentStepIndex = step - 3; // Adjust for intro and category selection steps
        const categories = Object.entries(selectedCategories)
          .filter(([_, selected]) => selected)
          .map(([category]) => category);

        if (currentStepIndex >= 0 && currentStepIndex < categories.length) {
          const currentCategory = categories[currentStepIndex];
          switch (currentCategory) {
            case "sounds":
              return soundsCategory !== null;
            case "visual":
              return visualCategory !== null;
            case "text":
              return textCategory !== null;
            default:
              return false;
          }
        }

        // If we've gone through all the selected categories, we can continue to the result
        if (currentStepIndex >= categories.length) {
          return true;
        }

        return false;
    }
  };

  const renderStep = () => {
    // Debug step rendering
    console.log("Rendering step:", step);
    console.log("Total steps:", totalSteps);

    switch (step) {
      case 1:
        return <Introduction onNext={handleNext} />;
      case 2:
        return isQuestionnaireMode ? (
          <GuidedSelectionStep onNext={handleNext} onBack={handleBack} />
        ) : (
          <ManualSelectionStep onNext={handleNext} onBack={handleBack} />
        );
      default:
        const currentStepIndex = step - 3; // Adjust for intro and category selection steps
        const categories = Object.entries(selectedCategories)
          .filter(([_, selected]) => selected)
          .map(([category]) => category);

        // If we've gone through all categories steps
        if (currentStepIndex >= categories.length) {
          return <Result onBack={handleBack} />;
        }

        if (currentStepIndex >= 0 && currentStepIndex < categories.length) {
          const currentCategory = categories[currentStepIndex];
          switch (currentCategory) {
            case "sounds":
              return isQuestionnaireMode ? (
                <SoundsQuestionnaire onNext={handleNext} onBack={handleBack} />
              ) : (
                <SoundsStep onNext={handleNext} onBack={handleBack} />
              );
            case "visual":
              return isQuestionnaireMode ? (
                <VisualQuestionnaire onNext={handleNext} onBack={handleBack} />
              ) : (
                <VisualStep onNext={handleNext} onBack={handleBack} />
              );
            case "text":
              return isQuestionnaireMode ? (
                <TextQuestionnaire onNext={handleNext} onBack={handleBack} />
              ) : (
                <TextStep onNext={handleNext} onBack={handleBack} />
              );
          }
        }

        // Default fallback
        return <Introduction onNext={handleNext} />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-surface-card/90 backdrop-blur-sm rounded-2xl shadow-soft border border-white/10 overflow-hidden">
        <div className="p-6 md:p-8">
          {step > 1 && (
            <div className="mb-8">
              <ProgressBar
                currentStep={step - 1} // Subtract 1 to not count Introduction
                totalSteps={totalSteps}
                onBack={handleBack}
                onNext={handleNext}
                canContinue={canContinue()}
                isQuestionnaireMode={isQuestionnaireMode}
                currentQuestion={getCurrentQuestionNumber()}
                totalQuestions={totalQuestionsPerStep}
              />
            </div>
          )}
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
