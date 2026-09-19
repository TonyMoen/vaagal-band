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
import StructuredData from "../components/StructuredData"
import { useConcerts } from "@/hooks/useConcerts"
import { SPOTIFY_ARTIST_URL } from "@/lib/links"

/**
 * Homepage. One source order, read top to bottom on a phone: release, next gig,
 * concerts, music, releases, video, merch and booking. From lg the concerts and
 * the video each get the Spotify player / the cards beside them (2fr + 1fr).
 */
export default function Hjem() {
  const { data: concerts } = useConcerts()
  const concertCount = concerts?.length ?? 0

  return (
    <>
      <SEO
        title="Hjem"
        description="Vågal - norsk bygdeband med bygderock, festcountry og festmusikk. Hør musikken vår, se konserter og bli kjent med bandet."
        url="/"
      />
      <StructuredData />

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
            <SpotifyWidget url={SPOTIFY_ARTIST_URL} title="Vågal på Spotify" theme="dark" />
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

        <div className="lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-x-10">
          {/* Musikkvideo */}
          <section className="min-w-0 pt-9 md:pt-12" aria-labelledby="video-tittel">
            <SectionHeading id="video-tittel" title="Siste musikkvideo" />
            <YouTubeWidget
              url="https://youtu.be/5RKw6rMlKwg?si=29CXXAN4GDDHLG2s"
              title="Vågal – Øst til Vest (musikkvideo)"
            />
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
