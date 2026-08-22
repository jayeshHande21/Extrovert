import { useEffect, useState } from 'react'
import { DobSheet } from '@/components/signup/DobSheet'
import {
  Accent,
  StepActions,
  StepHeading,
  StepHint,
} from '@/components/signup/SignupShell'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { formatDob, getAge, type DobParts } from '@/lib/dateOfBirth'
import { useWizardStore } from '@/store/wizardStore'

export function StepAge() {
  const age = useWizardStore((state) => state.age)
  const dateOfBirth = useWizardStore((state) => state.dateOfBirth)
  const name = useWizardStore((state) => state.name)
  const phone = useWizardStore((state) => state.phone)
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

    if (!name || phone.length !== 10) {
      setStep(4)
    }
  }, [otpVerified, name, phone, setStep])

  const onConfirm = (parts: DobParts) => {
    setFields({
      dateOfBirth: formatDob(parts),
      age: String(getAge(parts)),
    })
    setSheetOpen(false)
  }

  const openSheet = () => setSheetOpen(true)

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <StepHeading>
        How many years have you been <Accent>partying</Accent>?
      </StepHeading>
      <div
        className="cursor-pointer"
        onClick={openSheet}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            openSheet()
          }
        }}
        role="button"
        tabIndex={0}
      >
        <TextField
          className="cursor-pointer"
          label="Age"
          readOnly
          tabIndex={-1}
          value={age}
        />
      </div>
      <StepHint>
        We need your age to verify you&apos;re eligible and help others know who
        they&apos;re connecting with.
      </StepHint>
      <StepActions>
        <Button disabled={!age} onClick={goNext}>
          Next
        </Button>
        <Button onClick={goBack} variant="ghost">
          Back
        </Button>
      </StepActions>

      <DobSheet
        initialValue={dateOfBirth}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onConfirm={onConfirm}
      />
    </div>
  )
}
