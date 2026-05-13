import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { getAuthUser, applyNewTokens } from "@/lib/auth-server"

export async function POST(req: NextRequest) {
  const { user, newTokens } = await getAuthUser(req)
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

  const { newPassword } = await req.json()
  if (!newPassword || newPassword.length < 6) {
    return NextResponse.json({ error: "A senha deve ter pelo menos 6 caracteres" }, { status: 400 })
  }

  const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, { password: newPassword })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const res = NextResponse.json({ ok: true })
  if (newTokens) applyNewTokens(res, newTokens)
  return res
}
