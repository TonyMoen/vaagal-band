import { useState } from "react"
import BandsintownWidget from "../components/BandsintownWidget"
import { EmptyStateConserter } from "../components/EmptyStateConserter"
import { PageHero } from "@/components/PageHero"
import SEO from "../components/SEO"

export default function Konserter() {
  const [isEmpty, setIsEmpty] = useState(false)

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
          <BandsintownWidget onEmptyState={() => setIsEmpty(true)} />
          {isEmpty && <EmptyStateConserter className="mt-6" />}
        </div>

        <aside className="space-y-4 self-start">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <h2 className="text-lg font-semibold">Praktisk info</h2>
            <ul className="mt-3 space-y-1">
              <li>• Det blir fest</li>
              <li>• God stemning</li>
              <li>• Masse musikk</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
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
