import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { createSubscription, renewSubscription, cancelSubscription, type Plan } from "@/lib/subscriptions"

function generatePassword(length = 12): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$"
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

async function sendWelcomeEmail(email: string, password: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://academyia.com"
  const resendKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.EMAIL_FROM ?? "gdealmeida629@gmail.com"

  if (!resendKey) {
    console.log(`[webhook] RESEND_API_KEY não configurada. Credenciais para ${email}: senha=${password}`)
    return
  }

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
    body: JSON.stringify({
      from: `Academy.IA <${fromEmail}>`,
      to: email,
      subject: "Seu acesso à Academy.IA está pronto!",
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:24px;background:#fff">
          <h2 style="margin-bottom:8px;color:#111">Bem-vindo à Academy.IA!</h2>
          <p style="color:#555">Seu acesso <strong>Vitalício</strong> foi criado. Use as credenciais abaixo para entrar:</p>
          <div style="background:#f5f5f5;border-radius:8px;padding:16px;margin:16px 0">
            <p style="margin:0 0 8px;color:#111"><strong>Email:</strong> ${email}</p>
            <p style="margin:0;color:#111"><strong>Senha:</strong> <span style="font-family:monospace;font-size:16px;background:#e0e0e0;padding:2px 6px;border-radius:4px">${password}</span></p>
          </div>
          <a href="${appUrl}/login" style="display:inline-block;background:#111;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
            Acessar a Academy.IA →
          </a>
          <p style="color:#999;font-size:12px;margin-top:16px">Guarde essa senha em um lugar seguro. Você pode alterá-la a qualquer momento nas configurações.</p>
        </div>
      `,
    }),
  })
}

function detectPlan(_body: Record<string, unknown>): Plan {
  return "vitalicio"
}

function detectEvent(body: Record<string, unknown>): string {
  return (body?.event ?? body?.type ?? body?.status ?? "purchase") as string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log("[webhook] payload completo:", JSON.stringify(body))

    const event = detectEvent(body)
    const plan = detectPlan(body)

    // Eventos que não são compra confirmada → ignorar (retornar 200 para Cakto não retentar)
    const PURCHASE_EVENTS = ["purchase_approved", "purchase", "paid", "approved", "compra_aprovada"]
    const CANCEL_EVENTS = ["cancelled", "canceled", "chargeback", "refunded", "canceled_subscription"]
    const RENEWAL_EVENTS = ["renewal", "renewed", "subscription_renewed", "rebill"]
    const isActionable = [...PURCHASE_EVENTS, ...CANCEL_EVENTS, ...RENEWAL_EVENTS].includes(event)

    if (!isActionable) {
      console.log(`[webhook] evento ignorado: ${event}`)
      return NextResponse.json({ ok: true, action: "ignored", event })
    }

    const email: string =
      body?.data?.customer?.email ??
      body?.customer?.email ??
      body?.buyer?.email ??
      body?.email ??
      body?.data?.buyer?.email ??
      body?.sale?.customer?.email ??
      body?.order?.customer?.email ??
      body?.payer?.email ??
      body?.client?.email ??
      ""

    if (!email) {
      console.log("[webhook] email não encontrado. campos recebidos:", JSON.stringify(Object.keys(body)), "data keys:", JSON.stringify(body?.data ? Object.keys(body.data) : []))
      return NextResponse.json({ error: "Email não encontrado no payload", received: body }, { status: 400 })
    }
    const transactionId = body?.data?.id ?? body?.transaction?.id ?? body?.id ?? undefined

    // CANCELAMENTO ou CHARGEBACK
    if (["cancelled", "canceled", "chargeback", "refunded", "canceled_subscription"].includes(event)) {
      await cancelSubscription(email)
      console.log(`[webhook] Assinatura cancelada: ${email}`)
      return NextResponse.json({ ok: true, action: "cancelled" })
    }

    // RENOVAÇÃO
    if (["renewal", "renewed", "subscription_renewed", "rebill"].includes(event)) {
      const renewed = await renewSubscription(email, plan)
      if (renewed) {
        console.log(`[webhook] Assinatura renovada: ${email}`)
        return NextResponse.json({ ok: true, action: "renewed" })
      }
      // Se não existe assinatura, cai no fluxo de compra abaixo
    }

    // COMPRA NOVA (purchase, paid, approved, etc.)
    const { data: existing } = await supabaseAdmin.auth.admin.listUsers()
    const existingUser = existing?.users?.find(u => u.email === email)

    if (existingUser) {
      // Usuário já existe — só renova/cria assinatura
      await renewSubscription(email, plan)
      console.log(`[webhook] Assinatura criada para usuário existente: ${email}`)
      return NextResponse.json({ ok: true, action: "subscription_created" })
    }

    // Cria usuário novo
    const password = generatePassword()
    const { data: newUser, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: body?.data?.customer?.name ?? body?.customer?.name ?? email.split("@")[0],
        plan,
      },
    })

    if (error || !newUser.user) {
      console.error("[webhook] Erro ao criar usuário:", error?.message)
      return NextResponse.json({ error: error?.message }, { status: 500 })
    }

    await createSubscription(newUser.user.id, email, plan, transactionId)
    await sendWelcomeEmail(email, password)

    console.log(`[webhook] Novo membro criado: ${email} — plano ${plan}`)
    return NextResponse.json({ ok: true, action: "created" })
  } catch (e) {
    console.error("[webhook] Erro inesperado:", e)
    return NextResponse.json({ error: "Erro interno" }, { status: 500 })
  }
}
