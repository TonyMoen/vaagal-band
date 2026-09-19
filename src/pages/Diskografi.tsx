import { Link } from "react-router-dom"
import { Play } from "lucide-react"
import { useReleases } from "@/hooks/useReleases"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ErrorMessage } from "@/components/ErrorMessage"
import { PageHero } from "@/components/PageHero"
import ReleaseCard from "@/components/ReleaseCard"
import SEO from "@/components/SEO"
import { imageSrcSet, imageUrl } from "@/lib/sanity/image"
import { artistNames, formatDato, isUpcoming, songPath, typeLabel } from "@/lib/songs"
import type { Release } from "@/types/sanity"

const DESCRIPTION =
  "Utforsk Vågal sin diskografi. Bygderock, festcountry og norsk country - singler, EP-er og album fra bygdebandet."

/**
 * Diskografi page - displays all music releases from Sanity CMS
 * The newest release that is out gets a large feature; everything else is a
 * compact cover grid (2 columns on phones, 3 from md, 4 from lg). Every tile
 * links to the song page, which lists all streaming services.
 */
export default function Diskografi() {
  const { data, loading, error } = useReleases()

  const releases = data ?? []
  const featured = releases.find((release) => !isUpcoming(release))
  const rest = releases.filter((release) => release !== featured)

  return (
    <>
      <SEO title="Diskografi" description={DESCRIPTION} url="/diskografi" />
      <PageHero
        title="DISKOGRAFI"
        subtitle={
          releases.length > 0
            ? `${releases.length} utgivelser – bygderock og festcountry`
            : "Singler, EP-er og album – bygderock og festcountry"
        }
      />
      <div className="container-page py-6 md:py-12">
        {loading ? (
          <LoadingSpinner size="lg" className="min-h-[200px]" />
        ) : error ? (
          <ErrorMessage message="Kunne ikke laste utgivelser" />
        ) : releases.length === 0 ? (
          <div className="text-center text-[var(--color-muted)]">
            <p>Ingen utgivelser ennå. Følg med!</p>
          </div>
        ) : (
          <>
            {featured && <FeaturedRelease release={featured} />}
            {rest.length > 0 && (
              <section className="pt-9 md:pt-14" aria-labelledby="alle-utgivelser">
                <h2 id="alle-utgivelser" className="section-title mb-4 md:mb-6">
                  Alle utgivelser
                </h2>
                <div className="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-3 md:gap-x-5 md:gap-y-8 lg:grid-cols-4">
                  {rest.map((release) => (
                    <ReleaseCard key={release._id} release={release} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </>
  )
}

/** The newest release: large cover, title and the two actions from the homepage hero. */
function FeaturedRelease({ release }: { release: Release }) {
  const path = songPath(release)

  return (
    <section
      className="grid gap-4 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)] md:items-end md:gap-10"
      aria-label={`Nyeste utgivelse: ${release.title}`}
    >
      <Link
        to={path}
        aria-label={`${release.title}: alle strømmetjenester`}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
      >
        <img
          src={imageUrl(release.coverImage, 720, { ratio: 1 })}
          srcSet={imageSrcSet(release.coverImage, [400, 720, 1080], { ratio: 1 })}
          sizes="(min-width: 768px) 340px, 100vw"
          alt={`Cover for ${release.title}`}
          width={720}
          height={720}
          fetchPriority="high"
          className="aspect-square w-full border border-[var(--color-border)] object-cover"
        />
      </Link>
      <div className="min-w-0">
        <p className="kicker">
          Nyeste · {typeLabel(release)} · {formatDato(release.releaseDate)}
        </p>
        <h2 className="mt-1.5 break-words font-condensed text-[52px] font-bold uppercase leading-[0.92] md:text-7xl">
          {release.title}
        </h2>
        <p className="mt-2 text-[15.5px] text-[var(--color-muted)]">{artistNames(release).join(" · ")}</p>
        <div className="mt-4 grid grid-cols-2 gap-2.5 md:flex md:gap-3">
          {release.spotifyUrl && (
            <a
              href={release.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Lytt til ${release.title} på Spotify (åpnes i ny fane)`}
              className="btn md:px-7"
            >
              <Play className="h-[18px] w-[18px] fill-current" aria-hidden="true" />
              Lytt nå
            </a>
          )}
          <Link to={path} className="btn-outline only:col-span-2 md:px-7">
            Alle tjenester
          </Link>
        </div>
      </div>
    </section>
  )
}
