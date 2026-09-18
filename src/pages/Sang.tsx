import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Check, ChevronRight, Copy, Share2 } from "lucide-react"
import { useReleases } from "@/hooks/useReleases"
import { urlFor } from "@/lib/sanity/image"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ErrorMessage } from "@/components/ErrorMessage"
import SEO from "@/components/SEO"
import ServiceIcon from "@/components/ServiceIcon"
import NotFoundPage from "@/pages/NotFoundPage"
import {
  BAND_NAME,
  artistNames,
  findReleaseBySlug,
  formatDato,
  isUpcoming,
  services,
  songPath,
  songSummary,
  typeLabel,
  yearOf,
} from "@/lib/songs"
import type { Release } from "@/types/sanity"

const BASE_URL = "https://vaagalband.no"
const SPOTIFY_ARTIST_URL = "https://open.spotify.com/artist/5M9ZQMR3vvDdLgv1D43MO9"

/**
 * Song page: vaagalband.no/<slug>. One page per release in Sanity with links
 * to every streaming service, made for sharing. Before the release date the
 * same address shows "Kommer <dato>" and the pre-save button.
 *
 * scripts/prerender-songs.mjs writes a static copy of the head (title, Open
 * Graph, JSON-LD) per song at build time, because the apps people share links
 * in do not run JavaScript.
 */
export default function Sang() {
  const { slug = "" } = useParams()
  const { data, loading, error } = useReleases()

  if (loading) {
    return (
      <main className="container-page py-16">
        <LoadingSpinner size="lg" className="min-h-[50vh]" />
      </main>
    )
  }

  if (error) {
    return (
      <main className="container-page py-16">
        <ErrorMessage message="Kunne ikke laste låta" />
      </main>
    )
  }

  const releases = data ?? []
  const release = findReleaseBySlug(releases, slug)
  if (!release) return <NotFoundPage />

  const more = releases.filter((other) => other._id !== release._id).slice(0, 4)
  return <SongView release={release} more={more} />
}

