import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { GettingReadyHeader } from '@/components/signup/GettingReadyHeader'
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
    <main className="min-h-dvh bg-black">
      <form
        className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 py-8 sm:px-8 sm:py-10"
        noValidate
        onSubmit={onSubmit}
      >
        <GettingReadyHeader />

        <h1 className="mt-10 text-[28px] leading-8 font-bold text-white sm:mt-14 sm:text-4xl sm:leading-10">
          Create a username that fits your vibe!
        </h1>

        <div className="mt-8">
          <TextField
            autoCapitalize="none"
            autoComplete="username"
            error={errors.username?.message}
            maxLength={20}
            spellCheck={false}
            {...register('username')}
            label="Username"
          />
          <p className="mt-3 text-sm text-white">
            All your Superlatives and Invites will come your way with this name,
            so make it unforgettable!
          </p>
        </div>

        <div className="mt-auto flex max-w-md flex-col gap-3 pt-10">
          <Button disabled={!isValid || !currentValue} type="submit">
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
