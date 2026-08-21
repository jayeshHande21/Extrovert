import { useEffect, useState } from 'react'
import { GettingReadyHeader } from '@/components/signup/GettingReadyHeader'
import { PronounsSheet } from '@/components/signup/PronounsSheet'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { useWizardStore } from '@/store/wizardStore'

export function StepPronouns() {
  const pronouns = useWizardStore((state) => state.pronouns)
  const age = useWizardStore((state) => state.age)
  const otpVerified = useWizardStore((state) => state.otpVerified)
  const goBack = useWizardStore((state) => state.goBack)
  const goNext = useWizardStore((state) => state.goNext)
  const setFields = useWizardStore((state) => state.setFields)
  const setStep = useWizardStore((state) => state.setStep)
  const [sheetOpen, setSheetOpen] = useState(false)

  useEffect(() => {
    if (!otpVerified) {
      setStep(2)
      return
    }

    if (!age) {
      setStep(5)
    }
  }, [otpVerified, age, setStep])

  return (
    <main className="min-h-dvh bg-black">
      <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 py-8 sm:px-8 sm:py-10">
        <GettingReadyHeader />

        <h1 className="mt-10 text-[28px] leading-8 font-bold text-white sm:mt-14 sm:text-4xl sm:leading-10">
          Which pronouns feel right for you?
        </h1>

        <div className="mt-8">
          <div className="cursor-pointer" onClick={() => setSheetOpen(true)}>
            <TextField label="Pronouns" readOnly tabIndex={-1} value={pronouns} />
          </div>
          <p className="mt-3 text-sm text-white">
            Select the pronouns that feel right for you.
          </p>
        </div>

        <div className="mt-auto flex max-w-md flex-col gap-3 pt-10">
          <Button disabled={!pronouns} onClick={goNext}>
            Next
          </Button>
          <Button onClick={goBack} variant="ghost">
            Back
          </Button>
        </div>
      </div>

      <PronounsSheet
        initialValue={pronouns}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onConfirm={(value) => {
          setFields({ pronouns: value })
          setSheetOpen(false)
        }}
      />
    </main>
  )
}
