import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: 'h-4 w-4',   // 16px
  md: 'h-6 w-6',   // 24px
  lg: 'h-8 w-8'   // 32px
}

export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <div
      className={cn('flex items-center justify-center', className)}
      role="status"
      aria-label="Loading"
    >
      <Loader2 className={cn('animate-spin text-primary', sizeMap[size])} />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
