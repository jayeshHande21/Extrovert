import type { SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

type SelectOption = {
  value: string
  label: string
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export function Select({
  id,
  label,
  error,
  options,
  placeholder = 'Select',
  className,
  disabled,
  ...props
}: SelectProps) {
  const fieldId = id ?? props.name
  const errorId = error && fieldId ? `${fieldId}-error` : undefined

  return (
    <div className="relative">
      <select
        {...props}
        id={fieldId}
        aria-describedby={errorId}
        aria-invalid={Boolean(error) || undefined}
        className={cn(
          'peer h-14 w-full appearance-none rounded-[10px] border border-ext-border bg-transparent px-[18px] pt-[18px] pr-10 pb-2 text-[17px] text-ext-text outline-none transition-colors focus:border-ext-accent disabled:cursor-not-allowed disabled:opacity-40',
          error && 'border-ext-danger focus:border-ext-danger',
          className,
        )}
        disabled={disabled}
      >
        <option className="bg-ext-surface text-ext-muted" value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            className="bg-ext-surface text-ext-text"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      <label
        className="pointer-events-none absolute top-[9px] left-[18px] font-mono text-[10px] tracking-[0.12em] text-ext-muted uppercase peer-focus:text-ext-accent"
        htmlFor={fieldId}
      >
        {label}
      </label>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ext-muted"
      />
      {error ? (
        <span className="mt-2 block text-xs text-ext-danger" id={errorId} role="alert">
          {error}
        </span>
      ) : null}
    </div>
  )
}
