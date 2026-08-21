import { OTPInput, REGEXP_ONLY_DIGITS } from 'input-otp'
import { cn } from '@/lib/cn'

type OtpInputProps = {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function OtpInput({ value, onChange, disabled }: OtpInputProps) {
  return (
    <OTPInput
      autoComplete="one-time-code"
      containerClassName="flex w-full justify-between gap-2 sm:gap-3"
      disabled={disabled}
      inputMode="numeric"
      maxLength={6}
      onChange={onChange}
      pattern={REGEXP_ONLY_DIGITS}
      render={({ slots }) => (
        <>
          {slots.map((slot, index) => (
            <div
              className="flex w-9 flex-col items-center sm:w-11"
              key={index}
            >
              <span className="flex h-11 items-end justify-center font-serif text-3xl text-ext-text">
                {slot.char ?? (slot.hasFakeCaret ? '' : '')}
                {slot.hasFakeCaret ? (
                  <span className="mb-1 ml-0.5 inline-block h-6 w-px animate-pulse bg-white" />
                ) : null}
              </span>
              <span
                className={cn(
                  'mt-1 h-0.5 w-full bg-white',
                  slot.isActive && 'bg-ext-accent',
                )}
              />
            </div>
          ))}
        </>
      )}
      value={value}
    />
  )
}
