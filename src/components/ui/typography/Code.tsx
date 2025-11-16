import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const codeVariants = cva(
  'font-mono rounded-sm px-1.5 py-0.5 border',
  {
    variants: {
      variant: {
        default: 'bg-terminal-black-light border-terminal-gray-700 text-terminal-green',
        inline: 'bg-terminal-gray-800 border-terminal-gray-600 text-terminal-cyan text-sm',
        block: 'block w-full p-4 bg-terminal-black-light border-terminal-gray-700 text-terminal-green overflow-x-auto',
      },
      size: {
        sm: 'text-xs',
        base: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'base',
    },
  }
)

export interface CodeProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof codeVariants> {}

const Code = React.forwardRef<HTMLElement, CodeProps>(
  ({ className, variant, size, ...props }, ref) => {
    const Comp = variant === 'block' ? 'pre' : 'code'
    return (
      <Comp
        ref={ref as any}
        className={cn(codeVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Code.displayName = 'Code'

export { Code, codeVariants }
