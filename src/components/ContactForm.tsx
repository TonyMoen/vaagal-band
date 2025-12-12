import React from "react";
import Swal from "sweetalert2";

/* KILDE: How to Make Working Contact Form in React JS https://www.youtube.com/watch?v=94_6JPDi13g */

const Contact = () => {
  const [, setResult] = React.useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.currentTarget);

    formData.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);

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
    }
  };

  return (
    <section className="max-w-md w-full mx-auto p-6 rounded-2xl shadow-md card-surface">
      <form onSubmit={onSubmit} className="space-y-4">
        <h2 className="text-center text-3xl font-bold mb-2 text-white">
          Kontakt Oss
        </h2>

        <div>
          <label
            htmlFor="name"
            className="block text-white text-sm font-semibold mb-2"
          >
            Navn
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Ditt navn"
            required
            className="w-full px-4 py-3 min-h-[44px] rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-white text-sm font-semibold mb-2"
          >
            Epost
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Din epost"
            required
            className="w-full px-4 py-3 min-h-[44px] rounded-2xl bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-white text-sm font-semibold mb-2"
          >
            Skriv melding
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Skriv melding"
            required
            className="w-full px-4 py-3 rounded-2xl min-h-[120px] resize-none bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </div>

        <button type="submit" className="btn w-full">
          Send melding
        </button>
      </form>
    </section>
  );
};

export default Contact;
