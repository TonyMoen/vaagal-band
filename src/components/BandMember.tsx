import React from "react";
import { urlFor } from "@/lib/sanity/image";
import type { BandMember as BandMemberType } from "@/types/sanity";

type Props = {
  member: BandMemberType;
  imageHeight?: number;
};

const BandMember: React.FC<Props> = ({ member, imageHeight = 560 }) => {
  return (
    <section
      className="relative overflow-hidden rounded-2xl card-surface"
      aria-labelledby={`${member.name}-heading`}
    >
      {member.image && (
        <img
          src={urlFor(member.image).width(800).url()}
          alt={member.name}
          className="w-full object-cover"
          style={{ height: imageHeight }}
        />
      )}

      <div className="p-5">
        <h2 id={`${member.name}-heading`} className="text-xl font-semibold">
          {member.name}
        </h2>

        {member.alias && member.alias !== member.name && (
          <p className="mt-2 italic">{member.alias}</p>
        )}

        <ul className="mt-3 space-y-1 text-sm leading-6">
          {member.instrument && (
            <li>
              <strong>Instrument:</strong> {member.instrument}
            </li>
          )}
          {member.inspiration && (
            <li>
              <strong>Inspiration:</strong> {member.inspiration}
            </li>
          )}
          {member.hobby && (
            <li>
              <strong>Hobby:</strong> {member.hobby}
            </li>
          )}
          {member.food && (
            <li>
              <strong>Favorittmat:</strong> {member.food}
            </li>
          )}
        </ul>
      </div>
    </section>
  );
};

export default BandMember;
