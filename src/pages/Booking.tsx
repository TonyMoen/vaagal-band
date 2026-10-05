import { Link } from "react-router-dom"
import { Check } from "lucide-react"
import SEO from "../components/SEO"
import JsonLd from "../components/JsonLd"
import BookingCard from "../components/BookingCard"
import FaqList from "../components/FaqList"
import ReleaseRail from "../components/ReleaseRail"
import SectionHeading from "../components/SectionHeading"
import { PageHero } from "@/components/PageHero"
import { usePastConcerts } from "@/hooks/useConcerts"
import { useBandMembers } from "@/hooks/useBandMembers"
import { BAND, BOOKING_FAQ, HIGHLIGHTS, memberSentence } from "@/lib/band"
import { playedAt } from "@/lib/concerts"
import { bandNode, breadcrumbNode, faqNode, graph } from "@/lib/schema"

/**
 * Booking page for organisers: festivals, bygdefester, pubs, company parties,
 * Christmas parties and weddings. Written in the words they search with
 * ("populært bygdeband", "festband", "band til fest", "band til bygdefest").
 */
export default function Booking() {
  const { data: past } = usePastConcerts()
  const { data: members } = useBandMembers()
  const venues = playedAt(past ?? [], 24)

  const delivers = [
    "Egne låter – bygderock og norsk country, laget for allsang og dans",
    `Konsert på ${BAND.setLength}`,
    members?.length ? `Fire musikere: ${memberSentence(members)}` : "Fire musikere: vokal, gitar, bass og trommer",
    "Vi spiller over hele Norge – bandet holder til på Notodden i Telemark",
    "Teknisk rider og hospitality-rider klare til arrangøren",
  ]

  return (
    <>
      <SEO
        title="Book Vågal – populært band til fest, bygdefest og festival"
        rawTitle
        description="Book Vågal, et populært bygdeband og festband fra Notodden: bygderock og norsk country med allsang, 2 × 45 minutter, over hele Norge. Band til festival, bygdefest, firmafest, julebord og bryllup."
        url="/booking"
      />
      <JsonLd
        data={graph(
          bandNode({ members: members ?? [] }),
          faqNode(BOOKING_FAQ),
          breadcrumbNode([
            { name: "Hjem", path: "/" },
            { name: "Booking", path: "/booking" },
          ])
        )}
      />
      <PageHero title="BOOK VÅGAL" subtitle="Populært bygdeband og festband til festival, bygdefest og firmafest" />

      <div className="container-page py-6 md:py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            <p className="max-w-3xl text-[16.5px] leading-relaxed md:text-lg">
              Vågal er et av Norges mest populære nye bygdeband – et festband fra Notodden som spiller bygderock og
              norsk country, med egne låter, allsang og fullt trøkk. Trenger dere et band til fest? Vi spiller over
              hele Norge, på {BAND.eventTypes.slice(0, -1).join(", ")} og {BAND.eventTypes[BAND.eventTypes.length - 1]}.
            </p>

            <section className="mt-9" aria-labelledby="hvorfor-vagal">
              <h2 id="hvorfor-vagal" className="section-title mb-4">
                Hvorfor Vågal?
              </h2>
              <ul className="grid gap-3">
                {HIGHLIGHTS.map((line) => (
                  <li key={line} className="flex gap-3 text-[16px] leading-snug">
                    <Check className="mt-0.5 h-5 w-5 flex-none text-[var(--color-accent-hover)]" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10" aria-labelledby="dette-far-dere">
              <h2 id="dette-far-dere" className="section-title mb-4">
                Dette får dere
              </h2>
              <ul className="grid gap-3">
                {delivers.map((line) => (
                  <li key={line} className="flex gap-3 text-[16px] leading-snug">
                    <Check className="mt-0.5 h-5 w-5 flex-none text-[var(--color-accent-hover)]" aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>

            {venues.length > 0 && (
              <section className="mt-10" aria-labelledby="her-har-vi-spilt">
                <h2 id="her-har-vi-spilt" className="section-title mb-4">
                  Her har vi spilt
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {venues.map((venue) => (
                    <li
                      key={venue}
                      className="border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[14.5px]"
                    >
                      {venue}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/konserter"
                  className="mt-3 inline-flex min-h-[44px] items-center text-[15px] font-semibold text-[var(--color-accent-hover)] hover:underline"
                >
                  Alle konserter, kommende og tidligere &rarr;
                </Link>
              </section>
            )}

            <section className="mt-10" aria-labelledby="sporsmal">
              <h2 id="sporsmal" className="section-title mb-4">
                Spørsmål fra arrangører
              </h2>
              <FaqList items={BOOKING_FAQ} />
            </section>

            {/* The organisers' material (/arrangor) is shared only with booked organisers, so no link here */}
            <section className="mt-10" aria-labelledby="materiell">
              <h2 id="materiell" className="section-title mb-3">
                Rider og pressemateriell
              </h2>
              <p className="max-w-2xl text-[16px] text-[var(--color-muted)]">
                Teknisk rider, hospitality-rider, pressebilder, logoer og ferdig tekst til arrangementet får dere
                tilsendt når konserten er booket.
              </p>
            </section>
          </div>

          <aside className="grid min-w-0 content-start gap-4">
            <BookingCard showMore={false} />
            <div className="rounded-none border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <h2 className="font-condensed text-[22px] font-bold uppercase leading-none">Skriv til oss</h2>
              <p className="mt-2 text-[15.5px] text-[var(--color-muted)]">
                Spørsmål om dato, reise eller opplegg? Send en melding, så svarer bandet selv.
              </p>
              <Link to="/kontakt-oss" className="btn-outline mt-4 w-full">
                Send melding
              </Link>
            </div>
          </aside>
        </div>

        <section className="mt-12" aria-labelledby="hor-oss">
          <SectionHeading id="hor-oss" title="Hør oss først" link={{ to: "/diskografi", label: "Alle låter" }} />
          <ReleaseRail limit={4} />
        </section>
      </div>
    </>
  )
}
