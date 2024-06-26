import * as React from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={twMerge(
          'flex h-10 w-full rounded-lg border bg-background px-3 py-2 text-sm placeholder:text-zinc-400 focus:ring-2 ring-offset-background focus:ring-offset-2 focus:ring-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
