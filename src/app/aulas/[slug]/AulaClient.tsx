"use client"

import { useState } from "react"
import Link from "next/link"
import { Play, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Lesson {
  id: string
  slug: string
  title: string
  description: string | null
  cover_image_url: string | null
  video_url: string | null
  duration: string | null
  track: string
  locked: boolean
  order: number
}

export default function AulaClient({ lesson }: { lesson: Lesson }) {
  const [activeTab, setActiveTab] = useState<"descricao" | "recursos" | "comentarios">("descricao")
  const [showUpgrade, setShowUpgrade] = useState(lesson.locked)

  const tabs = [
    { id: "descricao", label: "Descrição" },
    { id: "recursos", label: "Recursos" },
    { id: "comentarios", label: "Comentários" },
  ] as const

  return (
    <div className="p-8 max-w-4xl mx-auto relative">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/aulas" className="hover:text-foreground transition-colors">Aulas</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground line-clamp-1">{lesson.title}</span>
      </nav>

      <div className="aspect-video rounded-xl overflow-hidden mb-6 relative bg-black">
        {lesson.video_url ? (
          <video
            src={lesson.video_url}
            controls
            controlsList="nodownload nofullscreen"
            disablePictureInPicture
            onContextMenu={e => e.preventDefault()}
            poster={lesson.cover_image_url ?? undefined}
            className="w-full h-full object-contain"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-800" />
            {lesson.cover_image_url && (
              <img src={lesson.cover_image_url} alt={lesson.title} className="w-full h-full object-cover opacity-40" />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center cursor-pointer">
                <Play className="w-6 h-6 text-white fill-white ml-0.5" />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-4 border-b border-border mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "text-sm pb-3 border-b-2 transition-colors",
              activeTab === tab.id
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "descricao" && (
        <div>
          <h1 className="text-xl font-semibold mb-3">{lesson.title}</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">{lesson.description ?? "Sem descrição."}</p>
        </div>
      )}
      {activeTab === "recursos" && (
        <p className="text-sm text-muted-foreground">Nenhum recurso disponível para esta aula.</p>
      )}
      {activeTab === "comentarios" && (
        <p className="text-sm text-muted-foreground">Comentários em breve.</p>
      )}

      {showUpgrade && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl p-6 max-w-sm w-full relative text-center">
            <button onClick={() => setShowUpgrade(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-full bg-accent/30 flex items-center justify-center mx-auto mb-4">
              <Play className="w-5 h-5 text-muted-foreground" />
            </div>
            <h2 className="text-base font-semibold mb-2">Em breve</h2>
            <p className="text-sm text-muted-foreground mb-5">Esta aula ainda está sendo preparada. Fique ligado!</p>
            <button onClick={() => setShowUpgrade(false)} className="w-full py-2 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors">
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
