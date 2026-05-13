import { notFound } from "next/navigation"
import { supabaseAdmin } from "@/lib/supabase"
import AulaClient from "./AulaClient"

export const revalidate = 0

interface Props {
  params: Promise<{ slug: string }>
}

export default async function AulaPage({ params }: Props) {
  const { slug } = await params
  const { data: lesson } = await supabaseAdmin
    .from("lessons")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!lesson) notFound()

  return <AulaClient lesson={lesson} />
}
