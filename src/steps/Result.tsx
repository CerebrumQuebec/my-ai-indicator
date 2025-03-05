"use client";

import React, { useState } from "react";
import { useWizard } from "../contexts/WizardContext";
import ResultBadge from "../components/ResultBadge";
import { ResultProps } from "../types";
import Link from "next/link";

const Result: React.FC<ResultProps> = ({ onBack }) => {
  const { musicCategory, textCategory } = useWizard();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "visual" | "metadata" | "advanced"
  >("visual");

  if (!musicCategory || !textCategory) {
    return null;
  }

  const htmlCode = `<div style="display: inline-flex; gap: 8px; font-family: sans-serif;">
  <span style="background-color: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 14px; font-weight: 500;">
    Musique: Cat. ${musicCategory}
  </span>
  <span style="background-color: #dbeafe; color: #1e40af; border: 1px solid #93c5fd; padding: 4px 12px; border-radius: 9999px; font-size: 14px; font-weight: 500;">
    Texte: Cat. ${textCategory}
  </span>
</div>`;

  const markdownCode = `![Musique: Cat. ${musicCategory}](https://img.shields.io/badge/Musique-Cat.%20${musicCategory}-blue) ![Texte: Cat. ${textCategory}](https://img.shields.io/badge/Texte-Cat.%20${textCategory}-blue)`;

  const metadataHtml = `<meta name="AI-Usage-Music" content="Category-${musicCategory}" />
<meta name="AI-Usage-Text" content="Category-${textCategory}" />
<meta name="AI-Usage-Version" content="1.0" />`;

  const metadataJson = `{
  "AIUsage": {
    "version": "1.0",
    "music": ${musicCategory},
    "text": ${textCategory}
  }
}`;

  const id3Example = `# Exemple d'ajout aux métadonnées ID3 (audio)
# Utiliser un outil comme MP3Tag ou EasyTag

TXXX: AI-USAGE=Music-Cat-${musicCategory}/Text-Cat-${textCategory}`;

  const handleCopyHTML = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(markdownCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyMetadata = () => {
    navigator.clipboard.writeText(metadataHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(metadataJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyId3 = () => {
    navigator.clipboard.writeText(id3Example);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getExplanation = () => {
    return (
      <div>
        <p className="font-medium text-text-primary">Votre création est:</p>
        <ul className="list-disc list-inside mt-2 space-y-1 text-text-secondary">
          <li>
            <span className="font-medium text-text-primary">
              Musique (Catégorie {musicCategory}):
            </span>{" "}
            {musicCategoryExplanation(musicCategory)}
          </li>
          <li>
            <span className="font-medium text-text-primary">
              Texte (Catégorie {textCategory}):
            </span>{" "}
            {textCategoryExplanation(textCategory)}
          </li>
        </ul>
      </div>
    );
  };

  const musicCategoryExplanation = (category: number) => {
    switch (category) {
      case 1:
        return "Générée entièrement par l'IA sans intervention humaine";
      case 2:
        return "Générée par l'IA avec une forte direction humaine";
      case 3:
        return "Mélange équilibré entre création humaine et assistance IA";
      case 4:
        return "Principalement humaine avec légère assistance numérique";
      case 5:
        return "Création purement artisanale, sans IA";
      default:
        return "";
    }
  };

  const textCategoryExplanation = (category: number) => {
    switch (category) {
      case 1:
        return "Généré entièrement par l'IA sans intervention humaine";
      case 2:
        return "Généré par l'IA avec un raffinage humain";
      case 3:
        return "Co-création entre l'humain et l'IA";
      case 4:
        return "Principalement écrit par un humain avec assistance numérique";
      case 5:
        return "Écrit exclusivement par un humain sans outils automatiques";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-text-primary">
          Votre badge IA
        </h2>
        <p className="mt-2 text-text-secondary">
          Basé sur vos réponses, nous avons déterminé ces catégories pour votre
          création.
        </p>
      </div>

      <div className="bg-surface-dark p-6 rounded-xl border border-white/10">
        <div className="flex justify-center mb-6">
          <ResultBadge
            musicCategory={musicCategory}
            textCategory={textCategory}
            size="large"
            displayType="detailed"
          />
        </div>

        {getExplanation()}
      </div>

      <div className="bg-surface-dark rounded-xl border border-white/10 overflow-hidden">
        <div className="flex border-b border-white/10">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "visual"
                ? "bg-surface-hover text-text-primary"
                : "text-text-secondary hover:bg-surface-card/50"
            }`}
            onClick={() => setActiveTab("visual")}
          >
            Badges visuels
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "metadata"
                ? "bg-surface-hover text-text-primary"
                : "text-text-secondary hover:bg-surface-card/50"
            }`}
            onClick={() => setActiveTab("metadata")}
          >
            Métadonnées
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === "advanced"
                ? "bg-surface-hover text-text-primary"
                : "text-text-secondary hover:bg-surface-card/50"
            }`}
            onClick={() => setActiveTab("advanced")}
          >
            Avancé
          </button>
        </div>

        <div className="p-6">
          {activeTab === "visual" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  Code HTML
                </h3>
                <div className="relative">
                  <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto text-text-secondary text-sm">
                    <code>{htmlCode}</code>
                  </pre>
                  <button
                    onClick={handleCopyHTML}
                    className="absolute top-3 right-3 bg-surface-card p-1.5 rounded-md hover:bg-surface-hover"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  Code Markdown
                </h3>
                <div className="relative">
                  <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto text-text-secondary text-sm">
                    <code>{markdownCode}</code>
                  </pre>
                  <button
                    onClick={handleCopyMarkdown}
                    className="absolute top-3 right-3 bg-surface-card p-1.5 rounded-md hover:bg-surface-hover"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "metadata" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  Métadonnées HTML
                </h3>
                <p className="text-text-secondary text-sm mb-3">
                  À ajouter dans la section &lt;head&gt; de votre site web
                </p>
                <div className="relative">
                  <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto text-text-secondary text-sm">
                    <code>{metadataHtml}</code>
                  </pre>
                  <button
                    onClick={handleCopyMetadata}
                    className="absolute top-3 right-3 bg-surface-card p-1.5 rounded-md hover:bg-surface-hover"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  Métadonnées JSON-LD
                </h3>
                <p className="text-text-secondary text-sm mb-3">
                  Pour APIs et systèmes d&apos;échange de données
                </p>
                <div className="relative">
                  <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto text-text-secondary text-sm">
                    <code>{metadataJson}</code>
                  </pre>
                  <button
                    onClick={handleCopyJson}
                    className="absolute top-3 right-3 bg-surface-card p-1.5 rounded-md hover:bg-surface-hover"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "advanced" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  Métadonnées pour fichiers audio
                </h3>
                <p className="text-text-secondary text-sm mb-3">
                  Exemple d&apos;utilisation avec les tags ID3 pour MP3
                </p>
                <div className="relative">
                  <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto text-text-secondary text-sm">
                    <code>{id3Example}</code>
                  </pre>
                  <button
                    onClick={handleCopyId3}
                    className="absolute top-3 right-3 bg-surface-card p-1.5 rounded-md hover:bg-surface-hover"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-text-secondary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-text-primary mb-3">
                  Combinaison avec Creative Commons
                </h3>
                <p className="text-text-secondary mb-3">
                  Le Badge IA peut être utilisé en parallèle avec une licence
                  Creative Commons ou toute autre licence de droit
                  d&apos;auteur. Exemple :
                </p>
                <div className="bg-black/30 rounded-lg p-4 text-text-secondary text-sm">
                  <p>
                    © 2023 [Votre nom] •{" "}
                    <strong>
                      IA Cat. {musicCategory} (Musique) / Cat. {textCategory}{" "}
                      (Texte)
                    </strong>{" "}
                    • <span className="text-blue-400">CC BY-SA 4.0</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="flex items-center px-4 py-2 text-text-primary hover:text-primary-400 font-medium transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Retour
        </button>
        <Link
          href="/"
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Terminer
        </Link>
      </div>

      {copied && (
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-4 py-2 rounded-lg shadow-lg">
          Copié dans le presse-papier !
        </div>
      )}
    </div>
  );
};

export default Result;
