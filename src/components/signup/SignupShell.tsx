import type { ReactNode } from 'react'
import { GettingReadyHeader } from '@/components/signup/GettingReadyHeader'

export function SignupShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-ext-bg font-display text-ext-text">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[620px] flex-col px-6 py-10 sm:px-8 sm:py-12">
        <GettingReadyHeader />
        <div className="mt-12 flex min-h-0 flex-1 flex-col sm:mt-16">{children}</div>
      </div>
    </main>
  )
}

export function StepHeading({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-10 text-[32px] leading-[1.12] font-bold tracking-[-0.01em] sm:text-[42px]">
      {children}
    </h1>
  )
}

export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-ext-accent">{children}</span>
}

export function StepHint({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3.5 max-w-[460px] text-sm leading-normal text-ext-muted">{children}</p>
  )
}

export function StepActions({ children }: { children: ReactNode }) {
  return <div className="mt-auto flex flex-col gap-3 pt-10">{children}</div>
}
