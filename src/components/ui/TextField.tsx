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
  placeholder,
  ...props
}: TextFieldProps) {
  const fieldId = id ?? props.name
  const errorId = error && fieldId ? `${fieldId}-error` : undefined

  return (
    <div className="relative">
      <input
        {...props}
        id={fieldId}
        aria-describedby={errorId}
        aria-invalid={Boolean(error) || undefined}
        className={cn(
          'peer h-14 w-full rounded-[10px] border border-ext-border bg-transparent px-[18px] pt-[18px] pb-2 text-[17px] text-ext-text outline-none transition-colors placeholder:text-transparent focus:border-ext-accent',
          error && 'border-ext-danger focus:border-ext-danger',
          className,
        )}
        placeholder={placeholder || ' '}
      />
      {label ? (
        <label
          className="pointer-events-none absolute top-[19px] left-[18px] font-mono text-[12px] tracking-[0.12em] text-ext-muted uppercase transition-all peer-[:not(:placeholder-shown)]:top-[9px] peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-ext-accent peer-focus:top-[9px] peer-focus:text-[10px] peer-focus:text-ext-accent"
          htmlFor={fieldId}
        >
          {label}
        </label>
      ) : null}
      {error ? (
        <span className="mt-2 block text-xs text-ext-danger" id={errorId} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}
