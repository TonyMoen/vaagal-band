import { useHero } from '@/hooks/useHero'
import { urlFor } from '@/lib/sanity/image'
import { LoadingSpinner } from './LoadingSpinner'
import heroImg from '../assets/hero-1920.jpg'

type Props = {
  /** Override image source (fallback if CMS unavailable) */
  src?: string
  /** Image alt text (fallback if CMS unavailable) */
  alt?: string
  /** Show dark overlay on hero image */
  overlay?: boolean
  /** Skip CMS fetch and use provided props directly */
  skipCms?: boolean
}

export default function Hero({
  src = heroImg,
  alt = 'Vågal band',
  overlay = true,
  skipCms = false,
}: Props) {
  const { data, loading } = useHero()

  // Show loading state while fetching from CMS
  if (!skipCms && loading) {
    return (
      <section className="relative isolate min-h-[45svh] md:min-h-[65vh] flex items-center justify-center bg-[#0A0A0A]">
        <LoadingSpinner size="lg" />
      </section>
    )
  }

  // Determine image source: CMS image > prop > fallback
  const imageSrc = !skipCms && data?.image
    ? urlFor(data.image).width(1920).quality(80).url()
    : src

  // Determine alt text: CMS title > prop > fallback
  const imageAlt = !skipCms && data?.title ? data.title : alt

  return (
    <section className="relative isolate min-h-[45svh] md:min-h-[65vh]">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover object-[center_58%]"
        fetchPriority="high"
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-black/30 md:bg-black/35"
          aria-hidden="true"
        />
      )}
      {/* Display CMS title/subtitle if available */}
      {!skipCms && (data?.title || data?.subtitle) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          {data?.title && (
            <h1 className="font-bold text-5xl md:text-7xl lg:text-[120px] xl:text-[160px] text-[#F5F5F5] leading-none tracking-tight">
              {data.title}
            </h1>
          )}
          {data?.subtitle && (
            <p className="mt-4 text-xl md:text-2xl text-[#A3A3A3]">
              {data.subtitle}
            </p>
          )}
        </div>
      )}
    </section>
  )
}
