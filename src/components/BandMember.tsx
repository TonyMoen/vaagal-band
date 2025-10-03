import React from "react";

type Member = {
  name: string;
  alias: string;
  instrument: string;
  inspiration: string;
  interest: { hobby: string; food: string };
  image: string;
};

type Props = {
  member: Member;
  imageHeight: number;
};

const BandMember: React.FC<Props> = ({ member, imageHeight = 560 }) => {
  return (
    <section
      className="relative overflow-hidden rounded-2xl card-surface"
      aria-labelledby={`${member.name}-heading`}
    >
      <img
        src={member.image}
        alt={member.name}
        className="w-full object-cover"
        style={{ height: imageHeight }}
      />

      <div />

      <div>
        <div className="p-5">
          <h2 id={`${member.name}-heading`} className="text-xl font-semibold">
            {member.name}
          </h2>
          <div />

          <p className="mt-2 italic">{member.alias}</p>

          <ul className="mt-3 space-y-1 text-sm leading-6">
            <li>
              <strong>Instrument:</strong> {member.instrument}
            </li>
            <li>
              <strong>Inspiration:</strong> {member.inspiration}
            </li>
            <li>
              <strong>Hobby:</strong> {member.interest.hobby}
            </li>
            <li>
              <strong>Favorittmat:</strong> {member.interest.food}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BandMember;
