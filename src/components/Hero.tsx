import { Link } from 'react-router-dom'
import { Play } from 'lucide-react'
import { useHero } from '@/hooks/useHero'
import { useLatestRelease } from '@/hooks/useLatestRelease'
import { imageSrcSet, imageUrl } from '@/lib/sanity/image'
import { artistNames, formatDato, isUpcoming, songPath, typeLabel } from '@/lib/songs'
import { LoadingSpinner } from './LoadingSpinner'
import ServiceIcon from './ServiceIcon'
import heroImg from '../assets/hero-1920.jpg'
import type { HeroContent, Release } from '@/types/sanity'

type Props = {
  /** Override image source (fallback if CMS unavailable) */
  src?: string
  /** Image alt text (fallback if CMS unavailable) */
  alt?: string
  /** Show dark overlay on hero image */
  overlay?: boolean
  /** Skip CMS fetch and use provided props directly */
  skipCms?: boolean
  /** Explicitly disable latest release feature */
  disableLatestRelease?: boolean
}

const TAGLINE = 'Bygderock og festcountry fra de beste bygdene'

/**
 * Poster height: most of the first screen but never all of it, so the next
 * concert shows above the fold. svh (not vh) keeps mobile browser bars out of
 * the maths, and the clamp stops it growing on tall or shrinking on short screens.
 */
const HERO_HEIGHT = 'h-[clamp(430px,76svh,660px)] md:h-[clamp(460px,66svh,640px)]'

/** A release counts as "new" for this long after its date */
const NEW_FOR_DAYS = 45

export default function Hero({
  src = heroImg,
  alt = 'Vågal band',
  overlay = true,
  skipCms = false,
  disableLatestRelease = false,
}: Props) {
  const { data: heroData, loading: heroLoading } = useHero()
  const { data: latestRelease, loading: releaseLoading } = useLatestRelease()

  // Show loading state while fetching from CMS
  const isLoading = !skipCms && (heroLoading || (!disableLatestRelease && releaseLoading))

  if (isLoading) {
    return (
      <section className={`relative isolate flex items-center justify-center bg-[var(--color-bg)] ${HERO_HEIGHT}`}>
        <LoadingSpinner size="lg" />
      </section>
    )
  }

  const cms = skipCms ? null : heroData
  const release = !disableLatestRelease && latestRelease?.coverImage ? latestRelease : null

  return (
    <section
      id="hero"
      className={`relative isolate flex flex-col justify-end overflow-hidden bg-[var(--color-bg)] ${HERO_HEIGHT}`}
    >
      <HeroBackground cms={cms} fallbackSrc={src} alt={cms?.title || alt} />
      {overlay && (
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,#0A0A0A_0%,rgba(10,10,10,0.9)_26%,rgba(10,10,10,0.2)_60%,rgba(10,10,10,0.45)_100%)]"
          aria-hidden="true"
        />
      )}

      {release ? (
        <>
          {/* The tagline is the page's h1: small on screen, first in the outline */}
          <h1 className="container-page absolute inset-x-0 top-4 font-condensed text-[13px] font-semibold uppercase leading-snug tracking-[0.2em] text-[var(--color-text)]/90 md:top-6 md:text-[15px]">
            {TAGLINE}
          </h1>
          <ReleaseFeature release={release} />
        </>
      ) : (
        <div className="container-page w-full pb-8 md:pb-12">
          <h1 className="font-condensed text-[clamp(44px,14vw,104px)] font-bold uppercase leading-[0.92] text-[var(--color-text)]">
            {cms?.title || 'Vågal'}
          </h1>
          <p className="mt-3 max-w-xl text-lg text-[var(--color-text)]/85 md:text-xl">
            {cms?.subtitle || TAGLINE}
          </p>
        </div>
      )}
    </section>
  )
}

/**
 * The band photo. Phones get a portrait crop around the Sanity hotspot, so a
 * wide stage shot still shows the band and only a few KB are downloaded;
 * wider screens get the landscape image in the size they need.
 */
