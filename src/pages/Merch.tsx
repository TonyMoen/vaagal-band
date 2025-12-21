import { useShopifyProducts } from '@/hooks/useShopifyProducts'
import { ProductCard } from '@/components/features/ProductCard'
import { WidgetErrorBoundary } from '@/components/WidgetErrorBoundary'
import { Skeleton } from '@/components/ui/skeleton'
import SEO from '@/components/SEO'

function MerchGrid() {
  const { data: products, loading, error } = useShopifyProducts({ limit: 30, filterByArtist: 'Vågal' })

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="aspect-square w-full rounded-none" />
            <Skeleton className="mt-4 h-5 w-3/4 rounded-none" />
            <Skeleton className="mt-2 h-4 w-1/3 rounded-none" />
          </div>
        ))}
      </div>
    )
  }

  if (error || !products?.length) {
    throw error || new Error('No products available')
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default function Merch() {
  return (
    <>
      <SEO
        title="Merch"
        description="Kjop Vagal merch - t-skjorter, hettegensere og mer. Stott bandet og vis fram stilen din."
        url="/merch"
      />

      <section className="container-page py-10 md:py-14">
        <div className="mb-8">
          <h1 className="font-condensed text-4xl md:text-5xl text-[var(--color-text)]">
            Merch
          </h1>
        </div>

        <WidgetErrorBoundary
          name="Merch"
          fallbackUrl="https://merchforbands.myshopify.com"
        >
          <MerchGrid />
        </WidgetErrorBoundary>
      </section>
    </>
  )
}
