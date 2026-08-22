import { z } from 'zod'
import { getCities, getColleges, getState } from '@/data/locations'

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email'),
})

export const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, 'Username is required')
    .regex(
      /^[a-z0-9_]*$/,
      'Only lowercase letters, numbers, and underscores allowed.',
    )
    .min(6, 'Username must be at least 6 characters')
    .max(20, 'Username must be 20 characters or fewer'),
})

export const otpSchema = z.object({
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, 'Enter the 6-digit code'),
})

export const nameSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(40, 'Name must be 40 characters or fewer'),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, 'Enter a 10-digit phone number'),
})

export const identitySchema = z.object({
  username: usernameSchema.shape.username,
  name: nameSchema.shape.name,
  phone: nameSchema.shape.phone,
})

export const inviteSchema = z.object({
  inviteCode: z
    .string()
    .trim()
    .refine(
      (value) => value === '' || /^[a-zA-Z0-9]{4,12}$/.test(value),
      'Invite codes are 4–12 letters or numbers',
    ),
})

export const locationSchema = z
  .object({
    state: z.string().min(1, 'Select a state'),
    city: z.string().min(1, 'Select a city'),
    college: z.string().min(1, 'Select a college'),
  })
  .superRefine((value, ctx) => {
    if (value.state && !getState(value.state)) {
      ctx.addIssue({ code: 'custom', path: ['state'], message: 'Select a state' })
    }

    if (
      value.city &&
      !getCities(value.state).some((city) => city.id === value.city)
    ) {
      ctx.addIssue({ code: 'custom', path: ['city'], message: 'Select a city' })
    }

    if (
      value.college &&
      !getColleges(value.state, value.city).some(
        (college) => college.id === value.college,
      )
    ) {
      ctx.addIssue({
        code: 'custom',
        path: ['college'],
        message: 'Select a college',
      })
    }
  })

export type EmailValues = z.infer<typeof emailSchema>
export type UsernameValues = z.infer<typeof usernameSchema>
export type NameValues = z.infer<typeof nameSchema>
export type IdentityValues = z.infer<typeof identitySchema>
export type OtpValues = z.infer<typeof otpSchema>
export type InviteValues = z.infer<typeof inviteSchema>
export type LocationValues = z.infer<typeof locationSchema>
