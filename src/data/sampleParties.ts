export type PartyVibe = 'Coffee break' | 'After hours' | 'Golden hour'

export type SampleParty = {
  id: string
  title: string
  host: string
  vibe: PartyVibe
  time: string
  date: string
  location?: string
  confidential?: boolean
  featured?: boolean
  spotsLeft: number
  image: string
}

export const sampleParties: SampleParty[] = [
  {
    id: 'rooftop',
    title: 'Rooftop sunset',
    host: 'aisha',
    vibe: 'Golden hour',
    time: '6:30 PM',
    date: '19/09/26',
    location: 'The Pavilion, Shivajinagar',
    featured: true,
    spotsLeft: 2,
    image:
      'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'coffee-date',
    title: 'Coffee date',
    host: 'neelpatel',
    vibe: 'Coffee break',
    time: '11:02 AM',
    date: '17/09/26',
    location: 'Hair Cafe By Krystal, Koregaon Park',
    spotsLeft: 3,
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'hard-rock',
    title: 'Cafe',
    host: 'chetan',
    vibe: 'Coffee break',
    time: '9:49 PM',
    date: '12/09/26',
    location: 'Hard Rock Cafe, Amanora Mall',
    spotsLeft: 3,
    image:
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'night-hang',
    title: "Let's hang tonight",
    host: 'chetan',
    vibe: 'After hours',
    time: '6:35 AM',
    date: '11/09/26',
    confidential: true,
    spotsLeft: 3,
    image:
      'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'golden-hour',
    title: 'Golden hour meetup',
    host: 'aisha',
    vibe: 'Golden hour',
    time: '6:30 PM',
    date: '19/09/26',
    location: 'The Pavilion, Shivajinagar',
    spotsLeft: 5,
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=80',
  },
]
