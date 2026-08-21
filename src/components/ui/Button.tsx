import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Spinner } from '@/components/ui/Spinner'

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
  const isDisabled = Boolean(disabled || loading)
  const filled = variant === 'primary' && (!disabled || loading)

  return (
    <button
      className={cn(
        'relative inline-flex h-14 w-full items-center justify-center overflow-hidden rounded-[10px] px-4 text-[15px] font-bold tracking-[0.02em] transition-colors disabled:cursor-not-allowed',
        variant === 'primary' && 'bg-white/16 text-[#f5f3ef]/35',
        variant === 'primary' && filled && 'text-[#0a0a0a]',
        variant === 'ghost' &&
          'border border-ext-border bg-transparent text-ext-text hover:border-ext-text disabled:opacity-50',
        className,
      )}
      disabled={isDisabled}
      type={type}
      {...props}
    >
      {variant === 'primary' ? (
        <span
          aria-hidden
          className={cn(
            'absolute inset-0 bg-[#f5f3ef] transition-transform duration-[450ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none',
            filled ? 'translate-x-0' : '-translate-x-[101%]',
          )}
        />
      ) : null}
      <span className="relative z-10 inline-flex items-center justify-center">
        {loading ? (
          <Spinner
            className={
              variant === 'primary'
                ? 'border-black/20 border-t-black'
                : 'border-white/30 border-t-white'
            }
          />
        ) : (
          children
        )}
      </span>
    </button>
  )
}
