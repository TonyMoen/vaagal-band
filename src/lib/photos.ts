/**
 * Which band photos the pages show, and their <img src>. The structured data
 * names the same URLs, so search engines can match a photographer's credit
 * to the photo they found on the page.
 */
import { imageUrl, type SanityImageSource } from '@/lib/sanity/image'
import type { HeroContent, HeroPanel } from '@/types/sanity'

/** The hero's photos side by side: at least two, otherwise none and the hero shows its single image */
export function heroPanels(hero: HeroContent | null | undefined): HeroPanel[] {
  const panels = hero?.panels?.filter((panel) => panel?.asset) ?? []
  return panels.length > 1 ? panels : []
}

export const heroPanelSrc = (panel: HeroPanel) => imageUrl(panel, 600)

/** A member's 4:5 portrait on /bandet */
export const portraitSrc = (image: SanityImageSource) => imageUrl(image, 520, { ratio: 1.25 })
