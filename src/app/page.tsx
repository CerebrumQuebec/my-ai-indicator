"use client";

import { useWizard } from "../contexts/WizardContext";
import ProgressBar from "../components/ProgressBar";
import Introduction from "../steps/Introduction";
import MusicStep from "../steps/MusicStep";
import TextStep from "../steps/TextStep";
import Result from "../steps/Result";

export default function Home() {
  const { step, setStep, musicCategory, textCategory } = useWizard();
  const totalSteps = 4;

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
        return <MusicStep onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <TextStep onNext={handleNext} onBack={handleBack} />;
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
              />
            </div>
          )}
          {renderStep()}
        </div>
      </div>
    </div>
  );
}
