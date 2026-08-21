import { useEffect, useRef, useState, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import {
  dobMessage,
  isDobReady,
  parseDob,
  type DobParts,
} from '@/lib/dateOfBirth'

type DobSheetProps = {
  open: boolean
  initialValue: string
  onClose: () => void
  onConfirm: (parts: DobParts) => void
}

const digitsOnly = (value: string) => value.replace(/\D/g, '')

export function DobSheet({ open, initialValue, onClose, onConfirm }: DobSheetProps) {
  const [parts, setParts] = useState<DobParts>(() => parseDob(initialValue))
  const dayRef = useRef<HTMLInputElement>(null)
  const monthRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    setParts(parseDob(initialValue))
    const timer = window.setTimeout(() => dayRef.current?.focus(), 40)
    return () => window.clearTimeout(timer)
  }, [open, initialValue])

  useEffect(() => {
    if (!open) {
      return
    }

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  const error = dobMessage(parts)
  const ready = isDobReady(parts)

  const update = (key: keyof DobParts, value: string, max: number) => {
    const next = digitsOnly(value).slice(0, max)
    setParts((current) => ({ ...current, [key]: next }))

    if (key === 'day' && next.length === 2) {
      monthRef.current?.focus()
    }

    if (key === 'month' && next.length === 2) {
      yearRef.current?.focus()
    }
  }

  const dayInvalid =
    parts.day.length === 2 && (Number(parts.day) < 1 || Number(parts.day) > 31)
  const monthInvalid =
    parts.month.length === 2 && (Number(parts.month) < 1 || Number(parts.month) > 12)
  const yearInvalid =
    parts.year.length > 0 && parts.year.length < 4
      ? true
      : parts.year.length === 4 && Boolean(error)

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.button
            aria-label="Close date of birth"
            className="absolute inset-0 bg-[#0a0a0a]/70 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            type="button"
          />
          <motion.section
            aria-describedby="dob-sub"
            aria-labelledby="dob-title"
            aria-modal="true"
            className="relative w-full max-w-[520px] rounded-2xl border border-ext-border bg-ext-surface p-5 sm:p-8"
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            role="dialog"
            transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <header className="mb-1.5 flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-ext-text" id="dob-title">
                Date of birth
              </h2>
              <button
                aria-label="Close"
                className="rounded-full p-1 text-ext-muted transition-colors hover:text-ext-text"
                onClick={onClose}
                type="button"
              >
                <X className="size-5" />
              </button>
            </header>
            <p className="mb-6 text-[13px] text-ext-muted" id="dob-sub">
              We&apos;ll use this to calculate your age.
            </p>

            <div className="grid grid-cols-[minmax(4.75rem,1fr)_minmax(4.75rem,1fr)_minmax(6.5rem,1.5fr)] gap-2 sm:gap-3">
              <DobField
                invalid={dayInvalid}
                inputRef={dayRef}
                label="Day"
                maxLength={2}
                onChange={(value) => update('day', value, 2)}
                placeholder="DD"
                value={parts.day}
              />
              <DobField
                invalid={monthInvalid}
                inputRef={monthRef}
                label="Month"
                maxLength={2}
                onChange={(value) => update('month', value, 2)}
                placeholder="MM"
                value={parts.month}
              />
              <DobField
                invalid={yearInvalid}
                inputRef={yearRef}
                label="Year"
                maxLength={4}
                onChange={(value) => update('year', value, 4)}
                placeholder="YYYY"
                value={parts.year}
              />
            </div>

            {error ? (
              <p className="mt-3 text-sm text-ext-danger" role="alert">
                {error}
              </p>
            ) : null}

            <Button
              className="mt-6"
              disabled={!ready}
              onClick={() => onConfirm(parts)}
            >
              Proceed
            </Button>
          </motion.section>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

type DobFieldProps = {
  value: string
  label: string
  placeholder: string
  maxLength: number
  invalid: boolean
  onChange: (value: string) => void
  inputRef: RefObject<HTMLInputElement | null>
}

function DobField({
  value,
  label,
  placeholder,
  maxLength,
  invalid,
  onChange,
  inputRef,
}: DobFieldProps) {
  return (
    <label className="block min-w-0">
      <span className="mb-2 block font-mono text-[10px] tracking-[0.12em] text-ext-muted uppercase">
        {label}
      </span>
      <input
        aria-label={label}
        className={cn(
          'h-16 w-full rounded-[10px] border border-white/25 bg-black/40 px-1 text-center font-mono text-xl text-ext-text outline-none placeholder:text-ext-muted focus:border-ext-accent sm:px-2 sm:text-2xl',
          invalid && 'border-ext-danger',
        )}
        inputMode="numeric"
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        ref={inputRef}
        value={value}
      />
    </label>
  )
}
