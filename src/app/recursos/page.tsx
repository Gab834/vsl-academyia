import { supabaseAdmin } from "@/lib/supabase"
import RecursosClient from "./RecursosClient"

export const revalidate = 0

export default async function RecursosPage() {
  const { data: resources } = await supabaseAdmin
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false })

  return <RecursosClient initialResources={resources ?? []} />
}
