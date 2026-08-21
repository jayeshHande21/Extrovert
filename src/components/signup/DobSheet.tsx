import { useEffect, useRef, useState, type RefObject } from 'react'
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
    if (open) {
      setParts(parseDob(initialValue))
    }
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

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <motion.button
            aria-label="Close date of birth"
            className="absolute inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            type="button"
          />
          <motion.section
            aria-labelledby="dob-title"
            aria-modal="true"
            className="relative w-full max-w-xl rounded-t-3xl bg-[#111] px-5 pt-3 pb-5 sm:rounded-3xl sm:px-8 sm:pt-6"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            role="dialog"
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/30 sm:hidden" />
            <header className="mb-6 flex items-start justify-between gap-4">
              <h2
                className="text-xl font-bold tracking-wide text-white uppercase"
                id="dob-title"
              >
                Date of birth
              </h2>
              <button
                aria-label="Close"
                className="rounded-full p-1 text-white"
                onClick={onClose}
                type="button"
              >
                <X className="size-5" />
              </button>
            </header>

            <div className="grid grid-cols-3 gap-3">
              <DobField
                invalid={dayInvalid}
                inputRef={dayRef}
                maxLength={2}
                onChange={(value) => update('day', value, 2)}
                placeholder="DD"
                value={parts.day}
              />
              <DobField
                invalid={monthInvalid}
                inputRef={monthRef}
                maxLength={2}
                onChange={(value) => update('month', value, 2)}
                placeholder="MM"
                value={parts.month}
              />
              <DobField
                invalid={yearInvalid}
                inputRef={yearRef}
                maxLength={4}
                onChange={(value) => update('year', value, 4)}
                placeholder="YYYY"
                value={parts.year}
              />
            </div>

            {error ? (
              <p className="mt-3 text-sm text-ext-danger">{error}</p>
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
    </AnimatePresence>
  )
}

type DobFieldProps = {
  value: string
  placeholder: string
  maxLength: number
  invalid: boolean
  onChange: (value: string) => void
  inputRef: RefObject<HTMLInputElement | null>
}

function DobField({
  value,
  placeholder,
  maxLength,
  invalid,
  onChange,
  inputRef,
}: DobFieldProps) {
  return (
    <input
      className={cn(
        'h-14 rounded-[10px] border border-ext-border bg-black text-center text-white outline-none placeholder:text-ext-muted focus:border-white',
        invalid && 'border-ext-danger',
      )}
      inputMode="numeric"
      maxLength={maxLength}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      ref={inputRef}
      value={value}
    />
  )
}
