// TypeScript type definitions for Sanity CMS content

import type { SanityImageSource } from '@/lib/sanity/image'

/**
 * Hero content from Sanity CMS
 * Used by useHero hook and Hero component
 */
export interface HeroContent {
  _id: string
  title: string
  subtitle: string
  image: SanityImageSource
}

// Story 2.3: BandMember type will be added here
