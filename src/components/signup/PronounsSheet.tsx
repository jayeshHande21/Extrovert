import { useEffect, useState } from 'react'
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

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <motion.button
            aria-label="Close pronouns"
            className="absolute inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            type="button"
          />
          <motion.section
            aria-labelledby="pronouns-title"
            aria-modal="true"
            className="relative flex max-h-[88dvh] w-full max-w-xl flex-col rounded-t-3xl bg-[#111] px-5 pt-3 pb-5 sm:max-h-[80dvh] sm:rounded-3xl sm:px-8 sm:pt-6"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            role="dialog"
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/30 sm:hidden" />
            <header className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2
                  className="text-xl font-bold tracking-wide text-white uppercase"
                  id="pronouns-title"
                >
                  Select pronouns
                </h2>
                <p className="mt-1 text-sm text-white/80">Select upto 3</p>
              </div>
              <button
                aria-label="Close"
                className="rounded-full p-1 text-white"
                onClick={onClose}
                type="button"
              >
                <X className="size-5" />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto pr-1">
              {pronounOptions.map((option) => {
                const isSelected = selected.includes(option)

                return (
                  <button
                    className="flex w-full items-center gap-3 py-2.5 text-left text-white"
                    key={option}
                    onClick={() => toggle(option)}
                    type="button"
                  >
                    <span
                      className={cn(
                        'size-5 rounded-full border border-white/70',
                        isSelected && 'border-white bg-white',
                      )}
                    />
                    {option}
                  </button>
                )
              })}
            </div>

            {customOpen ? (
              <div className="mt-3 flex gap-2">
                <input
                  autoFocus
                  className="h-11 flex-1 rounded-[10px] border border-ext-border bg-black px-3 text-sm text-white outline-none"
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
                className="mt-3 text-left text-sm text-white underline underline-offset-2"
                onClick={() => setCustomOpen(true)}
                type="button"
              >
                Did we miss anything?
              </button>
            )}

            <Button
              className="mt-5"
              disabled={selected.length === 0}
              onClick={() => onConfirm(formatPronouns(selected))}
            >
              Proceed
            </Button>
          </motion.section>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
