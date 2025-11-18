import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-badge border-strong px-badge-x py-badge-y text-xs font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-display tracking-wide shadow-sm',
  {
    variants: {
      variant: {
        default:
          'border-vibrant-pink/30 bg-gradient-accent-warm text-white hover:shadow-accent-strong hover:scale-[var(--animation-scale-hover)]',
        secondary:
          'border-soft-lavender bg-soft-lavender text-vibrant-purple hover:bg-soft-pink hover:shadow-md',
        success:
          'border-vibrant-green/50 bg-soft-mint text-vibrant-green hover:shadow-md',
        warning:
          'border-vibrant-yellow/50 bg-soft-lemon text-vibrant-yellow hover:shadow-md',
        error:
          'border-vibrant-pink/50 bg-soft-pink text-vibrant-pink hover:shadow-accent-strong',
        info: 'border-vibrant-cyan/50 bg-soft-sky text-vibrant-cyan hover:shadow-md',
        outline: 'border-vibrant-purple text-vibrant-purple bg-transparent hover:bg-soft-lavender',
        vibrant: 'border-transparent bg-gradient-primary text-white hover:shadow-accent-multi hover:scale-[var(--animation-scale-hover)]',
        brand: 'border-brand-primary/30 bg-gradient-brand text-white hover:shadow-accent-combined hover:scale-[var(--animation-scale-hover)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
