# Story 6.3: Form Submission with Feedback

Status: ready-for-dev

## Story

As a **user submitting a booking inquiry**,
I want **clear confirmation that my message was sent**,
So that **I know my inquiry was received**.

## Acceptance Criteria

1. **AC1: Web3Forms Submission**
   - [ ] Form submits to Web3Forms API using `VITE_WEB3FORMS_KEY` environment variable
   - [ ] Submit includes all form fields: name, email, subject, message
   - [ ] Access key is appended programmatically, not in a visible field
   - [ ] Submission uses POST to `https://api.web3forms.com/submit`

2. **AC2: Submit Button Loading State**
   - [ ] Button shows loading state during submission (disabled + visual indicator)
   - [ ] Button text changes or spinner appears while submitting
   - [ ] User cannot submit multiple times while request is in progress
   - [ ] Loading state applies immediately on form submit

3. **AC3: Success Feedback**
   - [ ] Toast notification displays on successful submission
   - [ ] Toast message in Norwegian: "Melding sendt!"
   - [ ] Toast is styled consistently with dark theme (success green)
   - [ ] Toast persists for 5 seconds before auto-dismissing
   - [ ] Form fields are cleared after successful submission
   - [ ] All validation state resets (touched, errors)

4. **AC4: Error Feedback**
   - [ ] Toast notification displays if submission fails
   - [ ] Toast message in Norwegian: "Noe gikk galt. Prøv igjen."
   - [ ] Toast is styled with error color (red)
   - [ ] Form data is preserved on error (user can retry without re-entering)
   - [ ] User can retry submission after error

5. **AC5: Performance Requirement (NFR16)**
   - [ ] Submission completes within 2 seconds under normal conditions
   - [ ] No blocking of page interaction during submission
   - [ ] Graceful handling if Web3Forms takes longer than expected

## Tasks / Subtasks

