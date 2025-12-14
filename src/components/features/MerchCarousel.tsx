import { useShopifyProducts } from '@/hooks/useShopifyProducts'
import { ProductCard } from '@/components/features/ProductCard'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { WidgetErrorBoundary } from '@/components/WidgetErrorBoundary'
import { Skeleton } from '@/components/ui/skeleton'

function MerchCarouselContent() {
  const { data: products, loading, error } = useShopifyProducts({ limit: 12, filterByArtist: 'Vågal' })

  if (loading) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="min-w-[280px] flex-shrink-0">
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
    <Carousel
      opts={{
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true,
      }}
    >
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-full sm:basis-1/2 lg:basis-1/4"
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export function MerchCarousel() {
  return (
    <WidgetErrorBoundary
      name="Merch"
      fallbackUrl="https://merchforbands.myshopify.com"
    >
      <MerchCarouselContent />
    </WidgetErrorBoundary>
  )
}
