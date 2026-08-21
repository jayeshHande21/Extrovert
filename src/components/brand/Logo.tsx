import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

const sizes = {
  sm: 'text-4xl',
  md: 'text-6xl',
  lg: 'text-7xl sm:text-8xl lg:text-[9rem]',
} as const

type LogoMotion = 'wait' | 'run' | 'idle' | 'bounce'

type LogoProps = {
  size?: keyof typeof sizes
  className?: string
  pulse?: boolean
  loop?: boolean
  roll?: boolean
}

export function Logo({
  size = 'md',
  className,
  pulse = false,
  loop = false,
  roll = true,
}: LogoProps) {
  const [motion, setMotion] = useState<LogoMotion>(pulse || !roll ? 'idle' : 'wait')

  const playRoll = () => {
    setMotion('wait')
    requestAnimationFrame(() => {
      setMotion('run')
    })
  }

  const playBounce = () => {
    setMotion('idle')
    requestAnimationFrame(() => {
      setMotion('bounce')
    })
  }

  const play = roll ? playRoll : playBounce

  useEffect(() => {
    if (pulse) {
      return
    }

    const timer = window.setTimeout(play, 160)
    return () => window.clearTimeout(timer)
  }, [pulse, roll])

  useEffect(() => {
    if (!loop || motion !== 'idle') {
      return
    }

    const timer = window.setTimeout(play, 2200)
    return () => window.clearTimeout(timer)
  }, [loop, motion, roll])

  return (
    <button
      aria-label="Extroverts"
      className={cn(
        'relative inline-block w-fit shrink-0 self-start overflow-visible bg-transparent p-0 font-serif font-bold leading-none text-ext-text',
        pulse && 'font-editorial',
        sizes[size],
        className,
      )}
      onClick={pulse || !roll ? playBounce : playRoll}
      onMouseEnter={pulse || !roll ? playBounce : playRoll}
      type="button"
    >
      E
      <span
        className={cn(
          'logo-dot absolute top-[0.05em] left-[0.7em] size-[0.14em] rounded-full',
          pulse && 'logo-dot-accent',
          motion === 'wait' && 'logo-dot-wait',
          motion === 'run' && 'logo-dot-active',
          motion === 'bounce' && 'logo-dot-bounce-only',
          motion === 'idle' && pulse && 'logo-dot-pulse',
        )}
        onAnimationEnd={() => setMotion('idle')}
      />
    </button>
  )
}
