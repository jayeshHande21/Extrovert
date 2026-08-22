import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { StepAge } from '@/features/signup/StepAge'
import { StepEmail } from '@/features/signup/StepEmail'
import { StepInvite } from '@/features/signup/StepInvite'
import { StepName } from '@/features/signup/StepName'
import { StepOtp } from '@/features/signup/StepOtp'
import { StepLocation } from '@/features/signup/StepLocation'
import { StepPronouns } from '@/features/signup/StepPronouns'
import { StepUsername } from '@/features/signup/StepUsername'
import { SignupShell } from '@/components/signup/SignupShell'
import { useWizardStore } from '@/store/wizardStore'

function StepView({ step }: { step: number }) {
  if (step === 1) {
    return <StepEmail />
  }

  if (step === 2) {
    return <StepOtp />
  }

  if (step === 3) {
    return <StepUsername />
  }

  if (step === 4) {
    return <StepName />
  }

  if (step === 5) {
    return <StepAge />
  }

  if (step === 6) {
    return <StepPronouns />
  }

  if (step === 7) {
    return <StepLocation />
  }

  return <StepInvite />
}

export function SignupWizard() {
  const step = useWizardStore((state) => state.step)
  const reduceMotion = useReducedMotion()

  return (
    <SignupShell>
      <AnimatePresence mode="wait">
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="flex min-h-0 flex-1 flex-col"
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -28 }}
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 28 }}
          key={step}
          transition={{ duration: reduceMotion ? 0.16 : 0.38, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <StepView step={step} />
        </motion.div>
      </AnimatePresence>
    </SignupShell>
  )
}
