import Link from "next/link"
import { LayoutDashboard, BookOpen, Play, Calendar, Users, MessagesSquare, ArrowLeft, UserPlus } from "lucide-react"

const adminNav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Recursos", href: "/admin/recursos", icon: BookOpen },
  { label: "Aulas", href: "/admin/aulas", icon: Play },
  { label: "Eventos", href: "/admin/eventos", icon: Calendar },
  { label: "Comunidades", href: "/admin/comunidades", icon: MessagesSquare },
  { label: "Assinantes", href: "/admin/assinantes", icon: Users },
  { label: "Criar Acesso", href: "/admin/usuarios", icon: UserPlus },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-52 shrink-0 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <p className="text-sm font-semibold">Academy.IA</p>
          <p className="text-xs text-muted-foreground">Admin</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5">
          {adminNav.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-3 border-t border-border">
          <Link href="/home" className="flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Voltar ao site
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}
