"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../contexts/TranslationContext";
import HighContrastText from "./HighContrastText";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 py-10 bg-surface-dark/80 backdrop-blur-md border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 relative inline-block">
              <span className="animated-gradient-text">{t("appName")}</span>
              <span className="absolute -bottom-1 left-0 w-1/3 h-0.5 bg-primary-500"></span>
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              {t("footerDescription")}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              <HighContrastText text={t("quickLinks")} />
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center"
                >
                  <svg
                    className="w-3 h-3 mr-2 text-primary-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center"
                >
                  <svg
                    className="w-3 h-3 mr-2 text-primary-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center"
                >
                  <svg
                    className="w-3 h-3 mr-2 text-primary-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">
              <HighContrastText text={t("resources")} />
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center"
                >
                  <svg
                    className="w-3 h-3 mr-2 text-primary-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-primary-400 transition-colors flex items-center"
                >
                  <svg
                    className="w-3 h-3 mr-2 text-primary-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex justify-center mb-6">
            <div className="inline-flex gap-2 font-sans">
              <span className="bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                Visuel: V.AI.3
              </span>
              <span className="bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                Texte: T.AI.2
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {currentYear} {t("appName")}.{" "}
              <a
                href="https://cerebrum.website/"
                className="text-primary-400 hover:text-primary-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("cerebrum")}
              </a>{" "}
              {t("allRightsReserved")}
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4 text-sm text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-primary-400 transition-colors"
              >
                {t("privacy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
