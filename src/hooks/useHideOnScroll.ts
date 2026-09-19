import { useEffect, useState } from "react"

/**
 * True while the page is being scrolled down past `offset`, false again on the
 * first scroll up. The mobile header uses it to get out of the way of the content.
 */
export function useHideOnScroll(offset = 140) {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      // Ignore the few pixels of jitter a finger produces
      if (Math.abs(y - last) < 8) return
      setHidden(y > last && y > offset)
      last = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [offset])

  return hidden
}
