"use client"

import { useState } from "react"

export default function AdminUsuariosPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ ok?: boolean; password?: string; emailSent?: boolean; error?: string } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch("/api/admin/create-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      })
      const data = await res.json()
      setResult(data)
    } catch {
      setResult({ error: "Erro de conexão" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-2">Criar Acesso Manual</h1>
      <p className="text-muted-foreground mb-6 text-sm">
        Use quando o webhook falhar ou para criar acesso manualmente após uma venda.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email do comprador *</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="cliente@email.com"
            className="w-full border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nome (opcional)</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nome do cliente"
            className="w-full border border-border rounded-lg px-3 py-2 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground font-semibold py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition"
        >
          {loading ? "Criando acesso..." : "Criar Acesso + Enviar Email"}
        </button>
      </form>

      {result && (
        <div className={`mt-6 p-4 rounded-lg border ${result.error ? "border-red-500 bg-red-500/10" : "border-green-500 bg-green-500/10"}`}>
          {result.error ? (
            <p className="text-red-400 font-medium">Erro: {result.error}</p>
          ) : (
            <div className="space-y-2">
              <p className="text-green-400 font-semibold">✓ Acesso criado com sucesso!</p>
              <p className="text-sm"><span className="text-muted-foreground">Email:</span> {email}</p>
              <p className="text-sm"><span className="text-muted-foreground">Senha gerada:</span> <code className="bg-black/30 px-2 py-0.5 rounded font-mono">{result.password}</code></p>
              <p className="text-sm"><span className="text-muted-foreground">Email enviado:</span> {result.emailSent ? "✓ Sim" : "✗ Falhou — copie a senha acima e envie manualmente"}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
