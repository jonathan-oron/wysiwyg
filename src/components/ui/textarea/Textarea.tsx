import * as React from 'react'

import { cn } from '@/lib/utils'

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[120px] w-full rounded-xl border-2 border-soft-lavender bg-input px-4 py-3 text-sm ring-offset-background',
          'font-sans text-foreground placeholder:text-muted-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vibrant-purple focus-visible:ring-offset-2 focus-visible:shadow-accent-medium focus-visible:border-vibrant-purple',
          'hover:border-vibrant-purple/50 hover:shadow-sm',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted',
          'resize-y transition-all duration-200',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
