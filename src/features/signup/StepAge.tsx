import { useEffect, useState } from 'react'
import { DobSheet } from '@/components/signup/DobSheet'
import { PronounsSheet } from '@/components/signup/PronounsSheet'
import {
  Accent,
  StepActions,
  StepHeading,
  StepHint,
} from '@/components/signup/SignupShell'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { formatDob, getAge, type DobParts } from '@/lib/dateOfBirth'
import { simulateSubmit } from '@/lib/mockApi'
import { useWizardStore } from '@/store/wizardStore'

export function StepAge() {
  const age = useWizardStore((state) => state.age)
  const dateOfBirth = useWizardStore((state) => state.dateOfBirth)
  const pronouns = useWizardStore((state) => state.pronouns)
  const name = useWizardStore((state) => state.name)
  const phone = useWizardStore((state) => state.phone)
  const otpVerified = useWizardStore((state) => state.otpVerified)
  const goBack = useWizardStore((state) => state.goBack)
  const goNext = useWizardStore((state) => state.goNext)
  const setFields = useWizardStore((state) => state.setFields)
  const setStep = useWizardStore((state) => state.setStep)
  const [dobOpen, setDobOpen] = useState(false)
  const [pronounsOpen, setPronounsOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!otpVerified) {
      setStep(1)
      return
    }

    if (!name || phone.length !== 10) {
      setStep(2)
    }
  }, [otpVerified, name, phone, setStep])

  const onConfirmDob = (parts: DobParts) => {
    setFields({
      dateOfBirth: formatDob(parts),
      age: String(getAge(parts)),
    })
    setDobOpen(false)
  }

  const onNext = async () => {
    if (submitting || !age || !pronouns) {
      return
    }

    setSubmitting(true)

    try {
      await simulateSubmit()
      goNext()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <StepHeading>
        A little more about <Accent>you</Accent>
      </StepHeading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div
          className="cursor-pointer"
          onClick={() => setDobOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setDobOpen(true)
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
        <div
          className="cursor-pointer"
          onClick={() => setPronounsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setPronounsOpen(true)
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
      </div>
      <StepHint>
        We need your age to verify you&apos;re 18+, and pronouns so others know
        how to address you.
      </StepHint>
      <StepActions>
        <Button
          disabled={!age || !pronouns}
          loading={submitting}
          onClick={onNext}
        >
          Next
        </Button>
        <Button disabled={submitting} onClick={goBack} variant="ghost">
          Back
        </Button>
      </StepActions>

      <DobSheet
        initialValue={dateOfBirth}
        open={dobOpen}
        onClose={() => setDobOpen(false)}
        onConfirm={onConfirmDob}
      />
      <PronounsSheet
        initialValue={pronouns}
        open={pronounsOpen}
        onClose={() => setPronounsOpen(false)}
        onConfirm={(value) => {
          setFields({ pronouns: value })
          setPronounsOpen(false)
        }}
      />
    </div>
  )
}
