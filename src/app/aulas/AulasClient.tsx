"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Lesson {
  id: string
  slug: string
  title: string
  cover_image_url: string | null
  duration: string | null
  track: string
  locked: boolean
  order: number
}

export default function AulasClient({ initialLessons }: { initialLessons: Lesson[] }) {
  const [search, setSearch] = useState("")

  const filtered = initialLessons.filter(l =>
    l.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Aulas</h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-8 pr-3 py-1.5 text-sm bg-card border border-border rounded-md outline-none focus:border-ring placeholder:text-muted-foreground w-48"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map(lesson => (
          <Link
            key={lesson.id}
            href={`/aulas/${lesson.slug}`}
            className="group block rounded-xl overflow-hidden bg-card border border-border hover:border-border/60 hover:bg-[var(--epic-card-hover)] transition-all"
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-neutral-800 to-neutral-900 relative overflow-hidden">
              {lesson.cover_image_url && (
                <img src={lesson.cover_image_url} alt={lesson.title} className="w-full h-full object-cover" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {lesson.locked && (
                <div className="absolute top-2 right-2">
                  <Lock className="w-3.5 h-3.5 text-white drop-shadow" />
                </div>
              )}
              {lesson.duration && (
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                  {lesson.duration}
                </div>
              )}
            </div>
            <div className="p-3">
              <p className={cn("text-sm font-medium line-clamp-2 mb-1 leading-snug", lesson.locked && "text-foreground/80")}>
                {lesson.title}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground text-sm">
          {initialLessons.length === 0 ? "Nenhuma aula ainda. Adicione pelo painel admin." : "Nenhum resultado."}
        </div>
      )}
    </div>
  )
}
