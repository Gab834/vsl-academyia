"use client"

import { useState } from "react"
import { Calendar, Lock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  cover_image_url: string | null
  date: string | null
  time: string | null
  type: "event" | "class"
  locked: boolean
}

export default function EventosClient({ initialEvents }: { initialEvents: Event[] }) {
  const [tab, setTab] = useState<"all" | "event" | "class">("all")

  const filtered = initialEvents.filter(e => tab === "all" || e.type === tab)

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Eventos</h1>
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
            <div className="aspect-video bg-gradient-to-br from-neutral-700 to-neutral-900 relative flex items-center justify-center overflow-hidden">
              {event.cover_image_url
                ? <img src={event.cover_image_url} alt={event.title} className="w-full h-full object-cover" />
                : <Calendar className="w-8 h-8 text-white/30" />
              }
              {event.locked && <div className="absolute top-2 right-2"><Lock className="w-3.5 h-3.5 text-white/60 drop-shadow" /></div>}
            </div>
            <div className="p-3">
              <p className="text-sm font-medium line-clamp-2 mb-2 leading-snug">{event.title}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{event.type === "class" ? "Classe" : "Evento"}</span>
                {event.time && <span className="text-xs text-muted-foreground">{event.time}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground text-sm">
          {initialEvents.length === 0 ? "Nenhum evento ainda." : "Nenhum resultado."}
        </div>
      )}
    </div>
  )
}
