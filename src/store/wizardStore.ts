import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type WizardStep = 1 | 2 | 3 | 4 | 5 | 6

export type WizardFields = {
  email: string
  username: string
  name: string
  age: string
  dateOfBirth: string
  pronouns: string
  inviteCode: string
  phone: string
  state: string
  city: string
  college: string
}

type WizardStore = WizardFields & {
  step: WizardStep
  otpVerified: boolean
  setStep: (step: WizardStep) => void
  goNext: () => void
  goBack: () => void
  setFields: (fields: Partial<WizardFields>) => void
  setOtpVerified: (value: boolean) => void
  reset: () => void
}

const initialFields: WizardFields = {
  email: '',
  username: '',
  name: '',
  age: '',
  dateOfBirth: '',
  pronouns: '',
  inviteCode: '',
  phone: '',
  state: '',
  city: '',
  college: '',
}

export const useWizardStore = create<WizardStore>()(
  persist(
    (set, get) => ({
      ...initialFields,
      step: 1,
      otpVerified: false,
      setStep: (step) => {
        set({ step })
      },
      goNext: () => {
        const { step } = get()
        if (step < 6) {
          set({ step: ((step + 1) as WizardStep) })
        }
      },
      goBack: () => {
        const { step } = get()
        if (step > 1) {
          set({ step: ((step - 1) as WizardStep) })
        }
      },
      setFields: (fields) => {
        set(fields)
      },
      setOtpVerified: (otpVerified) => {
        set({ otpVerified })
      },
      reset: () => {
        set({
          ...initialFields,
          step: 1,
          otpVerified: false,
        })
      },
    }),
    {
      name: 'extroverts-wizard',
      version: 2,
      storage: createJSONStorage(() => sessionStorage),
      migrate: (persisted) => {
        const state = persisted as { step?: number }
        const mapped: Record<number, WizardStep> = {
          1: 1,
          2: 2,
          3: 3,
          4: 3,
          5: 4,
          6: 4,
          7: 5,
          8: 6,
        }

        return {
          ...state,
          step: mapped[state.step ?? 1] ?? 1,
        }
      },
    },
  ),
)
