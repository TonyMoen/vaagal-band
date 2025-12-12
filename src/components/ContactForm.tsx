import React, { useState } from "react";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
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

/* KILDE: How to Make Working Contact Form in React JS https://www.youtube.com/watch?v=94_6JPDi13g */

const Contact = () => {
  const [, setResult] = useState("");
  const [subject, setSubject] = useState("");

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
      Swal.fire({
        title: "Takk!",
        text: "Meldingen er sendt!",
        icon: "success",
      });
      // Reset form fields
      (event.target as HTMLFormElement).reset();
      setSubject("");
    }
  };

  // Shared input styling for dark theme
  const inputClasses =
    "bg-[var(--color-bg)] border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus-visible:ring-[var(--color-accent)] focus-visible:ring-2 focus-visible:ring-offset-0 rounded-2xl min-h-[44px]";

  return (
    <section className="max-w-md w-full mx-auto p-6 rounded-2xl shadow-md card-surface">
      <form onSubmit={onSubmit} className="space-y-4">
        <h2 className="text-center text-3xl font-bold mb-2 text-white">
          Kontakt Oss
        </h2>

        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="text-white text-sm font-semibold"
          >
            Navn
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Ditt navn"
            required
            aria-required="true"
            className={inputClasses}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-white text-sm font-semibold"
          >
            Epost
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Din epost"
            required
            aria-required="true"
            className={inputClasses}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="subject"
            className="text-white text-sm font-semibold"
          >
            Emne
          </Label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger
              id="subject"
              aria-required="true"
              className={`${inputClasses} w-full`}
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
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="message"
            className="text-white text-sm font-semibold"
          >
            Skriv melding
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Skriv melding"
            required
            aria-required="true"
            className={`${inputClasses} min-h-[120px] resize-none`}
          />
        </div>

        <Button
          type="submit"
          className="w-full min-h-[44px] bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white font-semibold rounded-2xl"
        >
          Send melding
        </Button>
      </form>
    </section>
  );
};

export default Contact;
