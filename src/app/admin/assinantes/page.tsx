"use client"

import { useEffect, useState } from "react"
import { Users, RefreshCw } from "lucide-react"

interface Subscriber {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
}

export default function AdminAssinantesPage() {
  const [items, setItems] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const res = await fetch("/api/admin/assinantes")
    if (res.ok) setItems(await res.json())
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Assinantes</h1>
          <p className="text-sm text-muted-foreground">{items.length} membro(s) com acesso</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-4 py-2 border border-border text-sm rounded-lg hover:bg-accent/30 transition-colors">
          <RefreshCw className="w-4 h-4" /> Atualizar
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground text-center py-12">Carregando...</p>
      ) : items.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Nenhum assinante ainda.</p>
          <p className="text-xs text-muted-foreground mt-1">Quando alguém comprar via Cakto, aparece aqui automaticamente.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map(s => (
            <div key={s.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
              <div className="w-8 h-8 rounded-full bg-[var(--epic-teal)] flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-white">{s.email[0].toUpperCase()}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{s.email}</p>
                <p className="text-xs text-muted-foreground">
                  Entrou em {new Date(s.created_at).toLocaleDateString("pt-BR")}
                  {s.last_sign_in_at && ` · Último acesso: ${new Date(s.last_sign_in_at).toLocaleDateString("pt-BR")}`}
                </p>
              </div>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full shrink-0">Ativo</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
