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
  return (
    <span
      aria-label="Extroverts"
      className={cn(
        'relative inline-block font-serif font-bold leading-none text-white',
        sizes[size],
        className,
      )}
    >
      E
      <span className="absolute top-[0.18em] -right-[0.22em] size-[0.18em] rounded-full bg-white" />
    </span>
  )
}
