# Story 6.2: Form Validation and Error Handling

Status: Ready for Review

## Story

As a **user filling out the contact form**,
I want **clear validation feedback**,
So that **I know what needs to be corrected before submitting**.

## Acceptance Criteria

1. **AC1: Inline Validation on Blur**
   - [x] Validation triggers when user leaves a field (onBlur event)
   - [x] Name field validates: not empty
   - [x] Email field validates: not empty AND valid email format
   - [x] Subject field validates: selection made (not default placeholder)
   - [x] Message field validates: not empty
   - [x] Validation does NOT trigger on initial page load

2. **AC2: Norwegian Error Messages**
   - [x] Required field empty: "Dette feltet er påkrevd"
   - [x] Invalid email format: "Ugyldig e-postadresse"
   - [x] Error messages are in Norwegian to match site language
   - [x] Error messages are clear and actionable

3. **AC3: Visual Error States**
   - [x] Error messages appear directly below the invalid field
   - [x] Error text is red/destructive color (#EF4444 per UX spec)
   - [x] Invalid fields have red/orange border highlight
   - [x] Error state is visually distinct from focus state (orange)
   - [x] Border changes from normal to error state color

4. **AC4: Submit Button State**
   - [x] Submit button is disabled when form has validation errors
   - [x] Submit button is disabled when required fields are empty
   - [x] Submit button enables only when ALL fields are valid
   - [x] Disabled button has reduced opacity (0.5) visual indicator

5. **AC5: Screen Reader Accessibility**
   - [x] Error messages are announced to screen readers
   - [x] Use aria-invalid="true" on invalid fields
   - [x] Use aria-describedby to link error message to input
   - [x] Error messages have role="alert" or aria-live="polite"
   - [x] Focus moves to first invalid field on submit attempt (if any)

## Tasks / Subtasks

- [x] **Task 1: Create Form Validation State Management** (AC: #1, #4)
  - [x] Add useState for tracking touched fields: `const [touched, setTouched] = useState<Record<string, boolean>>({})`
  - [x] Add useState for tracking error messages: `const [errors, setErrors] = useState<Record<string, string>>({})`
  - [x] Add useState for tracking form validity: `const [isFormValid, setIsFormValid] = useState(false)`
  - [x] Create validation function for each field type

- [x] **Task 2: Implement Field Validation Functions** (AC: #1, #2)
  - [x] Create `validateName(value: string)` function - returns error message or empty string
  - [x] Create `validateEmail(value: string)` function - regex validation for email format
  - [x] Create `validateSubject(value: string)` function - checks if selection made
  - [x] Create `validateMessage(value: string)` function - returns error message or empty string
  - [x] Create `validateForm()` function - validates all fields and returns overall validity

- [x] **Task 3: Add onBlur Event Handlers** (AC: #1)
  - [x] Add handleBlur function that marks field as touched and validates
  - [x] Connect onBlur to Name Input component
  - [x] Connect onBlur to Email Input component
  - [x] Connect onBlur to Message Textarea component
  - [x] Handle Select component blur (may need onOpenChange or similar)

- [x] **Task 4: Create Error Display Component** (AC: #2, #3, #5)
  - [x] Create inline error message display pattern
  - [x] Apply red text styling (text-red-500 or var(--color-error))
  - [x] Position error message directly below input field
  - [x] Add unique id for each error message for aria-describedby

- [x] **Task 5: Style Invalid Field States** (AC: #3)
  - [x] Add conditional border class for invalid state (border-red-500)
  - [x] Ensure error border is distinct from focus state (orange)
  - [x] Apply error styling only to touched + invalid fields
  - [x] Test visual distinction between error/focus/normal states

- [x] **Task 6: Implement Submit Button Logic** (AC: #4)
  - [x] Add disabled prop to Button based on form validity
  - [x] Run validateForm() whenever any field changes
  - [x] Update isFormValid state after each validation
  - [x] Apply disabled:opacity-50 class when disabled

- [x] **Task 7: Add Accessibility Attributes** (AC: #5)
  - [x] Add aria-invalid="true" to invalid fields
  - [x] Add aria-describedby pointing to error message id
  - [x] Add aria-live="polite" to error message container
  - [x] Test with keyboard navigation
  - [x] Test error announcement with screen reader (if available)

- [x] **Task 8: Build and Test** (AC: All)
  - [x] Run `npm run build` - ensure no TypeScript errors
  - [x] Test validation triggers on blur, not on load
  - [x] Test all error messages display correctly
  - [x] Test submit button enables/disables appropriately
  - [x] Test keyboard-only form completion
  - [x] Verify error states visually distinct

## Dev Notes

### Relevant Architecture Patterns and Constraints

**Dependencies on Story 6.1:**
- This story assumes ContactForm.tsx has been refactored to use shadcn/ui components
- Input, Textarea, Label, Select components should be in place
- Form should already have controlled state for the Subject select
- Dark theme styling should already be applied

**From Previous Story (6-1) Context:**
- Form uses uncontrolled inputs for Name, Email, Message (with FormData)
- Subject uses controlled state: `const [subject, setSubject] = useState("")`
- Web3Forms integration handled via onSubmit handler
- sweetalert2 (Swal) used for success notifications

**CSS Variables for Error States:**
```css
/* Per UX Design Specification */
--color-error: #EF4444;  /* Semantic: Error/destructive */
--color-accent: #ff6100;  /* Focus states */
```

### Source Tree Components to Touch

**Files to Modify:**
- `src/components/ContactForm.tsx` - Add validation logic

**No New Files Required:**
- Validation logic is internal to ContactForm.tsx
- No separate validation library needed for this simple form

### Email Validation Regex

Standard email validation pattern:
```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string): string {
  if (!email.trim()) return "Dette feltet er påkrevd";
  if (!emailRegex.test(email)) return "Ugyldig e-postadresse";
  return "";
}
```

### Validation State Pattern

Recommended pattern for tracking validation:

```typescript
interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface TouchedFields {
  name?: boolean;
  email?: boolean;
  subject?: boolean;
  message?: boolean;
}

const [errors, setErrors] = useState<FormErrors>({});
const [touched, setTouched] = useState<TouchedFields>({});

// Only show error if field has been touched AND has error
const showError = (field: keyof FormErrors) => touched[field] && errors[field];
```

### Error Message Display Pattern

```tsx
<div className="space-y-2">
  <Label htmlFor="name">Navn</Label>
  <Input
    id="name"
    name="name"
    onBlur={() => handleBlur('name')}
    aria-invalid={!!errors.name && touched.name}
    aria-describedby={errors.name && touched.name ? "name-error" : undefined}
    className={cn(
      "...",
      errors.name && touched.name && "border-red-500 focus-visible:ring-red-500"
    )}
  />
  {errors.name && touched.name && (
    <p id="name-error" className="text-sm text-red-500" role="alert">
      {errors.name}
    </p>
  )}
</div>
```

### Norwegian Error Messages

| Field | Validation | Error Message (Norwegian) |
|-------|------------|---------------------------|
| Name | Required | "Dette feltet er påkrevd" |
| Email | Required | "Dette feltet er påkrevd" |
| Email | Format | "Ugyldig e-postadresse" |
| Subject | Required | "Velg et emne" |
| Message | Required | "Dette feltet er påkrevd" |

### Form Validity Calculation

```typescript
const isFormValid = useMemo(() => {
  const nameValid = name.trim().length > 0;
  const emailValid = emailRegex.test(email.trim());
  const subjectValid = subject.length > 0;
  const messageValid = message.trim().length > 0;

  return nameValid && emailValid && subjectValid && messageValid;
}, [name, email, subject, message]);
```

**Note:** This requires converting Name, Email, Message to controlled inputs with useState.

### Controlled vs Uncontrolled Decision

Story 6.1 uses uncontrolled inputs with FormData. For validation to work properly, recommend converting to fully controlled form:

```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const handleChange = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
  // Re-validate field
  validateField(field, value);
};
```

This is a BREAKING CHANGE from 6.1's uncontrolled pattern, but necessary for real-time validation.

### Testing Standards Summary

**Per UX Design Specification:**
- WCAG AA compliance required
- Screen reader support with ARIA attributes
- Keyboard navigation must work
- Error states must be visually distinct from focus states

**Build Verification:**
- `npm run build` must pass without errors
- TypeScript strict mode compliance
- No console errors during validation

### Project Structure Notes

**Alignment with Unified Project Structure:**
- All changes contained within `src/components/ContactForm.tsx`
- No new utility files needed
- Validation logic is form-specific, not reusable across project

**Dependencies Required:**
- None additional - standard React useState, useMemo
- cn() utility from `@/lib/utils` for conditional classes (already imported)

### References

- [Source: docs/epics.md#Story-6.2] - Full acceptance criteria
- [Source: docs/ux-design-specification.md#Form-Patterns] - Validation patterns
- [Source: docs/ux-design-specification.md#Feedback-Patterns] - Error state styling
- [Source: docs/ux-design-specification.md#Accessibility-Strategy] - WCAG requirements
- [Source: docs/sprint-artifacts/6-1-contact-form-with-shadcn-ui-components.md] - Previous story context

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Build passed successfully with no TypeScript errors
- No VS Code diagnostics on ContactForm.tsx

### Completion Notes List

- ✅ Converted form from uncontrolled to fully controlled inputs for real-time validation
- ✅ Implemented validation functions for all fields (name, email, subject, message)
- ✅ Added touched state tracking to prevent errors showing on initial load
- ✅ Implemented onBlur handlers for all input types including Select via onOpenChange
- ✅ Added inline error messages with red text (text-red-500)
- ✅ Applied conditional error border classes (border-red-500, focus-visible:ring-red-500)
- ✅ Submit button disabled until isFormValid is true via useMemo calculation
- ✅ Added disabled:opacity-50 and disabled:cursor-not-allowed classes
- ✅ Full accessibility: aria-invalid, aria-describedby, role="alert", aria-live="polite"
- ✅ Focus moves to first invalid field on submit attempt
- ✅ Norwegian error messages: "Dette feltet er påkrevd", "Ugyldig e-postadresse", "Velg et emne"
- ✅ Preserved Web3Forms submission functionality
- ✅ Form resets all state (values, touched, errors) on successful submission
- ✅ Build passes with no TypeScript errors

### Change Log

- 2025-12-12: Implemented Story 6.2 - Form Validation and Error Handling
  - Converted to fully controlled form with useState for name, email, message
  - Added validation state management (touched, errors)
  - Implemented all validation functions with Norwegian error messages
  - Added accessibility attributes for screen reader support
  - Styled error states with red border distinct from orange focus
  - Disabled submit button until form is valid

### File List

**Files Modified:**
- `src/components/ContactForm.tsx` - Complete refactor with validation logic

---

## Implementation Notes for Developer Agent

### Critical Implementation Details

1. **Convert to Controlled Form**: The form needs controlled inputs for real-time validation. This changes the form pattern from 6.1:
   ```typescript
   // Before (6.1 uncontrolled)
   const formData = new FormData(event.currentTarget);

   // After (controlled)
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   // ... etc
   formData.append('name', name);
   formData.append('email', email);
   ```

2. **Preserve Web3Forms Submission**: The onSubmit handler must still work with Web3Forms:
   ```typescript
   const formData = new FormData();
   formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);
   formData.append("name", name);
   formData.append("email", email);
   formData.append("subject", subject);
   formData.append("message", message);
   ```

3. **Error Border vs Focus Border**: These must be visually distinct:
   - Focus: `ring-[var(--color-accent)]` (orange)
   - Error: `border-red-500` (red)
   - Both can appear together (focused + invalid)

4. **Select Validation**: shadcn Select doesn't have native onBlur. Handle validation via `onOpenChange` when select closes:
   ```typescript
   <Select
     value={subject}
     onValueChange={setSubject}
     onOpenChange={(open) => !open && handleBlur('subject')}
   >
   ```

5. **Reset Form After Submit**: Clear all controlled state on successful submission:
   ```typescript
   setName('');
   setEmail('');
   setSubject('');
   setMessage('');
   setTouched({});
   setErrors({});
   ```

### Potential Gotchas

- Initial render should NOT show errors (check touched state before showing)
- Select component blur behavior differs from native inputs
- Form validity check must run on every field change
- aria-describedby should only reference existing error elements
- Red error color must contrast against dark background (verify WCAG AA)

### Expected Output

A contact form that:
- Validates on blur (not on load)
- Shows Norwegian error messages below invalid fields
- Has red error states distinct from orange focus states
- Disables submit until all fields valid
- Is fully accessible with screen readers
- Preserves existing Web3Forms submission functionality
