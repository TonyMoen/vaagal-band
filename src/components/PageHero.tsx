import { cn } from "@/lib/utils"

interface PageHeroProps {
  title: string
  subtitle?: string
  className?: string
}

/**
 * PageHero component for interior pages (Bandet, Konserter, Kontakt)
 * A simpler, shorter hero variant compared to the homepage CMS-powered Hero
 *
 * Features:
 * - 200-300px height (NOT full viewport like homepage)
 * - Dark background with centered text
 * - Barlow Condensed font for title
 * - Responsive typography
 */
export function PageHero({ title, subtitle, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-[200px] items-center justify-center bg-[var(--color-bg)] py-16 md:min-h-[280px] md:py-20",
        className
      )}
    >
      <div className="text-center px-4">
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
