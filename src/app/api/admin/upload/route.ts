import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"

export async function POST(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value
  if (token !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const form = await req.formData()
  const file = form.get("file") as File
  const folder = (form.get("folder") as string) ?? "misc"

  if (!file) return NextResponse.json({ error: "Nenhum arquivo" }, { status: 400 })

  const ext = file.name.split(".").pop()
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const buffer = Buffer.from(await file.arrayBuffer())

  const { error } = await supabaseAdmin.storage
    .from("academy")
    .upload(path, buffer, { contentType: file.type, upsert: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const { data } = supabaseAdmin.storage.from("academy").getPublicUrl(path)
  return NextResponse.json({ url: data.publicUrl })
}
