import { cn } from "@/lib/utils"
import { useHero } from "@/hooks/useHero"
import { imageSrcSet, imageUrl } from "@/lib/sanity/image"

interface PageHeroProps {
  title: string
  subtitle?: string
  className?: string
}

/**
 * PageHero component for interior pages (Bandet, Konserter, Kontakt)
 * With hero background image from Sanity CMS for visual consistency
 *
 * Features:
 * - Compact: about 110px on phones, 190px on desktop, so the page's own
 *   content starts on the first screen
 * - Left aligned in the page container, like the song pages
 * - Hero background image from CMS with dark gradient
 * - Falls back to plain background if no CMS image
 * - Barlow Condensed font for title
 */
export function PageHero({
  title,
  subtitle,
  className,
}: PageHeroProps) {
  const { data: heroData } = useHero()

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg)]",
        className
      )}
    >
      {heroData?.image && (
        <>
          <img
            src={imageUrl(heroData.image, 1200)}
            srcSet={imageSrcSet(heroData.image, [480, 828, 1200, 1920])}
            sizes="100vw"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-[center_58%]"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0A0A0A] to-[#0A0A0A]/70"
            aria-hidden="true"
          />
        </>
      )}
      <div className="container-page pb-5 pt-8 md:pb-8 md:pt-14 lg:pt-16">
        <h1 className="font-condensed text-[46px] font-bold uppercase leading-[0.95] text-[var(--color-text)] md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-1.5 text-[15.5px] text-[var(--color-text)]/80 md:mt-2 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
