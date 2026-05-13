import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "./supabase"

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 30,
  path: "/",
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SupabaseUser = NonNullable<any>

export interface AuthResult {
  user: SupabaseUser | null
  newTokens?: { access: string; refresh: string }
}

export async function getAuthUser(req: NextRequest): Promise<AuthResult> {
  const token = req.cookies.get("member_token")?.value
  if (!token) return { user: null }

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
  if (!error && user) return { user }

  // Token expirado — tenta renovar com refresh_token
  const refreshToken = req.cookies.get("member_refresh")?.value
  if (!refreshToken) return { user: null }

  const { data, error: refreshError } = await supabaseAdmin.auth.refreshSession({ refresh_token: refreshToken })
  if (refreshError || !data.user || !data.session) return { user: null }

  return {
    user: data.user,
    newTokens: { access: data.session.access_token, refresh: data.session.refresh_token },
  }
}

export function applyNewTokens(res: NextResponse, tokens: { access: string; refresh: string }) {
  res.cookies.set("member_token", tokens.access, COOKIE_OPTS)
  res.cookies.set("member_refresh", tokens.refresh, COOKIE_OPTS)
}
