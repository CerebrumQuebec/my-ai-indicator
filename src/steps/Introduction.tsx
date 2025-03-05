"use client";

import React, { useState } from "react";
import { useWizard } from "../contexts/WizardContext";

interface IntroductionProps {
  onNext: () => void;
}

const Introduction: React.FC<IntroductionProps> = ({ onNext }) => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [knowsLicense, setKnowsLicense] = useState<boolean | null>(null);
  const { setQuestionnaireMode } = useWizard();

  // Function to handle selection of knowledge state
  const handleLicenseKnowledge = (knows: boolean) => {
    setKnowsLicense(knows);
    if (knows) {
      setQuestionnaireMode(false);
      onNext();
    } else {
      setQuestionnaireMode(true);
      onNext();
    }
  };

  return (
    <div className="space-y-8">
      {/* First box: Welcome and CTA */}
      <div className="bg-surface-card rounded-xl border border-white/10 p-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-text-primary">
            Bienvenue sur l&apos;indicateur d&apos;utilisation de l&apos;IA
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Cet outil vous aidera à déterminer dans quelle mesure votre
            processus créatif utilise l&apos;intelligence artificielle.
          </p>
        </div>

        {/* License knowledge question */}
        <div className="mt-8 bg-surface-dark rounded-xl border border-white/10 p-6">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold text-text-primary">
              Connaissez-vous le type de licence dont vous avez besoin ?
            </h2>
          </div>

          <div className="space-y-3 mt-6">
            <button
              onClick={() => handleLicenseKnowledge(true)}
              className={`w-full flex items-center p-4 rounded-lg border border-white/10 bg-surface-card hover:bg-surface-hover transition-colors ${
                knowsLicense === true ? "ring-2 ring-primary-500" : ""
              }`}
            >
              <div className="flex-shrink-0 w-6 h-6 border-2 rounded-full border-primary-500 flex items-center justify-center mr-3">
                {knowsLicense === true && (
                  <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                )}
              </div>
              <span className="text-lg text-text-primary">
                Oui. Je connais la licence dont j&apos;ai besoin.
              </span>
            </button>

            <button
              onClick={() => handleLicenseKnowledge(false)}
              className={`w-full flex items-center p-4 rounded-lg border border-white/10 bg-surface-card hover:bg-surface-hover transition-colors ${
                knowsLicense === false ? "ring-2 ring-primary-500" : ""
              }`}
            >
              <div className="flex-shrink-0 w-6 h-6 border-2 rounded-full border-primary-500 flex items-center justify-center mr-3">
                {knowsLicense === false && (
                  <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                )}
              </div>
              <span className="text-lg text-text-primary">
                Non. J&apos;ai besoin d&apos;aide pour choisir une licence.
              </span>
            </button>
          </div>

          {/* Action buttons based on selection */}
          {knowsLicense === true && (
            <div className="flex justify-center mt-8">
              <button
                onClick={onNext}
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-4 px-10 rounded-lg transition-colors shadow-glow text-lg"
              >
                Choisir ma licence
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Second box: Explanations */}
      <div className="bg-surface-dark rounded-xl border border-white/10 p-6 space-y-4">
        {/* How it works section */}
        <div className="space-y-2">
          <button
            onClick={() => setShowHowItWorks(!showHowItWorks)}
            className="w-full flex items-center justify-between text-left"
          >
            <h2 className="text-xl font-semibold text-text-primary flex items-center">
              <span className="bg-primary-500 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-white">
                ?
              </span>
              Comment ça marche
            </h2>
            <svg
              className={`w-6 h-6 text-text-primary transition-transform ${
                showHowItWorks ? "rotate-180" : ""
              }`}
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showHowItWorks && (
            <div className="space-y-3 pl-11">
              <div className="flex items-start">
                <span className="bg-primary-600 text-white rounded-full min-w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                  1
                </span>
                <p className="text-text-primary">
                  {knowsLicense === false
                    ? "Répondez à quelques questions sur votre utilisation de l'IA"
                    : "Choisissez votre niveau d'utilisation de l'IA"}
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-primary-600 text-white rounded-full min-w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                  2
                </span>
                <p className="text-text-primary">
                  {knowsLicense === false
                    ? "Obtenez une recommandation de licence adaptée"
                    : "Confirmez votre choix"}
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-primary-600 text-white rounded-full min-w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                  3
                </span>
                <p className="text-text-primary">
                  Obtenez une évaluation détaillée
                </p>
              </div>
              <div className="flex items-start">
                <span className="bg-primary-600 text-white rounded-full min-w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                  4
                </span>
                <p className="text-text-primary">Partagez vos résultats</p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 my-4" />

        {/* Why use this section */}
        <div className="space-y-2">
          <button
            onClick={() => setShowWhy(!showWhy)}
            className="w-full flex items-center justify-between text-left"
          >
            <h2 className="text-xl font-semibold text-text-primary flex items-center">
              <span className="bg-primary-500 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-white">
                ?
              </span>
              Pourquoi utiliser cet indicateur
            </h2>
            <svg
              className={`w-6 h-6 text-text-primary transition-transform ${
                showWhy ? "rotate-180" : ""
              }`}
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {showWhy && (
            <div className="space-y-2 pl-11">
              <div className="flex items-start">
                <span className="text-primary-400 mr-2">•</span>
                <p className="text-text-primary">
                  Pour être transparent avec votre public et vos collaborateurs
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-primary-400 mr-2">•</span>
                <p className="text-text-primary">
                  Pour valoriser votre démarche créative, quelle qu&apos;elle
                  soit
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-primary-400 mr-2">•</span>
                <p className="text-text-primary">
                  Pour contribuer au débat sur la place de l&apos;IA dans
                  l&apos;art
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Introduction;
