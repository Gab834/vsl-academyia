"use client"

import { useEffect, useState, useRef } from "react"
import { Pencil, Check, X, Crown, Star, Infinity, Upload, Copy, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface Profile {
  id: string
  email: string
  name: string
  avatar_url: string | null
  plan: "mensal" | "anual" | "vitalicio"
  expires_at: string | null
  isAdmin: boolean
}

const PLAN_CONFIG = {
  mensal: {
    label: "Mensal", description: "Acesso renovado todo mês", icon: Star,
    gradient: "from-blue-500/20 to-blue-600/10", border: "border-blue-500/30",
    badge: "bg-blue-500/20 text-blue-400", iconColor: "text-blue-400",
  },
  anual: {
    label: "Anual", description: "Acesso pelo ano inteiro com desconto", icon: Crown,
    gradient: "from-[var(--epic-blue)]/20 to-[var(--epic-blue)]/10", border: "border-[var(--epic-blue)]/30",
    badge: "bg-[var(--epic-blue)]/20 text-[var(--epic-blue)]", iconColor: "text-[var(--epic-blue)]",
  },
  vitalicio: {
    label: "Vitalício", description: "Acesso para sempre, sem mensalidade", icon: Infinity,
    gradient: "from-amber-500/20 to-amber-600/10", border: "border-amber-500/30",
    badge: "bg-amber-500/20 text-amber-400", iconColor: "text-amber-400",
  },
}

function resizeImage(file: File, maxSize = 256): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ratio = Math.min(maxSize / img.width, maxSize / img.height)
      canvas.width = img.width * ratio
      canvas.height = img.height * ratio
      canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL("image/jpeg", 0.85))
    }
    img.onerror = reject
    img.src = url
  })
}

