import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/Button'
import { useWizardStore } from '@/store/wizardStore'

export function WelcomePage() {
  const name = useWizardStore((state) => state.name)
  const username = useWizardStore((state) => state.username)
  const inviteCode = useWizardStore((state) => state.inviteCode)
  const reset = useWizardStore((state) => state.reset)
  const navigate = useNavigate()
  const bonus = inviteCode === 'PARTY30' || inviteCode === 'EXTRO'
  const tokens = bonus ? 30 : 0

  return (
    <main className="min-h-dvh bg-black">
      <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 py-8 sm:px-8 sm:py-10">
        <Logo loop roll={false} size="md" />

        <p className="mt-10 text-sm tracking-[0.16em] text-ext-muted uppercase">
          Your club
        </p>
        <div className="mt-3 flex items-center justify-between rounded-[12px] border border-white px-4 py-3">
          <p className="font-semibold text-white">Bronze Club Member</p>
          <span className="size-6 rounded-md bg-amber-700" />
        </div>
        <p className="mt-4 text-sm font-semibold tracking-wide text-amber-400 uppercase">
          You have {tokens} honorary vibe tokens!
        </p>

        <h1 className="mt-10 text-3xl font-bold text-white">
          You&apos;re in{name ? `, ${name}` : ''}.
        </h1>
        <p className="mt-3 text-sm leading-6 text-white/80">
          Profile complete{username ? ` as @${username}` : ''}. Everyone here is
          looking for reasons to <span className="text-ext-accent">party</span>,
          so bring your best vibe.
        </p>

        <div className="mt-auto flex max-w-md flex-col gap-3 pt-10">
          <Button
            onClick={() => {
              reset()
              navigate('/')
            }}
          >
            Start over
          </Button>
        </div>
      </div>
    </main>
  )
}
