import type { ReactNode } from 'react'
import { GettingReadyHeader } from '@/components/signup/GettingReadyHeader'

export function SignupShell({ children }: { children: ReactNode }) {
  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-ext-bg font-display text-ext-text">
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute -top-24 left-0 h-[420px] w-[420px] rounded-full bg-ext-accent/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-[280px] w-[280px] rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-dvh w-full max-w-lg flex-col px-6 py-10 sm:max-w-xl sm:px-10 sm:py-12 md:max-w-2xl md:px-12 lg:max-w-6xl lg:flex-row lg:items-center lg:gap-16 lg:px-12 lg:py-16">
        <GettingReadyHeader />
        <div className="mt-12 flex min-h-0 w-full flex-1 flex-col sm:mt-14 lg:mt-0 lg:max-w-xl lg:flex-none lg:self-center">
          {children}
        </div>
      </div>
    </main>
  )
}

export function StepHeading({ children }: { children: ReactNode }) {
  return (
    <h1 className="mb-10 text-[32px] leading-[1.12] font-bold tracking-[-0.01em] sm:text-[42px] lg:text-[44px]">
      {children}
    </h1>
  )
}

export function Accent({ children }: { children: ReactNode }) {
  return <span className="text-ext-accent">{children}</span>
}

export function StepHint({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3.5 max-w-[460px] text-sm leading-normal text-ext-muted">
      {children}
    </p>
  )
}

export function StepActions({ children }: { children: ReactNode }) {
  return (
    <div className="mt-auto flex w-full flex-col gap-3 pt-10 lg:mt-10">
      {children}
    </div>
  )
}
