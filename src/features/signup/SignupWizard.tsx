import { StepAge } from '@/features/signup/StepAge'
import { StepEmail } from '@/features/signup/StepEmail'
import { StepInvite } from '@/features/signup/StepInvite'
import { StepName } from '@/features/signup/StepName'
import { StepOtp } from '@/features/signup/StepOtp'
import { StepPronouns } from '@/features/signup/StepPronouns'
import { StepUsername } from '@/features/signup/StepUsername'
import { useWizardStore } from '@/store/wizardStore'

export function SignupWizard() {
  const step = useWizardStore((state) => state.step)

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

  return <StepInvite />
}
