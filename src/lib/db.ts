import { supabase, supabaseAdmin } from "./supabase"

// ── Resources ──────────────────────────────────────────────
export async function getResources(trackFilter?: string) {
  let query = supabase.from("resources").select("*").order("created_at", { ascending: false })
  if (trackFilter && trackFilter !== "all") {
    query = query.contains("tracks", [trackFilter])
  }
  const { data } = await query
  return data ?? []
}

export async function getResourceBySlug(slug: string) {
  const { data } = await supabase.from("resources").select("*").eq("slug", slug).single()
  return data
}

// ── Lessons ────────────────────────────────────────────────
export async function getLessons(trackFilter?: string) {
  let query = supabase.from("lessons").select("*").order("order", { ascending: true })
  if (trackFilter) query = query.eq("track", trackFilter)
  const { data } = await query
  return data ?? []
}

export async function getLessonBySlug(slug: string) {
  const { data } = await supabase.from("lessons").select("*").eq("slug", slug).single()
  return data
}

// ── Events ─────────────────────────────────────────────────
export async function getEvents(typeFilter?: string) {
  let query = supabase.from("events").select("*").order("created_at", { ascending: false })
  if (typeFilter && typeFilter !== "all") query = query.eq("type", typeFilter)
  const { data } = await query
  return data ?? []
}

// ── Admin: Upload ──────────────────────────────────────────
export async function uploadFile(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop()
  const name = `${folder}/${Date.now()}.${ext}`
  const { error } = await supabaseAdmin.storage.from("academy").upload(name, file, { upsert: true })
  if (error) throw error
  const { data } = supabaseAdmin.storage.from("academy").getPublicUrl(name)
  return data.publicUrl
}

// ── Admin: Resources CRUD ──────────────────────────────────
export async function createResource(payload: Record<string, unknown>) {
  const { data, error } = await supabaseAdmin.from("resources").insert(payload).select().single()
  if (error) throw error
  return data
}

export async function updateResource(id: string, payload: Record<string, unknown>) {
  const { error } = await supabaseAdmin.from("resources").update({ ...payload, updated_at: new Date().toISOString() }).eq("id", id)
  if (error) throw error
}

export async function deleteResource(id: string) {
  const { error } = await supabaseAdmin.from("resources").delete().eq("id", id)
  if (error) throw error
}

// ── Admin: Lessons CRUD ────────────────────────────────────
export async function createLesson(payload: Record<string, unknown>) {
  const { data, error } = await supabaseAdmin.from("lessons").insert(payload).select().single()
  if (error) throw error
  return data
}

export async function updateLesson(id: string, payload: Record<string, unknown>) {
  const { error } = await supabaseAdmin.from("lessons").update(payload).eq("id", id)
  if (error) throw error
}

export async function deleteLesson(id: string) {
  const { error } = await supabaseAdmin.from("lessons").delete().eq("id", id)
  if (error) throw error
}

// ── Admin: Events CRUD ─────────────────────────────────────
export async function createEvent(payload: Record<string, unknown>) {
  const { data, error } = await supabaseAdmin.from("events").insert(payload).select().single()
  if (error) throw error
  return data
}

export async function updateEvent(id: string, payload: Record<string, unknown>) {
  const { error } = await supabaseAdmin.from("events").update(payload).eq("id", id)
  if (error) throw error
}

export async function deleteEvent(id: string) {
  const { error } = await supabaseAdmin.from("events").delete().eq("id", id)
  if (error) throw error
}
