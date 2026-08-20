import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function TextField({
  id,
  label,
  error,
  className,
  ...props
}: TextFieldProps) {
  const fieldId = id ?? props.name

  return (
    <label className="block space-y-2" htmlFor={fieldId}>
      <span className="text-sm font-medium text-ext-text">{label}</span>
      <input
        id={fieldId}
        className={cn(
          'h-12 w-full rounded-[12px] border border-ext-border bg-ext-surface px-4 text-sm text-ext-text outline-none placeholder:text-ext-muted focus:border-ext-accent',
          error && 'border-ext-danger',
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs text-ext-danger">{error}</span> : null}
    </label>
  )
}
