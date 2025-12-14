import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/* KILDE: How to Make Working Contact Form in React JS https://www.youtube.com/watch?v=94_6JPDi13g */

// Validation types
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

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation functions (Task 2)
const validateName = (value: string): string => {
  if (!value.trim()) return "Dette feltet er påkrevd";
  return "";
};

const validateEmail = (value: string): string => {
  if (!value.trim()) return "Dette feltet er påkrevd";
  if (!emailRegex.test(value)) return "Ugyldig e-postadresse";
  return "";
};

const validateSubject = (value: string): string => {
  if (!value) return "Velg et emne";
  return "";
};

const validateMessage = (value: string): string => {
  if (!value.trim()) return "Dette feltet er påkrevd";
  return "";
};

const Contact = () => {
  const { toast } = useToast();

  // Controlled form state (converted from uncontrolled for validation)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Validation state (Task 1)
  const [touched, setTouched] = useState<TouchedFields>({});
  const [errors, setErrors] = useState<FormErrors>({});

  // Loading state (Story 6.3 Task 2)
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate all fields and update errors state
  const validateField = (field: keyof FormErrors, value: string) => {
    let error = "";
    switch (field) {
      case "name":
        error = validateName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "subject":
        error = validateSubject(value);
        break;
      case "message":
        error = validateMessage(value);
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  // Handle blur event (Task 3)
  const handleBlur = (field: keyof TouchedFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value =
      field === "name"
        ? name
        : field === "email"
          ? email
          : field === "subject"
            ? subject
            : message;
    validateField(field, value);
  };

  // Form validity calculation (Task 6)
  const isFormValid = useMemo(() => {
    const nameValid = name.trim().length > 0;
    const emailValid = emailRegex.test(email.trim());
    const subjectValid = subject.length > 0;
    const messageValid = message.trim().length > 0;

    return nameValid && emailValid && subjectValid && messageValid;
  }, [name, email, subject, message]);

  // Helper to check if error should be shown
  const showError = (field: keyof FormErrors) =>
    touched[field] && errors[field];

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Mark all fields as touched on submit attempt
    const allTouched: TouchedFields = {
      name: true,
      email: true,
      subject: true,
      message: true,
    };
    setTouched(allTouched);

    // Validate all fields
    const nameError = validateField("name", name);
    const emailError = validateField("email", email);
    const subjectError = validateField("subject", subject);
    const messageError = validateField("message", message);

    // If any errors, focus first invalid field (AC5)
    if (nameError || emailError || subjectError || messageError) {
      if (nameError) {
        document.getElementById("name")?.focus();
      } else if (emailError) {
        document.getElementById("email")?.focus();
      } else if (subjectError) {
        document.getElementById("subject")?.focus();
      } else if (messageError) {
        document.getElementById("message")?.focus();
      }
      return;
    }

    // Set loading state immediately (AC2)
    setIsSubmitting(true);

    try {
      // Build FormData for Web3Forms submission
      const formData = new FormData();
      formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("subject", subject);
      formData.append("message", message);

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
        // Success toast (AC3)
        toast({
          title: "Melding sendt!",
          duration: 5000,
          variant: "success",
        });
        // Reset all form state on success
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setTouched({});
        setErrors({});
      } else {
        // API returned success: false
        throw new Error(data.message || "Submission failed");
      }
    } catch (error) {
      // Error toast (AC4) - form data preserved
      console.error("Form submission error:", error);
      toast({
        title: "Noe gikk galt. Prøv igjen.",
        duration: 5000,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Base input styling for dark theme
  const baseInputClasses =
    "bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus-visible:ring-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-offset-0 rounded-none min-h-[44px]";

  // Error border styling (Task 5)
  const errorBorderClasses = "border-red-500 focus-visible:ring-red-500";

  return (
    <section className="max-w-md w-full mx-auto p-6 rounded-none shadow-md card-surface">
      <form onSubmit={onSubmit} className="space-y-4">
        <h2 className="text-center text-3xl font-bold mb-2 text-white">
          Kontakt Oss
        </h2>

        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white text-sm font-semibold">
            Navn
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Ditt navn"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (touched.name) validateField("name", e.target.value);
            }}
            onBlur={() => handleBlur("name")}
            aria-required="true"
            aria-invalid={showError("name") ? "true" : undefined}
            aria-describedby={showError("name") ? "name-error" : undefined}
            className={cn(
              baseInputClasses,
              showError("name") && errorBorderClasses
            )}
          />
          {showError("name") && (
            <p
              id="name-error"
              className="text-sm text-red-500"
              role="alert"
              aria-live="polite"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white text-sm font-semibold">
            Epost
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Din epost"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched.email) validateField("email", e.target.value);
            }}
            onBlur={() => handleBlur("email")}
            aria-required="true"
            aria-invalid={showError("email") ? "true" : undefined}
            aria-describedby={showError("email") ? "email-error" : undefined}
            className={cn(
              baseInputClasses,
              showError("email") && errorBorderClasses
            )}
          />
          {showError("email") && (
            <p
              id="email-error"
              className="text-sm text-red-500"
              role="alert"
              aria-live="polite"
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-white text-sm font-semibold">
            Emne
          </Label>
          <Select
            value={subject}
            onValueChange={(value) => {
              setSubject(value);
              if (touched.subject) validateField("subject", value);
            }}
            onOpenChange={(open) => {
              if (!open) handleBlur("subject");
            }}
          >
            <SelectTrigger
              id="subject"
              aria-required="true"
              aria-invalid={showError("subject") ? "true" : undefined}
              aria-describedby={
                showError("subject") ? "subject-error" : undefined
              }
              className={cn(
                baseInputClasses,
                "w-full",
                showError("subject") && errorBorderClasses
              )}
            >
              <SelectValue placeholder="Velg emne" />
            </SelectTrigger>
            <SelectContent className="bg-[var(--color-surface)] border-[var(--color-border)]">
              <SelectItem
                value="booking"
                className="text-[var(--color-text)] focus:bg-[var(--color-accent)] focus:text-white cursor-pointer"
              >
                Booking
              </SelectItem>
              <SelectItem
                value="presse"
                className="text-[var(--color-text)] focus:bg-[var(--color-accent)] focus:text-white cursor-pointer"
              >
                Presse
              </SelectItem>
              <SelectItem
                value="generelt"
                className="text-[var(--color-text)] focus:bg-[var(--color-accent)] focus:text-white cursor-pointer"
              >
                Generelt
              </SelectItem>
            </SelectContent>
          </Select>
          {showError("subject") && (
            <p
              id="subject-error"
              className="text-sm text-red-500"
              role="alert"
              aria-live="polite"
            >
              {errors.subject}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-white text-sm font-semibold">
            Skriv melding
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Skriv melding"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (touched.message) validateField("message", e.target.value);
            }}
            onBlur={() => handleBlur("message")}
            aria-required="true"
            aria-invalid={showError("message") ? "true" : undefined}
            aria-describedby={showError("message") ? "message-error" : undefined}
            className={cn(
              baseInputClasses,
              "min-h-[120px] resize-none",
              showError("message") && errorBorderClasses
            )}
          />
          {showError("message") && (
            <p
              id="message-error"
              className="text-sm text-red-500"
              role="alert"
              aria-live="polite"
            >
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button with loading state (Story 6.3 AC2) */}
        <Button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={cn(
            "w-full min-h-[44px] bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold rounded-none",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? "Sender..." : "Send melding"}
        </Button>
      </form>
    </section>
  );
};

export default Contact;
