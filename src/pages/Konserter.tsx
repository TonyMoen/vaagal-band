import ConcertList from "../components/ConcertList"
import PastConcerts from "../components/PastConcerts"
import BookingCard from "../components/BookingCard"
import JsonLd from "../components/JsonLd"
import { PageHero } from "@/components/PageHero"
import SEO from "../components/SEO"
import { useConcerts } from "@/hooks/useConcerts"
import { BANDSINTOWN_URL } from "@/lib/concerts"
import { FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/links"
import { breadcrumbNode, eventNode, graph } from "@/lib/schema"

export default function Konserter() {
  const { data: concerts } = useConcerts()

  return (
    <>
      <SEO
        title="Konserter"
        description="Se når og hvor Vågal spiller bygderock og norsk country live: kommende konserter med datoer, steder og billetter, og festivalene og bygdefestene vi har spilt på."
        url="/konserter"
      />
      <JsonLd
        data={graph(
          ...(concerts ?? []).map(eventNode),
          breadcrumbNode([
            { name: "Hjem", path: "/" },
            { name: "Konserter", path: "/konserter" },
          ])
        )}
      />
      <PageHero title="KONSERTER" subtitle="Kommende konserter og festivaler" />
      <section className="container-page py-8 md:py-14">
        {/* grid-cols-1 (= minmax(0,1fr)) keeps a long title from stretching the column past the screen */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <ConcertList groupByMonth />

            <section className="mt-12" aria-labelledby="tidligere">
              <h2 id="tidligere" className="section-title mb-4">
                Tidligere konserter
              </h2>
              <PastConcerts />
            </section>
          </div>

          <aside className="grid min-w-0 content-start gap-4 md:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-none border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <h2 className="font-condensed text-[26px] font-bold uppercase leading-none">Få varsel</h2>
              <p className="mt-2 text-[15.5px] text-[var(--color-muted)]">
                Følg oss for billettslipp og nye datoer.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline px-3"
                  aria-label="Følg oss på Instagram (åpnes i ny fane)"
                >
                  Instagram
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline px-3"
                  aria-label="Følg oss på Facebook (åpnes i ny fane)"
                >
                  Facebook
                </a>
                <a
                  href={BANDSINTOWN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline col-span-2 px-3"
                  aria-label="Følg oss på Bandsintown (åpnes i ny fane)"
                >
                  Følg på Bandsintown
                </a>
              </div>
            </div>

            <BookingCard />
          </aside>
        </div>
      </section>
    </>
  )
}
