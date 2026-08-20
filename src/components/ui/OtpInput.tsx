import { cn } from '@/lib/cn'

type OtpInputProps = {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
  error?: string
}

export function OtpInput({ value, onChange, disabled, error }: OtpInputProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-ext-text">OTP</span>
      <input
        autoComplete="one-time-code"
        className={cn(
          'h-12 w-full rounded-[12px] border border-ext-border bg-ext-surface px-4 tracking-[0.4em] text-ext-text outline-none focus:border-ext-accent',
          error && 'border-ext-danger',
        )}
        disabled={disabled}
        inputMode="numeric"
        maxLength={6}
        onChange={(event) => onChange(event.target.value.replace(/\D/g, '').slice(0, 6))}
        value={value}
      />
      {error ? <span className="text-xs text-ext-danger">{error}</span> : null}
    </label>
  )
}
