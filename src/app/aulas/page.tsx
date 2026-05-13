import { supabaseAdmin } from "@/lib/supabase"
import AulasClient from "./AulasClient"

export const revalidate = 0

export default async function AulasPage() {
  const { data: lessons } = await supabaseAdmin
    .from("lessons")
    .select("*")
    .order("order", { ascending: true })

  return <AulasClient initialLessons={lessons ?? []} />
}
