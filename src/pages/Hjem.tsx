import Hero from "../components/Hero"
import SpotifyEmbed from "../components/SpotifyWidget"
import BandsintownWidget from "../components/BandsintownWidget"
import YouTubeEmbed from "../components/YoutubeWidget"
import SEO from "../components/SEO"
import StructuredData from "../components/StructuredData"

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
            <BandsintownWidget />
          </div>

          <aside className="self-start">
            <div className="card-surface">
              <SpotifyEmbed
                url="https://open.spotify.com/artist/5M9ZQMR3vvDdLgv1D43MO9?si=CPT7wksQQI22VfUK42qozA"
                title="Vågal på Spotify"
                height={520}
                theme="dark"
              />
            </div>
          </aside>

          <div className="md:col-span-3">
            <YouTubeEmbed
              url="https://youtu.be/5RKw6rMlKwg?si=29CXXAN4GDDHLG2s"
              title="Vågal Øst til Vest"
            />
          </div>
        </div>
      </section>
    </>
  );
}
