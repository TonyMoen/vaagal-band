import type { ShopifyProduct } from '@/types/shopify'
import { ExternalLink } from 'lucide-react'

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
    <a
      href={product.onlineStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-none bg-[var(--color-surface)] border border-[var(--color-border)] transition-colors hover:border-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
    >
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
      <div className="p-4">
        <h3 className="font-condensed text-lg text-[var(--color-text)] line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
          {product.title}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[var(--color-muted)] font-medium">
            {formatPrice(price.amount, price.currencyCode)}
          </span>
          <ExternalLink className="h-4 w-4 text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </a>
  )
}
