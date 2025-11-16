import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-display tracking-wide',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-accent-warm text-white hover:shadow-accent-combined hover:scale-105 border-2 border-vibrant-pink/30',
        destructive:
          'bg-gradient-to-r from-vibrant-pink to-error text-white hover:shadow-accent-strong hover:scale-105 border-2 border-error/30',
        outline:
          'border-2 border-vibrant-purple bg-background hover:bg-gradient-soft hover:border-brand-primary hover:shadow-accent-medium',
        secondary:
          'bg-soft-lavender text-vibrant-purple hover:bg-soft-pink hover:shadow-md border-2 border-soft-lavender',
        ghost: 'hover:bg-gradient-soft hover:text-vibrant-purple hover:shadow-sm',
        link: 'text-vibrant-pink underline-offset-4 hover:underline hover:text-vibrant-purple',
        vibrant:
          'bg-gradient-primary text-white hover:shadow-accent-multi hover:scale-105 border-2 border-white/20 animate-shimmer',
        brand:
          'bg-gradient-brand text-white hover:shadow-accent-combined hover:scale-105 border-2 border-brand-primary/30 animate-shimmer',
      },
      size: {
        default: 'h-12 px-6 py-3',
        sm: 'h-10 rounded-xl px-4',
        lg: 'h-14 rounded-3xl px-10 text-base',
        icon: 'h-12 w-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
