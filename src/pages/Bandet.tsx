import React, { useState } from "react"
import { ChevronDown } from "lucide-react"
import BandMember from "../components/BandMember"
import BookingCard from "../components/BookingCard"
import FaqList from "../components/FaqList"
import JsonLd from "../components/JsonLd"
import { useBandMembers } from "@/hooks/useBandMembers"
import { useReleases } from "@/hooks/useReleases"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ErrorMessage } from "@/components/ErrorMessage"
import { PageHero } from "@/components/PageHero"
import SEO from "../components/SEO"
import { ABOUT, bandFaq, memberSentence } from "@/lib/band"
import { bandNode, breadcrumbNode, faqNode, graph } from "@/lib/schema"
import { cn } from "@/lib/utils"

const Bandet: React.FC = () => {
  const { data, loading, error } = useBandMembers()
  const { data: releases } = useReleases()
  // On phones the rest of the story waits behind a button, so the faces fit on the first screen
  const [expanded, setExpanded] = useState(false)

  const members = data ?? []
  const faq = bandFaq(memberSentence(members))

  return (
    <>
      <SEO
        title="Bandet – populært bygdeband fra Notodden"
        description="Vågal er et av Norges mest populære nye bygdeband, startet på Notodden i 2023. Møt Marius Presthaug, Torstein Vala, Tony Portås og Truls Vennman – bygderock og norsk country med allsang."
        url="/bandet"
      />
      <JsonLd
        data={graph(
          bandNode({ members, releases: releases ?? [] }),
          faqNode(faq),
          breadcrumbNode([
            { name: "Hjem", path: "/" },
            { name: "Bandet", path: "/bandet" },
          ])
        )}
      />
      <PageHero title="BANDET" subtitle="Populært bygdeband fra Notodden" />
      <div className="container-page py-6 md:py-12">
        <section aria-labelledby="om-vagal" className="max-w-3xl text-[16.5px] leading-relaxed md:text-lg">
          <h2 id="om-vagal" className="sr-only">Om Vågal</h2>
          <p>{ABOUT[0]}</p>
          <div id="bandet-historie" className={cn("md:block", !expanded && "hidden")}>
            {ABOUT.slice(1).map((paragraph) => (
              <p key={paragraph} className="mt-4">
                {paragraph}
              </p>
            ))}
          </div>
          {!expanded && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-expanded={false}
              aria-controls="bandet-historie"
              className="inline-flex min-h-[44px] items-center gap-1 text-[15px] font-semibold text-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] md:hidden"
            >
              Les hele historien
              <ChevronDown className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
          )}
        </section>

        {loading ? (
          <LoadingSpinner size="lg" className="min-h-[200px]" />
        ) : error ? (
          <ErrorMessage message="Kunne ikke laste bandmedlemmene" />
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 md:mt-10 md:gap-5 lg:grid-cols-4">
            {members.map((m) => (
              <BandMember key={m._id} member={m} />
            ))}
          </div>
        )}

        <section className="mt-10 max-w-3xl md:mt-14" aria-labelledby="sporsmal">
          <h2 id="sporsmal" className="section-title mb-4">
            Spørsmål og svar
          </h2>
          <FaqList items={faq} />
        </section>

        <BookingCard className="mt-8 md:mt-12 md:max-w-md" />
      </div>
    </>
  );
};

export default Bandet;
