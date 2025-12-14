import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ErrorMessageProps {
  message: string
  retry?: () => void
  className?: string
}

export function ErrorMessage({ message, retry, className }: ErrorMessageProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-none bg-card p-4',
        className
      )}
      role="alert"
    >
      <div className="flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-destructive" />
        <p className="text-foreground">{message}</p>
      </div>
      {retry && (
        <Button
          variant="outline"
          onClick={retry}
          className="min-h-[44px] min-w-[44px]"
        >
          Try Again
        </Button>
      )}
    </div>
  )
}
