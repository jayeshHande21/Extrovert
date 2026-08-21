import { showToast, type ToastAction } from '@/components/ui/ToastCard'

type NotifyOptions = {
  action?: ToastAction
  code?: string
  onCodeClick?: (code: string) => void
  duration?: number
}

export const notify = {
  error: (message: string, options?: NotifyOptions) =>
    showToast('error', message, options),
  success: (message: string, options?: NotifyOptions) =>
    showToast('success', message, options),
  info: (message: string, options?: NotifyOptions) =>
    showToast('info', message, options),
}
