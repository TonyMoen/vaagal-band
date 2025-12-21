import type { ShopifyProduct } from '@/types/shopify'

interface ProductCardProps {
  product: ShopifyProduct
}

function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images.edges[0]?.node
  const price = product.priceRange.minVariantPrice

  return (
    <div className="group rounded-none bg-[var(--color-surface)] border border-[var(--color-border)] transition-colors hover:border-[var(--color-accent)]">
      <div className="relative aspect-square overflow-hidden bg-[var(--color-bg)]">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[var(--color-tertiary)]">
            <span className="text-[var(--color-muted)]">Bilde ikke tilgjengelig</span>
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-condensed text-lg text-[var(--color-text)] line-clamp-2">
          {product.title}
        </h3>
        <p className="text-xl font-bold text-[var(--color-text)]">
          {formatPrice(price.amount, price.currencyCode)}
        </p>
        <a
          href={product.onlineStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 text-center font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        >
          Kjøp nå
        </a>
      </div>
    </div>
  )
}
