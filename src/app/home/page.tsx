import { cookies } from "next/headers"
import { supabaseAdmin } from "@/lib/supabase"
import { HomeContent } from "./HomeContent"

export const revalidate = 0

export default async function HomePage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("member_token")?.value

  const [{ data: resources }, { data: lessons }, userResult] = await Promise.all([
    supabaseAdmin.from("resources").select("*").order("created_at", { ascending: false }),
    supabaseAdmin.from("lessons").select("*").order("order", { ascending: true }),
    token ? supabaseAdmin.auth.getUser(token) : Promise.resolve({ data: { user: null } }),
  ])

  const user = userResult.data.user
  const userName: string =
    user?.user_metadata?.full_name ??
    user?.user_metadata?.name ??
    user?.email?.split("@")[0] ??
    "Membro"

  return <HomeContent resources={resources ?? []} lessons={lessons ?? []} userName={userName} />
}
