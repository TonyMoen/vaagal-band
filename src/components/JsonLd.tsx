import { Helmet } from "react-helmet-async"

/** Structured data for the page head. Lands in the prebuilt HTML, so crawlers that don't run JavaScript read it too. */
export default function JsonLd({ data }: { data: object }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  )
}
