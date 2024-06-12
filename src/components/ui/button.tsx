import * as React from 'react'
import { twMerge } from 'tailwind-merge'
import { VariantProps, tv } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'inline-flex items-center text-sm justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ring-offset-background focus:ring-primary disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      default: 'bg-primary text-white',
      secondary: 'bg-zinc-900 text-white',
      outline: 'border ',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-8 rounded-lg px-3',
      xs: 'h-6 rounded px-2 text-xs',
      lg: 'h-11 rounded-lg px-8',
      icon: 'size-8',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
})

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={twMerge(buttonVariants({ size, variant, className }))}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }
