import { useHero } from '@/hooks/useHero'
import { useLatestRelease } from '@/hooks/useLatestRelease'
import { urlFor } from '@/lib/sanity/image'
import { LoadingSpinner } from './LoadingSpinner'
import { Button } from './ui/button'
import heroImg from '../assets/hero-1920.jpg'

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
      <section className="relative isolate min-h-[100svh] md:min-h-[65vh] flex items-center justify-center bg-[var(--color-bg)]">
        <LoadingSpinner size="lg" />
      </section>
    )
  }

  // LATEST RELEASE MODE - keeps hero background, shows release cover as centered overlay
  if (!disableLatestRelease && latestRelease && latestRelease.coverImage) {
    const releaseCoverSrc = urlFor(latestRelease.coverImage).width(600).height(600).quality(90).url()

    // Use CMS hero image or fallback to static hero as background
    const backgroundSrc = !skipCms && heroData?.image
      ? urlFor(heroData.image).width(1920).quality(80).url()
      : src

    return (
      <section className="relative isolate min-h-[100svh] md:min-h-[65vh]">
        {/* Background: Normal hero image */}
        <img
          src={backgroundSrc}
          alt={heroData?.title || alt}
          className="absolute inset-0 h-full w-full object-cover object-[center_58%]"
          fetchPriority="high"
        />
        {overlay && (
          <div
            className="absolute inset-0 bg-black/50 md:bg-black/45"
            aria-hidden="true"
          />
        )}
        {/* Latest Release Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          {/* Title + UTE NÅ! */}
          <p className="text-lg md:text-2xl font-semibold text-[var(--color-text)] mb-2 uppercase tracking-wide">
            {latestRelease.title} - <span className="text-[var(--color-accent)]">UTE NÅ!</span>
          </p>

          {/* Centered Release Cover Image */}
          <div className="relative">
            <img
              src={releaseCoverSrc}
              alt={`${latestRelease.title} cover`}
              className="w-48 h-48 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] object-cover shadow-2xl border-4 border-white/20"
            />
          </div>

          {/* CTA Button */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {latestRelease.spotifyUrl && (
              <Button
                asChild
                size="lg"
                className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-semibold"
              >
                <a
                  href={latestRelease.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  Lytt nå
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>
    )
  }

  // REGULAR HERO MODE - fallback behavior
  const imageSrc = !skipCms && heroData?.image
    ? urlFor(heroData.image).width(1920).quality(80).url()
    : src

  const imageAlt = !skipCms && heroData?.title ? heroData.title : alt

  return (
    <section className="relative isolate min-h-[100svh] md:min-h-[65vh]">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-[center_58%]"
        fetchPriority="high"
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-black/30 md:bg-black/35"
          aria-hidden="true"
        />
      )}
      {/* Display CMS title/subtitle if available */}
      {!skipCms && (heroData?.title || heroData?.subtitle) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          {heroData?.title && (
            <h1 className="font-bold text-5xl md:text-7xl lg:text-[120px] xl:text-[160px] text-[var(--color-text)] leading-none tracking-tight">
              {heroData.title}
            </h1>
          )}
          {heroData?.subtitle && (
            <p className="mt-4 text-xl md:text-2xl text-[var(--color-muted)]">
              {heroData.subtitle}
            </p>
          )}
        </div>
      )}
    </section>
  )
}
