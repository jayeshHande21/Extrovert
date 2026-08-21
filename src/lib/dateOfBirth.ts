export type DobParts = {
  day: string
  month: string
  year: string
}

export function parseDob(value: string): DobParts {
  if (!value) {
    return { day: '', month: '', year: '' }
  }

  const [year = '', month = '', day = ''] = value.split('-')
  return { day, month, year }
}

export function formatDob({ day, month, year }: DobParts) {
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

export function getAge({ day, month, year }: DobParts) {
  const today = new Date()
  let age = today.getFullYear() - Number(year)
  const monthDiff = today.getMonth() + 1 - Number(month)

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < Number(day))) {
    age -= 1
  }

  return age
}

export function isValidCalendarDate({ day, month, year }: DobParts) {
  if (!/^\d{1,2}$/.test(day) || !/^\d{1,2}$/.test(month) || !/^\d{4}$/.test(year)) {
    return false
  }

  const d = Number(day)
  const m = Number(month)
  const y = Number(year)
  const date = new Date(y, m - 1, d)

  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d
}

export function dobMessage(parts: DobParts) {
  if (parts.year.length !== 4 || !parts.day || !parts.month) {
    return null
  }

  if (!isValidCalendarDate(parts)) {
    return 'Enter a valid date of birth'
  }

  const age = getAge(parts)

  if (age < 18) {
    return 'You must be 18 or older to join Extroverts.'
  }

  if (age > 120) {
    return 'Enter a valid date of birth'
  }

  return null
}

export function isDobReady(parts: DobParts) {
  return isValidCalendarDate(parts) && !dobMessage(parts)
}
