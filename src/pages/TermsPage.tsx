import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/brand/Logo'
import { TermsSheet } from '@/components/terms/TermsSheet'
import { Button } from '@/components/ui/Button'

export function TermsPage() {
  const navigate = useNavigate()
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <main className="min-h-dvh bg-black">
      <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
        <Logo size="sm" />

        <p className="mt-10 text-[22px] leading-8 font-bold tracking-wide text-white uppercase sm:mt-14 sm:text-3xl sm:leading-10 lg:text-4xl lg:leading-12">
          By using this app, you&apos;re agreeing to keep things fun, safe, and
          respectful… and also agreeing to our terms and conditions. Politeness
          is a must—treat others how you&apos;d want to be treated. Everyone
          here is looking for reasons to{' '}
          <span className="text-ext-accent">party</span>, so bring your best
          vibe and expect the same from others. Let&apos;s party responsibly and
          make every experience a great one!
        </p>

        <div className="mt-auto pt-10">
          <p className="mb-3 text-center text-sm text-ext-muted">
            To proceed, accept{' '}
            <button
              className="text-white underline underline-offset-2"
              onClick={() => setSheetOpen(true)}
              type="button"
            >
              Terms and Conditions
            </button>
          </p>
          <Button
            className="mx-auto max-w-md"
            onClick={() => setSheetOpen(true)}
          >
            Accept
          </Button>
        </div>
      </div>

      <TermsSheet
        open={sheetOpen}
        onAccept={() => {
          setSheetOpen(false)
          navigate('/signup')
        }}
        onClose={() => setSheetOpen(false)}
      />
    </main>
  )
}
