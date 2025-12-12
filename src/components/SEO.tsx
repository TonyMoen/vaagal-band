import { Helmet } from "react-helmet-async"

interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
  noindex?: boolean
}

const SITE_NAME = "Vågal"
const BASE_URL = "https://vaagal.no"
const DEFAULT_OG_IMAGE = "/assets/hero-1920.jpg"

export default function SEO({ title, description, image, url, noindex }: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const canonicalUrl = url ? `${BASE_URL}${url}` : undefined
  const ogImage = image ? `${BASE_URL}${image}` : `${BASE_URL}${DEFAULT_OG_IMAGE}`

  return (
    <Helmet>
      {/* Norwegian language targeting */}
      <html lang="nb" />
      <meta name="language" content="Norwegian" />

      {/* Core meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Robots directive for hidden pages */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {canonicalUrl && <link rel="alternate" hrefLang="nb" href={canonicalUrl} />}

      {/* Open Graph tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:type" content="website" />
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
