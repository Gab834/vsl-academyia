import { supabaseAdmin } from "./supabase"

export type Plan = "mensal" | "anual" | "vitalicio"
export type SubscriptionStatus = "active" | "expired" | "cancelled"

function expiresAt(plan: Plan): Date | null {
  if (plan === "vitalicio") return null
  const d = new Date()
  if (plan === "mensal") d.setDate(d.getDate() + 30)
  if (plan === "anual") d.setDate(d.getDate() + 365)
  return d
}

export async function createSubscription(
  userId: string,
  email: string,
  plan: Plan,
  caktoTransactionId?: string,
) {
  const expires = expiresAt(plan)
  const { error } = await supabaseAdmin.from("subscriptions").insert({
    user_id: userId,
    email,
    plan,
    status: "active",
    expires_at: expires?.toISOString() ?? null,
    cakto_transaction_id: caktoTransactionId ?? null,
  })
  if (error) throw new Error(error.message)
}

export async function renewSubscription(email: string, plan: Plan) {
  const { data, error } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error || !data) {
    // Subscription not found - will be created by caller if needed
    return false
  }

  const currentExpiry = data.expires_at ? new Date(data.expires_at) : new Date()
  const base = currentExpiry > new Date() ? currentExpiry : new Date()
  const newExpiry = new Date(base)
  if (plan === "mensal") newExpiry.setDate(newExpiry.getDate() + 30)
  if (plan === "anual") newExpiry.setDate(newExpiry.getDate() + 365)

  await supabaseAdmin
    .from("subscriptions")
    .update({ status: "active", expires_at: newExpiry.toISOString(), updated_at: new Date().toISOString() })
    .eq("id", data.id)

  return true
}

export async function cancelSubscription(email: string) {
  await supabaseAdmin
    .from("subscriptions")
    .update({ status: "cancelled", updated_at: new Date().toISOString() })
    .eq("email", email)
    .eq("status", "active")
}

export async function getActiveSubscription(email: string) {
  const { data } = await supabaseAdmin
    .from("subscriptions")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (!data) return null

  // Vitalício nunca expira
  if (data.plan === "vitalicio") return data

  // Verifica se expirou
  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    await supabaseAdmin
      .from("subscriptions")
      .update({ status: "expired", updated_at: new Date().toISOString() })
      .eq("id", data.id)
    return null
  }

  if (data.status !== "active") return null

  return data
}
