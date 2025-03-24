"use client";

import { useTranslation } from "../../contexts/TranslationContext";
import Image from "next/image";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 px-3 sm:px-4">
      <div className="bg-surface-card/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-soft border border-white/10 overflow-hidden p-4 sm:p-6 md:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 sm:mb-6">
          {t("contactTitle")}
        </h1>

        <div className="space-y-6 sm:space-y-8">
          <section>
            <p className="text-text-secondary mb-6">
              {t("contactDescription")}
            </p>

            <div className="bg-surface-dark rounded-lg border border-white/10 p-4 mt-4">
              <div className="flex flex-col">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-4">
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden shrink-0 mx-auto sm:mx-0">
                      <Image
                        src="/cerebrum.jpeg"
                        alt="Philippe Bourque"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 128px, 128px"
                        priority
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-text-primary mb-2 text-center sm:text-left">
                        {t("contactBioTitle")}
                      </h2>
                      <h3 className="text-lg font-semibold text-text-primary text-center sm:text-left">
                        Philippe Bourque
                      </h3>
                      <p className="text-text-secondary mt-1 text-center sm:text-left">
                        {t("contactRole")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-text-secondary">
                    <p>{t("contactBio1")}</p>
                    <p>{t("contactBio2")}</p>
                    <p>{t("contactBio3")}</p>
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
                      {t("contactEmail")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
