import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Accent, StepActions, StepHeading } from '@/components/signup/SignupShell'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { cn } from '@/lib/cn'
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
    <form className="flex min-h-0 flex-1 flex-col" noValidate onSubmit={onSubmit}>
      <StepHeading>
        Enter your <Accent>email</Accent>
      </StepHeading>
      <TextField
        autoComplete="email"
        error={errors.email?.message}
        inputMode="email"
        label="Email"
        type="email"
        {...register('email')}
      />
      <button
        aria-pressed={newsletter}
        className="mt-[22px] flex items-center gap-3 text-left text-sm text-ext-text select-none"
        onClick={() => setNewsletter((value) => !value)}
        type="button"
      >
        <span
          className={cn(
            'flex size-5 items-center justify-center rounded-[5px] border-[1.5px] border-ext-border transition-colors',
            newsletter && 'border-ext-accent bg-ext-accent',
          )}
        >
          <svg
            aria-hidden
            className={cn(
              'size-3 transition-all duration-150',
              newsletter ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
            )}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M4 12l6 6L20 6"
              stroke="#0a0a0a"
              strokeLinecap="round"
              strokeWidth="3"
            />
          </svg>
        </span>
        I&apos;d like to subscribe to your newsletter
      </button>
      <StepActions>
        <Button loading={submitting} type="submit">
          Proceed
        </Button>
      </StepActions>
    </form>
  )
}
