# IA Indicator: Updated Project Scope

## Summary of Changes

We are enhancing the IA Indicator project to provide a more comprehensive and flexible evaluation system for AI use in creative processes. The main changes include:

1. **Expanded Categories**: Moving from two categories (Music and Text) to three categories:

   - Sounds (for music, podcasts, FX sounds, etc.)
   - Visual (for pictures, videos, images, etc.)
   - Text (for books, publications on social media, email, code, etc.)

2. **Flexible Selection**: Users can now choose any combination of these categories.

3. **Revised Scale**: Changing from a 1-5 scale to a 0-4 scale with new definitions:

   - 0: Human Only
   - 1: Human with AI Assistance
   - 2: AI Collaboration
   - 3: Directed AI
   - 4: AI Only

4. **Updated Badge Notation**:
   - S.AI.0 to S.AI.4 (for Sounds)
   - V.AI.0 to V.AI.4 (for Visual)
   - T.AI.0 to T.AI.4 (for Text)

## Implementation Plan

### 1. Type Definitions Updates

- Update the `Category` type to be `0 | 1 | 2 | 3 | 4 | null`
- Modify the `WizardContextType` interface:
  - Add `visualCategory` and `setVisualCategory`
  - Add `selectedCategories` and `setSelectedCategories` to track which categories the user has chosen
  - Update questionnaire-related fields for the new Visual category
- Create a new `ContentType` type: `'sounds' | 'visual' | 'text'`
- Add `SelectedCategories` interface: `{ sounds: boolean; visual: boolean; text: boolean }`

### 2. Context Provider Updates

- Update the `WizardProvider` to include the new state variables:
  - `visualCategory` and `setVisualCategory`
  - `selectedCategories` and `setSelectedCategories`
  - `visualQuestionnaireAnswers` and `setVisualQuestionnaireAnswers`

### 3. New/Updated Components

#### Steps

- Create new step: `CategorySelectionStep.tsx` - For selecting which content types to evaluate
- Update `MusicStep.tsx` to `SoundsStep.tsx`
- Create `VisualStep.tsx`
- Keep/Update `TextStep.tsx`
- Similar updates for questionnaire steps

#### UI Components

- Update `RadioGroup` and `CategoryOption` components to reflect the new scale (0-4)
- Modify the `ResultBadge` component to show badges for selected categories only
- Update the badge format to show codes like S.AI.2, V.AI.1, T.AI.3

### 4. Flow Updates

- Modify the wizard flow to accommodate the new category selection step
- Update navigation logic to skip steps for unselected categories
- Ensure the progress bar reflects the dynamic number of steps

### 5. Content Updates

- Create new category descriptions for the 0-4 scale
- Develop questions for the Visual category questionnaire
- Update Sounds (formerly Music) and Text categories to match the new scale

### 6. Badge Generation

- Update the badge generation logic to use the new format (S.AI.x, V.AI.x, T.AI.x)
- Ensure the badge only shows categories that were selected
- Create visual representations for the new badge format

### 7. Testing and Validation

- Test all possible combinations of category selections
- Verify the badge generation for each combination
- Ensure the UI adapts responsively to showing 1-3 badge sections

## Technical Considerations

### Data Migration

- No data migration is needed as we're not storing user data persistently yet

### Performance

- The wizard will now have a variable number of steps depending on user selections
- Badge generation becomes more complex with multiple categories

### Future Enhancements

- Allow saving and comparing multiple badge results
- Implement user accounts to track badge history
- Add API endpoints for badge verification

## Timeline Estimate

1. **Setup and Type Definitions**: 1 day
2. **Context and Component Updates**: 2-3 days
3. **New Step Components**: 2 days
4. **Badge Generation and UI**: 2 days
5. **Content Creation**: 1-2 days
6. **Testing and Refinement**: 2 days

**Total Estimated Time**: 10-12 days
