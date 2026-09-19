import React from "react";
import { imageSrcSet, imageUrl } from "@/lib/sanity/image";
import type { BandMember as BandMemberType } from "@/types/sanity";

type Props = {
  member: BandMemberType;
};

/** 4:5 portrait with name and instrument on the photo. Two fit side by side on a phone. */
const BandMember: React.FC<Props> = ({ member }) => {
  const headingId = `${member._id}-heading`;

  return (
    <section
      className="relative aspect-[4/5] overflow-hidden rounded-none bg-[var(--color-surface)]"
      aria-labelledby={headingId}
    >
      {member.image && (
        <img
          src={imageUrl(member.image, 520, { ratio: 1.25 })}
          srcSet={imageSrcSet(member.image, [260, 400, 520, 800], { ratio: 1.25 })}
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 25vw, 50vw"
          alt={member.name}
          width={520}
          height={650}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

      {/* Text overlay on image */}
      <div className="absolute inset-x-0 bottom-0 p-2.5 md:p-4">
        <h2
          id={headingId}
          className="font-condensed text-[22px] font-bold uppercase leading-none text-white md:text-3xl"
        >
          {member.name}
        </h2>

        {member.instrument && (
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-hover)] md:text-sm">
            {member.instrument}
          </p>
        )}
      </div>
    </section>
  );
};

export default BandMember;
