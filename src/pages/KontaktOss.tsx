import Contact from "../components/ContactForm.tsx"
import SEO from "../components/SEO"

export default function KontaktOss() {
  return (
    <>
      <SEO
        title="Kontakt"
        description="Kontakt Vågal for booking, presse eller generelle henvendelser."
        url="/kontakt"
      />
      <section className="container-page py-10 md:py-14">
        <h1 className="text-center mb-6 text-3xl md:text-5xl font-bold tracking-tight">
          Book Vågal til ditt neste arrangement!
        </h1>

        <p className="mt-2 text-center">
          Fyll ut skjemaet så tar vi kontakt så snart som mulig.
        </p>

        <div className="mx-auto mt-8 w-full max-w-md">
          <Contact />
        </div>
      </section>
    </>
  )
}
