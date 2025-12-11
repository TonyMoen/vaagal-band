import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './client'

// Define image source type for Sanity images
export interface SanityImageSource {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const builder = imageUrlBuilder(sanityClient as any)

/**
 * Generate optimized image URLs from Sanity image assets
 * @param source - Sanity image reference object
 * @returns Image URL builder with chainable methods
 *
 * @example
 * // Basic usage
 * urlFor(image).url()
 *
 * // With transformations
 * urlFor(image).width(800).url()
 * urlFor(image).width(400).height(300).fit('crop').url()
 * urlFor(image).width(800).format('webp').quality(80).url()
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
