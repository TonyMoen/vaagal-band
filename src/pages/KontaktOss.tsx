import Contact from "../components/ContactForm.tsx"
import { PageHero } from "@/components/PageHero"
import SEO from "../components/SEO"

export default function KontaktOss() {
  return (
    <>
      <SEO
        title="Kontakt"
        description="Kontakt Vågal for booking, presse eller generelle henvendelser."
        url="/kontakt"
      />
      <PageHero title="KONTAKT" subtitle="Book Vågal til ditt neste arrangement!" />
      <section className="container-page py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16 max-w-4xl mx-auto">
          <div>
            <h2 className="text-xl font-semibold mb-4">Send oss en melding</h2>
            <p className="text-[var(--color-muted)] mb-6">
              Fyll ut skjemaet så tar vi kontakt så snart som mulig.
            </p>
            <Contact />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Booking</h2>
            <p className="text-[var(--color-muted)] mb-6">
              For booking og forespørsler, kontakt vår bookingagent:
            </p>
            <div className="rounded-none border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-3">
              <p className="font-semibold text-lg">Aronsen Booking & Management</p>
              <p>
                <span className="text-[var(--color-muted)]">Mobil: </span>
                <a href="tel:+4792891523" className="text-[var(--color-accent)] hover:underline">
                  928 91 523
                </a>
              </p>
              <p>
                <span className="text-[var(--color-muted)]">E-post: </span>
                <a href="mailto:arne@aronsenbooking.no" className="text-[var(--color-accent)] hover:underline">
                  arne@aronsenbooking.no
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
