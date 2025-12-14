import { Component, type ReactNode } from 'react'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WidgetErrorBoundaryProps {
  name: string
  fallbackUrl: string
  children: ReactNode
  className?: string
}

interface WidgetErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class WidgetErrorBoundary extends Component<
  WidgetErrorBoundaryProps,
  WidgetErrorBoundaryState
> {
  constructor(props: WidgetErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): WidgetErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(`[${this.props.name} Widget Error]:`, error)
    console.error('Component stack:', errorInfo.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className={cn(
            'flex flex-col items-center justify-center gap-3 rounded-none bg-card p-6 text-center',
            this.props.className
          )}
          role="alert"
        >
          <p className="text-muted-foreground">
            {this.props.name} is currently unavailable
          </p>
          <a
            href={this.props.fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-none border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Visit {this.props.name} directly
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )
    }

    return this.props.children
  }
}
