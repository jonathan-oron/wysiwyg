import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const headingVariants = cva('font-display font-extrabold text-foreground tracking-tight', {
  variants: {
    level: {
      h1: 'text-6xl leading-tight',
      h2: 'text-5xl leading-tight',
      h3: 'text-4xl leading-normal',
      h4: 'text-3xl leading-normal',
      h5: 'text-2xl leading-normal',
      h6: 'text-xl leading-normal',
    },
    variant: {
      default: '',
      colorful: 'text-gradient-primary',
      brand: 'text-gradient-brand',
      soft: 'text-gradient-soft',
      pink: 'text-vibrant-pink',
      purple: 'text-vibrant-purple',
      blue: 'text-vibrant-blue',
    },
    glow: {
      true: 'text-glow-multi',
      false: '',
    },
  },
  defaultVariants: {
    level: 'h1',
    variant: 'default',
    glow: false,
  },
})

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = 'h1', variant, glow, ...props }, ref) => {
    const Comp = level
    return (
      <Comp
        ref={ref}
        className={cn(headingVariants({ level, variant, glow, className }))}
        {...props}
      />
    )
  }
)
Heading.displayName = 'Heading'

export { Heading, headingVariants }
