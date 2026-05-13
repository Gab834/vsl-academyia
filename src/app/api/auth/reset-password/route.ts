import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  const { accessToken, newPassword } = await req.json()
  if (!accessToken || !newPassword) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
  }
  if (newPassword.length < 6) {
    return NextResponse.json({ error: "Mínimo 6 caracteres" }, { status: 400 })
  }

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken)
  if (error || !user) {
    return NextResponse.json({ error: "Link inválido ou expirado" }, { status: 401 })
  }

  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
    password: newPassword,
  })
  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
