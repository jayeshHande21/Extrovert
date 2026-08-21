import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Accent,
  StepActions,
  StepHeading,
  StepHint,
} from '@/components/signup/SignupShell'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { nameSchema, type NameValues } from '@/lib/schemas'
import { useWizardStore } from '@/store/wizardStore'

export function StepName() {
  const name = useWizardStore((state) => state.name)
  const username = useWizardStore((state) => state.username)
  const otpVerified = useWizardStore((state) => state.otpVerified)
  const goBack = useWizardStore((state) => state.goBack)
  const goNext = useWizardStore((state) => state.goNext)
  const setFields = useWizardStore((state) => state.setFields)
  const setStep = useWizardStore((state) => state.setStep)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<NameValues>({
    resolver: zodResolver(nameSchema),
    mode: 'onChange',
    defaultValues: { name: name ?? '' },
  })

  useEffect(() => {
    if (!otpVerified) {
      setStep(2)
      return
    }

    if (!username) {
      setStep(3)
    }
  }, [otpVerified, username, setStep])

  const currentValue = watch('name')

  const onSubmit = handleSubmit((values) => {
    setFields({ name: values.name })
    goNext()
  })

  return (
    <form className="flex min-h-0 flex-1 flex-col" noValidate onSubmit={onSubmit}>
      <StepHeading>
        Name, please, for the <Accent>party check</Accent>!
      </StepHeading>
      <TextField
        autoComplete="name"
        error={errors.name?.message}
        label="Name"
        maxLength={40}
        {...register('name')}
      />
      <StepHint>
        This is the name shown on members and requests. Cannot be changed later.
      </StepHint>
      <StepActions>
        <Button disabled={!isValid || !currentValue?.trim()} type="submit">
          Next
        </Button>
        <Button onClick={goBack} type="button" variant="ghost">
          Back
        </Button>
      </StepActions>
    </form>
  )
}
