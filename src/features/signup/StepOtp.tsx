import { useEffect, useState } from 'react'
import { Info } from 'lucide-react'
import { toast } from 'sonner'
import { Accent, StepActions, StepHeading } from '@/components/signup/SignupShell'
import { Button } from '@/components/ui/Button'
import { OtpInput } from '@/components/ui/OtpInput'
import { sendOtp, verifyOtp } from '@/lib/mockApi'
import { useWizardStore } from '@/store/wizardStore'

const RESEND_SECONDS = 30

export function StepOtp() {
  const email = useWizardStore((state) => state.email)
  const goBack = useWizardStore((state) => state.goBack)
  const goNext = useWizardStore((state) => state.goNext)
  const setOtpVerified = useWizardStore((state) => state.setOtpVerified)
  const setStep = useWizardStore((state) => state.setStep)
  const [otp, setOtp] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [resending, setResending] = useState(false)
  const [cooldown, setCooldown] = useState(RESEND_SECONDS)

  useEffect(() => {
    if (!email) {
      setStep(1)
    }
  }, [email, setStep])

  useEffect(() => {
    if (cooldown <= 0) {
      return
    }

    const timer = window.setTimeout(() => {
      setCooldown((value) => value - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [cooldown])

  const onVerify = async () => {
    if (submitting) {
      return
    }

    if (otp.length !== 6) {
      toast.error('Please enter all 6 digits')
      return
    }

    setSubmitting(true)

    try {
      const result = await verifyOtp(otp)

      if (!result.ok) {
        toast.error(result.message)
        return
      }

      setOtpVerified(true)
      goNext()
    } catch {
      toast.error('Could not verify OTP. Try again.')
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
        toast.message(`New OTP sent. Use ${result.demoOtp}`)
      } else {
        toast.success('A new OTP was sent.')
      }
    } catch {
      toast.error('Could not resend OTP. Try again.')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <StepHeading>
        Enter your <Accent>OTP</Accent>
      </StepHeading>
      <OtpInput disabled={submitting} onChange={setOtp} value={otp} />
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
      <p className="mt-6 flex items-start gap-2 text-xs text-ext-muted">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        <span>A 6-digit OTP has been sent to {email}.</span>
      </p>
      <StepActions>
        <Button loading={submitting} onClick={onVerify}>
          Verify
        </Button>
        <Button disabled={submitting} onClick={goBack} variant="ghost">
          Back
        </Button>
      </StepActions>
    </div>
  )
}
