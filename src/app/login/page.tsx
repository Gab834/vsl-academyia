"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LoginBackground } from "@/components/login-background"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [forgotMode, setForgotMode] = useState(false)
  const [forgotEmail, setForgotEmail] = useState("")
  const [forgotSent, setForgotSent] = useState(false)
  const [forgotLoading, setForgotLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    if (res.ok) {
      router.push("/home")
    } else {
      const data = await res.json()
      if (data.error === "expired") {
        router.push("/acesso-expirado")
      } else {
        setError(data.error ?? "Erro ao fazer login")
      }
    }
    setLoading(false)
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault()
    setForgotLoading(true)
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: forgotEmail }),
    })
    setForgotSent(true)
    setForgotLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
      <LoginBackground />
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Academy.IA" className="w-16 h-16 object-contain mx-auto mb-4" />
          <p className="text-sm text-muted-foreground mt-1">
            {forgotMode ? "Recuperar acesso" : "Entre com suas credenciais de acesso"}
          </p>
        </div>

        {!forgotMode ? (
          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-sm font-medium block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-ring"
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Senha</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-ring"
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
            <button
              type="button"
              onClick={() => setForgotMode(true)}
              className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Esqueci minha senha
            </button>
          </form>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            {forgotSent ? (
              <div className="text-center space-y-3">
                <p className="text-sm text-green-400 font-medium">Email enviado!</p>
                <p className="text-xs text-muted-foreground">
                  Se esse email estiver cadastrado, você receberá um link para redefinir sua senha.
                </p>
                <button
                  onClick={() => { setForgotMode(false); setForgotSent(false); setForgotEmail("") }}
                  className="text-sm text-[var(--epic-teal)] hover:opacity-80 transition-opacity"
                >
                  ← Voltar ao login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgot} className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Seu email de acesso</label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:border-ring"
                  />
                </div>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50"
                >
                  {forgotLoading ? "Enviando..." : "Enviar link de recuperação"}
                </button>
                <button
                  type="button"
                  onClick={() => setForgotMode(false)}
                  className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Voltar ao login
                </button>
              </form>
            )}
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-4">
          Acesso exclusivo para membros. Compre em{" "}
          <a href="#" className="underline hover:text-foreground">academyia.com</a>
        </p>
      </div>
    </div>
  )
}
