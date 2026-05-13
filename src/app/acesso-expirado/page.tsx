import Link from "next/link"
import { Lock } from "lucide-react"

export default function AcessoExpiradoPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
          <Lock className="w-7 h-7 text-red-400" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold mb-2">Acesso expirado</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Seu plano na Academy.IA expirou ou foi cancelado.
            Para continuar acessando todo o conteúdo, renove sua assinatura.
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 text-left space-y-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">O que você perde sem renovar</p>
          {["Acesso a todas as aulas", "Skills e recursos exclusivos", "Lives e eventos gravados", "Comunidade de membros"].map(item => (
            <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <a
            href="https://academyia.com.br"
            className="block w-full bg-foreground text-background py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Renovar assinatura →
          </a>
          <Link
            href="/login"
            className="block w-full text-muted-foreground text-sm hover:text-foreground transition-colors py-2"
          >
            Voltar ao login
          </Link>
        </div>
      </div>
    </div>
  )
}
