import { Toaster } from 'sonner'

export function AppToaster() {
  return (
    <Toaster
      offset={24}
      position="top-right"
      toastOptions={{ unstyled: true }}
      visibleToasts={2}
    />
  )
}
