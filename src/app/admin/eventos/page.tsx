"use client"

import { useEffect, useState, useRef } from "react"
import { Plus, Pencil, Trash2, Upload, X, Loader2 } from "lucide-react"

interface Event {
  id: string
  title: string
  cover_image_url: string | null
  date: string | null
  time: string | null
  type: "event" | "class"
  recording_url: string | null
  locked: boolean
}

type EventType = "event" | "class"
const emptyForm: { title: string; type: EventType; date: string; time: string; locked: boolean; cover_image_url: string; recording_url: string } = { title: "", type: "class", date: "", time: "", locked: true, cover_image_url: "", recording_url: "" }

export default function AdminEventosPage() {
  const [items, setItems] = useState<Event[]>([])
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Event | null>(null)
  const [form, setForm] = useState<typeof emptyForm>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const coverRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)

  async function load() {
    const res = await fetch("/api/admin/events")
    setItems(await res.json())
  }

  useEffect(() => { load() }, [])

  function openNew() { setEditing(null); setForm(emptyForm); setOpen(true) }
  function openEdit(e: Event) {
    setEditing(e)
    setForm({ title: e.title, type: e.type, date: e.date ?? "", time: e.time ?? "", locked: e.locked, cover_image_url: e.cover_image_url ?? "", recording_url: e.recording_url ?? "" })
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
      xhr.onload = () => { const { url } = JSON.parse(xhr.responseText); resolve(url) }
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
    setUploadingVideo(true); setVideoProgress(0)
    const url = await uploadFile(file, "videos", setVideoProgress)
    setForm(f => ({ ...f, recording_url: url }))
    setUploadingVideo(false); setVideoProgress(0)
  }

  async function handleSave() {
    setSaving(true)
    if (editing) {
      await fetch("/api/admin/events", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: editing.id, ...form }) })
    } else {
      await fetch("/api/admin/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
    }
    await load(); setOpen(false); setSaving(false)
  }

  async function handleDelete(id: string) {
    if (!confirm("Deletar este evento?")) return
    await fetch("/api/admin/events", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
    await load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Eventos & Lives</h1>
          <p className="text-sm text-muted-foreground">{items.length} item(s)</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors">
          <Plus className="w-4 h-4" /> Novo Evento
        </button>
      </div>

      <div className="space-y-2">
        {items.map(ev => (
          <div key={ev.id} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
            <div className="w-16 h-10 rounded-lg overflow-hidden bg-neutral-800 shrink-0">
              {ev.cover_image_url && <img src={ev.cover_image_url} className="w-full h-full object-cover" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{ev.title}</p>
              <p className="text-xs text-muted-foreground capitalize">{ev.type === "class" ? "Classe" : "Evento"} · {ev.date || "—"}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => openEdit(ev)} className="p-1.5 text-muted-foreground hover:text-foreground"><Pencil className="w-3.5 h-3.5" /></button>
              <button onClick={() => handleDelete(ev.id)} className="p-1.5 text-muted-foreground hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-muted-foreground text-center py-12">Nenhum evento ainda.</p>}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-semibold">{editing ? "Editar Evento" : "Novo Evento"}</h2>
              <button onClick={() => setOpen(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Título *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-ring" placeholder="Ex: Reagindo aos Projetos (30/04)" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">Tipo</label>
                  <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as "event" | "class" }))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none">
                    <option value="class">Classe (live gravada)</option>
                    <option value="event">Evento (ao vivo)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground block mb-1.5">Data</label>
                  <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.locked} onChange={e => setForm(f => ({ ...f, locked: e.target.checked }))} />
                  <span className="text-sm">Bloqueado (requer upgrade)</span>
                </label>
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Capa</label>
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
                <label className="text-xs font-medium text-muted-foreground block mb-1.5">Gravação (vídeo da live)</label>
                {form.recording_url && <p className="text-xs text-green-400 mb-2">✓ Vídeo carregado</p>}
                {uploadingVideo && (
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>Enviando...</span><span>{videoProgress}%</span></div>
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
              <button onClick={() => setOpen(false)} className="flex-1 py-2 text-sm text-muted-foreground">Cancelar</button>
              <button onClick={handleSave} disabled={saving || !form.title} className="flex-1 py-2 bg-foreground text-background text-sm font-medium rounded-lg disabled:opacity-50">
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
