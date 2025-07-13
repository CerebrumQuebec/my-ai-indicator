# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack and Architecture

**Badge AI** is a Next.js 14 application that helps creators transparently communicate AI usage levels in their creative works. The app uses a wizard-based interface to evaluate AI involvement across three content types: sounds, visual, and text.

### Core Technologies
- **Framework**: Next.js 14 with App Router (`src/app/`)
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Database**: Firebase Realtime Database
- **Analytics**: Vercel Analytics (anonymous)
- **Payments**: Stripe integration for donations
- **Internationalization**: next-intl for French/English support
- **Type Safety**: TypeScript with strict mode

### Key Development Commands
```bash
# Development
npm run dev          # Start development server on http://localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Architecture Overview

For complete architectural documentation, see `docs/Architecture/` folder which contains detailed specifications for all system components.

### Core Architecture Patterns

**Component-Based Design:**
- Provider layer (WizardContext, TranslationContext)
- Layout components (Header, Footer)
- Feature components (wizard steps, badge system)
- Reusable UI components with consistent patterns

**State Management:**
- **WizardContext** (`src/contexts/WizardContext.tsx`): Core wizard state including current step, selected categories, and AI usage ratings
- **TranslationContext** (`src/contexts/TranslationContext.tsx`): Handles language switching between French and English
- Unidirectional data flow with React Context API
- Session-scoped state with validation at each step

### Wizard System Architecture

**Dynamic Step Calculation:**
```typescript
// Steps adapt based on selected content types
const totalSteps = 1 + Object.values(selectedCategories).filter(Boolean).length + 1;
// Introduction + Selected Categories + Results
```

**Multi-Mode Evaluation:**
1. **Landing Page** (`src/app/page.tsx`): Hero section with category overview and call-to-action
2. **Wizard Flow**: Multi-step evaluation process managed by WizardContext
   - Introduction step
   - Category selection (sounds/visual/text)
   - Category-specific evaluation (manual selection or questionnaire mode)
   - Results with badge generation and export

### Content Type Evaluation System

The app evaluates AI usage across three content types with standardized 5-level classification:

**Content Types:**
- **Sounds/Music**: Composition, arrangement, mixing, and production
- **Visual**: Digital art, image generation, and visual design  
- **Text**: Writing, editing, and content creation

**AI Usage Levels (0-4):**
- **0**: Human Only - Exclusively human-created without AI assistance
- **1**: Human with AI - Primarily human work with minor AI assistance
- **2**: AI Collaboration - Balanced human-AI collaboration
- **3**: Directed AI - AI generation with significant human direction
- **4**: AI Only - Fully AI-generated without human editing

**Evaluation Modes:**
- **Manual Selection**: Direct category choice through visual interface cards
- **Questionnaire Mode**: 10-question assessment with weighted scoring algorithm

### Badge System Architecture

**Notation System:**
- Generates SVG badges with standardized notation: `{TYPE}-AI-{LEVEL}`
- Examples: `S-AI-2`, `V-AI-0`, `T-AI-4`
- SVG assets in `/public/badges/category-[0-4].svg`

**Export Formats:**
- HTML embed code with inline styling
- Markdown with shields.io integration
- JSON metadata with structured data
- ID3 audio tags for music files
- Creative Commons attribution format

**Visual Design:**
- Category-specific gradients and icons
- Glass morphism effects with Tailwind CSS
- Hover animations and copy-to-clipboard functionality

## File Structure Patterns

### Pages and Routing
- `src/app/page.tsx`: Main landing page with wizard integration
- `src/app/layout.tsx`: Root layout with providers and SEO metadata
- `src/app/[route]/page.tsx`: Additional pages (about, contact, faq, etc.)

### Components Organization
- `src/components/`: Reusable UI components (Button, Header, Footer, etc.)
- `src/steps/`: Wizard step components for each evaluation phase
- `src/components/slideIllustrations/`: Animated demo slideshow components

### Key Configurations
- **Tailwind Config**: Custom color palette with primary blues and accent indigo
- **TypeScript Config**: Strict mode with path mapping (`@/*` → `./src/*`)
- **Firebase Config**: Environment-based configuration for database and analytics
- **Vercel Config**: Production build optimizations

## Development Guidelines

### Styling Conventions
- Use Tailwind CSS utility classes with custom design system
- Custom color system: `primary-*`, `accent-*`, `surface-*`, `text-*`
- Glass morphism design with `backdrop-blur` and subtle borders
- Responsive design with mobile-first approach
- Consistent component styling patterns with design tokens

### Component Patterns
- **Context-Based Communication**: Use `useWizard()` and `useTranslation()` hooks instead of prop drilling
- **TypeScript Interfaces**: Define all props in `src/types/index.ts` with strict typing
- **Animation Integration**: Use Framer Motion for page transitions, hover effects, and micro-interactions
- **Error Boundaries**: Implement proper validation and error handling for wizard steps

```typescript
// Standard component pattern
export default function ComponentName({ prop1, prop2 }: ComponentProps) {
  const { contextValue, setContextValue } = useWizard();
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel p-6"
    >
      <h2>{t('translationKey')}</h2>
      {/* Component content */}
    </motion.div>
  );
}
```

### State Management Best Practices
- **WizardContext**: Core wizard state, category selections, and evaluation results
- **TranslationContext**: Language switching and internationalization
- **Local State**: Component-specific UI state and temporary data
- **Analytics Integration**: Track user interactions with Firebase

### Internationalization
- Translation keys in `src/translations/[lang].ts` with dynamic loading
- Use `useTranslation()` hook for all user-facing text
- Support for French and English locales with fallback handling
- Consistent translation key patterns across components

## Testing and Quality

### Code Standards
- ESLint configuration for Next.js
- TypeScript strict mode enabled
- Consistent file naming: PascalCase for components, camelCase for utilities

### Performance Considerations
- Next.js Image optimization for all images
- Dynamic imports for non-critical components
- Vercel Analytics for performance monitoring
- Build optimization with increased memory allocation

## External Integrations

### Firebase
- Realtime Database for analytics tracking
- Anonymous user interaction logging
- Configuration via environment variables (`.env.local`)

### Stripe
- Donation system integration
- Payment processing via API routes (`src/app/api/create-donation-session/`)

### Deployment
- Hosted on Vercel with automatic deployments from main branch
- Environment variables configured in Vercel dashboard
- Custom domain: badgeai.org

## Implementation Status and Known Gaps

### Critical Implementation Gaps
- **Visual Content Questionnaire**: Missing `visualQuestions` array and weights in `src/types/index.ts`
- **Questionnaire Algorithm**: Current UI uses simple averaging instead of sophisticated weighted scoring
- **Algorithm Connection**: The comprehensive questionnaire system exists in types but isn't fully connected to UI components

### Partially Implemented Features
- **Advanced Questionnaire**: 10-question assessment with weighted scoring is defined but simplified in UI
- **Badge Theming**: Framework exists for multiple badge themes but not fully customizable
- **Batch Export**: Individual export formats work, but no combined export functionality

## Common Development Tasks

### Adding New Content Types
1. **Update Type Definitions:**
```typescript
// src/types/index.ts
export type ContentType = "sounds" | "visual" | "text" | "newType";
export const newTypeCategoryOptions: CategoryOption[] = [/*...*/];
export const newTypeQuestions: QuestionItem[] = [/*...*/];
export const newTypeWeights: Record<string, number> = {/*...*/};
```

2. **Create Step Components:**
```typescript
// src/steps/NewTypeStep.tsx - Manual selection
// src/steps/NewTypeQuestionnaire.tsx - Questionnaire mode
```

3. **Update Context and Translations:**
- Add state to WizardContext
- Add translation keys in `src/translations/[lang].ts`
- Create SVG badges in `/public/badges/`

### Completing Questionnaire Implementation
1. **Connect Comprehensive Questions:**
```typescript
// Replace simplified averaging with weighted calculation
import { calculateCategory, musicQuestions, musicQuestionWeights } from '@/types';

const category = calculateCategory(answers, musicQuestionWeights);
```

2. **Add Missing Visual Questions:**
- Define `visualQuestions` array in `src/types/index.ts`
- Create `visualQuestionWeights` mapping
- Update `VisualQuestionnaire.tsx` component

### Common Tasks
1. **Adding new wizard steps**: Create component in `src/steps/`, update WizardContext logic
2. **Modifying categories**: Update types in `src/types/index.ts`, add translations
3. **Styling changes**: Use existing Tailwind classes, extend `tailwind.config.js` if needed
4. **Analytics**: Add events via Firebase in `src/lib/enhanced-analytics.ts`
5. **New pages**: Create in `src/app/[route]/page.tsx` with proper metadata

### Badge System Extensions
```typescript
// Add new export format
const generateCustomFormat = () => {
  return selectedBadges.map(badge => ({
    notation: badge.code,
    level: badge.category,
    timestamp: new Date().toISOString()
  }));
};
```

The application emphasizes transparency in AI usage for creative works, providing a standardized way for creators to communicate their AI involvement levels to audiences. See `docs/Architecture/` for complete system documentation and implementation guidelines.