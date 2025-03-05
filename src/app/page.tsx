"use client";

import { useWizard } from "../contexts/WizardContext";
import ProgressBar from "../components/ProgressBar";
import Introduction from "../steps/Introduction";
import MusicStep from "../steps/MusicStep";
import TextStep from "../steps/TextStep";
import MusicQuestionnaire from "../steps/MusicQuestionnaire";
import TextQuestionnaire from "../steps/TextQuestionnaire";
import Result from "../steps/Result";

export default function Home() {
  const { step, setStep, musicCategory, textCategory, isQuestionnaireMode } =
    useWizard();
  const totalSteps = 4;
  const totalQuestionsPerStep = 10;

  // Get current question number from the active questionnaire component
  const getCurrentQuestionNumber = () => {
    if (!isQuestionnaireMode || step === 1 || step === 4) return 0;
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

  const canContinue = () => {
    switch (step) {
      case 1:
        return true;
      case 2:
        return !!musicCategory;
      case 3:
        return !!textCategory;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Introduction onNext={handleNext} />;
      case 2:
        return isQuestionnaireMode ? (
          <MusicQuestionnaire onNext={handleNext} onBack={handleBack} />
        ) : (
          <MusicStep onNext={handleNext} onBack={handleBack} />
        );
      case 3:
        return isQuestionnaireMode ? (
          <TextQuestionnaire onNext={handleNext} onBack={handleBack} />
        ) : (
          <TextStep onNext={handleNext} onBack={handleBack} />
        );
      case 4:
        return <Result onBack={handleBack} />;
      default:
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
                currentStep={step}
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
