import { useEffect, useState } from 'react'
import { GettingReadyHeader } from '@/components/signup/GettingReadyHeader'
import { DobSheet } from '@/components/signup/DobSheet'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { formatDob, getAge, type DobParts } from '@/lib/dateOfBirth'
import { useWizardStore } from '@/store/wizardStore'

export function StepAge() {
  const age = useWizardStore((state) => state.age)
  const dateOfBirth = useWizardStore((state) => state.dateOfBirth)
  const name = useWizardStore((state) => state.name)
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

    if (!name) {
      setStep(4)
    }
  }, [otpVerified, name, setStep])

  const onConfirm = (parts: DobParts) => {
    setFields({
      dateOfBirth: formatDob(parts),
      age: String(getAge(parts)),
    })
    setSheetOpen(false)
  }

  return (
    <main className="min-h-dvh bg-black">
      <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 py-8 sm:px-8 sm:py-10">
        <GettingReadyHeader />

        <h1 className="mt-10 text-[28px] leading-8 font-bold text-white sm:mt-14 sm:text-4xl sm:leading-10">
          How many years have you been partying?
        </h1>

        <div className="mt-8">
          <div className="cursor-pointer" onClick={() => setSheetOpen(true)}>
            <TextField label="Age" readOnly tabIndex={-1} value={age} />
          </div>
          <p className="mt-3 text-sm text-ext-muted">
            We need your age to verify you&apos;re eligible and help others know
            who they&apos;re connecting with.
          </p>
        </div>

        <div className="mt-auto flex max-w-md flex-col gap-3 pt-10">
          <Button disabled={!age} onClick={goNext}>
            Next
          </Button>
          <Button onClick={goBack} variant="ghost">
            Back
          </Button>
        </div>
      </div>

      <DobSheet
        initialValue={dateOfBirth}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onConfirm={onConfirm}
      />
    </main>
  )
}
