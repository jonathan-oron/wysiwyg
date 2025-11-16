import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const iconVariants = cva('inline-flex shrink-0', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      default: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
    },
    color: {
      default: 'text-foreground',
      primary: 'text-primary',
      success: 'text-success',
      warning: 'text-warning',
      error: 'text-error',
      info: 'text-info',
      muted: 'text-muted-foreground',
    },
  },
  defaultVariants: {
    size: 'default',
    color: 'default',
  },
})

export interface IconProps
  extends Omit<React.SVGProps<SVGSVGElement>, 'size' | 'color'>,
    VariantProps<typeof iconVariants> {
  icon: LucideIcon
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size, color, icon: LucideIconComponent, ...props }, ref) => {
    return (
      <LucideIconComponent
        ref={ref}
        className={cn(iconVariants({ size, color, className }))}
        {...props}
      />
    )
  }
)
Icon.displayName = 'Icon'

export { Icon, iconVariants }
