"use client"

import { useEffect, useState, useRef } from "react"
import { Plus, Pencil, Trash2, Upload, X, Loader2, Lock, Unlock } from "lucide-react"

interface Lesson {
  id: string
  title: string
  description: string
  cover_image_url: string | null
  video_url: string | null
  duration: string | null
  track: string
  locked: boolean
  order: number
}

const TRACKS = ["skills", "ferramentas", "claude-code-na-pratica", "lives-gravadas", "agentes", "mapa-mental"]
const emptyForm = { title: "", description: "", track: "claude-code-na-pratica", order: 0, locked: true, duration: "", cover_image_url: "", video_url: "" }

export default function AdminAulasPage() {
  const [items, setItems] = useState<Lesson[]>([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Lesson | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const coverRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)

  async function load() {
    const res = await fetch("/api/admin/lessons", { credentials: "include" })
    const data = await res.json()
    setItems(Array.isArray(data) ? data : [])
  }

  useEffect(() => { load() }, [])

  function openNew() { setEditing(null); setForm(emptyForm); setOpen(true) }
  function openEdit(l: Lesson) {
    setEditing(l)
    setForm({ title: l.title, description: l.description, track: l.track, order: l.order, locked: l.locked, duration: l.duration ?? "", cover_image_url: l.cover_image_url ?? "", video_url: l.video_url ?? "" })
    setOpen(true)
  }

  async function uploadFile(file: File, folder: string, onProgress?: (n: number) => void): Promise<string> {
    const fd = new FormData()
    fd.append("file", file)
    fd.append("folder", folder)

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open("POST", "/api/admin/upload")
      xhr.upload.onprogress = e => { if (e.lengthComputable && onProgress) onProgress(Math.round(e.loaded / e.total * 100)) }
      xhr.onload = () => {
        const { url } = JSON.parse(xhr.responseText)
        resolve(url)
      }
      xhr.onerror = reject
      xhr.send(fd)
    })
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploadingCover(true)
    const url = await uploadFile(file, "covers")
    setForm(f => ({ ...f, cover_image_url: url }))
    setUploadingCover(false)
  }

  async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploadingVideo(true)
    setVideoProgress(0)
    const url = await uploadFile(file, "videos", setVideoProgress)
    setForm(f => ({ ...f, video_url: url }))
    setUploadingVideo(false)
    setVideoProgress(0)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = editing
        ? await fetch("/api/admin/lessons", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...form }) })
        : await fetch("/api/admin/lessons", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
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
    await load(); setOpen(false); setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("Deletar esta aula?")) return
    await fetch("/api/admin/lessons", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    await load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Aulas</h1>
          <p className="text-sm text-muted-foreground">{items.length} aula(s)</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors">
          <Plus className="w-4 h-4" /> Nova Aula
        </button>
      </div>

      <div className="space-y-2">
        {items.map(l => (
          <div key={l.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
            <div className="w-16 h-10 rounded-lg overflow-hidden bg-neutral-800 shrink-0">
              {l.cover_image_url && <img src={l.cover_image_url} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{l.title}</p>
              <p className="text-xs text-muted-foreground">{l.track} · {l.duration || "—"}</p>
            </div>
            <div className="shrink-0">
              {l.locked ? <Lock className="w-3.5 h-3.5 text-muted-foreground" /> : <Unlock className="w-3.5 h-3.5 text-green-400" />}
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => openEdit(l)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
              <button onClick={() => handleDelete(l.id)} className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-muted-foreground text-center py-12">Nenhuma aula ainda.</p>}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-semibold">{editing ? "Editar Aula" : "Nova Aula"}</h2>
              <button onClick={() => setOpen(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Título *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-ring" placeholder="Ex: Aula 1: Introdução" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Descrição</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-ring resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">Track</label>
                  <select value={form.track} onChange={e => setForm(f => ({ ...f, track: e.target.value }))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none">
                    {TRACKS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">Duração (ex: 28:30)</label>
                  <input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none" placeholder="28:30" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">Ordem</label>
                  <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: Number(e.target.value) }))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none" />
                </div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.locked} onChange={e => setForm(f => ({ ...f, locked: e.target.checked }))} className="rounded" />
                    <span className="text-sm">Aula bloqueada</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Capa (thumbnail) <span className="text-neutral-500">— 1280×720px (16:9)</span></label>
                {form.cover_image_url && (
                  <div className="mb-2 relative aspect-video rounded-lg overflow-hidden bg-neutral-800">
                    <img src={form.cover_image_url} className="w-full h-full object-cover" />
                    <button onClick={() => setForm(f => ({ ...f, cover_image_url: "" }))} className="absolute top-2 right-2 bg-black/60 rounded-full p-1"><X className="w-3 h-3 text-white" /></button>
                  </div>
                )}
                <input ref={coverRef} type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
                <button onClick={() => coverRef.current?.click()} disabled={uploadingCover} className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground w-full justify-center">
                  {uploadingCover ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploadingCover ? "Enviando..." : "Upload da capa"}
                </button>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Vídeo da aula</label>
                {form.video_url && <p className="text-xs text-green-400 mb-2">✓ Vídeo carregado</p>}
                {uploadingVideo && (
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Enviando vídeo...</span><span>{videoProgress}%</span>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-foreground transition-all rounded-full" style={{ width: `${videoProgress}%` }} />
                    </div>
                  </div>
                )}
                <input ref={videoRef} type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" />
                <button onClick={() => videoRef.current?.click()} disabled={uploadingVideo} className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:text-foreground w-full justify-center">
                  {uploadingVideo ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                  {uploadingVideo ? `Enviando ${videoProgress}%...` : "Upload do vídeo"}
                </button>
              </div>
            </div>
            <div className="flex gap-2 p-5 border-t border-border">
              <button onClick={() => setOpen(false)} className="flex-1 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">Cancelar</button>
              <button onClick={handleSave} disabled={saving || !form.title} className="flex-1 py-2 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 disabled:opacity-50">
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
