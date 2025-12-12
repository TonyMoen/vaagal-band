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
        <p className="text-center mb-8">
          Fyll ut skjemaet så tar vi kontakt så snart som mulig.
        </p>

        <div className="mx-auto w-full max-w-md">
          <Contact />
        </div>
      </section>
    </>
  )
}
