import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type TermsCheckProps = {
  checked: boolean
  onToggle: () => void
  children: ReactNode
}

export function TermsCheck({ checked, onToggle, children }: TermsCheckProps) {
  return (
    <div className="flex items-start gap-3 text-sm text-ext-muted">
      <button
        aria-pressed={checked}
        className="mt-0.5 shrink-0 select-none"
        onClick={onToggle}
        type="button"
      >
        <span
          className={cn(
            'flex size-5 items-center justify-center rounded-[5px] border-[1.5px] border-white/35 transition-colors',
            checked && 'border-ext-accent bg-ext-accent',
          )}
        >
          <svg
            aria-hidden
            className={cn(
              'size-3 transition-all duration-150',
              checked ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
            )}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 12l6 6L20 6"
              stroke="#0a0a0a"
              strokeLinecap="round"
              strokeWidth="3"
            />
          </svg>
        </span>
      </button>
      <div
        className="min-w-0 cursor-pointer pt-px leading-5 select-none"
        onClick={onToggle}
      >
        {children}
      </div>
    </div>
  )
}
