import { usePromoterMaterials } from "@/hooks/usePromoterMaterials"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ErrorMessage } from "@/components/ErrorMessage"
import { PageHero } from "@/components/PageHero"
import SEO from "@/components/SEO"
import { urlFor } from "@/lib/sanity/image"
import { Button } from "@/components/ui/button"
import { Download, Mail, Phone } from "lucide-react"
import { PortableText } from "@portabletext/react"

/**
 * Arrangoerer (For Promoters) page - hidden page for booking materials
 * Accessible via direct URL only, NOT linked in navigation
 * Features: technical rider, hospitality rider, press kit, contact info
 */
export default function Arrangoerer() {
  const { data, loading, error } = usePromoterMaterials()

  // Loading state
  if (loading) {
    return (
      <>
        <SEO
          title="For Arrangører"
          description="Profesjonelle materialer for booking av Vågal. Teknisk og hospitality rider, pressepakke og kontaktinformasjon."
          url="/arrangoerer"
          noindex
        />
        <PageHero title="FOR ARRANGØRER" />
        <main className="container-page py-10 md:py-14">
          <LoadingSpinner size="lg" className="min-h-[200px]" />
        </main>
      </>
    )
  }

  // Error state
  if (error) {
    return (
      <>
        <SEO
          title="For Arrangører"
          description="Profesjonelle materialer for booking av Vågal."
          url="/arrangoerer"
          noindex
        />
        <PageHero title="FOR ARRANGØRER" />
        <main className="container-page py-10 md:py-14">
          <ErrorMessage message="Kunne ikke laste materialer" />
        </main>
      </>
    )
  }

  // Empty state (no CMS data yet)
  if (!data) {
    return (
      <>
        <SEO
          title="For Arrangører"
          description="Profesjonelle materialer for booking av Vågal."
          url="/arrangoerer"
          noindex
        />
        <PageHero title="FOR ARRANGØRER" subtitle="Pressepakke og rider informasjon" />
        <main className="container-page py-10 md:py-14">
          <div className="text-center text-[var(--color-muted)]">
            <p>Materialer kommer snart. Ta kontakt for mer info.</p>
          </div>
        </main>
      </>
    )
  }

  // Full content render
  return (
    <>
      <SEO
        title="For Arrangører"
        description="Profesjonelle materialer for booking av Vågal. Teknisk og hospitality rider, pressepakke og kontaktinformasjon."
        url="/arrangoerer"
        noindex
      />
      <PageHero title="FOR ARRANGØRER" subtitle="Pressepakke og rider informasjon" />
      <main className="container-page py-10 md:py-14 space-y-16">
        {/* Technical Rider Section */}
        {data.technicalRider && (
          <section className="space-y-6">
            <h2 className="font-condensed text-2xl font-bold text-[var(--color-text)] md:text-3xl">
              TEKNISK RIDER
            </h2>
            <div className="rounded-lg bg-[var(--color-surface)] p-6 md:p-8">
              <p className="mb-6 text-[var(--color-muted)]">
                Komplett teknisk rider med stageplott, inputliste, lyd- og lyskrav.
              </p>
              <Button
                className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white"
                asChild
              >
                <a href={data.technicalRider} download target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Last ned teknisk rider (PDF)
                </a>
              </Button>
            </div>
          </section>
        )}

        {/* Hospitality Rider Section */}
        {data.hospitalityRider && (
          <section className="space-y-6">
            <h2 className="font-condensed text-2xl font-bold text-[var(--color-text)] md:text-3xl">
              HOSPITALITY RIDER
            </h2>
            <div className="rounded-lg bg-[var(--color-surface)] p-6 md:p-8">
              <p className="whitespace-pre-wrap text-[var(--color-text)]">
                {data.hospitalityRider}
              </p>
            </div>
          </section>
        )}

        {/* Press Kit Section */}
        <section className="space-y-6">
          <h2 className="font-condensed text-2xl font-bold text-[var(--color-text)] md:text-3xl">
            PRESSEPAKKE
          </h2>

          {/* Band Bio */}
          {(data.bandBioShort || data.bandBioLong) && (
            <div className="rounded-lg bg-[var(--color-surface)] p-6 md:p-8 space-y-6">
              <h3 className="font-condensed text-xl font-semibold text-[var(--color-text)]">
                Om Vågal
              </h3>

              {data.bandBioShort && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[var(--color-muted)] uppercase tracking-wide">
                    Kort bio
                  </h4>
                  <p className="text-[var(--color-text)]">{data.bandBioShort}</p>
                </div>
              )}

              {data.bandBioLong && data.bandBioLong.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-[var(--color-muted)] uppercase tracking-wide">
                    Full bio
                  </h4>
                  <div className="prose prose-invert max-w-none text-[var(--color-text)]">
                    <PortableText value={data.bandBioLong} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Press Photos */}
          {data.pressPhotos && data.pressPhotos.length > 0 && (
            <div className="rounded-lg bg-[var(--color-surface)] p-6 md:p-8 space-y-4">
              <h3 className="font-condensed text-xl font-semibold text-[var(--color-text)]">
                Pressebilder
              </h3>
              <p className="text-[var(--color-muted)] text-sm">
                Høyoppløselige bilder for presse og markedsføring. Klikk for å laste ned.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {data.pressPhotos.map((photo, index) => (
                  <div key={index} className="relative aspect-video overflow-hidden rounded-lg group">
                    <img
                      src={urlFor(photo).width(800).url()}
                      alt={`Pressebilde ${index + 1}`}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <a
                      href={urlFor(photo).url()}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-3 right-3 rounded-md bg-[var(--color-accent)] p-2 hover:bg-[var(--color-accent-hover)] transition-colors"
                    >
                      <Download className="h-5 w-5 text-white" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Logo Files */}
          {data.logoFiles && data.logoFiles.length > 0 && (
            <div className="rounded-lg bg-[var(--color-surface)] p-6 md:p-8 space-y-4">
              <h3 className="font-condensed text-xl font-semibold text-[var(--color-text)]">
                Logofiler
              </h3>
              <p className="text-[var(--color-muted)] text-sm">
                Bandlogo i ulike formater for bruk i trykk og digital markedsføring.
              </p>
              <div className="flex flex-wrap gap-3">
                {data.logoFiles.map((logoUrl, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)]"
                    asChild
                  >
                    <a href={logoUrl} download target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Logo {index + 1}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Contact Section */}
        {(data.contactEmail || data.contactPhone) && (
          <section className="space-y-6">
            <h2 className="font-condensed text-2xl font-bold text-[var(--color-text)] md:text-3xl">
              KONTAKT FOR BOOKING
            </h2>
            <div className="rounded-lg bg-[var(--color-surface)] p-6 md:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                {data.contactEmail && (
                  <Button
                    className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white"
                    asChild
                  >
                    <a href={`mailto:${data.contactEmail}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      {data.contactEmail}
                    </a>
                  </Button>
                )}
                {data.contactPhone && (
                  <Button
                    variant="outline"
                    className="border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)]"
                    asChild
                  >
                    <a href={`tel:${data.contactPhone.replace(/\s/g, '')}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      {data.contactPhone}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}
