"use client";

import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-surface-card/90 backdrop-blur-sm rounded-2xl shadow-soft border border-white/10 overflow-hidden p-6 md:p-8">
        <h1 className="text-3xl font-bold text-text-primary mb-6">
          À propos de l&apos;Indicateur d&apos;Utilisation de l&apos;IA
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Introduction
            </h2>
            <p className="text-text-secondary mb-4">
              L&apos;Indicateur d&apos;Utilisation de l&apos;IA est un système
              inspiré de Creative Commons qui permet d&apos;indiquer clairement
              le degré d&apos;implication de l&apos;intelligence artificielle
              dans la création d&apos;une œuvre artistique (musique, textes,
              etc.).
            </p>
            <p className="text-text-secondary mb-4">
              Là où Creative Commons clarifie comment une œuvre peut être
              réutilisée ou partagée, notre indicateur précise la part humaine
              vs. IA dans le processus créatif originel.
            </p>
            <p className="text-text-secondary">
              <strong>Important</strong> : Cet indicateur ne remplace pas les
              licences traditionnelles (comme Creative Commons), mais les
              complète en apportant une information de transparence
              supplémentaire.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Les 5 Catégories d&apos;Utilisation de l&apos;IA
            </h2>
            <p className="text-text-secondary mb-4">
              Notre système est basé sur 5 catégories qui représentent un
              spectre d&apos;utilisation de l&apos;IA, de la plus intensive à la
              plus limitée :
            </p>

            <div className="space-y-4 mt-6">
              <div className="bg-surface-dark rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-text-primary">
                  Catégorie 1 : IA seule
                </h3>
                <p className="text-text-secondary mt-1">
                  Production exclusivement générée par l&apos;IA, sans
                  intervention humaine significative, hormis la formulation
                  d&apos;un prompt initial simple.
                </p>
              </div>

              <div className="bg-surface-dark rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-text-primary">
                  Catégorie 2 : IA dirigée
                </h3>
                <p className="text-text-secondary mt-1">
                  Contenu généré par l&apos;IA, mais avec des interventions
                  humaines itératives importantes (prompts élaborés, sélection
                  parmi plusieurs outputs, ajustements fins).
                </p>
              </div>

              <div className="bg-surface-dark rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-text-primary">
                  Catégorie 3 : Co-création IA/humain
                </h3>
                <p className="text-text-secondary mt-1">
                  Équilibre entre création humaine et assistance IA. L&apos;IA
                  contribue substantiellement, mais l&apos;humain reste au
                  centre du processus créatif.
                </p>
              </div>

              <div className="bg-surface-dark rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-text-primary">
                  Catégorie 4 : Assistance numérique légère
                </h3>
                <p className="text-text-secondary mt-1">
                  Production principalement humaine, avec assistance
                  IA/numérique limitée pour des aspects spécifiques et non
                  centraux de l&apos;œuvre.
                </p>
              </div>

              <div className="bg-surface-dark rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-text-primary">
                  Catégorie 5 : Production artisanale
                </h3>
                <p className="text-text-secondary mt-1">
                  Production quasi entièrement humaine, sans utilisation
                  d&apos;IA ou avec un usage extrêmement limité d&apos;outils
                  automatiques.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Approche multi-couches
            </h2>
            <p className="text-text-secondary mb-4">
              À l&apos;instar de Creative Commons, nous proposons une approche à
              trois niveaux :
            </p>

            <div className="space-y-4">
              <div className="bg-surface-dark rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-text-primary">
                  1. Couche Humaine (Human-Readable)
                </h3>
                <p className="text-text-secondary mt-1">
                  Des badges visuels et résumés simples expliquant chaque
                  catégorie, facilement compréhensibles par les créateurs et le
                  public.
                </p>
              </div>

              <div className="bg-surface-dark rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-text-primary">
                  2. Couche Technique (Machine-Readable)
                </h3>
                <p className="text-text-secondary mt-1">
                  Des métadonnées standardisées à inclure dans les fichiers ou
                  les pages web, permettant aux plateformes de reconnaître et
                  d&apos;afficher l&apos;indicateur automatiquement.
                </p>
              </div>

              <div className="bg-surface-dark rounded-lg p-4 border border-white/10">
                <h3 className="font-medium text-text-primary">
                  3. Couche Explicative
                </h3>
                <p className="text-text-secondary mt-1">
                  Documentation détaillée expliquant la portée et les
                  limitations de l&apos;indicateur, à l&apos;instar du
                  &ldquo;legal code&rdquo; de Creative Commons, mais sans portée
                  juridique contraignante.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-text-primary mb-4">
              Gouvernance et évolution
            </h2>
            <p className="text-text-secondary mb-4">
              Inspiré de l&apos;approche communautaire de Creative Commons,
              notre indicateur :
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>Est un standard ouvert que chacun peut adopter librement</li>
              <li>
                Évolue grâce aux contributions de la communauté des créateurs et
                plateformes
              </li>
              <li>
                Peut être versionné (v1.0, v2.0, etc.) pour s&apos;adapter aux
                évolutions technologiques
              </li>
              <li>
                Vise à devenir un outil de transparence reconnu
                internationalement
              </li>
            </ul>
          </section>

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
    </div>
  );
}
