import { Helmet } from "react-helmet-async"
import { SITE_URL } from "@/lib/band"

interface SEOProps {
  title: string
  description: string
  /** Path on this site ("/og-image.jpg") or a full URL (e.g. a cover on the Sanity CDN) */
  image?: string
  url?: string
  noindex?: boolean
  /** Open Graph type. Song pages use "music.song". */
  type?: string
  /** Use the title as given instead of adding " | Vågal" (for titles that already lead with the band name) */
  rawTitle?: boolean
}

const SITE_NAME = "Vågal"
const DEFAULT_OG_IMAGE = "/og-image.jpg"

export default function SEO({ title, description, image, url, noindex, type = "website", rawTitle = false }: SEOProps) {
  const fullTitle = rawTitle ? title : `${title} | ${SITE_NAME}`
  const canonicalUrl = url ? `${SITE_URL}${url}` : undefined
  const ogImage = !image
    ? `${SITE_URL}${DEFAULT_OG_IMAGE}`
    : image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`

  return (
    <Helmet>
      <html lang="nb" />

      {/* Core meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Robots directive for hidden pages */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="nb_NO" />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
