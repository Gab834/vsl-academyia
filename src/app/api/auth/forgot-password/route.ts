import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: "Email obrigatório" }, { status: 400 })

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"

  await supabaseAdmin.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/redefinir-senha`,
  })

  // Always 200 to avoid email enumeration
  return NextResponse.json({ ok: true })
}
