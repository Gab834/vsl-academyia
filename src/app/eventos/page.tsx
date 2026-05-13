import { supabaseAdmin } from "@/lib/supabase"
import EventosClient from "./EventosClient"

export const revalidate = 0

export default async function EventosPage() {
  const { data: events } = await supabaseAdmin
    .from("events")
    .select("*")
    .order("created_at", { ascending: false })

  return <EventosClient initialEvents={events ?? []} />
}
