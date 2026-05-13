export interface Resource {
  id: string
  slug: string
  title: string
  description: string
  coverImage: string
  downloadUrl: string
  track: string[]
  tags: string[]
  type: "resource"
  updatedAt: string
}

export interface Lesson {
  id: string
  slug: string
  title: string
  description: string
  coverImage: string
  videoUrl: string
  duration: string
  track: string
  type: "class"
  locked: boolean
  order: number
  resources?: Resource[]
}

export interface Event {
  id: string
  slug: string
  title: string
  coverImage: string
  date: string
  time: string
  type: "event" | "class"
  recordingUrl?: string
  locked: boolean
}

export interface Track {
  id: string
  slug: string
  title: string
  coverImage: string
  description: string
}

export interface UserProfile {
  name: string
  email: string
  avatarUrl: string
  plan: "free" | "monthly" | "annual"
}
