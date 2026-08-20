export type College = {
  id: string
  name: string
}

export type City = {
  id: string
  name: string
  colleges: College[]
}

export type StateOption = {
  id: string
  name: string
  cities: City[]
}

/** Filled when the location step is implemented. */
export const locations: StateOption[] = []
