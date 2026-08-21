import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

const sizes = {
  sm: 'text-4xl',
  md: 'text-6xl',
  lg: 'text-7xl sm:text-8xl lg:text-[9rem]',
} as const

type LogoProps = {
  size?: keyof typeof sizes
  className?: string
}

export function Logo({ size = 'md', className }: LogoProps) {
  const [bouncing, setBouncing] = useState(false)

  const bounce = () => {
    setBouncing(false)
    requestAnimationFrame(() => {
      setBouncing(true)
    })
  }

  useEffect(() => {
    const timer = window.setTimeout(bounce, 250)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <button
      aria-label="Extroverts"
      className={cn(
        'relative inline-block cursor-pointer bg-transparent p-0 font-serif font-bold leading-none text-white',
        sizes[size],
        className,
      )}
      onClick={bounce}
      onMouseEnter={bounce}
      type="button"
    >
      E
      <span
        className={cn(
          'logo-dot absolute top-[0.18em] -right-[0.22em] size-[0.18em] rounded-full bg-white',
          bouncing && 'logo-dot-active',
        )}
        onAnimationEnd={() => setBouncing(false)}
      />
    </button>
  )
}
