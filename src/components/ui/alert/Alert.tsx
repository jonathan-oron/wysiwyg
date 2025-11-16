import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const alertVariants = cva(
  'relative w-full rounded-2xl border-2 p-5 shadow-md [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-5 [&>svg]:top-5 [&>svg]:text-foreground transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-soft-lavender text-foreground border-soft-lavender hover:shadow-lg',
        success:
          'border-vibrant-green/50 text-vibrant-green bg-soft-mint [&>svg]:text-vibrant-green hover:shadow-md hover:border-vibrant-green',
        warning:
          'border-vibrant-yellow/50 text-vibrant-yellow bg-soft-lemon [&>svg]:text-vibrant-yellow hover:shadow-md hover:border-vibrant-yellow',
        error:
          'border-vibrant-pink/50 text-vibrant-pink bg-soft-pink [&>svg]:text-vibrant-pink hover:shadow-accent-strong hover:border-vibrant-pink',
        info: 'border-vibrant-cyan/50 text-vibrant-cyan bg-soft-sky [&>svg]:text-vibrant-cyan hover:shadow-md hover:border-vibrant-cyan',
        accent: 'border-transparent bg-gradient-soft text-vibrant-purple [&>svg]:text-vibrant-purple hover:shadow-accent-multi',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = 'Alert'

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-bold leading-none tracking-tight font-display', className)}
    {...props}
  />
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed font-sans opacity-90', className)}
    {...props}
  />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertTitle, AlertDescription }
