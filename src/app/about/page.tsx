"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../../contexts/TranslationContext";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 px-3 sm:px-4">
      <div className="bg-surface-card/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-soft border border-white/10 overflow-hidden p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 sm:mb-6">
          {t("aboutTitle")}
        </h1>

        <div className="space-y-6 sm:space-y-8">
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 sm:mb-4">
              {t("aboutIntroTitle")}
            </h2>
            <p className="text-text-secondary mb-4">{t("aboutIntroText")}</p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 sm:mb-4">
              {t("aboutMissionTitle")}
            </h2>
            <p className="text-text-secondary mb-4">{t("aboutMissionText")}</p>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 sm:mb-4">
              {t("aboutCategoriesTitle")}
            </h2>
            <p className="text-text-secondary mb-4">
              {t("aboutCategoriesText")}
            </p>

            {/* Content Type Cards - Stack on mobile, 3 columns on larger screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4">
              <div className="bg-surface-dark rounded-lg border border-white/10 p-3 sm:p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-1.5">
                  {t("soundsCategoryTitle")}
                </h3>
                <p className="text-sm text-text-secondary mb-2">
                  {t("soundsCategoryDescription")}
                </p>
                <div className="text-xs text-text-secondary font-medium">
                  S.AI.0 - S.AI.4
                </div>
              </div>
              <div className="bg-surface-dark rounded-lg border border-white/10 p-3 sm:p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-1.5">
                  {t("visualCategoryTitle")}
                </h3>
                <p className="text-sm text-text-secondary mb-2">
                  {t("visualCategoryDescription")}
                </p>
                <div className="text-xs text-text-secondary font-medium">
                  V.AI.0 - V.AI.4
                </div>
              </div>
              <div className="bg-surface-dark rounded-lg border border-white/10 p-3 sm:p-4">
                <h3 className="text-lg font-semibold text-text-primary mb-1.5">
                  {t("textCategoryTitle")}
                </h3>
                <p className="text-sm text-text-secondary mb-2">
                  {t("textCategoryDescription")}
                </p>
                <div className="text-xs text-text-secondary font-medium">
                  T.AI.0 - T.AI.4
                </div>
              </div>
            </div>

            {/* AI Usage Level Cards - Stack on mobile, 2-3-5 columns as screen grows */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mt-3 sm:mt-4">
              {[0, 1, 2, 3, 4].map((category) => (
                <div
                  key={category}
                  className="bg-surface-dark rounded-lg border border-white/10 p-3"
                >
                  <h3 className="text-base font-semibold text-text-primary mb-1.5">
                    {t(`category${category}Title`)}
                  </h3>
                  <p className="text-xs text-text-secondary">
                    {t(`category${category}Description`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 sm:mb-4">
              {t("aboutTeamTitle")}
            </h2>
            <p className="text-text-secondary mb-4">{t("aboutTeamText")}</p>
            <div className="bg-surface-dark rounded-lg border border-white/10 p-4 mt-4">
              <div className="flex flex-col">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">
                    Philippe Bourque
                  </h3>
                  <p className="text-text-secondary mt-1">
                    {t("aboutTeamRole")}
                  </p>
                  <div className="mt-4 space-y-2 text-text-secondary">
                    <p>{t("aboutTeamBio1")}</p>
                    <p>{t("aboutTeamBio2")}</p>
                    <p>{t("aboutTeamBio3")}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href="https://github.com/philbourg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary-500 hover:text-primary-400"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                    <a
                      href="mailto:phil@cerebrum.website"
                      className="inline-flex items-center text-primary-500 hover:text-primary-400"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      {t("aboutTeamContact")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 sm:mb-4">
              {t("aboutContributeTitle")}
            </h2>
            <p className="text-text-secondary mb-4">
              {t("aboutContributeText")}
            </p>
            <div className="bg-surface-dark rounded-lg border border-white/10 p-4 mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-2">
                    {t("aboutContributeAreas")}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-text-secondary ml-2">
                    <li>{t("aboutContributeArea1")}</li>
                    <li>{t("aboutContributeArea2")}</li>
                    <li>{t("aboutContributeArea3")}</li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/philbourg/my-ai-indicator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-500 hover:text-primary-400"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    {t("aboutContributeGithub")}
                  </a>
                  <a
                    href="mailto:phil@cerebrum.website"
                    className="inline-flex items-center text-primary-500 hover:text-primary-400"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    {t("aboutContributeContact")}
                  </a>
                </div>
                <p className="text-text-secondary mt-2">
                  {t("aboutContributeInvite")}
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
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
            {t("backToHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
