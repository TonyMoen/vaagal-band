import { Link } from "react-router-dom"
import Hero from "../components/Hero"
import NextGigStrip from "../components/NextGigStrip"
import SpotifyWidget from "../components/SpotifyWidget"
import ConcertList from "../components/ConcertList"
import YouTubeWidget from "../components/YoutubeWidget"
import ReleaseRail from "../components/ReleaseRail"
import SectionHeading from "../components/SectionHeading"
import BookingCard from "../components/BookingCard"
import ServiceIcon from "../components/ServiceIcon"
import SEO from "../components/SEO"
import JsonLd from "../components/JsonLd"
import { useConcerts } from "@/hooks/useConcerts"
import { useHero } from "@/hooks/useHero"
import { useLatestRelease } from "@/hooks/useLatestRelease"
import { useReleases } from "@/hooks/useReleases"
import { useBandMembers } from "@/hooks/useBandMembers"
import { SPOTIFY_ARTIST_URL } from "@/lib/links"
import { ABOUT } from "@/lib/band"
import { bandNode, eventNode, graph } from "@/lib/schema"

/** Shown until a music video is set on the Hero document in Sanity */
const FALLBACK_VIDEO = { url: "https://www.youtube.com/watch?v=5RKw6rMlKwg", title: "Øst til vest" }

/**
 * Homepage. One source order, read top to bottom on a phone: release, next gig,
 * concerts, music, releases, about, video, merch and booking. From lg the
 * concerts and the video each get the Spotify player / the cards beside them.
 */
export default function Hjem() {
  const { data: concerts } = useConcerts()
  const { data: hero } = useHero()
  const { data: latest } = useLatestRelease()
  const { data: releases } = useReleases()
  const { data: members } = useBandMembers()
  const concertCount = concerts?.length ?? 0
  const video = hero?.musicVideoUrl
    ? { url: hero.musicVideoUrl, title: hero.musicVideoTitle || "Siste musikkvideo" }
    : FALLBACK_VIDEO

  return (
    <>
      <SEO
        title="Vågal – populært norsk bygdeband | Bygderock og festcountry"
        rawTitle
        description="Vågal er et av Norges mest populære nye bygdeband: bygderock og festcountry fra Notodden, med allsang og fullt trøkk. Hør låtene, se konsertene og book festbandet."
        url="/"
      />
      <JsonLd
        data={graph(
          bandNode({ members: members ?? [], releases: releases ?? [] }),
          ...(concerts ?? []).slice(0, 6).map(eventNode)
        )}
      />

      {/* Hero fetches from CMS automatically, with fallback to local image */}
      <Hero alt="Bandbilde av Vågal" overlay={true} />
      <NextGigStrip />

      <div className="container-page pb-14 md:pb-20">
        <div className="lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-x-10">
          {/* Konserter */}
          <section className="min-w-0 pt-9 md:pt-12" aria-labelledby="konserter-tittel">
            <SectionHeading
              id="konserter-tittel"
              title="Konserter"
              link={{ to: "/konserter", label: concertCount > 3 ? `Se alle ${concertCount}` : "Se alle" }}
            />
            <ConcertList maxEvents={3} />
          </section>

          {/* Musikk */}
          <section className="min-w-0 pt-9 md:pt-12" aria-labelledby="musikk-tittel">
            <SectionHeading id="musikk-tittel" title="Musikk" />
            <SpotifyWidget url={SPOTIFY_ARTIST_URL} title="Vågal på Spotify" theme="dark" cover={latest?.coverImage} />
            <div className="mt-2.5 grid grid-cols-2 gap-2.5 lg:grid-cols-1">
              <a
                href={SPOTIFY_ARTIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline px-3"
                aria-label="Åpne Vågal i Spotify (åpnes i ny fane)"
              >
                <ServiceIcon name="spotify" size={20} className="text-[#1DB954]" />
                Åpne i Spotify
              </a>
              <Link to="/diskografi" className="btn-outline px-3">
                Alle utgivelser
              </Link>
            </div>
          </section>
        </div>

        {/* Siste utgivelser */}
        <section className="pt-9 md:pt-12" aria-labelledby="utgivelser-tittel">
          <SectionHeading
            id="utgivelser-tittel"
            title="Siste utgivelser"
            link={{ to: "/diskografi", label: "Diskografi" }}
          />
          <ReleaseRail limit={4} />
        </section>

        {/* Om Vågal: who, where from, what, in plain sentences */}
        <section className="pt-9 md:pt-12" aria-labelledby="om-tittel">
          <SectionHeading id="om-tittel" title="Om Vågal" link={{ to: "/bandet", label: "Møt bandet" }} />
          <p className="max-w-3xl text-[16.5px] leading-relaxed md:text-lg">{ABOUT[0]}</p>
        </section>

        <div className="lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-x-10">
          {/* Musikkvideo */}
          <section className="min-w-0 pt-9 md:pt-12" aria-labelledby="video-tittel">
            <SectionHeading id="video-tittel" title="Siste musikkvideo" />
            <YouTubeWidget url={video.url} title={`Vågal – ${video.title} (musikkvideo)`} />
          </section>

          {/* Merch + booking */}
          <div className="grid min-w-0 gap-3 pt-9 md:grid-cols-2 md:gap-5 md:pt-12 lg:grid-cols-1 lg:content-start lg:gap-3 lg:pt-[92px]">
            <section
              className="rounded-none border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
              aria-labelledby="merch-tittel"
            >
              <h2 id="merch-tittel" className="font-condensed text-[26px] font-bold uppercase leading-none">
                Offisiell merch
              </h2>
              <p className="mt-2 text-[15.5px] text-[var(--color-muted)]">
                T-skjorter, hettegensere og mer – bestilles direkte fra oss.
              </p>
              <Link to="/merch" className="btn-outline mt-4 w-full">
                Bestill merch
              </Link>
            </section>
            <BookingCard />
          </div>
        </div>
      </div>
    </>
  )
}
