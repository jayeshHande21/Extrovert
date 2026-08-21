import { PlaceholderScreen } from '@/components/PlaceholderScreen'
import { StepAge } from '@/features/signup/StepAge'
import { StepEmail } from '@/features/signup/StepEmail'
import { StepName } from '@/features/signup/StepName'
import { StepOtp } from '@/features/signup/StepOtp'
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

  return (
    <PlaceholderScreen
      description="Pronouns — implementation next."
      title="Pronouns"
    />
  )
}
