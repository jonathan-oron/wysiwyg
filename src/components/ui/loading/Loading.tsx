import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const loadingVariants = cva('', {
  variants: {
    variant: {
      spinner: 'animate-spin rounded-full border-2 border-current border-t-transparent',
      pulse: 'animate-pulse bg-terminal-gray-700 rounded',
      dots: 'flex gap-1',
    },
    size: {
      sm: '',
      default: '',
      lg: '',
    },
  },
  compoundVariants: [
    {
      variant: 'spinner',
      size: 'sm',
      className: 'h-4 w-4',
    },
    {
      variant: 'spinner',
      size: 'default',
      className: 'h-6 w-6',
    },
    {
      variant: 'spinner',
      size: 'lg',
      className: 'h-8 w-8',
    },
    {
      variant: 'pulse',
      size: 'sm',
      className: 'h-4',
    },
    {
      variant: 'pulse',
      size: 'default',
      className: 'h-6',
    },
    {
      variant: 'pulse',
      size: 'lg',
      className: 'h-8',
    },
  ],
  defaultVariants: {
    variant: 'spinner',
    size: 'default',
  },
})

export interface LoadingProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loadingVariants> {
  text?: string
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, variant, size, text, ...props }, ref) => {
    if (variant === 'dots') {
      return (
        <div
          ref={ref}
          className={cn('flex items-center gap-2', className)}
          {...props}
        >
          <div className={cn(loadingVariants({ variant }))}>
            <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="h-2 w-2 bg-primary rounded-full animate-bounce"></span>
          </div>
          {text && <span className="text-sm text-muted-foreground font-mono">{text}</span>}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        {...props}
      >
        <div
          className={cn(loadingVariants({ variant, size }), 'text-primary')}
          role="status"
          aria-label="Loading"
        />
        {text && <span className="text-sm text-muted-foreground font-mono">{text}</span>}
      </div>
    )
  }
)
Loading.displayName = 'Loading'

const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('animate-pulse rounded-md bg-terminal-gray-700', className)}
    {...props}
  />
))
Skeleton.displayName = 'Skeleton'

export { Loading, Skeleton, loadingVariants }
