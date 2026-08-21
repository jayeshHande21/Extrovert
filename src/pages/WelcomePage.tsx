import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/Button'
import { FeaturedPartyCard, PartyCard } from '@/components/welcome/PartyCard'
import { sampleParties } from '@/data/sampleParties'
import { useWizardStore } from '@/store/wizardStore'

export function WelcomePage() {
  const name = useWizardStore((state) => state.name)
  const username = useWizardStore((state) => state.username)
  const inviteCode = useWizardStore((state) => state.inviteCode)
  const reset = useWizardStore((state) => state.reset)
  const navigate = useNavigate()
  const tokens = inviteCode === 'PARTY30' || inviteCode === 'EXTRO' ? 30 : 0
  const featured = sampleParties.find((party) => party.featured)
  const feed = sampleParties.filter((party) => !party.featured)

  return (
    <main className="min-h-dvh overflow-x-hidden bg-[#0a0a0a] bg-[radial-gradient(circle_at_15%_10%,rgba(212,175,120,0.05),transparent_40%)] lg:h-dvh lg:overflow-hidden">
      <div className="flex min-h-dvh w-full flex-col px-5 py-8 sm:px-6 sm:py-10 lg:h-full lg:min-h-0 lg:px-8 lg:py-10">
        <header className="mb-8 flex shrink-0 items-center justify-between gap-4 lg:mb-10">
          <Logo loop roll={false} size="md" />
          <p className="flex items-center gap-2 rounded-full border border-[rgba(212,175,120,0.35)] bg-[rgba(212,175,120,0.08)] px-3.5 py-1.5 text-xs text-[#d4af78] sm:px-4 sm:py-2 sm:text-sm">
            <span className="size-1.5 rounded-full bg-[#d4af78]" />
            Bronze member
          </p>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-8 lg:min-h-0 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[340px_minmax(0,1fr)] xl:gap-10">
          <aside className="rounded-2xl border border-[#26221c] bg-[#121110] p-6 lg:self-start lg:p-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full border border-[#d4af78]/40 bg-[#d4af78]/10 font-serif text-lg text-[#d4af78]">
                {(name || 'E').charAt(0)}
              </span>
              <div className="min-w-0">
                <p className="text-[11px] tracking-[0.12em] text-[#6f6a5e] uppercase">
                  Bronze club
                </p>
                {username ? (
                  <p className="truncate text-sm text-[#e8e2d5]">@{username}</p>
                ) : null}
              </div>
            </div>

            <h1 className="font-serif text-[30px] leading-[1.15] text-[#f7f3ec] lg:text-4xl">
              You&apos;re in
              {name ? (
                <>
                  ,<br />
                  {name}.
                </>
              ) : (
                '.'
              )}
            </h1>
            <p className="mt-3 mb-6 text-sm leading-6 text-[#9a9488]">
              Profile complete{username ? ` as @${username}` : ''}. Everyone here
              is looking for reasons to <span className="text-[#d4af78]">party</span>{' '}
              — bring your best vibe and expect the same back.
            </p>

            <div className="flex items-center justify-between border-t border-[#211e19] py-3.5">
              <span className="text-[11px] tracking-[0.05em] text-[#6f6a5e] uppercase">
                Vibe tokens
              </span>
              <span className="text-sm text-[#d4af78]">{tokens}</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#211e19] py-3.5">
              <span className="text-[11px] tracking-[0.05em] text-[#6f6a5e] uppercase">
                Invites sent
              </span>
              <span className="text-sm text-[#e8e2d5]">3</span>
            </div>
            <div className="border-t border-[#211e19] py-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] tracking-[0.05em] text-[#6f6a5e] uppercase">
                  Next tier
                </span>
                <span className="text-sm text-[#e8e2d5]">Silver · 2 to go</span>
              </div>
              <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-[#211e19]">
                <div className="h-full w-3/5 rounded-full bg-[#d4af78]" />
              </div>
            </div>

            <Button
              className="mt-6 lg:mt-8"
              onClick={() => {
                reset()
                navigate('/')
              }}
              variant="ghost"
            >
              Start over
            </Button>
          </aside>

          <section className="min-w-0 pb-6 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
            <div className="mb-6 flex items-end justify-between gap-4 lg:mb-7">
              <div>
                <p className="mb-2 text-[11px] tracking-[0.15em] text-[#d4af78] uppercase">
                  Tonight near you
                </p>
                <p className="max-w-xl text-sm leading-6 text-[#9a9488]">
                  Want to be treated. Everyone here is looking for reasons to{' '}
                  <span className="text-[#d4af78]">party</span>, so bring your
                  best vibe and expect the same from others.
                </p>
              </div>
              <p className="hidden shrink-0 text-xs text-[#6f6a5e] lg:block">
                {feed.length + (featured ? 1 : 0)} parties
              </p>
            </div>

            {featured ? <FeaturedPartyCard party={featured} /> : null}

            <div className="mt-4 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-5 lg:gap-5">
              {feed.map((party) => (
                <PartyCard key={party.id} party={party} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
