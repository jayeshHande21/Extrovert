import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Accent,
  StepActions,
  StepHeading,
  StepHint,
} from '@/components/signup/SignupShell'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { getCities, getColleges, locations } from '@/data/locations'
import { locationSchema, type LocationValues } from '@/lib/schemas'
import { useWizardStore } from '@/store/wizardStore'

const stateOptions = locations.map((state) => ({
  value: state.id,
  label: state.name,
}))

export function StepLocation() {
  const state = useWizardStore((store) => store.state)
  const city = useWizardStore((store) => store.city)
  const college = useWizardStore((store) => store.college)
  const pronouns = useWizardStore((store) => store.pronouns)
  const age = useWizardStore((store) => store.age)
  const otpVerified = useWizardStore((store) => store.otpVerified)
  const goBack = useWizardStore((store) => store.goBack)
  const goNext = useWizardStore((store) => store.goNext)
  const setFields = useWizardStore((store) => store.setFields)
  const setStep = useWizardStore((store) => store.setStep)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<LocationValues>({
    resolver: zodResolver(locationSchema),
    mode: 'onChange',
    defaultValues: { state, city, college },
  })

  useEffect(() => {
    if (!otpVerified) {
      setStep(1)
      return
    }

    if (!pronouns || !age) {
      setStep(3)
    }
  }, [otpVerified, pronouns, age, setStep])

  const selectedState = watch('state')
  const selectedCity = watch('city')
  const selectedCollege = watch('college')
  const cityOptions = getCities(selectedState).map((item) => ({
    value: item.id,
    label: item.name,
  }))
  const collegeOptions = getColleges(selectedState, selectedCity).map((item) => ({
    value: item.id,
    label: item.name,
  }))

  const stateField = register('state')
  const cityField = register('city')

  const onSubmit = handleSubmit((values) => {
    setFields(values)
    goNext()
  })

  return (
    <form className="flex min-h-0 flex-1 flex-col" noValidate onSubmit={onSubmit}>
      <StepHeading>
        Where do you <Accent>party</Accent> from?
      </StepHeading>
      <div className="flex flex-col gap-4">
        <Select
          error={errors.state?.message}
          label="State"
          options={stateOptions}
          placeholder="Select a state"
          {...stateField}
          onChange={(event) => {
            void stateField.onChange(event)
            setValue('city', '')
            setValue('college', '')
            clearErrors(['city', 'college'])
          }}
        />
        <Select
          disabled={!selectedState}
          error={errors.city?.message}
          label="City"
          options={cityOptions}
          placeholder={selectedState ? 'Select a city' : 'Select a state first'}
          {...cityField}
          onChange={(event) => {
            void cityField.onChange(event)
            setValue('college', '')
            clearErrors('college')
          }}
        />
        <Select
          disabled={!selectedCity}
          error={errors.college?.message}
          label="College"
          options={collegeOptions}
          placeholder={selectedCity ? 'Select a college' : 'Select a city first'}
          {...register('college')}
        />
      </div>
      <StepHint>
        City and college update with your state so we can show hangouts nearby.
      </StepHint>
      <StepActions>
        <Button
          disabled={!selectedState || !selectedCity || !selectedCollege}
          type="submit"
        >
          Next
        </Button>
        <Button onClick={goBack} type="button" variant="ghost">
          Back
        </Button>
      </StepActions>
    </form>
  )
}
