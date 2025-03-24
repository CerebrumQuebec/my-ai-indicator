"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../../contexts/TranslationContext";

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 px-3 sm:px-4">
      {/* Background decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-primary-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-20 w-72 h-72 bg-accent-indigo rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-primary-600 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="bg-surface-card/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-white/10 overflow-hidden p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 sm:mb-6 flex items-center">
          <span className="animated-gradient-text">{t("aboutTitle")}</span>
        </h1>

        <div className="space-y-6 sm:space-y-8">
          <section className="transition-all duration-300 hover:translate-x-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 sm:mb-4 flex items-center">
              <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {t("aboutIntroTitle")}
            </h2>
            <div className="pl-10">
              <p className="text-text-secondary mb-4">{t("aboutIntroText")}</p>
            </div>
          </section>

          <section className="transition-all duration-300 hover:translate-x-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 sm:mb-4 flex items-center">
              <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {t("aboutMissionTitle")}
            </h2>
            <div className="pl-10">
              <p className="text-text-secondary mb-4">
                {t("aboutMissionText")}
              </p>
            </div>
          </section>

          <section className="transition-all duration-300 hover:translate-x-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 sm:mb-4 flex items-center">
              <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
              </div>
              {t("aboutCategoriesTitle")}
            </h2>
            <div className="pl-10">
              <p className="text-text-secondary mb-4">
                {t("aboutCategoriesText")}
              </p>

              {/* Content Type Cards - Stack on mobile, 3 columns on larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4">
                <div className="bg-surface-dark/70 rounded-lg border border-white/10 p-3 sm:p-4 transition-all duration-300 hover:bg-surface-dark hover:border-primary-500/30 hover:shadow-lg hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-primary-400 mb-1.5 flex items-center">
                    <span className="font-mono mr-1">S</span>
                    {t("soundsCategoryTitle")}
                  </h3>
                  <p className="text-sm text-text-secondary mb-2">
                    {t("soundsCategoryDescription")}
                  </p>
                  <div className="text-xs font-mono bg-primary-500/20 text-primary-400 py-1 px-2 rounded-md inline-block">
                    S-AI-0 - S-AI-4
                  </div>
                </div>
                <div className="bg-surface-dark/70 rounded-lg border border-white/10 p-3 sm:p-4 transition-all duration-300 hover:bg-surface-dark hover:border-accent-indigo/30 hover:shadow-lg hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-accent-indigo mb-1.5 flex items-center">
                    <span className="font-mono mr-1">V</span>
                    {t("visualCategoryTitle")}
                  </h3>
                  <p className="text-sm text-text-secondary mb-2">
                    {t("visualCategoryDescription")}
                  </p>
                  <div className="text-xs font-mono bg-accent-indigo/20 text-accent-indigo py-1 px-2 rounded-md inline-block">
                    V-AI-0 - V-AI-4
                  </div>
                </div>
                <div className="bg-surface-dark/70 rounded-lg border border-white/10 p-3 sm:p-4 transition-all duration-300 hover:bg-surface-dark hover:border-primary-200/30 hover:shadow-lg hover:-translate-y-1">
                  <h3 className="text-lg font-semibold text-primary-200 mb-1.5 flex items-center">
                    <span className="font-mono mr-1">T</span>
                    {t("textCategoryTitle")}
                  </h3>
                  <p className="text-sm text-text-secondary mb-2">
                    {t("textCategoryDescription")}
                  </p>
                  <div className="text-xs font-mono bg-primary-600/20 text-primary-200 py-1 px-2 rounded-md inline-block">
                    T-AI-0 - T-AI-4
                  </div>
                </div>
              </div>

              {/* AI Usage Level Cards - Stack on mobile, 2-3-5 columns as screen grows */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mt-3 sm:mt-4">
                {[0, 1, 2, 3, 4].map((category) => (
                  <div
                    key={category}
                    className="bg-surface-dark/70 rounded-lg border border-white/10 p-3 transition-all duration-300 hover:bg-surface-dark hover:border-primary-500/30 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center mb-2 mx-auto">
                      <span className="text-lg font-mono font-bold text-primary-400">
                        {category}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-text-primary mb-1.5 text-center">
                      {t(`category${category}Title`)}
                    </h3>
                    <p className="text-xs text-text-secondary text-center">
                      {t(`category${category}Description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="transition-all duration-300 hover:translate-x-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 sm:mb-4 flex items-center">
              <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              {t("aboutTeamTitle")}
            </h2>
            <div className="pl-10">
              <p className="text-text-secondary mb-4">{t("aboutTeamText")}</p>
            </div>
          </section>

          <section className="transition-all duration-300 hover:translate-x-1">
            <h2 className="text-xl sm:text-2xl font-semibold text-text-primary mb-3 sm:mb-4 flex items-center">
              <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-primary-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              {t("aboutContributeTitle")}
            </h2>
            <div className="pl-10">
              <p className="text-text-secondary mb-4">
                {t("aboutContributeText")}
              </p>
              <div className="bg-gradient-to-br from-surface-dark/80 to-surface-dark/60 rounded-lg border border-white/10 p-4 mt-4 shadow-lg transition-transform duration-300 hover:-translate-y-1">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {t("aboutContributeAreas")}
                    </h3>
                    <ul className="list-none space-y-2 text-text-secondary">
                      <li className="flex items-start">
                        <div className="w-6 h-6 bg-primary-500/20 rounded-md flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-primary-400 font-bold">1</span>
                        </div>
                        <span>{t("aboutContributeArea1")}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 bg-primary-500/20 rounded-md flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-primary-400 font-bold">2</span>
                        </div>
                        <span>{t("aboutContributeArea2")}</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 bg-primary-500/20 rounded-md flex items-center justify-center mr-2 mt-0.5">
                          <span className="text-primary-400 font-bold">3</span>
                        </div>
                        <span>{t("aboutContributeArea3")}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://github.com/philbourg/my-ai-indicator"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-surface-dark border border-white/10 rounded-lg text-primary-400 hover:bg-primary-500/20 hover:border-primary-500/30 transition-all duration-300"
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
                      className="inline-flex items-center px-4 py-2 bg-surface-dark border border-white/10 rounded-lg text-primary-400 hover:bg-primary-500/20 hover:border-primary-500/30 transition-all duration-300"
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
            </div>
          </section>
        </div>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-white/10">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-surface-dark border border-white/10 rounded-lg text-primary-400 hover:bg-primary-500/20 hover:border-primary-500/30 transition-all duration-300"
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
