"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Home, BookOpen, Calendar, Play, Users, Settings, ShieldCheck, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

const baseNavItems = [
  { label: "Início", href: "/home", icon: Home },
  { label: "Recursos", href: "/recursos", icon: BookOpen },
  { label: "Eventos", href: "/eventos", icon: Calendar },
  { label: "Aulas", href: "/aulas", icon: Play },
  { label: "Comunidade", href: "/comunidade", icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<{ name: string; email: string; avatar_url: string | null; plan: string } | null>(null)
  const [communityCount, setCommunityCount] = useState<number | null>(null)

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
  }

  useEffect(() => {
    fetch("/api/auth/is-admin").then(r => r.json()).then(d => setIsAdmin(d.isAdmin))
    fetch("/api/auth/me").then(r => r.json()).then(d => { if (d.user) setUser(d.user) })
    fetch("/api/communities").then(r => r.json()).then(d => { if (Array.isArray(d)) setCommunityCount(d.length) })
  }, [])

  const navItems = baseNavItems.map(item =>
    item.href === "/comunidade" && communityCount !== null
      ? { ...item, badge: String(communityCount) }
      : item
  )

  return (
    <aside className="hidden md:flex md:flex-col w-60 shrink-0 h-screen sticky top-0 bg-sidebar border-r border-border overflow-y-auto">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Academy.IA" className="w-8 h-8 object-contain shrink-0 rounded-lg" />
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">Academy.IA</p>
            <p className="text-xs text-muted-foreground truncate">Área de membros</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5">
        <p className="text-xs text-muted-foreground px-3 py-2 uppercase tracking-wider">Conteúdo</p>
        {navItems.map((item: { label: string; href: string; icon: React.ElementType; badge?: string }) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-accent/50 text-foreground"
                  : "text-muted-foreground hover:bg-accent/30 hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-xs text-muted-foreground">({item.badge})</span>
              )}
            </Link>
          )
        })}

        {isAdmin && (
          <>
            <p className="text-xs text-muted-foreground px-3 py-2 uppercase tracking-wider mt-2">Admin</p>
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-2.5 px-3 py-1.5 rounded-md text-sm transition-colors",
                pathname.startsWith("/admin")
                  ? "bg-accent/50 text-foreground"
                  : "text-amber-400 hover:bg-accent/30 hover:text-amber-300"
              )}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="flex-1">Painel Admin</span>
            </Link>
          </>
        )}
      </nav>

      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-2.5 px-3 py-1.5">
          {!user ? (
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
              <div className="w-7 h-7 rounded-full bg-muted animate-pulse shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 bg-muted animate-pulse rounded w-24" />
                <div className="h-2 bg-muted animate-pulse rounded w-32" />
              </div>
            </div>
          ) : (
            <>
          <div className="w-7 h-7 rounded-full bg-[var(--epic-teal)] flex items-center justify-center shrink-0 overflow-hidden">
            {user.avatar_url
              ? <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              : <span className="text-xs font-semibold text-white">{user.name.slice(0, 2).toUpperCase()}</span>
            }
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            {user.plan === "vitalicio" && <p className="text-xs text-amber-400 truncate">Vitalício ✦</p>}
          </div>
            </>
          )}
          <Link href="/configuracoes" className="text-muted-foreground hover:text-foreground transition-colors" title="Configurações">
            <Settings className="w-3.5 h-3.5" />
          </Link>
          <button onClick={handleLogout} className="text-muted-foreground hover:text-red-400 transition-colors" title="Sair">
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  )
}
