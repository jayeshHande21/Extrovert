import { Logo } from '@/components/brand/Logo'

export function GettingReadyHeader() {
  return (
    <header className="flex items-start justify-between gap-4">
      <Logo size="sm" />
      <p className="pt-2 text-xs font-semibold tracking-[0.14em] text-white uppercase sm:text-sm">
        Getting ready
      </p>
    </header>
  )
}
