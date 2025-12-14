import { Link } from "react-router-dom"
import Hero from "../components/Hero"
import SpotifyWidget from "../components/SpotifyWidget"
import ConcertList from "../components/ConcertList"
import YouTubeWidget from "../components/YoutubeWidget"
import SEO from "../components/SEO"
import StructuredData from "../components/StructuredData"
import { MerchCarousel } from "@/components/features/MerchCarousel"

export default function Hjem() {
  return (
    <>
      <SEO
        title="Hjem"
        description="Vågal - Bygderock fra Norge. Hør musikken vår, se konserter og bli kjent med bandet."
        url="/"
      />
      <StructuredData />
      <section className="full-bleed">
        {/* Hero now fetches from CMS automatically, with fallback to local image */}
        <Hero alt="Bandbilde av Vågal" overlay={true} />
      </section>

      <section className="container-page py-10 md:py-14">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <ConcertList maxEvents={3} />
          </div>

          <aside className="self-start">
            <SpotifyWidget
              url="https://open.spotify.com/artist/5M9ZQMR3vvDdLgv1D43MO9?si=CPT7wksQQI22VfUK42qozA"
              title="Vågal på Spotify"
              height={520}
              theme="dark"
            />
          </aside>

          <div className="md:col-span-3 overflow-hidden">
            <h2 className="font-condensed text-2xl mb-4 text-[var(--color-text)]">Merch</h2>
            <MerchCarousel />
            <Link
              to="/merch"
              className="inline-flex mt-4 text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors"
            >
              Se alt &rarr;
            </Link>
          </div>

          <div className="md:col-span-3 mt-8">
            <YouTubeWidget
              url="https://youtu.be/5RKw6rMlKwg?si=29CXXAN4GDDHLG2s"
              title="Vågal Øst til Vest"
            />
          </div>
        </div>
      </section>
    </>
  );
}
