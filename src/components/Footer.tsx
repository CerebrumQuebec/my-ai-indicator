"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../contexts/TranslationContext";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-surface-dark border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-8 mb-4 md:mb-0">
            <Link
              href="/about"
              className="text-text-primary hover:text-primary-400 transition-colors font-medium"
            >
              {t("about")}
            </Link>
            <Link
              href="/privacy"
              className="text-text-primary hover:text-primary-400 transition-colors font-medium"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/contact"
              className="text-text-primary hover:text-primary-400 transition-colors font-medium"
            >
              {t("contact")}
            </Link>
          </div>
          <div className="text-text-secondary text-sm">
            <p>
              © {currentYear} {t("appName")}.{" "}
              <a
                href="https://cerebrum.website/"
                className="text-text-primary hover:text-primary-400 transition-colors"
              >
                {t("cerebrum")}
              </a>{" "}
              {t("allRightsReserved")}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
