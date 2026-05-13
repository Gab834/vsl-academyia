"use client"

import { useEffect, useState, useRef } from "react"
import { Plus, Pencil, Trash2, Upload, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Resource {
  id: string
  title: string
  description: string
  cover_image_url: string | null
  download_url: string | null
  tracks: string[]
  tags: string[]
}

const TRACKS = ["skills", "ferramentas", "claude-code-na-pratica", "lives-gravadas", "agentes", "mapa-mental"]

const emptyForm = { title: "", description: "", tracks: [] as string[], tags: [] as string[], cover_image_url: "", download_url: "" }

export default function AdminRecursosPage() {
  const [items, setItems] = useState<Resource[]>([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Resource | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)
  const coverRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function load() {
    const res = await fetch("/api/admin/resources", { credentials: "include" })
    const data = await res.json()
    setItems(Array.isArray(data) ? data : [])
  }

  useEffect(() => { load() }, [])

  function openNew() {
    setEditing(null)
    setForm(emptyForm)
    setOpen(true)
  }

  function openEdit(r: Resource) {
    setEditing(r)
    setForm({ title: r.title, description: r.description, tracks: r.tracks, tags: r.tags, cover_image_url: r.cover_image_url ?? "", download_url: r.download_url ?? "" })
    setOpen(true)
  }

  async function uploadFile(file: File, folder: string): Promise<string> {
    const fd = new FormData()
    fd.append("file", file)
    fd.append("folder", folder)
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd })
    const { url } = await res.json()
    return url
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingCover(true)
    const url = await uploadFile(file, "covers")
    setForm(f => ({ ...f, cover_image_url: url }))
    setUploadingCover(false)
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingFile(true)
    const url = await uploadFile(file, "downloads")
    setForm(f => ({ ...f, download_url: url }))
    setUploadingFile(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = editing
        ? await fetch("/api/admin/resources", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...form }) })
        : await fetch("/api/admin/resources", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })

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
    if (!confirm("Deletar este recurso?")) return
    await fetch("/api/admin/resources", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    await load()
  }

  function toggleTrack(t: string) {
    setForm(f => ({ ...f, tracks: f.tracks.includes(t) ? f.tracks.filter(x => x !== t) : [...f.tracks, t] }))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Recursos</h1>
          <p className="text-sm text-muted-foreground">{items.length} item(s)</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors">
          <Plus className="w-4 h-4" /> Novo Recurso
        </button>
      </div>

      <div className="space-y-2">
        {items.map(r => (
          <div key={r.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
            <div className="w-16 h-10 rounded-lg overflow-hidden bg-neutral-800 shrink-0">
              {r.cover_image_url && <img src={r.cover_image_url} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{r.title}</p>
              <p className="text-xs text-muted-foreground">{r.tracks.join(", ")}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => openEdit(r)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => handleDelete(r.id)} className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-muted-foreground text-center py-12">Nenhum recurso ainda. Clique em "Novo Recurso" para começar.</p>}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-semibold">{editing ? "Editar Recurso" : "Novo Recurso"}</h2>
              <button onClick={() => setOpen(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Título *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-ring" placeholder="Ex: Skill Epic Paper" />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Descrição</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-ring resize-none" placeholder="Descreva o recurso..." />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Tracks</label>
                <div className="flex flex-wrap gap-2">
                  {TRACKS.map(t => (
                    <button key={t} onClick={() => toggleTrack(t)} className={cn("px-3 py-1 text-xs rounded-full border transition-colors", form.tracks.includes(t) ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground")}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Capa (thumbnail)</label>
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

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Arquivo para download (ZIP, PDF, etc.)</label>
                {form.download_url && <p className="text-xs text-green-400 mb-2 truncate">✓ {form.download_url.split("/").pop()}</p>}
                <input ref={fileRef} type="file" accept=".zip,.pdf,.rar,.txt,.md" onChange={handleFileUpload} className="hidden" />
                <button onClick={() => fileRef.current?.click()} disabled={uploadingFile} className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors w-full justify-center">
                  {uploadingFile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploadingFile ? "Enviando..." : "Fazer upload do arquivo"}
                </button>
              </div>
            </div>
            <div className="flex gap-2 p-5 border-t border-border">
              <button onClick={() => setOpen(false)} className="flex-1 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancelar</button>
              <button onClick={handleSave} disabled={saving || !form.title} className="flex-1 py-2 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50">
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
