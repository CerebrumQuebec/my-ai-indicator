# Translation System Documentation

## Overview

The application implements a comprehensive internationalization (i18n) system using React Context. The system is designed to be flexible, maintainable, and easy to use across the entire application.

## Core Components

### 1. TranslationContext

Located in `src/contexts/TranslationContext.tsx`, this context provides:

- Language switching capabilities
- Default language: French ("fr")
- Supported languages: English ("en"), French ("fr")
- Translation function (`t`) for accessing translated strings

### 2. Translation Files

- `src/translations/index.ts`: Exports the translation configuration and types
- `src/translations/en.ts`: English translations
- `src/translations/fr.ts`: French translations

## Usage

### 1. Translation Provider

The TranslationProvider must wrap your application to make translations available:

```typescript
import { TranslationProvider } from "../contexts/TranslationContext";

function App({ children }) {
  return <TranslationProvider>{children}</TranslationProvider>;
}
```

### 2. Using Translations in Components

To use translations in a component:

```typescript
import { useTranslation } from "../../contexts/TranslationContext";

function MyComponent() {
  const { t, language, setLanguage } = useTranslation();

  return (
    <div>
      <h1>{t("someTranslationKey")}</h1>
      <p>{t("anotherTranslationKey")}</p>
    </div>
  );
}
```

### 3. Translation Structure

Translations are organized by categories in the language files:

- Header
- Footer
- Meta
- Badge Notation System
- Badge Types
- Analytics
- etc.

## Adding New Translations

1. Add new translation keys to both language files:

   - `src/translations/en.ts`
   - `src/translations/fr.ts`

2. Follow the existing category structure and naming conventions

3. Use the same key in both language files to ensure consistency

Example:

```typescript
// en.ts
export const en = {
  newFeature: "New Feature",
  // ... other translations
};

// fr.ts
export const fr = {
  newFeature: "Nouvelle Fonctionnalité",
  // ... other translations
};
```

## Best Practices

1. Always use the translation function (`t`) for text that should be localized
2. Keep translation keys descriptive and organized by feature/section
3. Maintain consistency in key naming across language files
4. Add comments in translation files to organize sections
5. Use TypeScript for type safety with translation keys

## Language Switching

The TranslationContext provides a `setLanguage` function to change the current language:

```typescript
const { setLanguage } = useTranslation();

// Switch to English
setLanguage("en");

// Switch to French
setLanguage("fr");
```

## Type Safety

The translation system includes TypeScript types for:

- Language codes ("en" | "fr")
- Translation keys (string)
- Context values and provider props
