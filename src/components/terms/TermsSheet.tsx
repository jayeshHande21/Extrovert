import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { termsSections } from '@/data/terms'
import { Button } from '@/components/ui/Button'

type TermsSheetProps = {
  open: boolean
  onClose: () => void
  onAccept: () => void
}

export function TermsSheet({ open, onClose, onAccept }: TermsSheetProps) {
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

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <motion.button
            aria-label="Close terms"
            className="absolute inset-0 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            type="button"
          />
          <motion.section
            aria-labelledby="terms-title"
            aria-modal="true"
            className="relative flex max-h-[88dvh] w-full max-w-2xl flex-col rounded-t-3xl bg-[#111] px-5 pt-3 pb-5 sm:max-h-[80dvh] sm:rounded-3xl sm:px-8 sm:pt-5"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            role="dialog"
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/30 sm:hidden" />
            <header className="mb-4 flex items-start justify-between gap-4">
              <h2
                className="text-xl font-bold tracking-wide text-white uppercase sm:text-2xl"
                id="terms-title"
              >
                Terms and conditions
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

            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto pr-1 text-sm leading-6 text-white/90">
              <p>
                Welcome to Extroverts! Please take a moment to read these to
                ensure a safe and enjoyable experience for everyone:
              </p>
              {termsSections.map((section) => (
                <p key={section.title}>
                  <span className="font-semibold text-white">{section.title}: </span>
                  {section.body}
                </p>
              ))}
              <p>Thank you for helping us maintain a fun, respectful environment for everyone!</p>
            </div>

            <div className="mt-5 shrink-0">
              <Button onClick={onAccept}>I understand</Button>
              <p className="mt-3 text-center text-[11px] text-ext-muted">
                Full terms:{' '}
                <a
                  className="underline underline-offset-2"
                  href="https://hn-e.github.io/hn-e/terms-conditions"
                  rel="noreferrer"
                  target="_blank"
                >
                  hn-e.github.io/hn-e/terms-conditions
                </a>
              </p>
            </div>
          </motion.section>
        </div>
      ) : null}
    </AnimatePresence>
  )
}
