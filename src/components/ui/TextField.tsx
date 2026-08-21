import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
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
      {label ? (
        <span className="text-sm font-medium text-ext-text">{label}</span>
      ) : null}
      <input
        id={fieldId}
        className={cn(
          'h-14 w-full rounded-[10px] border border-ext-border bg-black px-4 text-sm text-white outline-none placeholder:text-ext-muted placeholder:uppercase focus:border-white',
          error && 'border-ext-danger',
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs text-ext-danger">{error}</span> : null}
    </label>
  )
}
