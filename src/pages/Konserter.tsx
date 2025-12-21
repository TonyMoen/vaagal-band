import ConcertList from "../components/ConcertList"
import { PageHero } from "@/components/PageHero"
import SEO from "../components/SEO"

export default function Konserter() {
  return (
    <>
      <SEO
        title="Konserter"
        description="Se kommende konserter med Vågal. Finn datoer, steder og billettinformasjon."
        url="/konserter"
      />
      <PageHero title="KONSERTER" subtitle="Kommende konserter og festivaler" />
      <section className="container-page py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <ConcertList />
        </div>

        <aside className="space-y-4 self-start">
          <div className="rounded-none border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h2 className="text-lg font-semibold">Booking</h2>
            <p className="mt-3 text-sm text-[var(--color-muted)]">
              For booking og forespørsler, kontakt vår bookingagent:
            </p>
            <div className="mt-3 space-y-2">
              <p className="font-semibold">Aronsen Booking & Management</p>
              <p className="text-sm">
                <a href="tel:+4792891523" className="text-[var(--color-accent)] hover:underline">
                  928 91 523
                </a>
              </p>
              <p className="text-sm">
                <a href="mailto:arne@aronsenbooking.no" className="text-[var(--color-accent)] hover:underline">
                  arne@aronsenbooking.no
                </a>
              </p>
            </div>
          </div>

          <div className="rounded-none border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h3 className="font-semibold">Få varsel</h3>
            <p className="text-sm text-[var(--color-muted)]">Følg oss på sosiale medier for billettslipp og oppdateringer.</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/vaagal_band/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                aria-label="Følg oss på Instagram (åpnes i ny fane)"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/vaagal.band.no/?locale=nb_NO"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
                aria-label="Følg oss på Facebook (åpnes i ny fane)"
              >
                Facebook
              </a>
            </div>
          </div>
        </aside>
      </div>
      </section>
    </>
  )
}
