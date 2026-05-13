import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { getActiveSubscription } from "@/lib/subscriptions"

const ADMIN_EMAILS = ["gdealmeida714@gmail.com", "gdealmeida629@gmail.com"]

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()

  const { data, error } = await supabaseAdmin.auth.signInWithPassword({ email, password })

  if (error || !data.session) {
    return NextResponse.json({ error: "Email ou senha incorretos" }, { status: 401 })
  }

  // Admin nunca é bloqueado
  if (!ADMIN_EMAILS.includes(email)) {
    const subscription = await getActiveSubscription(email)
    if (!subscription) {
      return NextResponse.json({ error: "expired" }, { status: 403 })
    }
  }

  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set("member_token", data.session.access_token, cookieOpts)
  res.cookies.set("member_refresh", data.session.refresh_token, cookieOpts)
  return res
}