- [ ] **Task 1: Install shadcn/ui Toast Component** (AC: #3, #4)
  - [ ] Run `npx shadcn@latest add toast` to install Toast component
  - [ ] Install Toaster provider component
  - [ ] Add Toaster to app root (App.tsx or main.tsx layout)
  - [ ] Verify toast components in `src/components/ui/toast.tsx` and `src/components/ui/toaster.tsx`

- [ ] **Task 2: Add Loading State to Submit Button** (AC: #2)
  - [ ] Add `isSubmitting` state: `const [isSubmitting, setIsSubmitting] = useState(false)`
  - [ ] Set `isSubmitting = true` at start of onSubmit handler
  - [ ] Set `isSubmitting = false` in finally block (success or error)
  - [ ] Update Button to show loading: `disabled={!isFormValid || isSubmitting}`
  - [ ] Add visual loading indicator (text change or spinner icon)

- [ ] **Task 3: Replace sweetalert2 with Toast for Success** (AC: #3)
  - [ ] Import `useToast` hook from `@/components/ui/use-toast`
  - [ ] Remove sweetalert2 (Swal) import and usage
  - [ ] On success, call `toast({ title: "Melding sendt!", variant: "default" })`
  - [ ] Configure toast duration to 5000ms
  - [ ] Clear all form fields on success (name, email, subject, message)
  - [ ] Reset touched and errors state on success

- [ ] **Task 4: Add Error Toast Handling** (AC: #4)
  - [ ] Add try-catch around fetch call
  - [ ] On catch or non-success response, call `toast({ title: "Noe gikk galt. Prøv igjen.", variant: "destructive" })`
  - [ ] Preserve form data on error (do NOT reset form)
  - [ ] Log error to console for debugging

- [ ] **Task 5: Style Toast for Dark Theme** (AC: #3, #4)
  - [ ] Verify toast uses CSS variables (--color-bg, --color-surface, --color-text)
  - [ ] Success toast uses green color (#22C55E per UX spec)
  - [ ] Error toast uses red color (#EF4444 per UX spec)
  - [ ] Toast is visible against dark background

- [ ] **Task 6: Build and Test** (AC: All)
  - [ ] Run `npm run build` - ensure no TypeScript errors
  - [ ] Test successful submission - toast appears, form clears
  - [ ] Test error scenario (disconnect network or invalid key) - error toast, form preserved
  - [ ] Test loading state - button disabled during submission
  - [ ] Test multiple rapid submissions blocked
  - [ ] Verify submission completes within 2 seconds (NFR16)

## Dev Notes

### Dependencies on Previous Stories

**Story 6.1 (Contact Form with shadcn/ui):**
- Form uses shadcn/ui Input, Textarea, Label, Select, Button components
- Subject field uses controlled state: `const [subject, setSubject] = useState("")`
- Web3Forms integration exists via `import.meta.env.VITE_WEB3FORMS_KEY`
- Currently uses sweetalert2 (Swal) for success notification - **REPLACE with Toast**

**Story 6.2 (Form Validation):**
- Validation state: `const [touched, setTouched] = useState<TouchedFields>({})`
- Error state: `const [errors, setErrors] = useState<FormErrors>({})`
- Form validity: `const isFormValid = ...` (computed from field values)
- All fields may be controlled with useState (name, email, subject, message)

### Current ContactForm.tsx Structure

The current form has:
```typescript
import Swal from "sweetalert2";  // REMOVE THIS
const [subject, setSubject] = useState("");
const [, setResult] = useState("");  // Can be removed

const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setResult("Sending....");
  const formData = new FormData(event.currentTarget);
  formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);
  formData.append("subject", subject);

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (data.success) {
    Swal.fire({ title: "Takk!", text: "Meldingen er sendt!", icon: "success" });
    (event.target as HTMLFormElement).reset();
    setSubject("");
  }
};
```

### shadcn/ui Toast Implementation Pattern

**App-level Toaster Setup (in App.tsx or main layout):**
```typescript
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <>
      {/* ... existing app content ... */}
      <Toaster />
    </>
  )
}
```

**Component-level Toast Usage:**
```typescript
import { useToast } from "@/components/ui/use-toast"

function ContactForm() {
  const { toast } = useToast()

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      // ... fetch to Web3Forms ...

      if (data.success) {
        toast({
          title: "Melding sendt!",
          duration: 5000,
        })
        // Reset form
      } else {
        toast({
          title: "Noe gikk galt. Prøv igjen.",
          variant: "destructive",
          duration: 5000,
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast({
        title: "Noe gikk galt. Prøv igjen.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }
}
```

### Loading Button Pattern

```tsx
<Button
  type="submit"
  disabled={!isFormValid || isSubmitting}
  className="w-full min-h-[44px] bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white font-semibold rounded-2xl disabled:opacity-50"
>
  {isSubmitting ? "Sender..." : "Send melding"}
</Button>
```

Alternative with spinner icon:
```tsx
import { Loader2 } from "lucide-react"

<Button type="submit" disabled={!isFormValid || isSubmitting}>
  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {isSubmitting ? "Sender..." : "Send melding"}
</Button>
```

### Form Reset Pattern

After Story 6.2's controlled inputs, form reset must clear all controlled state:

```typescript
const resetForm = () => {
  // Clear form data
  setName('')
  setEmail('')
  setSubject('')
  setMessage('')
  // Clear validation state
  setTouched({})
  setErrors({})
}
```

If using uncontrolled inputs for name/email/message with FormData, also call:
```typescript
(event.target as HTMLFormElement).reset()
```

### Toast Styling for Dark Theme

Toast component should inherit from CSS variables. If not working correctly, customize in toast.tsx:

```typescript
// In toast.tsx variants
const toastVariants = cva(
  "... bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-border)] ...",
  {
    variants: {
      variant: {
        default: "...",
        destructive: "bg-red-900 border-red-800 text-white",
      }
    }
  }
)
```

### Error Handling Best Practices

```typescript
try {
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });

  // Check if response is ok (status 200-299)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.success) {
    // Success path
  } else {
    // API returned success: false
    throw new Error(data.message || "Submission failed");
  }
} catch (error) {
  // Network error or any thrown error
  console.error("Form submission error:", error);
  // Show error toast, preserve form data
}
```

### Removing sweetalert2

After switching to toast, sweetalert2 can be uninstalled if not used elsewhere:
```bash
npm uninstall sweetalert2
```

Or simply remove the import and usage from ContactForm.tsx if other components still use it.

### CSS Variables Reference

From UX Design Specification:
```css
/* Success/Error Colors */
--color-success: #22C55E;  /* Success toast */
--color-error: #EF4444;    /* Error toast (destructive) */

/* Theme Colors */
--color-bg: #0b0c0d;
--color-surface: #111214;
--color-text: #e7e7ea;
--color-accent: #ff6100;
--color-border: #26282b;
```

### Project Structure Notes

**Files to Modify:**
- `src/components/ContactForm.tsx` - Main changes
- `src/App.tsx` (or layout file) - Add Toaster provider

**Files Created by CLI:**
- `src/components/ui/toast.tsx` - Toast component
- `src/components/ui/toaster.tsx` - Toaster provider
- `src/components/ui/use-toast.ts` - Toast hook

**Package Changes:**
- Remove `sweetalert2` (if not used elsewhere)
- Toast components from shadcn/ui use existing Radix dependencies

### Testing Checklist

**Manual Testing:**
1. Fill valid form, submit → toast "Melding sendt!" appears, form clears
2. Submit with network disconnected → error toast, form data preserved
3. Submit with invalid API key → error toast, form data preserved
4. Double-click submit button → only one submission occurs
5. Check toast dismisses after 5 seconds
6. Verify toast is visible on dark background

**Build Verification:**
- `npm run build` passes without errors
- No console errors during normal operation

### References

- [Source: docs/epics.md#Story-6.3] - Acceptance criteria and requirements
- [Source: docs/prd.md#FR22-FR23] - Web3Forms and confirmation requirements
- [Source: docs/ux-design-specification.md#Feedback-Patterns] - Toast notification patterns
- [Source: docs/ux-design-specification.md#Color-System] - Success/Error semantic colors
- [Source: docs/architecture.md#Form-Security] - Web3Forms integration pattern
- [Source: docs/sprint-artifacts/6-1-contact-form-with-shadcn-ui-components.md] - Previous story context
- [Source: docs/sprint-artifacts/6-2-form-validation-and-error-handling.md] - Validation context

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

**Files to Modify:**
- `src/components/ContactForm.tsx`
- `src/App.tsx` (add Toaster)

**Files to Create (via CLI):**
- `src/components/ui/toast.tsx`
- `src/components/ui/toaster.tsx`
- `src/components/ui/use-toast.ts`

**Packages to Potentially Remove:**
- `sweetalert2` (if not used elsewhere in project)

---

## Implementation Notes for Developer Agent

### Critical Implementation Details

1. **Keep Web3Forms Integration**: The fetch to Web3Forms must remain exactly as-is. Only change the feedback mechanism.

2. **Controlled vs Uncontrolled**: Story 6.2 may have converted to controlled inputs. Check current state:
   - If controlled: Reset all useState values on success
   - If uncontrolled: Call `form.reset()` plus reset subject state

3. **Toast Provider Location**: Toaster must be at app root level to work across components. Check if App.tsx has a layout wrapper or if Toaster should go in main.tsx.

4. **Preserve Error Form Data**: On error, do NOT reset any form state. User should be able to retry without re-entering data.

5. **Loading State Guards**:
   - Disable button when `isSubmitting = true`
   - Also disable if form is invalid (from Story 6.2)
   - Combined: `disabled={!isFormValid || isSubmitting}`

### Potential Gotchas

- shadcn Toast may require additional Radix dependencies - check if auto-installed
- Toast variant "destructive" is the error style in shadcn
- The `useToast` hook must be used inside a component that's wrapped by Toaster
- If lucide-react icons not installed, use text "Sender..." instead of spinner
- Check if sweetalert2 is used in other files before uninstalling

### Expected Output

A contact form that:
- Shows loading state during submission
- Displays Norwegian toast on success ("Melding sendt!")
- Displays Norwegian toast on error ("Noe gikk galt. Prøv igjen.")
- Clears form after success
- Preserves form data after error
- Completes submission within 2 seconds (NFR16)
- Uses consistent dark theme styling for toasts
