import React, { useState } from "react"
import { ChevronDown } from "lucide-react"
import BandMember from "../components/BandMember"
import BookingCard from "../components/BookingCard"
import { useBandMembers } from "@/hooks/useBandMembers"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ErrorMessage } from "@/components/ErrorMessage"
import { PageHero } from "@/components/PageHero"
import SEO from "../components/SEO"
import { cn } from "@/lib/utils"

const Bandet: React.FC = () => {
  const { data, loading, error } = useBandMembers()
  // On phones the rest of the story waits behind a button, so the faces fit on the first screen
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <SEO
        title="Bandet"
        description="Møt medlemmene i Vågal - bygdebandet fra Norge som spiller bygderock, festcountry og norsk country."
        url="/bandet"
      />
      <PageHero title="BANDET" subtitle="Bygderock, festcountry og fullt trøkk" />
      <div className="container-page py-6 md:py-12">
        <div className="max-w-3xl text-[16.5px] leading-relaxed md:text-lg">
          <p>
            Vågal er bygdebandet som garanterer fullt trøkk fra første sekund!
            Med sin unike miks av bygderock, norsk country og festmusikk har
            Vågal på kort tid fått en stor og lojal lytterskare over hele Norge.
          </p>
          <p id="bandet-historie" className={cn("mt-4 md:block", !expanded && "hidden")}>
            Vågal kickstartet sin reise med første singel "Rådebank" som havnet
            rett på Spotify sin New Music Friday og lå i flere uker på Spotify
            topp 50 mest delte. «I baksetet i min Chevrolet» havnet på 7. plass
            på Spotify topp 50 mest delte. Deres energiske fremføringer og
            fengende festcountry skaper en uforglemmelig atmosfære, enten du er
            på konsert, festival eller bygdefest.
          </p>
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
        </div>

        {loading ? (
          <LoadingSpinner size="lg" className="min-h-[200px]" />
        ) : error ? (
          <ErrorMessage message="Kunne ikke laste bandmedlemmene" />
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-3 md:mt-10 md:gap-5 lg:grid-cols-4">
            {data?.map((m) => (
              <BandMember key={m._id} member={m} />
            ))}
          </div>
        )}

        <BookingCard className="mt-8 md:mt-12 md:max-w-md" />
      </div>
    </>
  );
};

export default Bandet;
