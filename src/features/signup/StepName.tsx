import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { GettingReadyHeader } from '@/components/signup/GettingReadyHeader'
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
    <main className="min-h-dvh bg-black">
      <form
        className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 py-8 sm:px-8 sm:py-10"
        noValidate
        onSubmit={onSubmit}
      >
        <GettingReadyHeader />

        <h1 className="mt-10 text-[28px] leading-8 font-bold text-white sm:mt-14 sm:text-4xl sm:leading-10">
          Name, please, for the party check!
        </h1>

        <div className="mt-8">
          <TextField
            autoComplete="name"
            error={errors.name?.message}
            maxLength={40}
            {...register('name')}
            label="Name"
          />
          <p className="mt-3 text-sm text-white">
            This is the name shown as on members and requests. Cannot be changed
            later.
          </p>
        </div>

        <div className="mt-auto flex max-w-md flex-col gap-3 pt-10">
          <Button disabled={!isValid || !currentValue?.trim()} type="submit">
            Next
          </Button>
          <Button onClick={goBack} type="button" variant="ghost">
            Back
          </Button>
        </div>
      </form>
    </main>
  )
}
