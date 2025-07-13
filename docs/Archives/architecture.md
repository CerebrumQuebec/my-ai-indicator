# Badge AI - Architecture Documentation

## Table of Contents

1. [Project Configuration](#project-configuration)
2. [Build and Deployment](#build-and-deployment)
3. [Development Environment](#development-environment)
4. [Database and Security](#database-and-security)
5. [Environment Variables](#environment-variables)
6. [Version Control](#version-control)
7. [Application Architecture](#application-architecture)
8. [Feature Architecture](#feature-architecture)

## Project Configuration

### Core Technologies

- **Framework**: Next.js 14.0.4 with TypeScript
- **UI**: React 18.2.0
- **Styling**: Tailwind CSS 3.3.0 with PostCSS
- **Database**: Firebase Realtime Database
- **Authentication**: Firebase Auth
- **Payment Processing**: Stripe
- **Animation**: Framer Motion
- **Icons**: Heroicons and React Icons
- **Internationalization**: next-intl

### TypeScript Configuration

The project uses TypeScript with strict mode enabled and modern ES2017 features. Key configurations include:

- Target: ES2017
- Module: ESNext
- Strict type checking enabled
- Path aliases: `@/*` maps to `./src/*`
- JSX preservation for Next.js optimization

### Tailwind CSS Setup

The styling system is built on Tailwind CSS with custom configurations:

- Custom color palette with primary, surface, text, and accent colors
- Custom shadows: soft and glow effects
- Custom border radius extensions
- Extended theme with responsive design considerations
- PostCSS integration with autoprefixer

### Build and Deployment Configuration

Vercel is used as the deployment platform with the following specifications:

- Node.js build command: `npm run build`
- Installation command: `npm install`
- Framework preset: Next.js
- Increased memory allocation: 8GB
- Automated deployments from main branch
- Production optimizations enabled

## Database and Security

### Firebase Rules

The database security rules are structured around several key collections:

- **Page Views**: Tracks total and daily views with increment-only validation
- **Analytics**: Monitors devices, browsers, languages, and performance metrics
- **Platform Clicks**: Records platform-specific interaction data
- **Timezones**: Stores timezone-based usage statistics
- **Milestones**: Manages achievements and records with strict data validation
- **Comparisons**: Handles weekly and monthly comparative data

Security rules enforce:

- Read access is public
- Write access is restricted and validated
- Numerical increments must be positive
- Structured data must follow predefined schemas
- Timestamps and data formats are validated

## Environment Variables

### Production Configuration

The application uses the following environment variables:

- **Stripe Keys**: Live keys for payment processing
- **Firebase Configuration**:
  - API Key
  - Auth Domain
  - Project ID
  - Storage Bucket
  - Messaging Sender ID
  - App ID
  - Database URL

### Version Control

The project's version control ignores:

- Dependencies (`node_modules`, `.pnp`, etc.)
- Build outputs (`.next`, `out`, `build`)
- Environment files (`.env*`)
- Debug logs
- IDE specific files
- Testing artifacts
- Large files and dependencies (puppeteer, large assets)

## Known Issues and Recommendations

### Security Concerns

1. **Firebase Rules**: Consider implementing rate limiting and additional validation for write operations to prevent abuse.

### Performance Considerations

1. **Memory Allocation**: 8GB memory allocation might be excessive for a static site. Monitor usage and adjust if needed.

2. **Build Optimization**: Consider implementing build caching and optimization strategies for faster deployments.

### Development Workflow

1. **TypeScript Strictness**: While strict mode is enabled, consider adding explicit return types for all functions.

2. **Documentation**: Add JSDoc comments for key functions and components.

## Application Architecture

### Core Application Structure

The application follows Next.js 14's App Router pattern with a modern React architecture:

#### Layout System

- **Root Layout** (`layout.tsx`):
  - Provides the base HTML structure
  - Implements global providers:
    - WizardProvider for step management
    - TranslationProvider for i18n
  - Sets up global metadata for SEO
  - Includes global UI components (Header, Footer)
  - Implements analytics tracking
  - Provides global styling context

#### Page Structure

- **Home Page** (`page.tsx`):
  - Client-side rendered ("use client" directive)
  - Implements a wizard-based interface
  - Features multiple interactive sections:
    - Hero section
    - Features showcase
    - Categories showcase
    - Badge system explanation
    - Call-to-action section
  - Uses advanced animations with Framer Motion
  - Implements responsive design patterns

### Styling Architecture

The application implements a sophisticated styling system:

#### Global Styles (`globals.css`)

1. **Base Layer**:

   - Custom font configuration with system fonts
   - Typography scale and hierarchy
   - Base element styling
   - Font smoothing optimizations

2. **Component Layer**:

   - Reusable utility classes
   - Common component patterns
   - Container configurations
   - Card and button styles
   - Glass-morphism effects

3. **Animation System**:
   - Custom keyframe animations
   - Gradient text animations
   - Shimmer effects
   - Hover and interaction states

#### Design System

- **Color System**:

  - Primary palette with 10 shade levels
  - Surface colors for dark theme
  - Text hierarchy with primary/secondary/muted variants
  - Accent colors for highlights

- **Typography**:

  - Responsive text scaling
  - Hierarchical heading system
  - Optimized line heights and tracking
  - Font family fallbacks

- **Spacing and Layout**:
  - Container system with max-width constraints
  - Responsive padding and margin scales
  - Grid-based layout system
  - Flexbox utility patterns

### UI/UX Features

1. **Interactive Elements**:

   - Animated buttons and cards
   - Hover effects with transform and shadow
   - Loading states with shimmer effects
   - Smooth transitions between states

2. **Responsive Design**:

   - Mobile-first approach
   - Breakpoint-based adaptations
   - Flexible grid systems
   - Dynamic spacing adjustments

3. **Visual Effects**:
   - Backdrop blur effects
   - Gradient overlays
   - Shadow systems
   - Border treatments

### State Management

The application uses a combination of state management approaches:

1. **Context Providers**:

   - WizardContext for step management
   - TranslationContext for internationalization
   - Potential for additional contexts as needed

2. **Local State**:
   - React useState for component-level state
   - useEffect for side effects and lifecycle management
   - Custom hooks for reusable state logic

### Performance Optimizations

1. **Image Optimization**:

   - Next.js Image component usage
   - Responsive image sizing
   - Lazy loading implementation

2. **Component Architecture**:
   - Code splitting at the page level
   - Dynamic imports for heavy components
   - Optimized re-rendering with proper state management

## Feature Architecture

### Wizard System

The wizard system is implemented using React Context and manages the application's step-by-step flow:

#### Core Components

1. **WizardContext**:

   - Manages global wizard state
   - Tracks current step
   - Handles category selection
   - Manages questionnaire mode and answers
   - Provides category-specific state (sounds, visual, text)

2. **Step Components**:

   - Introduction
   - Category Selection (Manual/Guided)
   - Category-specific steps (Sounds, Visual, Text)
   - Questionnaire variants for each category
   - Result display

3. **State Management**:
   ```typescript
   {
     step: number;
     selectedCategories: {
       sounds: boolean;
       visual: boolean;
       text: boolean;
     }
     soundsCategory: Category;
     visualCategory: Category;
     textCategory: Category;
     isQuestionnaireMode: boolean;
     questionnaireAnswers: Record<string, number>;
   }
   ```

### Translation System

The application implements a robust internationalization system:

1. **TranslationContext**:

   - Provides language switching capabilities
   - Default language: French
   - Supported languages: English, French
   - Translation key management

2. **Translation Usage**:

   ```typescript
   const { t, language, setLanguage } = useTranslation();
   // Access translations: t("keyName")
   ```

3. **Translation Structure**:
   - Organized by feature sections
   - Includes UI elements, questions, and content
   - Supports dynamic content interpolation

### Analytics System

The application implements a privacy-focused analytics system using Firebase:

1. **Core Features**:

   - Anonymous page view tracking
   - Device and browser analytics
   - Language preferences
   - Performance metrics
   - Platform interaction tracking
   - Milestone tracking

2. **Data Collection**:

   - No personal information
   - No cookies
   - GDPR compliant
   - Transparent data collection

3. **Analytics Components**:
   ```typescript
   - AnalyticsTracker: Automatic view counting
   - Enhanced Analytics: Milestone and achievement tracking
   - Comparative Analysis: Weekly/monthly statistics
   ```

### Firebase Integration

The application uses Firebase Realtime Database for data management:

1. **Database Structure**:

   ```typescript
   {
     pageViews: {
       total: number,
       daily: Record<date, number>
     },
     analytics: {
       devices: Record<deviceType, number>,
       browsers: Record<browserName, number>,
       languages: Record<languageCode, number>,
       hours: Record<hour, number>,
       performance: {
         avg_load_time: number
       }
     },
     milestones: {
       records: {
         daily: { date: string, count: number },
         hourly: { datetime: string, count: number }
       },
       achievements: Record<milestone, {
         date: string,
         type: string,
         value: number
       }>
     }
   }
   ```

2. **Security Rules**:

   - Public read access
   - Validated write access
   - Data integrity checks
   - Rate limiting considerations

3. **Integration Points**:
   - Analytics tracking
   - User interaction recording
   - Achievement management
   - Performance monitoring

### Stripe Integration

The application integrates Stripe for donation processing:

1. **Setup**:

   - Client-side Stripe.js loading
   - Server-side Stripe API integration
   - Secure payment processing

2. **Components**:

   - DonationButton component
   - Payment modal
   - Success/failure handling

3. **Security**:
   - Client-side public key usage
   - Server-side secret key protection
   - Secure payment flow

### Testing Strategy

The application currently lacks a formal testing strategy. Recommended implementations:

1. **Unit Tests**:

   - Component testing with React Testing Library
   - Context logic testing
   - Utility function testing

2. **Integration Tests**:

   - Wizard flow testing
   - Firebase integration testing
   - Analytics tracking verification

3. **E2E Tests**:
   - User journey testing
   - Cross-browser compatibility
   - Mobile responsiveness

### CI/CD Pipeline

The application uses Vercel for continuous deployment:

1. **Deployment Flow**:

   - Automatic deployments from main branch
   - Preview deployments for pull requests
   - Environment variable management

2. **Build Process**:

   - Next.js production build
   - TypeScript compilation
   - Asset optimization
   - Memory allocation: 8GB

3. **Quality Checks**:
   - ESLint validation
   - TypeScript type checking
   - Build verification
