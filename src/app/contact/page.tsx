"use client";

import { useTranslation } from "../../contexts/TranslationContext";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gray-900 rounded-lg border border-gray-800 shadow-sm p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          {t("contactTitle")}
        </h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl text-white mb-2">Philippe Bourque</h2>
            <a
              href="mailto:phil@quaribou.net"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              phil@quaribou.net
            </a>
          </div>

          <div className="mt-8">
            <p className="text-gray-200">{t("contactDescription")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
