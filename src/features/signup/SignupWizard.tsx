import { PlaceholderScreen } from '@/components/PlaceholderScreen'
import { StepEmail } from '@/features/signup/StepEmail'
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

  return (
    <PlaceholderScreen
      description="Display name — implementation next."
      title="Name"
    />
  )
}
