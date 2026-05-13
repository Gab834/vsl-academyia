"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"

export default function RedefinirSenhaPage() {
  const [accessToken, setAccessToken] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [status, setStatus] = useState<"loading" | "form" | "success" | "error">("loading")
  const [error, setError] = useState("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const hash = window.location.hash
    const params = new URLSearchParams(hash.slice(1))
    const token = params.get("access_token")
    const type = params.get("type")
    if (token && type === "recovery") {
      setAccessToken(token)
      setStatus("form")
    } else {
      setStatus("error")
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (newPassword.length < 6) { setError("Mínimo 6 caracteres"); return }
    if (newPassword !== confirm) { setError("As senhas não coincidem"); return }
    setSaving(true)
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken, newPassword }),
    })
    if (res.ok) {
      setStatus("success")
      setTimeout(() => { window.location.href = "/login" }, 2500)
    } else {
      const d = await res.json()
      setError(d.error ?? "Erro ao redefinir senha")
    }
    setSaving(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-[var(--epic-teal)] flex items-center justify-center mx-auto mb-4">
            <span className="text-lg font-bold text-white">A</span>
          </div>
          <h1 className="text-2xl font-semibold">Academy.IA</h1>
          <p className="text-sm text-muted-foreground mt-1">Redefinir senha</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          {status === "loading" && (
            <p className="text-sm text-muted-foreground text-center">Verificando link...</p>
          )}

          {status === "error" && (
            <div className="text-center space-y-3">
              <p className="text-sm text-red-400">Link inválido ou expirado.</p>
              <a href="/login" className="text-sm text-[var(--epic-teal)] hover:opacity-80 transition-opacity">
                ← Voltar ao login
              </a>
            </div>
          )}

          {status === "success" && (
            <div className="text-center space-y-2">
              <p className="text-sm text-green-400 font-medium">Senha redefinida com sucesso!</p>
              <p className="text-xs text-muted-foreground">Redirecionando para o login...</p>
            </div>
          )}

          {status === "form" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Nova senha</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-ring pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Confirmar nova senha</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Repita a senha"
                  required
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-ring"
                />
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50"
              >
                {saving ? "Salvando..." : "Redefinir senha"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
