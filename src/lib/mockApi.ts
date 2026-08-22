const DEMO_OTP = '123456'
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function simulateSubmit() {
  await delay(800)
}

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

const TAKEN_USERNAMES = ['extroverts', 'administrator']

export async function checkUsername(username: string) {
  await delay(800)

  const value = username.trim().toLowerCase()

  if (TAKEN_USERNAMES.includes(value)) {
    return { ok: false as const, message: 'That username is taken. Try another.' }
  }

  return { ok: true as const }
}

const VALID_INVITES = ['PARTY30', 'EXTRO']

export async function completeProfile(inviteCode = '') {
  await delay(800)

  const code = inviteCode.trim().toUpperCase()

  if (code && !VALID_INVITES.includes(code)) {
    return { ok: false as const, message: 'Invite code not found' }
  }

  if (Math.random() < 0.2) {
    return { ok: false as const, message: 'Something went wrong. Please try again.' }
  }

  return { ok: true as const, bonusHvts: code ? 30 : 0 }
}
