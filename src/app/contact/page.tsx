"use client";

import { useTranslation } from "../../contexts/TranslationContext";
import Image from "next/image";
import Link from "next/link";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 px-3 sm:px-4">
      {/* Background decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-primary-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-1/3 left-20 w-72 h-72 bg-accent-indigo rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="bg-surface-card/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg border border-white/10 overflow-hidden p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 sm:mb-6 flex items-center">
          <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span className="animated-gradient-text">{t("contactTitle")}</span>
        </h1>

        <div className="space-y-6 sm:space-y-8">
          <section className="transition-all duration-300 hover:translate-x-1">
            <p className="text-text-secondary mb-6 pl-10">
              {t("contactDescription")}
            </p>

            <div className="bg-gradient-to-br from-surface-dark/80 to-surface-dark/60 rounded-lg border border-white/10 p-4 mt-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="flex flex-col">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-4">
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden shrink-0 mx-auto sm:mx-0 border-2 border-primary-500/30 shadow-lg group">
                      <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-accent-indigo/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <Image
                        src="/cerebrum.jpeg"
                        alt="Philippe Bourque"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 128px, 128px"
                        priority
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-text-primary mb-2 text-center sm:text-left">
                        <span className="animated-gradient-text">
                          {t("contactBioTitle")}
                        </span>
                      </h2>
                      <h3 className="text-lg font-semibold text-text-primary text-center sm:text-left">
                        Philippe Bourque
                      </h3>
                      <p className="text-primary-400 mt-1 text-center sm:text-left">
                        {t("contactRole")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-text-secondary">
                    <p className="flex items-start">
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 mr-2 mt-0.5 bg-primary-500/20 text-primary-400 rounded-md">
                        👀
                      </span>
                      <span>{t("contactBio1")}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 mr-2 mt-0.5 bg-primary-500/20 text-primary-400 rounded-md">
                        🌱
                      </span>
                      <span>{t("contactBio2")}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 mr-2 mt-0.5 bg-primary-500/20 text-primary-400 rounded-md">
                        💞️
                      </span>
                      <span>{t("contactBio3")}</span>
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="https://github.com/philbourg"
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
                      GitHub
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
                      {t("contactEmail")}
                    </a>
                  </div>
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
