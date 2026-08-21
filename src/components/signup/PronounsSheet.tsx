import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import {
  MAX_PRONOUNS,
  formatPronouns,
  parsePronouns,
  pronounOptions,
} from '@/data/pronouns'

type PronounsSheetProps = {
  open: boolean
  initialValue: string
  onClose: () => void
  onConfirm: (value: string) => void
}

export function PronounsSheet({
  open,
  initialValue,
  onClose,
  onConfirm,
}: PronounsSheetProps) {
  const [selected, setSelected] = useState(() => parsePronouns(initialValue))
  const [customOpen, setCustomOpen] = useState(false)
  const [customValue, setCustomValue] = useState('')

  useEffect(() => {
    if (open) {
      setSelected(parsePronouns(initialValue))
      setCustomOpen(false)
      setCustomValue('')
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

  const toggle = (option: string) => {
    setSelected((current) => {
      if (current.includes(option)) {
        return current.filter((item) => item !== option)
      }

      if (current.length >= MAX_PRONOUNS) {
        toast.error(`Select up to ${MAX_PRONOUNS}`)
        return current
      }

      return [...current, option]
    })
  }

  const addCustom = () => {
    const value = customValue.trim().toLowerCase()

    if (!value) {
      return
    }

    if (selected.includes(value)) {
      setCustomValue('')
      setCustomOpen(false)
      return
    }

    if (selected.length >= MAX_PRONOUNS) {
      toast.error(`Select up to ${MAX_PRONOUNS}`)
      return
    }

    setSelected((current) => [...current, value])
    setCustomValue('')
    setCustomOpen(false)
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <motion.button
            aria-label="Close pronouns"
            className="absolute inset-0 bg-[#0a0a0a]/70 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            type="button"
          />
          <motion.section
            aria-describedby="pronouns-sub"
            aria-labelledby="pronouns-title"
            aria-modal="true"
            className="relative flex max-h-[80vh] w-full max-w-[480px] flex-col overflow-hidden rounded-2xl border border-ext-border bg-ext-surface p-6 sm:p-8"
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 10 }}
            role="dialog"
            transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <header className="mb-1.5 flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-ext-text" id="pronouns-title">
                Select pronouns
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
            <p className="mb-6 text-[13px] text-ext-muted" id="pronouns-sub">
              Select up to {MAX_PRONOUNS}.
            </p>

            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              {pronounOptions.map((option) => {
                const isSelected = selected.includes(option)

                return (
                  <button
                    className="flex w-full items-center gap-3.5 py-3 text-left text-base text-ext-text"
                    key={option}
                    onClick={() => toggle(option)}
                    type="button"
                  >
                    <span
                      className={cn(
                        'relative size-5 shrink-0 rounded-full border-[1.5px] border-ext-border transition-colors',
                        isSelected && 'border-ext-accent',
                      )}
                    >
                      <span
                        className={cn(
                          'absolute inset-1 rounded-full bg-ext-accent transition-transform duration-150 ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                          isSelected ? 'scale-100' : 'scale-0',
                        )}
                      />
                    </span>
                    {option}
                  </button>
                )
              })}
            </div>

            {customOpen ? (
              <div className="mt-3 flex gap-2">
                <input
                  autoFocus
                  className="h-11 flex-1 rounded-[10px] border border-ext-border bg-transparent px-3 text-sm text-ext-text outline-none focus:border-ext-accent"
                  onChange={(event) => setCustomValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault()
                      addCustom()
                    }
                  }}
                  placeholder="Add a pronoun"
                  value={customValue}
                />
                <Button className="h-11 w-auto px-4" onClick={addCustom}>
                  Add
                </Button>
              </div>
            ) : (
              <button
                className="mt-3 text-left text-sm text-ext-text underline underline-offset-2"
                onClick={() => setCustomOpen(true)}
                type="button"
              >
                Did we miss anything?
              </button>
            )}

            <Button
              className="mt-3.5"
              disabled={selected.length === 0}
              onClick={() => onConfirm(formatPronouns(selected))}
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
