import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/brand/Logo'
import { TermsSheet } from '@/components/terms/TermsSheet'
import { Button } from '@/components/ui/Button'

export function TermsPage() {
  const navigate = useNavigate()
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <main className="relative min-h-dvh overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute -top-24 left-0 h-[420px] w-[420px] rounded-full bg-ext-accent/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[280px] w-[280px] rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-5 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:gap-12 lg:px-12 lg:py-16">
        <div className="lg:flex lg:w-[28%] lg:shrink-0 lg:justify-start">
          <Logo className="lg:text-8xl" size="sm" />
        </div>

        <div className="mt-10 flex flex-1 flex-col sm:mt-14 lg:mt-0 lg:max-w-2xl">
          <p className="text-[22px] leading-8 font-bold tracking-wide text-white uppercase sm:text-2xl sm:leading-9 lg:text-[26px] lg:leading-9">
            By using this app, you&apos;re agreeing to keep things fun, safe,
            and respectful… and also agreeing to our terms and conditions.
            Politeness is a must—treat others how you&apos;d want to be treated.
            Everyone here is looking for reasons to{' '}
            <span className="text-ext-accent">party</span>, so bring your best
            vibe and expect the same from others. Let&apos;s party responsibly
            and make every experience a great one!
          </p>

          <div className="mt-auto pt-10 lg:mt-8 lg:max-w-sm lg:pt-0">
            <p className="mb-3 text-center text-sm text-ext-muted lg:text-left">
              To proceed, accept{' '}
              <button
                className="text-white underline underline-offset-2"
                onClick={() => setSheetOpen(true)}
                type="button"
              >
                Terms and Conditions
              </button>
            </p>
            <Button onClick={() => setSheetOpen(true)}>Accept</Button>
          </div>
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

