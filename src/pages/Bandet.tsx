import React from "react"
import BandMember from "../components/BandMember"
import { useBandMembers } from "@/hooks/useBandMembers"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ErrorMessage } from "@/components/ErrorMessage"
import SEO from "../components/SEO"

const Bandet: React.FC = () => {
  const { data, loading, error } = useBandMembers()

  if (loading) {
    return (
      <main className="container-page py-10 md:py-14">
        <SEO
          title="Bandet"
          description="Møt medlemmene i Vågal - bygderock-bandet fra Norge. Les om musikerne bak musikken."
          url="/bandet"
        />
        <LoadingSpinner size="lg" className="min-h-[200px]" />
      </main>
    )
  }

  if (error) {
    return (
      <main className="container-page py-10 md:py-14">
        <SEO
          title="Bandet"
          description="Møt medlemmene i Vågal - bygderock-bandet fra Norge. Les om musikerne bak musikken."
          url="/bandet"
        />
        <ErrorMessage message="Could not load band members" />
      </main>
    )
  }

  return (
    <main className="container-page py-10 md:py-14">
      <SEO
        title="Bandet"
        description="Møt medlemmene i Vågal - bygderock-bandet fra Norge. Les om musikerne bak musikken."
        url="/bandet"
      />
      <h1 className="text-center mb-6 text-3xl md:text-5xl font-bold tracking-tight">
        BANDET
      </h1>
      <div className="align-text mb-8">
        <p>
          Vågal er bandet som garanterer fullt trøkk fra første sekund! Med sin
          unike miks av bygderock har Vågal på kort tid fått en stor og lojal
          lytterskare over hele Norge. Vågal kickstartet sin reise med første
          singel "Rådebank" som havnet rett på Spotify sin New Music Friday og
          lå i flere uker på Spotify topp 50 mest delte. «I baksetet i min
          Chevrolet» havnet på 7. plass på Spotify topp 50 mest delte. Deres
          energiske fremføringer og fengende låter skaper en uforglemmelig
          atmosfære, enten du er på konsert, festival eller bygdefest
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        {data?.map((m) => (
          <BandMember key={m._id} member={m} imageHeight={600} />
        ))}
      </div>
    </main>
  );
};

export default Bandet;
