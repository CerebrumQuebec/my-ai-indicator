"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { translations } from "../translations";

type Language = "en" | "fr";

// Define a type that allows string or string array values
type TranslationValue = string | string[];

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("fr");

  const t = (key: string): string => {
    const value = translations[language][
      key as keyof (typeof translations)[typeof language]
    ] as TranslationValue;
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    return value?.toString() || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
