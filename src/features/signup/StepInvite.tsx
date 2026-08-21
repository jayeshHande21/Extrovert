import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { GettingReadyHeader } from '@/components/signup/GettingReadyHeader'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { inviteLines } from '@/data/inviteCopy'
import { completeProfile } from '@/lib/mockApi'
import { inviteSchema, type InviteValues } from '@/lib/schemas'
import { useWizardStore } from '@/store/wizardStore'

export function StepInvite() {
  const inviteCode = useWizardStore((state) => state.inviteCode)
  const pronouns = useWizardStore((state) => state.pronouns)
  const otpVerified = useWizardStore((state) => state.otpVerified)
  const goBack = useWizardStore((state) => state.goBack)
  const setFields = useWizardStore((state) => state.setFields)
  const setStep = useWizardStore((state) => state.setStep)
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InviteValues>({
    resolver: zodResolver(inviteSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { inviteCode: inviteCode ?? '' },
  })

  useEffect(() => {
    if (!otpVerified) {
      setStep(2)
      return
    }

    if (!pronouns) {
      setStep(6)
    }
  }, [otpVerified, pronouns, setStep])

  const onSubmit = handleSubmit(async (values) => {
    if (submitting) {
      return
    }

    setSubmitting(true)

    try {
      const result = await completeProfile(values.inviteCode)
      setFields({ inviteCode: values.inviteCode.trim().toUpperCase() })

      if (!result.ok) {
        toast.error(result.message)
        return
      }

      if (result.bonusHvts) {
        toast.success(`You're in. +${result.bonusHvts} HVTs unlocked.`)
      } else {
        toast.success("You're in. Profile complete.")
      }

      navigate('/welcome')
    } catch {
      toast.error('Something went wrong. Please try again.')
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
        <GettingReadyHeader />

        <div className="mt-10 space-y-2 text-[22px] leading-7 font-bold tracking-wide text-white uppercase sm:mt-14 sm:text-3xl sm:leading-9">
          {inviteLines.map(([before, accent, after]) => (
            <p key={accent}>
              {before}
              <span className="text-ext-accent">{accent}</span>
              {after}
            </p>
          ))}
        </div>

        <div className="mt-8">
          <TextField
            autoCapitalize="characters"
            autoComplete="off"
            error={errors.inviteCode?.message}
            maxLength={12}
            spellCheck={false}
            {...register('inviteCode')}
            label="Enter invite code (optional)"
          />
          <p className="mt-3 text-sm text-ext-muted">
            Enter invite code and get up to +30 HVTs!
          </p>
        </div>

        <div className="mt-auto flex max-w-md flex-col gap-3 pt-10">
          <Button loading={submitting} type="submit">
            Sign up
          </Button>
          <Button disabled={submitting} onClick={goBack} type="button" variant="ghost">
            Back
          </Button>
        </div>
      </form>
    </main>
  )
}
