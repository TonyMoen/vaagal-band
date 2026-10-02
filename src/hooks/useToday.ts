import { useEffect, useState } from 'react'
import { osloToday } from '@/lib/songs'
import { getInitialData } from '@/lib/initialData'

/**
 * Today's date in Norway (YYYY-MM-DD). The first render uses the build's date,
 * so it matches the prebuilt HTML; it switches to the real date right after.
 * Use it for anything that says "new", "tonight" or "coming".
 */
export function useToday(): string {
  const [today, setToday] = useState(() => getInitialData()?.today ?? osloToday())
  useEffect(() => {
    setToday(osloToday())
  }, [])
  return today
}
