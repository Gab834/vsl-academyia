import { supabaseAdmin } from "@/lib/supabase"
import LivesClient from "./LivesClient"

export const revalidate = 0

export default async function LivesPage() {
  const { data: events } = await supabaseAdmin
    .from("events")
    .select("*")
    .order("created_at", { ascending: false })

  return <LivesClient initialEvents={events ?? []} />
}
