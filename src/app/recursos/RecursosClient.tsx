"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Download, FileText } from "lucide-react"

interface Resource {
  id: string
  slug: string
  title: string
  cover_image_url: string | null
  download_url: string | null
  tracks: string[]
  tags: string[]
}

const TRACKS = [
  { slug: "all", title: "Todos" },
  { slug: "skills", title: "Skills" },
  { slug: "ferramentas", title: "Ferramentas" },
  { slug: "claude-code-na-pratica", title: "Claude Code na Prática" },
  { slug: "lives-gravadas", title: "Lives Gravadas" },
  { slug: "agentes", title: "Agentes" },
  { slug: "mapa-mental", title: "Mapa Mental" },
]

export default function RecursosClient({ initialResources }: { initialResources: Resource[] }) {
  const [search, setSearch] = useState("")
  const [trackFilter, setTrackFilter] = useState("all")

  const filtered = initialResources.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase())
    const matchTrack = trackFilter === "all" || (Array.isArray(r.tracks) && r.tracks.includes(trackFilter))
    return matchSearch && matchTrack
  })

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Recursos</h1>
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
        <select
          value={trackFilter}
          onChange={e => setTrackFilter(e.target.value)}
          className="px-3 py-1.5 text-sm bg-card border border-border rounded-md outline-none text-muted-foreground"
        >
          {TRACKS.map(t => <option key={t.slug} value={t.slug}>{t.title}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map(resource => (
          <Link
            key={resource.id}
            href={`/recursos/${resource.slug}`}
            className="group block rounded-xl overflow-hidden bg-card border border-border hover:border-border/60 hover:bg-[var(--epic-card-hover)] transition-all"
          >
            <div className="aspect-video bg-gradient-to-br from-neutral-800 to-neutral-900 relative overflow-hidden">
              {resource.cover_image_url
                ? <img src={resource.cover_image_url} alt={resource.title} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center"><FileText className="w-8 h-8 text-white/20" /></div>
              }
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <Download className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium line-clamp-2 mb-2 leading-snug">{resource.title}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Recurso</span>
                <FileText className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground text-sm">
          {initialResources.length === 0 ? "Nenhum recurso ainda. Adicione pelo painel admin." : "Nenhum resultado."}
        </div>
      )}
    </div>
  )
}
