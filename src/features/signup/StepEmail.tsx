import { useEffect, useState } from 'react'
import { Info } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Accent, StepActions, StepHeading } from '@/components/signup/SignupShell'
import { Button } from '@/components/ui/Button'
import { OtpInput } from '@/components/ui/OtpInput'
import { TextField } from '@/components/ui/TextField'
import { cn } from '@/lib/cn'
import { sendOtp, verifyOtp } from '@/lib/mockApi'
import { notify } from '@/lib/notify'
import { emailSchema, type EmailValues } from '@/lib/schemas'
import { useWizardStore } from '@/store/wizardStore'

const RESEND_SECONDS = 30

export function StepEmail() {
  const email = useWizardStore((state) => state.email)
  const otpVerified = useWizardStore((state) => state.otpVerified)
  const goNext = useWizardStore((state) => state.goNext)
  const setFields = useWizardStore((state) => state.setFields)
  const setOtpVerified = useWizardStore((state) => state.setOtpVerified)
  const [newsletter, setNewsletter] = useState(false)
  const [otpSent, setOtpSent] = useState(() => Boolean(email) && !otpVerified)
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState<string | null>(null)
  const [otpShake, setOtpShake] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [resending, setResending] = useState(false)
  const [cooldown, setCooldown] = useState(0)

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

  useEffect(() => {
    if (cooldown <= 0) {
      return
    }

    const timer = window.setTimeout(() => {
      setCooldown((value) => value - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [cooldown])

  const flashOtpError = (message: string) => {
    setOtpError(message)
    setOtpShake((value) => value + 1)
  }

  const onSend = handleSubmit(async (values) => {
    if (submitting) {
      return
    }

    setSubmitting(true)

    try {
      const result = await sendOtp(values.email)
      setFields({ email: values.email })
      setOtp('')
      setOtpError(null)
      setOtpSent(true)
      setCooldown(RESEND_SECONDS)

      if (result.demoOtp) {
        notify.info('OTP sent. Use this code to continue.', {
          code: result.demoOtp,
          onCodeClick: (code) => {
            setOtp(code)
            setOtpError(null)
          },
        })
      } else {
        notify.success('OTP sent to your email.')
      }
    } catch {
      notify.error('Could not send OTP. Try again.')
    } finally {
      setSubmitting(false)
    }
  })

  const onVerify = async () => {
    if (submitting) {
      return
    }

    if (otp.length !== 6) {
      const message = 'Please enter all 6 digits'
      flashOtpError(message)
      notify.error(message, {
        action: {
          label: 'Try again',
          onClick: () => setOtpError(null),
        },
      })
      return
    }

    setSubmitting(true)

    try {
      const result = await verifyOtp(otp)

      if (!result.ok) {
        flashOtpError(result.message)
        notify.error(result.message, {
          action: {
            label: 'Try again',
            onClick: () => {
              setOtp('')
              setOtpError(null)
            },
          },
        })
        return
      }

      setOtpError(null)
      setOtpVerified(true)
      goNext()
    } catch {
      const message = 'Could not verify OTP. Try again.'
      flashOtpError(message)
      notify.error(message, {
        action: {
          label: 'Try again',
          onClick: () => {
            setOtp('')
            setOtpError(null)
          },
        },
      })
    } finally {
      setSubmitting(false)
    }
  }

  const onResend = async () => {
    if (cooldown > 0 || resending || !email) {
      return
    }

    setResending(true)

    try {
      const result = await sendOtp(email)
      setOtp('')
      setCooldown(RESEND_SECONDS)

      if (result.demoOtp) {
        notify.info('New OTP sent.', {
          code: result.demoOtp,
          onCodeClick: (code) => {
            setOtp(code)
            setOtpError(null)
          },
        })
      } else {
        notify.success('A new OTP was sent.')
      }
    } catch {
      notify.error('Could not resend OTP. Try again.', {
        action: {
          label: 'Retry',
          onClick: () => {
            void onResend()
          },
        },
      })
    } finally {
      setResending(false)
    }
  }

  const onChangeEmail = () => {
    setOtpSent(false)
    setOtp('')
    setOtpError(null)
    setCooldown(0)
    setOtpVerified(false)
  }

  return (
    <form
      className="flex min-h-0 w-full flex-1 flex-col"
      noValidate
      onSubmit={(event) => {
        event.preventDefault()
        if (otpSent) {
          void onVerify()
          return
        }

        void onSend()
      }}
    >
      <StepHeading>
        Enter your <Accent>{otpSent ? 'OTP' : 'email'}</Accent>
      </StepHeading>
      <TextField
        autoComplete="email"
        disabled={otpSent || submitting}
        error={errors.email?.message}
        inputMode="email"
        label="Email"
        type="email"
        {...register('email')}
      />
      {otpSent ? (
        <div className="mt-6 w-full">
          <OtpInput
            key={otpShake}
            disabled={submitting}
            invalid={Boolean(otpError)}
            onChange={(value) => {
              setOtp(value)
              if (otpError) {
                setOtpError(null)
              }
            }}
            value={otp}
          />
          <div className="mt-2 flex justify-end">
            <button
              className="font-mono text-[11px] tracking-[0.08em] text-ext-muted uppercase disabled:opacity-50"
              disabled={cooldown > 0 || resending}
              onClick={onResend}
              type="button"
            >
              {cooldown > 0 ? `Resend OTP in ${cooldown}s` : 'Resend OTP'}
            </button>
          </div>
          {otpError ? (
            <p className="mt-3 text-sm text-[#f29aa8]" role="alert">
              {otpError}
            </p>
          ) : null}
          <p className="mt-3 flex items-start gap-2 text-xs text-ext-muted">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            <span>A 6-digit OTP has been sent to {email}.</span>
          </p>
        </div>
      ) : (
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
      )}
      <StepActions>
        <Button loading={submitting} type="submit">
          {otpSent ? 'Verify' : 'Proceed'}
        </Button>
        {otpSent ? (
          <Button disabled={submitting} onClick={onChangeEmail} type="button" variant="ghost">
            Change email
          </Button>
        ) : null}
      </StepActions>
    </form>
  )
}