export default function ConfiguracoesPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState("")
  const [saving, setSaving] = useState(false)
  const [nameError, setNameError] = useState("")
  const [saved, setSaved] = useState("")
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [copied, setCopied] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetch("/api/auth/profile")
      .then(r => { if (!r.ok) throw new Error("auth"); return r.json() })
      .then(d => { setProfile(d); setNameInput(d.name ?? "") })
      .catch(() => {
        fetch("/api/auth/logout", { method: "POST" }).finally(() => {
          window.location.href = "/login"
        })
      })
  }, [])

  async function saveName() {
    if (!nameInput.trim()) return
    if (nameInput.trim() === profile?.name) { setEditingName(false); return }
    setSaving(true)
    setNameError("")
    const res = await fetch("/api/auth/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nameInput.trim() }),
    })
    if (res.ok) {
      setProfile(p => p ? { ...p, name: nameInput.trim() } : p)
      setEditingName(false)
      setSaved("nome")
      setTimeout(() => setSaved(""), 2000)
    } else {
      const d = await res.json()
      setNameError(d.error ?? "Erro ao salvar")
    }
    setSaving(false)
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingPhoto(true)
    try {
      const base64 = await resizeImage(file)
      const res = await fetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar_url: base64 }),
      })
      if (res.ok) {
        setProfile(p => p ? { ...p, avatar_url: base64 } : p)
        setSaved("foto")
        setTimeout(() => setSaved(""), 2000)
      }
    } finally {
      setUploadingPhoto(false)
      e.target.value = ""
    }
  }

  async function savePassword() {
    setPasswordError("")
    if (newPassword.length < 6) { setPasswordError("Mínimo 6 caracteres"); return }
    if (newPassword !== confirmPassword) { setPasswordError("As senhas não coincidem"); return }
    setSaving(true)
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newPassword }),
    })
    if (res.ok) {
      setChangingPassword(false)
      setNewPassword("")
      setConfirmPassword("")
      setSaved("senha")
      setTimeout(() => setSaved(""), 2000)
    } else {
      const d = await res.json()
      setPasswordError(d.error ?? "Erro ao salvar")
    }
    setSaving(false)
  }

  function copyEmail() {
    if (profile?.email) {
      navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  const initials = profile?.name?.slice(0, 2).toUpperCase() ?? ".."
  const plan = profile ? PLAN_CONFIG[profile.plan] : null
  const PlanIcon = plan?.icon

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-1">Configurações</h1>
      <p className="text-sm text-muted-foreground mb-8">Gerencie seu perfil e acesso</p>

      <div className="space-y-6">

        {/* Perfil */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Perfil</h2>
          <div className="flex items-center gap-5">
            <button onClick={() => fileRef.current?.click()} className="relative group shrink-0" disabled={uploadingPhoto}>
              <div className="w-16 h-16 rounded-full bg-[var(--epic-teal)] flex items-center justify-center overflow-hidden ring-2 ring-border group-hover:ring-[var(--epic-teal)] transition-all">
                {profile?.avatar_url
                  ? <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                  : <span className="text-xl font-semibold text-white">{initials}</span>
                }
              </div>
              <div className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                {uploadingPhoto
                  ? <span className="text-white text-xs">...</span>
                  : <Upload className="w-4 h-4 text-white" />
                }
              </div>
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />

            <div className="flex-1 min-w-0">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    autoFocus
                    value={nameInput}
                    onChange={e => setNameInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") saveName(); if (e.key === "Escape") setEditingName(false) }}
                    className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm font-medium w-full focus:outline-none focus:ring-1 focus:ring-[var(--epic-teal)]"
                  />
                  <button onClick={saveName} disabled={saving} className="text-green-400 hover:text-green-300 transition-colors shrink-0">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={() => { setEditingName(false); setNameInput(profile?.name ?? ""); setNameError("") }} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="font-medium truncate">{profile?.name ?? ""}</p>
                  <button onClick={() => setEditingName(true)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  {saved === "nome" && <span className="text-xs text-green-400">Salvo!</span>}
                  {saved === "foto" && <span className="text-xs text-green-400">Foto atualizada!</span>}
                </div>
              )}
              {nameError && <p className="text-xs text-red-400 mt-1">{nameError}</p>}
              <p className="text-sm text-muted-foreground truncate mt-0.5">{profile?.email ?? ""}</p>
            </div>
          </div>
        </div>

        {/* Credenciais */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Credenciais de acesso</h2>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Email</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium flex-1 truncate">{profile?.email ?? ""}</p>
                <button onClick={copyEmail} className="text-muted-foreground hover:text-foreground transition-colors shrink-0" title="Copiar email">
                  <Copy className="w-3.5 h-3.5" />
                </button>
                {copied && <span className="text-xs text-green-400">Copiado!</span>}
              </div>
            </div>

            <div className="border-t border-border pt-3">
              <p className="text-xs text-muted-foreground mb-2">Senha</p>
              {!changingPassword ? (
                <button
                  onClick={() => setChangingPassword(true)}
                  className="text-sm text-[var(--epic-teal)] hover:opacity-80 transition-opacity"
                >
                  Alterar senha →
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Nova senha (mín. 6 caracteres)"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-ring pr-10"
                    />
                    <button onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <input
                    type="password"
                    placeholder="Confirmar nova senha"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && savePassword()}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-ring"
                  />
                  {passwordError && <p className="text-xs text-red-400">{passwordError}</p>}
                  {saved === "senha" && <p className="text-xs text-green-400">Senha alterada com sucesso!</p>}
                  <div className="flex gap-2">
                    <button onClick={savePassword} disabled={saving} className="px-4 py-1.5 bg-foreground text-background text-sm font-medium rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity">
                      {saving ? "Salvando..." : "Salvar senha"}
                    </button>
                    <button onClick={() => { setChangingPassword(false); setNewPassword(""); setConfirmPassword(""); setPasswordError("") }} className="px-4 py-1.5 text-muted-foreground text-sm hover:text-foreground transition-colors">
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Plano */}
        {plan && PlanIcon && (
          <div className={cn("rounded-2xl p-6 border bg-gradient-to-br space-y-4", plan.gradient, plan.border)}>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Meu Plano</h2>
              <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", plan.badge)}>Ativo</span>
            </div>
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-xl bg-black/20 flex items-center justify-center shrink-0", plan.iconColor)}>
                <PlanIcon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-semibold">Academy.IA — {plan.label}</p>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
            </div>
            <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Plataforma</p>
                <p className="text-sm font-medium">Academy.IA</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Status</p>
                <p className={cn("text-sm font-medium", plan.iconColor)}>Ativo</p>
              </div>
              {profile?.expires_at && (
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground mb-0.5">Próxima renovação</p>
                  <p className="text-sm font-medium">
                    {new Date(profile.expires_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
                  </p>
                </div>
              )}
              {profile?.plan === "vitalicio" && (
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground mb-0.5">Validade</p>
                  <p className="text-sm font-medium">Para sempre</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
