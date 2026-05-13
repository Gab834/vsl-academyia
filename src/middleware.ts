import { NextRequest, NextResponse } from "next/server"

const MEMBER_ROUTES = ["/home", "/recursos", "/aulas", "/eventos", "/lives", "/comunidade", "/configuracoes"]
const PUBLIC_ROUTES = ["/login", "/admin/login", "/acesso-expirado", "/redefinir-senha", "/api/auth/login", "/api/auth/forgot-password", "/api/auth/reset-password", "/api/admin/login", "/api/webhook"]

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Proteção do painel admin
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get("admin_token")?.value
    if (token !== process.env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL("/admin/login", req.url))
    }
  }

  // Proteção das rotas de membros
  const isMemberRoute = MEMBER_ROUTES.some(r => pathname === r || pathname.startsWith(r + "/"))
  if (isMemberRoute) {
    const token = req.cookies.get("member_token")?.value
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/home/:path*", "/home", "/recursos/:path*", "/recursos", "/aulas/:path*", "/aulas", "/eventos/:path*", "/eventos", "/lives/:path*", "/lives", "/comunidade/:path*", "/comunidade", "/configuracoes"],
}
