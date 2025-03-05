"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function FAQ() {
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  };

  const faqItems = [
    {
      question:
        "Quelle est la différence entre l'Indicateur IA et Creative Commons ?",
      answer:
        "Creative Commons gère les droits de copie, de redistribution et de modification d'une œuvre. L'Indicateur IA a une finalité différente : il informe sur la provenance (humain vs IA) sans définir de droits d'usage. Les deux peuvent être utilisés ensemble pour une information complète.",
    },
    {
      question: "Est-ce que l'Indicateur IA a une valeur juridique ?",
      answer:
        "Non, l'Indicateur IA n'est pas juridiquement contraignant et ne crée pas d'obligation légale sur le droit d'auteur. C'est un instrument de transparence, conçu pour informer le public sur le processus créatif, pas pour régir les droits associés à l'œuvre.",
    },
    {
      question:
        "Comment puis-je utiliser l'Indicateur IA avec une licence existante ?",
      answer:
        "Vous pouvez combiner l'Indicateur IA avec n'importe quelle licence, y compris Creative Commons. Par exemple : 'Catégorie 3 (IA/humain en co-création) + Licence CC BY-SA 4.0'. L'indicateur signale la part IA, tandis que la licence gère les droits de réutilisation.",
    },
    {
      question: "Comment décider quelle catégorie correspond à mon œuvre ?",
      answer:
        "Pour déterminer la catégorie appropriée, évaluez honnêtement l'implication de l'IA dans votre processus créatif. Utilisez notre questionnaire détaillé ou choisissez directement la catégorie qui correspond le mieux à votre processus. En cas de doute, privilégiez la transparence et optez pour la catégorie indiquant une plus grande implication de l'IA.",
    },
    {
      question: "Les plateformes reconnaissent-elles l'Indicateur IA ?",
      answer:
        "L'Indicateur IA est une initiative récente qui gagne progressivement en reconnaissance. Nous travaillons activement avec des plateformes pour intégrer la détection des métadonnées de l'indicateur. Entre-temps, nous encourageons les créateurs à mentionner explicitement leur catégorie dans les descriptions de leurs œuvres.",
    },
    {
      question:
        "Comment puis-je intégrer techniquement l'Indicateur IA à mes fichiers ?",
      answer:
        "Pour les sites web, ajoutez nos métadonnées dans l'en-tête HTML (ex: <meta name='AI-Usage' content='Catégorie 3 (Musique)'>). Pour les fichiers audio, ajoutez l'information dans les tags ID3 ou équivalents. Pour les documents, incluez l'information dans les métadonnées du fichier. Notre outil génère automatiquement des badges HTML et Markdown que vous pouvez intégrer directement.",
    },
    {
      question: "L'indicateur sera-t-il modifié à l'avenir ?",
      answer:
        "Oui, comme Creative Commons, l'Indicateur IA est conçu pour évoluer. Nous prévoyons un versionnement (v1.0, v2.0, etc.) pour nous adapter aux évolutions technologiques de l'IA et aux besoins des créateurs. Les versions seront clairement identifiées pour éviter toute confusion.",
    },
    {
      question:
        "Comment puis-je contribuer à l'amélioration de l'Indicateur IA ?",
      answer:
        "Nous encourageons les contributions de la communauté pour améliorer l'indicateur. Vous pouvez partager vos retours, suggérer des évolutions des catégories, proposer des traductions ou contribuer au code source. Contactez-nous pour plus d'informations sur la manière de participer.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-surface-card/90 backdrop-blur-sm rounded-2xl shadow-soft border border-white/10 overflow-hidden p-6 md:p-8">
        <h1 className="text-3xl font-bold text-text-primary mb-6">
          Foire Aux Questions
        </h1>

        <div className="space-y-4 mb-8">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-surface-dark rounded-lg border border-white/10 overflow-hidden"
            >
              <button
                className="w-full text-left p-4 flex justify-between items-center"
                onClick={() => toggleItem(index)}
              >
                <span className="font-medium text-text-primary">
                  {item.question}
                </span>
                <span className="text-primary-500">
                  {expandedItem === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
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
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </span>
              </button>
              {expandedItem === index && (
                <div className="px-4 pb-4 text-text-secondary">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <section className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center text-primary-500 hover:text-primary-400 font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Retour à l&apos;accueil
          </Link>
        </section>
      </div>
    </div>
  );
}
