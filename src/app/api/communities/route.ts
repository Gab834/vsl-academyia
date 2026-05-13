import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { getAuthUser } from "@/lib/auth-server"

export async function GET(req: NextRequest) {
  const { user } = await getAuthUser(req)
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 })

  const { data } = await supabaseAdmin.from("communities").select("*").order("created_at", { ascending: false })
  return NextResponse.json(data ?? [])
}
