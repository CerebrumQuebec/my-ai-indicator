import { en } from "./en";
import { fr } from "./fr";

export type Language = "en" | "fr";

// Define a type for translation values that can be either string or string array
export type TranslationValue = string | string[];

// Define the structure of our translations object
export type TranslationType = {
  [key: string]: TranslationValue;
};

export const translations: Record<Language, TranslationType> = {
  en,
  fr,
};

// Allow any string as a translation key to make it more flexible
export type TranslationKey = string;

export const getTranslation = (lang: Language, key: TranslationKey): string => {
  const value = translations[lang][key];
  if (Array.isArray(value)) {
    return value.join(", ");
  }
  return value?.toString() || key;
};
