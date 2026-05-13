import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { getAuthUser, applyNewTokens } from "@/lib/auth-server"

const ADMIN_EMAILS = ["gdealmeida714@gmail.com", "gdealmeida629@gmail.com"]

export async function GET(req: NextRequest) {
  const { user, newTokens } = await getAuthUser(req)
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

  const isAdmin = ADMIN_EMAILS.includes(user.email ?? "")

  const [{ data: subscription }, { data: profile }] = await Promise.all([
    supabaseAdmin
      .from("subscriptions")
      .select("plan, expires_at, status")
      .eq("email", user.email ?? "")
      .order("created_at", { ascending: false })
      .limit(1)
      .single(),
    supabaseAdmin
      .from("profiles")
      .select("avatar_url")
      .eq("user_id", user.id)
      .single(),
  ])

  const plan = isAdmin ? "vitalicio" : (subscription?.plan ?? "mensal")
  const expiresAt = isAdmin ? null : (subscription?.expires_at ?? null)

  const res = NextResponse.json({
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name ?? user.user_metadata?.name ?? user.email?.split("@")[0] ?? "Membro",
    avatar_url: profile?.avatar_url ?? null,
    plan,
    expires_at: expiresAt,
    isAdmin,
  })
  if (newTokens) applyNewTokens(res, newTokens)
  return res
}

export async function PATCH(req: NextRequest) {
  const { user, newTokens } = await getAuthUser(req)
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

  const body = await req.json()

  // Avatar vai para tabela profiles (não no JWT)
  if (body.avatar_url !== undefined) {
    await supabaseAdmin
      .from("profiles")
      .upsert({ user_id: user.id, avatar_url: body.avatar_url, updated_at: new Date().toISOString() })
  }

  // Nome vai para user_metadata (é pequeno, não quebra o JWT)
  if (body.name) {
    const { error } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
      user_metadata: { ...user.user_metadata, full_name: body.name, avatar_url: "" },
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const res = NextResponse.json({ ok: true })
  if (newTokens) applyNewTokens(res, newTokens)
  return res
}
