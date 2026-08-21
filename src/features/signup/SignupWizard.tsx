import { PlaceholderScreen } from '@/components/PlaceholderScreen'
import { StepEmail } from '@/features/signup/StepEmail'
import { useWizardStore } from '@/store/wizardStore'

export function SignupWizard() {
  const step = useWizardStore((state) => state.step)

  if (step === 1) {
    return <StepEmail />
  }

  return (
    <PlaceholderScreen
      description="OTP verification — implementation next."
      title="OTP"
    />
  )
}
