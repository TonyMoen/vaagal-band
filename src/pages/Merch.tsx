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

      <section className="container-page py-6 md:py-14">
        <div className="max-w-2xl rounded-none border border-[var(--color-border)] bg-[var(--color-surface)] p-5 md:p-8">
          <h2 className="font-condensed text-[26px] font-bold uppercase leading-none text-[var(--color-text)] md:text-3xl">
            Bestill merch direkte fra oss
          </h2>
          <p className="mt-3 text-[var(--color-muted)]">
            Nettbutikken vår er for tiden stengt, men du kan fortsatt få tak i
            Vågal-merch! Send oss en melding med hva du ønsker deg -
            t-skjorter, hettegensere og mer - så tar vi kontakt og ordner
            bestillingen manuelt.
          </p>
          <Link to="/kontakt-oss" className="btn mt-5 w-full md:w-auto md:px-8">
            Kontakt oss for bestilling
          </Link>
        </div>
      </section>
    </>
  )
}
