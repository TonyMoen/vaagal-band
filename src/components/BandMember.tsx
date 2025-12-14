import React from "react";
import { urlFor } from "@/lib/sanity/image";
import type { BandMember as BandMemberType } from "@/types/sanity";

type Props = {
  member: BandMemberType;
};

const BandMember: React.FC<Props> = ({ member }) => {
  return (
    <section
      className="relative overflow-hidden rounded-none"
      aria-labelledby={`${member.name}-heading`}
    >
      {member.image && (
        <img
          src={urlFor(member.image).width(800).url()}
          alt={member.name}
          className="w-full object-cover h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px]"
        />
      )}

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Text overlay on image */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h2 id={`${member.name}-heading`} className="text-2xl font-bold text-white">
          {member.name}
        </h2>

        {member.alias && member.alias !== member.name && (
          <p className="mt-1 italic text-white/70">{member.alias}</p>
        )}

        {member.instrument && (
          <p className="mt-2 text-sm font-medium text-[var(--color-accent)]">
            {member.instrument}
          </p>
        )}
      </div>
    </section>
  );
};

export default BandMember;
