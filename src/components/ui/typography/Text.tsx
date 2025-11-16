import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textVariants = cva('text-foreground', {
  variants: {
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    muted: {
      true: 'text-muted-foreground',
      false: '',
    },
    mono: {
      true: 'font-mono',
      false: 'font-sans',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
    muted: false,
    mono: false,
  },
})

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div'
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, size, weight, muted, mono, as: Comp = 'p', ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={cn(textVariants({ size, weight, muted, mono, className }))}
        {...props}
      />
    )
  }
)
Text.displayName = 'Text'

export { Text, textVariants }
