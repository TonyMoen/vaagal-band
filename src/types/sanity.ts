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

/**
 * Band member content from Sanity CMS
 * Used by useBandMembers hook and BandMember component
 */
export interface BandMember {
  _id: string
  name: string
  alias?: string
  instrument?: string
  inspiration?: string
  hobby?: string
  food?: string
  bio?: string
  image?: SanityImageSource
  order?: number
}

/**
 * Music release content from Sanity CMS
 * Used by useReleases hook and Discography components
 */
export interface Release {
  _id: string
  title: string
  releaseType?: 'single' | 'EP' | 'album'
  coverImage: SanityImageSource
  releaseDate: string
  spotifyUrl?: string
  appleMusicUrl?: string
  youtubeUrl?: string
  isLatest?: boolean
}
