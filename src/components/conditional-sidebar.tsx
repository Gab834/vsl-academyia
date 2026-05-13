"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { MobileNav } from "@/components/mobile-nav"

export function ConditionalSidebar() {
  const pathname = usePathname()
  const hideNav = pathname.startsWith("/admin") || pathname.startsWith("/login") || pathname.startsWith("/acesso-expirado") || pathname.startsWith("/reset-password")
  if (hideNav) return null
  return (
    <>
      <Sidebar />
      <MobileNav />
    </>
  )
}
