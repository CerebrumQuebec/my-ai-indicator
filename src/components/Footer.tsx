"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../contexts/TranslationContext";
import HighContrastText from "./HighContrastText";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-12 py-16 bg-gradient-to-b from-surface-dark/95 to-surface-dark border-t border-white/10">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px]" />
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl font-bold relative inline-block group">
              <span className="animated-gradient-text">{t("appName")}</span>
              <span className="absolute -bottom-1 left-0 w-1/3 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {t("footerDescription")}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white relative inline-block group">
              <HighContrastText text={t("quickLinks")} />
              <span className="absolute -bottom-1 left-0 w-1/3 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-primary-400 transition-all duration-300 flex items-center group"
                >
                  <span className="relative overflow-hidden inline-flex items-center">
                    <svg
                      className="w-3 h-3 mr-2 text-primary-500 transform group-hover:translate-x-1 transition-transform duration-300"
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
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-primary-400 transition-all duration-300 flex items-center group"
                >
                  <span className="relative overflow-hidden inline-flex items-center">
                    <svg
                      className="w-3 h-3 mr-2 text-primary-500 transform group-hover:translate-x-1 transition-transform duration-300"
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
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-primary-400 transition-all duration-300 flex items-center group"
                >
                  <span className="relative overflow-hidden inline-flex items-center">
                    <svg
                      className="w-3 h-3 mr-2 text-primary-500 transform group-hover:translate-x-1 transition-transform duration-300"
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
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white relative inline-block group">
              <HighContrastText text={t("resources")} />
              <span className="absolute -bottom-1 left-0 w-1/3 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-primary-400 transition-all duration-300 flex items-center group"
                >
                  <span className="relative overflow-hidden inline-flex items-center">
                    <svg
                      className="w-3 h-3 mr-2 text-primary-500 transform group-hover:translate-x-1 transition-transform duration-300"
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
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-primary-400 transition-all duration-300 flex items-center group"
                >
                  <span className="relative overflow-hidden inline-flex items-center">
                    <svg
                      className="w-3 h-3 mr-2 text-primary-500 transform group-hover:translate-x-1 transition-transform duration-300"
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
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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

            <div className="flex items-center gap-4">
              <div className="inline-flex gap-3 font-sans">
                <span className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/15 transition-colors">
                  Visuel: V.AI.4
                </span>
                <span className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/15 transition-colors">
                  Texte: T.AI.4
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
