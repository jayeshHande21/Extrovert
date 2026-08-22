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

const digitsOnly = (value: string) => value.replace(/\D/g, '').slice(0, 10)

export function StepName() {
  const name = useWizardStore((state) => state.name)
  const phone = useWizardStore((state) => state.phone)
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
    defaultValues: { name: name ?? '', phone: phone ?? '' },
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

  const currentName = watch('name')
  const currentPhone = watch('phone')
  const phoneField = register('phone')

  const onSubmit = handleSubmit((values) => {
    setFields({ name: values.name, phone: values.phone })
    goNext()
  })

  return (
    <form className="flex min-h-0 flex-1 flex-col" noValidate onSubmit={onSubmit}>
      <StepHeading>
        Name, please, for the <Accent>party check</Accent>!
      </StepHeading>
      <div className="flex flex-col gap-4">
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
      <StepHint>
        This is the name shown on members and requests. Cannot be changed later.
      </StepHint>
      <StepActions>
        <Button
          disabled={!isValid || !currentName?.trim() || currentPhone?.length !== 10}
          type="submit"
        >
          Next
        </Button>
        <Button onClick={goBack} type="button" variant="ghost">
          Back
        </Button>
      </StepActions>
    </form>
  )
}
