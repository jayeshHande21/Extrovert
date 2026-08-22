import { Logo } from '@/components/brand/Logo'
import { cn } from '@/lib/cn'
import { useWizardStore } from '@/store/wizardStore'

const TOTAL_STEPS = 6

export function GettingReadyHeader() {
  const step = useWizardStore((state) => state.step)

  const dots = (
    <div
      aria-label={`Step ${step} of ${TOTAL_STEPS}`}
      className="flex items-center gap-1.5 sm:gap-2"
      role="img"
    >
      {Array.from({ length: TOTAL_STEPS }, (_, index) => {
        const punch = index + 1

        return (
          <span
            className={cn(
              'size-[7px] rounded-full border-[1.5px] border-ext-border transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] sm:size-[9px]',
              punch < step &&
                'border-ext-accent bg-ext-accent shadow-[0_0_0_3px_var(--ext-accent-dim)]',
              punch === step && 'scale-[1.3] border-ext-text',
            )}
            key={punch}
          />
        )
      })}
    </div>
  )

  return (
    <header className="flex items-center justify-between gap-3 lg:w-[28%] lg:shrink-0 lg:flex-col lg:items-start lg:justify-center lg:gap-8">
      <Logo className="order-1 font-editorial text-[30px] lg:text-8xl" pulse size="sm" />
      <div className="order-2 lg:order-3">{dots}</div>
      <p className="order-3 font-mono text-[10px] tracking-[0.14em] text-ext-muted uppercase sm:text-[11px] lg:order-2 lg:text-xs">
        Getting Ready
      </p>
      <p className="order-4 hidden font-mono text-[11px] tracking-[0.14em] text-ext-muted uppercase lg:block">
        Step {step} of {TOTAL_STEPS}
      </p>
    </header>
  )
}
