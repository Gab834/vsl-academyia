"use client"

import { useEffect, useState, useRef } from "react"
import { Plus, Pencil, Trash2, Upload, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Community {
  id: string
  title: string
  description: string
  cover_image_url: string | null
  link: string
  platform: string
}

const PLATFORMS = ["WhatsApp", "Discord", "Telegram", "Outro"]

const emptyForm = { title: "", description: "", cover_image_url: "", link: "", platform: "WhatsApp" }

export default function AdminComunidadesPage() {
  const [items, setItems] = useState<Community[]>([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Community | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)
  const coverRef = useRef<HTMLInputElement>(null)

  async function load() {
    const res = await fetch("/api/admin/communities")
    setItems(await res.json())
  }

  useEffect(() => { load() }, [])

  function openNew() {
    setEditing(null)
    setForm(emptyForm)
    setOpen(true)
  }

  function openEdit(c: Community) {
    setEditing(c)
    setForm({ title: c.title, description: c.description, cover_image_url: c.cover_image_url ?? "", link: c.link, platform: c.platform })
    setOpen(true)
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingCover(true)
    const fd = new FormData()
    fd.append("file", file)
    fd.append("folder", "covers")
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
    const { url } = await res.json()
    setForm(f => ({ ...f, cover_image_url: url }))
    setUploadingCover(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = editing
        ? await fetch("/api/admin/communities", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...form }) })
        : await fetch("/api/admin/communities", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
        alert("Erro ao salvar: " + (err.error ?? res.status))
        setSaving(false)
        return
      }
    } catch (e) {
      alert("Erro de rede: " + String(e))
      setSaving(false)
      return
    }
    await load()
    setOpen(false)
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("Deletar esta comunidade?")) return
    await fetch("/api/admin/communities", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    await load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Comunidades</h1>
          <p className="text-sm text-muted-foreground">{items.length} item(s)</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors">
          <Plus className="w-4 h-4" /> Nova Comunidade
        </button>
      </div>

      <div className="space-y-2">
        {items.map(c => (
          <div key={c.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
            <div className="w-16 h-10 rounded-lg overflow-hidden bg-neutral-800 shrink-0">
              {c.cover_image_url && <img src={c.cover_image_url} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{c.title}</p>
              <p className="text-xs text-muted-foreground">{c.platform}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => openEdit(c)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleDelete(c.id)} className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-muted-foreground text-center py-12">Nenhuma comunidade ainda. Clique em "Nova Comunidade" para começar.</p>}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-semibold">{editing ? "Editar Comunidade" : "Nova Comunidade"}</h2>
              <button onClick={() => setOpen(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Nome *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-ring" placeholder="Ex: WhatsApp Academy.IA" />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Descrição</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-ring resize-none" placeholder="Descreva a comunidade..." />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Plataforma</label>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.map(p => (
                    <button key={p} onClick={() => setForm(f => ({ ...f, platform: p }))} className={cn("px-3 py-1 text-xs rounded-full border transition-colors", form.platform === p ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground")}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Link de entrada *</label>
                <input value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-ring" placeholder="https://chat.whatsapp.com/..." />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Capa</label>
                {form.cover_image_url && (
                  <div className="mb-2 relative w-full aspect-video rounded-lg overflow-hidden bg-neutral-800">
                    <img src={form.cover_image_url} className="w-full h-full object-cover" />
                    <button onClick={() => setForm(f => ({ ...f, cover_image_url: "" }))} className="absolute top-2 right-2 bg-black/60 rounded-full p-1"><X className="w-3 h-3 text-white" /></button>
                  </div>
                )}
                <input ref={coverRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                <button onClick={() => coverRef.current?.click()} disabled={uploadingCover} className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center">
                  {uploadingCover ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploadingCover ? "Enviando..." : "Fazer upload da capa"}
                </button>
              </div>
            </div>
            <div className="flex gap-2 p-5 border-t border-border">
              <button onClick={() => setOpen(false)} className="flex-1 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancelar</button>
              <button onClick={handleSave} disabled={saving || !form.title || !form.link} className="flex-1 py-2 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50">
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
