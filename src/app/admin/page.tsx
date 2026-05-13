import Link from "next/link"
import { BookOpen, Play, Calendar } from "lucide-react"

const cards = [
  { label: "Recursos", desc: "Skills, prompts e templates", href: "/admin/recursos", icon: BookOpen },
  { label: "Aulas", desc: "Vídeo-aulas dos cursos", href: "/admin/aulas", icon: Play },
  { label: "Eventos", desc: "Lives e eventos gravados", href: "/admin/eventos", icon: Calendar },
]

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Painel Admin</h1>
      <p className="text-sm text-muted-foreground mb-8">Gerencie o conteúdo da Academy.IA</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c) => {
          const Icon = c.icon
          return (
            <Link
              key={c.href}
              href={c.href}
              className="block p-6 bg-card border border-border rounded-xl hover:border-border/60 hover:bg-[var(--epic-card-hover)] transition-all group"
            >
              <Icon className="w-6 h-6 mb-3 text-muted-foreground group-hover:text-foreground transition-colors" />
              <p className="font-medium mb-1">{c.label}</p>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
