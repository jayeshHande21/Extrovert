import { cn } from '@/lib/cn'

type SpinnerProps = {
  className?: string
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-block size-4 animate-spin rounded-full border-2 border-white/40 border-t-white',
        className,
      )}
    />
  )
}
