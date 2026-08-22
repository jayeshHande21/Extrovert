import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { termsSections } from '@/data/terms'
import { TermsCheck } from '@/components/terms/TermsCheck'
import { Button } from '@/components/ui/Button'

type TermsSheetProps = {
  open: boolean
  accepted: boolean
  onClose: () => void
  onAccept: () => void
  onToggle: () => void
}

export function TermsSheet({
  open,
  accepted,
  onClose,
  onAccept,
  onToggle,
}: TermsSheetProps) {
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
        <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
          <motion.button
            aria-label="Close terms"
            className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            type="button"
          />
          <motion.section
            aria-labelledby="terms-title"
            aria-modal="true"
            className="relative flex max-h-[88dvh] w-full max-w-lg flex-col rounded-t-3xl border border-white/10 bg-[#141414] px-5 pt-3 pb-5 sm:max-h-[min(620px,72dvh)] sm:rounded-3xl sm:px-7 sm:py-6 lg:max-w-xl"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            role="dialog"
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          >
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/30 sm:hidden" />
            <header className="mb-4 flex items-center justify-between gap-4 sm:mb-5">
              <h2
                className="text-lg font-bold tracking-wide text-white uppercase sm:text-xl"
                id="terms-title"
              >
                Terms and conditions
              </h2>
              <button
                aria-label="Close"
                className="rounded-full p-1.5 text-white/80 hover:bg-white/10 hover:text-white"
                onClick={onClose}
                type="button"
              >
                <X className="size-5" />
              </button>
            </header>

            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 text-[13px] leading-6 text-white/75 sm:space-y-4 sm:text-sm sm:leading-6">
              <p className="text-white/90">
                Welcome to Extroverts! Please take a moment to read these to
                ensure a safe and enjoyable experience for everyone:
              </p>
              {termsSections.map((section) => (
                <div key={section.title}>
                  <p className="font-semibold text-white">{section.title}</p>
                  <p className="mt-1">{section.body}</p>
                </div>
              ))}
              <p className="text-white/90">
                Thank you for helping us maintain a fun, respectful environment
                for everyone!
              </p>
            </div>

            <div className="mt-5 shrink-0 border-t border-white/10 pt-4 sm:mt-6">
              <div className="mb-4">
                <TermsCheck checked={accepted} onToggle={onToggle}>
                  I have read and agree to these terms.
                </TermsCheck>
              </div>
              <Button
                className="sm:mx-auto sm:max-w-xs"
                disabled={!accepted}
                onClick={onAccept}
              >
                I understand
              </Button>
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
