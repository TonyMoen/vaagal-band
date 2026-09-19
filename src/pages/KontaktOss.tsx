import Contact from "../components/ContactForm.tsx"
import BookingCard from "../components/BookingCard"
import { PageHero } from "@/components/PageHero"
import SEO from "../components/SEO"

export default function KontaktOss() {
  return (
    <>
      <SEO
        title="Kontakt"
        description="Kontakt Vågal for booking, presse eller generelle henvendelser."
        url="/kontakt-oss"
      />
      <PageHero title="KONTAKT" subtitle="Book Vågal til ditt neste arrangement!" />
      <section className="container-page py-6 md:py-14">
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {/* Booking first on phones: tap to call is what a promoter on the move wants */}
          <div className="min-w-0 md:order-2">
            <BookingCard />
          </div>

          <div className="min-w-0 md:order-1">
            <h2 className="font-condensed text-[26px] font-bold uppercase leading-none">
              Send oss en melding
            </h2>
            <p className="mb-5 mt-2 text-[15.5px] text-[var(--color-muted)]">
              Fyll ut skjemaet så tar vi kontakt så snart som mulig.
            </p>
            <Contact />
          </div>
        </div>
      </section>
    </>
  )
}
