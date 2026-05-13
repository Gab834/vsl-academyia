import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { getAuthUser, applyNewTokens } from "@/lib/auth-server"

const ADMIN_EMAILS = ["gdealmeida714@gmail.com", "gdealmeida629@gmail.com"]

export async function GET(req: NextRequest) {
  const { user, newTokens } = await getAuthUser(req)
  if (!user) return NextResponse.json({ user: null })

  const name: string =
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split("@")[0] ??
    "Membro"

  const isAdmin = ADMIN_EMAILS.includes(user.email ?? "")

  let avatar_url: string | null = null
  let plan = isAdmin ? "vitalicio" : "mensal"

  try {
    const [{ data: profileRow }, { data: subscription }] = await Promise.all([
      supabaseAdmin.from("profiles").select("avatar_url").eq("user_id", user.id).single(),
      isAdmin
        ? Promise.resolve({ data: null })
        : supabaseAdmin.from("subscriptions").select("plan").eq("email", user.email ?? "").order("created_at", { ascending: false }).limit(1).single(),
    ])
    avatar_url = profileRow?.avatar_url ?? null
    if (!isAdmin) plan = subscription?.plan ?? "mensal"
  } catch {}

  const res = NextResponse.json({
    user: {
      name,
      email: user.email,
      avatar_url,
      plan,
    }
  })
  if (newTokens) applyNewTokens(res, newTokens)
  return res
}
