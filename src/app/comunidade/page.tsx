"use client"

import { useEffect, useState } from "react"
import { ExternalLink } from "lucide-react"

interface Community {
  id: string
  title: string
  description: string
  cover_image_url: string | null
  link: string
  platform: string
}

const PLATFORM_COLORS: Record<string, string> = {
  WhatsApp: "bg-green-500/20 text-green-400",
  Discord: "bg-indigo-500/20 text-indigo-400",
  Telegram: "bg-sky-500/20 text-sky-400",
  Outro: "bg-neutral-500/20 text-neutral-400",
}

export default function ComunidadePage() {
  const [items, setItems] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/communities")
      .then(r => r.json())
      .then(d => { setItems(d); setLoading(false) })
  }, [])

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <h1 className="text-2xl font-semibold mb-1">Comunidade</h1>
      <p className="text-muted-foreground text-sm mb-8">Grupos exclusivos para membros da Academy.IA</p>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2].map(i => (
            <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden animate-pulse">
              <div className="aspect-video bg-neutral-800" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-neutral-800 rounded w-2/3" />
                <div className="h-3 bg-neutral-800 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <p className="text-sm text-muted-foreground">Nenhuma comunidade disponível ainda.</p>
      )}

      {!loading && items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map(c => (
            <div key={c.id} className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col">
              <div className="aspect-video bg-neutral-800 overflow-hidden">
                {c.cover_image_url
                  ? <img src={c.cover_image_url} alt={c.title} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">Sem capa</div>
                }
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${PLATFORM_COLORS[c.platform] ?? PLATFORM_COLORS["Outro"]}`}>
                    {c.platform}
                  </span>
                </div>
                <p className="font-medium text-sm mb-1">{c.title}</p>
                {c.description && <p className="text-xs text-muted-foreground flex-1 mb-3">{c.description}</p>}
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors mt-auto"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Entrar na comunidade
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
