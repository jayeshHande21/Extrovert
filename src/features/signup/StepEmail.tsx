import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { sendOtp } from '@/lib/mockApi'
import { emailSchema, type EmailValues } from '@/lib/schemas'
import { useWizardStore } from '@/store/wizardStore'

export function StepEmail() {
  const email = useWizardStore((state) => state.email)
  const goNext = useWizardStore((state) => state.goNext)
  const setFields = useWizardStore((state) => state.setFields)
  const [newsletter, setNewsletter] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailValues>({
    resolver: zodResolver(emailSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { email },
  })

  const onSubmit = handleSubmit(async (values) => {
    if (submitting) {
      return
    }

    setSubmitting(true)

    try {
      const result = await sendOtp(values.email)
      setFields({ email: values.email })

      if (result.demoOtp) {
        toast.message(`OTP sent. Use ${result.demoOtp} to continue.`)
      } else {
        toast.success('OTP sent to your email.')
      }

      goNext()
    } catch {
      toast.error('Could not send OTP. Try again.')
    } finally {
      setSubmitting(false)
    }
  })

  return (
    <main className="min-h-dvh bg-black">
      <form
        className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 py-8 sm:px-8 sm:py-10"
        noValidate
        onSubmit={onSubmit}
      >
        <Logo size="sm" />
        <h1 className="mt-10 text-[28px] font-bold text-white sm:mt-14 sm:text-4xl">
          Enter your email
        </h1>
        <div className="mt-8">
          <TextField
            autoComplete="email"
            error={errors.email?.message}
            inputMode="email"
            placeholder="Email"
            type="email"
            {...register('email')}
          />
        </div>
        <Button className="mt-5 max-w-md" loading={submitting} type="submit">
          Proceed
        </Button>
        <label className="mt-5 flex items-center gap-3 text-sm text-white">
          <input
            checked={newsletter}
            className="size-4 rounded border border-white/70 bg-black accent-white"
            onChange={(event) => setNewsletter(event.target.checked)}
            type="checkbox"
          />
          I&apos;d like to subscribe to your newsletter
        </label>
      </form>
    </main>
  )
}
