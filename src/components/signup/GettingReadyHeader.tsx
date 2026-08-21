import { Logo } from '@/components/brand/Logo'
import { cn } from '@/lib/cn'
import { useWizardStore } from '@/store/wizardStore'

const TOTAL_STEPS = 7

export function GettingReadyHeader() {
  const step = useWizardStore((state) => state.step)

  return (
    <header className="flex items-center justify-between gap-3">
      <Logo className="font-editorial text-[30px]" pulse size="sm" />
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
                'size-[9px] rounded-full border-[1.5px] border-ext-border transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]',
                punch < step &&
                  'border-ext-accent bg-ext-accent shadow-[0_0_0_3px_var(--ext-accent-dim)]',
                punch === step && 'scale-[1.3] border-ext-text',
              )}
              key={punch}
            />
          )
        })}
      </div>
      <p className="font-mono text-[10px] tracking-[0.14em] text-ext-muted uppercase sm:text-[11px]">
        Getting Ready
      </p>
    </header>
  )
}
