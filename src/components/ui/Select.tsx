import type { SelectHTMLAttributes } from 'react'
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
  ...props
}: SelectProps) {
  const fieldId = id ?? props.name

  return (
    <label className="block space-y-2" htmlFor={fieldId}>
      <span className="text-sm font-medium text-ext-text">{label}</span>
      <select
        id={fieldId}
        className={cn(
          'h-12 w-full rounded-[12px] border border-ext-border bg-ext-surface px-4 text-sm text-ext-text outline-none focus:border-ext-accent',
          error && 'border-ext-danger',
          className,
        )}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs text-ext-danger">{error}</span> : null}
    </label>
  )
}
