import { Link } from "react-router-dom"
import { PageHero } from "@/components/PageHero"
import SEO from "@/components/SEO"

export default function Merch() {
  return (
    <>
      <SEO
        title="Merch"
        description="Vågal merch - t-skjorter, hettegensere og mer. Bestill via kontaktskjemaet, så ordner vi resten."
        url="/merch"
      />

      <PageHero title="MERCH" subtitle="Støtt bandet - vis fram stilen din" />

      <section className="container-page py-10 md:py-14">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-none border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center space-y-6">
            <h2 className="font-condensed text-2xl md:text-3xl text-[var(--color-text)]">
              Bestill merch direkte fra oss
            </h2>
            <p className="text-[var(--color-muted)]">
              Nettbutikken vår er for tiden stengt, men du kan fortsatt få tak i
              Vågal-merch! Send oss en melding med hva du ønsker deg -
              t-skjorter, hettegensere og mer - så tar vi kontakt og ordner
              bestillingen manuelt.
            </p>
            <Link
              to="/kontakt-oss"
              className="inline-block px-8 py-3 font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            >
              Kontakt oss for bestilling
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
