import { cn } from "@/lib/utils"
import { useHero } from "@/hooks/useHero"
import { urlFor } from "@/lib/sanity/image"

interface PageHeroProps {
  title: string
  subtitle?: string
  className?: string
}

/**
 * PageHero component for interior pages (Bandet, Konserter, Kontakt)
 * Now with hero background image from Sanity CMS for visual consistency
 *
 * Features:
 * - 200-300px height (NOT full viewport like homepage)
 * - Hero background image from CMS with dark overlay
 * - Falls back to plain background if no CMS image
 * - Barlow Condensed font for title
 * - Responsive typography
 */
export function PageHero({
  title,
  subtitle,
  className,
}: PageHeroProps) {
  const { data: heroData } = useHero()

  // Get CMS image URL if available
  const backgroundImage = heroData?.image
    ? urlFor(heroData.image).width(1920).quality(80).url()
    : null

  return (
    <section
      className={cn(
        "relative flex min-h-[200px] items-center justify-center py-16 md:min-h-[280px] md:py-20 bg-[var(--color-bg)]",
        className
      )}
    >
      {backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-[center_58%]"
          />
          <div
            className="absolute inset-0 bg-black/60"
            aria-hidden="true"
          />
        </>
      )}
      <div className="relative text-center px-4">
        <h1 className="font-condensed text-4xl font-bold tracking-tight text-[var(--color-text)] md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-lg text-[var(--color-muted)] md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
