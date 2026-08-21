import { useEffect, useState } from 'react'
import { PronounsSheet } from '@/components/signup/PronounsSheet'
import {
  Accent,
  StepActions,
  StepHeading,
  StepHint,
} from '@/components/signup/SignupShell'
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

  const openSheet = () => setSheetOpen(true)

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <StepHeading>
        Which pronouns feel right <Accent>for you</Accent>?
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
          label="Pronouns"
          readOnly
          tabIndex={-1}
          value={pronouns}
        />
      </div>
      <StepHint>Select the pronouns that feel right for you.</StepHint>
      <StepActions>
        <Button disabled={!pronouns} onClick={goNext}>
          Next
        </Button>
        <Button onClick={goBack} variant="ghost">
          Back
        </Button>
      </StepActions>

      <PronounsSheet
        initialValue={pronouns}
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onConfirm={(value) => {
          setFields({ pronouns: value })
          setSheetOpen(false)
        }}
      />
    </div>
  )
}
