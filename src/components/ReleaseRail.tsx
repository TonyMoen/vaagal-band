import { useReleases } from "@/hooks/useReleases"
import { Skeleton } from "@/components/ui/skeleton"
import ReleaseCard from "@/components/ReleaseCard"

/**
 * The newest releases on the homepage. A swipeable rail on phones (the next
 * cover peeks in from the right, which is the hint that it scrolls) and a
 * plain row of four from md up. Renders nothing if Sanity has no releases.
 */
export default function ReleaseRail({ limit = 4 }: { limit?: number }) {
  const { data, loading } = useReleases()
  const releases = (data ?? []).slice(0, limit)

  if (!loading && releases.length === 0) return null

  return (
    <div
      className="no-scrollbar -mx-4 grid snap-x snap-mandatory scroll-px-4 auto-cols-[148px] grid-flow-col gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:grid-flow-row md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0"
      role="list"
      aria-label="Siste utgivelser"
    >
      {loading
        ? Array.from({ length: limit }, (_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-none" />
          ))
        : releases.map((release) => (
            <div key={release._id} role="listitem" className="min-w-0 snap-start">
              <ReleaseCard release={release} sizes="(min-width: 1264px) 285px, (min-width: 768px) 23vw, 148px" />
            </div>
          ))}
    </div>
  )
}
