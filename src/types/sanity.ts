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
  /** Address of the song page (vaagalband.no/<slug>). Falls back to a slug made from the title. */
  slug?: { current?: string } | null
  /** Artist credit for collaborations, e.g. "Vågal, Endless" */
  artistLine?: string | null
  releaseType?: 'single' | 'EP' | 'album'
  coverImage: SanityImageSource
  releaseDate: string
  /** Optional short text about the song (Norwegian) */
  description?: string | null
  /** Pre-save link shown on the song page until the release date */
  presaveUrl?: string | null
  spotifyUrl?: string
  appleMusicUrl?: string
  youtubeUrl?: string
  tidalUrl?: string | null
  deezerUrl?: string | null
  amazonMusicUrl?: string | null
  isLatest?: boolean
}

/**
 * Portable text block structure for rich text content
 */
export interface PortableTextBlock {
  _type: string
  _key: string
  children: {
    _type: string
    _key: string
    text: string
    marks?: string[]
  }[]
  markDefs?: unknown[]
  style?: string
}

/**
 * Promoter materials content from Sanity CMS
 * Used by usePromoterMaterials hook and Arrangoerer page
 */
export interface PromoterMaterials {
  _id: string
  technicalRider?: string // URL from asset
  hospitalityRider?: PortableTextBlock[]
  bandBioShort?: string
  bandBioLong?: PortableTextBlock[]
  pressPhotos?: SanityImageSource[]
  logoFiles?: string[] // URLs from assets
  googleDriveUrl?: string
  contactEmail?: string
  contactPhone?: string
}
