import { Helmet } from "react-helmet-async"

interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
}

const SITE_NAME = "Vågal"
const BASE_URL = "https://vaagal.no" // Update to actual domain when deployed

export default function SEO({ title, description, url }: SEOProps) {
  const fullTitle = `${title} | ${SITE_NAME}`
  const canonicalUrl = url ? `${BASE_URL}${url}` : undefined

  return (
    <Helmet>
      {/* Norwegian language targeting */}
      <html lang="nb" />
      <meta name="language" content="Norwegian" />

      {/* Core meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {canonicalUrl && <link rel="alternate" hrefLang="nb" href={canonicalUrl} />}
    </Helmet>
  )
}
