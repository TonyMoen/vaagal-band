import React from "react";
import BandMember from "../components/BandMember";

/* Placeholder image - Add image for each member */
import personImg from "../assets/person.jpg";

/* Facts for each band members */
const members = [
  {
    name: "Sondre Gautefald",
    alias: "Mr Caravan",
    instrument: "Multiinstrument",
    inspiration: "Iron Maiden",
    interest: {
      hobby: "Ski",
      food: "Taco",
    },
    image: personImg,
  },
  {
    name: "Marius Presthaug",
    alias: "The Voice",
    instrument: "Vokalist",
    inspiration: "Beyoncé",
    interest: {
      hobby: "Painting",
      food: "Pizza",
    },
    image: personImg,
  },
  {
    name: "Truls Venmann",
    alias: "Truls Venmann",
    instrument: "Trommeslager",
    inspiration: "Beyoncé",
    interest: {
      hobby: "Painting",
      food: "Pizza",
    },
    image: personImg,
  },
  {
    name: "Torstein Vala",
    alias: "The Voice",
    instrument: "Gitarist",
    inspiration: "Beyoncé",
    interest: {
      hobby: "Painting",
      food: "Pizza",
    },
    image: personImg,
  },
  {
    name: "Tony Portås Moen",
    alias: "The Voice",
    instrument: "Bassist",
    inspiration: "Beyoncé",
    interest: {
      hobby: "Painting",
      food: "Pizza",
    },
    image: personImg,
  },
];

/* Displays all band members */
const Bandet: React.FC = () => {
  return (
    <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((m) => (
        <BandMember key={m.name} member={m} />
      ))}
    </main>
  );
};

export default Bandet;
