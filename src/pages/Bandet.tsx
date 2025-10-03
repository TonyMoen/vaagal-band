import React from "react";
import BandMember from "../components/BandMember";
import sondreImg from "../assets/sondre.jpg";
import mariusImg from "../assets/marius.jpg";
import torsteinImg from "../assets/torstein.jpg";
import tonyImg from "../assets/tony.jpg";
import trulsImg from "../assets/truls.jpg";

const members = [
  {
    name: "Marius Presthaug",
    alias: "Marius Presthaug",
    instrument: "Vokalist",
    inspiration: "Hellbillies, Plumbo",
    interest: { hobby: "Maling", food: "Fisk" },
    image: mariusImg,
  },

  {
    name: "Sondre Gautefald",
    alias: "Mr Caravan",
    instrument: "Multiinstrument",
    inspiration: "Iron Maiden",
    interest: { hobby: "Ski", food: "Taco" },
    image: sondreImg,
  },

  {
    name: "Truls Venmann",
    alias: "Truls Venmann",
    instrument: "Trommeslager",
    inspiration: "Vågal",
    interest: { hobby: "Musikk", food: "Pizza" },
    image: trulsImg,
  },
  {
    name: "Torstein Vala",
    alias: "Torstein Vala",
    instrument: "Gitarist",
    inspiration: "Vågal",
    interest: { hobby: "Musikk", food: "Pizza" },
    image: torsteinImg,
  },
  {
    name: "Tony Portås Moen",
    alias: "Tony Portås Moen",
    instrument: "Bassist",
    inspiration: "Beyoncé",
    interest: { hobby: "Musikk", food: "Pizza" },
    image: tonyImg,
  },
];

const Bandet: React.FC = () => {
  return (
    <main className="container-page py-10 md:py-14">
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
        {members.map((m) => (
          <BandMember key={m.name} member={m} imageHeight={600} />
        ))}
      </div>
    </main>
  );
};

export default Bandet;
