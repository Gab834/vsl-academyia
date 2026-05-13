"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Play, Calendar, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const items = [
  { label: "Início", href: "/home", icon: Home },
  { label: "Recursos", href: "/recursos", icon: BookOpen },
  { label: "Aulas", href: "/aulas", icon: Play },
  { label: "Eventos", href: "/eventos", icon: Calendar },
  { label: "Comunidade", href: "/comunidade", icon: Users },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-sidebar border-t border-border z-40">
      <div className="flex items-center justify-around h-16">
        {items.map(item => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
