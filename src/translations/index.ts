import { en } from "./en";
import { fr } from "./fr";

export type Language = "en" | "fr";

export const translations = {
  en,
  fr,
};

// Allow any string as a translation key to make it more flexible
export type TranslationKey = string;

export const getTranslation = (lang: Language, key: TranslationKey): string => {
  const translationsObj = translations[lang] as Record<string, string>;
  return translationsObj[key] || key;
};
