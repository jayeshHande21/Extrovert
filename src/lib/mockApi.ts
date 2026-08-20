const DEMO_OTP = '123456'
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function sendOtp(email: string) {
  await delay(800)

  return {
    ok: true as const,
    email,
    ...(import.meta.env.DEV ? { demoOtp: DEMO_OTP } : {}),
  }
}

export async function verifyOtp(code: string) {
  await delay(800)

  if (code !== DEMO_OTP) {
    return { ok: false as const, message: 'Invalid OTP. Try again.' }
  }

  return { ok: true as const }
}

export async function completeProfile() {
  await delay(800)

  if (Math.random() < 0.2) {
    return { ok: false as const, message: 'Something went wrong. Please try again.' }
  }

  return { ok: true as const }
}
