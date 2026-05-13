export interface Database {
  public: {
    Tables: {
      resources: {
        Row: {
          id: string
          slug: string
          title: string
          description: string
          cover_image_url: string | null
          download_url: string | null
          tracks: string[]
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["resources"]["Row"], "id" | "created_at" | "updated_at">
        Update: Partial<Database["public"]["Tables"]["resources"]["Insert"]>
      }
      lessons: {
        Row: {
          id: string
          slug: string
          title: string
          description: string
          cover_image_url: string | null
          video_url: string | null
          duration: string | null
          track: string
          locked: boolean
          order: number
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["lessons"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["lessons"]["Insert"]>
      }
      events: {
        Row: {
          id: string
          slug: string
          title: string
          cover_image_url: string | null
          date: string
          time: string | null
          type: "event" | "class"
          recording_url: string | null
          locked: boolean
          created_at: string
        }
        Insert: Omit<Database["public"]["Tables"]["events"]["Row"], "id" | "created_at">
        Update: Partial<Database["public"]["Tables"]["events"]["Insert"]>
      }
    }
  }
}
