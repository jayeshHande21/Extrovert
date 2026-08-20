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
        'inline-flex h-12 w-full items-center justify-center rounded-[12px] px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60',
        variant === 'primary' && 'bg-ext-accent text-white',
        variant === 'ghost' && 'border border-ext-border bg-transparent text-ext-text',
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
