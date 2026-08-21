export const pronounOptions = [
  'he',
  'him',
  'his',
  'she',
  'her',
  'hers',
  'they',
  'them',
  'theirs',
  'ze',
  'zir',
  'zirs',
  've',
  'ver',
  'vis',
  'xe',
  'xer',
  'xirs',
] as const

export const MAX_PRONOUNS = 3

export function parsePronouns(value: string) {
  return value ? value.split('/').filter(Boolean) : []
}

export function formatPronouns(values: string[]) {
  return values.join('/')
}
