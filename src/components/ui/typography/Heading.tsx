import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const headingVariants = cva('font-sans font-bold text-foreground tracking-tight', {
  variants: {
    level: {
      h1: 'text-5xl leading-tight',
      h2: 'text-4xl leading-tight',
      h3: 'text-3xl leading-normal',
      h4: 'text-2xl leading-normal',
      h5: 'text-xl leading-normal',
      h6: 'text-lg leading-normal',
    },
    gradient: {
      true: 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent',
      false: '',
    },
    glow: {
      true: 'text-glow',
      false: '',
    },
  },
  defaultVariants: {
    level: 'h1',
    gradient: false,
    glow: false,
  },
})

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 'h1', gradient, glow, ...props }, ref) => {
    const Comp = level
    return (
      <Comp
        ref={ref}
        className={cn(headingVariants({ level, gradient, glow, className }))}
        {...props}
      />
    )
  }
)
Heading.displayName = 'Heading'

export { Heading, headingVariants }
