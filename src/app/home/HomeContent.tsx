"use client"

import { useState } from "react"
import Link from "next/link"
import { Radio } from "lucide-react"
import { ResourceCard } from "@/components/resource-card"
import { LessonCard } from "@/components/lesson-card"
import { TrackPill } from "@/components/track-pill"
import { BannerCarousel } from "@/components/banner-carousel"

interface Row {
  id: string
  slug: string
  title: string
  description: string | null
  cover_image_url: string | null
  download_url?: string | null
  video_url?: string | null
  duration?: string | null
  tracks?: string[]
  track?: string
  locked?: boolean
  order?: number
  tags?: string[]
  updated_at?: string
  created_at?: string
}

interface Props {
  resources: Row[]
  lessons: Row[]
  userName?: string
}

const TRACKS = [
  { id: "1", slug: "skills", title: "Skills", coverImage: "", description: "" },
  { id: "2", slug: "ferramentas", title: "Ferramentas", coverImage: "", description: "" },
  { id: "3", slug: "claude-code-na-pratica", title: "Claude Code na Prática", coverImage: "", description: "" },
  { id: "4", slug: "lives-gravadas", title: "Lives Gravadas", coverImage: "", description: "" },
  { id: "5", slug: "agentes", title: "Agentes", coverImage: "", description: "" },
  { id: "6", slug: "mapa-mental", title: "Mapa Mental", coverImage: "", description: "" },
]

const LESSON_TRACKS = new Set(["claude-code-na-pratica"])

function getGreeting() {
  const h = new Date().getHours()
  if (h >= 6 && h < 12) return "Bom dia"
  if (h >= 12 && h < 18) return "Boa tarde"
  return "Boa noite"
}

function toResource(r: Row) {
  return { id: r.id, slug: r.slug, title: r.title, description: r.description ?? "", coverImage: r.cover_image_url ?? "", downloadUrl: r.download_url ?? "", track: r.tracks ?? [], tags: r.tags ?? [], type: "resource" as const, updatedAt: r.updated_at ?? "" }
}

function toLesson(l: Row) {
  return { id: l.id, slug: l.slug, title: l.title, description: l.description ?? "", coverImage: l.cover_image_url ?? "", videoUrl: l.video_url ?? "", duration: l.duration ?? "", track: l.track ?? "", type: "class" as const, locked: l.locked ?? true, order: l.order ?? 0 }
}

export function HomeContent({ resources, lessons, userName = "Membro" }: Props) {
  const [activeTrack, setActiveTrack] = useState("skills")

  const activeTitle = TRACKS.find(t => t.slug === activeTrack)?.title ?? ""
  const isLessonTrack = LESSON_TRACKS.has(activeTrack)
  const isLivesTrack = activeTrack === "lives-gravadas"

  const activeItems = isLivesTrack
    ? []
    : isLessonTrack
      ? lessons.filter(l => l.track === activeTrack)
      : resources.filter(r => r.tracks?.includes(activeTrack))

  return (
    <div className="p-8 max-w-7xl">
      <BannerCarousel banners={[
        { id: "2", image_url: "/banners/banner2.png", title: "Bem-vindo à Academy.iA", link_url: null },
        { id: "1", image_url: "/banners/banner1.png", title: "Novos recursos todas as semanas", link_url: null },
        { id: "3", image_url: "/banners/banner3.png", title: "Aulas ao vivo no Discord", link_url: null }
      ]} />
      <h1 className="text-3xl font-semibold mt-8">{getGreeting()}, {userName}</h1>

      <div className="flex gap-2 mt-6 mb-10 flex-wrap">
        {TRACKS.map(t => (
          <TrackPill key={t.id} track={t} active={activeTrack === t.slug} onClick={() => setActiveTrack(t.slug)} />
        ))}
      </div>

      <div key={activeTrack} className="animate-fade-up">
      {isLivesTrack ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
          <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
            <Radio className="w-6 h-6 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold mb-1">Lives no Discord</p>
            <p className="text-sm text-muted-foreground max-w-xs">As lives da comunidade acontecem ao vivo no Discord. Fique de olho nos avisos para não perder!</p>
          </div>
        </div>
      ) : (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold">{activeTitle}</h2>
            <Link
              href={isLessonTrack ? "/aulas" : "/recursos"}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Ver Todos
            </Link>
          </div>

          {activeItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {isLessonTrack
                ? activeItems.map(l => <LessonCard key={l.id} lesson={toLesson(l)} />)
                : activeItems.map(r => <ResourceCard key={r.id} resource={toResource(r)} />)
              }
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground text-sm">
              Nenhum conteúdo em <span className="font-medium text-foreground">{activeTitle}</span> ainda.
              {" "}<Link href="/admin" className="underline hover:text-foreground">Adicione pelo admin</Link>.
            </div>
          )}
        </section>
      )}
      </div>
    </div>
  )
}
