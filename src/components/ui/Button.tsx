import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  variant?: 'primary' | 'ghost'
}

export function Button({
  className,
  loading = false,
  variant = 'primary',
  disabled,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex h-14 w-full items-center justify-center rounded-[12px] px-4 text-sm font-bold tracking-wide uppercase transition disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' && 'bg-white text-black',
        variant === 'ghost' && 'border border-white bg-transparent text-white',
        className,
      )}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
