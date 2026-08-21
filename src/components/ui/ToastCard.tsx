import { useState } from 'react'
import { Check, Copy, X } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/cn'

export type ToastAction = {
  label: string
  onClick: () => void
}

type ToastCardProps = {
  id: string | number
  variant: 'error' | 'success' | 'info'
  message: string
  action?: ToastAction
  code?: string
  onCodeClick?: (code: string) => void
  duration?: number
}

const icons = {
  error: (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#f29aa8]/20 font-mono text-sm font-bold text-[#f29aa8]">
      !
    </span>
  ),
  success: (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ext-accent/20 text-sm text-ext-accent">
      ✦
    </span>
  ),
  info: (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ext-accent/20 font-mono text-[11px] font-bold text-ext-accent">
      i
    </span>
  ),
}

export function ToastCard({
  id,
  variant,
  message,
  action,
  code,
  onCodeClick,
  duration = 5200,
}: ToastCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCode = async () => {
    if (!code) {
      return
    }

    if (onCodeClick) {
      onCodeClick(code)
      toast.dismiss(id)
      return
    }

    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div
      className={cn(
        'group relative w-[min(92vw,400px)] overflow-hidden rounded-[10px] border font-display shadow-[0_18px_50px_rgba(0,0,0,.45)]',
        variant === 'error' &&
          'toast-shake border-[#f29aa8]/35 bg-[#161012] text-[#f5f3ef]',
        variant === 'success' && 'border-transparent bg-[#f5f3ef] text-[#0a0a0a]',
        variant === 'info' && 'border-ext-accent/30 bg-[#111113] text-[#f5f3ef]',
      )}
      role={variant === 'error' ? 'alert' : 'status'}
    >
      <div className="flex items-start gap-3 px-4 pt-3.5 pb-3">
        {icons[variant]}
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm leading-5 font-bold tracking-[0.01em]">{message}</p>
          {code ? (
            <button
              className="mt-2 inline-flex items-center gap-2 rounded-lg border border-ext-accent/40 bg-ext-accent/10 px-2.5 py-1.5 font-mono text-[13px] tracking-[0.18em] text-ext-accent transition-colors hover:bg-ext-accent/20"
              onClick={handleCode}
              type="button"
            >
              {code}
              {copied ? (
                <Check className="size-3.5" />
              ) : (
                <Copy className="size-3.5 opacity-80" />
              )}
              <span className="font-display text-[10px] tracking-[0.12em] text-ext-muted uppercase">
                {onCodeClick ? 'Tap to fill' : copied ? 'Copied' : 'Tap to copy'}
              </span>
            </button>
          ) : null}
          {action ? (
            <button
              className={cn(
                'mt-2.5 rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.04em] uppercase transition-transform active:scale-[0.97]',
                variant === 'error'
                  ? 'bg-[#f29aa8] text-[#1a0b0e] hover:bg-[#f7b4be]'
                  : 'bg-[#0a0a0a] text-[#f5f3ef]',
              )}
              onClick={() => {
                action.onClick()
                toast.dismiss(id)
              }}
              type="button"
            >
              {action.label}
            </button>
          ) : null}
        </div>
        <button
          aria-label="Dismiss"
          className={cn(
            'rounded-full p-1 transition-colors',
            variant === 'success'
              ? 'text-[#0a0a0a]/50 hover:text-[#0a0a0a]'
              : 'text-ext-muted hover:text-ext-text',
          )}
          onClick={() => toast.dismiss(id)}
          type="button"
        >
          <X className="size-4" />
        </button>
      </div>
      <span
        aria-hidden
        className={cn(
          'toast-progress absolute right-0 bottom-0 left-0 h-[2px] origin-left group-hover:[animation-play-state:paused]',
          variant === 'error' && 'bg-[#f29aa8]',
          variant === 'success' && 'bg-[#0a0a0a]/40',
          variant === 'info' && 'bg-ext-accent',
        )}
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  )
}

export function showToast(
  variant: ToastCardProps['variant'],
  message: string,
  options: Omit<ToastCardProps, 'id' | 'variant' | 'message'> = {},
) {
  const duration = options.duration ?? (variant === 'error' ? 6000 : 4200)

  return toast.custom(
    (id) => (
      <ToastCard
        action={options.action}
        code={options.code}
        duration={duration}
        id={id}
        message={message}
        onCodeClick={options.onCodeClick}
        variant={variant}
      />
    ),
    { duration },
  )
}
