import { useEffect, useState } from 'react'
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
import { checkUsername } from '@/lib/mockApi'
import { notify } from '@/lib/notify'
import { usernameSchema, type UsernameValues } from '@/lib/schemas'
import { useWizardStore } from '@/store/wizardStore'

const sanitizeUsername = (value: string) =>
  value.toLowerCase().replace(/\s+/g, '').slice(0, 20)

export function StepUsername() {
  const username = useWizardStore((state) => state.username)
  const otpVerified = useWizardStore((state) => state.otpVerified)
  const goBack = useWizardStore((state) => state.goBack)
  const goNext = useWizardStore((state) => state.goNext)
  const setFields = useWizardStore((state) => state.setFields)
  const setStep = useWizardStore((state) => state.setStep)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
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
  const usernameField = register('username')

  const onSubmit = handleSubmit(async (values) => {
    if (submitting) {
      return
    }

    setSubmitting(true)

    try {
      const result = await checkUsername(values.username)

      if (!result.ok) {
        setError('username', { type: 'manual', message: result.message })
        notify.error(result.message)
        return
      }

      setFields({ username: values.username })
      goNext()
    } catch {
      notify.error('Could not check username. Try again.')
    } finally {
      setSubmitting(false)
    }
  })

  return (
    <form className="flex min-h-0 flex-1 flex-col" noValidate onSubmit={onSubmit}>
      <StepHeading>
        Create a username that fits your <Accent>vibe</Accent>!
      </StepHeading>
      <TextField
        autoCapitalize="none"
        autoComplete="username"
        autoCorrect="off"
        error={errors.username?.message}
        label="Username"
        maxLength={20}
        spellCheck={false}
        {...usernameField}
        onChange={(event) => {
          event.target.value = sanitizeUsername(event.target.value)
          void usernameField.onChange(event)
        }}
      />
      <StepHint>
        All your superlatives and invites will come your way with this name —
        make it unforgettable.
      </StepHint>
      <StepActions>
        <Button
          disabled={!isValid || !currentValue}
          loading={submitting}
          type="submit"
        >
          Next
        </Button>
        <Button disabled={submitting} onClick={goBack} type="button" variant="ghost">
          Back
        </Button>
      </StepActions>
    </form>
  )
}
