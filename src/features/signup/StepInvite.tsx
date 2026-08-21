import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { StepActions, StepHint } from '@/components/signup/SignupShell'
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
  const reduceMotion = useReducedMotion()
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
    <form className="flex min-h-0 flex-1 flex-col" noValidate onSubmit={onSubmit}>
      <div className="mb-7 flex flex-col gap-1">
        {inviteLines.map(([before, accent, after], index) => (
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-[22px] leading-[1.28] font-bold uppercase sm:text-[26px]"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            key={accent}
            transition={{
              delay: reduceMotion ? 0 : 0.05 + index * 0.1,
              duration: 0.5,
            }}
          >
            {before}
            <span className="text-ext-accent">{accent}</span>
            {after}
          </motion.p>
        ))}
      </div>
      <TextField
        autoCapitalize="characters"
        autoComplete="off"
        error={errors.inviteCode?.message}
        label="Invite code (optional)"
        maxLength={12}
        spellCheck={false}
        {...register('inviteCode')}
      />
      <StepHint>Enter invite code and get up to +30 HVTs!</StepHint>
      <StepActions>
        <Button loading={submitting} type="submit">
          Sign Up
        </Button>
        <Button disabled={submitting} onClick={goBack} type="button" variant="ghost">
          Back
        </Button>
      </StepActions>
    </form>
  )
}
