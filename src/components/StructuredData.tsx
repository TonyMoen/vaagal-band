import { Helmet } from "react-helmet-async"

const BASE_URL = "https://vaagal.no"

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  "name": "Vågal",
  "description": "Bygderock fra Norge. Et rockeband som blander moderne rock med norske røtter.",
  "url": BASE_URL,
  "genre": ["Bygderock", "Rock"],
  "image": `${BASE_URL}/assets/hero-1920.jpg`,
  "foundingLocation": {
    "@type": "Place",
    "name": "Norge",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NO"
    }
  },
  "sameAs": [
    "https://open.spotify.com/artist/5M9ZQMR3vvDdLgv1D43MO9",
    "https://www.youtube.com/@vaagalband",
    "https://www.bandsintown.com/a/vaagal",
    "https://www.instagram.com/vaagal_band/",
    "https://www.facebook.com/vaagal.band.no/",
    "https://www.tiktok.com/@vaagalband"
  ]
}

export default function StructuredData() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}
