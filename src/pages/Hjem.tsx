import Hero from "../components/Hero";
import heroImg from "../assets/hero-1920.jpg";
import SpotifyEmbed from "../components/SpotifyWidget";
import BandsintownWidget from "../components/BandsintownWidget";
import YouTubeEmbed from "../components/YoutubeWidget";

export default function Hjem() {
  return (
    <>
      <section className="full-bleed">
        <Hero src={heroImg} alt="Bandbilde av Vågal" overlay={true} />
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
