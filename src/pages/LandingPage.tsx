import { useNavigate } from 'react-router-dom'
import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/Button'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <main className="relative min-h-dvh overflow-hidden bg-black">
      <div className="landing-mesh absolute inset-0" />
      <div className="absolute inset-x-[-12%] bottom-[6%] h-[38%] rounded-[50%] bg-black blur-md lg:inset-y-[12%] lg:right-[-8%] lg:left-[38%] lg:h-auto lg:rounded-[50%]" />
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black via-black/88 to-transparent lg:inset-y-0 lg:right-0 lg:left-1/2 lg:h-full lg:bg-gradient-to-l" />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-5 pt-16 pb-8 sm:px-8 sm:pt-20 sm:pb-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-12 lg:py-16">
        <div className="flex min-h-[42vh] flex-1 items-center justify-center sm:min-h-[46vh] lg:min-h-0 lg:justify-start">
          <Logo size="lg" />
        </div>

        <div className="flex w-full flex-col items-center text-center lg:max-w-md lg:items-start lg:text-left xl:max-w-lg">
          <p className="text-[11px] font-medium tracking-[0.18em] text-white uppercase sm:text-xs">
            An app only for
          </p>
          <h1 className="mt-1 text-[32px] leading-none font-bold tracking-wide text-white uppercase sm:text-5xl lg:text-6xl">
            Extroverts
          </h1>
          <p className="mt-4 max-w-[300px] text-[13px] leading-5 text-white sm:max-w-sm sm:text-sm lg:max-w-none">
            <span className="text-ext-warning">Warning:</span> Entering may lead
            to spontaneous dancing and unsolicited high-fives!
          </p>
          <Button
            className="mt-8 w-full max-w-sm sm:max-w-md lg:max-w-none"
            onClick={() => navigate('/terms')}
          >
            Continue
          </Button>
        </div>
      </div>
    </main>
  )
}
