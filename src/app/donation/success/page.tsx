"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "../../../contexts/TranslationContext";

export default function DonationSuccess() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-surface-card/90 backdrop-blur-sm rounded-2xl shadow-soft border border-white/10 overflow-hidden p-6 md:p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-primary-500 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-text-primary mb-4">
          {t("donationSuccessTitle")}
        </h1>

        <p className="text-text-secondary mb-8">
          {t("donationSuccessMessage")}
        </p>

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
  );
}
