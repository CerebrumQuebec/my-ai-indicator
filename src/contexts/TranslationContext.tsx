"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Language, TranslationKey, getTranslation } from "../translations";

type TranslationContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Default to French, but check localStorage on client side
  const [language, setLanguage] = useState<Language>("fr");

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language;
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  useEffect(() => {
    // Save language preference to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
      // Also update the html lang attribute
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (key: TranslationKey): string => {
    return getTranslation(language, key);
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
