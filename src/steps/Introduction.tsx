"use client";

import React, { useState } from "react";
import { useWizard } from "../contexts/WizardContext";
import { useTranslation } from "../contexts/TranslationContext";

interface IntroductionProps {
  onNext: () => void;
}

const Introduction: React.FC<IntroductionProps> = ({ onNext }) => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [showCCInspiration, setShowCCInspiration] = useState(false);
  const [knowsLicense, setKnowsLicense] = useState<boolean | null>(null);
  const { setQuestionnaireMode } = useWizard();
  const { t } = useTranslation();

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
            {t("welcomeTitle")}
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            {t("welcomeDescription")}
          </p>
        </div>

        {/* License knowledge question */}
        <div className="mt-8 bg-surface-dark rounded-xl border border-white/10 p-6">
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-semibold text-text-primary">
              {t("licenseQuestion")}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={() => handleLicenseKnowledge(true)}
              className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                knowsLicense === true
                  ? "bg-primary-500 text-white"
                  : "bg-surface-card hover:bg-primary-500/20 text-text-primary"
              }`}
            >
              {t("yes")}
            </button>
            <button
              onClick={() => handleLicenseKnowledge(false)}
              className={`flex-1 px-4 py-3 rounded-lg transition-colors ${
                knowsLicense === false
                  ? "bg-primary-500 text-white"
                  : "bg-surface-card hover:bg-primary-500/20 text-text-primary"
              }`}
            >
              {t("no")}
            </button>
          </div>
        </div>

        {/* Additional information buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setShowHowItWorks(!showHowItWorks)}
            className="flex-1 px-4 py-3 bg-surface-dark hover:bg-surface-card rounded-lg transition-colors text-text-primary"
          >
            {t("howItWorks")}
          </button>
          <button
            onClick={() => setShowWhy(!showWhy)}
            className="flex-1 px-4 py-3 bg-surface-dark hover:bg-surface-card rounded-lg transition-colors text-text-primary"
          >
            {t("whyIndicate")}
          </button>
          <button
            onClick={() => setShowCCInspiration(!showCCInspiration)}
            className="flex-1 px-4 py-3 bg-surface-dark hover:bg-surface-card rounded-lg transition-colors text-text-primary"
          >
            {t("ccInspiration")}
          </button>
        </div>

        {/* Second box: Explanations */}
        <div className="bg-surface-dark rounded-xl border border-white/10 p-6 space-y-4">
          {/* How it works section */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowHowItWorks(!showHowItWorks)}
            >
              <h3 className="text-lg font-semibold text-text-primary">
                Comment ça fonctionne ?
              </h3>
              <div className="text-primary-500">
                {showHowItWorks ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
            {showHowItWorks && (
              <div className="mt-4 space-y-3 text-text-secondary">
                <p>
                  Cet outil vous guide à travers un processus simple pour
                  déterminer quelle catégorie d&apos;implication IA correspond à
                  votre création musicale et textuelle.
                </p>
                <p>
                  Pour chaque domaine (musique et texte), vous pourrez soit :
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>
                    <span className="font-medium text-text-primary">
                      Choisir directement une catégorie
                    </span>{" "}
                    si vous savez déjà quel niveau d&apos;IA vous avez utilisé
                  </li>
                  <li>
                    <span className="font-medium text-text-primary">
                      Répondre à un questionnaire
                    </span>{" "}
                    qui vous aidera à déterminer la catégorie la plus appropriée
                  </li>
                </ul>
                <p>
                  À la fin, vous recevrez un badge et du code à intégrer pour
                  afficher votre indicateur d&apos;utilisation de l&apos;IA sur
                  vos plateformes.
                </p>
              </div>
            )}
          </div>

          {/* Why use this section */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowWhy(!showWhy)}
            >
              <h3 className="text-lg font-semibold text-text-primary">
                Pourquoi utiliser cet indicateur ?
              </h3>
              <div className="text-primary-500">
                {showWhy ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
            {showWhy && (
              <div className="mt-4 space-y-3 text-text-secondary">
                <p>
                  À l&apos;ère de l&apos;IA générative, il devient crucial
                  d&apos;offrir de la
                  <span className="font-medium text-text-primary">
                    {" "}
                    transparence{" "}
                  </span>
                  sur le processus créatif. L&apos;Indicateur d&apos;Utilisation
                  de l&apos;IA vous permet de :
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>
                    <span className="font-medium text-text-primary">
                      Maintenir la confiance
                    </span>{" "}
                    avec votre public en étant transparent sur l&apos;origine de
                    votre travail
                  </li>
                  <li>
                    <span className="font-medium text-text-primary">
                      Valoriser votre processus créatif
                    </span>{" "}
                    qu&apos;il soit principalement humain ou assisté par
                    l&apos;IA
                  </li>
                  <li>
                    <span className="font-medium text-text-primary">
                      Contribuer à un écosystème sain
                    </span>{" "}
                    où la création assistée par IA est clairement identifiable
                  </li>
                  <li>
                    <span className="font-medium text-text-primary">
                      Compléter vos licences existantes
                    </span>{" "}
                    (Creative Commons ou autres) avec cette information sur la
                    provenance
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* New section: Creative Commons inspiration */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowCCInspiration(!showCCInspiration)}
            >
              <h3 className="text-lg font-semibold text-text-primary">
                Inspiré de Creative Commons
              </h3>
              <div className="text-primary-500">
                {showCCInspiration ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
            {showCCInspiration && (
              <div className="mt-4 space-y-3 text-text-secondary">
                <p>
                  Notre Indicateur d&apos;Utilisation de l&apos;IA
                  s&apos;inspire directement de Creative Commons, qui a
                  révolutionné la façon dont les créateurs peuvent partager
                  leurs œuvres avec des permissions claires.
                </p>
                <p>
                  <span className="font-medium text-text-primary">
                    Similarités avec Creative Commons :
                  </span>
                </p>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li>
                    <span className="font-medium text-text-primary">
                      Approche standardisée
                    </span>{" "}
                    avec des catégories claires et précises
                  </li>
                  <li>
                    <span className="font-medium text-text-primary">
                      Triple couche
                    </span>{" "}
                    (humaine, technique et explicative) pour une compréhension à
                    tous les niveaux
                  </li>
                  <li>
                    <span className="font-medium text-text-primary">
                      Badges visuels
                    </span>{" "}
                    reconnaissables qui communiquent l&apos;information
                    essentielle au premier coup d&apos;œil
                  </li>
                  <li>
                    <span className="font-medium text-text-primary">
                      Métadonnées standardisées
                    </span>{" "}
                    pour l&apos;intégration technique dans les fichiers et sites
                    web
                  </li>
                </ul>
                <p>
                  <span className="font-medium text-text-primary">
                    Différence principale :
                  </span>{" "}
                  Là où Creative Commons définit comment une œuvre peut être{" "}
                  <em>utilisée</em>, notre indicateur précise comment elle a été{" "}
                  <em>créée</em>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