function HeroBackground({
  cms,
  fallbackSrc,
  alt,
}: {
  cms: HeroContent | null
  fallbackSrc: string
  alt: string
}) {
  const className = 'absolute inset-0 -z-20 h-full w-full object-cover object-[center_60%]'

  if (!cms?.image) {
    return <img src={fallbackSrc} alt={alt} className={className} fetchPriority="high" />
  }

  return (
    <picture>
      <source
        media="(max-width: 767px)"
        srcSet={imageSrcSet(cms.image, [480, 828, 1242], { ratio: 4 / 3 })}
        sizes="100vw"
      />
      <img
        src={imageUrl(cms.image, 1200)}
        srcSet={imageSrcSet(cms.image, [828, 1200, 1920])}
        sizes="100vw"
        alt={alt}
        className={className}
        fetchPriority="high"
      />
    </picture>
  )
}

/** Cover, title and the two actions, docked at the bottom of the poster where a thumb reaches. */
function ReleaseFeature({ release }: { release: Release }) {
  const upcoming = isUpcoming(release)
  const path = songPath(release)
  const type = release.releaseType === 'EP' ? 'EP' : typeLabel(release).toLowerCase()
  const ageInDays = (Date.now() - new Date(`${release.releaseDate}T12:00:00Z`).getTime()) / 86_400_000
  const kicker = upcoming
    ? `Kommer ${formatDato(release.releaseDate)}`
    : ageInDays <= NEW_FOR_DAYS
      ? `Ny ${type} · ute nå`
      : `Siste ${type}`

  return (
    <div className="container-page w-full pb-5 md:pb-8 lg:pb-10">
      <div className="grid grid-cols-[88px_minmax(0,1fr)] items-end gap-x-3.5 gap-y-3.5 [grid-template-areas:'cover_meta'_'title_title'_'actions_actions'] md:grid-cols-[184px_minmax(0,1fr)] md:gap-x-6 md:gap-y-3 md:[grid-template-areas:'cover_meta'_'cover_title'_'cover_actions'] lg:grid-cols-[232px_minmax(0,1fr)] lg:gap-x-8">
        <Link
          to={path}
          aria-label={`${release.title}: alle strømmetjenester`}
          className="block [grid-area:cover] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-hover)]"
        >
          <img
            src={imageUrl(release.coverImage, 464, { ratio: 1 })}
            srcSet={imageSrcSet(release.coverImage, [176, 368, 464, 696], { ratio: 1 })}
            sizes="(min-width: 1024px) 232px, (min-width: 768px) 184px, 88px"
            alt={`${release.title} cover`}
            width={464}
            height={464}
            className="aspect-square w-full border border-white/20 object-cover shadow-[0_16px_36px_rgba(0,0,0,0.65)]"
          />
        </Link>

        <div className="min-w-0 [grid-area:meta]">
          <p className="kicker">{kicker}</p>
          <p className="mt-1 text-[14.5px] leading-snug text-[var(--color-text)]/80">
            {artistNames(release).join(' · ')}
            {!upcoming && ` · ${formatDato(release.releaseDate)}`}
          </p>
        </div>

        <h2 className="break-words font-condensed text-[clamp(44px,14vw,76px)] font-bold uppercase leading-[0.92] text-[var(--color-text)] [grid-area:title] md:text-[clamp(64px,9vw,104px)]">
          <Link to={path} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-hover)]">
            {release.title}
          </Link>
        </h2>

        <div className="grid grid-cols-2 gap-2.5 [grid-area:actions] md:flex md:gap-3">
          {upcoming && release.presaveUrl ? (
            <a
              href={release.presaveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-none bg-[#1DB954] px-5 font-semibold text-[#0A0A0A] transition-colors hover:bg-[#1ed760] md:px-7"
            >
              <ServiceIcon name="spotify" size={20} />
              Pre-save
            </a>
          ) : !upcoming && release.spotifyUrl ? (
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
          ) : null}
          <Link
            to={path}
            className="inline-flex min-h-[48px] items-center justify-center rounded-none border border-[var(--color-text)]/40 bg-[var(--color-bg)]/40 px-5 font-semibold text-[var(--color-text)] transition-colors hover:border-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-hover)] md:px-7 only:col-span-2"
          >
            Alle tjenester
          </Link>
        </div>
      </div>
    </div>
  )
}
