import React from "react";

type Member = {
  name: string;
  alias: string;
  instrument: string;
  inspiration: string;
  interest: {
    hobby: string;
    food: string;
  };
  image: string;
};

type Props = {
  member: Member;
};

const BandMember: React.FC<Props> = ({ member }) => {
  return (
    <div className="rounded-2xl shadow-lg p-4 bg-white max-w-sm">
      <img
        src={member.image}
        alt={member.name}
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      <h2 className="text-xl font-bold">{member.name}</h2>
      <p className="text-gray-600 italic">{member.alias}</p>
      <ul className="mt-3 text-gray-700 space-y-1">
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
  );
};

export default BandMember;
