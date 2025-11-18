import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-input w-full rounded-input border-strong border-soft-lavender bg-input px-input-x py-input-y text-sm ring-offset-background',
          'font-sans text-foreground placeholder:text-muted-foreground',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-vibrant-purple',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vibrant-purple focus-visible:ring-offset-2 focus-visible:shadow-accent-medium focus-visible:border-vibrant-purple',
          'hover:border-vibrant-purple/50 hover:shadow-sm',
          'disabled:cursor-not-allowed disabled:opacity-disabled disabled:bg-muted',
          'transition-all duration-200',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
