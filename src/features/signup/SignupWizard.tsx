import { PlaceholderScreen } from '@/components/PlaceholderScreen'
import { StepEmail } from '@/features/signup/StepEmail'
import { StepOtp } from '@/features/signup/StepOtp'
import { useWizardStore } from '@/store/wizardStore'

export function SignupWizard() {
  const step = useWizardStore((state) => state.step)

  if (step === 1) {
    return <StepEmail />
  }

  if (step === 2) {
    return <StepOtp />
  }

  return (
    <PlaceholderScreen
      description="Username — implementation next."
      title="Username"
    />
  )
}
