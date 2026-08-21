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
import { usernameSchema, type UsernameValues } from '@/lib/schemas'
import { useWizardStore } from '@/store/wizardStore'

export function StepUsername() {
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
  } = useForm<UsernameValues>({
    resolver: zodResolver(usernameSchema),
    mode: 'onChange',
    defaultValues: { username: username ?? '' },
  })

  useEffect(() => {
    if (!otpVerified) {
      setStep(2)
    }
  }, [otpVerified, setStep])

  const currentValue = watch('username')

  const onSubmit = handleSubmit((values) => {
    setFields({ username: values.username })
    goNext()
  })

  return (
    <form className="flex min-h-0 flex-1 flex-col" noValidate onSubmit={onSubmit}>
      <StepHeading>
        Create a username that fits your <Accent>vibe</Accent>!
      </StepHeading>
      <TextField
        autoCapitalize="none"
        autoComplete="username"
        error={errors.username?.message}
        label="Username"
        maxLength={20}
        spellCheck={false}
        {...register('username')}
      />
      <StepHint>
        All your superlatives and invites will come your way with this name —
        make it unforgettable.
      </StepHint>
      <StepActions>
        <Button disabled={!isValid || !currentValue} type="submit">
          Next
        </Button>
        <Button onClick={goBack} type="button" variant="ghost">
          Back
        </Button>
      </StepActions>
    </form>
  )
}