function SongView({ release, more }: { release: Release; more: Release[] }) {
  const upcoming = isUpcoming(release)
  const links = services(release)
  const artists = artistNames(release)
  const summary = songSummary(release)
  const path = songPath(release)
  const url = `${BASE_URL}${path}`
  const label = upcoming
    ? `Kommer ${formatDato(release.releaseDate)}`
    : `${typeLabel(release)} · ${yearOf(release)}`

  const hasCover = Boolean(release.coverImage?.asset)
  const coverUrl = hasCover ? urlFor(release.coverImage).width(800).height(800).auto("format").url() : null
  const backdropUrl = hasCover ? urlFor(release.coverImage).width(64).height(64).blur(30).url() : null
  // 1200x630 with the cover centred on black: the share card the prerender script also uses
  const shareImage = hasCover
    ? urlFor(release.coverImage).width(1200).height(630).fit("fill").bg("0a0a0a").format("jpg").quality(85).url()
    : undefined

  const description = links.length
    ? `${summary} Hør «${release.title}» på ${links.map((link) => link.label).join(", ")}.`
    : summary

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": release.releaseType === "album" || release.releaseType === "EP" ? "MusicAlbum" : "MusicRecording",
        "@id": `${url}#recording`,
        url,
        name: release.title,
        byArtist: artists.map((name) =>
          name === BAND_NAME
            ? { "@type": "MusicGroup", name, url: BASE_URL, sameAs: SPOTIFY_ARTIST_URL }
            : { "@type": "MusicGroup", name }
        ),
        datePublished: release.releaseDate,
        inLanguage: "nb-NO",
        ...(hasCover ? { image: urlFor(release.coverImage).width(1200).height(1200).url() } : {}),
        sameAs: links.map((link) => link.url),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Hjem", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Diskografi", item: `${BASE_URL}/diskografi` },
          { "@type": "ListItem", position: 3, name: release.title, item: url },
        ],
      },
    ],
  }

  return (
    <>
      <SEO
        title={artists.length > 1 ? `${release.title} (${artists.join(", ")})` : release.title}
        description={description}
        url={path}
        image={shareImage}
        type="music.song"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <article className="relative overflow-hidden">
        {/* The cover, blurred, as backdrop */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {backdropUrl && (
            <img src={backdropUrl} alt="" className="h-full w-full scale-125 object-cover opacity-50 blur-2xl" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#0A0A0A]/75 to-[var(--color-bg)]" />
        </div>

        <div className="container-page relative grid items-start gap-8 pb-14 pt-10 md:grid-cols-[340px_minmax(0,1fr)] md:gap-12 md:pb-20 md:pt-16">
          <figure className="mx-auto w-[240px] border border-white/15 shadow-[0_24px_48px_rgba(0,0,0,0.6)] md:w-full">
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={`Cover for ${release.title}`}
                width={800}
                height={800}
                className="aspect-square w-full object-cover"
                fetchPriority="high"
              />
            ) : (
              <div className="aspect-square w-full bg-[var(--color-surface)]" />
            )}
          </figure>

          <div className="text-center md:text-left">
            <p className="font-condensed text-base font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
              {label}
            </p>
            <h1 className="mt-2 break-words font-condensed text-5xl font-bold uppercase leading-none text-[var(--color-text)] md:text-6xl lg:text-7xl">
              {release.title}
            </h1>
            <p className="mt-4 text-lg font-semibold text-[var(--color-text)]">{artists.join(" · ")}</p>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)] md:text-lg">{summary}</p>

            {upcoming && release.presaveUrl && (
              <div className="mt-6">
                <a
                  href={release.presaveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[56px] items-center justify-center gap-3 rounded-none bg-[#1DB954] px-6 font-condensed text-xl font-bold uppercase tracking-wide text-[#0A0A0A] transition-colors hover:bg-[#1ed760]"
                >
                  <ServiceIcon name="spotify" size={22} />
                  Pre-save på Spotify
                </a>
                <p className="mt-2 text-sm text-[var(--color-muted)]">
                  Du logger inn med Spotify, og låta lagres i biblioteket ditt på slippdagen.
                </p>
              </div>
            )}

            {links.length > 0 && (
              <ul className="mt-6 grid gap-3" aria-label={`Hør ${release.title} på`}>
                {links.map((link, index) => (
                  <li key={link.key}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`grid min-h-[56px] grid-cols-[26px_minmax(0,1fr)_auto] items-center gap-3 rounded-none border px-5 text-left text-base font-semibold transition-colors ${
                        index === 0
                          ? "border-transparent bg-[#1DB954] text-[#0A0A0A] hover:bg-[#1ed760]"
                          : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)]"
                      }`}
                    >
                      <ServiceIcon name={link.key} />
                      <span>{link.label}</span>
                      <span className="font-condensed text-sm font-semibold uppercase tracking-[0.15em] opacity-80">
                        {link.verb}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            <ShareButtons url={url} title={`${release.title} | ${artists.join(", ")}`} />
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="border-divider py-12 md:py-16" aria-labelledby="flere-later">
          <div className="container-page">
            <h2
              id="flere-later"
              className="font-condensed text-3xl font-bold uppercase text-[var(--color-accent)] md:text-4xl"
            >
              Flere låter
            </h2>
            <ul className="mt-6">
              {more.map((other) => (
                <SongRow key={other._id} release={other} />
              ))}
            </ul>
            <Link
              to="/diskografi"
              className="mt-8 inline-flex min-h-[44px] items-center text-base font-medium text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
            >
              Hele diskografien &rarr;
            </Link>
          </div>
        </section>
      )}
    </>
  )
}

/** One line in the "Flere låter" list: cover, title and year, linking to the song page. */
function SongRow({ release }: { release: Release }) {
  const upcoming = isUpcoming(release)
  return (
    <li>
      <Link
        to={songPath(release)}
        className="group flex min-h-[72px] items-center gap-4 border-b border-[var(--color-border)] py-2 transition-colors hover:border-[var(--color-accent)]"
      >
        {release.coverImage?.asset ? (
          <img
            src={urlFor(release.coverImage).width(112).height(112).auto("format").url()}
            alt=""
            width={56}
            height={56}
            loading="lazy"
            className="h-14 w-14 flex-none object-cover"
          />
        ) : (
          <span className="h-14 w-14 flex-none bg-[var(--color-tertiary)]" aria-hidden="true" />
        )}
        <span className="min-w-0 flex-1">
          <span className="block truncate font-condensed text-xl font-bold uppercase text-[var(--color-text)] transition-colors group-hover:text-[var(--color-accent)]">
            {release.title}
          </span>
          <span className={`block text-sm ${upcoming ? "text-[var(--color-accent)]" : "text-[var(--color-muted)]"}`}>
            {upcoming ? `Kommer ${formatDato(release.releaseDate)}` : yearOf(release)}
          </span>
        </span>
        <ChevronRight
          className="h-5 w-5 flex-none text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-accent)]"
          aria-hidden="true"
        />
      </Link>
    </li>
  )
}

const SHARE_BUTTON =
  "inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-none border border-[var(--color-accent)] px-4 py-2 font-condensed text-base font-semibold uppercase tracking-wide text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)] hover:text-white md:flex-none md:px-5"

/** "Kopier lenke" and "Del". Del opens the share sheet on phones and copies elsewhere. */
function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.prompt("Kopier lenken:", url)
    }
  }

  const share = async () => {
    if (!navigator.share) {
      await copy()
      return
    }
    try {
      await navigator.share({ title, url })
    } catch {
      // The share sheet was closed
    }
  }

  return (
    <div className="mt-5 flex justify-center gap-3 md:justify-start">
      <button type="button" onClick={copy} className={SHARE_BUTTON}>
        {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
        <span aria-live="polite">{copied ? "Kopiert" : "Kopier lenke"}</span>
      </button>
      <button type="button" onClick={share} className={SHARE_BUTTON}>
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Del
      </button>
    </div>
  )
}
