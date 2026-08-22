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
import { identitySchema, type IdentityValues } from '@/lib/schemas'
import { useWizardStore } from '@/store/wizardStore'

const sanitizeUsername = (value: string) =>
  value.toLowerCase().replace(/\s+/g, '').slice(0, 20)

const digitsOnly = (value: string) => value.replace(/\D/g, '').slice(0, 10)

export function StepProfile() {
  const username = useWizardStore((state) => state.username)
  const name = useWizardStore((state) => state.name)
  const phone = useWizardStore((state) => state.phone)
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
  } = useForm<IdentityValues>({
    resolver: zodResolver(identitySchema),
    mode: 'onChange',
    defaultValues: {
      username: username ?? '',
      name: name ?? '',
      phone: phone ?? '',
    },
  })

  useEffect(() => {
    if (!otpVerified) {
      setStep(1)
    }
  }, [otpVerified, setStep])

  const currentUsername = watch('username')
  const currentName = watch('name')
  const currentPhone = watch('phone')
  const usernameField = register('username')
  const phoneField = register('phone')

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

      setFields({
        username: values.username,
        name: values.name,
        phone: values.phone,
      })
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
      <div className="flex flex-col gap-4">
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField
            autoComplete="name"
            error={errors.name?.message}
            label="Name"
            maxLength={40}
            {...register('name')}
          />
          <TextField
            autoComplete="tel"
            error={errors.phone?.message}
            inputMode="numeric"
            label="Phone"
            maxLength={10}
            {...phoneField}
            onChange={(event) => {
              event.target.value = digitsOnly(event.target.value)
              void phoneField.onChange(event)
            }}
          />
        </div>
      </div>
      <StepHint>
        Username is how people find you. Name is shown on members and cannot be
        changed later.
      </StepHint>
      <StepActions>
        <Button
          disabled={
            !isValid ||
            !currentUsername ||
            !currentName?.trim() ||
            currentPhone?.length !== 10
          }
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
