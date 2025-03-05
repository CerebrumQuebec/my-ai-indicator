"use client";

import React, { useState } from "react";
import { useWizard } from "../contexts/WizardContext";
import Button from "../components/Button";
import ResultBadge from "../components/ResultBadge";
import { ResultProps } from "../types";

const Result: React.FC<ResultProps> = ({ onBack }) => {
  const { musicCategory, textCategory } = useWizard();
  const [copied, setCopied] = useState(false);

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
          Votre indicateur d&apos;utilisation de l&apos;IA
        </h2>
        <p className="mt-2 text-text-secondary">
          Voici le résultat de votre évaluation. Vous pouvez copier le code HTML
          ou Markdown pour l&apos;intégrer à votre site ou le partager.
        </p>
      </div>

      <div className="bg-surface-card p-6 rounded-lg border border-white/10">
        <div className="flex flex-col items-center space-y-4">
          <ResultBadge
            musicCategory={musicCategory}
            textCategory={textCategory}
          />
          <div className="text-sm text-text-secondary">
            Votre indicateur d&apos;utilisation de l&apos;IA
          </div>
        </div>
      </div>

      <div className="bg-surface-card p-6 rounded-lg border border-white/10">
        {getExplanation()}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-text-primary">
          Code à intégrer
        </h3>

        <div>
          <div className="flex justify-between items-center">
            <label
              htmlFor="html-code"
              className="block text-sm font-medium text-text-primary"
            >
              HTML
            </label>
            <Button variant="secondary" onClick={handleCopyHTML}>
              {copied ? "Copié !" : "Copier"}
            </Button>
          </div>
          <div className="mt-1">
            <textarea
              id="html-code"
              name="html-code"
              rows={3}
              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm bg-surface-dark text-text-primary border-white/10 rounded-md"
              value={htmlCode}
              readOnly
            ></textarea>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <label
              htmlFor="markdown-code"
              className="block text-sm font-medium text-text-primary"
            >
              Markdown
            </label>
            <Button variant="secondary" onClick={handleCopyMarkdown}>
              {copied ? "Copié !" : "Copier"}
            </Button>
          </div>
          <div className="mt-1">
            <textarea
              id="markdown-code"
              name="markdown-code"
              rows={2}
              className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm bg-surface-dark text-text-primary border-white/10 rounded-md"
              value={markdownCode}
              readOnly
            ></textarea>
          </div>
        </div>
      </div>

      <div className="flex space-x-4 pt-6">
        {onBack && (
          <Button variant="secondary" onClick={onBack}>
            Retour
          </Button>
        )}
        <Button onClick={() => window.location.reload()}>Recommencer</Button>
      </div>
    </div>
  );
};

export default Result;
