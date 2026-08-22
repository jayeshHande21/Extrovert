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

export const locations: StateOption[] = [
  {
    id: 'mh',
    name: 'Maharashtra',
    cities: [
      {
        id: 'pune',
        name: 'Pune',
        colleges: [
          { id: 'coep', name: 'COEP Technological University' },
          { id: 'pict', name: 'PICT' },
          { id: 'symbiosis', name: 'Symbiosis International University' },
        ],
      },
      {
        id: 'mumbai',
        name: 'Mumbai',
        colleges: [
          { id: 'iitb', name: 'IIT Bombay' },
          { id: 'xaviers', name: "St. Xavier's College" },
          { id: 'nmims', name: 'NMIMS' },
        ],
      },
      {
        id: 'nagpur',
        name: 'Nagpur',
        colleges: [{ id: 'vnit', name: 'VNIT Nagpur' }],
      },
    ],
  },
  {
    id: 'ka',
    name: 'Karnataka',
    cities: [
      {
        id: 'bengaluru',
        name: 'Bengaluru',
        colleges: [
          { id: 'iisc', name: 'IISc' },
          { id: 'rvce', name: 'RV College of Engineering' },
          { id: 'christ', name: 'Christ University' },
        ],
      },
      {
        id: 'mysuru',
        name: 'Mysuru',
        colleges: [{ id: 'uom', name: 'University of Mysore' }],
      },
    ],
  },
  {
    id: 'dl',
    name: 'Delhi',
    cities: [
      {
        id: 'new-delhi',
        name: 'New Delhi',
        colleges: [
          { id: 'du', name: 'University of Delhi' },
          { id: 'iitd', name: 'IIT Delhi' },
          { id: 'nsut', name: 'NSUT' },
        ],
      },
    ],
  },
  {
    id: 'mp',
    name: 'Madhya Pradesh',
    cities: [
      {
        id: 'indore',
        name: 'Indore',
        colleges: [
          { id: 'iiti', name: 'IIT Indore' },
          { id: 'davv', name: 'DAVV' },
        ],
      },
      {
        id: 'bhopal',
        name: 'Bhopal',
        colleges: [
          { id: 'manit', name: 'MANIT' },
          { id: 'aiims-bhopal', name: 'AIIMS Bhopal' },
        ],
      },
    ],
  },
]

export function getState(stateId: string) {
  return locations.find((state) => state.id === stateId)
}

export function getCities(stateId: string) {
  return getState(stateId)?.cities ?? []
}

export function getColleges(stateId: string, cityId: string) {
  return getCities(stateId).find((city) => city.id === cityId)?.colleges ?? []
}
