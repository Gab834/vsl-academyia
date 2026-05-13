"use client"

import { useState } from "react"
import { Play, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  cover_image_url: string | null
  type: "event" | "class"
  recording_url: string | null
  locked: boolean
}

export default function LivesClient({ initialEvents }: { initialEvents: Event[] }) {
  const [tab, setTab] = useState<"all" | "class" | "event">("all")
  const filtered = initialEvents.filter(e => tab === "all" || e.type === tab)

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Lives Gravadas</h1>
      </div>

      <div className="flex items-center gap-1 mb-6">
        {(["all", "class", "event"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn("px-4 py-1.5 text-sm rounded-full transition-colors",
              tab === t ? "bg-card border border-border text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t === "all" ? "Todos" : t === "class" ? "Classe" : "Evento"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(event => (
          <div key={event.id} className="group rounded-xl overflow-hidden bg-card border border-border hover:bg-[var(--epic-card-hover)] transition-colors cursor-pointer">
            <div className="aspect-video bg-gradient-to-br from-neutral-800 to-neutral-900 relative overflow-hidden flex items-center justify-center">
              {event.cover_image_url && (
                <img src={event.cover_image_url} alt={event.title} className="w-full h-full object-cover absolute inset-0" />
              )}
              <div className="relative z-10 w-10 h-10 rounded-full bg-black/50 group-hover:bg-black/70 backdrop-blur-sm transition-colors flex items-center justify-center">
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              </div>
              {event.locked && <div className="absolute top-2 right-2 z-10"><Lock className="w-3.5 h-3.5 text-white/60 drop-shadow" /></div>}
            </div>
            <div className="p-3">
              <p className="text-sm font-medium line-clamp-2 mb-2 leading-snug">{event.title}</p>
              <span className="text-xs text-muted-foreground">{event.type === "class" ? "Classe" : "Evento"}</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground text-sm">
          {initialEvents.length === 0 ? "Nenhuma live ainda." : "Nenhum resultado."}
        </div>
      )}
    </div>
  )
}
