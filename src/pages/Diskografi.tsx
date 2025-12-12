import { useReleases } from "@/hooks/useReleases"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ErrorMessage } from "@/components/ErrorMessage"
import { PageHero } from "@/components/PageHero"
import ReleaseCard from "@/components/ReleaseCard"
import SEO from "@/components/SEO"

/**
 * Diskografi page - displays all music releases from Sanity CMS
 * Features: responsive grid, loading/error/empty states, SEO
 */
export default function Diskografi() {
  const { data, loading, error } = useReleases()

  if (loading) {
    return (
      <>
        <SEO
          title="Diskografi"
          description="Utforsk Vågal sin diskografi. Singler, EP-er og album fra bygderock-bandet."
          url="/diskografi"
        />
        <PageHero title="DISKOGRAFI" />
        <main className="container-page py-10 md:py-14">
          <LoadingSpinner size="lg" className="min-h-[200px]" />
        </main>
      </>
    )
  }

  if (error) {
    return (
      <>
        <SEO
          title="Diskografi"
          description="Utforsk Vågal sin diskografi. Singler, EP-er og album fra bygderock-bandet."
          url="/diskografi"
        />
        <PageHero title="DISKOGRAFI" />
        <main className="container-page py-10 md:py-14">
          <ErrorMessage message="Kunne ikke laste utgivelser" />
        </main>
      </>
    )
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <>
        <SEO
          title="Diskografi"
          description="Utforsk Vågal sin diskografi. Singler, EP-er og album fra bygderock-bandet."
          url="/diskografi"
        />
        <PageHero title="DISKOGRAFI" />
        <main className="container-page py-10 md:py-14">
          <div className="text-center text-[var(--color-muted)]">
            <p>Ingen utgivelser ennå. Følg med!</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <SEO
        title="Diskografi"
        description="Utforsk Vågal sin diskografi. Singler, EP-er og album fra bygderock-bandet."
        url="/diskografi"
      />
      <PageHero title="DISKOGRAFI" subtitle="Singler, EP-er og album" />
      <main className="container-page py-10 md:py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((release) => (
            <ReleaseCard key={release._id} release={release} />
          ))}
        </div>
      </main>
    </>
  )
}
