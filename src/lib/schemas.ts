import { z } from 'zod'

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
})

export const profileSchema = z.object({
  name: nameSchema.shape.name,
  age: z
    .string()
    .trim()
    .regex(/^\d{1,3}$/, 'Enter your age in years')
    .refine((value) => Number(value) >= 18, 'You must be 18 or older'),
  pronouns: z.enum(['he/him', 'she/her', 'they/them', 'other'], {
    error: 'Select your pronouns',
  }),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10}$/, 'Enter a 10-digit phone number')
    .optional()
    .or(z.literal('')),
})

export const locationSchema = z.object({
  state: z.string().min(1, 'Select a state'),
  city: z.string().min(1, 'Select a city'),
  college: z.string().min(1, 'Select a college'),
})

export type EmailValues = z.infer<typeof emailSchema>
export type UsernameValues = z.infer<typeof usernameSchema>
export type NameValues = z.infer<typeof nameSchema>
export type OtpValues = z.infer<typeof otpSchema>
export type ProfileValues = z.infer<typeof profileSchema>
export type LocationValues = z.infer<typeof locationSchema>
